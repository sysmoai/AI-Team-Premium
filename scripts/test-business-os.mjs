// scripts/test-business-os.mjs — synthetic end-to-end scenarios for the
// Business OS domain layer (lib/business-os/*). No network, no database, no real
// customer, payment or account. Run: node --test scripts/test-business-os.mjs

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { check, authorize, AuthzError, CAPABILITIES } from "../lib/business-os/rbac.js";
import { prepareQuote, QuoteError } from "../lib/business-os/quote.js";
import { createMemoryStore, registerQuote, acceptQuote, createOrder, recordCustomerPaymentReport, recordSettlement, verifyPayment, transition, verifyEvents, dispatchOutbox, OrderError } from "../lib/business-os/orders.js";
import { createLead, exportLeads, purgeExpiredLeads, moveTicket, renewalReminderDecision, contribution, operatingProfit, crossBusinessViolations } from "../lib/business-os/operations.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NOW = new Date("2026-11-19T06:00:00Z");
const realGovernance = JSON.parse(readFileSync(resolve(ROOT, "data/commercial-governance.json"), "utf8")).records;
const realServices = JSON.parse(readFileSync(resolve(ROOT, "shared/service-governance.json"), "utf8")).services;

const who = (role, over = {}) => ({ id: `syn-${role}`, businessId: "U05", role, active: true, ...over });
const OWNER = who("business_owner"), SALES = who("sales_support"), FIN = who("finance_reviewer"), OPS = who("operations_manager"), FUL = who("fulfillment_operator");

// SYNTHETIC approved service + payment policy (not business data)
const SVC = { id: "syn-training", status: "owner_approved", approved_bdt_price: 1000, price_unit: "session", price_approval_id: "SYN-APPROVAL-1", approval_valid_until: "2027-01-31", scope_approved: true, deliverables_approved: true, payment_terms_approved: true, refund_terms_approved: true, support_terms_approved: true };
const POLICY = { businessId: "U05", status: "owner_approved", version: "syn-pay-v1", methods: ["synthetic-wallet"], validUntil: "2027-01-31" };
const ctx = (over = {}) => ({ actor: SALES, governance: realGovernance, services: [SVC], paymentPolicy: POLICY, now: NOW, ...over });
let qn = 0;
const freshQuote = () => prepareQuote({ offer: { kind: "service", id: "syn-training" }, quantity: 2, termsVersion: "syn-terms-v1", price: 1 }, ctx({ newId: (p) => `${p}-syn-${++qn}` }));
// Prepare → persist → customer accepts. Returns the stored quote id (the only thing orders trust).
const acceptedQuoteId = (store) => { const q = registerQuote(store, freshQuote(), { actor: SALES, now: NOW }); acceptQuote(store, q.id, { actor: SALES, now: NOW }); return q.id; };

// --------------------------------------------------------------------- RBAC
test("RBAC: anonymous, wrong business, unknown, inactive, revoked, expired grants are rejected", () => {
  assert.equal(check(undefined, "order.read", { now: NOW }).code, "ANONYMOUS");
  assert.equal(check({ ...OWNER, businessId: "U03" }, "order.read", { now: NOW }).code, "WRONG_BUSINESS");
  assert.equal(check({ ...OWNER, role: "ceo" }, "order.read", { now: NOW }).code, "UNKNOWN_ROLE");
  assert.equal(check({ ...OWNER, active: false }, "order.read", { now: NOW }).code, "INACTIVE_GRANT");
  assert.equal(check({ ...OWNER, revokedAt: "2026-11-01" }, "order.read", { now: NOW }).code, "REVOKED_GRANT");
  assert.equal(check({ ...OWNER, expiresAt: "2026-11-01T00:00:00Z" }, "order.read", { now: NOW }).code, "EXPIRED_GRANT");
  assert.equal(check(OWNER, "order.read", { now: new Date("x") }).code, "INVALID_CLOCK");
});
test("RBAC: nobody may mutate a price through the OS; only owner exports leads", () => {
  assert.deepEqual(CAPABILITIES["catalog.price_mutation"], []);
  assert.equal(check(OWNER, "catalog.price_mutation", { now: NOW }).code, "FORBIDDEN");
  assert.equal(check(SALES, "lead.export", { now: NOW }).code, "FORBIDDEN");
  assert.equal(check(OWNER, "lead.export", { now: NOW }).ok, true);
});

