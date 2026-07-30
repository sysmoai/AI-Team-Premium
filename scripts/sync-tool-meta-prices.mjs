#!/usr/bin/env node
// Rewrites each editorial tool page's TOOL_META price from products-catalog.json.
//
//   npm run gen:tool-prices
//
// TOOL_META is the structured block at the top of client/src/pages/tools/*.tsx.
// It is what /compare/:slug reads, so a wrong number there is quoted on the
// comparison pages too, not just on the tool page.
//
// Every one of these had been typed by hand and 20 of 25 disagreed with the
// catalog. The direction matters:
//
//   page LOW  — Adobe CC advertised 499 against a 10,464 floor (21x), Microsoft
//               365 Copilot 899 against 7,776 (8.6x). Anyone ordering at the
//               advertised price is a loss on every order.
//   page HIGH — Firefly advertised 599 against a 190 catalog price (3.2x), so
//               the same product looked three times more expensive depending on
//               which of our own pages the visitor landed on.
//
// The value written is the family's lowest published tier — the "from" price —
// because that is what a tool page headline means. Families that are entirely
// price-on-request get a label instead of a number.
//
// Only TOOL_META is rewritten. Prices inside prose, FAQ answers and comparison
// tables on these pages are NOT touched: each needs to be read in context to
// know which tier it refers to, and some are not product prices at all
// ("৳8,000 photoshoot → ৳0"). Those are tracked separately.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = resolve(ROOT, "client/src/pages/tools");

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);
const { CANONICAL_MAP } = await import(
  pathToFileURL(resolve(ROOT, "shared/canonical-map.js")).href
);

const bySlug = new Map();
for (const p of catalog) {
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
  bySlug.get(p.slug).push(p);
}

const rows = [];
let changed = 0;

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".tsx"))) {
  const path = resolve(DIR, file);
  let src = readFileSync(path, "utf-8");

  const slug = src.match(/"slug":\s*"([^"]+)"/)?.[1];
  if (!slug) continue;

  const target = CANONICAL_MAP[`/tools/${slug}`];
  if (!target) {
    // No catalog counterpart (LinkedIn Premium, the Vault bundle). Leave alone.
    rows.push({ file, from: "-", to: "-", note: "no catalog entry — skipped" });
    continue;
  }

  const family = bySlug.get(target.replace("/tools/", ""));
  if (!family) throw new Error(`${file}: canonical target ${target} has no catalog family`);

  // priceOnRequest tiers keep a `price` field, but it is an internal reference
  // the catalog deliberately does not publish — Adobe CC (10,464) and M365
  // Copilot (7,776) are quoted per enquiry because their real cost depends on
  // the licence the customer already holds. Filtering on `price > 0` alone
  // would publish exactly the numbers that were withheld on purpose.
  const published = family
    .filter((p) => p.price > 0 && !p.priceOnRequest)
    .map((p) => p.price);
  const before = Number(src.match(/"priceBdt":\s*(\d+)/)?.[1] ?? 0);

  let priceBdt, priceLabel;
  if (published.length === 0) {
    // Whole family is quoted per enquiry; a headline number would contradict it.
    priceBdt = 0;
    priceLabel = "Price on request";
  } else {
    priceBdt = Math.min(...published);
    priceLabel = `from ৳${priceBdt.toLocaleString("en-US")}/mo`;
  }

  const next = src
    .replace(/"priceBdt":\s*\d+/, `"priceBdt": ${priceBdt}`)
    .replace(/"priceLabel":\s*"[^"]*"/, `"priceLabel": "${priceLabel}"`);

  if (next !== src) {
    writeFileSync(path, next, "utf-8");
    changed++;
  }
  rows.push({
    file,
    from: before || "-",
    to: priceBdt || "on request",
    note: before && priceBdt && before !== priceBdt
      ? before < priceBdt
        ? `was UNDER by ${(priceBdt / before).toFixed(1)}x`
        : `was OVER by ${(before / priceBdt).toFixed(1)}x`
      : "",
  });
}

console.log(`gen:tool-prices  rewrote TOOL_META price on ${changed} page(s)\n`);
console.log("PAGE".padEnd(18) + "WAS".padStart(8) + "NOW".padStart(13) + "  NOTE");
console.log("-".repeat(66));
for (const r of rows.sort((a, b) => a.file.localeCompare(b.file))) {
  console.log(
    r.file.replace(".tsx", "").padEnd(18) +
      String(r.from).padStart(8) +
      String(r.to).padStart(13) +
      "  " + r.note
  );
}
