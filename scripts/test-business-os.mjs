// scripts/test-business-os.mjs — Cycle 8 Business OS tests (synthetic data only).
// Real SQLite with the D1-compatible migration, verified sessions, signed
// statement lines, customer-channel acceptance, concurrency and fault injection.
// Run: node --test scripts/test-business-os.mjs

import test from "node:test";
import assert from "node:assert/strict";
import { Worker } from "node:worker_threads";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setup, SYN_POLICY, REAL_SERVICES } from "./business-os/harness.mjs";
import { openSqlite, migrate, fakeD1 } from "./business-os/sqlite-adapter.mjs";
import { createBusinessOs, grantsFrom } from "../lib/business-os/orders.js";
import { d1Adapter } from "../lib/business-os/d1-adapter.js";
import { AuthzError, check } from "../lib/business-os/rbac.js";
import { issueSession, resolveActor, IdentityError } from "../lib/business-os/identity.js";
import { newKey, toHex, ed25519Generate, sha256Hex, canonicalJson } from "../lib/business-os/crypto.js";
import { contribution, contributionFromRows, operatingProfit, crossBusinessViolations, createLead, exportLeads, moveTicket, renewalReminderDecision } from "../lib/business-os/operations.js";
import { QuoteError } from "../lib/business-os/quote.js";

const rejectsCode = (p, code) => assert.rejects(p, (e) => (e.code ?? "") === code || String(e.message).includes(code), code);
const svcReq = (over = {}) => ({ offer: { kind: "service", id: "syn-training" }, quantity: 1, termsVersion: "syn-terms-v1", customerRef: "syn-cust-1", ...over });

// ---------------------------------------------------------- 1. price authority
test("QA1: the browser cannot set the authoritative price; ineligible offers yield no quote", async () => {
  const h = await setup();
  const q = await h.os.registerQuote(h.A.sales_support, svcReq({ quantity: 2, price: 1, totalBdt: 1, unitPriceBdt: 1 }), h.deps);
  assert.equal(q.totalBdt, 2000);
  assert.equal((await h.adapter.first("SELECT total_bdt FROM quotes WHERE id = ?", [q.id])).total_bdt, 2000);
  assert.throws(() => h.adapter.db.prepare("UPDATE quotes SET total_bdt = 1 WHERE id = ?").run(q.id), /immutable/);
  for (const id of ["chatgpt-plus-personal", "canva-pro-personal"])
    await assert.rejects(h.os.registerQuote(h.A.sales_support, svcReq({ offer: { kind: "product", id } }), h.deps), (e) => e instanceof QuoteError && e.code === "QUOTE_INELIGIBLE_OFFER");
  for (const s of REAL_SERVICES)
    await assert.rejects(h.os.registerQuote(h.A.sales_support, svcReq({ offer: { kind: "service", id: s.id } }), { ...h.deps, services: REAL_SERVICES }), /QUOTE_INELIGIBLE_OFFER/);
  await assert.rejects(h.os.registerQuote(h.A.sales_support, svcReq(), { ...h.deps, paymentPolicy: { ...SYN_POLICY, status: "draft" } }), /QUOTE_NO_APPROVED_PAYMENT_POLICY/);
  await assert.rejects(h.os.registerQuote(h.A.sales_support, svcReq({ customerRef: undefined }), h.deps), /QUOTE_BAD_CUSTOMER_REF/);
});

