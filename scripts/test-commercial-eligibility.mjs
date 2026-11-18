// scripts/test-commercial-eligibility.mjs
//
// Regression tests for the commercial-eligibility layer, the public catalog
// projection and the leak guards. Run: npm run test:commercial  (after `npm run build`
// for the Worker section). Plain node:test — no new dependency.
//
// Every guard has a NEGATIVE fixture: a deliberately unsafe record that must make
// the audit fail *for the intended reason* (asserted by message), followed by the
// corrected record that must pass. A guard that has never been seen failing proves
// nothing.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { decide, PUBLIC_STATES as S } from "../lib/commercial-eligibility.js";
import { createProjector, auditPublicRecords } from "../lib/public-projection.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NOW = new Date("2026-11-18T00:00:00Z");

// A fully evidenced, purchasable governance record (SYNTHETIC — not a real product).
const good = (over = {}) => ({
  id: "synthetic-personal",
  commercial_status: "approved",
  access_model: "customer_owned_activation",
  credential_sharing_required: false,
  resale_or_seat_evidence: "Provider reseller agreement dated 2026-10-01 (synthetic)",
  official_terms_url: "https://example.com/reseller-terms",
  evidence_ids: ["syn-evidence-001"],
  verification_status: "verified",
  price_on_request: false,
  approved_bdt_price: 1000,
  price_approval_id: "APPROVAL-SYN-001",
  approval_valid_until: "2027-06-30",
  next_review_at: "2027-03-01",
  ...over,
});

// ---------------------------------------------------------------- decide()
test("approved WITH evidence is the only purchasable state", () => {
  const d = decide(good(), { now: NOW });
  assert.equal(d.publicCommercialState, S.PURCHASABLE);
  assert.equal(d.canShowOrderCTA, true);
  assert.equal(d.canDisplayPrice, true);
  assert.equal(d.publicPrice, 1000);
  assert.equal(d.canPublishOfferSchema, true);
  assert.equal(d.canAcceptPayment, false, "no payment gateway exists; payment is always human-confirmed");
});

const closed = (d) => !d.canShowOrderCTA && !d.canDisplayPrice && !d.canPublishOfferSchema && !d.canShowAvailability && d.publicPrice === null;

for (const [label, rec, state, quote] of [
  ["approved, resale evidence missing", good({ resale_or_seat_evidence: null }), S.INQUIRY_ONLY, true],
  ["approved, terms URL missing", good({ official_terms_url: "" }), S.INQUIRY_ONLY, true],
  ["approved, terms URL not https", good({ official_terms_url: "http://example.com/t" }), S.INQUIRY_ONLY, true],
  ["approved, only placeholder bulk evidence id", good({ evidence_ids: ["ceo-decision-2026-08-02-bulk"] }), S.INQUIRY_ONLY, true],
  ["approved, bulk/legacy price approval id", good({ price_approval_id: "CEO-DECISION-2026-08-02-LEGACY-x" }), S.INQUIRY_ONLY, true],
  ["approved, verification_status unverified", good({ verification_status: "unverified" }), S.INQUIRY_ONLY, true],
  ["approved, access model UNVERIFIED_SHARED", good({ access_model: "UNVERIFIED_SHARED" }), S.INQUIRY_ONLY, true],
  ["approved, credential sharing required", good({ credential_sharing_required: true }), S.INQUIRY_ONLY, true],
  ["approved, credential sharing unknown", good({ credential_sharing_required: "UNKNOWN" }), S.INQUIRY_ONLY, true],
  ["approved but price_on_request (contradiction)", good({ price_on_request: true }), S.INQUIRY_ONLY, true],
  ["approved without a price", good({ approved_bdt_price: null }), S.INQUIRY_ONLY, true],
  ["approved with zero price", good({ approved_bdt_price: 0 }), S.INQUIRY_ONLY, true],
  ["approved, approval expired", good({ approval_valid_until: "2026-01-01" }), S.INQUIRY_ONLY, true],
  ["approved, approval date invalid", good({ approval_valid_until: "soon" }), S.INQUIRY_ONLY, true],
  ["approved, review overdue", good({ next_review_at: "2026-02-01" }), S.INQUIRY_ONLY, true],
  ["pending_evidence", good({ commercial_status: "pending_evidence" }), S.PENDING_EVIDENCE, true],
  ["request_price_only", good({ commercial_status: "request_price_only" }), S.REQUEST_PRICE_ONLY, true],
  ["not_for_resale", good({ commercial_status: "not_for_resale" }), S.NOT_FOR_RESALE, false],
  ["prohibited", good({ commercial_status: "prohibited" }), S.PROHIBITED, false],
  ["unavailable", good({ commercial_status: "unavailable" }), S.UNAVAILABLE, false],
  ["retired", good({ commercial_status: "retired" }), S.RETIRED, false],
  ["unknown status", good({ commercial_status: "approved_legacy_unreviewed" }), S.UNKNOWN, false],
  ["typo status", good({ commercial_status: "aproved" }), S.UNKNOWN, false],
]) {
  test(`fail-closed: ${label}`, () => {
    const d = decide(rec, { now: NOW });
    assert.equal(d.publicCommercialState, state);
    assert.ok(closed(d), `${label} must not display a price, order CTA, availability or Offer`);
    assert.equal(d.canRequestQuote, quote);
    assert.ok(d.reasons.length > 0);
  });
}

