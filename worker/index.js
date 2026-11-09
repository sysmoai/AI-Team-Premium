// worker/index.js — Cloudflare Worker for www.aiteampremium.com.
//
// Static files in dist/public are served by Workers Static Assets without
// invoking this script (headers come from client/public/_headers). This Worker
// only runs when no asset matched — the same "filesystem miss" role api/index.js
// had on Vercel — and answers deep links with the SPA shell plus per-route
// metadata, or a real 404, via lib/render-page.js.

import { renderPage, SECURITY_HEADERS } from "../lib/render-page.js";

const CANONICAL_HOST = "www.aiteampremium.com";
const APEX_HOST = "aiteampremium.com";

// ------------------------------------------------------------ click events
// The site had no working measurement: no analytics ID is set in the build, and
// the CSP (connect-src 'self') would block a third-party tracker anyway. So no
// one could tell which products, pages or buttons produced WhatsApp orders.
//
// client/src/lib/analytics.ts beacons each CTA click and page view here. The
// Worker writes one structured log line per event, which Workers Logs (enabled
// by "observability" in wrangler.jsonc) keeps and lets you filter and count by
// field in the Cloudflare dashboard. No IP, cookie or identifier is recorded.
const EVENT_PATH = "/api/e";
const EVENT_NAMES = new Set([
  "page_view", "whatsapp_cta_click", "messenger_cta_click", "plan_cta_click", "pricing_view",
  "service_cta_click", "tool_cta_click", "compare_cta_click", "contact_cta_click",
  "footer_cta_click", "hero_cta_click",
]);
const EVENT_FIELDS = ["path", "product", "plan", "price", "source", "ref"];

async function handleEvent(request) {
  const noContent = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  try {
    const raw = await request.text();
    if (raw.length > 2048) return noContent();
    const data = JSON.parse(raw);
    if (!data || !EVENT_NAMES.has(data.event)) return noContent();
    const out = { aitp_event: data.event };
    for (const k of EVENT_FIELDS) {
      if (typeof data[k] === "string" && data[k]) out[k] = data[k].slice(0, 160);
    }
    const cf = request.cf || {};
    if (cf.country) out.country = cf.country;
    out.mobile = /Mobi|Android/i.test(request.headers.get("user-agent") || "");
    console.log(JSON.stringify(out));
  } catch {
    // Malformed beacons are dropped; the page never waits on this response.
  }
  return noContent();
}

// The built index.html, fetched once per isolate. A new deployment starts new
// isolates, so this never serves a stale bundle reference.
let templatePromise = null;

function loadTemplate(env, requestUrl) {
  if (!templatePromise) {
    templatePromise = env.ASSETS.fetch(new URL("/", requestUrl))
      .then((r) => (r.ok ? r.text() : null))
      .catch(() => null)
      .then((t) => {
        if (t === null) templatePromise = null; // retry on the next request
        return t;
      });
  }
  return templatePromise;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The zone's Redirect Rule normally sends the apex to www before a request
    // gets here; this is the fallback if the apex is ever routed to the Worker.
    if (url.hostname === APEX_HOST) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === EVENT_PATH) return handleEvent(request);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8", ...SECURITY_HEADERS },
      });
    }

    const template = await loadTemplate(env, request.url);
    const page = renderPage(url.pathname, template);

    const headers = new Headers({ ...page.headers, ...SECURITY_HEADERS });
    // Anything not served from the production hostname (workers.dev staging,
    // preview URLs) must stay out of search indexes.
    if (url.hostname !== CANONICAL_HOST) headers.set("X-Robots-Tag", "noindex, nofollow");

    return new Response(request.method === "HEAD" ? null : page.body, {
      status: page.status,
      headers,
    });
  },
};
