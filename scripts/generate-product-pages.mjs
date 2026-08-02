#!/usr/bin/env node
/**
 * AUTO-GENERATE PRODUCT PAGES
 * Creates React components for all products in catalog
 * Zero manual work - fully automated
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const catalogPath = "./client/src/data/products-catalog.json";
const pagesDir = "./client/src/pages/tools";
const catalog = JSON.parse(readFileSync(catalogPath, "utf-8"));

console.log("🔧 AUTO-GENERATING PRODUCT PAGES");
console.log("═".repeat(60));
console.log(`Products to generate: ${catalog.length}`);

// Create pages directory if not exists
if (!existsSync(pagesDir)) mkdirSync(pagesDir, { recursive: true });

const getIconName = (brand) => {
  const iconMap = {
    ChatGPT: "MessageSquare",
    Claude: "Brain",
    Gemini: "Sparkles",
    Midjourney: "Image",
    Ideogram: "ImageIcon",
    RunwayML: "Film",
    ElevenLabs: "Mic",
    Leonardo: "Palette",
    CapCut: "Scissors",
    Canva: "PenTool",
    Grammarly: "CheckCircle",
    Notion: "Database",
    Figma: "Layout",
    Perplexity: "Search",
    Grok: "Zap",
    Poe: "MessageCircle",
  };
  return iconMap[brand] || "Sparkles";
};

const generatePageComponent = (product) => {
  const icon = getIconName(product.brand);
  const shortDesc = product.description?.substring(0, 150) || product.name;

  return `import { ToolDetail } from "@/components/ToolDetail";
import { ${icon} } from "lucide-react";

export const TOOL_META = {
  slug: "${product.slug || product.id.split("-").pop()}",
  category: "${product.category}",
  priceBdt: ${product.price},
  priceLabel: "from ৳${product.price}/mo",
  model: "${product.name}",
  contextWindow: "Varies",
  multimodal: "Yes",
  banglaQuality: "⭐⭐⭐⭐",
  speed: "Fast",
  accuracy: "⭐⭐⭐⭐",
  pricingTier: "Standard",
  brand: "${product.brand}",
  tagline: "${product.tier || "Premium"}",
  toolPath: "/tools/${product.slug || product.id}",
  iconName: "${icon}",
  accent: "${product.brandColor || "#4285F4"}",
  bestUseCase: "${product.useCases?.[0] || product.description}",
} as const;

export default function ${product.brand.replace(/[^a-zA-Z0-9]/g, "")}Page() {
  return (
    <ToolDetail
      name="${product.name}"
      tagline="in Bangladesh"
      description="${shortDesc}"
      accentColor="${product.brandColor || "#4285F4"}"
      icon={${icon}}
      features={${JSON.stringify(
        product.capabilities?.slice(0, 8) || ["Feature 1", "Feature 2", "Feature 3"]
      )}}
      plans={${JSON.stringify(
        product.plans?.slice(0, 2) ||
          [
            {
              label: "Shared",
              price: \`৳\${product.price}\`,
              period: "/mo",
              delivery: "5-15 min",
              type: "Shared",
              specs: [
                { label: "Access", value: "Shared account" },
                { label: "Support", value: "24/7 WhatsApp" },
              ],
            },
          ]
      )}}
      path="/tools/${product.slug || product.id}"
    />
  );
}`;
};

let generated = 0;
let skipped = 0;
const errors = [];

catalog.forEach((product) => {
  try {
    const filename = product.brand.replace(/[^a-zA-Z0-9]/g, "") + ".tsx";
    const filepath = resolve(pagesDir, filename);

    // Skip if page already exists
    if (existsSync(filepath)) {
      skipped++;
      return;
    }

    const component = generatePageComponent(product);
    writeFileSync(filepath, component);
    generated++;
  } catch (e) {
    errors.push({ product: product.name, error: e.message });
  }
});

console.log(`\n✅ GENERATION COMPLETE`);
console.log(`─`.repeat(60));
console.log(`Generated: ${generated} new pages`);
console.log(`Skipped: ${skipped} existing pages`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log("\nErrors:");
  errors.forEach(e => console.log(`  - ${e.product}: ${e.error}`));
}

console.log(`\n✨ Product pages ready at: ${pagesDir}`);
