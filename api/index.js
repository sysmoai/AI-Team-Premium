// api/index.js — Vercel serverless handler for the SPA.
//
// Every filesystem miss is rewritten here by vercel.json. A bracketed catch-all
// filename does not register as one under the plain api/ convention — only the
// bare /api route resolved — so the rewrite targets /api and the original path
// is read off the incoming request instead.
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
import { lookupMeta, SITE_URL } from "../lib/route-meta.js";
import { jsonLdFor } from "../lib/structured-data.js";
import { isQuarantinedBlogPath } from "../shared/content-quarantine.js";
import { isPublicReviewPath } from "../shared/public-review.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const INDEX_CANDIDATES = [
  resolve(process.cwd(), "dist", "public", "index.html"),
  resolve(HERE, "..", "dist", "public", "index.html"),
  resolve(HERE, "..", "..", "dist", "public", "index.html"),
  resolve(process.cwd(), "public", "index.html"),
  resolve(process.cwd(), "index.html"),
];

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

function makeNonIndexable(html) {
  let output = replaceOrInsert(
    html,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, follow" />'
  );

  output = output.replace(
    /<!-- ld\+json:home:start -->[\s\S]*?<!-- ld\+json:home:end -->/,
    ""
  );

  return output;
}

function injectJsonLd(html, path, meta) {
  let payload;
  try {
    payload = JSON.stringify(jsonLdFor(path, meta));
  } catch {
    return html;
  }
  const safe = payload.replace(/<\//g, "<\\/");
  const tag = `<script type="application/ld+json">${safe}</script>`;
  const marked = /<!-- ld\+json:home:start -->[\s\S]*?<!-- ld\+json:home:end -->/;
  if (marked.test(html)) return html.replace(marked, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

export default function handler(req, res) {
  const path = resolveRequestPath(req);

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
    const body = makeNonIndexable(
      inject(template, {
        title: "404 — Page Not Found | AI Team Premium",
        description:
          "The page you requested was not found. Browse our AI subscriptions or return home.",
        canonical: SITE_URL + path,
      })
    );
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("X-Robots-Tag", "noindex, follow");
    res.status(404).send(body);
    return;
  }

  if (isPublicReviewPath(path)) {
    const body = makeNonIndexable(
      inject(template, {
        title: "Commercial Page Under Evidence Review | AI Team Premium",
        description: "This commercial page is temporarily under evidence review. Current access model, availability, fulfillment timing and support terms are confirmed before purchase.",
        canonical: meta.canonical || SITE_URL + path,
      })
    );
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("X-Robots-Tag", "noindex, follow");
    res.status(200).send(body);
    return;
  }

  if (isQuarantinedBlogPath(path)) {
    const body = makeNonIndexable(
      inject(template, {
        title: "Guide Under Evidence Review | AI Team Premium",
        description:
          "This guide is temporarily under evidence review. Commercial, pricing and provider-policy claims are being re-verified before republication.",
        canonical: SITE_URL + path,
      })
    );
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("X-Robots-Tag", "noindex, follow");
    res.status(200).send(body);
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(injectJsonLd(inject(template, meta), path, meta));
}
