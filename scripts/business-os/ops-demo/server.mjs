// scripts/business-os/ops-demo/server.mjs — LOCAL SYNTHETIC DEMO ONLY.
//
// A minimal operations API + UI over the Business OS library, for local
// verification of the end-to-end flow. It is NOT part of the site: the Worker
// (worker/index.js) and the Express server never import it, it binds to
// 127.0.0.1 only, refuses NODE_ENV=production, and uses a TEST-ONLY login
// (`/demo/login`) that issues sessions for seeded synthetic staff. Production
// identity must come from a real identity provider (see the C8 activation
// checklist). All data lives in an in-memory database and is synthetic.
//
//   node scripts/business-os/ops-demo/server.mjs   → http://127.0.0.1:8787/ops

import http from "node:http";
import { readFileSync } from "node:fs";
import { setup } from "../harness.mjs";
import { resolveActor, issueSession, IdentityError } from "../../../lib/business-os/identity.js";
import { contributionFromRows } from "../../../lib/business-os/operations.js";

const UI = readFileSync(new URL("./ui.html", import.meta.url), "utf8");
const MAX_BODY = 16 * 1024;

export async function startDemo({ port = 8787, host = "127.0.0.1" } = {}) {
  if (process.env.NODE_ENV === "production") throw new Error("ops demo refuses to run with NODE_ENV=production");
  if (!["127.0.0.1", "::1", "localhost"].includes(host)) throw new Error("ops demo binds to loopback only");
  const h = await setup();

  const json = (res, status, body, headers = {}) => {
    res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff", "x-aitp-demo": "synthetic-local-only", ...headers });
    res.end(JSON.stringify(body));
  };
  const readBody = (req) => new Promise((resolve, reject) => {
    let size = 0, data = "";
    req.on("data", (c) => { size += c.length; if (size > MAX_BODY) { reject(Object.assign(new Error("BODY_TOO_LARGE"), { status: 413 })); req.destroy(); } else data += c; });
    req.on("end", () => { try { resolve(data ? JSON.parse(data) : {}); } catch { reject(Object.assign(new Error("BAD_JSON"), { status: 400 })); } });
  });
  const cookie = (req, name) => (req.headers.cookie ?? "").split(";").map((s) => s.trim().split("=")).find(([k]) => k === name)?.[1];
  // Identity comes ONLY from the signed session cookie, never from the body.
  const staff = async (req) => resolveActor(decodeURIComponent(cookie(req, "aitp_demo_session") ?? ""), { sessionKey: h.keys.sessionKey, grants: h.grants });

  const routes = [
    ["GET", /^\/ops$/, async (req, res) => { res.writeHead(200, { "content-type": "text/html; charset=utf-8", "content-security-policy": "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'", "x-frame-options": "DENY", "cache-control": "no-store" }); res.end(UI); }],
    // ---- TEST-ONLY login: seeded synthetic staff subjects only
    ["POST", /^\/demo\/login$/, async (req, res, b) => {
      if (typeof b.subject !== "string" || !b.subject.startsWith("syn-")) return json(res, 400, { error: "SYNTHETIC_SUBJECTS_ONLY" });
      const token = await issueSession(h.keys.sessionKey, { subject: b.subject, ttlSeconds: 1800 });
      json(res, 200, { ok: true, subject: b.subject }, { "set-cookie": `aitp_demo_session=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/` });
    }],
    // ---- simulated EXTERNAL parties (customer inbox, bank statement export)
    ["GET", /^\/demo\/customer-inbox$/, async (req, res, b, url) => json(res, 200, (await h.customerInbox()).filter((m) => m.customerRef === url.searchParams.get("customerRef")))],
    ["POST", /^\/demo\/bank\/statement-line$/, async (req, res, b) => {
      const over = { amountPoisha: Number(b.amountPoisha) };
      if (typeof b.transactionId === "string" && b.transactionId) over.transactionId = b.transactionId;
      json(res, 200, await h.signLine(h.line(over)));
    }],
    // ---- staff API
    ["GET", /^\/ops\/api\/me$/, async (req, res) => { const a = await staff(req); json(res, 200, { id: a.id, roles: a.grants.filter((g) => g.active).map((g) => g.role) }); }],
    ["POST", /^\/ops\/api\/quotes$/, async (req, res, b) => json(res, 201, await h.os.registerQuote(await staff(req), { offer: { kind: "service", id: b.offerId }, quantity: b.quantity, termsVersion: b.termsVersion, customerRef: b.customerRef, scope: b.scope }, h.deps))],
    ["POST", /^\/ops\/api\/quotes\/([\w-]+)\/request-acceptance$/, async (req, res, b, url, m) => json(res, 200, await h.os.requestCustomerAcceptance(await staff(req), m[1]))],
    ["POST", /^\/ops\/api\/orders$/, async (req, res, b) => json(res, 201, await h.os.createOrder(await staff(req), { quoteId: b.quoteId, idempotencyKey: req.headers["idempotency-key"] }))],
    ["GET", /^\/ops\/api\/orders\/([\w-]+)$/, async (req, res, b, url, m) => json(res, 200, await h.os.getOrder(await staff(req), m[1]))],
    ["POST", /^\/ops\/api\/orders\/([\w-]+)\/payment-report$/, async (req, res, b, url, m) => json(res, 200, await h.os.recordCustomerPaymentReport(await staff(req), m[1], b))],
    ["POST", /^\/ops\/api\/settlements\/import$/, async (req, res, b) => json(res, 201, await h.os.importSettlement(await staff(req), b))],
    ["POST", /^\/ops\/api\/orders\/([\w-]+)\/verify-payment$/, async (req, res, b, url, m) => json(res, 200, await h.os.verifyPayment(await staff(req), m[1], b.settlementId))],
    ["POST", /^\/ops\/api\/orders\/([\w-]+)\/transition$/, async (req, res, b, url, m) => json(res, 200, await h.os.transition(await staff(req), m[1], b.to, { evidence: b.evidence, note: b.note }))],
    ["GET", /^\/ops\/api\/finance$/, async (req, res) => json(res, 200, { ...contributionFromRows(await h.os.financeRows(await staff(req))), note: "Synthetic demo orders are excluded from real totals by design." })],
    ["GET", /^\/ops\/api\/audit\/chain$/, async (req, res) => { await staff(req); json(res, 200, await h.os.verifyChain()); }],
    // ---- customer API
    ["POST", /^\/c\/api\/accept$/, async (req, res, b) => json(res, 200, await h.os.confirmCustomerAcceptance({ token: b.token, customerRef: b.customerRef, termsVersion: b.termsVersion }))],
    ["GET", /^\/c\/api\/track\/([^/]+)$/, async (req, res, b, url, m) => { const t = await h.os.track(m[1]); t ? json(res, 200, t) : json(res, 404, { error: "NOT_FOUND" }); }],
  ];

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${host}`);
    try {
      if (req.method === "POST" && req.headers["x-requested-with"] !== "aitp-ops") return json(res, 403, { error: "CSRF_HEADER_REQUIRED" });
      for (const [method, re, fn] of routes) {
        const m = url.pathname.match(re);
        if (m && method === req.method) return await fn(req, res, req.method === "POST" ? await readBody(req) : {}, url, m);
      }
      json(res, 404, { error: "NOT_FOUND" });
    } catch (e) {
      const code = e.code ?? e.message;
      const status = e.status ?? (e instanceof IdentityError ? 401 : /FORBIDDEN|NO_ACTIVE_GRANT|WRONG_BUSINESS|FORGED_ACTOR/.test(code) ? 403 : /NOT_FOUND/.test(code) ? 404 : 409);
      json(res, status, { error: code });
    }
  });
  await new Promise((r) => server.listen(port, host, r));
  const addr = server.address();
  return { url: `http://${host}:${addr.port}`, close: () => new Promise((r) => server.close(r)), h };
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("server.mjs")) {
  const d = await startDemo();
  console.log(`AITP Business OS — LOCAL SYNTHETIC DEMO at ${d.url}/ops (not production; data is in memory and synthetic)`);
}
