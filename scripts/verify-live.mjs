#!/usr/bin/env node
// Post-deploy smoke test against production (Cloudflare Workers), staging, or a
// local `wrangler dev`.
//
// Expectations are computed from lib/render-page.js — the same code the Worker
// runs — so a route under evidence review or quarantine is checked for its
// review title and noindex, not the commercial title it would otherwise carry.
//
// Deliberately gentle: one request at a time, spaced out. A Cloudflare
// challenge page (403/503 with cf-mitigated: challenge) is reported as
// INCONCLUSIVE rather than a failure, so a green/red result can be trusted.
//
// Usage:
//   npm run verify:live                         production, representative sample
//   npm run verify:live -- --all                every sitemap URL
//   npm run verify:live -- --base <url> --all   staging / local (expects noindex)

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PROD = "https://www.aiteampremium.com";
const argBase = process.argv.indexOf("--base");
const BASE = (argBase > -1 ? process.argv[argBase + 1] : PROD).replace(/\/$/, "");
const IS_PROD = BASE === PROD;
// `wrangler dev` on localhost: _headers only marks *.workers.dev noindex, so
// the staging-noindex check applies to static files on real staging only.
const IS_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(BASE);
const SPACING_MS = IS_PROD ? 600 : 50;

const { renderPage, SECURITY_HEADERS } = await import(
  pathToFileURL(resolve(ROOT, "lib/render-page.js")).href
);

const checkAll = process.argv.includes("--all");

// A spread across every route shape: root, catalog, single-segment, nested,
// dynamic-prefix, review, quarantine, and paths that must 404.
const SAMPLE = [
  "/",
  "/all-products",
  "/pricing",
  "/tools/midjourney",
  "/chatgpt/plus-shared",
  "/services/brand-design",
  "/compare/claude-vs-chatgpt",
  "/about",
  "/contact",
  "/blog/chatgpt-plus-price-bangladesh-bkash-guide",
];
const MUST_404 = ["/this-page-does-not-exist-aitp", "/tools/", "/tools/no-such-tool-aitp", "/assets/does-not-exist.js", "/images/README.md"];

function sitemapPaths() {
  const file = resolve(ROOT, "dist/public/sitemap.xml");
  if (!existsSync(file)) return [];
  return [...readFileSync(file, "utf-8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(PROD, "") || "/"
  );
}

const paths = checkAll ? [...new Set([...SAMPLE, ...sitemapPaths()])] : SAMPLE;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const titleOf = (body) => decode((body.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1]);
const canonicalOf = (body) => (body.match(/<link\s+rel="canonical"\s+href="([^"]*)"/) || [, ""])[1];

let template = null;
try {
  template = readFileSync(resolve(ROOT, "dist/public/index.html"), "utf-8");
} catch {}

let pass = 0;
const failed = [];
const challenged = [];

function isChallenge(res) {
  return (res.status === 403 || res.status === 503) && res.headers.get("cf-mitigated") === "challenge";
}

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const body = await res.text();
  return { res, body };
}

console.log(`\nChecking ${paths.length} path(s) + ${MUST_404.length} 404 probe(s) against ${BASE}\n`);