// --------------------------------------------------------------- Scenario A
test("A: an ineligible subscription produces no quote, no price, no payment request", () => {
  for (const id of ["chatgpt-plus-personal", "chatgpt-plus-starter-shared", "canva-pro-personal"]) {
    assert.throws(() => prepareQuote({ offer: { kind: "product", id }, termsVersion: "t" }, ctx()), (e) => e instanceof QuoteError && e.code === "QUOTE_INELIGIBLE_OFFER", id);
  }
  // every real service is pending too
  for (const s of realServices)
    assert.throws(() => prepareQuote({ offer: { kind: "service", id: s.id }, termsVersion: "t" }, ctx({ services: realServices })), /QUOTE_INELIGIBLE_OFFER/);
});

// --------------------------------------------------------------- Scenario B
test("B: an owner-approved service under a verified policy yields a server-priced quote", () => {
  const q = prepareQuote({ offer: { kind: "service", id: "syn-training" }, quantity: 2, termsVersion: "syn-terms-v1", price: 1, totalBdt: 1 }, ctx());
  assert.equal(q.unitPriceBdt, 1000, "browser-sent price is ignored");
  assert.equal(q.totalBdt, 2000);
  assert.equal(q.paymentPolicyVersion, "syn-pay-v1");
  assert.ok(q.id.startsWith("Q-"));
  assert.throws(() => prepareQuote({ offer: { kind: "service", id: "syn-training" }, termsVersion: "t" }, ctx({ paymentPolicy: { ...POLICY, status: "draft" } })), /QUOTE_NO_APPROVED_PAYMENT_POLICY/);
  assert.throws(() => prepareQuote({ offer: { kind: "service", id: "syn-training" } }, ctx()), /QUOTE_NO_TERMS_VERSION/);
  assert.throws(() => prepareQuote({ offer: { kind: "service", id: "syn-training" }, termsVersion: "t" }, ctx({ actor: FUL })), AuthzError);
});

// --------------------------------------------------------------- Scenario C
test("C: duplicate create with the same idempotency key returns one durable order", () => {
  const store = createMemoryStore();
  const q = acceptedQuoteId(store);
  const a = createOrder(store, { quoteId: q, idempotencyKey: "idem-0001-abc" }, { actor: SALES, now: NOW });
  const b = createOrder(store, { quoteId: q, idempotencyKey: "idem-0001-abc" }, { actor: SALES, now: NOW });
  assert.equal(a.id, b.id);
  assert.equal(store.orders.size, 1);
  assert.throws(() => createOrder(store, { quoteId: "Q-other", idempotencyKey: "idem-0001-abc" }, { actor: SALES, now: NOW }), /REUSED_FOR_DIFFERENT_QUOTE/);
  assert.throws(() => createOrder(store, { quoteId: q, idempotencyKey: "x" }, { actor: SALES, now: NOW }), /IDEMPOTENCY_KEY_REQUIRED/);
  assert.throws(() => createOrder(store, { quoteId: q, idempotencyKey: "idem-0003-abc" }, { actor: SALES, now: NOW }), /QUOTE_ALREADY_CONVERTED/);
  const pending = registerQuote(store, freshQuote(), { actor: SALES, now: NOW });
  assert.throws(() => createOrder(store, { quoteId: pending.id, idempotencyKey: "idem-0002-abc" }, { actor: SALES, now: NOW }), /QUOTE_NOT_ACCEPTED/);
  assert.throws(() => createOrder(store, { quoteId: "Q-unknown", idempotencyKey: "idem-0004-abc" }, { actor: SALES, now: NOW }), /QUOTE_NOT_FOUND/);
});

test("Security: a tampered stored quote or a caller-supplied amount cannot set the order amount", () => {
  const store = createMemoryStore();
  const id = acceptedQuoteId(store);
  store.quotes.get(id).totalBdt = 1; // tamper after acceptance
  assert.throws(() => createOrder(store, { quoteId: id, idempotencyKey: "idem-t-0001", totalBdt: 1 }, { actor: SALES, now: NOW }), /QUOTE_TAMPERED/);
  assert.throws(() => registerQuote(store, { ...freshQuote(), totalBdt: 5 }, { actor: SALES, now: NOW }), /QUOTE_AMOUNT_INCONSISTENT/);
  const s2 = createMemoryStore();
  const o = createOrder(s2, { quoteId: acceptedQuoteId(s2), idempotencyKey: "idem-t-0002", amountBdt: 1 }, { actor: SALES, now: NOW });
  assert.equal(o.amountBdt, 2000);
});

