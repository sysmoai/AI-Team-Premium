#!/usr/bin/env node
// Generates shared/nav-menu.js — the header and footer navigation, from the catalog.
//
//   npm run gen:nav
//
// The menu used to be a hardcoded list of 17 products with hardcoded prices in
// Bengali numerals. Every single one had drifted: the header advertised Claude at
// ৳599 against a ৳1,495 catalog price, Google AI Pro at ৳449 against ৳3,390,
// Kling at ৳599 against ৳270. That is the worst place on the site for a wrong
// price, because the header renders on every page.
//
// It was also structurally stuck. It listed products one by one, so a catalog
// that grew from 66 to 78 families left three whole categories — automation, SEO
// and learning — with no way to reach them from the nav at all, and the list was
// already too long to scan.
//
// So the menu is now built from categories rather than from a hand-picked product
// list: each category carries its own count and real price floor, plus a few
// representative products. That scales — adding a product changes a count, and
// adding a category adds a column, without anyone editing the header.
//
// Ordering inside a category: featured first, then cheapest. Cheapest matters
// because the entry price is what makes someone click.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);

// Labels come from the same map the pages use, parsed rather than imported
// because that file is TypeScript.
const catSrc = readFileSync(resolve(ROOT, "client/src/lib/categories.ts"), "utf-8");
const labelBlock = catSrc.slice(catSrc.indexOf("CATEGORY_LABELS"), catSrc.indexOf("export function"));
const LABELS = {};
for (const m of labelBlock.matchAll(/(?:^|\s)"?([a-z0-9-]+)"?\s*:\s*"([^"]+)"/gm)) {
  LABELS[m[1]] = m[2];
}

// How the categories are laid out in the mega-menu. Grouping keeps a 12-category
// menu scannable; a category missing here still ships, in the trailing column,
// so forgetting to place a new one degrades rather than hides it.
const COLUMNS = [
  { heading: "Chat & Research", cats: ["ai-assistant", "ai-research"] },
  { heading: "Create", cats: ["ai-image", "ai-video", "ai-voice-music", "ai-design"] },
  { heading: "Work & Build", cats: ["ai-workspace", "ai-code", "ai-writing"] },
  { heading: "Grow & Learn", cats: ["automation", "seo", "ai-learning", "bundles"] },
];

const families = new Map();
for (const p of catalog) {
  if (!families.has(p.slug)) families.set(p.slug, []);
  families.get(p.slug).push(p);
}

// One entry per product family, with its real entry price.
const productsByCat = {};
for (const [slug, tiers] of families) {
  const head = tiers[0];
  const sellable = tiers.filter((t) => t.price > 0 && !t.priceOnRequest).map((t) => t.price);
  const entry = {
    name: head.brand,
    href: `/tools/${slug}`,
    priceFrom: sellable.length ? Math.min(...sellable) : null,
    featured: tiers.some((t) => t.featured),
    tiers: tiers.length,
  };
  (productsByCat[head.category] ??= []).push(entry);
}

for (const list of Object.values(productsByCat)) {
  list.sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity) ||
      a.name.localeCompare(b.name)
  );
}

const allCats = Object.keys(productsByCat);
const placed = new Set(COLUMNS.flatMap((c) => c.cats));
const unplaced = allCats.filter((c) => !placed.has(c));

const columns = COLUMNS.map((col) => ({
  heading: col.heading,
  categories: col.cats
    .filter((c) => productsByCat[c])
    .map((c) => buildCategory(c)),
}));

// Anything not explicitly placed still appears rather than silently vanishing.
if (unplaced.length) {
  columns.push({ heading: "More", categories: unplaced.map(buildCategory) });
}

function buildCategory(cat) {
  const list = productsByCat[cat] ?? [];
  const prices = list.map((p) => p.priceFrom).filter((n) => typeof n === "number");
  return {
    slug: cat,
    label: LABELS[cat] ?? cat,
    href: `/all-products?category=${cat}`,
    count: list.length,
    priceFrom: prices.length ? Math.min(...prices) : null,
    // Four is what fits a menu column without turning it into a directory.
    top: list.slice(0, 4).map(({ name, href, priceFrom }) => ({ name, href, priceFrom })),
  };
}

const totalFamilies = families.size;
const totalTiers = catalog.length;
const floor = Math.min(
  ...catalog.filter((p) => p.price > 0 && !p.priceOnRequest).map((p) => p.price)
);

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/data/products-catalog.json + client/src/lib/categories.ts
// Regenerate: npm run gen:nav
//
// Header and footer navigation. Built from the catalog so a price in the menu
// cannot drift from the price on the page, and so a new category reaches the nav
// without anyone editing the header. See scripts/gen-nav.mjs for the reasoning.

export const NAV_COLUMNS = ${JSON.stringify(columns, null, 2)};

/** Flat list of every category in the menu, for the footer and for checks. */
export const NAV_CATEGORIES = NAV_COLUMNS.flatMap((c) => c.categories);

export const CATALOG_TOTALS = {
  families: ${totalFamilies},
  tiers: ${totalTiers},
  priceFrom: ${floor},
};
`;

writeFileSync(resolve(ROOT, "shared/nav-menu.js"), out.replace(/\r\n/g, "\n"), "utf-8");

console.log(
  `gen:nav  wrote shared/nav-menu.js — ${columns.length} columns, ` +
    `${columns.reduce((n, c) => n + c.categories.length, 0)} categories, ` +
    `${totalFamilies} families, floor ৳${floor}`
);
if (unplaced.length) console.log(`  placed in "More" (add to COLUMNS): ${unplaced.join(", ")}`);
