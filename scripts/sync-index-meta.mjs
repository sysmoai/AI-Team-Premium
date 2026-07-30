#!/usr/bin/env node
// Copies ROUTE_META["/"] into client/index.html's static <title>, description,
// og:* and twitter:* tags.
//
//   npm run gen:index-meta
//
// Why this exists: vercel.json rewrites /(.*) to /api, but Vercel serves a
// matching static file first — and dist/public/index.html matches "/". So the
// homepage never reaches the metadata injector in api/index.js the way every
// other route does. Whatever is baked into index.html *is* the homepage's
// metadata, permanently.
//
// That went unnoticed because ROUTE_META["/"] exists and looks authoritative.
// It is not: it was serving "৳349+/mo" from index.html while ROUTE_META said
// ৳190. Rather than delete the "/" entry (the handler still uses it for
// non-static requests), the two are kept identical by generation, and
// `npm run verify` fails if they drift.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = resolve(ROOT, "client/index.html");

const { ROUTE_META } = await import(
  pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href
);

const home = ROUTE_META["/"];
if (!home) throw new Error('ROUTE_META has no "/" entry');

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const title = esc(home.title);
const desc = esc(home.description);

// Each entry is [regex, replacement]. Anchored on the attribute that identifies
// the tag so reordering the head cannot make one silently stop matching.
const EDITS = [
  [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
  [
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${desc}" />`,
  ],
  [
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${title}" />`,
  ],
  [
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${desc}" />`,
  ],
  [
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`,
  ],
  [
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${desc}" />`,
  ],
];

// The homepage is served straight off the CDN and never reaches api/index.js,
// so the JSON-LD the handler injects for every other route has to be baked in
// here instead. Wrapped in markers so re-running replaces it rather than
// stacking a second graph on each run.
const { jsonLdFor } = await import(
  pathToFileURL(resolve(ROOT, "lib/structured-data.js")).href
);
const OPEN = "<!-- ld+json:home:start -->";
const CLOSE = "<!-- ld+json:home:end -->";
const graph = JSON.stringify(jsonLdFor("/", home)).replace(/<\//g, "<\\/");
const ldBlock = `${OPEN}\n    <script type="application/ld+json">${graph}</script>\n    ${CLOSE}`;

let html = readFileSync(INDEX, "utf-8");

// The markers contain "+" (in "ld+json"), which is a regex quantifier — an
// unescaped marker never matches, so each run appended another graph instead of
// replacing the previous one.
const rx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const existing = new RegExp(`${rx(OPEN)}[\\s\\S]*?${rx(CLOSE)}`);
html = existing.test(html)
  ? html.replace(existing, ldBlock)
  : html.replace(/<\/head>/i, `    ${ldBlock}\n  </head>`);

const missing = [];
for (const [re, to] of EDITS) {
  if (!re.test(html)) {
    missing.push(re.source.slice(0, 52));
    continue;
  }
  html = html.replace(re, to);
}

if (missing.length) {
  console.error("gen:index-meta  tag(s) not found in client/index.html:");
  for (const m of missing) console.error(`  ${m}`);
  process.exit(1);
}

// Written LF-only: the freshness check compares bytes, and a CRLF checkout on
// Windows would otherwise report drift that is not there. Same reason the other
// generated files are pinned in .gitattributes.
writeFileSync(INDEX, html.replace(/\r\n/g, "\n"), "utf-8");

console.log(`gen:index-meta  client/index.html now matches ROUTE_META["/"]`);
console.log(`  title: ${home.title}`);
