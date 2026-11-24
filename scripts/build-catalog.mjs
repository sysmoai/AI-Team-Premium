#!/usr/bin/env node
// Generates client/src/data/products-catalog.json — the catalog the site ships —
// from the fuller internal source file, with everything unpublishable removed.
//
// The source (products-complete.json) is an internal export and is NOT safe to
// publish as-is. Across its 80 products it carries:
//   - 181 "AIPS" / 56 "AI Premium Shop" references to a different storefront
//   - "3,000+ trusted customers" claims
//   - a `trust` block with review counts (1,842-3,421) and 4.8-4.9 star ratings
//     that no review system on this site produced
//   - `competitorCompare` entries naming other sellers by name
//
// Publishing invented review counts as if they were real customer feedback is
// the sort of thing that is hard to walk back, so this strips them at the source
// instead of relying on a component to remember not to render them.
//
// Re-run with: npm run build:catalog

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "client/src/data/products-complete.json");
const OUT = resolve(ROOT, "client/src/data/products-catalog.json");

// Whole fields that never ship.
const DROP_FIELDS = new Set([
  "competitorCompare", // names other sellers
  "seo",               // titles end in "| AI Premium Shop"
  "trust",             // fabricated reviewCount / rating
  "sourceUrl",         // vendor pricing links, not ours to surface
]);

// Field renames that remove a foreign brand from the shape itself.
const RENAME = { whyBuyFromAIPS: "whyBuyBN" };

