#!/usr/bin/env node
// Fix price drift in tool pages — update to match catalog
// Usage: npm run fix:prices

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const ROOT = resolve(".");
const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);

const products = Array.isArray(catalog)
  ? catalog
  : catalog.products || Object.values(catalog).find(Array.isArray);

// Map brand name to correct prices
const pricesByBrand = {};
for (const p of products) {
  if (!p.brand) continue;
  const key = p.brand.toLowerCase();
  if (!pricesByBrand[key]) pricesByBrand[key] = [];
  if (!pricesByBrand[key].includes(p.price)) {
    pricesByBrand[key].push(p.price);
  }
}

// Special mappings for tools
const BRAND_MAP = {
  "AdobeCC": "adobe",
  "Canva": "canva",
  "Claude": "claude",
  "Copilot": "github", // GitHub Copilot
  "ElevenLabs": "elevenlabs",
  "Firefly": "adobe",
  "Freepik": "freepik",
  "Gemini": "google", // Google Gemini (not GoogleAIPro)
  "GoogleAIPro": "google",
  "Grammarly": "grammarly",
  "Grok": "grok",
  "Ideogram": "ideogram",
  "Kling": "kling ai",
  "Leonardo": "leonardo ai",
  "LinkedIn": "linkedin", // Not in catalog, skip
  "Manus": "manus",
  "Microsoft365": "microsoft",
  "Midjourney": "midjourney",
  "Notion": "notion",
  "Perplexity": "perplexity",
  "Poe": "poe",
  "Runway": "runway",
  "SuperGrok": "grok",
  "Vault": "vault", // Not in catalog, skip
};

const toolsDir = resolve(ROOT, "client/src/pages/tools");
let fixed = 0;
let skipped = 0;

console.log("Fixing price drift in tool pages...\n");

for (const file of readdirSync(toolsDir).filter((f) => f.endsWith(".tsx")).sort()) {
  const toolName = file.replace(".tsx", "");
  const brandKey = BRAND_MAP[toolName];

  if (!brandKey || !pricesByBrand[brandKey]) {
    console.log(`⏭️  ${toolName}: No catalog prices found (skipped)`);
    skipped++;
    continue;
  }

  const correctPrices = pricesByBrand[brandKey].sort((a, b) => a - b);
  const filePath = join(toolsDir, file);
  let content = readFileSync(filePath, "utf-8");
  const originalContent = content;

  // Find all price strings and extract values
  const priceMatches = [...content.matchAll(/price:\s*"৳([\d,]+)"/g)];
  const currentPrices = [...new Set(
    priceMatches.map((m) => Number(m[1].replace(/,/g, "")))
  )].sort((a, b) => a - b);

  // Check if already in sync
  if (JSON.stringify(currentPrices) === JSON.stringify(correctPrices)) {
    console.log(`✅ ${toolName}: Already in sync`);
    skipped++;
    continue;
  }

  // Create replacement map: old price -> new price
  const oldToNew = new Map();
  const sortedOld = currentPrices.sort((a, b) => a - b);
  const sortedNew = correctPrices.sort((a, b) => a - b);

  // Pair prices: cheapest to cheapest, etc.
  for (let i = 0; i < sortedOld.length && i < sortedNew.length; i++) {
    oldToNew.set(sortedOld[i], sortedNew[i]);
  }

  // Apply replacements
  content = content.replace(/price:\s*"৳([\d,]+)"/g, (match, num) => {
    const oldPrice = Number(num.replace(/,/g, ""));
    const newPrice = oldToNew.get(oldPrice);
    if (newPrice !== undefined) {
      const formatted = newPrice.toLocaleString("en-US");
      return `price: "৳${formatted}"`;
    }
    return match;
  });

  // Also update priceBdt field in TOOL_META if it exists
  content = content.replace(/priceBdt:\s*\d+/g, (match) => {
    // Use the minimum price from catalog
    return `priceBdt: ${sortedNew[0]}`;
  });

  // Also update priceLabel if it contains old prices
  for (const [oldPrice, newPrice] of oldToNew) {
    const regex = new RegExp(`from\\s*৳${oldPrice.toLocaleString()}`, "g");
    content = content.replace(regex, `from ৳${newPrice.toLocaleString()}`);
  }

  if (content !== originalContent) {
    writeFileSync(filePath, content, "utf-8");
    console.log(`🔧 ${toolName}: Fixed ${sortedOld.length} price(s)`);
    console.log(`   Old: ${sortedOld.map((p) => `৳${p.toLocaleString()}`).join(", ")}`);
    console.log(`   New: ${sortedNew.map((p) => `৳${p.toLocaleString()}`).join(", ")}`);
    fixed++;
  }
}

console.log(`\n✅ Fixed ${fixed} files, skipped ${skipped}`);
