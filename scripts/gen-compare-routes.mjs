#!/usr/bin/env node
// Generates lib/compare-routes.js — SEO metadata for the /compare/:slug pages.
//
//   npm run gen:compare
//
// Two problems this fixes.
//
// 1. Every comparison page shared one DYNAMIC_PREFIXES record, so the server
//    shipped the same <title> for all of them and the page then replaced it
//    with a different, pair-specific one on mount. Identical titles across
//    comparison pages are the classic way to have none of them rank.
//
// 2. parseComparePair() accepts either order, so "chatgpt-vs-claude" and
//    "claude-vs-chatgpt" both render the same comparison at two URLs. Both
//    directions are generated here, but both point their canonical at one
//    preferred order, and only that one goes in the sitemap.
//
// Titles and descriptions must match what ComparisonDetail builds in
// Compare.tsx exactly — see the formula comment below.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";
const TOOLS_DIR = resolve(ROOT, "client/src/pages/tools");
const COMPARE_LIB = resolve(ROOT, "client/src/lib/tool-compare.ts");

// The tool data lives in .tsx modules that import React, so a plain node
// script cannot import them. These literals are simple and stable enough to
// read directly; every extraction below is asserted afterwards, so a format
// change fails the build loudly instead of silently emitting wrong metadata.
const decodeEscapes = (s) =>
  s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

const lib = readFileSync(COMPARE_LIB, "utf-8");

// NAMES: Record<slug, displayName>
const namesBlock = lib.match(/const NAMES: Record<string, string> = \{([\s\S]*?)\n\};/);
if (!namesBlock) throw new Error("could not locate NAMES in tool-compare.ts");
const NAMES = {};
for (const m of namesBlock[1].matchAll(/["']?([a-z0-9-]+)["']?\s*:\s*"([^"]+)"/g)) {
  NAMES[m[1]] = decodeEscapes(m[2]);
}

// POPULAR_PAIRS: [slug, slug][]
const pairsBlock = lib.match(/export const POPULAR_PAIRS[^=]*=\s*\[([\s\S]*?)\n\];/);
if (!pairsBlock) throw new Error("could not locate POPULAR_PAIRS in tool-compare.ts");
const PAIRS = [...pairsBlock[1].matchAll(/\[\s*"([a-z0-9-]+)"\s*,\s*"([a-z0-9-]+)"\s*\]/g)].map(
  (m) => [m[1], m[2]]
);

// priceLabel per tool, from each page's own TOOL_META export.
const PRICE = {};
for (const file of readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".tsx"))) {
  const src = readFileSync(resolve(TOOLS_DIR, file), "utf-8");
  const slug = src.match(/"slug":\s*"([^"]+)"/);
  const price = src.match(/"priceLabel":\s*"([^"]+)"/);
  if (slug && price) PRICE[slug[1]] = decodeEscapes(price[1]);
}

// ---------------------------------------------------------------- assertions
const problems = [];
if (PAIRS.length === 0) problems.push("no pairs parsed from POPULAR_PAIRS");
if (Object.keys(NAMES).length < 20)
  problems.push(`only ${Object.keys(NAMES).length} tool names parsed — expected 20+`);
for (const [a, b] of PAIRS) {
  for (const s of [a, b]) {
    if (!NAMES[s]) problems.push(`pair tool "${s}" has no entry in NAMES`);
    if (!PRICE[s]) problems.push(`pair tool "${s}" has no priceLabel in its TOOL_META`);
  }
}
if (problems.length) {
  console.error("gen:compare FAILED — extraction is out of date with the source:");
  for (const p of [...new Set(problems)]) console.error("  - " + p);
  process.exit(1);
}

// ------------------------------------------------------------------ generate
// Mirrors ComparisonDetail in client/src/pages/Compare.tsx:
//   title       `${a.name} vs ${b.name} in Bangladesh — Price, Features, Verdict`
//   description `Side-by-side comparison of ${a.name} (${a.priceFromLabel}) and ...`
// usePageMeta appends " | AI Team Premium" to the title, so it is added here too.
const titleFor = (a, b) =>
  `${NAMES[a]} vs ${NAMES[b]} in Bangladesh — Price, Features, Verdict | AI Team Premium`;

const descFor = (a, b) =>
  `Side-by-side comparison of ${NAMES[a]} (${PRICE[a]}) and ${NAMES[b]} (${PRICE[b]}). ` +
  `Specs, Bangla quality, best use cases and which to buy from AI Team Premium.`;

const records = [];
const canonicalPaths = [];

for (const [a, b] of PAIRS) {
  const preferred = `/compare/${a}-vs-${b}`;
  canonicalPaths.push(preferred);
  // Both orders resolve, so both get metadata — pointing at one canonical so
  // the duplicate consolidates instead of competing with itself.
  records.push({ path: preferred, title: titleFor(a, b), description: descFor(a, b), canonical: SITE + preferred });
  records.push({ path: `/compare/${b}-vs-${a}`, title: titleFor(b, a), description: descFor(b, a), canonical: SITE + preferred });
}

records.sort((x, y) => x.path.localeCompare(y.path));
canonicalPaths.sort();

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/lib/tool-compare.ts (POPULAR_PAIRS + NAMES) and the
// TOOL_META export of each client/src/pages/tools/*.tsx
// Regenerate: npm run gen:compare

export const COMPARE_ROUTE_META = {
${records
  .map(
    (r) =>
      `  "${r.path}": { title: "${esc(r.title)}", description: "${esc(
        r.description
      )}", canonical: "${r.canonical}" },`
  )
  .join("\n")}
};

// Only these go in the sitemap. The reverse-order URL of each pair renders the
// same comparison and canonicalises here, so advertising both would be asking
// crawlers to index the same page twice.
export const CANONICAL_COMPARE_PATHS = ${JSON.stringify(canonicalPaths, null, 2)};
`;

// --check: report whether the committed file still matches what the sources
// produce, without writing. Editing POPULAR_PAIRS or a tool's price without
// regenerating would otherwise ship metadata describing the old pairs.
const OUT = resolve(ROOT, "lib/compare-routes.js");
if (process.argv.includes("--check")) {
  let existing = null;
  try {
    existing = readFileSync(OUT, "utf-8");
  } catch {
    console.error("lib/compare-routes.js is missing — run: npm run gen:compare");
    process.exit(1);
  }
  if (existing !== out) {
    console.error("lib/compare-routes.js is stale — run: npm run gen:compare");
    process.exit(1);
  }
  process.exit(0);
}

writeFileSync(OUT, out, "utf-8");

console.log(
  `gen:compare  wrote lib/compare-routes.js — ${PAIRS.length} pairs, ${records.length} routes (${canonicalPaths.length} canonical)`
);
