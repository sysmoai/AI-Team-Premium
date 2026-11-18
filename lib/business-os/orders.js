// lib/business-os/orders.js — AI Team Premium order lifecycle (domain layer, storage-agnostic).
//
// INQUIRY → QUALIFIED → QUOTE_PREPARED → CUSTOMER_ACCEPTED → PAYMENT_REVIEW →
// PAYMENT_VERIFIED → ASSIGNED → FULFILLING → DELIVERED → CLOSED
// side branches: CANCELLED, FAILED, DISPUTED, REFUND_REVIEW, REFUNDED.
//
// Rules (design reused from SaveOnSub's Order OS, implemented independently):
//   - only an accepted, unexpired, eligible quote can become a payable order;
//   - every create needs an idempotency key: the same key returns the same order;
//   - every state change appends an event; events are hash-chained, so an edited
//     or deleted event breaks verifyEvents();
//   - PAYMENT_VERIFIED is reachable ONLY through verifyPayment(), which needs the
//     payment.verify capability AND a receiving-side settlement that matches the
//     order (a customer screenshot or reported reference is never enough);
//   - no field may carry a password, OTP or card security code;
//   - notifications go through an outbox so a provider failure never loses an order.

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { authorize, AuthzError } from "./rbac.js";
import { isQuoteValid, prepareQuote } from "./quote.js";

export const STATES = Object.freeze([
  "INQUIRY", "QUALIFIED", "QUOTE_PREPARED", "CUSTOMER_ACCEPTED", "PAYMENT_REVIEW",
  "PAYMENT_VERIFIED", "ASSIGNED", "FULFILLING", "DELIVERED", "CLOSED",
  "CANCELLED", "FAILED", "DISPUTED", "REFUND_REVIEW", "REFUNDED",
]);
const TERMINAL = new Set(["CLOSED", "CANCELLED", "REFUNDED"]);

// from -> { to: capability }. Edges marked "dedicated" are only reachable through
// their own function (verifyPayment), never through transition().
const EDGES = {
  PAYMENT_REVIEW: { PAYMENT_VERIFIED: "dedicated", CANCELLED: "order.cancel", DISPUTED: "order.cancel" },
  PAYMENT_VERIFIED: { ASSIGNED: "fulfillment.claim", REFUND_REVIEW: "refund.review" },
  ASSIGNED: { FULFILLING: "fulfillment.complete", REFUND_REVIEW: "refund.review" },
  FULFILLING: { DELIVERED: "fulfillment.complete", FAILED: "fulfillment.complete", REFUND_REVIEW: "refund.review" },
  FAILED: { FULFILLING: "fulfillment.complete", REFUND_REVIEW: "refund.review" },
  DELIVERED: { CLOSED: "fulfillment.complete", DISPUTED: "support.handle", REFUND_REVIEW: "refund.review" },
  DISPUTED: { REFUND_REVIEW: "refund.review", DELIVERED: "support.handle", CANCELLED: "order.cancel" },
  REFUND_REVIEW: { REFUNDED: "refund.approve", DELIVERED: "refund.review" },
};

// Secret detection (defence in depth; the real control is that free-text
// fields are allow-listed and short). Keywords alone are enough — no ":" needed.
const SECRET_WORD_RE = /\b(pass(word|wd|code)?|otp|one[- ]time (code|password)|verification code|cvv|cvc|pin|2fa|login code|recovery code|secret key|api key)\b|পাসওয়ার্ড|ওটিপি|পিন/i;
const DIGITS_RE = /\d[\d -]{11,22}\d/g;
function luhn(d) {
  let sum = 0, alt = false;
  for (let i = d.length - 1; i >= 0; i--) { let n = +d[i]; if (alt) { n *= 2; if (n > 9) n -= 9; } sum += n; alt = !alt; }
  return sum % 10 === 0;
}
const EVIDENCE_KEYS = new Set(["checklistComplete", "customerAccepted", "deliveryChannel", "note"]);
const MAX_NOTE = 300;

export class OrderError extends Error {
  constructor(code) { super(code); this.code = code; }
}

const hash = (s) => createHash("sha256").update(s).digest("hex");