test("Security: truncating the event log is detected; secrets of several shapes are rejected", () => {
  const store = createMemoryStore();
  const o = createOrder(store, { quoteId: acceptedQuoteId(store), idempotencyKey: "idem-s-0001" }, { actor: SALES, now: NOW });
  assert.equal(verifyEvents(store), null);
  store.events.pop();
  assert.equal(verifyEvents(store), "TRUNCATED");
  const s2 = createMemoryStore();
  const o2 = createOrder(s2, { quoteId: acceptedQuoteId(s2), idempotencyKey: "idem-s-0002" }, { actor: SALES, now: NOW });
  for (const bad of [{ reference: "password hunter2" }, { reference: "OTP 482913" }, { reference: "পাসওয়ার্ড abc" }, { reference: "card 4111 1111 1111 1111" }]) {
    assert.throws(() => recordCustomerPaymentReport(s2, o2.id, bad, { actor: SALES, now: NOW }), /SECRET_IN_RECORD/, JSON.stringify(bad));
  }
  recordSettlement(s2, { businessId: "U05", reference: "SYN-TX-S", amountBdt: 2000, receivingAccountRef: "syn-acct", source: "receiving_side_statement" }, { actor: FIN, now: NOW });
  verifyPayment(s2, o2.id, { settlementReference: "SYN-TX-S" }, { actor: FIN, now: NOW });
  assert.throws(() => transition(s2, o2.id, "ASSIGNED", { actor: FUL, now: NOW, evidence: { loginEmail: "x" } }), /EVIDENCE_FIELD_NOT_ALLOWED/);
  void o;
});

// --------------------------------------------------------------- Scenario D
test("D: a customer-reported payment without receiving-side settlement stays in PAYMENT_REVIEW", () => {
  const store = createMemoryStore();
  const o = createOrder(store, { quoteId: acceptedQuoteId(store), idempotencyKey: "idem-d-0001" }, { actor: SALES, now: NOW });
  recordCustomerPaymentReport(store, o.id, { method: "synthetic-wallet", reference: "SYN-TX-1", screenshotRef: "syn.png" }, { actor: SALES, now: NOW });
  assert.equal(store.orders.get(o.id).state, "PAYMENT_REVIEW");
  assert.throws(() => verifyPayment(store, o.id, { settlementReference: "SYN-TX-1" }, { actor: FIN, now: NOW }), /NO_RECEIVING_SIDE_SETTLEMENT/);
  assert.throws(() => recordSettlement(store, { businessId: "U05", reference: "SYN-TX-1", amountBdt: 2000, receivingAccountRef: "syn-acct", source: "customer_screenshot" }, { actor: FIN, now: NOW }), /SETTLEMENT_INVALID/);
  recordSettlement(store, { businessId: "U05", reference: "SYN-TX-1", amountBdt: 1999, receivingAccountRef: "syn-acct", source: "receiving_side_statement" }, { actor: FIN, now: NOW });
  assert.throws(() => verifyPayment(store, o.id, { settlementReference: "SYN-TX-1" }, { actor: FIN, now: NOW }), /SETTLEMENT_AMOUNT_MISMATCH/);
  assert.equal(store.orders.get(o.id).state, "PAYMENT_REVIEW");
});