// ------------------------------------------------- 2. P0-A customer acceptance
test("P0-A/QA2: staff cannot invent customer acceptance", async () => {
  const h = await setup();
  const q = await h.os.registerQuote(h.A.sales_support, svcReq(), h.deps);
  const req = await h.os.requestCustomerAcceptance(h.A.sales_support, q.id);
  assert.deepEqual(Object.keys(req).sort(), ["challengeId", "expiresAt"], "staff never receive the one-time secret");
  assert.throws(() => h.adapter.db.prepare("INSERT INTO quote_acceptances VALUES (?,?,?,?,?,?,?,?)").run(q.id, req.challengeId, q.version, "customer_link", "x", new Date().toISOString(), "syn-terms-v1", "syn-cust-1"), /does not match a consumed customer challenge/);
  assert.throws(() => h.adapter.db.prepare("UPDATE quotes SET state = 'ACCEPTED' WHERE id = ?").run(q.id), /no customer acceptance/);
  await rejectsCode(h.os.confirmCustomerAcceptance({ token: `${req.challengeId}.${"0".repeat(48)}`, customerRef: "syn-cust-1", termsVersion: "syn-terms-v1" }), "ACCEPTANCE_TOKEN_INVALID");
  await rejectsCode(h.os.createOrder(h.A.sales_support, { quoteId: q.id, idempotencyKey: "idem-a-0001" }), "QUOTE_NOT_ACCEPTED");
  assert.equal((await h.adapter.all("SELECT * FROM audit_log WHERE type = 'acceptance.rejected'")).length, 1);
});

test("P0-A: acceptance requires the right customer, terms, unexpired challenge, and is single-use", async () => {
  let t = Date.now();
  const h = await setup({ clock: () => new Date(t) });
  const q = await h.os.registerQuote(h.A.sales_support, svcReq(), h.deps);
  await h.os.requestCustomerAcceptance(h.A.sales_support, q.id, { ttlHours: 1 });
  const token = await h.tokenFor(q.id);
  await rejectsCode(h.os.confirmCustomerAcceptance({ token, customerRef: "syn-cust-2", termsVersion: "syn-terms-v1" }), "ACCEPTANCE_WRONG_CUSTOMER");
  await rejectsCode(h.os.confirmCustomerAcceptance({ token, customerRef: "syn-cust-1", termsVersion: "syn-terms-v0" }), "ACCEPTANCE_TERMS_MISMATCH");
  assert.equal((await h.os.confirmCustomerAcceptance({ token, customerRef: "syn-cust-1", termsVersion: "syn-terms-v1" })).quoteId, q.id);
  await rejectsCode(h.os.confirmCustomerAcceptance({ token, customerRef: "syn-cust-1", termsVersion: "syn-terms-v1" }), "ACCEPTANCE_REPLAYED");
  const acc = await h.adapter.first("SELECT * FROM quote_acceptances WHERE quote_id = ?", [q.id]);
  assert.equal(acc.source, "customer_link");
  assert.equal(acc.quote_version, q.version);
  const q2 = await h.os.registerQuote(h.A.sales_support, svcReq(), h.deps);
  await h.os.requestCustomerAcceptance(h.A.sales_support, q2.id, { ttlHours: 1 });
  const tok2 = await h.tokenFor(q2.id);
  t += 2 * 3600e3;
  await rejectsCode(h.os.confirmCustomerAcceptance({ token: tok2, customerRef: "syn-cust-1", termsVersion: "syn-terms-v1" }), "ACCEPTANCE_EXPIRED");
});

// ----------------------------------------------- 3/4. P0-B settlement provenance
test("QA3: a customer-reported payment never confirms settlement", async () => {
  const h = await setup();
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote(), idempotencyKey: "idem-p-0001" });
  assert.equal((await h.os.recordCustomerPaymentReport(h.A.sales_support, o.id, { method: "synthetic-wallet", reference: "SYN-REF-9", screenshotRef: "syn.png" })).state, "PAYMENT_REVIEW");
  await rejectsCode(h.os.verifyPayment(h.A.finance_reviewer, o.id, "S-none"), "NO_RECEIVING_SIDE_SETTLEMENT");
  assert.throws(() => h.adapter.db.prepare("UPDATE orders SET state = 'PAYMENT_VERIFIED' WHERE id = ?").run(o.id), /no allocated receiving-side settlement/);
});

