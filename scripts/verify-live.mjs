#!/usr/bin/env node
// Post-deploy smoke test against production.
//
// Deliberately gentle: a representative sample, one request at a time, spaced
// out. Vercel's automatic DDoS mitigation challenges bursts from a single IP,
// and a challenged request returns 403 with X-Vercel-Mitigated: challenge —
// which looks exactly like an outage but is not. This script reports that as
// INCONCLUSIVE rather than a failure, so a green/red result can be trusted.
//
// Usage:
//   npm run verify:live            check the live site
//   npm run verify:live -- --all   check every sitemap URL (slow, may be challenged)

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://www.aiteampremium.com";
const SPACING_MS = 1200;

const { ROUTE_META, lookupMeta } = await import(
  pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href
);

const checkAll = process.argv.includes("--all");

// A spread across every route shape: root, catalog, single-segment, nested,
// dynamic-prefix, and a path that must 404.
const SAMPLE = [
  "/",
  "/all-products",
  "/pricing",
  "/tools/midjourney",
  "/chatgpt/plus-shared",
  "/services/brand-design",
  "/compare/claude-vs-chatgpt",
  "/about",
];

const paths = checkAll
  ? [...new Set(Object.keys(ROUTE_META))]
  : SAMPLE;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pass = 0;
const failed = [];
const challenged = [];

console.log(`\nChecking ${paths.length} path(s) against ${BASE}\n`);

for (const path of paths) {
  const meta = lookupMeta(path);
  let res, body;
  try {
    res = await fetch(BASE + path, { redirect: "follow" });
    body = await res.text();
  } catch (e) {
    failed.push(`${path} — network error: ${e.message}`);
    await sleep(SPACING_MS);
    continue;
  }

  if (res.status === 403 && (res.headers.get("x-vercel-mitigated") || body.includes("Security Checkpoint"))) {
    challenged.push(path);
    await sleep(SPACING_MS * 2);
    continue;
  }

  const title = (body.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1]
    .replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const canonical = (body.match(/<link rel="canonical" href="([^"]*)"/) || [, ""])[1];

  if (res.status !== 200) failed.push(`${path} — HTTP ${res.status}`);
  else if (!body.includes('id="root"')) failed.push(`${path} — no SPA mount point`);
  else if (!/\/assets\/index-[^"]+\.js/.test(body)) failed.push(`${path} — no JS bundle reference`);
  else if (meta && title !== meta.title) failed.push(`${path} — title is "${title.slice(0, 50)}"`);
  else if (meta && canonical !== meta.canonical) failed.push(`${path} — canonical is "${canonical}"`);
  else pass++;

  await sleep(SPACING_MS);
}

// The bare domain must reach the canonical host over HTTPS.
let apex = "unknown";
try {
  const r = await fetch("https://aiteampremium.com/", { redirect: "follow" });
  apex = r.url.startsWith(BASE) ? "ok" : `lands on ${r.url}`;
} catch (e) {
  apex = `unreachable (${e.message})`;
}

// The live bundle should match what the last local build produced.
let bundleState = "unknown";
try {
  const localHtml = readFileSync(resolve(ROOT, "dist/public/index.html"), "utf-8");
  const local = (localHtml.match(/\/assets\/(index-[^"]+\.js)/) || [, null])[1];
  const liveHtml = await (await fetch(BASE + "/")).text();
  const live = (liveHtml.match(/\/assets\/(index-[^"]+\.js)/) || [, null])[1];
  if (!local || !live) bundleState = "could not read bundle name";
  else bundleState = local === live ? `in sync (${live})` : `LOCAL ${local} != LIVE ${live} — deploy still in progress or failed`;
} catch (e) {
  bundleState = `check failed (${e.message})`;
}

console.log(`  routes OK      ${pass}/${paths.length - challenged.length}`);
console.log(`  apex redirect  ${apex}`);
console.log(`  live bundle    ${bundleState}`);

if (challenged.length) {
  console.log(
    `\n  ${challenged.length} path(s) were rate-limit challenged by Vercel, not tested:` +
    `\n    ${challenged.slice(0, 6).join(", ")}${challenged.length > 6 ? ", ..." : ""}` +
    `\n  This is DDoS mitigation reacting to automated traffic, not a site fault.` +
    `\n  Wait a few minutes and re-run, or check those paths in a browser.`
  );
}

if (failed.length) {
  console.log(`\n  FAILURES:`);
  failed.forEach((f) => console.log(`    ${f}`));
  console.log("");
  process.exit(1);
}

const clean = challenged.length === 0 && apex === "ok" && bundleState.startsWith("in sync");
console.log(clean ? "\n  Live site verified.\n" : "\n  No failures, but some checks were inconclusive (see above).\n");
process.exit(0);
