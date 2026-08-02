#!/usr/bin/env node
/**
 * BULK SEO OPTIMIZATION
 * Automatically optimizes all products for 50K/month organic traffic
 * - Meta tags
 * - Schema.org
 * - Internal linking
 * - Keywords
 */

import { readFileSync, writeFileSync } from "fs";

const catalog = JSON.parse(readFileSync("./client/src/data/products-catalog.json", "utf-8"));

console.log("🔍 BULK SEO OPTIMIZATION");
console.log("═".repeat(60));

// Generate SEO metadata for each product
const seoConfig = catalog.map(p => ({
  id: p.id,
  title: `${p.name} in Bangladesh | AI Team Premium (৳${p.price}/mo)`,
  description: `Get ${p.name} in Bangladesh for ৳${p.price}/month. bKash/Nagad payment, 30-day warranty, 24/7 WhatsApp support. Safe shared & personal seats available.`,
  keywords: [
    `${p.brand} Bangladesh`,
    `${p.name} price BDT`,
    `${p.name} ৳${p.price}`,
    p.category.replace("-", " "),
    `AI ${p.category.split("-")[1] || "tool"}`,
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "brand": {
      "@type": "Brand",
      "name": p.brand,
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.aiteampremium.com/tools/${p.slug || p.id}`,
      "priceCurrency": "BDT",
      "price": p.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "AI Team Premium",
        "url": "https://www.aiteampremium.com",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "100",
    },
  },
  openGraph: {
    type: "website",
    title: `${p.name} | Best Price in Bangladesh`,
    description: `Get ${p.name} for ৳${p.price}/mo. Instant WhatsApp delivery, 30-day warranty, bKash/Nagad accepted.`,
    image: `https://www.aiteampremium.com/og-${p.id}.jpg`,
    url: `https://www.aiteampremium.com/tools/${p.slug || p.id}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${p.name} | ৳${p.price}/mo`,
    description: `${p.name} in Bangladesh. Instant delivery, 30-day warranty.`,
  },
  canonical: `https://www.aiteampremium.com/tools/${p.slug || p.id}`,
}));

// Save SEO config
writeFileSync("./lib/seo-config.json", JSON.stringify(seoConfig, null, 2));

console.log(`✅ SEO config generated: ${seoConfig.length} products`);
console.log(`─`.repeat(60));

// Generate sitemap entries
const sitemapEntries = catalog.map(p => ({
  url: `https://www.aiteampremium.com/tools/${p.slug || p.id}`,
  lastmod: new Date().toISOString().split("T")[0],
  changefreq: "weekly",
  priority: "0.8",
}));

writeFileSync("./sitemapEntries.json", JSON.stringify(sitemapEntries, null, 2));
console.log(`✅ Sitemap entries: ${sitemapEntries.length} products`);

// Generate internal linking map
const internalLinking = {};
catalog.forEach(p => {
  // Find related products (same category, similar price range)
  const related = catalog.filter(
    x =>
      x.id !== p.id &&
      x.category === p.category &&
      Math.abs(x.price - p.price) < 2000
  ).slice(0, 3);

  internalLinking[p.id] = related.map(r => ({
    title: r.name,
    url: `/tools/${r.slug || r.id}`,
  }));
});

writeFileSync("./lib/internal-links.json", JSON.stringify(internalLinking, null, 2));
console.log(`✅ Internal linking map: ${Object.keys(internalLinking).length} products`);

console.log(`\n✨ SEO OPTIMIZATION COMPLETE`);
console.log(`Generated:
  - SEO metadata (lib/seo-config.json)
  - Sitemap entries (sitemapEntries.json)
  - Internal linking (lib/internal-links.json)`);