test("P0-B/QA4: a settlement cannot be forged — signature, source, account, role, duplicates, allocation", async () => {
  const h = await setup();
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote(), idempotencyKey: "idem-s-0001" });
  const good = await h.signLine(h.line());
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, { ...h.line(), source: "receiving_side_statement" }), "SETTLEMENT_SIGNATURE_INVALID");
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, { ...good, amountPoisha: 999900 }), "SETTLEMENT_SIGNATURE_INVALID");
  const rogue = await ed25519Generate();
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line(), rogue.privateKey)), "SETTLEMENT_SIGNATURE_INVALID");
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line({ receivingAccountRef: "syn-other-acct" }))), "SETTLEMENT_ACCOUNT_MISMATCH");
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line({ sourceId: "syn-unknown" }))), "SETTLEMENT_UNKNOWN_SOURCE");
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line({ status: "pending" }))), "SETTLEMENT_INVALID");
  await assert.rejects(h.os.importSettlement(h.A.sales_support, good), AuthzError);
  await assert.rejects(h.os.registerStatementSource(h.A.finance_reviewer, { sourceId: "syn-x", receivingAccountRef: "syn-acct-x", publicKeyJwk: { kty: "OKP", crv: "Ed25519", x: "a" } }), AuthzError);
  const { settlementId } = await h.os.importSettlement(h.A.finance_reviewer, good);
  await rejectsCode(h.os.importSettlement(h.A.finance_reviewer, good), "SETTLEMENT_DUPLICATE");
  assert.throws(() => h.adapter.db.prepare("INSERT INTO settlements (id, source_id, transaction_id, statement_ref, receiving_account_ref, currency, amount_poisha, tx_at, status, signature, imported_by, imported_at) VALUES ('S-x','syn-bank-export','T-x','s','syn-other','BDT',200000,'t','settled','sig','x','t')").run(), /active source/);
  const small = await h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line({ amountPoisha: 100000 })));
  await rejectsCode(h.os.verifyPayment(h.A.finance_reviewer, o.id, small.settlementId), "SETTLEMENT_AMOUNT_MISMATCH");
  await assert.rejects(h.os.verifyPayment(h.A.sales_support, o.id, settlementId), AuthzError);
  assert.equal((await h.os.verifyPayment(h.A.finance_reviewer, o.id, settlementId)).state, "PAYMENT_VERIFIED");
  const o2 = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote("syn-cust-2"), idempotencyKey: "idem-s-0002" });
  await rejectsCode(h.os.verifyPayment(h.A.finance_reviewer, o2.id, settlementId), "SETTLEMENT_ALREADY_ALLOCATED");
  assert.throws(() => h.adapter.db.prepare("UPDATE settlements SET allocated_to = ? WHERE id = ?").run(o2.id, settlementId), /allocated once/);
});

// ------------------------------------------------------------ 5. idempotency
test("QA5: duplicate idempotency keys never create duplicate orders (sequential)", async () => {
  const h = await setup();
  const qid = await h.acceptedQuote();
  const a = await h.os.createOrder(h.A.sales_support, { quoteId: qid, idempotencyKey: "idem-c-0001" });
  const b = await h.os.createOrder(h.A.sales_support, { quoteId: qid, idempotencyKey: "idem-c-0001" });
  assert.equal(a.id, b.id);
  await rejectsCode(h.os.createOrder(h.A.sales_support, { quoteId: qid, idempotencyKey: "idem-c-0002" }), "QUOTE_ALREADY_CONVERTED");
  await rejectsCode(h.os.createOrder(h.A.sales_support, { quoteId: "Q-other", idempotencyKey: "idem-c-0001" }), "IDEMPOTENCY_KEY_REUSED_FOR_DIFFERENT_QUOTE");
  assert.equal((await h.adapter.first("SELECT count(*) n FROM orders")).n, 1);
});

