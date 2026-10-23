// lib/render-page.js — runtime-agnostic HTML responder for the SPA.
//
// Given a request path and the built index.html, returns { status, headers,
// body }. No filesystem, no Node request/response objects: the Cloudflare
// Worker (worker/index.js) and the legacy Vercel adapter (api/index.js) both
// call this, so the two can never disagree about a route's status, metadata,
// robots policy or quarantine state.

import { lookupMeta, SITE_URL } from "./route-meta.js";
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

function nonIndexable(template, page) {
  return makeNonIndexable(inject(template, page));
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

  return html(
    200,
    injectJsonLd(inject(template, meta), path, meta),
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
  );
}
