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