async function race(file, h, quoteId, keys) {
  const barrier = new SharedArrayBuffer(4);
  const run = (key) => new Promise((res, rej) => {
    const w = new Worker(new URL("./business-os/concurrency-worker.mjs", import.meta.url), { workerData: { file, quoteKeyHex: toHex(h.keys.quoteKey), sessionKeyHex: toHex(h.keys.sessionKey), quoteId, idempotencyKey: key, barrier } });
    w.once("message", res); w.once("error", rej);
  });
  return Promise.all(keys.map(run));
}
test("QA5: real concurrency — two connections, same key → one order; different keys → one wins", async () => {
  const file = join(mkdtempSync(join(tmpdir(), "aitp-bos-")), "ops.sqlite");
  const h = await setup({ file });
  const q1 = await h.acceptedQuote("syn-cust-1");
  const same = await race(file, h, q1, ["idem-race-0001", "idem-race-0001"]);
  assert.ok(same.every((r) => r.ok), JSON.stringify(same));
  assert.equal(same[0].id, same[1].id);
  const q2 = await h.acceptedQuote("syn-cust-2");
  const diff = await race(file, h, q2, ["idem-race-0002", "idem-race-0003"]);
  assert.equal(diff.filter((r) => r.ok).length, 1, JSON.stringify(diff));
  assert.ok(diff.some((r) => !r.ok && /QUOTE_ALREADY_CONVERTED|QUOTE_NOT_ACCEPTED/.test(r.code)), JSON.stringify(diff));
  assert.equal((await h.adapter.first("SELECT count(*) n FROM orders")).n, 2);
  assert.equal((await h.os.verifyChain()).ok, true);
  h.adapter.close();
});

// ------------------------------------------------------- 6. P1-C finance truth
test("P1-C/QA6: missing revenue or cost stays UNKNOWN; a real zero is known; synthetic excluded", () => {
  const base = { id: "o1", paymentVerified: true, supplierCost: 0, processingFee: 30, fulfillmentLabor: 300, supportLabor: 50, refunds: 0, acquisitionCost: 100 };
  const noRev = contribution([{ ...base }]);
  assert.equal(noRev.recognizedRevenueBdt, "UNKNOWN");
  assert.equal(noRev.contributionBdt, "UNKNOWN");
  assert.deepEqual(noRev.unknownInputs, ["o1.recognizedRevenueBdt"]);
  const zeroRev = contribution([{ ...base, recognizedRevenueBdt: 0 }]);
  assert.equal(zeroRev.recognizedRevenueBdt, 0);
  assert.equal(zeroRev.contributionBdt, -480);
  assert.equal(contribution([{ ...base, recognizedRevenueBdt: 2000, supplierCost: null }]).contributionBdt, "UNKNOWN");
  assert.equal(contribution([{ ...base, recognizedRevenueBdt: Number.NaN }]).recognizedRevenueBdt, "UNKNOWN");
  const mix = contribution([{ ...base, recognizedRevenueBdt: 2000 }, { ...base, id: "demo", synthetic: true, recognizedRevenueBdt: 9e9 }, { ...base, id: "unpaid", paymentVerified: false, recognizedRevenueBdt: 9e9 }]);
  assert.equal(mix.ordersCounted, 1);
  assert.equal(mix.excludedSynthetic, 1);
  assert.equal(mix.excludedUnverified, 1);
  assert.equal(mix.contributionBdt, 1520);
  assert.equal(operatingProfit(mix, 500), 1020);
  assert.equal(operatingProfit(noRev, 500), "UNKNOWN");
  assert.equal(operatingProfit(mix, null), "UNKNOWN");
  assert.equal(contribution([]).contributionBdt, 0, "no verified orders: a known zero, not a fabrication");
});
test("P1-C: database finance rows — NULL cost is UNKNOWN; synthetic orders never enter real totals", async () => {
  const h = await setup();
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote(), idempotencyKey: "idem-f-0001" });
  const { settlementId } = await h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line()));
  await h.os.verifyPayment(h.A.finance_reviewer, o.id, settlementId);
  await h.os.recordCosts(h.A.finance_reviewer, o.id, { recognizedRevenueBdt: 2000, processingFee: 30 });
  const rows = await h.os.financeRows(h.A.finance_reviewer);
  const c = contributionFromRows(rows);
  assert.equal(c.ordersCounted, 0, "every harness order is synthetic");
  assert.equal(c.excludedSynthetic, 1);
  const asReal = contributionFromRows(rows.map((r) => ({ ...r, synthetic: 0 })));
  assert.equal(asReal.contributionBdt, "UNKNOWN");
  assert.ok(asReal.unknownInputs.includes(`${o.id}.supplierCost`));
  await rejectsCode(h.os.recordCosts(h.A.finance_reviewer, o.id, { supplierCost: -5 }), "COST_INVALID");
  await assert.rejects(h.os.financeRows(h.A.sales_support), AuthzError);
});

