// scripts/business-os/harness.mjs — SYNTHETIC test/demo fixtures only.
// Every record created here is marked synthetic and uses made-up identifiers.
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { openSqlite, migrate } from "./sqlite-adapter.mjs";
import { createBusinessOs, grantsFrom } from "../../lib/business-os/orders.js";
import { issueSession, resolveActor } from "../../lib/business-os/identity.js";
import { newKey, ed25519Generate, exportPublicJwk, ed25519Sign, canonicalJson } from "../../lib/business-os/crypto.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const GOVERNANCE = JSON.parse(readFileSync(resolve(ROOT, "data/commercial-governance.json"), "utf8")).records;
export const REAL_SERVICES = JSON.parse(readFileSync(resolve(ROOT, "shared/service-governance.json"), "utf8")).services;

export const SYN_SERVICE = { id: "syn-training", status: "owner_approved", approved_bdt_price: 1000, price_unit: "session", price_approval_id: "SYN-APPROVAL-1", approval_valid_until: "2099-01-31", scope_approved: true, deliverables_approved: true, payment_terms_approved: true, refund_terms_approved: true, support_terms_approved: true };
export const SYN_POLICY = { businessId: "U05", status: "owner_approved", version: "syn-pay-v1", methods: ["synthetic-wallet"], validUntil: "2099-01-31" };
export const SYN_ROLES = ["business_owner", "sales_support", "finance_reviewer", "operations_manager", "fulfillment_operator", "auditor"];

/** Fresh migrated DB, synthetic grants, keys, a registered synthetic statement source. */
export async function setup({ file = ":memory:", faults, clock } = {}) {
  const adapter = openSqlite(file, { faults });
  migrate(adapter);
  const keys = { quoteKey: newKey(), sessionKey: newKey(), checkpointKey: newKey() };
  const now = clock ?? (() => new Date());
  const os = createBusinessOs({ adapter, keys, clock: now, synthetic: true });
  const g = (subject, role, extra = {}) => adapter.db.prepare("INSERT INTO staff_grants (id, business_id, subject, role, active, granted_by, granted_at, expires_at, revoked_at) VALUES (?,?,?,?,?,?,?,?,?)")
    .run(`G-${subject}-${role}`, "U05", subject, role, extra.active ?? 1, "syn-owner-bootstrap", now().toISOString(), extra.expiresAt ?? null, extra.revokedAt ?? null);
  for (const r of SYN_ROLES) g(`syn-${r}`, r);
  g("syn-revoked", "finance_reviewer", { revokedAt: "2026-01-01T00:00:00Z" });
  g("syn-expired", "finance_reviewer", { expiresAt: "2026-01-01T00:00:00Z" });
  g("syn-inactive", "finance_reviewer", { active: 0 });
  const grants = grantsFrom(adapter);
  const actor = async (subject, opts = {}) => resolveActor(await issueSession(keys.sessionKey, { subject, ...opts }), { sessionKey: keys.sessionKey, grants, now: now() });
  const A = {};
  for (const r of SYN_ROLES) A[r] = await actor(`syn-${r}`);
  // trusted statement source: the private key stays in this harness (the "bank export" side)
  const source = await ed25519Generate();
  await os.registerStatementSource(A.business_owner, { sourceId: "syn-bank-export", receivingAccountRef: "syn-acct-001", publicKeyJwk: await exportPublicJwk(source.publicKey) });
  const signLine = async (line, key = source.privateKey) => {
    const fields = ["sourceId", "receivingAccountRef", "transactionId", "statementRef", "currency", "amountPoisha", "txAt", "status"];
    const payload = canonicalJson(Object.fromEntries(fields.map((f) => [f, line[f]])));
    return { ...line, signature: await ed25519Sign(key, payload) };
  };
  const line = (over = {}) => ({ sourceId: "syn-bank-export", receivingAccountRef: "syn-acct-001", transactionId: "SYN-TX-" + Math.random().toString(36).slice(2, 10), statementRef: "syn-stmt-1", currency: "BDT", amountPoisha: 200000, txAt: new Date(now().getTime() - 60000).toISOString(), status: "settled", ...over });
  const deps = { governance: GOVERNANCE, services: [SYN_SERVICE], paymentPolicy: SYN_POLICY };
  const customerInbox = async () => (await adapter.all("SELECT * FROM outbox WHERE recipient_channel = 'customer' ORDER BY created_at")).map((m) => JSON.parse(m.payload));
  const tokenFor = async (quoteId) => (await customerInbox()).filter((p) => p.quoteId === quoteId && p.token).at(-1)?.token;
  /** quote → customer acceptance (via the customer channel) → returns quote id */
  const acceptedQuote = async (customerRef = "syn-cust-1") => {
    const q = await os.registerQuote(A.sales_support, { offer: { kind: "service", id: "syn-training" }, quantity: 2, termsVersion: "syn-terms-v1", customerRef, price: 1, totalBdt: 1 }, deps);
    await os.requestCustomerAcceptance(A.sales_support, q.id);
    await os.confirmCustomerAcceptance({ token: await tokenFor(q.id), customerRef, termsVersion: "syn-terms-v1" });
    return q.id;
  };
  return { adapter, os, keys, A, actor, grants, source, signLine, line, deps, customerInbox, tokenFor, acceptedQuote, now };
}