test("missing governance record fails closed", () => {
  for (const g of [undefined, null, "approved", 5]) {
    const d = decide(g, { now: NOW });
    assert.equal(d.publicCommercialState, S.UNKNOWN);
    assert.ok(closed(d));
    assert.equal(d.canRequestQuote, false);
  }
});

test("distinct states stay distinct (no collapse into 'price on request')", () => {
  const states = ["pending_evidence", "request_price_only", "not_for_resale", "prohibited", "unavailable", "retired"].map(
    (s) => decide(good({ commercial_status: s }), { now: NOW }).publicCommercialState
  );
  assert.equal(new Set(states).size, states.length);
});

// -------------------------------------------------------------- projection
const rec = (over = {}) => ({
  id: "synthetic-personal",
  name: "Synthetic Tool — Personal",
  slug: "synthetic-bangladesh",
  tier: "Personal",
  category: "ai-assistant",
  accessType: "personal",
  price: 777, // internal catalog price: must never ship unless governance allows
  officialUSD: 20,
  description: "A synthetic tool. Delivery in 5-15 minutes. 30-day replacement warranty. Pay with bKash.",
  whatsappMsg: "Hi! I want Synthetic Tool (৳777/mo) — please share payment details.",
  deliverySLA: "2-4 hours",
  stock: { status: "in" },
  faq: [
    { q: "Is it safe to buy through ?", a: "Yes. We served since 2024. Call +880 1865-385348." },
    { q: "What is it?", a: "A synthetic tool." },
  ],
  plans: [{ planName: "Personal", priceBDT: 777, officialUSD: 20, whatsIncluded: ["Shared pool access", "Feature A"] }],
  relatedProducts: [{ slug: "other-bangladesh", name: "Other", priceBDT: 123 }],
  ...over,
});
const gov = (...rs) => Object.fromEntries(rs.map((r) => [r.id, r]));
const project = (g, list) => createProjector(g, { now: NOW })(list);

test("projection: pending/inquiry-only records ship NO number, NO payment ask, NO fulfilment claim", () => {
  const g = gov(good({ resale_or_seat_evidence: null })); // approved, unevidenced
  const [p] = project(g, [rec()]);
  assert.equal(p.price, 0);
  assert.equal(p.priceOnRequest, true);
  assert.equal(p.canOrder, false);
  assert.equal(p.canQuote, true);
  assert.ok(!("officialUSD" in p) && !("deliverySLA" in p) && !("stock" in p));
  assert.ok(!/payment|৳|bkash/i.test(p.whatsappMsg), p.whatsappMsg);
  assert.ok(!/instant|warrant|replac|minutes|bkash|shared/i.test(JSON.stringify(p)));
  assert.ok(!JSON.stringify(p).includes("1865"));
  assert.equal(p.faq.length, 1, "only the harmless FAQ survives");
  assert.deepEqual(auditPublicRecords([p], g, { now: NOW }), []);
});