// ------------------------------------------------- 7/8. P1-E identity and RBAC
test("P1-E/QA7/QA8: forged, wrong-business, revoked, expired, inactive, unknown and tampered identities are denied", async () => {
  const h = await setup();
  const forged = { id: "syn-business_owner", businessId: "U05", grants: [{ role: "business_owner", active: true }] };
  assert.equal(check(forged, "payment.verify").code, "FORGED_ACTOR");
  await assert.rejects(h.os.importSettlement(forged, await h.signLine(h.line())), (e) => e.code === "FORGED_ACTOR");
  await assert.rejects(resolveActor(await issueSession(h.keys.sessionKey, { subject: "syn-finance_reviewer", businessId: "U03" }), { sessionKey: h.keys.sessionKey, grants: h.grants }), (e) => e.code === "WRONG_BUSINESS");
  const tok = await issueSession(h.keys.sessionKey, { subject: "syn-finance_reviewer" });
  await assert.rejects(resolveActor(tok.slice(0, -2) + (tok.endsWith("00") ? "11" : "00"), { sessionKey: h.keys.sessionKey, grants: h.grants }), (e) => e.code === "BAD_SESSION_SIGNATURE");
  await assert.rejects(resolveActor(await issueSession(newKey(), { subject: "syn-finance_reviewer" }), { sessionKey: h.keys.sessionKey, grants: h.grants }), (e) => e.code === "BAD_SESSION_SIGNATURE");
  await assert.rejects(resolveActor(await issueSession(h.keys.sessionKey, { subject: "syn-finance_reviewer", ttlSeconds: -10 }), { sessionKey: h.keys.sessionKey, grants: h.grants }), (e) => e instanceof IdentityError && e.code === "SESSION_EXPIRED");
  for (const subject of ["syn-revoked", "syn-expired", "syn-inactive", "syn-nobody"])
    assert.equal(check(await h.actor(subject), "payment.verify").code, "NO_ACTIVE_GRANT", subject);
  assert.equal(check(h.A.fulfillment_operator, "payment.verify").code, "FORBIDDEN");
  assert.throws(() => h.adapter.db.prepare("INSERT INTO staff_grants (id, business_id, subject, role, active, granted_by, granted_at) VALUES ('g','U03','x','business_owner',1,'x','t')").run(), /CHECK/);
  await assert.rejects(h.os.verifyPayment(h.A.auditor, "O-x", "S-x"), AuthzError);
  assert.ok((await h.adapter.all("SELECT * FROM audit_log WHERE type = 'authz.denied'")).length >= 2);
});

// ---------------------------------------------------- 9. transaction failure
test("QA9: a failure inside the payment batch leaves no partial paid order", async () => {
  let fail = false;
  const h = await setup({ faults: { failBeforeStatement: (sql) => fail && /UPDATE orders SET state = 'PAYMENT_VERIFIED'/.test(sql) } });
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote(), idempotencyKey: "idem-x-0001" });
  const { settlementId } = await h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line()));
  const before = await h.adapter.first("SELECT count, hash FROM chain_head");
  fail = true;
  await assert.rejects(h.os.verifyPayment(h.A.finance_reviewer, o.id, settlementId), /INJECTED_FAULT/);
  fail = false;
  assert.equal((await h.adapter.first("SELECT state FROM orders WHERE id = ?", [o.id])).state, "PAYMENT_REVIEW");
  assert.equal((await h.adapter.first("SELECT allocated_to FROM settlements WHERE id = ?", [settlementId])).allocated_to, null);
  assert.deepEqual(await h.adapter.first("SELECT count, hash FROM chain_head"), before);
  assert.equal((await h.adapter.first("SELECT count(*) n FROM outbox WHERE kind = 'paid_order_alert'")).n, 0);
  assert.equal((await h.os.verifyPayment(h.A.finance_reviewer, o.id, settlementId)).state, "PAYMENT_VERIFIED", "retry after the fault succeeds");
});

