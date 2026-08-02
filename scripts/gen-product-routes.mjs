#!/usr/bin/env node
// Generates lib/product-routes.js — one unique SEO record per product family in
// the catalog, keyed by its /tools/<slug> path.
//
// Why generated rather than hand-written: the catalog is the only place product
// data lives, and a shared DYNAMIC_PREFIX entry would give every product page
// the same <title>. Identical titles across dozens of pages read as duplicate
// content and none of them rank. Regenerate after editing the catalog:
//
//   npm run gen:routes
//
// `npm run verify` fails if the generated file drifts from the catalog.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);

// Variants that share a slug are one product family and get one page.
const families = new Map();
for (const p of catalog) {
  if (!p.slug) continue;
  if (!families.has(p.slug)) families.set(p.slug, []);
  families.get(p.slug).push(p);
}

const bdt = (n) => `৳${Number(n).toLocaleString("en-US")}`;

// Keep in sync with familyDisplayName() in client/src/pages/ProductDetail.tsx —
// the <h1> and the <title> must name the product identically.
//
// `brand` is too coarse to use directly ("Adobe" for Firefly, "Bundles" for
// every package). The product names carry the right casing, so the family name
// is taken from them: the shared prefix across variants, or the part before the
// tier separator for a lone variant.
const TRAIL = /[\s—–:\-]+$/;

function familyDisplayName(variants) {
  const names = variants.map((v) => v.name);
  if (names.length > 1) {
    const split = names.map((n) => n.split(/\s+/));
    const head = [];
    for (let i = 0; i < split[0].length; i++) {
      if (split.every((s) => s[i] === split[0][i])) head.push(split[0][i]);
      else break;
    }
    const prefix = head.join(" ").replace(TRAIL, "").trim();
    if (prefix.length >= 3) return prefix;
  }
  const lead = names[0].split(/\s+[—–]\s+/)[0].replace(TRAIL, "").trim();
  return lead.length >= 3 ? lead : names[0];
}

// Titles lead with the product name and the "in Bangladesh" / price qualifier
// because that is how the demand is actually typed into search.
function buildMeta(slug, variants) {
  const anchor = variants.reduce((a, b) => (a.price <= b.price ? a : b));
  const priced = variants.filter((v) => !v.priceOnRequest);
  const from = priced.length ? Math.min(...priced.map((v) => v.price)) : null;
  const brand = familyDisplayName(variants);

  const title = from
    ? `${brand} Price in Bangladesh — from ${bdt(from)}/mo | AI Team Premium`
    : `${brand} in Bangladesh — Pricing & Plans | AI Team Premium`;

  const planPhrase =
    variants.length > 1 ? `${variants.length} plans. ` : "";
  const pricePhrase = from ? `From ${bdt(from)}/month. ` : "";
  const sla = anchor.deliverySLA || "5–30 min";

  // `from === null` means every variant on this slug is price-on-request, i.e.
  // the whole family is quarantined pending an access-model review.
  //
  // Suppressing the price was not enough for these. The description still read
  // "Buy X in Bangladesh ... 5-30 min delivery, 30-day replacement guarantee" —
  // an active purchase invitation, with a delivery promise and a guarantee, for
  // a product we have explicitly withdrawn from sale. That copy went into both
  // the meta description and the Product JSON-LD, so it was the version crawlers
  // indexed. Fourteen live product pages were saying it.
  //
  // A quarantined family gets copy that matches its actual state instead: no
  // "buy", no delivery time, no guarantee. Those promises return with the price,
  // once there is an approved one.
  const description = from
    ? `Buy ${brand} in Bangladesh. ${pricePhrase}${planPhrase}` +
      `Pay with bKash or Nagad — no international card needed. ` +
      `${sla} delivery, 30-day replacement guarantee, Bangla WhatsApp support.`
    : `${brand} in Bangladesh. ${planPhrase}` +
      `Pricing and availability are confirmed after plan verification — ` +
      `ask on WhatsApp. Pay in BDT with bKash or Nagad, no international card needed.`;

  return {
    path: `/tools/${slug}`,
    title,
    description,
    canonical: `${SITE}/tools/${slug}`,
  };
}

const records = [...families.entries()]
  .map(([slug, variants]) => buildMeta(slug, variants))
  .sort((a, b) => a.path.localeCompare(b.path));

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

// Price anchors for hand-written site copy.
//
// These used to be typed into lib/route-meta.js by hand, and every one of them
// had drifted: the homepage advertised "from ৳349" against a ৳190 catalog floor,
// /chatgpt-plans quoted ৳499/৳999 for tiers that sell at ৳350/৳950, and the Vault
// carried a ৳1,990 that matched no product at all. A wrong price in a <title> is
// the first thing a customer reads on the search result page, so it is derived
// here rather than trusted to stay in sync.
//
// A missing id is a hard failure: emitting a stale number is exactly the bug
// this exists to prevent, so generation stops instead of falling back.
const priceOf = (id) => {
  const p = catalog.find((x) => x.id === id);
  if (!p) throw new Error(`price anchor: no product with id "${id}"`);
  if (!(p.price > 0)) throw new Error(`price anchor: "${id}" has no published price`);
  return p.price;
};

const published = catalog.filter((p) => p.price > 0);
if (!published.length) throw new Error("price anchor: catalog has no published prices");

const ANCHORS = {
  catalogMin: Math.min(...published.map((p) => p.price)),
  chatgptPlusShared: priceOf("chatgpt-plus-starter-shared"),
  chatgptPlusPremiumShared: priceOf("chatgpt-plus-premium-shared"),
  chatgptPlusPersonal: priceOf("chatgpt-plus-personal"),
};

const body = records
  .map(
    (r) =>
      `  "${r.path}": { title: "${esc(r.title)}", description: "${esc(
        r.description
      )}", canonical: "${r.canonical}" },`
  )
  .join("\n");

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/data/products-catalog.json
// Regenerate: npm run gen:routes
//
// One entry per product family served by /tools/:slug in App.tsx. Merged into
// ROUTE_META so each product page ships its own title, description and
// canonical from the server instead of sharing one generic record.

export const PRODUCT_ROUTE_META = {
${body}
};

export const PRODUCT_PATHS = Object.keys(PRODUCT_ROUTE_META);

// Counts used in site copy. Generated so a growing catalog can never leave a
// stale "80 tools" claim behind in a title or meta description.
//   TOOL_COUNT    distinct products (one per page) — what a visitor calls a tool
//   PRODUCT_COUNT purchasable tiers across those products — what /all-products lists
export const TOOL_COUNT = ${records.length};
export const PRODUCT_COUNT = ${catalog.length};

// Prices quoted in hand-written site copy, derived from the catalog so a repriced
// tier cannot leave a stale number in a title or meta description.
export const PRICE_ANCHORS = ${JSON.stringify(ANCHORS, null, 2)};
`;

writeFileSync(resolve(ROOT, "lib/product-routes.js"), out, "utf-8");

console.log(
  `gen:routes  wrote lib/product-routes.js — ${records.length} product families from ${catalog.length} catalog entries`
);
