#!/usr/bin/env node
// Generates shared/pricing-table.js — the /pricing table, from the catalog.
//
//   npm run gen:pricing
//
// /pricing listed 49 rows with hand-typed prices and every one of them had
// drifted. It is the page a customer reads immediately before ordering, and the
// price was wrong in two places per row: the figure in the table, and the same
// figure baked into the prefilled WhatsApp message. So a customer messaged us
// quoting a price we do not charge, which is the worst possible place to be
// wrong — we either honour a loss or argue with someone who is holding our own
// order template.
//
// A sample of what was live:
//
//   Adobe CC Photography    page ৳499     catalog ৳190
//   Poe                     page ৳799     catalog ৳3,440
//   Kling AI Pro            page ৳599     catalog ৳270
//   Google AI Pro           page ৳599     catalog ৳3,390
//   ChatGPT Pro Personal    page ৳34,900  catalog ৳29,900
//
// The table is now derived, so the row, the WhatsApp message and the product
// page cannot disagree.
//
// DEEP_LINKS exists because ChatGPT has per-tier pages (/chatgpt/plus-shared and
// friends) that are real routes in App.tsx. Without this the generated rows
// would all point at /tools/chatgpt-plus-bangladesh and orphan nine pages.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);

// Catalog id -> the tier-specific page that already exists for it.
// A key naming a product that is not in the catalog is a hard failure: it means
// the page links somewhere the catalog cannot price.
const DEEP_LINKS = {
  "chatgpt-plus-starter-shared": "/chatgpt/plus-shared",
  "chatgpt-plus-premium-shared": "/chatgpt/plus-premium-shared",
  "chatgpt-plus-personal": "/chatgpt/plus-personal-seat",
  "chatgpt-go-personal": "/chatgpt/go-personal",
  "chatgpt-business-starter-shared": "/chatgpt/business-shared",
  "chatgpt-business-premium-shared": "/chatgpt/business-premium-shared",
  "chatgpt-business-personal": "/chatgpt/business-personal-like",
  "chatgpt-pro-premium-shared": "/chatgpt/pro-premium-shared",
};

for (const id of Object.keys(DEEP_LINKS)) {
  if (!catalog.some((p) => p.id === id)) {
    console.error(`gen:pricing FAILED — DEEP_LINKS names "${id}", which is not in the catalog`);
    process.exit(1);
  }
}

// Section order and headings. Categories not listed still ship, under "More",
// so a new category appears on /pricing without anyone editing this.
const SECTION_ORDER = [
  ["ai-assistant", "🤖 AI Chat & Research"],
  ["ai-image", "🎨 AI Image Generation"],
  ["ai-video", "🎬 AI Video"],
  ["ai-voice-music", "🎙️ Voice & Music"],
  ["ai-writing", "✍️ Writing"],
  ["ai-code", "💻 Coding"],
  ["ai-design", "🖌️ Design"],
  ["ai-workspace", "🗂️ Workspace & Productivity"],
  ["automation", "⚙️ Automation"],
  ["seo", "📈 SEO & Marketing"],
  ["ai-learning", "🎓 Learning"],
  ["ai-research", "🔬 Research"],
  ["bundles", "💎 Bundles & Packages"],
];

const bdt = (n) => `৳${n.toLocaleString("en-US")}`;

function rowFor(p) {
  const href = DEEP_LINKS[p.id] ?? `/tools/${p.slug}`;
  const unit = p.category === "bundles" ? "" : "/mo";
  // priceOnRequest tiers carry an internal reference price that must not ship,
  // so they are quoted rather than priced — including in the order message.
  const price = p.priceOnRequest || !(p.price > 0) ? "Price on request" : `${bdt(p.price)}${unit}`;
  const waText = p.priceOnRequest || !(p.price > 0)
    ? `Hi, I want ${p.name} — please quote a price.`
    : `Hi, I want ${p.name} (${bdt(p.price)}${unit}) — please share payment details.`;
  return {
    name: p.name,
    price,
    priceBdt: p.priceOnRequest || !(p.price > 0) ? null : p.price,
    delivery: p.deliverySLA ?? "",
    href,
    waText,
  };
}

// The old subtitle was the same sentence on every section. A count and a real
// price floor tell a visitor whether the section is worth opening.
function subtitleFor(items) {
  const priced = items.filter((p) => p.price > 0 && !p.priceOnRequest).map((p) => p.price);
  const n = `${items.length} plan${items.length === 1 ? "" : "s"}`;
  return priced.length
    ? `${n} · from ${bdt(Math.min(...priced))}/mo · bKash/Nagad`
    : `${n} · quoted on request · bKash/Nagad`;
}

const byCat = new Map();
for (const p of catalog) {
  if (!byCat.has(p.category)) byCat.set(p.category, []);
  byCat.get(p.category).push(p);
}

const sections = [];
const seen = new Set();
for (const [cat, title] of SECTION_ORDER) {
  const items = byCat.get(cat);
  if (!items) continue;
  seen.add(cat);
  sections.push({
    title,
    category: cat,
    subtitle: subtitleFor(items),
    // Cheapest first: the entry price is what a visitor scans for.
    items: items
      .slice()
      .sort((a, b) => (a.price || Infinity) - (b.price || Infinity) || a.name.localeCompare(b.name))
      .map(rowFor),
  });
}
for (const [cat, items] of byCat) {
  if (seen.has(cat)) continue;
  sections.push({
    title: cat,
    category: cat,
    items: items.slice().sort((a, b) => (a.price || Infinity) - (b.price || Infinity)).map(rowFor),
  });
}

const rowCount = sections.reduce((n, s) => n + s.items.length, 0);
const priced = catalog.filter((p) => p.price > 0 && !p.priceOnRequest).map((p) => p.price);

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/data/products-catalog.json
// Regenerate: npm run gen:pricing
//
// The /pricing table. Derived so the figure in the row, the figure in the
// prefilled WhatsApp message, and the product page cannot disagree — all three
// used to be typed separately and all 49 rows had drifted.

export const PRICING_SECTIONS = ${JSON.stringify(sections, null, 2)};

export const PRICING_SUMMARY = {
  rows: ${rowCount},
  priceFrom: ${Math.min(...priced)},
  priceTo: ${Math.max(...priced)},
};
`;

writeFileSync(resolve(ROOT, "shared/pricing-table.js"), out.replace(/\r\n/g, "\n"), "utf-8");

console.log(
  `gen:pricing  wrote shared/pricing-table.js — ${sections.length} sections, ${rowCount} rows, ` +
    `${bdt(Math.min(...priced))}–${bdt(Math.max(...priced))}`
);