// --------------------------------------------------- 10. notification failure
test("QA10: notification failure never loses the order; bounded retries then dead-letter", async () => {
  const h = await setup();
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote(), idempotencyKey: "idem-n-0001" });
  for (let i = 0; i < 3; i++) await h.os.dispatchOutbox(async () => { throw new Error("provider 503"); }, { maxAttempts: 3 });
  assert.equal((await h.os.getOrder(h.A.sales_support, o.id)).state, "PAYMENT_REVIEW");
  const dead = await h.adapter.all("SELECT * FROM outbox WHERE status = 'DEAD_LETTER'");
  assert.ok(dead.length >= 1 && dead.every((m) => m.attempts === 3));
  await h.os.dispatchOutbox(async () => { throw new Error("still down"); }, { maxAttempts: 3 });
  assert.ok((await h.adapter.all("SELECT * FROM outbox WHERE status = 'DEAD_LETTER'")).every((m) => m.attempts === 3), "no retry after dead-letter");
});

// --------------------------------------------------------- 11. tracking tokens
test("QA11: a customer tracking token reveals only its own order", async () => {
  const h = await setup();
  const o1 = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote("syn-cust-1"), idempotencyKey: "idem-t-0001" });
  const o2 = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote("syn-cust-2"), idempotencyKey: "idem-t-0002" });
  const inbox = await h.customerInbox();
  const t1 = inbox.find((m) => m.orderId === o1.id).token, t2 = inbox.find((m) => m.orderId === o2.id).token;
  assert.deepEqual(Object.keys(await h.os.track(t1)).sort(), ["createdAt", "orderId", "state"]);
  assert.equal((await h.os.track(t1)).orderId, o1.id);
  assert.equal((await h.os.track(t2)).orderId, o2.id);
  assert.equal(await h.os.track("f".repeat(40)), null);
  assert.equal(await h.os.track("' OR 1=1 --"), null);
  assert.ok(!JSON.stringify(await h.adapter.all("SELECT * FROM orders")).includes(t1), "only the token hash is stored");
});

// -------------------------------------------------- 12. cross-business gate
test("QA12: another business's identity or number in output fails the gate", () => {
  assert.deepEqual(crossBusinessViolations("WhatsApp +880 1533-262758"), []);
  for (const bad of ["Pay to +880 1865-385348", "০১৮৬৫-৩৮৫৩৪৮", "Order via AI Premium Shop", "Bought on SaveOnSub", "0186\t538\n5348"])
    assert.ok(crossBusinessViolations(bad).length > 0, bad);
});

