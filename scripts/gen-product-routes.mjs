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

  const description =
    `Buy ${brand} in Bangladesh. ${pricePhrase}${planPhrase}` +
    `Pay with bKash or Nagad — no international card needed. ` +
    `${sla} delivery, 30-day replacement guarantee, Bangla WhatsApp support.`;

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
`;

writeFileSync(resolve(ROOT, "lib/product-routes.js"), out, "utf-8");

console.log(
  `gen:routes  wrote lib/product-routes.js — ${records.length} product families from ${catalog.length} catalog entries`
);
