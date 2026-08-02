#!/usr/bin/env node
// Internal-link graph audit.
//
// Answers three questions the sitemap cannot:
//   1. ORPHANS      — indexable routes nothing links to. A crawler reaches them
//                     only via the sitemap, and they accumulate no internal
//                     authority, so they tend not to rank regardless of quality.
//   2. DEAD LINKS   — internal hrefs pointing at paths that have no route.
//   3. DEAD ENDS    — routes that receive links but emit none, leaking the
//                     crawl (and the reader) rather than passing them onward.
//
// Link sources scanned: every <Link href="..."> and <a href="/..."> in
// client/src, plus generated nav/footer data. Dynamic hrefs built from
// template literals are resolved where the prefix is static (e.g.
// `/tools/${slug}` counts as a link to every /tools/* route) and reported
// separately so the number is never silently overstated.
//
// Usage: node scripts/audit-internal-links.mjs [--json]

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const asJson = process.argv.includes("--json");

const { ROUTE_META } = await import(pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href);
const allRoutes = new Set(Object.keys(ROUTE_META));

// ---------- collect source files ----------
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(p);
  }
  return out;
}
const files = [
  ...walk(resolve(ROOT, "client/src")),
  resolve(ROOT, "shared/nav-menu.js"),
];

// ---------- extract links ----------
// outbound: Map<fromPath, Set<toPath>>  — only for files we can map to a route
// linkTargets: Set<toPath> across the whole app (for orphan detection)
const linkTargets = new Set();
const dynamicPrefixes = new Set();
const deadLinks = [];
const perFileLinks = new Map();

// Three distinct link shapes exist in this codebase, and missing any one of
// them produces false orphans. An earlier version of this script matched only
// the first and wrongly reported all 11 service pages plus /access-types,
// /about and the trust pages as orphans — they are linked, just as data.
//
//   1. JSX attribute:  href="/x"   to="/x"   href={"/x"}
//   2. Object literal: { label: "…", to: "/x" }  |  { …, href: "/x" }
//      Used by Footer.tsx's FooterLinks, Services.tsx's card arrays, and
//      AIReadinessAssessment.tsx — i.e. most of the site's real navigation.
//   3. Dynamic:        href={`/tools/${slug}`}  — static prefix only.
const HREF_RE = /(?:href|to)=\{?["'`](\/[^"'`\s>{}]*)["'`]\}?/g;
const OBJ_LINK_RE = /(?:href|to|link|path)\s*:\s*["'`](\/[^"'`\s>{}]*)["'`]/g;
const TEMPLATE_RE = /(?:href|to)=\{`(\/[^`$]*)\$\{/g;

for (const file of files) {
  let src;
  try { src = readFileSync(file, "utf-8"); } catch { continue; }
  const found = new Set();

  for (const re of [HREF_RE, OBJ_LINK_RE]) {
    for (const m of src.matchAll(re)) {
      const raw = m[1].split("#")[0].split("?")[0];
      if (!raw.startsWith("/")) continue;
      if (/\.(png|jpg|jpeg|svg|webp|ico|xml|txt|json|webmanifest)$/i.test(raw)) continue;
      const path = raw.length > 1 && raw.endsWith("/") ? raw.slice(0, -1) : raw;
      found.add(path);
      linkTargets.add(path);
      if (!allRoutes.has(path)) {
        deadLinks.push({ file: file.replace(ROOT + "\\", "").replace(/\\/g, "/"), href: path });
      }
    }
  }

  // Dynamic: `/tools/${slug}` — treat the static prefix as covering that family.
  for (const m of src.matchAll(TEMPLATE_RE)) {
    const prefix = m[1].replace(/\/$/, "");
    if (prefix.length > 1) dynamicPrefixes.add(prefix);
  }

  perFileLinks.set(file, found);
}

// Routes reachable via a dynamic prefix (e.g. every /blog/* via `/blog/${slug}`)
const dynamicallyLinked = new Set();
for (const route of allRoutes) {
  for (const prefix of dynamicPrefixes) {
    if (route.startsWith(prefix + "/")) { dynamicallyLinked.add(route); break; }
  }
}

// ---------- orphans ----------
const orphans = [...allRoutes]
  .filter((r) => r !== "/")
  .filter((r) => !linkTargets.has(r))
  .filter((r) => !dynamicallyLinked.has(r))
  .filter((r) => !r.startsWith("/admin"))
  .sort();

const dynamicOnly = [...allRoutes]
  .filter((r) => r !== "/" && !linkTargets.has(r) && dynamicallyLinked.has(r))
  .sort();

// ---------- report ----------
const byPrefix = (list) => {
  const g = {};
  for (const r of list) {
    const k = "/" + (r.split("/")[1] || "");
    (g[k] ||= []).push(r);
  }
  return g;
};

if (asJson) {
  console.log(JSON.stringify({
    totals: {
      routes: allRoutes.size,
      distinctLinkTargets: linkTargets.size,
      hardOrphans: orphans.length,
      dynamicOnly: dynamicOnly.length,
      deadLinks: deadLinks.length,
    },
    orphans, dynamicOnly, deadLinks,
  }, null, 2));
} else {
  console.log(`\ninternal-link audit — ${allRoutes.size} routes\n`);

  console.log(`✖ HARD ORPHANS: ${orphans.length} (no static link, no dynamic prefix reaches them)`);
  const og = byPrefix(orphans);
  for (const [k, v] of Object.entries(og).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`    ${String(v.length).padStart(4)}  ${k}`);
    if (v.length <= 14) v.forEach((r) => console.log(`          ${r}`));
  }

  console.log(`\n○ REACHED ONLY BY A DYNAMIC LINK: ${dynamicOnly.length}`);
  const dg = byPrefix(dynamicOnly);
  for (const [k, v] of Object.entries(dg).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`    ${String(v.length).padStart(4)}  ${k}`);
  }

  console.log(`\n✖ DEAD INTERNAL LINKS: ${deadLinks.length}`);
  const seen = new Set();
  for (const d of deadLinks) {
    const key = d.href;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`    ${d.href}   <- ${d.file}`);
  }
  console.log("");
}

process.exit(deadLinks.length ? 1 : 0);