// ------------------------------------------------------- P1-D audit integrity
test("P1-D: events are append-only; full-history rewrite is caught by an external checkpoint", async () => {
  const h = await setup();
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote(), idempotencyKey: "idem-h-0001" });
  await h.os.recordCustomerPaymentReport(h.A.sales_support, o.id, { method: "synthetic-wallet" });
  assert.equal((await h.os.verifyChain()).ok, true);
  const db = h.adapter.db;
  assert.throws(() => db.prepare("UPDATE order_events SET actor = 'x' WHERE chain_seq = 1").run(), /append-only/);
  assert.throws(() => db.prepare("DELETE FROM order_events").run(), /append-only/);
  assert.throws(() => db.prepare("UPDATE chain_head SET count = 0, hash = 'GENESIS'").run(), /chain head/);
  assert.throws(() => db.prepare("INSERT INTO order_events (chain_seq, order_id, type, actor, at, prev_hash, hash) VALUES (99, NULL, 'x', 'x', 't', 'bad', 'h')").run(), /chain head moved/);
  const cp = await h.os.exportCheckpoint(h.keys.checkpointKey);
  assert.equal((await h.os.verifyAgainstCheckpoint(cp, h.keys.checkpointKey)).ok, true);
  // A privileged operator drops the triggers and rewrites the WHOLE chain consistently.
  for (const t of ["events_no_update", "events_no_delete", "chain_head_forward_only", "events_compare_and_set"]) db.exec(`DROP TRIGGER ${t}`);
  let prev = "GENESIS";
  for (const r of db.prepare("SELECT * FROM order_events ORDER BY chain_seq").all()) {
    const actor = r.chain_seq === 1 ? "forged-actor" : r.actor;
    const row = { chain_seq: r.chain_seq, order_id: r.order_id, type: r.type, actor, from_state: r.from_state, to_state: r.to_state, data: r.data, at: r.at, prev_hash: prev };
    const hash = await sha256Hex(prev + canonicalJson(row));
    db.prepare("UPDATE order_events SET actor = ?, prev_hash = ?, hash = ? WHERE chain_seq = ?").run(actor, prev, hash, r.chain_seq);
    prev = hash;
  }
  db.prepare("UPDATE chain_head SET hash = ? WHERE id = 1").run(prev);
  assert.equal((await h.os.verifyChain()).ok, true, "internally consistent after the rewrite");
  assert.deepEqual(await h.os.verifyAgainstCheckpoint(cp, h.keys.checkpointKey), { ok: false, reason: "HISTORY_REWRITTEN" });
  assert.equal((await h.os.verifyAgainstCheckpoint({ ...cp, head: "0".repeat(64) }, h.keys.checkpointKey)).reason, "CHECKPOINT_SIGNATURE");
});

// ---------------------------------------- D1 adapter path + migration safety
test("D1 adapter contract: the same flow works through d1Adapter(fake D1 binding)", async () => {
  const local = openSqlite(":memory:");
  migrate(local);
  const h = await setup();
  const d1 = d1Adapter(fakeD1(local));
  const os = createBusinessOs({ adapter: d1, keys: { quoteKey: h.keys.quoteKey }, synthetic: true });
  local.db.prepare("INSERT INTO staff_grants (id, business_id, subject, role, active, granted_by, granted_at) VALUES ('g1','U05','syn-sales_support','sales_support',1,'boot','t')").run();
  const actor = await resolveActor(await issueSession(h.keys.sessionKey, { subject: "syn-sales_support" }), { sessionKey: h.keys.sessionKey, grants: grantsFrom(d1) });
  const q = await os.registerQuote(actor, svcReq(), h.deps);
  await os.requestCustomerAcceptance(actor, q.id);
  const msg = JSON.parse((await local.first("SELECT payload FROM outbox WHERE recipient_channel = 'customer'")).payload);
  await os.confirmCustomerAcceptance({ token: msg.token, customerRef: "syn-cust-1", termsVersion: "syn-terms-v1" });
  assert.equal((await os.createOrder(actor, { quoteId: q.id, idempotencyKey: "idem-d1-0001" })).state, "PAYMENT_REVIEW");
  assert.equal((await os.verifyChain()).ok, true);
});
test("Migrations: applied once; a failing migration rolls back completely", () => {
  const a = openSqlite(":memory:");
  assert.deepEqual(migrate(a), ["0001_business_os.sql"]);
  assert.deepEqual(migrate(a), []);
  const dir = join(mkdtempSync(join(tmpdir(), "aitp-mig-")), "m");
  mkdirSync(dir);
  writeFileSync(join(dir, "0001_ok.sql"), "CREATE TABLE t1 (x INTEGER);");
  writeFileSync(join(dir, "0002_bad.sql"), "CREATE TABLE t2 (x INTEGER); INSERT INTO nope VALUES (1);");
  const b = openSqlite(":memory:");
  assert.throws(() => migrate(b, dir), /MIGRATION_FAILED 0002_bad.sql/);
  assert.ok(b.db.prepare("SELECT name FROM sqlite_master WHERE name = 't1'").get());
  assert.equal(b.db.prepare("SELECT name FROM sqlite_master WHERE name = 't2'").get(), undefined, "partial migration rolled back");
  assert.deepEqual(b.db.prepare("SELECT version FROM schema_migrations").all().map((r) => r.version), ["0001_ok.sql"]);
});

