// lib/business-os/orders.js — AI Team Premium Business OS service layer (U05).
//
// Storage-agnostic: every write goes through `adapter.batch([...])`, which must
// be atomic (local SQLite transaction / Cloudflare D1 batch). The database
// schema (docs/business-os/migrations/0001_business_os.sql) enforces the money
// and consent rules a second time with triggers, so this layer is not the only
// line of defence.
//
// Lifecycle: quote PENDING → (customer accepts via one-time challenge) ACCEPTED →
// order PAYMENT_REVIEW → PAYMENT_VERIFIED (only with an allocated, signed,
// receiving-side settlement) → ASSIGNED → FULFILLING → DELIVERED → CLOSED,
// plus CANCELLED / FAILED / DISPUTED / REFUND_REVIEW / REFUNDED.
//
// WebCrypto only (no node:*), so it runs unchanged in the Workers runtime.

import { authorize, AuthzError, isVerifiedActor } from "./rbac.js";
import { prepareQuote } from "./quote.js";
import { sha256Hex, hmacHex, randomHex, safeEqual, toHex, canonicalJson, ed25519Verify, sealJson, openJson } from "./crypto.js";

export class OsError extends Error {
  constructor(code) { super(code); this.code = code; }
}
export { AuthzError };

const EDGE_CAP = {
  "PAYMENT_REVIEW>CANCELLED": "order.cancel", "PAYMENT_REVIEW>DISPUTED": "order.cancel",
  "PAYMENT_VERIFIED>ASSIGNED": "fulfillment.claim", "PAYMENT_VERIFIED>REFUND_REVIEW": "refund.review",
  "ASSIGNED>FULFILLING": "fulfillment.complete", "ASSIGNED>REFUND_REVIEW": "refund.review",
  "FULFILLING>DELIVERED": "fulfillment.complete", "FULFILLING>FAILED": "fulfillment.complete", "FULFILLING>REFUND_REVIEW": "refund.review",
  "FAILED>FULFILLING": "fulfillment.complete", "FAILED>REFUND_REVIEW": "refund.review",
  "DELIVERED>CLOSED": "fulfillment.complete", "DELIVERED>DISPUTED": "support.handle", "DELIVERED>REFUND_REVIEW": "refund.review",
  "DISPUTED>REFUND_REVIEW": "refund.review", "DISPUTED>DELIVERED": "support.handle", "DISPUTED>CANCELLED": "order.cancel",
  "REFUND_REVIEW>REFUNDED": "refund.approve", "REFUND_REVIEW>DELIVERED": "refund.review",
};

// ---------------------------------------------------------------- guards
const SECRET_WORD_RE = /\b(pass(word|wd|code)?|otp|one[- ]time (code|password)|verification code|cvv|cvc|pin|2fa|login code|recovery code|secret key|api key)\b|পাসওয়ার্ড|ওটিপি|পিন/i;
function luhn(d) {
  let sum = 0, alt = false;
  for (let i = d.length - 1; i >= 0; i--) { let n = +d[i]; if (alt) { n *= 2; if (n > 9) n -= 9; } sum += n; alt = !alt; }
  return sum % 10 === 0;
}
export function assertNoSecrets(obj) {
  const s = JSON.stringify(obj ?? {});
  if (SECRET_WORD_RE.test(s)) throw new OsError("SECRET_IN_RECORD");
  for (const m of s.matchAll(/\d[\d -]{11,22}\d/g)) {
    const d = m[0].replace(/\D/g, "");
    if (d.length >= 13 && d.length <= 19 && luhn(d)) throw new OsError("SECRET_IN_RECORD");
  }
}
const EVIDENCE_KEYS = new Set(["checklistComplete", "customerAccepted", "deliveryChannel", "note"]);
function assertEvidenceShape(evidence) {
  if (evidence == null) return;
  if (typeof evidence !== "object" || Array.isArray(evidence)) throw new OsError("EVIDENCE_SHAPE");
  for (const [k, v] of Object.entries(evidence)) {
    if (!EVIDENCE_KEYS.has(k)) throw new OsError("EVIDENCE_FIELD_NOT_ALLOWED");
    if (typeof v === "string" && v.length > 300) throw new OsError("EVIDENCE_TOO_LONG");
  }
}
const SAFE_ID = /^[A-Za-z0-9._:-]{3,100}$/;
const isUniqueViolation = (e) => /UNIQUE constraint failed/i.test(String(e?.message ?? e));
const isNotAccepted = (e) => /order must come from an accepted quote/i.test(String(e?.message ?? e));
const isChainRace = (e) => /event chain head moved/i.test(String(e?.message ?? e));

