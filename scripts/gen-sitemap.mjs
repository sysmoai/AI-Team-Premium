#!/usr/bin/env node
// Generates client/public/sitemap.xml from ROUTE_META.
//
// The sitemap used to be hand-maintained, which meant every new page had to be
// remembered twice and product pages were simply missing. Deriving it from the
// same metadata the server uses means `npm run verify`'s "every sitemap URL
// resolves to metadata" check can never fail for a page we actually ship.
//
//   npm run gen:sitemap

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";

const { ROUTE_META } = await import(
  pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href
);

// Pages that exist but should not be advertised to crawlers.
const EXCLUDE = [/^\/admin\//];

// Higher priority for the pages that carry commercial intent; lower for legal
// boilerplate that never needs to rank.
function priorityFor(path) {
  if (path === "/") return "1.0";
  if (/^\/(privacy-policy|terms|refund-policy)$/.test(path)) return "0.3";
  if (path.startsWith("/blog/")) return "0.7";
  if (path === "/blog") return "0.8";
  if (path.startsWith("/services")) return "0.7";
  if (path.startsWith("/tools/")) return "0.9";
  if (/^\/(all-products|products|pricing|ai-subscriptions|ai-tools-vault)$/.test(path)) return "0.9";
  if (path.endsWith("-plans")) return "0.95";
  if (path.startsWith("/chatgpt/")) return "0.85";
  return "0.6";
}

function changefreqFor(path) {
  if (path.startsWith("/blog/")) return "monthly";
  if (/^\/(privacy-policy|terms|refund-policy|about)$/.test(path)) return "yearly";
  return "weekly";
}

const today = new Date().toISOString().slice(0, 10);

const paths = Object.keys(ROUTE_META)
  .filter((p) => !EXCLUDE.some((re) => re.test(p)))
  .sort((a, b) => {
    // Highest-priority pages first so the file reads top-down by importance.
    const d = Number(priorityFor(b)) - Number(priorityFor(a));
    return d !== 0 ? d : a.localeCompare(b);
  });

const entries = paths
  .map(
    (p) => `  <url>
    <loc>${SITE}${p === "/" ? "/" : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreqFor(p)}</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERATED FILE — do not edit by hand. Run: npm run gen:sitemap -->
<!-- Source: lib/route-meta.js (${paths.length} indexable routes) -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

writeFileSync(resolve(ROOT, "client/public/sitemap.xml"), xml, "utf-8");

const products = paths.filter((p) => p.startsWith("/tools/")).length;
console.log(
  `gen:sitemap  wrote client/public/sitemap.xml — ${paths.length} URLs (${products} product pages)`
);