// ------------------------------------------------- full vertical slice (library)
test("Vertical slice: staff → service → quote → customer acceptance → order → signed settlement → verification → fulfilment → support → finance", async () => {
  const h = await setup();
  const o = await h.os.createOrder(h.A.sales_support, { quoteId: await h.acceptedQuote("syn-cust-9"), idempotencyKey: "idem-v-0001" });
  await h.os.recordCustomerPaymentReport(h.A.sales_support, o.id, { method: "synthetic-wallet", reference: "SYN-REF-1" });
  const { settlementId } = await h.os.importSettlement(h.A.finance_reviewer, await h.signLine(h.line()));
  await h.os.verifyPayment(h.A.finance_reviewer, o.id, settlementId);
  await h.os.transition(h.A.fulfillment_operator, o.id, "ASSIGNED");
  await h.os.transition(h.A.fulfillment_operator, o.id, "FULFILLING");
  await rejectsCode(h.os.transition(h.A.fulfillment_operator, o.id, "DELIVERED", { evidence: { checklistComplete: true, note: "password: x" } }), "SECRET_IN_RECORD");
  await rejectsCode(h.os.transition(h.A.fulfillment_operator, o.id, "DELIVERED", { evidence: { loginEmail: "x" } }), "EVIDENCE_FIELD_NOT_ALLOWED");
  await h.os.transition(h.A.fulfillment_operator, o.id, "DELIVERED", { evidence: { checklistComplete: true, customerAccepted: true } });
  let t = { id: "T1", status: "OPEN", orderId: o.id };
  t = moveTicket(t, "IN_PROGRESS", { actor: h.A.sales_support });
  t = moveTicket({ ...moveTicket(t, "RESOLVED", { actor: h.A.sales_support }), customerConfirmedResolution: true }, "CLOSED", { actor: h.A.sales_support });
  assert.equal(t.status, "CLOSED");
  await h.os.transition(h.A.fulfillment_operator, o.id, "CLOSED");
  await rejectsCode(h.os.transition(h.A.business_owner, o.id, "REFUND_REVIEW"), "INVALID_TRANSITION");
  await h.os.recordCosts(h.A.finance_reviewer, o.id, { recognizedRevenueBdt: 2000, supplierCost: 0, processingFee: 30, fulfillmentLabor: 300, supportLabor: 50, refunds: 0, acquisitionCost: 100 });
  assert.equal(contributionFromRows(await h.os.financeRows(h.A.finance_reviewer)).ordersCounted, 0, "synthetic slice never reaches real KPIs");
  const types = (await h.adapter.all("SELECT type FROM order_events WHERE order_id = ? ORDER BY chain_seq", [o.id])).map((r) => r.type);
  assert.deepEqual(types, ["order.created", "payment.customer_reported", "state.PAYMENT_VERIFIED", "state.ASSIGNED", "state.FULFILLING", "state.DELIVERED", "state.CLOSED"]);
  assert.equal((await h.os.verifyChain()).ok, true);
});

// --------------------------------------------- carried over from C7 (operations)
test("CRM, renewals: consent-gated contact, owner-only export, reminder rules", async () => {
  const h = await setup();
  const l1 = createLead({ id: "L1", source: "whatsapp", contact: "syn-contact", consent: false }, { actor: h.A.sales_support });
  assert.equal(l1.contact, null);
  assert.throws(() => exportLeads([l1], { actor: h.A.sales_support }), AuthzError);
  assert.equal(exportLeads([l1], { actor: h.A.business_owner }).length, 1);
  const sub = { id: "syn-sub", businessId: "U05", providerPermitted: true, consentToRemind: true, termEndsAt: new Date(Date.now() + 3 * 864e5).toISOString() };
  const ok = renewalReminderDecision(sub);
  assert.equal(ok.ok, true);
  assert.equal(renewalReminderDecision(sub, { sent: new Set([ok.key]) }).code, "DUPLICATE_REMINDER");
  assert.equal(renewalReminderDecision({ ...sub, consentToRemind: false }).code, "NO_CONSENT");
});
