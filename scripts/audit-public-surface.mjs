#!/usr/bin/env node
// scripts/audit-public-surface.mjs — npm run audit:surface (after npm run build)
//
// Release gate added in Cycle 6. Everything a visitor or crawler can fetch is
// checked, not a sample of six pages:
//   1. every built JS/HTML/JSON file under dist/public (including lazy chunks
//      that no route renders — they are still downloadable);
//   2. the server-rendered HTML of EVERY known route (ROUTE_META keys + the
//      sitemap), rendered through the same renderPage() the Worker uses.
// It fails on: a Taka amount outside the documented allowlist, a JSON-LD Offer
// with no positive price or claiming InStock without a governed offer, a phone
// number that is not this site's, another storefront's name, a delivery/payment
// promise, Infinity/NaN/undefined in visible text.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { bundleViolations } from "./lib/public-surface-checks.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = resolve(ROOT, "dist/public");
if (!existsSync(resolve(PUB, "index.html"))) {
  console.error("audit:surface — dist/public/index.html missing; run `npm run build` first");
  process.exit(2);
}

const hold = JSON.parse(readFileSync(resolve(ROOT, "scripts/fixtures/blog-taka-hold.json"), "utf8")).items;
const HELD_TEXTS = hold.flatMap((h) => [h.text, JSON.stringify(h.text).slice(1, -1)]);
// Documented, non-offer Taka mentions (reviewed in C6):
const ALLOW = [
  "previously published price of ৳399 was withdrawn", // corrections log: a disclosure, not an offer
];
const AITP_NUMBER = "8801533262758";

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = resolve(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const strip = (t) => HELD_TEXTS.reduce((s, h) => s.split(h).join(""), t);

const problems = [];
// ---- 1. built files
const files = walk(PUB)
  .filter((p) => /\.(js|html|json|txt|xml)$/.test(p))
  .map((p) => [relative(PUB, p).replace(/\\/g, "/"), strip(readFileSync(p, "utf8"))]);
problems.push(...bundleViolations(files, ALLOW));
for (const [name, text] of files) {
  for (const m of text.matchAll(/(?:\+?880[\s-]?|wa\.me\/)(1[\d\s-]{9,12})/g)) {
    const d = ("880" + m[1]).replace(/\D/g, "");
    if (d.slice(0, 13) !== AITP_NUMBER) problems.push(`${name}: foreign phone number ${d.slice(0, 6)}…`);
  }
  if (/\bAI[P]S\b|AI\s*Premium\s*Shop|aipremiumshop/i.test(text)) problems.push(`${name}: another storefront's name`);
}

// ---- 2. SSR of every known route
const { renderPage } = await import(pathToFileURL(resolve(ROOT, "lib/render-page.js")).href);
const { ROUTE_META } = await import(pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href);
const template = readFileSync(resolve(PUB, "index.html"), "utf8");
const sitemap = existsSync(resolve(PUB, "sitemap.xml")) ? readFileSync(resolve(PUB, "sitemap.xml"), "utf8") : "";
const paths = new Set([
  ...Object.keys(ROUTE_META),
  ...[...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/"),
]);
let rendered = 0, ok200 = 0;
for (const path of paths) {
  const res = renderPage(path, template);
  rendered++;
  if (res.status === 200) ok200++;
  const body = strip(res.body);
  const where = `SSR ${path}`;
  problems.push(...bundleViolations([[where, body]], ALLOW));
  for (const m of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { problems.push(`${where}: unparsable JSON-LD`); continue; }
    const s = JSON.stringify(data);
    for (const o of s.matchAll(/"@type":"(?:Aggregate)?Offer"[^}]*/g)) {
      const price = o[0].match(/"(?:low)?[pP]rice":"?([\d.]+)/);
      if (!price || Number(price[1]) <= 0) problems.push(`${where}: Offer without a positive price`);
      problems.push(`${where}: Offer published while no product is governed-purchasable`);
    }
  }
  const visible = body.replace(/<script[\s\S]*?<\/script>/g, "");
  if (/>[^<]*\b(?:Infinity|NaN|undefined)\b[^<]*</.test(visible)) problems.push(`${where}: Infinity/NaN/undefined in visible text`);
  if (/৳\s?0\b|৳\s?∞/.test(visible)) problems.push(`${where}: placeholder price`);
}

// The second Offer message above is unconditional on purpose: today no record
// is purchasable, so ANY Offer is a leak. When the first SKU is approved,
// replace it with a check against decide() for that product.
const unique = [...new Set(problems)];
console.log(`audit:surface — ${files.length} built files, ${rendered} SSR routes (${ok200} × 200)`);
if (unique.length) {
  console.log(unique.slice(0, 60).join("\n"));
  console.log(`\n${unique.length} problem(s)`);
  process.exit(1);
}
console.log("✓ no price, Offer, foreign contact, promise or placeholder leaks");
