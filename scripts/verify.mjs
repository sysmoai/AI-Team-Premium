#!/usr/bin/env node
// Pre-push gate. Runs entirely offline and catches the classes of bug that have
// actually broken this site before:
//   - a page added to App.tsx with no SEO metadata (ships an accidental 404)
//   - a sitemap URL no route can serve (crawlers get a 404)
//   - a canonical pointing at the bare apex instead of www
//   - the serverless handler failing to load or mis-resolving a path
//   - a build output missing the SPA mount or bundle reference
//
// Usage: npm run verify

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CANONICAL_HOST = "https://www.aiteampremium.com";

let failures = 0;
let checks = 0;

function ok(msg) {
  checks++;
  console.log(`  [32mPASS[0m  ${msg}`);
}
function fail(msg, detail) {
  checks++;
  failures++;
  console.log(`  [31mFAIL[0m  ${msg}`);
  if (detail) String(detail).split("\n").forEach((l) => console.log(`          ${l}`));
}
function section(name) {
  console.log(`\n${name}`);
}

const { ROUTE_META, lookupMeta } = await import(
  pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href
);

// ---------------------------------------------------------------- routes
section("Route coverage");

const appTsx = readFileSync(resolve(ROOT, "client/src/App.tsx"), "utf-8");
const appRoutes = [...appTsx.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);

// A path with a :param is probed with a sample value, since metadata for those
// is matched by prefix rather than by exact key.
const sampleFor = (p) => p.replace(/:[A-Za-z0-9_]+/g, "sample-value");

const missingMeta = appRoutes.filter((p) => !lookupMeta(sampleFor(p)));
if (missingMeta.length === 0) {
  ok(`all ${appRoutes.length} routes declared in App.tsx have SEO metadata`);
} else {
  fail(
    `${missingMeta.length} route(s) in App.tsx have no metadata in lib/route-meta.js`,
    missingMeta.join("\n") + "\n-> add an entry to lib/route-meta.js (or a DYNAMIC_PREFIXES rule)"
  );
}

// ---------------------------------------------------------------- sitemap
section("Sitemap");

const sitemapPath = resolve(ROOT, "client/public/sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf-8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const wrongHost = locs.filter((u) => !u.startsWith(CANONICAL_HOST));
if (wrongHost.length === 0) ok(`all ${locs.length} sitemap URLs use ${CANONICAL_HOST}`);
else fail(`${wrongHost.length} sitemap URL(s) not on the canonical host`, wrongHost.slice(0, 8).join("\n"));

const unservable = locs
  .map((u) => u.replace(CANONICAL_HOST, "") || "/")
  .filter((p) => !lookupMeta(p));
if (unservable.length === 0) ok(`all ${locs.length} sitemap URLs resolve to metadata`);
else
  fail(
    `${unservable.length} sitemap URL(s) would 404`,
    [...new Set(unservable)].slice(0, 10).join("\n")
  );

// ---------------------------------------------------------------- host hygiene
section("Canonical host");

const hostSensitive = [
  "client/public/robots.txt",
  "client/index.html",
  "client/src/hooks/use-page-meta.ts",
  "client/src/components/seo/JsonLd.tsx",
  "client/src/components/OrganizationSchema.tsx",
];
const apexLeaks = [];
for (const rel of hostSensitive) {
  const f = resolve(ROOT, rel);
  if (!existsSync(f)) continue;
  const body = readFileSync(f, "utf-8");
  if (/https:\/\/(?!www\.)aiteampremium\.com/.test(body)) apexLeaks.push(rel);
}
if (apexLeaks.length === 0) ok("no bare-apex URLs in host-sensitive files");
else
  fail(
    "bare-apex URLs found (React will overwrite the server canonical with these)",
    apexLeaks.join("\n")
  );

// ---------------------------------------------------------------- build output
section("Build output");

const indexPath = resolve(ROOT, "dist/public/index.html");
if (!existsSync(indexPath)) {
  fail("dist/public/index.html missing", "run: npm run build");
} else {
  const html = readFileSync(indexPath, "utf-8");
  if (html.includes('id="root"')) ok("built index.html has the SPA mount point");
  else fail("built index.html has no #root — the app cannot mount");

  if (/\/assets\/index-[^"]+\.js/.test(html)) ok("built index.html references a JS bundle");
  else fail("built index.html references no JS bundle");

  if (/<link\s+rel="canonical"/.test(html)) ok("built index.html has a canonical tag to rewrite");
  else fail("built index.html has no canonical tag", "the server can only rewrite a tag that exists");
}

// ---------------------------------------------------------------- handler
section("Serverless handler");

let handler;
try {
  handler = (await import(pathToFileURL(resolve(ROOT, "api/index.js")).href)).default;
  ok("api/index.js loads as ESM");
} catch (e) {
  fail("api/index.js failed to load", e.message + "\n-> package.json sets \"type\":\"module\"; this file must use import/export");
}

if (handler) {
  const call = (url) => {
    const res = {
      _s: 200,
      _h: {},
      _b: "",
      setHeader(k, v) { this._h[k.toLowerCase()] = v; return this; },
      status(c) { this._s = c; return this; },
      send(b) { this._b = b; return this; },
    };
    handler({ url, headers: {} }, res);
    return res;
  };

  const cases = [
    ["/api/", 200, ROUTE_META["/"].title],
    ["/api/all-products", 200, ROUTE_META["/all-products"].title],
    ["/api/tools/midjourney", 200, ROUTE_META["/tools/midjourney"].title],
    ["/api/compare/claude-vs-chatgpt", 200, null],
    ["/api/no-such-page", 404, null],
  ];
  let handlerBad = 0;
  for (const [url, expectStatus, expectTitle] of cases) {
    let r;
    try {
      r = call(url);
    } catch (e) {
      fail(`handler threw on ${url}`, e.message);
      handlerBad++;
      continue;
    }
    if (r._s !== expectStatus) {
      fail(`${url} returned ${r._s}, expected ${expectStatus}`);
      handlerBad++;
      continue;
    }
    if (expectTitle) {
      const got = (r._b.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1];
      const want = expectTitle.replace(/&/g, "&amp;");
      if (got !== want) {
        fail(`${url} injected the wrong title`, `got:  ${got}\nwant: ${want}`);
        handlerBad++;
      }
    }
  }
  if (handlerBad === 0) ok(`handler answers ${cases.length} representative paths correctly`);

  // A crafted path must not break out of the canonical href attribute.
  const xss = call('/api/"><script>alert(1)</script>');
  if (xss._b.includes("<script>alert(1)</script>")) fail("handler does not escape the requested path (XSS)");
  else ok("handler escapes attacker-controlled paths");

  // An asset that is not in the build must 404, not return the HTML shell.
  const asset = call("/api/assets/does-not-exist.js");
  if ((asset._h["content-type"] || "").startsWith("text/html"))
    fail("missing assets return HTML", "browsers report a confusing MIME error instead of a clean 404");
  else ok("missing assets return a non-HTML 404");
}

// ---------------------------------------------------------------- summary
console.log(
  failures === 0
    ? `\n[32m${checks}/${checks} checks passed — safe to push.[0m\n`
    : `\n[31m${failures} of ${checks} checks FAILED — fix before pushing.[0m\n`
);
process.exit(failures === 0 ? 0 : 1);