// --------------------------------------------------------------- Scenario E
test("E: staff without permission cannot confirm payment; the denial is audited", () => {
  const store = createMemoryStore();
  const o = createOrder(store, { quoteId: acceptedQuoteId(store), idempotencyKey: "idem-e-0001" }, { actor: SALES, now: NOW });
  recordSettlement(store, { businessId: "U05", reference: "SYN-TX-E", amountBdt: 2000, receivingAccountRef: "syn-acct", source: "receiving_side_statement" }, { actor: FIN, now: NOW });
  for (const actor of [SALES, FUL, OPS, { ...FIN, businessId: "U02" }]) {
    assert.throws(() => verifyPayment(store, o.id, { settlementReference: "SYN-TX-E" }, { actor, now: NOW }), AuthzError);
  }
  assert.ok(store.audit.filter((a) => a.type === "authz.denied" && a.capability === "payment.verify").length >= 4);
  assert.throws(() => transition(store, o.id, "PAYMENT_VERIFIED", { actor: OWNER, now: NOW }), /USE_DEDICATED_OPERATION/);
  assert.equal(store.orders.get(o.id).state, "PAYMENT_REVIEW");
});

// --------------------------------------------------------------- Scenario F
test("F: a verified order is assigned and fulfilled with an intact, tamper-evident history", () => {
  const store = createMemoryStore();
  const o = createOrder(store, { quoteId: acceptedQuoteId(store), idempotencyKey: "idem-f-0001" }, { actor: SALES, now: NOW });
  recordSettlement(store, { businessId: "U05", reference: "SYN-TX-F", amountBdt: 2000, receivingAccountRef: "syn-acct", source: "receiving_side_statement" }, { actor: FIN, now: NOW });
  verifyPayment(store, o.id, { settlementReference: "SYN-TX-F" }, { actor: FIN, now: NOW });
  assert.throws(() => verifyPayment(store, o.id, { settlementReference: "SYN-TX-F" }, { actor: FIN, now: NOW }), /NOT_IN_PAYMENT_REVIEW/);
  transition(store, o.id, "ASSIGNED", { actor: FUL, now: NOW });
  transition(store, o.id, "FULFILLING", { actor: FUL, now: NOW });
  assert.throws(() => transition(store, o.id, "DELIVERED", { actor: FUL, now: NOW, evidence: { checklistComplete: true, note: "password: hunter2" } }), /SECRET_IN_RECORD/);
  assert.throws(() => transition(store, o.id, "DELIVERED", { actor: FUL, now: NOW }), /DELIVERY_EVIDENCE_REQUIRED/);
  transition(store, o.id, "DELIVERED", { actor: FUL, now: NOW, evidence: { checklistComplete: true, customerAccepted: true } });
  transition(store, o.id, "CLOSED", { actor: FUL, now: NOW });
  assert.throws(() => transition(store, o.id, "REFUND_REVIEW", { actor: OWNER, now: NOW }), /TERMINAL_STATE_IMMUTABLE/);
  assert.deepEqual(store.events.filter((e) => e.orderId === o.id).map((e) => e.type), ["order.created", "state.PAYMENT_REVIEW", "payment.verified", "state.ASSIGNED", "state.FULFILLING", "state.DELIVERED", "state.CLOSED"]);
  assert.equal(verifyEvents(store), null);
  // tamper with one event: the chain must break at that point
  const i = 2;
  store.events[i] = { ...store.events[i], data: { settlementReference: "FORGED" } };
  assert.equal(verifyEvents(store), i + 1);
});

// --------------------------------------------------------------- Scenario G
test("G: notification provider failure leaves the order durable; outbox retries then dead-letters", async () => {
  const store = createMemoryStore();
  const o = createOrder(store, { quoteId: acceptedQuoteId(store), idempotencyKey: "idem-g-0001" }, { actor: SALES, now: NOW });
  let calls = 0;
  const failing = async () => { calls++; throw new Error("provider 503"); };
  for (let k = 0; k < 3; k++) await dispatchOutbox(store, failing, { maxAttempts: 3 });
  assert.equal(store.orders.get(o.id).state, "PAYMENT_REVIEW");
  assert.equal(store.outbox[0].status, "DEAD_LETTER");
  assert.equal(store.outbox[0].attempts, 3);
  await dispatchOutbox(store, failing, { maxAttempts: 3 });
  assert.equal(calls, 3, "no retry after dead-letter");
  const s2 = createMemoryStore();
  createOrder(s2, { quoteId: acceptedQuoteId(s2), idempotencyKey: "idem-g-0002" }, { actor: SALES, now: NOW });
  let first = true;
  await dispatchOutbox(s2, async () => { if (first) { first = false; throw new Error("timeout"); } });
  await dispatchOutbox(s2, async () => {});
  assert.equal(s2.outbox[0].status, "SENT");
  assert.equal(s2.outbox[0].attempts, 2);
});

