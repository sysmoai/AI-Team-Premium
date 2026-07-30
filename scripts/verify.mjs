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

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Recursive file list for the whole-tree checks below. Skips node_modules and
// dotfiles; a path that is itself a file yields just that file, so a check can
// pass either a directory or a single path.
function walkFiles(p, ext, out = []) {
  if (!existsSync(p)) return out;
  if (statSync(p).isDirectory()) {
    for (const f of readdirSync(p)) {
      if (f === "node_modules" || f.startsWith(".")) continue;
      walkFiles(resolve(p, f), ext, out);
    }
  } else if (ext.test(p)) out.push(p);
  return out;
}

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

// ---------------------------------------------------------------- content
section("Product catalog");

const productsPath = resolve(ROOT, "client/src/data/products-catalog.json");
let products = null;
try {
  products = JSON.parse(readFileSync(productsPath, "utf-8"));
  if (!Array.isArray(products)) throw new Error("top level is not an array");
  ok(`products-catalog.json parses (${products.length} products)`);
} catch (e) {
  fail("products-catalog.json is not valid", e.message);
}

if (products) {
  // Fields AllProducts.tsx reads. `badge` is genuinely optional.
  const REQUIRED = [
    "id", "name", "brand", "brandColor", "category", "price",
    "tier", "description", "capabilities", "deliverySLA", "whatsappMsg",
  ];

  const problems = [];
  const seenId = new Map();
  // NOTE: `slug` is deliberately shared across tiers of the same brand — all five
  // Claude products use "claude-pro-bangladesh" so they resolve to one landing
  // page. Only `id` has to be unique; it is the React key and the real handle.

  products.forEach((p, i) => {
    const label = p && (p.name || p.id) ? `${p.name || p.id}` : `product #${i}`;
    if (!p || typeof p !== "object") {
      problems.push(`${label}: not an object`);
      return;
    }
    for (const f of REQUIRED) {
      const v = p[f];
      if (v === undefined || v === null || v === "") problems.push(`${label}: missing "${f}"`);
    }
    if (p.capabilities !== undefined && !Array.isArray(p.capabilities))
      problems.push(`${label}: "capabilities" must be an array`);
    if (p.id !== undefined) {
      if (seenId.has(p.id)) problems.push(`duplicate id "${p.id}" (also on ${seenId.get(p.id)})`);
      else seenId.set(p.id, label);
    }
    // A WhatsApp message is how an order actually reaches you.
    if (typeof p.whatsappMsg === "string" && p.whatsappMsg.trim().length < 5)
      problems.push(`${label}: "whatsappMsg" looks empty — orders would arrive blank`);
  });

  if (problems.length === 0) ok(`all ${products.length} products have the fields the catalog renders`);
  else
    fail(
      `${problems.length} product problem(s) — these render blank or crash the catalog`,
      problems.slice(0, 12).join("\n") + (problems.length > 12 ? `\n... and ${problems.length - 12} more` : "")
    );

  // The shipped catalog is generated from an internal export that contains a
  // different storefront's name, invented customer counts and invented review
  // scores. Nothing may leak through, whatever the generator did.
  const serialized = JSON.stringify(products);
  const forbidden = [
    [/AI\s*Premium\s*Shop/gi, "another storefront's name"],
    [/\bAIPS\b/gi, "another storefront's abbreviation"],
    [/aipremiumshop/gi, "another storefront's domain"],
    [/\b\d[\d,]*\+?\s*(trusted\s+)?customers?\b/gi, "an unverified customer count"],
    [/"reviewCount"/gi, "an invented review count"],
    [/"rating"\s*:/gi, "an invented star rating"],
  ];
  const leaks = forbidden
    .map(([re, what]) => { re.lastIndex = 0; return [what, (serialized.match(re) || []).length]; })
    .filter(([, n]) => n > 0);

  // A tier flagged priceOnRequest must never render a published number. These
  // exist because the plan cannot clear its cost floor at its seat cap, so any
  // published price commits to a guaranteed loss on every sale.
  const onRequest = products.filter((p) => p.priceOnRequest);
  if (onRequest.length) {
    const named = onRequest.map((p) => `${p.name} (internal ref ${p.price})`).join(", ");
    ok(`${onRequest.length} tier(s) marked price-on-request: ${named}`);
  }

  if (leaks.length === 0) ok("shipped catalog carries no foreign brand, customer count or review score");
  else
    fail(
      "the shipped catalog contains content that must not be published",
      leaks.map(([what, n]) => `${n} x ${what}`).join("\n") + "\n-> re-run: npm run build:catalog"
    );

  // A description that states its own price goes stale the moment the price
  // changes without the copy being touched — found live on Google AI Pro and
  // Replit Core, both still advertising "SPECIAL — ৳500" after being repriced
  // to ৳3,390. Scoped to an explicit price statement ("SPECIAL — ৳X", "at
  // ৳X", "only ৳X"), not any ৳ figure in the copy — bundle descriptions
  // legitimately quote unrelated amounts ("Save ৳650", "৳800/mo equivalent").
  const PRICE_STATEMENT = /\b(?:special|only|at|just)\s*[—-]?\s*৳\s*([\d,]+)/gi;
  const staleQuote = products.filter((p) => {
    if (typeof p.description !== "string") return false;
    const stated = [...p.description.matchAll(PRICE_STATEMENT)].map((m) => Number(m[1].replace(/,/g, "")));
    return stated.some((q) => q !== p.price);
  });
  if (staleQuote.length === 0) ok("no product description states a price other than its own");
  else
    fail(
      `${staleQuote.length} description(s) state a price that doesn't match the product's price`,
      staleQuote.map((p) => `${p.name}: sells at ${p.price}, description says otherwise — "${p.description.slice(0, 70)}"`).join("\n")
    );
}

