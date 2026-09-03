#!/usr/bin/env node
// Generates client/public/sitemap.xml from the canonical route registry.
//
// The sitemap is a build artifact, not a second source of truth. It advertises
// only canonical, currently indexable URLs. We deliberately omit <lastmod>,
// <priority> and <changefreq> unless/until a trustworthy significant-update
// timestamp exists in the content model; build/deploy time is not content time.
//
//   npm run gen:sitemap
//   node scripts/gen-sitemap.mjs --check

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";
const OUTPUT = resolve(ROOT, "client/public/sitemap.xml");
const CHECK = process.argv.includes("--check");

const { ROUTE_META } = await import(
  pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href
);
const { CANONICAL_COMPARE_PATHS } = await import(
  pathToFileURL(resolve(ROOT, "lib/compare-routes.js")).href
);
const { CANONICAL_MAP } = await import(
  pathToFileURL(resolve(ROOT, "shared/canonical-map.js")).href
);
const { isQuarantinedBlogPath } = await import(
  pathToFileURL(resolve(ROOT, "shared/content-quarantine.js")).href
);
const { isPublicReviewPath } = await import(
  pathToFileURL(resolve(ROOT, "shared/public-review.js")).href
);

const canonicalCompare = new Set(CANONICAL_COMPARE_PATHS);
const aliases = new Set(Object.keys(CANONICAL_MAP));

function excluded(path) {
  if (/^\/admin\//.test(path)) return true;
  if (path.startsWith("/compare/") && !canonicalCompare.has(path)) return true;
  if (aliases.has(path)) return true;
  if (isQuarantinedBlogPath(path)) return true;
  if (isPublicReviewPath(path)) return true;
  return false;
}

const paths = Object.keys(ROUTE_META)
  .filter((path) => !excluded(path))
  .sort((a, b) => a.localeCompare(b));

const canonicalTargets = new Map();
for (const path of paths) {
  const canonical = CANONICAL_MAP[path] ?? path;
  const prior = canonicalTargets.get(canonical);
  if (prior) {
    throw new Error(`Duplicate sitemap canonical target ${canonical}: ${prior} and ${path}`);
  }
  canonicalTargets.set(canonical, path);
}

const entries = paths
  .map((path) => `  <url>\n    <loc>${SITE}${path === "/" ? "/" : path}</loc>\n  </url>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERATED FILE — do not edit by hand. Run: npm run gen:sitemap -->
<!-- Canonical-only source: lib/route-meta.js + shared/canonical-map.js -->
<!-- lastmod intentionally omitted unless a trustworthy content timestamp exists -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

if (CHECK) {
  if (!existsSync(OUTPUT)) {
    console.error("gen:sitemap --check failed: client/public/sitemap.xml is missing");
    process.exit(1);
  }
  const current = readFileSync(OUTPUT, "utf-8");
  if (current !== xml) {
    console.error("gen:sitemap --check failed: sitemap.xml is stale; run npm run gen:sitemap");
    process.exit(1);
  }
  console.log(`gen:sitemap  OK — ${paths.length} canonical indexable URLs`);
  process.exit(0);
}

writeFileSync(OUTPUT, xml, "utf-8");
console.log(`gen:sitemap  wrote client/public/sitemap.xml — ${paths.length} canonical indexable URLs`);