// --------------------------------------------------------------- Scenario H
test("H: renewal reminder needs a permitted term, a recorded end date, consent, the window and no duplicate", () => {
  const sub = { id: "syn-sub", businessId: "U05", providerPermitted: true, consentToRemind: true, termEndsAt: "2026-11-24T00:00:00Z" };
  const ok = renewalReminderDecision(sub, { now: NOW });
  assert.equal(ok.ok, true);
  assert.equal(renewalReminderDecision(sub, { now: NOW, sent: new Set([ok.key]) }).code, "DUPLICATE_REMINDER");
  assert.equal(renewalReminderDecision({ ...sub, consentToRemind: false }, { now: NOW }).code, "NO_CONSENT");
  assert.equal(renewalReminderDecision({ ...sub, providerPermitted: false }, { now: NOW }).code, "NOT_PROVIDER_PERMITTED");
  assert.equal(renewalReminderDecision({ ...sub, termEndsAt: "soon" }, { now: NOW }).code, "NO_TERM_DATE");
  assert.equal(renewalReminderDecision({ ...sub, termEndsAt: "2027-02-01T00:00:00Z" }, { now: NOW }).code, "OUTSIDE_WINDOW");
  assert.equal(renewalReminderDecision({ ...sub, businessId: "U03" }, { now: NOW }).code, "WRONG_BUSINESS");
});

// --------------------------------------------------------------- Scenario I
test("I: a missing supplier cost makes contribution UNKNOWN, never a fabricated margin", () => {
  const base = { paymentVerified: true, recognizedRevenueBdt: 2000, processingFee: 30, fulfillmentLabor: 300, supportLabor: 50, refunds: 0, acquisitionCost: 100 };
  const c = contribution([{ id: "o1", ...base }]);
  assert.equal(c.contributionBdt, "UNKNOWN");
  assert.deepEqual(c.unknownInputs, ["o1.supplierCost"]);
  assert.equal(operatingProfit(c, 500), "UNKNOWN");
  const full = contribution([{ id: "o1", ...base, supplierCost: 0 }, { id: "demo", synthetic: true, ...base, supplierCost: 0 }, { id: "unpaid", ...base, supplierCost: 0, paymentVerified: false }]);
  assert.equal(full.ordersCounted, 1, "synthetic and unverified orders never count");
  assert.equal(full.excludedSynthetic, 1);
  assert.equal(full.contributionBdt, 2000 - 480);
  assert.equal(operatingProfit(full, 500), 1020);
  assert.equal(operatingProfit(full, undefined), "UNKNOWN");
});

// --------------------------------------------------------------- Scenario J
test("J: another business's identity or payment number in output fails the gate", () => {
  assert.deepEqual(crossBusinessViolations("WhatsApp +880 1533-262758"), []);
  assert.ok(crossBusinessViolations("Pay to +880 1865-385348").length > 0);
  assert.ok(crossBusinessViolations("bKash 01865385348").length > 0);
  assert.ok(crossBusinessViolations("Order via AI Premium Shop").length > 0);
  assert.ok(crossBusinessViolations("Bought on SaveOnSub").length > 0);
  // bypass attempts the first version allowed
  assert.ok(crossBusinessViolations("+880 1533-2627589").length > 0, "allowed prefix + extra digit");
  assert.ok(crossBusinessViolations("call 1865385348").length > 0, "bare 10-digit");
  assert.ok(crossBusinessViolations("https://wa.me/8801865385348").length > 0, "wa.me link");
  assert.deepEqual(crossBusinessViolations("https://wa.me/8801533262758 or 01533-262758"), []);
});

