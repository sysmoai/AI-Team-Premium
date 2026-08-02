#!/usr/bin/env node
/**
 * BULK PRODUCT INTEGRATION SYSTEM
 * Efficiently adds 150+ products to catalog with validation
 *
 * Usage: node scripts/integrate-bulk-products.mjs <input-file.json>
 * Input format: Array of products or { products: [] }
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const args = process.argv.slice(2);
if (!args[0]) {
  console.error("Usage: node scripts/integrate-bulk-products.mjs <input-file.json>");
  process.exit(1);
}

const inputPath = resolve(args[0]);
const catalogPath = resolve("./client/src/data/products-catalog.json");
const backupPath = resolve("./client/src/data/products-catalog.backup.json");

console.log("🚀 BULK PRODUCT INTEGRATION SYSTEM");
console.log("═".repeat(60));

// Load input
let newProducts;
try {
  const data = JSON.parse(readFileSync(inputPath, "utf-8"));
  newProducts = Array.isArray(data) ? data : data.products || [];
} catch (e) {
  console.error("❌ Failed to parse input file:", e.message);
  process.exit(1);
}

// Load current catalog
let catalog;
try {
  catalog = JSON.parse(readFileSync(catalogPath, "utf-8"));
} catch (e) {
  console.error("❌ Failed to load catalog:", e.message);
  process.exit(1);
}

console.log(`📊 INPUT ANALYSIS`);
console.log(`─`.repeat(60));
console.log(`New products to add: ${newProducts.length}`);
console.log(`Current catalog size: ${catalog.length}`);

// Validation & Deduplication
const catalogIds = new Set(catalog.map(p => p.id));
const toAdd = [];
const duplicates = [];
const invalid = [];

newProducts.forEach(p => {
  // Validate required fields
  const required = ["id", "name", "brand", "category", "price"];
  const missing = required.filter(f => !p[f]);

  if (missing.length > 0) {
    invalid.push({ product: p.name || "Unknown", missing });
  } else if (catalogIds.has(p.id)) {
    duplicates.push(p.id);
  } else {
    toAdd.push(p);
  }
});

console.log(`✅ Valid & unique: ${toAdd.length}`);
console.log(`⚠️  Duplicates (skipped): ${duplicates.length}`);
console.log(`❌ Invalid (missing fields): ${invalid.length}`);

if (invalid.length > 0) {
  console.log("\nInvalid products:");
  invalid.forEach(i => {
    console.log(`  - ${i.product}: missing ${i.missing.join(", ")}`);
  });
}

// Integrate
catalog.push(...toAdd);

// Backup
writeFileSync(backupPath, JSON.stringify(
  JSON.parse(readFileSync(catalogPath, "utf-8")),
  null,
  2
));

// Save
writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

console.log(`\n✅ INTEGRATION COMPLETE`);
console.log(`─`.repeat(60));
console.log(`Total products: ${catalog.length}`);
console.log(`Added: ${toAdd.length}`);
console.log(`Backup: ${backupPath}`);
console.log(`\n📁 Catalog updated: ${catalogPath}`);

// Summary by category
const byCat = {};
toAdd.forEach(p => {
  byCat[p.category] = (byCat[p.category] || 0) + 1;
});

console.log("\n📂 ADDED BY CATEGORY:");
Object.entries(byCat).forEach(([cat, count]) => {
  console.log(`  ${cat}: +${count}`);
});

console.log("\n✨ NEXT STEPS:");
console.log("1. Run: npm run validate:catalog");
console.log("2. Run: npm run build");
console.log("3. Run: npm run ship");
console.log("4. Deploy: git push origin main");
