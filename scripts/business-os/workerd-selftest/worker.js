// LOCAL-ONLY Workers-runtime self-test for the Business OS library.
// Never deployed: its wrangler config has no routes, no account, and it is not
// referenced by the site's wrangler.jsonc. Runs against a LOCAL D1 (miniflare).
import { createBusinessOs, grantsFrom, openOutboxPayload } from "../../../lib/business-os/orders.js";
import { d1Adapter } from "../../../lib/business-os/d1-adapter.js";
import { issueSession, resolveActor } from "../../../lib/business-os/identity.js";
import { newKey, ed25519Generate, exportPublicJwk, ed25519Sign, canonicalJson, sha256Hex } from "../../../lib/business-os/crypto.js";
import { check } from "../../../lib/business-os/rbac.js";
import { contribution } from "../../../lib/business-os/operations.js";
import governanceFile from "../../../data/commercial-governance.json";

const SVC = { id: "syn-training", status: "owner_approved", approved_bdt_price: 1000, price_unit: "session", price_approval_id: "SYN-APPROVAL-1", approval_valid_until: "2099-01-31", scope_approved: true, deliverables_approved: true, payment_terms_approved: true, refund_terms_approved: true, support_terms_approved: true };
const POLICY = { businessId: "U05", status: "owner_approved", version: "syn-pay-v1", methods: ["synthetic-wallet"], validUntil: "2099-01-31" };

async function selftest(env) {
  const out = { runtime: typeof navigator !== "undefined" ? navigator.userAgent : "unknown", steps: [] };
  const step = (name, ok, extra) => out.steps.push({ name, ok, ...(extra ?? {}) });
  const adapter = d1Adapter(env.DB);
  const run = randomish();
  const keys = { quoteKey: newKey(), outboxKey: newKey(), sessionKey: newKey() };
  const os = createBusinessOs({ adapter, keys, synthetic: true });
  const now = new Date().toISOString();
  for (const [s, r] of [[`syn-owner-${run}`, "business_owner"], [`syn-sales-${run}`, "sales_support"], [`syn-fin-${run}`, "finance_reviewer"]])
    await env.DB.prepare("INSERT INTO staff_grants (id, business_id, subject, role, active, granted_by, granted_at) VALUES (?,?,?,?,1,'syn-boot',?)").bind(`G-${s}`, "U05", s, r, now).run();
  const grants = grantsFrom(adapter);
  const actor = async (s) => resolveActor(await issueSession(keys.sessionKey, { subject: s }), { sessionKey: keys.sessionKey, grants });
  const owner = await actor(`syn-owner-${run}`), sales = await actor(`syn-sales-${run}`), fin = await actor(`syn-fin-${run}`);
  step("forged actor denied", check({ id: "x", businessId: "U05", grants: [{ role: "business_owner", active: true }] }, "payment.verify").code === "FORGED_ACTOR");
  const src = await ed25519Generate();
  await os.registerStatementSource(owner, { sourceId: `syn-bank-${run}`, receivingAccountRef: `syn-acct-${run}`, publicKeyJwk: await exportPublicJwk(src.publicKey) });
  const q = await os.registerQuote(sales, { offer: { kind: "service", id: "syn-training" }, quantity: 2, termsVersion: "syn-terms-v1", customerRef: `syn-cust-${run}`, price: 1 }, { governance: governanceFile.records, services: [SVC], paymentPolicy: POLICY });
  step("server price", q.totalBdt === 2000);
  await os.requestCustomerAcceptance(sales, q.id);
  // the newest customer message; only this run's outbox key can open it
  const msg = await env.DB.prepare("SELECT * FROM outbox WHERE recipient_channel = 'customer' ORDER BY rowid DESC LIMIT 1").first();
  const token = (await openOutboxPayload(msg, keys.outboxKey)).token;
  step("acceptance secret not readable from D1", !msg.payload.includes(token.split(".")[1]));
  let staffForge = false;
  try { await env.DB.prepare("UPDATE quotes SET state = 'ACCEPTED' WHERE id = ?").bind(q.id).run(); } catch { staffForge = true; }
  step("D1 trigger blocks acceptance without customer", staffForge);
  await os.confirmCustomerAcceptance({ token, customerRef: `syn-cust-${run}`, termsVersion: "syn-terms-v1" });
  let replay = false;
  try { await os.confirmCustomerAcceptance({ token, customerRef: `syn-cust-${run}`, termsVersion: "syn-terms-v1" }); } catch (e) { replay = e.code === "ACCEPTANCE_REPLAYED"; }
  step("acceptance replay blocked", replay);
  const o = await os.createOrder(sales, { quoteId: q.id, idempotencyKey: `idem-${run}` });
  const again = await os.createOrder(sales, { quoteId: q.id, idempotencyKey: `idem-${run}` });
  step("idempotent create", o.id === again.id);
  const fields = ["sourceId", "receivingAccountRef", "transactionId", "statementRef", "currency", "amountPoisha", "txAt", "status"];
  const line = { sourceId: `syn-bank-${run}`, receivingAccountRef: `syn-acct-${run}`, transactionId: `SYN-TX-${run}`, statementRef: "syn-stmt", currency: "BDT", amountPoisha: 200000, txAt: new Date(Date.now() - 60000).toISOString(), status: "settled" };
  const signature = await ed25519Sign(src.privateKey, canonicalJson(Object.fromEntries(fields.map((f) => [f, line[f]]))));
  let forged = false;
  try { await os.importSettlement(fin, { ...line, transactionId: `F-${run}`, signature }); } catch (e) { forged = e.code === "SETTLEMENT_SIGNATURE_INVALID"; }
  step("forged settlement rejected", forged);
  const { settlementId } = await os.importSettlement(fin, { ...line, signature });
  let noPerm = false;
  try { await os.verifyPayment(sales, o.id, settlementId); } catch (e) { noPerm = e.code === "FORBIDDEN"; }
  step("sales cannot verify payment", noPerm);
  const v = await os.verifyPayment(fin, o.id, settlementId);
  step("verified with signed settlement", v.state === "PAYMENT_VERIFIED");
  const chain = await os.verifyChain(owner);
  step("hash chain intact", chain.ok === true, { count: chain.count });
  step("UNKNOWN finance", contribution([{ id: "x", paymentVerified: true }]).contributionBdt === "UNKNOWN");
  step("WebCrypto sha256", (await sha256Hex("abc")).startsWith("ba7816bf"));
  out.ok = out.steps.every((s) => s.ok);
  return out;
}
function randomish() { const a = new Uint8Array(4); crypto.getRandomValues(a); return [...a].map((b) => b.toString(16).padStart(2, "0")).join(""); }

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname !== "/selftest") return new Response("not found", { status: 404 });
    try {
      return Response.json(await selftest(env));
    } catch (e) {
      return Response.json({ ok: false, error: String(e?.stack ?? e) }, { status: 500 });
    }
  },
};