for (const path of paths) {
  let res, body;
  try {
    ({ res, body } = await get(path));
  } catch (e) {
    failed.push(`${path} — network error: ${e.message}`);
    continue;
  }
  if (isChallenge(res)) {
    challenged.push(path);
    await sleep(SPACING_MS * 4);
    continue;
  }

  // "/" is served straight from static assets as the built index.html.
  const expected = path === "/" ? { status: 200, body: template } : renderPage(path, template);
  const robots = (res.headers.get("x-robots-tag") || "").toLowerCase();
  const problems = [];

  if (res.status !== expected.status) problems.push(`HTTP ${res.status}, expected ${expected.status}`);
  if (!body.includes('id="root"')) problems.push("no SPA mount point");
  if (!/\/assets\/index-[^"]+\.js/.test(body)) problems.push("no JS bundle reference");
  if (expected.body) {
    if (titleOf(body) !== titleOf(expected.body)) problems.push(`title is "${titleOf(body).slice(0, 60)}"`);
    if (canonicalOf(body) !== canonicalOf(expected.body)) problems.push(`canonical is "${canonicalOf(body)}"`);
    if (!canonicalOf(body).startsWith(PROD)) problems.push("canonical is not on the www host");
    const wantNoindex = /noindex/.test(expected.headers?.["X-Robots-Tag"] || "");
    if (wantNoindex && !/noindex/.test(robots)) problems.push("review/quarantine page is missing X-Robots-Tag noindex");
    if (IS_PROD && !wantNoindex && /noindex/.test(robots)) problems.push("indexable page is served noindex");
    const ld = body.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
    if (!wantNoindex && ld.length !== 1) problems.push(`${ld.length} JSON-LD graph(s), expected 1`);
  }
  if (!IS_PROD && !(IS_LOCAL && path === "/") && !/noindex/.test(robots)) problems.push("staging response is indexable");
  for (const h of Object.keys(SECURITY_HEADERS)) {
    if (!res.headers.get(h)) problems.push(`missing ${h}`);
  }

  if (problems.length) failed.push(`${path} — ${problems.join("; ")}`);
  else pass++;
  await sleep(SPACING_MS);
}

let notFoundOk = 0;
for (const path of MUST_404) {
  try {
    const { res } = await get(path);
    if (isChallenge(res)) challenged.push(path);
    else if (res.status === 404) notFoundOk++;
    else failed.push(`${path} — HTTP ${res.status}, expected 404`);
  } catch (e) {
    failed.push(`${path} — network error: ${e.message}`);
  }
  await sleep(SPACING_MS);
}

for (const [path, type] of [["/robots.txt", "text/plain"], ["/sitemap.xml", "xml"]]) {
  try {
    const { res, body } = await get(path);
    if (res.status !== 200 || !(res.headers.get("content-type") || "").includes(type))
      failed.push(`${path} — HTTP ${res.status} ${res.headers.get("content-type")}`);
    else if (path === "/robots.txt" && !body.includes(`Sitemap: ${PROD}/sitemap.xml`))
      failed.push("robots.txt does not point at the www sitemap");
  } catch (e) {
    failed.push(`${path} — network error: ${e.message}`);
  }
}

// The live bundle should match what the last local build produced, and its
// hashed assets must be long-cacheable.
let bundleState = "unknown";
try {
  const local = (template.match(/\/assets\/(index-[^"]+\.js)/) || [, null])[1];
  const live = ((await get("/")).body.match(/\/assets\/(index-[^"]+\.js)/) || [, null])[1];
  if (!local || !live) bundleState = "could not read bundle name";
  else if (local !== live) bundleState = `LOCAL ${local} != LIVE ${live} — deploy still in progress or failed`;
  else {
    const r = await fetch(`${BASE}/assets/${live}`);
    const cc = r.headers.get("cache-control") || "";
    bundleState = r.ok && cc.includes("immutable") ? `in sync (${live})` : `bundle HTTP ${r.status}, cache-control "${cc}"`;
    if (!r.ok) failed.push(`/assets/${live} — HTTP ${r.status}`);
  }
} catch (e) {
  bundleState = `check failed (${e.message})`;
}

// Production only: the bare domain must 301/308 to www, keeping path + query.
let apex = "skipped (not production)";
let apexInconclusive = false;
if (IS_PROD) {
  for (const probe of ["http://aiteampremium.com/pricing?ref=verify", "https://aiteampremium.com/pricing?ref=verify"]) {
    try {
      const r = await fetch(probe, { redirect: "manual" });
      const loc = r.headers.get("location") || "";
      const okLoc = loc === `${PROD}/pricing?ref=verify` || (probe.startsWith("http:") && loc === "https://aiteampremium.com/pricing?ref=verify");
      if (![301, 308].includes(r.status) || !okLoc) failed.push(`${probe} — ${r.status} → "${loc}"`);
    } catch {
      apexInconclusive = true;
    }
  }
  apex = apexInconclusive ? "not checkable from this network" : "checked";
  try {
    const r = await fetch(`${PROD}/`, { method: "HEAD" });
    const server = r.headers.get("server") || "";
    if (r.headers.get("x-vercel-id") || /vercel/i.test(server)) failed.push("production is still answered by Vercel");
    else if (!/cloudflare/i.test(server)) failed.push(`production Server header is "${server}", expected cloudflare`);
  } catch {}
}

console.log(`  routes OK      ${pass}/${paths.length - challenged.filter((p) => paths.includes(p)).length}`);
console.log(`  404 probes OK  ${notFoundOk}/${MUST_404.length}`);
console.log(`  apex redirect  ${apex}`);
console.log(`  live bundle    ${bundleState}`);

if (challenged.length) {
  console.log(
    `\n  INCONCLUSIVE: ${challenged.length} path(s) got a Cloudflare challenge, not tested:` +
      `\n    ${challenged.slice(0, 6).join(", ")}${challenged.length > 6 ? ", ..." : ""}`
  );
}

if (failed.length) {
  console.log(`\n  FAILURES:`);
  failed.forEach((f) => console.log(`    ${f}`));
  console.log("");
  process.exit(1);
}

const clean = challenged.length === 0 && !apexInconclusive && bundleState.startsWith("in sync");
console.log(clean ? "\n  Live site verified.\n" : "\n  No failures, but some checks were inconclusive (see above).\n");
process.exit(0);
