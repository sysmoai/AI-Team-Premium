#!/usr/bin/env node
/**
 * NOTION DATA TRANSFORMER
 * Converts Notion exports (CSV, JSON) to product catalog format
 *
 * Supports multiple formats:
 * - Notion CSV export
 * - Notion JSON export
 * - Generic product JSON
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node scripts/transform-notion-data.mjs <input-file>");
  process.exit(1);
}

const input = readFileSync(inputFile, "utf-8");
let products = [];

console.log("🔄 NOTION DATA TRANSFORMATION");
console.log("═".repeat(60));

// Try JSON first
try {
  const data = JSON.parse(input);
  products = Array.isArray(data) ? data : data.products || Object.values(data).flat();
  console.log("✅ Detected format: JSON");
} catch {
  // Try CSV
  if (input.includes(",") && input.includes("\n")) {
    console.log("✅ Detected format: CSV");
    const lines = input.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

    products = lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = values[i];
      });
      return obj;
    });
  } else {
    console.error("❌ Unsupported format. Use JSON or CSV.");
    process.exit(1);
  }
}

console.log(`Found: ${products.length} items\n`);

// Normalize to product format
const normalized = products.map((p, idx) => ({
  id: p.id || p.slug || `product-${idx}`.toLowerCase().replace(/\s+/g, "-"),
  name: p.name || p.title || p.product_name || "",
  brand: p.brand || p.provider || p.company || "",
  slug: p.slug || (p.name || "").toLowerCase().replace(/[^a-z0-9]/g, "-"),
  category: p.category || p.type || "ai-tool",
  price: p.price ? parseInt(p.price) : p.priceBdt || 999,
  officialUSD: p.officialUSD || p.usd_price || Math.round((p.price || 999) / 70),
  tier: p.tier || p.plan || "Standard",
  description: p.description || p.details || p.summary || "",
  descriptionBN: p.descriptionBN || p.description_bn || "",
  capabilities: p.capabilities ? (typeof p.capabilities === "string" ? p.capabilities.split(",") : p.capabilities) : [],
  features: p.features ? (typeof p.features === "string" ? p.features.split(",") : p.features) : [],
  deliverySLA: p.deliverySLA || p.delivery || "5-15 min",
  badge: p.badge || p.label || "",
  featured: p.featured === true || p.featured === "true" || p.featured === 1,
  accessType: p.accessType || p.access_type || "shared",
  whatsappMsg: p.whatsappMsg || `Hi, I want ${p.name || "this product"} (৳${p.price || 999}/mo)`,
  status: p.status || "Active",
  useCases: p.useCases ? (typeof p.useCases === "string" ? p.useCases.split(";") : p.useCases) : [],
  sourceUrl: p.sourceUrl || p.website || p.url || "",
})).filter(p => p.name && p.brand);

console.log(`✅ Normalized: ${normalized.length} products`);

// Output
const outputFile = inputFile.replace(/\.[^.]+$/, "-normalized.json");
writeFileSync(outputFile, JSON.stringify(normalized, null, 2));

console.log(`\n📁 Output: ${outputFile}`);
console.log(`\n✨ Next step:`);
console.log(`   node scripts/integrate-bulk-products.mjs ${outputFile}`);

// Show sample
console.log(`\n📋 SAMPLE (first 3 products):`);
normalized.slice(0, 3).forEach(p => {
  console.log(`  • ${p.name} (${p.brand}) - ৳${p.price}`);
});
