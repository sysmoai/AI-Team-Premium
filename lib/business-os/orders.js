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

import { createHash, randomBytes } from "node:crypto";
import { authorize, AuthzError } from "./rbac.js";
import { isQuoteValid } from "./quote.js";

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

const SECRET_RE = /\b(pass(word|wd)?|otp|one[- ]time code|cvv|cvc|pin\s*code|2fa code|login code)\b\s*[:=]/i;

export class OrderError extends Error {
  constructor(code) { super(code); this.code = code; }
}

const hash = (s) => createHash("sha256").update(s).digest("hex");

function assertNoSecrets(obj) {
  if (SECRET_RE.test(JSON.stringify(obj ?? {}))) throw new OrderError("SECRET_IN_RECORD");
}

/** In-memory store with the same contract a D1 adapter must honour. Synthetic only. */
export function createMemoryStore({ synthetic = true } = {}) {
  return { synthetic, orders: new Map(), byKey: new Map(), events: [], settlements: [], outbox: [], audit: [] };
}

function append(store, orderId, type, actorId, data, now) {
  const prev = store.events.length ? store.events[store.events.length - 1].hash : "GENESIS";
  const ev = { seq: store.events.length + 1, orderId, type, actor: actorId, data: data ?? null, at: now.toISOString(), prev };
  ev.hash = hash(prev + JSON.stringify({ ...ev, hash: undefined }));
  store.events.push(Object.freeze(ev));
  return ev;
}

/** Recompute the chain; returns the first broken seq or null. */
export function verifyEvents(store) {
  let prev = "GENESIS";
  for (const ev of store.events) {
    const expect = hash(prev + JSON.stringify({ ...ev, hash: undefined }));
    if (ev.prev !== prev || ev.hash !== expect) return ev.seq;
    prev = ev.hash;
  }
  return null;
}

/**
 * Create a payable order from an accepted quote. Idempotent per key.
 */
export function createOrder(store, { quote, idempotencyKey, customerRef }, { actor, now = new Date() }) {
  authorize(actor, "quote.prepare", { now, audit: (a) => store.audit.push(a) });
  if (typeof idempotencyKey !== "string" || idempotencyKey.length < 8) throw new OrderError("IDEMPOTENCY_KEY_REQUIRED");
  const existing = store.byKey.get(idempotencyKey);
  if (existing) {
    const o = store.orders.get(existing);
    if (o.quoteId !== quote?.id) throw new OrderError("IDEMPOTENCY_KEY_REUSED_FOR_DIFFERENT_QUOTE");
    return o;
  }
  if (!isQuoteValid(quote, now)) throw new OrderError("QUOTE_NOT_ACCEPTED_OR_EXPIRED");
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
