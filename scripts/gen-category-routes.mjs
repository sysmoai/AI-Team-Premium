#!/usr/bin/env node
// Generates lib/category-routes.js — SEO metadata for the /category/<slug> pages.
//
//   npm run gen:category
//
// The header used to link categories at /all-products?category=<slug>. A query
// string is not a separate page to a crawler, so twelve categories shared one
// indexable URL and none could rank for its own demand. Each category now has
// its own page, and this generates the title, description and canonical for it.
//
// Counts and price floors are derived from the catalog rather than written by
// hand, so a repriced tier or a new product cannot leave a stale figure in a
// <title> — the first thing a customer reads on a search result page.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);

const { CATEGORY_INTROS } = await import(
  pathToFileURL(resolve(ROOT, "shared/category-intros.js")).href
);

// Same labels the pages render. Read from the TypeScript source rather than
// duplicated here, so a renamed category cannot say one thing in the nav and
// another in the <title>.
const catsSrc = readFileSync(resolve(ROOT, "client/src/lib/categories.ts"), "utf-8");
const labelBlock = catsSrc.match(/export const CATEGORY_LABELS[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!labelBlock) {
  console.error("gen:category FAILED — could not read CATEGORY_LABELS from lib/categories.ts");
  process.exit(1);
}
const LABELS = {};
for (const m of labelBlock[1].matchAll(/["']?([a-z0-9-]+)["']?\s*:\s*"([^"]+)"/g)) {
  LABELS[m[1]] = m[2];
}

const bdt = (n) => `৳${Number(n).toLocaleString("en-US")}`;

const byCategory = new Map();
for (const p of catalog) {
  if (!p.category) continue;
  if (!byCategory.has(p.category)) byCategory.set(p.category, []);
  byCategory.get(p.category).push(p);
}

const problems = [];
const records = [];

for (const [slug, rows] of byCategory) {
  const label = LABELS[slug];
  if (!label) problems.push(`category "${slug}" has no label in lib/categories.ts`);
  const intro = CATEGORY_INTROS[slug];
  if (!intro) problems.push(`category "${slug}" has no intro in shared/category-intros.js`);
  if (intro && intro.meta.length > 165)
    problems.push(`category "${slug}" meta is ${intro.meta.length} chars — will be truncated`);

  const sellable = rows.filter((p) => p.price > 0 && !p.priceOnRequest);
  const from = sellable.length ? Math.min(...sellable.map((p) => p.price)) : null;
  const families = new Set(rows.map((p) => p.slug)).size;

  // Must produce the same string as usePageMeta() in CategoryPage.tsx.
  const heading = intro?.titleLabel ?? `${label} Tools`;
  const noun = families === 1 ? "Tool" : "Tools";
  // Bundles are sold once, not monthly — the cards already say "one-time", so a
  // "/mo" in the title would contradict the price directly beneath it.
  const period = slug === "bundles" ? "" : "/mo";
  const title = from
    ? `${heading} in Bangladesh — ${families} ${noun} from ${bdt(from)}${period} | AI Team Premium`
    : `${heading} in Bangladesh — Pricing & Plans | AI Team Premium`;

  records.push({
    path: `/category/${slug}`,
    title,
    description: intro?.meta ?? "",
    canonical: `${SITE}/category/${slug}`,
  });
}

if (problems.length) {
  console.error("gen:category FAILED:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

records.sort((a, b) => a.path.localeCompare(b.path));

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/data/products-catalog.json + shared/category-intros.js
// Regenerate: npm run gen:category

export const CATEGORY_ROUTE_META = {
${records
  .map(
    (r) =>
      `  "${r.path}": { title: "${esc(r.title)}", description: "${esc(
        r.description
      )}", canonical: "${r.canonical}" },`
  )
  .join("\n")}
};

export const CATEGORY_PATHS = Object.keys(CATEGORY_ROUTE_META);
`;

const OUT = resolve(ROOT, "lib/category-routes.js");

if (process.argv.includes("--check")) {
  let existing = null;
  try {
    existing = readFileSync(OUT, "utf-8");
  } catch {
    console.error("lib/category-routes.js is missing — run: npm run gen:category");
    process.exit(1);
  }
  if (existing !== out) {
    console.error("lib/category-routes.js is stale — run: npm run gen:category");
    process.exit(1);
  }
  process.exit(0);
}

writeFileSync(OUT, out, "utf-8");
console.log(`gen:category  wrote lib/category-routes.js — ${records.length} categories`);