function assertNoSecrets(obj) {
  const s = JSON.stringify(obj ?? {});
  if (SECRET_WORD_RE.test(s)) throw new OrderError("SECRET_IN_RECORD");
  for (const m of s.matchAll(DIGITS_RE)) {
    const d = m[0].replace(/\D/g, "");
    if (d.length >= 13 && d.length <= 19 && luhn(d)) throw new OrderError("SECRET_IN_RECORD"); // card-number shape
  }
}

function assertEvidenceShape(evidence) {
  if (evidence == null) return;
  if (typeof evidence !== "object" || Array.isArray(evidence)) throw new OrderError("EVIDENCE_SHAPE");
  for (const [k, v] of Object.entries(evidence)) {
    if (!EVIDENCE_KEYS.has(k)) throw new OrderError("EVIDENCE_FIELD_NOT_ALLOWED");
    if (typeof v === "string" && v.length > MAX_NOTE) throw new OrderError("EVIDENCE_TOO_LONG");
  }
}

const KEYS = new WeakMap(); // store -> signing key (module-private)

/** In-memory store with the same contract a D1 adapter must honour. Synthetic only. */
export function createMemoryStore({ synthetic = true, signingKey } = {}) {
  // `head` is the separately kept chain head: verifyEvents() checks the event
  // list still ends there, so truncating the tail is detected too.
  // signingKey: server-side secret (D1 adapter: a Worker secret). It is kept in
  // a module-private WeakMap, never on the store record, so nothing that can
  // read or write store state can read the key or re-sign a forged quote.
  const store = { synthetic, quotes: new Map(), orders: new Map(), byKey: new Map(), events: [], head: { count: 0, hash: "GENESIS" }, settlements: [], outbox: [], audit: [] };
  KEYS.set(store, signingKey ?? randomBytes(32));
  return store;
}

function append(store, orderId, type, actorId, data, now) {
  const prev = store.head.hash;
  const orderSeq = store.events.filter((e) => e.orderId === orderId).length + 1;
  const ev = { seq: store.head.count + 1, orderSeq, orderId, type, actor: actorId, data: data ?? null, at: now.toISOString(), prev };
  ev.hash = hash(prev + JSON.stringify({ ...ev, hash: undefined }));
  store.events.push(Object.freeze(ev));
  store.head = Object.freeze({ count: ev.seq, hash: ev.hash });
  return ev;
}

/** Recompute the chain; returns the first broken seq, "TRUNCATED", or null. */
export function verifyEvents(store) {
  let prev = "GENESIS";
  let i = 0;
  for (const ev of store.events) {
    i++;
    const expect = hash(prev + JSON.stringify({ ...ev, hash: undefined }));
    if (ev.seq !== i || ev.prev !== prev || ev.hash !== expect) return ev.seq ?? i;
    prev = ev.hash;
  }
  if (i !== store.head.count || prev !== store.head.hash) return "TRUNCATED";
  return null;
}

// ------------------------------------------------------------------ quotes
const sign = (store, s) => {
  const key = KEYS.get(store);
  if (!key) throw new OrderError("STORE_HAS_NO_SIGNING_KEY");
  return createHmac("sha256", key).update(s).digest("hex");
};
const sameSig = (a, b) => typeof a === "string" && typeof b === "string" && a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const quoteBody = (q) => JSON.stringify({ ...q, customerAcceptance: undefined, acceptedAt: undefined, digest: undefined, acceptanceSig: undefined });
const acceptanceBody = (q) => `${q.id}|${q.digest}|ACCEPTED|${q.acceptedAt}`;

/**
 * Prepare (server-side, from governance) AND persist a quote. The caller passes
 * the REQUEST, never a quote object, so no field of a stored quote can come
 * from outside prepareQuote().
 */
export function registerQuote(store, req, ctx) {
  const quote = prepareQuote(req, { ...ctx, audit: (a) => store.audit.push(a) });
  if (store.quotes.has(quote.id)) throw new OrderError("QUOTE_ID_DUPLICATE");
  assertNoSecrets(quote);
  if (typeof quote.customerRef === "string" && quote.customerRef.length > 120) throw new OrderError("CUSTOMER_REF_TOO_LONG");
  const stored = { ...quote, customerAcceptance: "PENDING", acceptedAt: null };
  stored.digest = sign(store, quoteBody(stored));
  store.quotes.set(quote.id, stored);
  store.audit.push({ type: "quote.registered", actor: ctx.actor.id, quoteId: quote.id, at: quote.createdAt });
  return stored;
}

