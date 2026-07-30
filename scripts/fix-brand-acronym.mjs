#!/usr/bin/env node
// One-shot: remove the public-facing brand acronyms.
//
// The site shipped two different wrong acronyms — "AIPT — AI Premium Tools" in
// route metadata and a bare "AITP" in page copy and FAQ answers. Both were live
// in <title> and <meta description>, which is the text a search result shows, so
// this was the first thing a visitor read about the brand.
//
// The brand rule is: "AI Team Premium" in public text; AITP stays an internal
// abbreviation only. So internal-only files keep it — server/audit-engine.ts
// uses AITP_MARGIN as an identifier, and renaming that would change code for no
// reader's benefit.
//
//   node scripts/fix-brand-acronym.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Internal surfaces: the acronym is allowed here and the identifiers must not move.
const SKIP = new Set([
  "server/audit-engine.ts",
]);

const ROOTS = ["client/src", "lib", "data", "server", "api", "client/index.html"];
const EXT = /\.(ts|tsx|js|jsx|mjs|json|html)$/;

// Longest first — "AIPT — AI Premium Tools" must not be half-replaced into
// "AI Team Premium — AI Premium Tools".
const RULES = [
  [/AIPT\s*—\s*AI Premium Tools/g, "AI Team Premium"],
  [/AITP Shared Price/g, "AI Team Premium (Shared)"],
  [/AITP Price/g, "AI Team Premium"],
  [/\bAIPT\b/g, "AI Team Premium"],
  [/\bAITP\b/g, "AI Team Premium"],
];

function walk(p, out = []) {
  const s = statSync(p);
  if (s.isDirectory()) {
    for (const f of readdirSync(p)) {
      if (f === "node_modules" || f.startsWith(".")) continue;
      walk(resolve(p, f), out);
    }
  } else if (EXT.test(p)) out.push(p);
  return out;
}

const files = ROOTS.flatMap((r) => {
  try {
    return walk(resolve(ROOT, r));
  } catch {
    return [];
  }
});

let changedFiles = 0;
let changedHits = 0;
for (const f of files) {
  const rel = relative(ROOT, f).replace(/\\/g, "/");
  if (SKIP.has(rel)) continue;
  const before = readFileSync(f, "utf-8");
  let after = before;
  let hits = 0;
  for (const [re, to] of RULES) {
    after = after.replace(re, () => {
      hits++;
      return to;
    });
  }
  if (hits) {
    // Collapse a doubled brand created by an entry that already named the brand
    // alongside the acronym, e.g. "AI Team Premium (AI Team Premium)".
    after = after
      .replace(/AI Team Premium \(AI Team Premium\)/g, "AI Team Premium")
      .replace(/AI Team Premium\s+—\s+AI Team Premium/g, "AI Team Premium");
    writeFileSync(f, after, "utf-8");
    changedFiles++;
    changedHits += hits;
    console.log(`  ${String(hits).padStart(3)}  ${rel}`);
  }
}

console.log(`\nreplaced ${changedHits} public acronym(s) across ${changedFiles} file(s)`);
console.log(`kept internal: ${[...SKIP].join(", ")}`);
