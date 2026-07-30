// api/[...path].js — Vercel catch-all serverless handler for the SPA.
//
// Must be ESM: package.json declares "type": "module", so a CommonJS
// (require/module.exports) file here fails to load and every request returns
// FUNCTION_INVOCATION_FAILED.
//
// Static assets and "/" are served straight from the CDN (outputDirectory =
// dist/public). This function is the filesystem-miss fallback, so it handles
// deep links like /all-products and /tools/midjourney: it returns the SPA shell
// with per-route <title>/<description>/<canonical> injected for crawlers.

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTE_META, DYNAMIC_PREFIXES, SITE_URL } from "../lib/route-meta.js";

// Candidate locations for the built shell. process.cwd() is /var/task in the
// lambda, but resolving relative to this module as well keeps the lookup
// working regardless of what the caller's working directory happens to be.
const HERE = dirname(fileURLToPath(import.meta.url));
const INDEX_CANDIDATES = [
  resolve(process.cwd(), "dist", "public", "index.html"),
  resolve(HERE, "..", "dist", "public", "index.html"),
  resolve(HERE, "..", "..", "dist", "public", "index.html"),
  resolve(process.cwd(), "public", "index.html"),
  resolve(process.cwd(), "index.html"),
];

// Read once per container, not per request.
let cachedTemplate = null;

function loadTemplate() {
  if (cachedTemplate !== null) return cachedTemplate;
  for (const candidate of INDEX_CANDIDATES) {
    if (existsSync(candidate)) {
      cachedTemplate = readFileSync(candidate, "utf-8");
      return cachedTemplate;
    }
  }
  return null;
}

// Escape for an HTML attribute context. The 404 canonical embeds the requested
// path, which is attacker-controlled, so this is required.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The rewrite sends /all-products here as /api/all-products. Strip the prefix
// so lookups use the visitor-facing path. Direct hits are handled unchanged.
function resolveRequestPath(req) {
  const raw = req.url || "/";
  let pathname;
  try {
    pathname = new URL(raw, "http://localhost").pathname;
  } catch {
    pathname = raw.split("?")[0];
  }
  if (pathname === "/api" || pathname === "/api/") return "/";
  if (pathname.startsWith("/api/")) pathname = pathname.slice(4);
  return pathname || "/";
}

function lookupMeta(path) {
  if (ROUTE_META[path]) return ROUTE_META[path];
  // Tolerate a trailing slash on any route except "/".
  if (path.length > 1 && path.endsWith("/")) {
    const trimmed = path.slice(0, -1);
    if (ROUTE_META[trimmed]) return ROUTE_META[trimmed];
  }
  for (const { prefix, meta } of DYNAMIC_PREFIXES) {
    if (path.startsWith(prefix) && path.length > prefix.length) return meta;
  }
  return null;
}

// Swap the first match for `replacement`, or insert it before </head> when the
// tag is absent. Without the insert fallback a missing tag silently no-ops.
function replaceOrInsert(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(/<\/head>/i, `    ${replacement}\n  </head>`);
}

function inject(template, { title, description, canonical }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const c = escapeHtml(canonical);

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);

  html = replaceOrInsert(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${d}" />`
  );
  html = replaceOrInsert(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${c}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${t}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${d}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${c}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${t}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${d}" />`
  );

  return html;
}

export default function handler(req, res) {
  const path = resolveRequestPath(req);

  // An asset reaching this function means the file genuinely is not in the
  // build. Return 404 rather than the HTML shell — handing HTML back for a .js
  // request breaks the page with a confusing MIME error.
  if (/\.(js|mjs|css|png|jpe?g|svg|webp|ico|woff2?|ttf|map|json|xml|txt)$/i.test(path)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(404).send("Not found");
    return;
  }

  const template = loadTemplate();
  if (template === null) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(500).send(
      "Server error: index.html not found. Looked in:\n" + INDEX_CANDIDATES.join("\n")
    );
    return;
  }

  const meta = lookupMeta(path);

  if (!meta) {
    const body = inject(template, {
      title: "404 — Page Not Found | AIPT — AI Premium Tools",
      description:
        "The page you requested was not found. Browse our AI subscriptions or return home.",
      canonical: SITE_URL + path,
    });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.status(404).send(body);
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(inject(template, meta));
}