test("projection: purchasable record ships the GOVERNED price, not the catalog price", () => {
  const g = gov(good());
  const [p] = project(g, [rec()]);
  assert.equal(p.price, 1000);
  assert.equal(p.canOrder, true);
  assert.ok(/৳1,000/.test(p.whatsappMsg) && /payment/i.test(p.whatsappMsg));
  assert.ok(!JSON.stringify(p).includes("777"));
  assert.equal(p.plans[0].priceBDT, 1000);
  assert.ok(!/instant|warrant|replac/i.test(JSON.stringify(p)), "assurance wording is removed even for purchasable records");
  assert.deepEqual(auditPublicRecords([p], g, { now: NOW }), []);
});

test("projection: a purchasable record gets the governed payment FAQ; a non-purchasable one does not", () => {
  const [buy] = project(gov(good()), [rec()]);
  const payment = buy.faq.filter((f) => /international credit card/i.test(f.q));
  assert.equal(payment.length, 1);
  assert.match(payment[0].a, /bKash and Nagad/);
  assert.match(payment[0].a, /do not pay before/i);
  assert.ok(!/instant|minute|hour|warrant|rocket|bank transfer/i.test(payment[0].a), "no invented timing, guarantee or extra payment methods");
  const [hold] = project(gov(good({ resale_or_seat_evidence: null })), [rec()]);
  assert.equal(hold.faq.filter((f) => /international credit card/i.test(f.q)).length, 0);
});

test("projection: missing whatsappMsg never falls back to a raw price (latent fallback defect)", () => {
  for (const g of [gov(good({ commercial_status: "pending_evidence" })), gov(good({ resale_or_seat_evidence: null }))]) {
    const [p] = project(g, [rec({ whatsappMsg: undefined })]);
    assert.ok(!/777|৳|payment/i.test(p.whatsappMsg), p.whatsappMsg);
  }
});

test("projection: expired approval stops showing the price", () => {
  const [p] = project(gov(good({ approval_valid_until: "2026-01-01" })), [rec()]);
  assert.equal(p.price, 0);
  assert.equal(p.canOrder, false);
});

test("projection: prohibited / retired / not_for_resale ship no CTA flags and no message", () => {
  for (const s of ["prohibited", "retired", "not_for_resale", "unavailable"]) {
    const [p] = project(gov(good({ commercial_status: s })), [rec()]);
    assert.equal(p.canOrder, false);
    assert.equal(p.canQuote, false);
    assert.ok(!("whatsappMsg" in p), `${s} must not carry a prefill`);
    assert.equal(p.price, 0);
  }
});

test("projection: unknown / missing governance ships nothing sellable", () => {
  const [p] = project({}, [rec({ id: "no-governance-record" })]);
  assert.equal(p.price, 0);
  assert.equal(p.canOrder, false);
  assert.equal(p.canQuote, false);
});

test("projection: related-product prices only for purchasable targets", () => {
  const g = gov(good({ resale_or_seat_evidence: null }));
  const [p] = project(g, [rec()]);
  assert.ok(!("priceBDT" in p.relatedProducts[0]));
});