// Any string matching these is scrubbed; any array entry matching is dropped.
//
// "premier" is scoped to the marketing phrase, not the bare word: several
// products (e.g. Suno's own "Premier" tier) legitimately carry it in their
// tier name and id. An earlier version matched \bpremier\b unscoped, which
// silently mangled "suno-premier-personal" into "suno--personal" and dropped
// the product from the shipped catalog — same failure class as the
// "AI Premium Shop" leak this file exists to prevent, just self-inflicted.
const BANNED = [
  /AI\s*Premium\s*Shop/gi,
  /\bAIPS\b/gi,
  /aipremiumshop[^\s"']*/gi,
  /\b\d[\d,]*\+?\s*(trusted\s+)?customers?\b/gi,
  /\b#1\b/gi,
  /\bpremier\s+(provider|distributor|reseller)\b/gi,
];

const hits = new Map();
function note(pattern) {
  const k = pattern.source;
  hits.set(k, (hits.get(k) || 0) + 1);
}

function scrubString(s) {
  let out = s;
  for (const re of BANNED) {
    re.lastIndex = 0;
    if (re.test(out)) {
      note(re);
      re.lastIndex = 0;
      out = out.replace(re, "").replace(/\s{2,}/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
    }
  }
  return out;
}

function isBanned(s) {
  return BANNED.some((re) => {
    re.lastIndex = 0;
    return re.test(s);
  });
}

// The first three BANNED patterns name another storefront. An FAQ entry or
// other object written about that storefront ("Is Canva Pro safe to buy
// through AIPS?", "AIPS manages shared pools…") is a claim about a different
// business. Scrubbing the name out of it leaves "safe to buy through ?" and
// silently re-attributes the claim to AITP, so the whole entry is dropped.
const FOREIGN_BRAND = BANNED.slice(0, 3);
function mentionsForeignBrand(obj) {
  return Object.values(obj).some(
    (v) => typeof v === "string" && FOREIGN_BRAND.some((re) => ((re.lastIndex = 0), re.test(v)))
  );
}

function clean(value) {
  if (typeof value === "string") return scrubString(value);
  if (Array.isArray(value)) {
    return value
      // Drop whole bullet points that exist only to make a banned claim.
      .filter((v) => !(typeof v === "string" && isBanned(v) && (note(BANNED[3]), true)))
      // Drop whole objects (FAQ entries) written about another storefront. Their
      // text is never kept; an FAQ whose QUESTION is still useful leaves only a
      // `_recover` marker so lib/public-projection.js can substitute a neutral
      // educational answer (C6 FAQ recovery). Nothing of the original ships.
      .map((v) => {
        if (!(v && typeof v === "object" && !Array.isArray(v) && mentionsForeignBrand(v))) return v;
        note(FOREIGN_BRAND[0]);
        const q = typeof v.q === "string" ? v.q : "";
        if (/\bsafe\b/i.test(q)) return { _recover: "safety" };
        if (/shared|personal/i.test(q)) return { _recover: "ownership" };
        return undefined;
      })
      .filter((v) => v !== undefined)
      .map((v) => (v && v._recover ? v : clean(v)));
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (DROP_FIELDS.has(k)) continue;
      out[RENAME[k] || k] = clean(v);
    }
    return out;
  }
  return value;
}

const source = JSON.parse(readFileSync(SRC, "utf-8"));
const products = Array.isArray(source) ? source : source.products;
if (!Array.isArray(products)) {
  console.error("Unexpected source shape: expected an array or { products: [...] }");
  process.exit(1);
}

// Normalise two gaps in the source data that would render as blank UI:
// the five bundle products carry no brand (they span several), and one product
// has an empty tier. Both are used as filter chips and card labels.
function normalise(p) {
  const out = { ...p };
  if (!out.brand) out.brand = out.category === "bundles" ? "Bundles" : out.provider || "Other";
  if (!out.tier) {
    out.tier =
      out.accessType === "personal" ? "Personal"
      : out.accessType === "shared" ? "Shared"
      : out.accessType === "bundle" ? "Bundle"
      : "Standard";
  }
  return out;
}

// Commercial governance overlay (data/commercial-governance.json).
//
// The eligibility protocol requires an evidenced access model, ownership
// disclosure and an approved price before a product may carry a public purchase
// action. The source export carries none of that, so governance lives in its own
// file and is applied here — meaning a quarantine cannot be lost by someone
// re-running the catalog build.
//
// Quarantine works by setting priceOnRequest, which ProductDetail/ProductCard/
// CategoryPage/Pricing already honour. Reusing the existing, already-tested
// price-suppression path is deliberate: a second parallel mechanism would be one
// more thing that can silently stop working.
const GOVERNANCE = resolve(ROOT, "data/commercial-governance.json");
let governance = {};
try {
  governance = JSON.parse(readFileSync(GOVERNANCE, "utf-8")).records || {};
} catch {
  console.error("data/commercial-governance.json missing or unreadable — run: node scripts/gen-governance.mjs");
  process.exit(1);
}

// Public projection (Cycle 5): every number, assurance and CTA flag in the shipped
// catalog is produced by lib/public-projection.js from lib/commercial-eligibility.js.
// Internal reference prices stay in data/commercial-governance.json and the
// internal products-complete.json; the client imports neither.
import { createProjector } from "../lib/public-projection.js";
const project = createProjector(governance);

const normalised = products.map(clean).map(normalise);
const cleaned = project(normalised)
  .filter((p) => (p.status || "Active").toLowerCase() !== "inactive");

const rendered = JSON.stringify(cleaned, null, 2) + "\n";

// --check: report whether the committed file matches what the source produces,
// without writing. Used by `npm run verify` to catch a stale catalog.
if (process.argv.includes("--check")) {
  let existing = null;
  try {
    existing = readFileSync(OUT, "utf-8");
  } catch {
    console.error("products-catalog.json is missing — run: npm run build:catalog");
    process.exit(1);
  }
  if (existing !== rendered) {
    console.error("products-catalog.json is stale — run: npm run build:catalog");
    process.exit(1);
  }
  process.exit(0);
}

writeFileSync(OUT, rendered, "utf-8");

// Prove the output is clean rather than assuming it.
const serialized = JSON.stringify(cleaned);
const leftovers = BANNED.map((re) => {
  re.lastIndex = 0;
  return [re.source, (serialized.match(re) || []).length];
}).filter(([, n]) => n > 0);

console.log(`\n  wrote ${cleaned.length} products -> client/src/data/products-catalog.json`);
console.log(`  dropped fields: ${[...DROP_FIELDS].join(", ")}`);
console.log(`  renamed: ${Object.entries(RENAME).map(([a, b]) => `${a} -> ${b}`).join(", ")}`);
if (leftovers.length) {
  console.error("\n  FAILED — banned content survived:");
  leftovers.forEach(([p, n]) => console.error(`    /${p}/  x${n}`));
  process.exit(1);
}
console.log("  verified: no foreign brand names, invented customer counts, or review scores remain\n");