function quoteIntact(store, q) {
  if (!sameSig(q.digest, sign(store, quoteBody(q)))) return false;
  if (q.customerAcceptance === "ACCEPTED") return sameSig(q.acceptanceSig, sign(store, acceptanceBody(q)));
  return q.customerAcceptance === "PENDING";
}

/** Record that the customer accepted the stored quote (staff action, audited). */
export function acceptQuote(store, quoteId, { actor, now = new Date(), evidence }) {
  authorize(actor, "quote.prepare", { now, audit: (a) => store.audit.push(a) });
  const q = store.quotes.get(quoteId);
  if (!q) throw new OrderError("QUOTE_NOT_FOUND");
  if (!quoteIntact(store, q)) throw new OrderError("QUOTE_TAMPERED");
  if (new Date(q.expiresAt) <= now) throw new OrderError("QUOTE_EXPIRED");
  if (q.customerAcceptance !== "PENDING") throw new OrderError("QUOTE_ALREADY_ACCEPTED");
  assertEvidenceShape(evidence);
  assertNoSecrets(evidence);
  q.customerAcceptance = "ACCEPTED";
  q.acceptedAt = now.toISOString();
  q.acceptanceSig = sign(store, acceptanceBody(q));
  store.audit.push({ type: "quote.accepted", actor: actor.id, quoteId, at: q.acceptedAt });
  return q;
}

/**
 * Create a payable order from an accepted quote. Idempotent per key.
 */
export function createOrder(store, { quoteId, idempotencyKey, customerRef }, { actor, now = new Date() }) {
  authorize(actor, "quote.prepare", { now, audit: (a) => store.audit.push(a) });
  if (typeof idempotencyKey !== "string" || idempotencyKey.length < 8) throw new OrderError("IDEMPOTENCY_KEY_REQUIRED");
  const existing = store.byKey.get(idempotencyKey);
  if (existing) {
    const o = store.orders.get(existing);
    if (o.quoteId !== quoteId) throw new OrderError("IDEMPOTENCY_KEY_REUSED_FOR_DIFFERENT_QUOTE");
    return o;
  }
  // Only the STORED quote is trusted: a caller-supplied object can never set the amount.
  const quote = store.quotes.get(quoteId);
  if (!quote) throw new OrderError("QUOTE_NOT_FOUND");
  if (!quoteIntact(store, quote)) throw new OrderError("QUOTE_TAMPERED");
  if (!isQuoteValid(quote, now)) throw new OrderError("QUOTE_NOT_ACCEPTED_OR_EXPIRED");
  if ([...store.orders.values()].some((o) => o.quoteId === quoteId)) throw new OrderError("QUOTE_ALREADY_CONVERTED");
  assertNoSecrets({ customerRef });
  const id = "O-" + randomBytes(8).toString("hex");
  const order = {
    id, businessId: "U05", quoteId: quote.id, customerRef: customerRef ?? quote.customerRef ?? null,
    amountBdt: quote.totalBdt, state: "PAYMENT_REVIEW", trackingToken: randomBytes(16).toString("hex"),
    synthetic: store.synthetic, createdAt: now.toISOString(),
  };
  store.orders.set(id, order);
  store.byKey.set(idempotencyKey, id);
  append(store, id, "order.created", actor.id, { quoteId: quote.id, amountBdt: quote.totalBdt }, now);
  append(store, id, "state.PAYMENT_REVIEW", actor.id, null, now);
  enqueue(store, { orderId: id, kind: "order_received_ack", now });
  return order;
}

/** Customer says they paid (screenshot / reference). Never changes the state. */
export function recordCustomerPaymentReport(store, orderId, report, { actor, now = new Date() }) {
  authorize(actor, "payment.record_customer_report", { now, audit: (a) => store.audit.push(a) });
  const o = store.orders.get(orderId);
  if (!o) throw new OrderError("ORDER_NOT_FOUND");
  assertNoSecrets(report);
  append(store, orderId, "payment.customer_reported", actor.id, { method: report?.method ?? null, reference: report?.reference ?? null, hasScreenshot: Boolean(report?.screenshotRef) }, now);
  return o; // still PAYMENT_REVIEW
}

