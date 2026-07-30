// scripts/audit-prices.mjs — report where displayed prices disagree.
//
// Prices live in three places and nothing keeps them in sync:
//   1. client/src/data/products-complete.json  (source of truth -> catalog)
//   2. client/src/pages/tools/*.tsx            (hardcoded on each tool page)
//   3. client/src/lib/config.ts                (order templates — now gated)
//
// Deciding which figure is correct is a pricing decision, not a code one, so
// this script only reports. Run it, decide per tool, then fix the losing side.
//
//   npm run audit:prices

import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const money = (n) => "৳" + n.toLocaleString("en-US");

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);
const products = Array.isArray(catalog)
  ? catalog
  : catalog.products || Object.values(catalog).find(Array.isArray);

const catalogByBrand = new Map();
for (const p of products) {
  const brand = (p.brand || "").toLowerCase();
  if (!brand) continue;
  if (!catalogByBrand.has(brand)) catalogByBrand.set(brand, []);
  catalogByBrand.get(brand).push(p.price);
}

const toolsDir = resolve(ROOT, "client/src/pages/tools");
const rows = [];

for (const file of readdirSync(toolsDir).filter((f) => f.endsWith(".tsx"))) {
  const src = readFileSync(join(toolsDir, file), "utf-8");
  const pagePrices = [...src.matchAll(/price:\s*"৳([\d,]+)"/g)]
    .map((m) => Number(m[1].replace(/,/g, "")))
    .sort((a, b) => a - b);
  if (pagePrices.length === 0) continue;

  const displayName = (src.match(/name="([^"]+)"/)?.[1] || file).toLowerCase();
  const brandKey = [...catalogByBrand.keys()].find(
    (b) => b && displayName.includes(b)
  );
  const catPrices = brandKey
    ? [...new Set(catalogByBrand.get(brandKey))].sort((a, b) => a - b)
    : null;

  const inSync =
    catPrices !== null && JSON.stringify(pagePrices) === JSON.stringify(catPrices);

  rows.push({ tool: file.replace(".tsx", ""), pagePrices, catPrices, inSync });
}

const drifted = rows.filter((r) => !r.inSync && r.catPrices);
const missing = rows.filter((r) => !r.catPrices);
const clean = rows.filter((r) => r.inSync);

console.log("\nPrice drift audit — tool pages vs catalog\n");
console.log(
  "tool".padEnd(16) + "page shows".padEnd(30) + "catalog says".padEnd(30) + "cheapest gap"
);
console.log("-".repeat(90));

for (const r of drifted) {
  const pageMin = r.pagePrices[0];
  const catMin = r.catPrices[0];
  let gap = "same entry price";
  if (pageMin !== catMin) {
    const ratio = (Math.max(pageMin, catMin) / Math.min(pageMin, catMin)).toFixed(1);
    gap = pageMin < catMin ? `page ${ratio}x LOW` : `page ${ratio}x HIGH`;
  }
  console.log(
    r.tool.padEnd(16) +
      r.pagePrices.map(money).join(", ").padEnd(30) +
      r.catPrices.map(money).join(", ").padEnd(30) +
      gap
  );
}

if (missing.length) {
  console.log("\nOn a tool page but absent from the catalog:");
  for (const r of missing) {
    console.log(`  ${r.tool.padEnd(14)} page shows ${r.pagePrices.map(money).join(", ")}`);
  }
}

console.log(
  `\n${clean.length} in sync · ${drifted.length} drifted · ${missing.length} not in catalog\n`
);
console.log(
  "A page showing LOW undercharges every customer who orders from it.\n" +
    "A page showing HIGH loses customers who compare against the catalog page.\n"
);