// ------------------------------------------------------------- CRM + support
test("CRM: no consent means no stored contact; export needs owner; retention purge works", () => {
  const l1 = createLead({ id: "L1", source: "whatsapp", contact: "syn-contact", consent: false }, { actor: SALES, now: NOW });
  assert.equal(l1.contact, null);
  const l2 = createLead({ id: "L2", source: "web", contact: "syn-contact-2", consent: true }, { actor: SALES, now: NOW });
  assert.throws(() => exportLeads([l1, l2], { actor: SALES, now: NOW }), AuthzError);
  assert.equal(exportLeads([l1, l2], { actor: OWNER, now: NOW })[1].contact, "syn-contact-2");
  assert.equal(purgeExpiredLeads([l1, l2], new Date("2028-01-01")).length, 0);
});
test("Support: tickets follow the lifecycle and close only after customer confirmation", () => {
  let t = { id: "T1", status: "OPEN", orderId: "O-syn" };
  t = moveTicket(t, "IN_PROGRESS", { actor: SALES, now: NOW });
  t = moveTicket(t, "RESOLVED", { actor: SALES, now: NOW });
  assert.throws(() => moveTicket(t, "CLOSED", { actor: SALES, now: NOW }), /NEEDS_CUSTOMER_CONFIRMATION/);
  t = moveTicket({ ...t, customerConfirmedResolution: true }, "CLOSED", { actor: SALES, now: NOW });
  assert.equal(t.history.length, 3);
  assert.throws(() => moveTicket(t, "OPEN", { actor: SALES, now: NOW }), /INVALID_TRANSITION/);
  assert.throws(() => moveTicket({ status: "OPEN" }, "IN_PROGRESS", { actor: FUL, now: NOW }), AuthzError);
});
test("Refund: only the owner approves; finance can only review", () => {
  const store = createMemoryStore();
  const o = createOrder(store, { quoteId: acceptedQuoteId(store), idempotencyKey: "idem-r-0001" }, { actor: SALES, now: NOW });
  recordSettlement(store, { businessId: "U05", reference: "SYN-TX-R", amountBdt: 2000, receivingAccountRef: "syn-acct", source: "receiving_side_statement" }, { actor: FIN, now: NOW });
  verifyPayment(store, o.id, { settlementReference: "SYN-TX-R" }, { actor: FIN, now: NOW });
  transition(store, o.id, "REFUND_REVIEW", { actor: FIN, now: NOW });
  assert.throws(() => transition(store, o.id, "REFUNDED", { actor: FIN, now: NOW }), AuthzError);
  transition(store, o.id, "REFUNDED", { actor: OWNER, now: NOW });
  assert.equal(verifyEvents(store), null);
});

// ------------------------------------------- storage contract (node:sqlite)
test("schema (design): storage layer blocks verify-without-settlement, wrong business, event edits", async () => {
  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(resolve(ROOT, "docs/business-os/schema.sql"), "utf8"));
  db.exec(`INSERT INTO quotes VALUES ('Q1','U05','service','s',1,'session',100,100,'t','p',NULL,'a','b','u','ACCEPTED')`);
  db.exec(`INSERT INTO orders VALUES ('O1','U05','Q1','idem-key-1',NULL,100,'PAYMENT_REVIEW','tok',NULL,'a')`);
  assert.throws(() => db.exec(`UPDATE orders SET state='PAYMENT_VERIFIED' WHERE id='O1'`), /no matching settlement/);
  db.exec(`INSERT INTO settlements VALUES ('REF1','U05','acct',100,'receiving_side_statement','O1','fin','t')`);
  db.exec(`UPDATE orders SET state='PAYMENT_VERIFIED' WHERE id='O1'`);
  assert.throws(() => db.exec(`INSERT INTO settlements VALUES ('REF2','U05','acct',100,'customer_screenshot',NULL,'fin','t')`), /CHECK/);
  assert.throws(() => db.exec(`INSERT INTO leads (id,business_id,source,delete_after) VALUES ('L','U03','w','x')`), /CHECK/);
  assert.throws(() => db.exec(`INSERT INTO leads (id,business_id,source,contact,delete_after) VALUES ('L2','U05','w','c','x')`), /CHECK/);
  db.exec(`INSERT INTO order_events (order_id,type,actor,at,prev_hash,hash) VALUES ('O1','t','a','x','G','h1')`);
  assert.throws(() => db.exec(`DELETE FROM order_events`), /append-only/);
  assert.throws(() => db.exec(`UPDATE order_events SET type='x'`), /append-only/);
  db.exec(`UPDATE orders SET state='CLOSED' WHERE id='O1'`);
  assert.throws(() => db.exec(`UPDATE orders SET state='REFUND_REVIEW' WHERE id='O1'`), /terminal state/);
});