// ---------------------------------------------- negative fixtures (red → green)
const unsafe = [
  ["a numeric price shipped on a pending record", { price: 350 }, /numeric price 350 shipped/],
  ["a BDT amount inside prose", { description: "Only ৳350/month!" }, /BDT amount appears/],
  ["priceOnRequest not set", { priceOnRequest: false }, /priceOnRequest not set/],
  ["nested plan price", { plans: [{ planName: "x", priceBDT: 350 }] }, /plans\[\]\.priceBDT/],
  ["officialUSD without a displayable price", { officialUSD: 20 }, /officialUSD shipped/],
  ["a payment ask in the WhatsApp message", { whatsappMsg: "Hi, please share payment details." }, /payment wording/],
  ["another business's phone number", { faq: [{ q: "Contact", a: "WhatsApp +880 1865-385348" }] }, /is not this site's/],
  ["another storefront's name", { description: "Bought through AIPS" }, /another storefront's name/],
  ["dangling brand placeholder", { faq: [{ q: "Is it safe to buy through ?", a: "x" }] }, /dangling brand placeholder/],
  ["instant delivery claim", { description: "Instant delivery" }, /delivery\/warranty/],
  ["warranty claim", { faq: [{ q: "q", a: "30-day replacement warranty" }] }, /delivery\/warranty/],
  ["fulfilment field", { deliverySLA: "2-4 hours" }, /field deliverySLA shipped/],
  ["shared-access claim", { description: "Shared access." }, /shared-access claim/],
  ["canOrder flag set while eligibility says no", { canOrder: true }, /canOrder true disagrees/],
];
for (const [label, mutation, expected] of unsafe) {
  test(`negative fixture RED→GREEN: ${label}`, () => {
    const g = gov(good({ commercial_status: "pending_evidence" }));
    const clean = project(g, [rec()])[0];
    assert.deepEqual(auditPublicRecords([clean], g, { now: NOW }), [], "baseline must be clean");
    const dirty = { ...clean, ...mutation };
    const problems = auditPublicRecords([dirty], g, { now: NOW });
    assert.ok(problems.length > 0, `unsafe fixture "${label}" was NOT detected`);
    assert.ok(problems.some((m) => expected.test(m)), `detected, but not for the intended reason. got: ${problems.join(" | ")}`);
    assert.deepEqual(auditPublicRecords([clean], g, { now: NOW }), [], "corrected record passes again");
  });
}

// ------------------------------------------------------------- real catalog
test("the SHIPPED catalog passes the independent leak audit", () => {
  const catalog = JSON.parse(readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8"));
  const governance = JSON.parse(readFileSync(resolve(ROOT, "data/commercial-governance.json"), "utf-8")).records;
  const problems = auditPublicRecords(catalog, governance);
  assert.deepEqual(problems.slice(0, 5), [], `${problems.length} public-record problem(s)`);
  assert.equal(catalog.length, 129);
});

test("no governance record can become purchasable through the legacy bulk script", () => {
  const governance = JSON.parse(readFileSync(resolve(ROOT, "data/commercial-governance.json"), "utf-8")).records;
  const purchasable = Object.values(governance).filter((g) => decide(g).canShowOrderCTA);
  const bulk = Object.values(governance).filter((g) => (g.evidence_ids ?? []).includes("ceo-decision-2026-08-02-bulk"));
  assert.ok(bulk.length > 0);
  assert.equal(bulk.filter((g) => decide(g).canShowOrderCTA).length, 0, "bulk-approved records must stay inquiry-only");
  assert.equal(purchasable.length, 0, "no record has provider evidence yet, so none may be purchasable");
});

// ------------------------------------------------------------------- Worker
const DIST_INDEX = resolve(ROOT, "dist/public/index.html");
const workerTest = existsSync(DIST_INDEX) ? test : test.skip;

workerTest("Worker (no deployment): /api/e methods, SSR pages carry no price / payment CTA / foreign number", async () => {
  const worker = (await import(pathToFileURL(resolve(ROOT, "worker/index.js")).href)).default;
  const index = readFileSync(DIST_INDEX, "utf-8");
  const env = { ASSETS: { fetch: async () => new Response(index, { status: 200, headers: { "content-type": "text/html" } }) } };
  const call = (path, init) => worker.fetch(new Request(`https://www.aiteampremium.com${path}`, init), env);

  const get = await call("/api/e");
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("allow"), "POST");

  const logs = [];
  const real = console.log;
  console.log = (s) => logs.push(String(s));
  let junk, ok;
  try {
    junk = await call("/api/e", { method: "POST", body: JSON.stringify({ event: "made_up" }) });
    ok = await call("/api/e", { method: "POST", body: JSON.stringify({ event: "whatsapp_cta_click", product: "X" }) });
  } finally {
    console.log = real;
  }
  assert.equal(junk.status, 204);
  assert.equal(ok.status, 204);
  assert.equal(logs.length, 1);

  assert.equal((await call("/definitely-not-a-page")).status, 404);
  const apex = await worker.fetch(new Request("https://aiteampremium.com/pricing"), env);
  assert.equal(apex.status, 301);

  for (const path of ["/", "/pricing", "/all-products", "/tools/capcut-pro-bangladesh", "/tools/chatgpt-plus-bangladesh", "/chatgpt-plans"]) {
    const res = await call(path);
    const body = await res.text();
    assert.equal(res.status, 200, path);
    assert.ok(!/৳\s?\d/.test(body), `${path}: BDT amount in server-rendered HTML`);
    assert.ok(!body.includes("1865"), `${path}: foreign number`);
    assert.ok(!/please share payment details/i.test(body), `${path}: payment ask`);
    assert.ok(!/"@type":\s*"Offer"|"offers"/.test(body), `${path}: Offer schema while nothing is purchasable`);
  }
});
