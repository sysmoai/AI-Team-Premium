// scripts/test-c6-surfaces.ts — Cycle 6 regression tests (run with tsx --test).
//
// Covers what the C5 suite could not see: weak governance inputs that used to
// pass as purchasable, projection edge cases, the separate SERVICE governance,
// recovered FAQs, blog posts, and the TOOL_META blocks behind /compare.
// Every surface check has a negative fixture that must fail for the intended
// reason and then pass again once corrected.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { decide, PUBLIC_STATES as S } from "../lib/commercial-eligibility.js";
import { createProjector, auditPublicRecords, RECOVERED_FAQ, CLAIM_RE, PRICE_RE, IDENTITY_RE, SHARED_RE, PAYMENT_RE } from "../lib/public-projection.js";
import { decideService, servicePriceLabel, SERVICE_STATES } from "../shared/service-eligibility.js";
import { blogViolations, toolMetaViolations, loadToolMetas, loadBlogHold, sha256 } from "./lib/public-surface-checks.mjs";
import { BLOG_POSTS } from "../client/src/data/blog-posts";
import { QUARANTINED_BLOG_SLUGS } from "../shared/content-quarantine.js";
import { CANONICAL_MAP } from "../shared/canonical-map.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NOW = new Date("2026-11-18T00:00:00Z");
const read = (p: string) => JSON.parse(readFileSync(resolve(ROOT, p), "utf-8"));

const good = (over: Record<string, unknown> = {}) => ({
  id: "syn",
  commercial_status: "approved",
  access_model: "customer_owned_activation",
  credential_sharing_required: false,
  resale_or_seat_evidence: "Provider reseller agreement (synthetic)",
  official_terms_url: "https://example.com/terms",
  evidence_ids: ["syn-evidence-001"],
  verification_status: "verified",
  price_on_request: false,
  approved_bdt_price: 1000,
  price_approval_id: "APPROVAL-SYN-001",
  approval_valid_until: "2027-06-30",
  next_review_at: "2027-03-01",
  ...over,
});