/** Finance records what actually arrived on AI Team Premium's receiving side (statement line). */
export function recordSettlement(store, settlement, { actor, now = new Date() }) {
  authorize(actor, "finance.record", { now, audit: (a) => store.audit.push(a) });
  if (!(settlement && settlement.businessId === "U05" && settlement.receivingAccountRef && settlement.reference && settlement.amountBdt > 0 && settlement.source === "receiving_side_statement"))
    throw new OrderError("SETTLEMENT_INVALID");
  if (store.settlements.some((s) => s.reference === settlement.reference)) throw new OrderError("SETTLEMENT_DUPLICATE");
  const s = Object.freeze({ ...settlement, allocatedTo: null, recordedBy: actor.id, at: now.toISOString() });
  store.settlements.push(s);
  return s;
}

/** The ONLY path to PAYMENT_VERIFIED. */
export function verifyPayment(store, orderId, { settlementReference }, { actor, now = new Date() }) {
  authorize(actor, "payment.verify", { now, audit: (a) => store.audit.push(a) });
  const o = store.orders.get(orderId);
  if (!o) throw new OrderError("ORDER_NOT_FOUND");
  if (o.state !== "PAYMENT_REVIEW") throw new OrderError("NOT_IN_PAYMENT_REVIEW");
  const i = store.settlements.findIndex((s) => s.reference === settlementReference);
  if (i < 0) throw new OrderError("NO_RECEIVING_SIDE_SETTLEMENT");
  const s = store.settlements[i];
  if (s.allocatedTo) throw new OrderError("SETTLEMENT_ALREADY_ALLOCATED");
  if (s.amountBdt !== o.amountBdt) throw new OrderError("SETTLEMENT_AMOUNT_MISMATCH");
  store.settlements[i] = Object.freeze({ ...s, allocatedTo: orderId });
  o.state = "PAYMENT_VERIFIED";
  append(store, orderId, "payment.verified", actor.id, { settlementReference }, now);
  enqueue(store, { orderId, kind: "paid_order_alert", now });
  return o;
}

export function transition(store, orderId, to, { actor, now = new Date(), note, evidence }) {
  const o = store.orders.get(orderId);
  if (!o) throw new OrderError("ORDER_NOT_FOUND");
  if (TERMINAL.has(o.state)) throw new OrderError("TERMINAL_STATE_IMMUTABLE");
  const cap = EDGES[o.state]?.[to];
  if (!cap) throw new OrderError("INVALID_TRANSITION");
  if (cap === "dedicated") throw new OrderError("USE_DEDICATED_OPERATION");
  authorize(actor, cap, { now, audit: (a) => store.audit.push(a) });
  assertEvidenceShape(evidence);
  if (typeof note === "string" && note.length > MAX_NOTE) throw new OrderError("NOTE_TOO_LONG");
  assertNoSecrets({ note, evidence });
  if (to === "DELIVERED" && !(evidence && evidence.checklistComplete === true)) throw new OrderError("DELIVERY_EVIDENCE_REQUIRED");
  const from = o.state;
  o.state = to;
  if (to === "ASSIGNED") o.assignee = actor.id;
  append(store, orderId, `state.${to}`, actor.id, { from, note: note ?? null, evidence: evidence ?? null }, now);
  return o;
}

// ------------------------------------------------------------------ outbox
export function enqueue(store, { orderId, kind, now }) {
  store.outbox.push({ id: store.outbox.length + 1, orderId, kind, attempts: 0, status: "PENDING", lastError: null, createdAt: now.toISOString() });
}

/** Deliver pending messages; failures are recorded and retried up to maxAttempts. */
export async function dispatchOutbox(store, adapter, { maxAttempts = 5 } = {}) {
  for (const m of store.outbox) {
    if (m.status !== "PENDING") continue;
    m.attempts++;
    try {
      await adapter(m);
      m.status = "SENT";
    } catch (e) {
      m.lastError = String(e?.message ?? e).slice(0, 200);
      if (m.attempts >= maxAttempts) m.status = "DEAD_LETTER";
    }
  }
  return store.outbox;
}

export { AuthzError };
