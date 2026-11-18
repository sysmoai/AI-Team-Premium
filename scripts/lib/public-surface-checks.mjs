// scripts/lib/public-surface-checks.mjs
//
// Pure checks for public surfaces that the catalog projection does not reach
// (C6): blog posts, the TOOL_META blocks that feed /compare, and the built
// client bundle. Shared by scripts/test-c6-surfaces.mjs (with negative
// fixtures) and scripts/audit-public-surface.mjs (run against a real build).
// No I/O except the explicit loader helpers at the bottom.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

export const TAKA_RE = /৳\s?\d/;
// Commercial promises that must not be published while no offer is approved.
// Fulfilment context only: "spend 15–20 minutes daily" or "designers deliver in
// 2 days" is educational, "we deliver login details within 15 minutes" is not.
export const PROMISE_RE =
  /\b(?:deliver\w*|send\w*|shar\w*|get)\s+(?:you\s+)?(?:the\s+|your\s+)?(?:login|invite|access|account|credentials)\b[^.]{0,40}?\b(?:in|within)\s+\d|\b(?:access|account|login|subscription)\s+(?:is\s+)?(?:activated|delivered|ready)\s+(?:in|within)\s+\d|replacement\s+warrant|\d+[- ]day\s+(?:replacement|warranty|guarantee)|send (?:you )?the bkash|bkash\/nagad number/i;

export const sha256 = (s) => createHash("sha256").update(String(s), "utf8").digest("hex");

function* strings(v, path = "") {
  if (typeof v === "string") yield [path, v];
  else if (Array.isArray(v)) for (let i = 0; i < v.length; i++) yield* strings(v[i], `${path}[${i}]`);
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) yield* strings(x, path ? `${path}.${k}` : k);
}

/**
 * Blog: a public (non-held) post may not state a Taka amount unless that exact
 * string is on the editorial hold list (earnings/savings claims awaiting a fact
 * check — never AITP prices), and may never carry a delivery/payment promise.
 * A held post must ship with an empty body.
 */
export function blogViolations(posts, heldSlugs, allowHashes = new Set()) {
  const out = [];
  for (const p of posts) {
    if (heldSlugs.has(p.slug)) {
      if ((p.sections ?? []).length || (p.faqs ?? []).length) out.push(`${p.slug}: held post still ships its body`);
      continue;
    }
    for (const [path, s] of strings(p)) {
      if (TAKA_RE.test(s) && !allowHashes.has(sha256(s))) out.push(`${p.slug} ${path}: Taka amount not on the hold list`);
      if (PROMISE_RE.test(s)) out.push(`${p.slug} ${path}: delivery/payment promise`);
    }
  }
  return out;
}

/**
 * TOOL_META (feeds /compare/*): a number may appear only if the governed
 * catalog has an orderable record for that tool's canonical family.
 * `orderableSlugs`: catalog slugs with at least one canOrder record.
 */
export function toolMetaViolations(metas, orderableSlugs, canonicalMap) {
  const out = [];
  for (const [file, m] of metas) {
    const target = canonicalMap[`/tools/${m.slug}`];
    const family = target ? target.replace("/tools/", "") : null;
    const mayPrice = family && orderableSlugs.has(family);
    if (m.priceBdt !== 0 && !mayPrice) out.push(`${file}: priceBdt ${m.priceBdt} without an orderable catalog family`);
    for (const [path, s] of strings(m)) {
      if (TAKA_RE.test(s) && !mayPrice) out.push(`${file} ${path}: Taka amount in TOOL_META`);
      if (PROMISE_RE.test(s) || /bkash|nagad/i.test(s)) out.push(`${file} ${path}: payment/delivery promise in TOOL_META`);
    }
  }
  return out;
}

/** Built JS/HTML: Taka amounts and promises in shipped files, minus a documented allowlist. */
export function bundleViolations(files, allowSubstrings = []) {
  const out = [];
  for (const [name, text] of files) {
    for (const m of text.matchAll(/.{0,60}৳\s?\d[\d,]*.{0,40}/g)) {
      const ctx = m[0];
      if (allowSubstrings.some((a) => ctx.includes(a))) continue;
      out.push(`${name}: ${ctx.replace(/\s+/g, " ").trim()}`);
    }
    for (const m of text.matchAll(/.{0,50}(?:bKash\/Nagad number|deliver[a-z]* (?:login|invite)[^"]{0,40}within \d)[^"]{0,30}/gi)) {
      out.push(`${name}: promise: ${m[0].slice(0, 120)}`);
    }
  }
  return out;
}

// ---------------------------------------------------------------- loaders
export function loadToolMetas(root) {
  const dir = resolve(root, "client/src/pages/tools");
  const metas = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
    const m = readFileSync(resolve(dir, f), "utf8").match(/export const TOOL_META\s*=\s*(\{[\s\S]*?\n\})\s*as const/);
    if (m) metas.push([f, JSON.parse(m[1])]);
  }
  return metas;
}

export function loadBlogHold(root) {
  const j = JSON.parse(readFileSync(resolve(root, "scripts/fixtures/blog-taka-hold.json"), "utf8"));
  return new Set(j.items.map((i) => i.sha256));
}
