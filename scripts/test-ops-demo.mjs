// scripts/test-ops-demo.mjs — HTTP end-to-end test of the LOCAL synthetic ops demo.
// Starts the demo on a random loopback port, drives the full flow over HTTP and
// checks the API boundary (session-only identity, CSRF header, customer/staff
// separation, tracking isolation). Also proves the demo never reaches the site.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { startDemo } from "./business-os/ops-demo/server.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function client(base) {
  let cookie = "";
  const call = async (method, path, body, headers = {}) => {
    const r = await fetch(base + path, { method, headers: { "content-type": "application/json", "x-requested-with": "aitp-ops", ...(cookie ? { cookie } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
    const set = r.headers.get("set-cookie");
    if (set) cookie = set.split(";")[0];
    return { status: r.status, body: await r.json().catch(() => null), headers: r.headers };
  };
  return { call, setCookie: (c) => { cookie = c; } };
}

test("ops demo: full vertical slice over HTTP with synthetic data", async () => {
  const d = await startDemo({ port: 0 });
  try {
    const anon = client(d.url);
    assert.equal((await anon.call("GET", "/ops/api/me")).status, 401, "no session → 401");
    assert.equal((await anon.call("POST", "/ops/api/quotes", { offerId: "syn-training" }, { "x-requested-with": "" })).status, 403, "missing CSRF header → 403");
    const forgedBody = await anon.call("POST", "/ops/api/quotes", { offerId: "syn-training", quantity: 1, termsVersion: "syn-terms-v1", customerRef: "syn-cust-1", actor: { id: "syn-business_owner", role: "business_owner" } });
    assert.equal(forgedBody.status, 401, "an actor in the body is ignored");
    assert.equal((await anon.call("POST", "/demo/login", { subject: "real-person" })).status, 400, "test login only for synthetic subjects");

    const sales = client(d.url), fin = client(d.url), ful = client(d.url), customer = client(d.url);
    await sales.call("POST", "/demo/login", { subject: "syn-sales_support" });
    await fin.call("POST", "/demo/login", { subject: "syn-finance_reviewer" });
    await ful.call("POST", "/demo/login", { subject: "syn-fulfillment_operator" });

    const q = await sales.call("POST", "/ops/api/quotes", { offerId: "syn-training", quantity: 2, termsVersion: "syn-terms-v1", customerRef: "syn-cust-7", price: 1 });
    assert.equal(q.status, 201);
    assert.equal(q.body.totalBdt, 2000, "server-priced");
    const ask = await sales.call("POST", `/ops/api/quotes/${q.body.id}/request-acceptance`);
    assert.deepEqual(Object.keys(ask.body).sort(), ["challengeId", "expiresAt"]);
    assert.equal((await sales.call("POST", "/ops/api/orders", { quoteId: q.body.id }, { "idempotency-key": "idem-http-0001" })).body.error, "QUOTE_NOT_ACCEPTED");

    const inbox = (await customer.call("GET", "/demo/customer-inbox?customerRef=syn-cust-7")).body;
    const token = inbox.find((m) => m.quoteId === q.body.id).token;
    assert.equal((await customer.call("POST", "/c/api/accept", { token, customerRef: "syn-cust-7", termsVersion: "syn-terms-v1" })).status, 200);
    assert.equal((await customer.call("POST", "/c/api/accept", { token, customerRef: "syn-cust-7", termsVersion: "syn-terms-v1" })).body.error, "ACCEPTANCE_REPLAYED");

    const o1 = await sales.call("POST", "/ops/api/orders", { quoteId: q.body.id }, { "idempotency-key": "idem-http-0001" });
    const o2 = await sales.call("POST", "/ops/api/orders", { quoteId: q.body.id }, { "idempotency-key": "idem-http-0001" });
    assert.equal(o1.status, 201);
    assert.equal(o1.body.id, o2.body.id, "idempotent over HTTP");
    const orderId = o1.body.id;

    assert.equal((await sales.call("POST", `/ops/api/orders/${orderId}/payment-report`, { method: "synthetic-wallet", reference: "SYN" })).body.state, "PAYMENT_REVIEW");
    const line = (await customer.call("POST", "/demo/bank/statement-line", { amountPoisha: 200000 })).body;
    assert.equal((await sales.call("POST", "/ops/api/settlements/import", line)).status, 403, "sales cannot import statements");
    assert.equal((await fin.call("POST", "/ops/api/settlements/import", { ...line, amountPoisha: 1 })).body.error, "SETTLEMENT_SIGNATURE_INVALID");
    const s = await fin.call("POST", "/ops/api/settlements/import", line);
    assert.equal(s.status, 201);
    assert.equal((await sales.call("POST", `/ops/api/orders/${orderId}/verify-payment`, { settlementId: s.body.settlementId })).status, 403);
    assert.equal((await fin.call("POST", `/ops/api/orders/${orderId}/verify-payment`, { settlementId: s.body.settlementId })).body.state, "PAYMENT_VERIFIED");

    for (const to of ["ASSIGNED", "FULFILLING"]) assert.equal((await ful.call("POST", `/ops/api/orders/${orderId}/transition`, { to })).status, 200);
    assert.equal((await ful.call("POST", `/ops/api/orders/${orderId}/transition`, { to: "DELIVERED" })).body.error, "DELIVERY_EVIDENCE_REQUIRED");
    assert.equal((await ful.call("POST", `/ops/api/orders/${orderId}/transition`, { to: "DELIVERED", evidence: { checklistComplete: true } })).body.state, "DELIVERED");

    const trackTok = (await customer.call("GET", "/demo/customer-inbox?customerRef=syn-cust-7")).body.find((m) => m.orderId === orderId).token;
    const tr = await customer.call("GET", `/c/api/track/${trackTok}`);
    assert.deepEqual(Object.keys(tr.body).sort(), ["createdAt", "orderId", "state"]);
    assert.equal((await customer.call("GET", `/c/api/track/${"a".repeat(40)}`)).status, 404);

    const finance = await fin.call("GET", "/ops/api/finance");
    assert.equal(finance.body.ordersCounted, 0, "synthetic demo never enters real KPIs");
    assert.equal((await sales.call("GET", "/ops/api/finance")).status, 403);
    assert.equal((await fin.call("GET", "/ops/api/audit/chain")).body.ok, true);

    const revoked = client(d.url);
    await revoked.call("POST", "/demo/login", { subject: "syn-revoked" });
    assert.equal((await revoked.call("GET", `/ops/api/orders/${orderId}`)).status, 403, "revoked grant cannot read");
    const ui = await fetch(`${d.url}/ops`);
    const html = await ui.text();
    assert.match(html, /LOCAL SYNTHETIC DEMO — not production/);
    assert.equal(ui.headers.get("x-frame-options"), "DENY");
  } finally {
    await d.close();
  }
});

test("ops demo refuses production mode and non-loopback hosts", async () => {
  await assert.rejects(startDemo({ port: 0, host: "0.0.0.0" }), /loopback/);
  const prev = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try { await assert.rejects(startDemo({ port: 0 }), /production/); } finally { process.env.NODE_ENV = prev; }
});

test("the Business OS and the demo are not reachable from the public site", () => {
  const worker = readFileSync(resolve(ROOT, "worker/index.js"), "utf8");
  assert.ok(!/business-os|ops-demo/.test(worker), "Worker does not import the Business OS");
  const wr = readFileSync(resolve(ROOT, "wrangler.jsonc"), "utf8");
  assert.ok(!/d1_databases|business-os/.test(wr), "site wrangler config has no D1 binding or Business OS entry");
  const pub = resolve(ROOT, "dist/public/assets");
  if (existsSync(pub)) {
    for (const f of readdirSync(pub).filter((x) => x.endsWith(".js"))) {
      const s = readFileSync(resolve(pub, f), "utf8");
      assert.ok(!/acceptance_challenges|confirmCustomerAcceptance|importSettlement/.test(s), `${f} must not contain Business OS code`);
    }
  }
});