// client/index.html is static, so a catalog-size claim baked into its meta tags
// cannot interpolate the real number the way route-meta.js does. It sat at "80
// premium AI subscriptions" while the catalog held 102 — a claim the site could
// not stand behind. This fails the build rather than letting it rot again.
section("Catalog count claims");

const indexHtml = readFileSync(resolve(ROOT, "client/index.html"), "utf-8");
const { TOOL_COUNT } = await import(
  pathToFileURL(resolve(ROOT, "lib/product-routes.js")).href
);
const claimed = [...indexHtml.matchAll(/and (\d+) premium AI tools/g)].map((m) => Number(m[1]));

if (claimed.length === 0) {
  fail(
    "client/index.html has no recognisable catalog-count claim",
    'expected copy matching "and <N> premium AI tools" — update this check if the wording changed'
  );
} else if (claimed.every((n) => n === TOOL_COUNT)) {
  ok(`client/index.html claims ${TOOL_COUNT} tools in ${claimed.length} tag(s), matching the catalog`);
} else {
  fail(
    `client/index.html claims ${[...new Set(claimed)].join("/")} tools but the catalog has ${TOOL_COUNT}`,
    "-> update the meta description/og/twitter copy in client/index.html"
  );
}

// The catalog is generated. If the source changed and nobody regenerated, the
// site would quietly ship stale products.
section("Catalog freshness");
try {
  const { execFileSync } = await import("node:child_process");
  execFileSync(process.execPath, [resolve(ROOT, "scripts/build-catalog.mjs"), "--check"], {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  ok("products-catalog.json is in sync with its source");
} catch (e) {
  const detail = (e.stderr || e.message || "").toString().trim();
  fail("products-catalog.json does not match its source", detail);
}

// Comparison metadata is generated from POPULAR_PAIRS and each tool's
// TOOL_META. Editing either without regenerating would ship titles describing
// pairs or prices that no longer exist.
try {
  const { execFileSync } = await import("node:child_process");
  execFileSync(process.execPath, [resolve(ROOT, "scripts/gen-compare-routes.mjs"), "--check"], {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  ok("compare-routes.js is in sync with its sources");
} catch (e) {
  const detail = (e.stderr || e.message || "").toString().trim();
  fail("compare-routes.js does not match its sources", detail);
}

// Blog metadata is generated from blog-posts.ts. A new post added without
// regenerating would ship with the generic "/blog/" prefix title instead of
// its own — the same bug already fixed once for products and comparisons.
try {
  const { execFileSync } = await import("node:child_process");
  execFileSync(process.execPath, [resolve(ROOT, "scripts/gen-blog-routes.mjs"), "--check"], {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  ok("blog-routes.js is in sync with its source");
} catch (e) {
  const detail = (e.stderr || e.message || "").toString().trim();
  fail("blog-routes.js does not match its source", detail);
}

// Prefilled WhatsApp/Messenger templates used to hardcode a price. Because they
// live outside the catalog, nothing kept them in sync — Google AI Pro was
// repriced to ৳3,390 while its template still quoted ৳449, so every customer
// who tapped "Order on WhatsApp" sent us a message quoting a price 7.6x below
// the real one. Templates now name the tier and quote no price; the page the
// customer clicked from already shows the current figure.
section("Order templates");

// Checks every file that holds prefilled order copy, not just config.ts —
// whatsapp.ts carried the same stale ৳449 Google AI Pro quote and was missed
// when only config.ts was checked.
const TEMPLATE_SOURCES = ["client/src/lib/config.ts", "client/src/lib/whatsapp.ts"];
const pricedTemplates = [];
for (const rel of TEMPLATE_SOURCES) {
  const src = readFileSync(resolve(ROOT, rel), "utf-8");
  for (const m of src.matchAll(/"([^"\n]*৳[^"\n]*)"/g)) {
    pricedTemplates.push(`${rel}: ${m[1]}`);
  }
}
if (pricedTemplates.length === 0) {
  ok(`no order template hardcodes a price (${TEMPLATE_SOURCES.length} files checked)`);
} else {
  fail(
    `${pricedTemplates.length} order template(s) hardcode a price and will drift from the catalog`,
    pricedTemplates.join("\n") +
      "\n-> name the plan/tier instead; the page already shows the live price"
  );
}

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

// ---------------------------------------------------------------- brand hygiene
section("Brand and claims");

// Two different wrong acronyms shipped live in <title> and <meta description>:
// "AIPT — AI Premium Tools" across 68 route entries and a bare "AITP" in page
// copy. The rule is "AI Team Premium" in anything a visitor reads; AITP stays
// internal, which is why audit-engine.ts is exempt rather than renamed.
const brandPublic = [
  "client/src", "lib", "data", "api", "server/seo.ts", "client/index.html",
];
const brandExempt = new Set(["server/audit-engine.ts"]);
const acronymHits = [];
for (const rel of brandPublic) {
  const p = resolve(ROOT, rel);
  if (!existsSync(p)) continue;
  for (const f of walkFiles(p, /\.(ts|tsx|js|jsx|mjs|json|html)$/)) {
    const r = relative(ROOT, f).replace(/\\/g, "/");
    if (brandExempt.has(r)) continue;
    const body = readFileSync(f, "utf-8");
    const n = (body.match(/\b(AIPT|AITP)\b/g) || []).length;
    if (n) acronymHits.push(`${r} (${n})`);
  }
}
if (acronymHits.length === 0) ok("no public brand acronym in visitor-facing text");
else fail("public brand acronym found — use \"AI Team Premium\"", acronymHits.join("\n"));

// Hand-written metadata must quote prices through PRICE_ANCHORS, never as a
// literal. Every literal that was in this file had drifted from the catalog.
const rmBody = readFileSync(resolve(ROOT, "lib/route-meta.js"), "utf-8");
const rmLiterals = [];
rmBody.split(/\r?\n/).forEach((line, i) => {
  if (!/^\s*"\//.test(line)) return;            // route entries only
  const m = line.match(/৳[0-9][0-9,]*/g);
  if (m) rmLiterals.push(`line ${i + 1}: ${[...new Set(m)].join(", ")}`);
});
if (rmLiterals.length === 0) ok("route metadata quotes no hardcoded price");
else
  fail(
    "hardcoded price in route-meta.js — use PRICE_ANCHORS so it tracks the catalog",
    rmLiterals.join("\n")
  );

// TOOL_META on the editorial tool pages is read by /compare/:slug, so a wrong
// number there is quoted on the comparison pages too. 20 of 25 disagreed with
// the catalog — Adobe CC advertised ৳499 against a ৳10,464 floor, Microsoft 365
// Copilot ৳899 against ৳7,776. Every page LOW undercharges each order taken from
// it; every page HIGH makes the same product look dearer on one of our own URLs.
{
  const { CANONICAL_MAP } = await import(
    pathToFileURL(resolve(ROOT, "shared/canonical-map.js")).href
  );
  const bySlug = new Map();
  for (const p of products) {
    if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
    bySlug.get(p.slug).push(p);
  }
  const toolsDir = resolve(ROOT, "client/src/pages/tools");
  const drift = [];
  for (const f of readdirSync(toolsDir).filter((x) => x.endsWith(".tsx"))) {
    const src = readFileSync(resolve(toolsDir, f), "utf-8");
    const slug = src.match(/"slug":\s*"([^"]+)"/)?.[1];
    if (!slug) continue;
    const target = CANONICAL_MAP[`/tools/${slug}`];
    if (!target) continue;                       // no catalog counterpart
    const family = bySlug.get(target.replace("/tools/", "")) ?? [];
    // priceOnRequest tiers carry an internal reference price that must not ship.
    const pub = family.filter((p) => p.price > 0 && !p.priceOnRequest).map((p) => p.price);
    const want = pub.length ? Math.min(...pub) : 0;
    const got = Number(src.match(/"priceBdt":\s*(\d+)/)?.[1] ?? -1);
    if (got !== want) drift.push(`${f}: TOOL_META ${got} vs catalog ${want || "on request"}`);
  }
  if (drift.length === 0)
    ok("tool page TOOL_META prices match the catalog");
  else
    fail("tool page price drifted from the catalog — run npm run gen:tool-prices", drift.join("\n"));
}

// 98 product URLs were being submitted for ~66 products, so for 21 products two
// or three of our own pages competed for the same query. They are consolidated
// by rel=canonical rather than redirects, which means the canonical the server
// sends and the one the client sets on hydration must be identical — if they
// disagree, the page tells a crawler two different things.
{
  const { CANONICAL_MAP } = await import(
    pathToFileURL(resolve(ROOT, "shared/canonical-map.js")).href
  );
  const sitemap = readFileSync(resolve(ROOT, "client/public/sitemap.xml"), "utf-8");
  const bad = [];
  for (const [from, to] of Object.entries(CANONICAL_MAP)) {
    const meta = lookupMeta(from);
    if (!meta) { bad.push(`${from}: no route metadata`); continue; }
    const want = `https://www.aiteampremium.com${to}`;
    if (meta.canonical !== want) bad.push(`${from}\n    server: ${meta.canonical}\n    want:   ${want}`);
    // The canonical target must itself be a real, indexable URL.
    if (!sitemap.includes(`<loc>${want}`)) bad.push(`${from} -> ${to} is not in sitemap.xml`);
    // A canonical must not point at a page that itself points elsewhere.
    if (CANONICAL_MAP[to]) bad.push(`${from} -> ${to}, which is itself canonicalised (chain)`);
  }
  if (bad.length === 0)
    ok(`${Object.keys(CANONICAL_MAP).length} duplicate URLs canonicalised to an indexable target`);
  else fail("canonical map is inconsistent", bad.join("\n"));
}

// The homepage does NOT go through api/index.js: vercel.json rewrites /(.*) to
// /api, but Vercel serves a matching static file first, and dist/public/index.html
// matches "/". So index.html's baked-in tags *are* the homepage's metadata, and
// they sat at "৳349+/mo" while ROUTE_META["/"] said ৳190 — nothing compared them.
{
  const idx = readFileSync(resolve(ROOT, "client/index.html"), "utf-8");
  const home = ROUTE_META["/"];
  const unesc = (s) =>
    s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const grab = (re) => {
    const m = idx.match(re);
    return m ? unesc(m[1]) : null;
  };
  const actual = {
    title: grab(/<title>([\s\S]*?)<\/title>/),
    description: grab(/<meta name="description" content="([^"]*)"/),
    "og:title": grab(/<meta property="og:title" content="([^"]*)"/),
    "og:description": grab(/<meta property="og:description" content="([^"]*)"/),
    "twitter:title": grab(/<meta name="twitter:title" content="([^"]*)"/),
    "twitter:description": grab(/<meta name="twitter:description" content="([^"]*)"/),
  };
  const want = {
    title: home.title,
    description: home.description,
    "og:title": home.title,
    "og:description": home.description,
    "twitter:title": home.title,
    "twitter:description": home.description,
  };
  const drift = Object.entries(want)
    .filter(([k, v]) => actual[k] !== v)
    .map(([k, v]) => `${k}\n    index.html: ${actual[k]}\n    ROUTE_META:  ${v}`);
  if (drift.length === 0)
    ok('client/index.html matches ROUTE_META["/"] (homepage bypasses the injector)');
  else
    fail(
      'client/index.html has drifted from ROUTE_META["/"] — run npm run gen:index-meta',
      drift.join("\n")
    );
}

// The Vault is not a catalog entry, so its price lives in lib/bundle-prices.js.
// Its page must agree with that file or the metadata and the page contradict.
{
  const { BUNDLE_PRICES } = await import(
    pathToFileURL(resolve(ROOT, "lib/bundle-prices.js")).href
  );
  const vaultPage = resolve(ROOT, "client/src/pages/AIToolsVault.tsx");
  if (!existsSync(vaultPage)) ok("no Vault page to cross-check");
  else {
    // Comments are stripped first: a comment recording what a price used to be
    // is worth keeping, and scanning it would flag the very number it explains.
    const body = readFileSync(vaultPage, "utf-8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");
    // Every price the page quotes must be one we can point at: the bundle's own
    // price, a real catalog price, or a total this file declares as derived from
    // catalog prices. Anything else is a number someone typed and nothing checks.
    const allowed = new Set([
      BUNDLE_PRICES.vault,
      ...BUNDLE_PRICES.vaultDerivedTotals,
      ...products.filter((p) => p.price > 0).map((p) => p.price),
    ]);
    const wrong = [...new Set((body.match(/৳([0-9][0-9,]*)/g) || []))]
      .map((s) => Number(s.replace(/[৳,]/g, "")))
      .filter((n) => !allowed.has(n));
    if (wrong.length === 0) ok(`Vault page prices all trace to the catalog or bundle-prices`);
    else
      fail(
        "Vault page quotes a price that matches no catalog entry",
        wrong.map((n) => `৳${n.toLocaleString("en-US")}`).join(", ")
      );
  }
}

// A tax representation is a claim we would have to defend; it shipped for months
// as "No extra VAT" with nothing recording who verified it.
const vatHits = [];
for (const rel of ["lib", "client/src", "data"]) {
  const p = resolve(ROOT, rel);
  if (!existsSync(p)) continue;
  for (const f of walkFiles(p, /\.(ts|tsx|js|mjs|json)$/)) {
    if (/no extra vat|vat[- ]free|no vat/i.test(readFileSync(f, "utf-8")))
      vatHits.push(relative(ROOT, f).replace(/\\/g, "/"));
  }
}
if (vatHits.length === 0) ok("no unevidenced VAT claim in shipped copy");
else fail("VAT claim found — needs an evidence record before it can ship", vatHits.join("\n"));

// ---------------------------------------------------------------- structured data
section("Structured data");

// Pages ship as an empty SPA shell, so anything React injects after hydration is
// invisible to a crawler that does not run JavaScript — which is most of the AI
// answer-engine bots robots.txt explicitly welcomes. The server has to emit the
// graph itself.
{
  const { jsonLdFor } = await import(
    pathToFileURL(resolve(ROOT, "lib/structured-data.js")).href
  );
  const samples = ["/", "/all-products", "/tools/canva-pro-bangladesh", "/pricing", "/blog"];
  const bad = [];
  for (const p of samples) {
    const meta = lookupMeta(p);
    if (!meta) { bad.push(`${p}: no route metadata`); continue; }
    const g = jsonLdFor(p, meta)["@graph"] ?? [];
    const types = g.map((n) => n["@type"]);
    if (!types.includes("Organization")) bad.push(`${p}: no Organization`);
    if (!types.includes("WebSite")) bad.push(`${p}: no WebSite`);
    // Must be serialisable and must not be able to close the script tag early.
    const s = JSON.stringify(g);
    if (s.includes("</script")) bad.push(`${p}: payload can close its own <script>`);
  }
  // A product page must describe the product, or the markup says nothing useful.
  const prodTypes = (jsonLdFor("/tools/canva-pro-bangladesh", lookupMeta("/tools/canva-pro-bangladesh"))["@graph"] ?? [])
    .map((n) => n["@type"]);
  if (!prodTypes.includes("Product")) bad.push("/tools/canva-pro-bangladesh: no Product node");
  if (bad.length === 0) ok(`server emits JSON-LD for ${samples.length} representative routes`);
  else fail("server JSON-LD is incomplete", bad.join("\n"));
}

// lib/structured-data.js is generated, so its offer prices can go stale against
// the catalog exactly the way the route metadata did. A wrong price in schema is
// worse than one in prose: it is what a rich result quotes.
{
  const { PRODUCT_SCHEMA } = await import(
    pathToFileURL(resolve(ROOT, "lib/structured-data.js")).href
  );
  const byFamily = new Map();
  for (const p of products) {
    if (!byFamily.has(p.slug)) byFamily.set(p.slug, []);
    byFamily.get(p.slug).push(p);
  }
  const stale = [];
  for (const [path, node] of Object.entries(PRODUCT_SCHEMA)) {
    const tiers = byFamily.get(path.replace("/tools/", "")) ?? [];
    const sellable = tiers.filter((t) => t.price > 0 && !t.priceOnRequest).map((t) => t.price);
    const o = node.offers;
    if (!sellable.length) {
      if (o) stale.push(`${path}: has offers but every tier is price-on-request`);
      continue;
    }
    if (!o) { stale.push(`${path}: sellable tiers but no offers`); continue; }
    const lo = String(Math.min(...sellable));
    const hi = String(Math.max(...sellable));
    if (o["@type"] === "AggregateOffer") {
      if (o.lowPrice !== lo || o.highPrice !== hi)
        stale.push(`${path}: offers ${o.lowPrice}-${o.highPrice}, catalog ${lo}-${hi}`);
    } else if (o.price !== lo) {
      stale.push(`${path}: offer ${o.price}, catalog ${lo}`);
    }
  }
  if (stale.length === 0) ok(`${Object.keys(PRODUCT_SCHEMA).length} Product schemas match catalog pricing`);
  else fail("structured data prices are stale — run npm run gen:schema", stale.join("\n"));
}

// The homepage never reaches api/index.js, so its graph is baked into
// index.html instead — and exactly once, or the page ships two graphs.
{
  const idx = readFileSync(resolve(ROOT, "client/index.html"), "utf-8");
  const n = (idx.match(/application\/ld\+json/g) || []).length;
  if (n === 1) ok("client/index.html carries exactly one JSON-LD graph");
  else
    fail(
      `client/index.html has ${n} JSON-LD block(s), expected 1 — run npm run gen:index-meta`,
      n === 0 ? "homepage would ship no structured data" : "duplicate graphs describe the same page twice"
    );
}

// Checking the source file above is not enough, and shipping proved it: the
// handler injects into the built template, which already carries the homepage
// graph, so every non-homepage route went out with two. Assert on what the
// handler actually returns, which is what a crawler receives.
{
  const { default: handler } = await import(
    pathToFileURL(resolve(ROOT, "api/index.js")).href
  );
  const bad = [];
  for (const p of ["/pricing", "/all-products", "/tools/canva-pro-bangladesh", "/blog"]) {
    let body = "";
    const res = { setHeader() {}, status() { return this; }, send(b) { body = b; } };
    handler({ url: p, headers: { host: "www.aiteampremium.com" } }, res);
    const blocks = body.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
    if (blocks.length !== 1) { bad.push(`${p}: ${blocks.length} graph(s), expected 1`); continue; }
    const json = blocks[0].replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      const g = JSON.parse(json);
      if (!(g["@graph"] || []).length) bad.push(`${p}: empty @graph`);
    } catch (e) {
      bad.push(`${p}: served JSON-LD does not parse — ${e.message}`);
    }
    if (/ld\+json:home:start/.test(body)) bad.push(`${p}: homepage marker left in served HTML`);
  }
  if (bad.length === 0) ok("served HTML carries exactly one valid JSON-LD graph per route");
  else fail("served JSON-LD is wrong — this is what crawlers actually get", bad.join("\n"));
}

// No rating may ship anywhere. The catalog build strips fabricated review counts
// (1,842-3,421 reviews at 4.8-4.9 stars) that no review system produced; the
// ProductSchema component still accepts a `rating` prop, so re-introducing them
// is one prop away.
{
  const hits = [];
  for (const rel of ["client/src", "lib"]) {
    for (const f of walkFiles(resolve(ROOT, rel), /\.(ts|tsx|js|mjs)$/)) {
      const body = readFileSync(f, "utf-8").replace(/^\s*\/\/.*$/gm, "");
      if (/aggregateRating\s*[:=]|"aggregateRating"\s*:/.test(body) && !/rating\?:|if \(rating\)/.test(body))
        hits.push(relative(ROOT, f).replace(/\\/g, "/"));
      if (/rating=\{/.test(body)) hits.push(`${relative(ROOT, f).replace(/\\/g, "/")} (passes a rating)`);
    }
  }
  if (hits.length === 0) ok("no review rating is emitted in structured data");
  else fail("a rating would ship in schema — no review system produced one", hits.join("\n"));
}

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
