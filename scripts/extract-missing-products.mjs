#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

const complete = JSON.parse(readFileSync("./client/src/data/products-complete.json", "utf-8")).products;
const catalog = JSON.parse(readFileSync("./client/src/data/products-catalog.json", "utf-8"));

const catalogIds = new Set(catalog.map(p => p.id));
const missing = complete.filter(p => !catalogIds.has(p.id));

console.log(`\n📊 PRODUCT EXTRACTION REPORT`);
console.log(`═`.repeat(60));
console.log(`Complete list: ${complete.length} products`);
console.log(`Current catalog: ${catalog.length} products`);
console.log(`Missing: ${missing.length} products\n`);
console.log(`MISSING PRODUCTS:\n`);

missing.forEach((p, i) => {
  const price = `৳${p.price} (USD $${p.officialUSD}/mo)`;
  console.log(`${String(i+1).padStart(2)}. ${p.name.padEnd(50)} ${price}`);
});

writeFileSync("./MISSING_PRODUCTS.json", JSON.stringify(missing, null, 2));
console.log(`\n✅ Extracted ${missing.length} missing products`);
console.log(`✅ Saved to MISSING_PRODUCTS.json`);
