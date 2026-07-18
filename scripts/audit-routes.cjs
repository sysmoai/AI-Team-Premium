#!/usr/bin/env node
/**
 * Route & Link Audit Script for AI Team Premium BD
 * Checks: route existence, SEO files, WhatsApp links, risky claims,
 * canonical-domain consistency, and retired-domain leakage.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CLIENT_SRC = path.join(ROOT, "client", "src");
const PUBLIC = path.join(ROOT, "client", "public");
const INDEX_HTML = path.join(ROOT, "client", "index.html");
const CANONICAL_DOMAIN = "https://aiteampremium.com";
const RETIRED_DOMAIN = "aiteampremiumbd.com";
const REPLIT_PREVIEW_HOST = "2908dc5c-dd62-4381-bef6-9c46b0aac170-00-4xpdyd7cwk59.pike.replit.dev";

const ROUTES = [
  "/", "/chatgpt-plans", "/ai-subscriptions", "/pricing", "/services",
  "/support", "/about", "/start-a-project", "/refund-policy",
  "/privacy-policy", "/terms", "/compare",
  "/tools/chatgpt", "/tools/claude", "/tools/gemini", "/tools/canva",
  "/tools/grammarly", "/tools/perplexity", "/tools/midjourney",
  "/tools/grok", "/tools/copilot", "/tools/notion",
  "/tools/microsoft365", "/tools/linkedin", "/tools/elevenlabs",
  "/tools/supergrok", "/tools/google-ai-pro", "/tools/leonardo",
  "/tools/runway", "/tools/kling",
];

let passed = 0;
let failed = 0;

function ok(msg) { passed++; console.log(`  ✅ ${msg}`); }
function fail(msg) { failed++; console.log(`  ❌ ${msg}`); }

console.log("\n=== AI Team Premium BD — Route & Quality Audit ===\n");

// 1. SEO files
console.log("1. SEO FILES");
["robots.txt", "sitemap.xml", "favicon.svg", "favicon.png", "manifest.json"].forEach(f => {
  if (fs.existsSync(path.join(PUBLIC, f))) ok(`${f} exists`);
  else fail(`${f} missing`);
});

// 2. Route component existence
console.log("\n2. ROUTE COMPONENTS");
const appTsx = fs.readFileSync(path.join(CLIENT_SRC, "App.tsx"), "utf-8");
ROUTES.forEach(route => {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`path=["']${escaped}["']`);
  if (re.test(appTsx)) ok(`${route} mapped in App.tsx`);
  else fail(`${route} NOT mapped in App.tsx`);
});

// Collect active runtime source only. Historical docs and archived prompts are excluded.
const allSrc = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory() && !p.includes("node_modules")) walk(p);
    else if (/\.(tsx?|html|xml|txt|json)$/.test(f)) {
      allSrc.push({ file: p, content: fs.readFileSync(p, "utf-8") });
    }
  }
}
walk(CLIENT_SRC);
walk(PUBLIC);
allSrc.push({ file: INDEX_HTML, content: fs.readFileSync(INDEX_HTML, "utf-8") });

// 3. WhatsApp link integrity in source
console.log("\n3. WHATSAPP LINK INTEGRITY");
let waTotal = 0;
let waWithText = 0;
let waWithoutText = 0;
allSrc.forEach(({ file, content }) => {
  if (!/\.tsx?$/.test(file)) return;
  const matches = content.match(/wa\.me\/8801533262758/g) || [];
  const relFile = path.relative(ROOT, file);
  matches.forEach((_, i) => {
    if (relFile.includes("lib/config.ts") || relFile.includes("lib/whatsapp.ts")) return;
    waTotal++;
    let idx = 0;
    for (let j = 0; j <= i; j++) {
      idx = content.indexOf("wa.me/8801533262758", idx);
      if (j < i) idx += 1;
    }
    const snippet = content.substring(Math.max(0, idx - 100), idx + 200);
    if (snippet.includes("?text=")) waWithText++;
    else waWithoutText++;
  });
});
console.log(`   Total wa.me links: ${waTotal}`);
console.log(`   With prefilled text: ${waWithText}`);
console.log(`   Without prefilled text: ${waWithoutText}`);
if (waWithoutText <= 3) ok("WhatsApp links mostly have prefilled text");
else fail("Too many WhatsApp links missing prefilled text");

// 4. Risky language
console.log("\n4. RISKY LANGUAGE SCAN");
const risky = ["official partner", "authorized distributor", "#1 ", "number one", "guaranteed safe", "ban safe", "lifetime guarantee"];
let riskyFound = 0;
allSrc.forEach(({ file, content }) => {
  risky.forEach(term => {
    if (content.toLowerCase().includes(term)) {
      riskyFound++;
      console.log(`   ⚠️  ${term} in ${path.relative(ROOT, file)}`);
    }
  });
});
if (riskyFound === 0) ok("No high-risk language found");
else fail(`${riskyFound} risky language occurrences found`);

// 5. Domain migration integrity
console.log("\n5. DOMAIN MIGRATION INTEGRITY");
let domainLeaks = 0;
allSrc.forEach(({ file, content }) => {
  const rel = path.relative(ROOT, file);
  if (content.includes(RETIRED_DOMAIN)) {
    domainLeaks++;
    console.log(`   ❌ Retired domain found in ${rel}`);
  }
  if (content.includes(REPLIT_PREVIEW_HOST)) {
    domainLeaks++;
    console.log(`   ❌ Replit preview URL found in active runtime file ${rel}`);
  }
});
if (domainLeaks === 0) ok("No retired-domain or preview-URL leakage in active runtime files");
else fail(`${domainLeaks} domain migration leak(s) found`);

const indexHtml = fs.readFileSync(INDEX_HTML, "utf-8");
const robots = fs.readFileSync(path.join(PUBLIC, "robots.txt"), "utf-8");
const sitemap = fs.readFileSync(path.join(PUBLIC, "sitemap.xml"), "utf-8");
if (indexHtml.includes(`<link rel="canonical" href="${CANONICAL_DOMAIN}/"`)) ok("index canonical uses aiteampremium.com");
else fail("index canonical is not aiteampremium.com");
if (indexHtml.includes(`<meta property="og:url" content="${CANONICAL_DOMAIN}/"`)) ok("Open Graph URL uses aiteampremium.com");
else fail("Open Graph URL is not aiteampremium.com");
if (robots.includes(`Sitemap: ${CANONICAL_DOMAIN}/sitemap.xml`)) ok("robots.txt points to the new sitemap");
else fail("robots.txt sitemap URL is incorrect");
if (sitemap.includes(`${CANONICAL_DOMAIN}/`) && !sitemap.includes(RETIRED_DOMAIN)) ok("sitemap contains only the new canonical domain");
else fail("sitemap domain migration is incomplete");

// 6. usePageMeta coverage
console.log("\n6. SEO METADATA COVERAGE");
const pageDir = path.join(CLIENT_SRC, "pages");
const pages = fs.readdirSync(pageDir).filter(f => f.endsWith(".tsx"));
pages.forEach(p => {
  const content = fs.readFileSync(path.join(pageDir, p), "utf-8");
  if (content.includes("usePageMeta") || content.includes("ToolDetail") || content.includes("ToolPlansPage")) ok(`${p} has metadata`);
  else fail(`${p} missing metadata`);
});

// 7. Build output (only enforced after a build has produced dist/)
console.log("\n7. BUILD OUTPUT");
const distPublic = path.join(ROOT, "dist", "public");
if (!fs.existsSync(distPublic)) {
  console.log("  ℹ️  dist/public not present; run npm run build before production verification");
} else {
  if (fs.existsSync(path.join(distPublic, "index.html"))) ok("dist/public/index.html exists");
  else fail("dist/public/index.html missing");
  const assetsDir = path.join(distPublic, "assets");
  const jsFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).filter(f => f.endsWith(".js")) : [];
  if (jsFiles.length > 0) ok(`JS assets built: ${jsFiles.length} files`);
  else fail("No JS assets in build output");
}

console.log("\n=== AUDIT SUMMARY ===");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
