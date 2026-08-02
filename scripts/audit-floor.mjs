#!/usr/bin/env node
// scripts/audit-floor.mjs — flags prices that look anomalously low relative
// to a cost-basis reference, for HUMAN PRICING REVIEW ONLY.
//
// This does NOT assert a correct price and never fails the build. Per the
// canonical "Product Intelligence & Offer Eligibility Protocol" (Notion):
// "Never use an automatic percentage formula to create public prices. Price
// is a management decision supported by current cost and risk data." This
// script's formula is a diagnostic reference point, not a pricing authority.
//
// It also does NOT check accessType:"shared" records against this formula —
// shared-seat pricing is legitimately lower because cost is split across a
// seat pool, and that is a different (currently undocumented, see
// docs/context/KNOWN_RISKS.md R0) legitimacy question entirely: whether the
// provider's terms permit shared-credential sale at all, which no formula
// can answer.
//
// Usage: node scripts/audit-floor.mjs

import { readFileSync } from "node:fs";

const catalog = JSON.parse(
  readFileSync(new URL("../client/src/data/products-catalog.json", import.meta.url), "utf-8")
);

const money = (n) => "৳" + n.toLocaleString("en-US");

// Reference formula only — see header. Not a price-setting mechanism.
const referenceFloor = (usd) => Math.ceil((usd * 130 * 1.15) / 16) * 16;

const flagged = [];
const skippedShared = [];
const skippedNoCost = [];

for (const p of catalog) {
  if (p.accessType === "shared") {
    skippedShared.push(p.id);
    continue;
  }
  if (!p.officialUSD || p.priceOnRequest) {
    skippedNoCost.push(p.id);
    continue;
  }
  const floor = referenceFloor(p.officialUSD);
  const gap = floor - p.price;
  if (gap > 0) {
    flagged.push({ id: p.id, name: p.name, price: p.price, floor, gap, pct: Math.round((gap / floor) * 100) });
  }
}

console.log("\nFloor reference-check — HUMAN PRICING REVIEW SIGNAL ONLY, not a build gate\n");
console.log(`accessType:"shared" records (excluded — different, seat-pool economics): ${skippedShared.length}`);
console.log(`no officialUSD / priceOnRequest records (excluded — no cost basis to compare): ${skippedNoCost.length}`);
console.log(`non-shared records checked against reference formula: ${catalog.length - skippedShared.length - skippedNoCost.length}\n`);

const material = flagged.filter((f) => f.pct >= 20);
const minor = flagged.filter((f) => f.pct < 20);

if (material.length) {
  console.log(`⚠ ${material.length} record(s) with a MATERIAL gap (≥20% below reference floor) — recommend pricing review:\n`);
  for (const f of material.sort((a, b) => b.pct - a.pct)) {
    console.log(
      `  ${f.id.padEnd(32)} price=${money(f.price).padEnd(10)} reference=${money(f.floor).padEnd(10)} gap=${f.pct}%`
    );
  }
  console.log();
}

if (minor.length) {
  console.log(`${minor.length} record(s) with a minor gap (<20%, likely rounding/FX-convention noise, not flagged for review):`);
  for (const f of minor.sort((a, b) => b.pct - a.pct)) {
    console.log(`  ${f.id} (${f.pct}% / ${money(f.gap)})`);
  }
  console.log();
}

if (!flagged.length) {
  console.log("No records flagged.\n");
}

console.log(
  "Reminder: a flagged gap is a signal for a human pricing decision, not proof of an error.\n" +
    "It does not account for legitimate bulk-purchase, promotional, or other cost-basis\n" +
    "arrangements not currently reflected in officialUSD. See docs/context/CONFLICT_LEDGER.md.\n"
);