// --------------------------------------------- decide(): inputs that used to pass
test("baseline synthetic record is purchasable", () => {
  assert.equal(decide(good(), { now: NOW }).publicCommercialState, S.PURCHASABLE);
});
const weak: [string, Record<string, unknown>, Date?][] = [
  ["evidence is an empty object", { resale_or_seat_evidence: {} }],
  ["evidence is a number", { resale_or_seat_evidence: 0 }],
  ["evidence is boolean true", { resale_or_seat_evidence: true }],
  ["evidence ids are objects", { evidence_ids: [{}] }],
  ["evidence ids are booleans", { evidence_ids: [true] }],
  ["impossible date rolls over", { approval_valid_until: "2026-02-31" }],
  ["terms URL with empty host label", { official_terms_url: "https://a." }],
  ["access model outside the permitted list", { access_model: "shared_login" }],
  ["access model UNVERIFIED_SHARED", { access_model: "UNVERIFIED_SHARED" }],
];
for (const [label, over] of weak) {
  test(`decide() fails closed: ${label}`, () => {
    const d = decide(good(over), { now: NOW });
    assert.notEqual(d.publicCommercialState, S.PURCHASABLE);
    assert.equal(d.canDisplayPrice, false);
    assert.equal(d.canShowOrderCTA, false);
  });
}
test("decide() fails closed on an invalid clock (expiry checks would all be false)", () => {
  const d = decide(good({ approval_valid_until: "2020-01-01" }), { now: new Date("x") });
  assert.equal(d.publicCommercialState, S.UNKNOWN);
  assert.equal(d.canShowOrderCTA, false);
});
test("rule (not snapshot): every purchasable real record carries real evidence", () => {
  const records = Object.values(read("data/commercial-governance.json").records) as any[];
  for (const g of records.filter((r) => decide(r).canShowOrderCTA)) {
    assert.ok(typeof g.resale_or_seat_evidence === "string" && g.resale_or_seat_evidence.trim(), g.id);
    assert.match(g.official_terms_url, /^https:\/\//, g.id);
  }
});

// ------------------------------------------------------------ projection edges
const rec = (over: Record<string, unknown> = {}) => ({
  id: "syn", name: "Synthetic Tool — Personal", slug: "syn-bd", tier: "Personal", price: 777,
  description: "A tool.", whatsappMsg: "Hi", faq: [], plans: [], relatedProducts: [], ...over,
});
test("related-product price is the target's GOVERNED price, never the source's number", () => {
  const g = { syn: good(), tgt: good({ id: "tgt", approved_bdt_price: 1000 }) };
  const out = createProjector(g, { now: NOW })([
    rec({ relatedProducts: [{ slug: "tgt-bd", priceBDT: 777 }] }),
    rec({ id: "tgt", slug: "tgt-bd" }),
  ]);
  assert.equal(out[0].relatedProducts[0].priceBDT, 1000);
});
test("slug+tier collision keeps the most restrictive decision (no price lent to a pending twin)", () => {
  const g = { a: good({ id: "a", commercial_status: "pending_evidence" }), b: good({ id: "b" }) };
  const list = [
    rec({ id: "a", plans: [{ planName: "Personal", priceBDT: 350 }] }),
    rec({ id: "b" }),
  ];
  const out = createProjector(g, { now: NOW })(list);
  assert.ok(!("priceBDT" in out[0].plans[0]), "pending twin must not inherit a price");
});
test("provider specs are no longer stripped as 'claims' (C5 over-removal)", () => {
  for (const s of ["15hr fast GPU, unlimited relax mode.", "30K characters TTS/mo, instant voice cloning.", "6000 min/mo.", "Deploy instantly."])
    assert.equal(CLAIM_RE.test(s), false, s);
  for (const s of ["Delivery in 5-15 minutes.", "Activated within 2 hours.", "30-day replacement warranty.", "Instant delivery.", "2hr setup included."])
    assert.equal(CLAIM_RE.test(s), true, s);
});

// ------------------------------------------------------------- recovered FAQs
test("recovered FAQ answers carry no price, payment, promise, identity or shared pitch", () => {
  const bad = new RegExp([CLAIM_RE, PRICE_RE, IDENTITY_RE, SHARED_RE, PAYMENT_RE].map((r) => r.source).join("|"), "i");
  for (const make of Object.values(RECOVERED_FAQ)) {
    const f = make("Canva Pro — Starter Shared");
    assert.equal(bad.test(`${f.q} ${f.a}`), false, f.q);
    assert.ok(!/Starter Shared/.test(f.q), "question uses the product name, not the tier");
  }
});
test("shipped catalog: recovered FAQs present and rendered text stays audit-clean", () => {
  const catalog = read("client/src/data/products-catalog.json");
  const all = catalog.flatMap((p: any) => p.faq ?? []);
  assert.ok(all.some((f: any) => /is safe\?$/.test(f.q)));
  assert.ok(all.some((f: any) => /personal account and a shared login/.test(f.q)));
  assert.ok(!all.some((f: any) => "_recover" in f), "no internal marker may ship");
  assert.deepEqual(auditPublicRecords(catalog, read("data/commercial-governance.json").records), []);
});

// ---------------------------------------------------------- service governance
const svc = (over: Record<string, unknown> = {}) => ({
  id: "svc", status: "owner_approved", approved_bdt_price: 800, price_unit: "hour",
  price_approval_id: "SVC-APPROVAL-1", approval_valid_until: "2027-01-31",
  scope_approved: true, deliverables_approved: true, payment_terms_approved: true,
  refund_terms_approved: true, support_terms_approved: true, ...over,
});
test("service: fully approved record is bookable with its governed price", () => {
  const d = decideService(svc(), { now: NOW });
  assert.equal(d.state, SERVICE_STATES.BOOKABLE);
  assert.equal(d.publicPrice, 800);
  assert.equal(servicePriceLabel("svc", { now: NOW, list: [svc()] }), "from ৳800/hour");
});
const svcGaps: [string, Record<string, unknown>][] = [
  ["pending owner approval", { status: "pending_owner_approval" }],
  ["refund terms not approved", { refund_terms_approved: false }],
  ["scope not approved", { scope_approved: "yes" }],
  ["expired approval", { approval_valid_until: "2026-01-01" }],
  ["impossible date", { approval_valid_until: "2027-02-30" }],
  ["legacy approval id", { price_approval_id: "SVC-LEGACY-1" }],
  ["missing price", { approved_bdt_price: null }],
  ["unknown status", { status: "approved" }],
];
for (const [label, over] of svcGaps) {
  test(`service fails closed: ${label}`, () => {
    const d = decideService(svc(over), { now: NOW });
    assert.equal(d.canDisplayPrice, false);
    assert.equal(d.canShowBookingCTA, false);
    assert.equal(d.publicPrice, null);
  });
}
test("service: missing record and unavailable service offer nothing, not even an enquiry", () => {
  assert.equal(decideService(undefined).canRequestQuote, false);
  assert.equal(decideService(svc({ status: "unavailable" })).canRequestQuote, false);
});
test("service governance file ships no price for any non-approved service", () => {
  for (const s of read("shared/service-governance.json").services) {
    if (s.status !== "owner_approved") assert.equal(s.approved_bdt_price, null, s.id);
    assert.equal(servicePriceLabel(s.id), s.status === "owner_approved" ? servicePriceLabel(s.id) : null);
  }
});
test("a subscription approval never approves a service", () => {
  // the governance shapes do not overlap: an approved subscription record is an unknown service
  assert.equal(decideService(good() as any).state, SERVICE_STATES.UNKNOWN);
});

// --------------------------------------------------------------------- blog
const HOLD = loadBlogHold(ROOT);
test("blog: shipped posts pass (no AITP price, no promise, held bodies withheld)", () => {
  assert.deepEqual(blogViolations(BLOG_POSTS, QUARANTINED_BLOG_SLUGS, HOLD), []);
});
const blogFixtures: [string, (p: any) => any, RegExp][] = [
  ["AITP price inserted", (p) => ({ ...p, excerpt: p.excerpt + " Now ৳350/month." }), /Taka amount not on the hold list/],
  ["delivery promise inserted", (p) => ({ ...p, excerpt: p.excerpt + " We deliver your login details within 15 minutes." }), /promise/],
  ["bKash number promise", (p) => ({ ...p, excerpt: p.excerpt + " We send the bKash/Nagad number privately." }), /promise/],
];
for (const [label, mutate, expected] of blogFixtures) {
  test(`blog negative fixture RED→GREEN: ${label}`, () => {
    const post = BLOG_POSTS.find((p) => !QUARANTINED_BLOG_SLUGS.has(p.slug))!;
    const v = blogViolations([mutate(post)], QUARANTINED_BLOG_SLUGS, HOLD);
    assert.ok(v.some((m) => expected.test(m)), v.join(" | "));
    assert.deepEqual(blogViolations([post], QUARANTINED_BLOG_SLUGS, HOLD), []);
  });
}
test("blog negative fixture RED→GREEN: held post that still ships its body", () => {
  const slug = [...QUARANTINED_BLOG_SLUGS][0];
  const held = BLOG_POSTS.find((p) => p.slug === slug)!;
  const v = blogViolations([{ ...held, sections: [{ heading: "x", body: ["y"] }] }], QUARANTINED_BLOG_SLUGS, HOLD);
  assert.ok(v.some((m) => /held post still ships/.test(m)));
  assert.deepEqual(blogViolations([held], QUARANTINED_BLOG_SLUGS, HOLD), []);
});
test("blog hold list may only shrink: every entry still matches a live string", () => {
  const live = new Set<string>();
  const walk = (v: any) => (typeof v === "string" ? live.add(sha256(v)) : Array.isArray(v) ? v.forEach(walk) : v && typeof v === "object" ? Object.values(v).forEach(walk) : 0);
  BLOG_POSTS.forEach(walk);
  for (const h of HOLD) assert.ok(live.has(h), `stale hold entry ${h.slice(0, 12)} — remove it`);
});

// ------------------------------------------------------- TOOL_META (/compare)
const catalog = read("client/src/data/products-catalog.json");
const orderable = new Set<string>(catalog.filter((p: any) => p.canOrder).map((p: any) => p.slug));
test("TOOL_META: no number, Taka amount or payment promise without an orderable family", () => {
  assert.deepEqual(toolMetaViolations(loadToolMetas(ROOT), orderable, CANONICAL_MAP), []);
});
test("TOOL_META negative fixture RED→GREEN: hand-typed price on an unmatched tool", () => {
  const [file, meta] = loadToolMetas(ROOT).find(([f]) => f === "LinkedIn.tsx")!;
  const bad = toolMetaViolations([[file, { ...meta, priceBdt: 999, priceLabel: "৳999/mo" }]], orderable, CANONICAL_MAP);
  assert.ok(bad.some((m) => /priceBdt 999/.test(m)) && bad.some((m) => /Taka amount/.test(m)));
  assert.deepEqual(toolMetaViolations([[file, meta]], orderable, CANONICAL_MAP), []);
});
