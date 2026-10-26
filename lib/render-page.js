// lib/render-page.js — runtime-agnostic HTML responder for the SPA.
//
// Given a request path and the built index.html, returns { status, headers,
// body }. No filesystem, no Node request/response objects: the Cloudflare
// Worker (worker/index.js) and the legacy Vercel adapter (api/index.js) both
// call this, so the two can never disagree about a route's status, metadata,
// robots policy or quarantine state.

import { lookupMeta, isDynamicFallback, SITE_URL } from "./route-meta.js";
import { jsonLdFor } from "./structured-data.js";
import { isQuarantinedBlogPath } from "../shared/content-quarantine.js";
import { isPublicReviewPath } from "../shared/public-review.js";

// Applied to every response. Static files get the same set from
// client/public/_headers, which Workers Static Assets reads at deploy time —
// keep the two in step (npm run verify checks this).
export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
};

// A request that looks like a file but matched no built asset must 404 as
// plain text — returning the HTML shell gives browsers a confusing MIME error.
export const ASSET_PATH = /\.(js|mjs|css|png|jpe?g|svg|webp|ico|woff2?|ttf|map|json|xml|txt)$/i;

const NO_STORE_HTML = "public, max-age=0, must-revalidate";

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function replaceOrInsert(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(/<\/head>/i, `    ${replacement}\n  </head>`);
}

export function inject(template, { title, description, canonical }) {
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

// Crawlable fallback inside <div id="root">. The app is client-rendered, so
// without this every page's served HTML had an empty body: Googlebot only saw
// content after its deferred JS render, and crawlers that never run JS (Bing in
// part, GPTBot, PerplexityBot, ClaudeBot — all welcomed in robots.txt) saw
// nothing at all, and no internal links to follow. createRoot().render()
// replaces this on mount, so it only shows until the bundle loads.
//
// The copy is the route's own title and description — nothing new is claimed.
export const BODY_MARK = /<!-- ssr-body:start -->[\s\S]*?<!-- ssr-body:end -->/;

// Hub links every fallback carries, so a crawler landing on any URL can reach
// the main commercial pages. Each must be an indexable sitemap URL
// (npm run verify checks this).
export const FALLBACK_LINKS = [
  ["/", "AI Team Premium home"],
  ["/all-products", "All premium AI tools"],
  ["/pricing", "Pricing in Bangladesh"],
  ["/tools/chatgpt-plus-bangladesh", "ChatGPT Plus in Bangladesh"],
  ["/tools/claude-pro-bangladesh", "Claude Pro in Bangladesh"],
  ["/tools/gemini-advanced-bangladesh", "Gemini in Bangladesh"],
  ["/tools/canva-pro-bangladesh", "Canva Pro in Bangladesh"],
  ["/tools/grammarly-premium-bangladesh", "Grammarly Premium in Bangladesh"],
  ["/tools/perplexity-pro-bangladesh", "Perplexity Pro in Bangladesh"],
  ["/compare", "Compare AI tools"],
  ["/blog", "AI guides for Bangladesh"],
  ["/contact", "Contact"],
];

export function fallbackBody({ title, description }) {
  const h1 = escapeHtml(title.replace(/\s*\|\s*AI Team Premium\s*$/, ""));
  const links = FALLBACK_LINKS.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("");
  return (
    "<!-- ssr-body:start -->" +
    '<main style="max-width:720px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif">' +
    `<h1>${h1}</h1><p>${escapeHtml(description)}</p>` +
    `<nav aria-label="Main pages"><ul>${links}</ul></nav>` +
    "</main><!-- ssr-body:end -->"
  );
}

function injectBody(html, meta) {
  const block = meta ? fallbackBody(meta) : "<!-- ssr-body:start --><!-- ssr-body:end -->";
  return BODY_MARK.test(html) ? html.replace(BODY_MARK, block) : html;
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

function html(status, body, cacheControl, extra = {}) {
  return {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": cacheControl,
      ...extra,
    },
    body,
  };
}

// Non-indexable responses drop the template's fallback (the homepage's, since
// the template is the built index.html) rather than repeat it on a 404.
function nonIndexable(template, page) {
  return injectBody(makeNonIndexable(inject(template, page)), null);
}

// `template` is the built dist/public/index.html, or null if it could not be
// loaded (a broken deploy — answered with a 500 rather than a blank 200).
export function renderPage(path, template) {
  if (ASSET_PATH.test(path)) {
    return {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": NO_STORE_HTML },
      body: "Not found",
    };
  }

  if (template === null) {
    return {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      body: "Server error: index.html not found in the deployed assets.",
    };
  }

  const meta = lookupMeta(path);
  const noindex = { "X-Robots-Tag": "noindex, follow" };

  if (!meta) {
    return html(
      404,
      nonIndexable(template, {
        title: "404 — Page Not Found | AI Team Premium",
        description:
          "The page you requested was not found. Browse our AI subscriptions or return home.",
        canonical: SITE_URL + path,
      }),
      NO_STORE_HTML,
      noindex
    );
  }

  if (isPublicReviewPath(path)) {
    return html(
      200,
      nonIndexable(template, {
        title: "Commercial Page Under Evidence Review | AI Team Premium",
        description: "This commercial page is temporarily under evidence review. Current access model, availability, fulfillment timing and support terms are confirmed before purchase.",
        canonical: meta.canonical || SITE_URL + path,
      }),
      NO_STORE_HTML,
      noindex
    );
  }

  if (isQuarantinedBlogPath(path)) {
    return html(
      200,
      nonIndexable(template, {
        title: "Guide Under Evidence Review | AI Team Premium",
        description:
          "This guide is temporarily under evidence review. Commercial, pricing and provider-policy claims are being re-verified before republication.",
        canonical: SITE_URL + path,
      }),
      NO_STORE_HTML,
      noindex
    );
  }

  // A slug under /tools/, /compare/, /blog/ or /category/ that no generated
  // entry knows only matched a prefix safety net. Answering it 200 made every
  // mistyped or retired slug an indexable soft 404 (e.g. /tools/anything-at-all
  // served a 200 canonicalised to /all-products). Review and quarantine paths
  // are handled above, so they keep their 200 noindex holding page.
  if (isDynamicFallback(meta)) {
    return html(
      404,
      nonIndexable(template, {
        title: "404 — Page Not Found | AI Team Premium",
        description:
          "The page you requested was not found. Browse our AI subscriptions or return home.",
        canonical: SITE_URL + path,
      }),
      NO_STORE_HTML,
      noindex
    );
  }

  return html(
    200,
    injectBody(injectJsonLd(inject(template, meta), path, meta), meta),
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
  );
}