/**
 * @param {object} deps
 * @param {{batch:Function, first:Function, all:Function}} deps.adapter
 * @param {{quoteKey: Uint8Array, outboxKey: Uint8Array}} deps.keys   server-side secrets (Worker secrets in production)
 * @param {() => Date} [deps.clock]
 * @param {boolean} [deps.synthetic]  marks every record as synthetic (demo/test); never counted as real
 */
export function createBusinessOs({ adapter, keys, clock = () => new Date(), synthetic = false }) {
  if (!keys?.quoteKey) throw new OsError("QUOTE_KEY_REQUIRED");
  if (!(keys.outboxKey instanceof Uint8Array) || keys.outboxKey.length !== 32) throw new OsError("OUTBOX_KEY_REQUIRED");
  if (safeEqual(toHex(keys.outboxKey), toHex(keys.quoteKey))) throw new OsError("OUTBOX_KEY_MUST_BE_SEPARATE");
  const SYN = synthetic ? 1 : 0;

  async function auditRow(type, actor, capability, code, ref) {
    await adapter.batch([{ sql: "INSERT INTO audit_log (type, actor, capability, code, ref, at) VALUES (?,?,?,?,?,?)", params: [type, actor ?? null, capability ?? null, code ?? null, ref ?? null, clock().toISOString()] }]);
  }
  async function authz(actor, capability, ref) {
    try {
      authorize(actor, capability, { now: clock() });
    } catch (e) {
      await auditRow("authz.denied", isVerifiedActor(actor) ? actor.id : null, capability, e.code, ref);
      throw e;
    }
  }

  // Build event INSERTs on top of the current head; the DB rejects them if the
  // head moved (compare-and-set), and we retry with the fresh head.
  async function eventStmts(head, events) {
    const stmts = [];
    let prev = head.hash, seq = head.count;
    for (const ev of events) {
      seq += 1;
      const row = { chain_seq: seq, order_id: ev.orderId ?? null, type: ev.type, actor: ev.actor, from_state: ev.from ?? null, to_state: ev.to ?? null, data: ev.data == null ? null : canonicalJson(ev.data), at: clock().toISOString(), prev_hash: prev };
      const hash = await sha256Hex(prev + canonicalJson(row));
      stmts.push({ sql: "INSERT INTO order_events (chain_seq, order_id, type, actor, from_state, to_state, data, at, prev_hash, hash) VALUES (?,?,?,?,?,?,?,?,?,?)", params: [row.chain_seq, row.order_id, row.type, row.actor, row.from_state, row.to_state, row.data, row.at, row.prev_hash, hash] });
      prev = hash;
    }
    return stmts;
  }
  async function withChain(build, attempts = 6) {
    for (let i = 0; i < attempts; i++) {
      const head = await adapter.first("SELECT count, hash FROM chain_head WHERE id = 1");
      const { before = [], events = [], after = [] } = await build(head);
      try {
        return await adapter.batch([...before, ...(await eventStmts(head, events)), ...after]);
      } catch (e) {
        if (isChainRace(e) && i < attempts - 1) continue;
        throw e;
      }
    }
  }
  // Customer payloads carry one-time links: they are encrypted before storage,
  // so reading the database is not enough to act as the customer.
  async function outboxStmt(orderId, kind, channel, payload) {
    const id = "M-" + randomHex(8);
    const body = channel === "customer" ? { sealed: await sealJson(keys.outboxKey, payload, `${id}|${kind}`) } : payload;
    return {
      sql: "INSERT INTO outbox (id, order_id, kind, recipient_channel, payload, created_at) VALUES (?,?,?,?,?,?)",
      params: [id, orderId, kind, channel, canonicalJson(body), clock().toISOString()],
    };
  }

  // ----------------------------------------------------------------- quotes
  async function registerQuote(actor, req, { governance, services, paymentPolicy }) {
    await authz(actor, "quote.prepare");
    const quote = prepareQuote(req, { actor, governance, services, paymentPolicy, now: clock() });
    assertNoSecrets({ scope: quote.scope, customerRef: quote.customerRef });
    const body = canonicalJson(quote);
    const version = await hmacHex(keys.quoteKey, body);
    await adapter.batch([{
      sql: `INSERT INTO quotes (id, business_id, version_digest, offer_kind, offer_id, quantity, unit, unit_price_bdt, total_bdt, terms_version, payment_policy_version, customer_ref, body_json, created_at, expires_at, prepared_by, synthetic)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      params: [quote.id, "U05", version, quote.offer.kind, quote.offer.id, quote.quantity, quote.unit, quote.unitPriceBdt, quote.totalBdt, quote.termsVersion, quote.paymentPolicyVersion, quote.customerRef, body, quote.createdAt, quote.expiresAt, actor.id, SYN],
    }, { sql: "INSERT INTO audit_log (type, actor, ref, at) VALUES (?,?,?,?)", params: ["quote.registered", actor.id, quote.id, clock().toISOString()] }]);
    return { ...quote, version };
  }

  async function loadQuote(id) {
    const q = await adapter.first("SELECT * FROM quotes WHERE id = ?", [id]);
    if (!q) throw new OsError("QUOTE_NOT_FOUND");
    const expect = await hmacHex(keys.quoteKey, q.body_json);
    if (!safeEqual(expect, q.version_digest)) throw new OsError("QUOTE_TAMPERED");
    const body = JSON.parse(q.body_json);
    if (body.totalBdt !== q.total_bdt || body.customerRef !== q.customer_ref || body.termsVersion !== q.terms_version) throw new OsError("QUOTE_TAMPERED");
    return q;
  }

  /**
   * Staff ask the CUSTOMER to accept. The one-time secret goes only to the
   * customer channel (outbox, recipient "customer"); staff receive the
   * challenge id, never the secret, so they cannot accept on the customer's behalf.
   */
  async function requestCustomerAcceptance(actor, quoteId, { ttlHours = 24 } = {}) {
    await authz(actor, "quote.prepare", quoteId);
    const q = await loadQuote(quoteId);
    if (q.state !== "PENDING") throw new OsError("QUOTE_NOT_PENDING");
    if (new Date(q.expires_at) <= clock()) throw new OsError("QUOTE_EXPIRED");
    const challengeId = "C-" + randomHex(8);
    const secret = randomHex(24);
    const expiresAt = new Date(Math.min(clock().getTime() + ttlHours * 3600e3, new Date(q.expires_at).getTime())).toISOString();
    await adapter.batch([
      { sql: "INSERT INTO acceptance_challenges (id, nonce_hash, quote_id, quote_version, customer_ref, created_at, expires_at) VALUES (?,?,?,?,?,?,?)", params: [challengeId, await sha256Hex(secret), quoteId, q.version_digest, q.customer_ref, clock().toISOString(), expiresAt] },
      await outboxStmt(null, "acceptance_request", "customer", { customerRef: q.customer_ref, quoteId, totalBdt: q.total_bdt, termsVersion: q.terms_version, token: `${challengeId}.${secret}` }),
      { sql: "INSERT INTO audit_log (type, actor, ref, at) VALUES (?,?,?,?)", params: ["acceptance.requested", actor.id, challengeId, clock().toISOString()] },
    ]);
    return { challengeId, expiresAt };
  }

  /** Customer-side: the holder of the one-time token accepts the exact quote version and terms. */
  async function confirmCustomerAcceptance({ token, customerRef, termsVersion }) {
    const [challengeId, secret] = String(token ?? "").split(".");
    if (!challengeId || !secret || !SAFE_ID.test(challengeId)) throw new OsError("ACCEPTANCE_TOKEN_INVALID");
    const c = await adapter.first("SELECT * FROM acceptance_challenges WHERE id = ?", [challengeId]);
    if (!c || !safeEqual(await sha256Hex(secret), c.nonce_hash)) { await auditRow("acceptance.rejected", null, null, "BAD_TOKEN", challengeId); throw new OsError("ACCEPTANCE_TOKEN_INVALID"); }
    if (c.consumed_at) { await auditRow("acceptance.rejected", null, null, "REPLAY", challengeId); throw new OsError("ACCEPTANCE_REPLAYED"); }
    const now = clock();
    if (new Date(c.expires_at) <= now) throw new OsError("ACCEPTANCE_EXPIRED");
    const q = await loadQuote(c.quote_id);
    if (q.version_digest !== c.quote_version) throw new OsError("QUOTE_CHANGED_SINCE_REQUEST");
    if (customerRef !== c.customer_ref || customerRef !== q.customer_ref) throw new OsError("ACCEPTANCE_WRONG_CUSTOMER");
    if (termsVersion !== q.terms_version) throw new OsError("ACCEPTANCE_TERMS_MISMATCH");
    if (q.state !== "PENDING") throw new OsError("QUOTE_NOT_PENDING");
    if (new Date(q.expires_at) <= now) throw new OsError("QUOTE_EXPIRED");
    const at = now.toISOString();
    try {
      await adapter.batch([
        { sql: "UPDATE acceptance_challenges SET consumed_at = ? WHERE id = ? AND consumed_at IS NULL", params: [at, challengeId] },
        { sql: "INSERT INTO quote_acceptances (quote_id, challenge_id, quote_version, source, evidence_id, accepted_at, terms_version, customer_ref) VALUES (?,?,?,?,?,?,?,?)", params: [q.id, challengeId, q.version_digest, "customer_link", challengeId, at, termsVersion, customerRef] },
        { sql: "UPDATE quotes SET state = 'ACCEPTED' WHERE id = ? AND state = 'PENDING'", params: [q.id] },
        { sql: "INSERT INTO audit_log (type, actor, ref, at) VALUES (?,?,?,?)", params: ["quote.accepted_by_customer", `customer:${customerRef}`, q.id, at] },
      ]);
    } catch (e) {
      if (isUniqueViolation(e) || /already used|does not match/i.test(String(e.message))) throw new OsError("ACCEPTANCE_REPLAYED");
      throw e;
    }
    return { quoteId: q.id, acceptedAt: at };
  }

  // ----------------------------------------------------------------- orders
  async function createOrder(actor, { quoteId, idempotencyKey }) {
    await authz(actor, "order.create", quoteId);
    if (typeof idempotencyKey !== "string" || !/^[A-Za-z0-9._:-]{8,100}$/.test(idempotencyKey)) throw new OsError("IDEMPOTENCY_KEY_REQUIRED");
    const existing = await adapter.first("SELECT * FROM orders WHERE idempotency_key = ?", [idempotencyKey]);
    if (existing) {
      if (existing.quote_id !== quoteId) throw new OsError("IDEMPOTENCY_KEY_REUSED_FOR_DIFFERENT_QUOTE");
      return publicOrder(existing);
    }
    const q = await loadQuote(quoteId);
    if (q.state !== "ACCEPTED") throw new OsError(q.state === "CONVERTED" ? "QUOTE_ALREADY_CONVERTED" : "QUOTE_NOT_ACCEPTED");
    const id = "O-" + randomHex(8);
    const token = randomHex(20);
    try {
      await withChain(async () => ({
        before: [
          { sql: "INSERT INTO orders (id, business_id, quote_id, idempotency_key, customer_ref, amount_bdt, state, tracking_token_hash, created_at, synthetic) VALUES (?,?,?,?,?,?,?,?,?,?)", params: [id, "U05", q.id, idempotencyKey, q.customer_ref, q.total_bdt, "PAYMENT_REVIEW", await sha256Hex(token), clock().toISOString(), q.synthetic] },
          { sql: "UPDATE quotes SET state = 'CONVERTED' WHERE id = ? AND state = 'ACCEPTED'", params: [q.id] },
        ],
        events: [{ orderId: id, type: "order.created", actor: actor.id, data: { quoteId: q.id, amountBdt: q.total_bdt } }],
        after: [
          await outboxStmt(id, "tracking_link", "customer", { customerRef: q.customer_ref, orderId: id, token }),
          await outboxStmt(id, "order_received", "staff", { orderId: id }),
        ],
      }));
    } catch (e) {
      // A concurrent winner may already have CONVERTED the quote, in which case the
      // accepted-quote trigger fires before the UNIQUE constraint does.
      const lostRace = isNotAccepted(e) && (await loadQuote(quoteId)).state === "CONVERTED";
      if (isUniqueViolation(e) || lostRace) {
        const winner = await adapter.first("SELECT * FROM orders WHERE idempotency_key = ?", [idempotencyKey]);
        if (winner && winner.quote_id === quoteId) return publicOrder(winner);
        if (winner) throw new OsError("IDEMPOTENCY_KEY_REUSED_FOR_DIFFERENT_QUOTE");
        throw new OsError("QUOTE_ALREADY_CONVERTED");
      }
      throw e;
    }
    return publicOrder(await adapter.first("SELECT * FROM orders WHERE id = ?", [id]));
  }
  const publicOrder = (o) => ({ id: o.id, quoteId: o.quote_id, customerRef: o.customer_ref, amountBdt: o.amount_bdt, state: o.state, assignee: o.assignee ?? null, createdAt: o.created_at, synthetic: o.synthetic === 1 });

  async function getOrder(actor, id) {
    await authz(actor, "order.read", id);
    const o = await adapter.first("SELECT * FROM orders WHERE id = ?", [id]);
    if (!o) throw new OsError("ORDER_NOT_FOUND");
    return publicOrder(o);
  }

  /** Customer tracking: the token reveals only its own order's state. */
  async function track(token) {
    if (typeof token !== "string" || !/^[0-9a-f]{40}$/.test(token)) return null;
    const o = await adapter.first("SELECT id, state, created_at FROM orders WHERE tracking_token_hash = ?", [await sha256Hex(token)]);
    return o ? { orderId: o.id, state: o.state, createdAt: o.created_at } : null;
  }

  async function recordCustomerPaymentReport(actor, orderId, report) {
    await authz(actor, "payment.record_customer_report", orderId);
    assertNoSecrets(report);
    const o = await adapter.first("SELECT state FROM orders WHERE id = ?", [orderId]);
    if (!o) throw new OsError("ORDER_NOT_FOUND");
    await withChain(async () => ({
      before: [{ sql: "INSERT INTO customer_payment_reports (id, order_id, method, reference, screenshot_ref, reported_by, at) VALUES (?,?,?,?,?,?,?)", params: ["R-" + randomHex(8), orderId, report?.method ?? null, report?.reference ?? null, report?.screenshotRef ?? null, actor.id, clock().toISOString()] }],
      events: [{ orderId, type: "payment.customer_reported", actor: actor.id, data: { method: report?.method ?? null, hasScreenshot: Boolean(report?.screenshotRef) } }],
    }));
    return { state: o.state }; // unchanged by design
  }

  // ------------------------------------------------------------ settlements
  async function registerStatementSource(actor, { sourceId, receivingAccountRef, publicKeyJwk }) {
    await authz(actor, "finance.register_source", sourceId);
    if (!SAFE_ID.test(sourceId ?? "") || !SAFE_ID.test(receivingAccountRef ?? "")) throw new OsError("SOURCE_BAD_ID");
    if (publicKeyJwk?.kty !== "OKP" || publicKeyJwk?.crv !== "Ed25519" || publicKeyJwk.d) throw new OsError("SOURCE_KEY_MUST_BE_ED25519_PUBLIC");
    await adapter.batch([
      { sql: "INSERT INTO statement_sources (source_id, business_id, receiving_account_ref, public_key_jwk, registered_by, registered_at) VALUES (?,?,?,?,?,?)", params: [sourceId, "U05", receivingAccountRef, canonicalJson(publicKeyJwk), actor.id, clock().toISOString()] },
      { sql: "INSERT INTO audit_log (type, actor, ref, at) VALUES (?,?,?,?)", params: ["statement_source.registered", actor.id, sourceId, clock().toISOString()] },
    ]);
  }

  /**
   * Import one statement line signed (Ed25519) by a registered source. The
   * signature covers every field; the private key never enters this system, so
   * neither staff nor a customer can manufacture a settlement.
   */
  async function importSettlement(actor, line) {
    await authz(actor, "finance.import_statement", line?.transactionId);
    const fields = ["sourceId", "receivingAccountRef", "transactionId", "statementRef", "currency", "amountPoisha", "txAt", "status"];
    for (const f of fields) if (line?.[f] == null) throw new OsError(`SETTLEMENT_MISSING_${f}`);
    if (line.currency !== "BDT" || line.status !== "settled" || !Number.isInteger(line.amountPoisha) || line.amountPoisha <= 0) throw new OsError("SETTLEMENT_INVALID");
    if (Number.isNaN(new Date(line.txAt).getTime()) || new Date(line.txAt) > clock()) throw new OsError("SETTLEMENT_BAD_TIME");
    const src = await adapter.first("SELECT * FROM statement_sources WHERE source_id = ? AND active = 1", [line.sourceId]);
    if (!src) throw new OsError("SETTLEMENT_UNKNOWN_SOURCE");
    if (src.receiving_account_ref !== line.receivingAccountRef) throw new OsError("SETTLEMENT_ACCOUNT_MISMATCH");
    const payload = canonicalJson(Object.fromEntries(fields.map((f) => [f, line[f]])));
    if (!(typeof line.signature === "string" && await ed25519Verify(JSON.parse(src.public_key_jwk), payload, line.signature))) {
      await auditRow("settlement.rejected", actor.id, "finance.import_statement", "BAD_SIGNATURE", line.transactionId);
      throw new OsError("SETTLEMENT_SIGNATURE_INVALID");
    }
    const id = "S-" + randomHex(8);
    try {
      await adapter.batch([
        { sql: "INSERT INTO settlements (id, source_id, transaction_id, statement_ref, receiving_account_ref, currency, amount_poisha, tx_at, status, signature, imported_by, imported_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", params: [id, line.sourceId, line.transactionId, line.statementRef, line.receivingAccountRef, "BDT", line.amountPoisha, line.txAt, "settled", line.signature, actor.id, clock().toISOString()] },
        { sql: "INSERT INTO audit_log (type, actor, ref, at) VALUES (?,?,?,?)", params: ["settlement.imported", actor.id, id, clock().toISOString()] },
      ]);
    } catch (e) {
      if (isUniqueViolation(e)) throw new OsError("SETTLEMENT_DUPLICATE");
      throw e;
    }
    return { settlementId: id };
  }

  /** The ONLY path to PAYMENT_VERIFIED. */
  async function verifyPayment(actor, orderId, settlementId) {
    await authz(actor, "payment.verify", orderId);
    const o = await adapter.first("SELECT * FROM orders WHERE id = ?", [orderId]);
    if (!o) throw new OsError("ORDER_NOT_FOUND");
    if (o.state !== "PAYMENT_REVIEW") throw new OsError("NOT_IN_PAYMENT_REVIEW");
    const s = await adapter.first("SELECT * FROM settlements WHERE id = ?", [settlementId]);
    if (!s) throw new OsError("NO_RECEIVING_SIDE_SETTLEMENT");
    if (s.allocated_to) throw new OsError("SETTLEMENT_ALREADY_ALLOCATED");
    if (s.amount_poisha !== o.amount_bdt * 100) throw new OsError("SETTLEMENT_AMOUNT_MISMATCH");
    await withChain(async () => ({
      before: [{ sql: "UPDATE settlements SET allocated_to = ? WHERE id = ? AND allocated_to IS NULL", params: [orderId, settlementId] }],
      events: [{ orderId, type: "state.PAYMENT_VERIFIED", actor: actor.id, from: "PAYMENT_REVIEW", to: "PAYMENT_VERIFIED", data: { settlementId } }],
      after: [
        { sql: "UPDATE orders SET state = 'PAYMENT_VERIFIED' WHERE id = ? AND state = 'PAYMENT_REVIEW'", params: [orderId] },
        await outboxStmt(orderId, "paid_order_alert", "staff", { orderId }),
      ],
    }));
    return getOrderRaw(orderId);
  }
  const getOrderRaw = async (id) => publicOrder(await adapter.first("SELECT * FROM orders WHERE id = ?", [id]));

  async function transition(actor, orderId, to, { evidence, note } = {}) {
    const o = await adapter.first("SELECT * FROM orders WHERE id = ?", [orderId]);
    if (!o) throw new OsError("ORDER_NOT_FOUND");
    if (to === "PAYMENT_VERIFIED") throw new OsError("USE_DEDICATED_OPERATION");
    const cap = EDGE_CAP[`${o.state}>${to}`];
    if (!cap) throw new OsError("INVALID_TRANSITION");
    await authz(actor, cap, orderId);
    assertEvidenceShape(evidence);
    if (typeof note === "string" && note.length > 300) throw new OsError("NOTE_TOO_LONG");
    assertNoSecrets({ note, evidence });
    if (to === "DELIVERED" && !(evidence && evidence.checklistComplete === true)) throw new OsError("DELIVERY_EVIDENCE_REQUIRED");
    await withChain(async () => ({
      events: [{ orderId, type: `state.${to}`, actor: actor.id, from: o.state, to, data: { note: note ?? null, evidence: evidence ?? null } }],
      after: [{ sql: `UPDATE orders SET state = ?${to === "ASSIGNED" ? ", assignee = ?" : ""} WHERE id = ? AND state = ?`, params: to === "ASSIGNED" ? [to, actor.id, orderId, o.state] : [to, orderId, o.state] }],
    }));
    return getOrderRaw(orderId);
  }

  // ----------------------------------------------------------------- outbox
  async function dispatchOutbox(deliver, { maxAttempts = 5 } = {}) {
    const pending = await adapter.all("SELECT * FROM outbox WHERE status = 'PENDING' ORDER BY created_at");
    for (const m of pending) {
      const attempts = m.attempts + 1;
      try {
        await deliver({ ...m, payload: await openOutboxPayload(m, keys.outboxKey) });
        await adapter.batch([{ sql: "UPDATE outbox SET status = 'SENT', payload = '{}', attempts = ? WHERE id = ? AND status = 'PENDING'", params: [attempts, m.id] }]);
      } catch (e) {
        const dead = attempts >= maxAttempts;
        // Provider error text may echo the message body, so only a short code is stored.
        const code = /^[A-Z0-9_]{1,40}$/.test(String(e?.code ?? "")) ? String(e.code) : "DELIVERY_FAILED";
        await adapter.batch([{ sql: `UPDATE outbox SET attempts = ?, last_error = ?, status = ?${dead ? ", payload = '{}'" : ""} WHERE id = ? AND status = 'PENDING'`, params: [attempts, code, dead ? "DEAD_LETTER" : "PENDING", m.id] }]);
      }
    }
  }

  // ---------------------------------------------------------------- finance
  async function recordCosts(actor, orderId, costs) {
    await authz(actor, "finance.record_cost", orderId);
    const cols = ["recognized_revenue_bdt", "supplier_cost", "processing_fee", "fulfillment_labor", "support_labor", "refunds", "acquisition_cost"];
    const keysIn = { recognized_revenue_bdt: "recognizedRevenueBdt", supplier_cost: "supplierCost", processing_fee: "processingFee", fulfillment_labor: "fulfillmentLabor", support_labor: "supportLabor", refunds: "refunds", acquisition_cost: "acquisitionCost" };
    const vals = cols.map((c) => { const v = costs?.[keysIn[c]]; if (v === undefined || v === null) return null; if (!Number.isInteger(v) || v < 0) throw new OsError("COST_INVALID"); return v; });
    await adapter.batch([{ sql: `INSERT INTO order_costs (order_id, ${cols.join(", ")}, recorded_by, at) VALUES (?,${cols.map(() => "?").join(",")},?,?) ON CONFLICT(order_id) DO UPDATE SET ${cols.map((c) => `${c} = excluded.${c}`).join(", ")}, recorded_by = excluded.recorded_by, at = excluded.at`, params: [orderId, ...vals, actor.id, clock().toISOString()] }]);
  }

  async function financeRows(actor) {
    await authz(actor, "finance.read");
    return adapter.all(`SELECT o.id, o.synthetic, o.state, c.recognized_revenue_bdt, c.supplier_cost, c.processing_fee, c.fulfillment_labor, c.support_labor, c.refunds, c.acquisition_cost
      FROM orders o LEFT JOIN order_costs c ON c.order_id = o.id
      WHERE o.state IN ('PAYMENT_VERIFIED','ASSIGNED','FULFILLING','DELIVERED','CLOSED','DISPUTED','REFUND_REVIEW','REFUNDED')`);
  }

  // ------------------------------------------------------- audit integrity
  /** Recompute the whole chain from the stored events and compare with the head. */
  async function computeChain() {
    const rows = await adapter.all("SELECT * FROM order_events ORDER BY chain_seq");
    let prev = "GENESIS", n = 0;
    for (const r of rows) {
      n += 1;
      const row = { chain_seq: r.chain_seq, order_id: r.order_id, type: r.type, actor: r.actor, from_state: r.from_state, to_state: r.to_state, data: r.data, at: r.at, prev_hash: r.prev_hash };
      if (r.chain_seq !== n || r.prev_hash !== prev || r.hash !== await sha256Hex(prev + canonicalJson(row))) return { ok: false, brokenAt: r.chain_seq ?? n };
      prev = r.hash;
    }
    const head = await adapter.first("SELECT count, hash FROM chain_head WHERE id = 1");
    if (head.count !== n || head.hash !== prev) return { ok: false, brokenAt: "HEAD" };
    return { ok: true, count: n, head: prev };
  }
  async function verifyChain(actor) {
    await authz(actor, "audit.read");
    return computeChain();
  }
  /** Signed checkpoint for EXTERNAL storage (owner-held key). */
  async function exportCheckpoint(actor, checkpointKey) {
    await authz(actor, "audit.checkpoint");
    const v = await computeChain();
    if (!v.ok) throw new OsError("CHAIN_BROKEN");
    const signedAt = clock().toISOString();
    const signature = await hmacHex(checkpointKey, `${v.count}|${v.head}|${signedAt}`);
    return { count: v.count, head: v.head, signedAt, signature };
  }
  /** Detects a rewrite of history up to the checkpoint, even if the DB chain is internally consistent. */
  async function verifyAgainstCheckpoint(actor, cp, checkpointKey) {
    await authz(actor, "audit.read");
    if (!safeEqual(await hmacHex(checkpointKey, `${cp.count}|${cp.head}|${cp.signedAt}`), cp.signature)) return { ok: false, reason: "CHECKPOINT_SIGNATURE" };
    const v = await computeChain();
    if (!v.ok) return { ok: false, reason: "CHAIN_BROKEN" };
    const r = await adapter.first("SELECT hash FROM order_events WHERE chain_seq = ?", [cp.count]);
    if (cp.count === 0 ? false : !r || r.hash !== cp.head) return { ok: false, reason: "HISTORY_REWRITTEN" };
    return { ok: true };
  }

  return {
    registerQuote, requestCustomerAcceptance, confirmCustomerAcceptance,
    createOrder, getOrder, track, recordCustomerPaymentReport,
    registerStatementSource, importSettlement, verifyPayment, transition,
    dispatchOutbox, recordCosts, financeRows, verifyChain, exportCheckpoint, verifyAgainstCheckpoint,
  };
}

/** Opens an outbox row in memory for delivery; only the holder of the outbox key can read customer payloads. */
export async function openOutboxPayload(m, outboxKey) {
  const p = JSON.parse(m.payload);
  return m.recipient_channel === "customer" ? openJson(outboxKey, p.sealed, `${m.id}|${m.kind}`) : p;
}

/** Grant loader for identity.resolveActor(): reads the owner-controlled grant table. */
export function grantsFrom(adapter) {
  return async (subject) => (await adapter.all("SELECT * FROM staff_grants WHERE subject = ? AND business_id = 'U05'", [subject]))
    .map((g) => ({ subject: g.subject, businessId: g.business_id, role: g.role, active: g.active === 1, revokedAt: g.revoked_at, expiresAt: g.expires_at }));
}
