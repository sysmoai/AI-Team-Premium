// api/index.js — LEGACY Vercel serverless adapter for the SPA.
//
// Production now runs on Cloudflare Workers (worker/index.js). This file is kept
// only so a Vercel rollback stays possible until Vercel is retired; both call
// lib/render-page.js, which holds all routing, SEO and quarantine behaviour.
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
import { renderPage } from "../lib/render-page.js";

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

export default function handler(req, res) {
  const { status, headers, body } = renderPage(resolveRequestPath(req), loadTemplate());
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.status(status).send(body);
}
