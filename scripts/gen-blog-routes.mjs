#!/usr/bin/env node
// Generates lib/blog-routes.js — SEO metadata for every post in blog-posts.ts.
//
//   npm run gen:blog
//
// Same failure mode as products and comparisons: 14 posts had hand-maintained
// entries in route-meta.js that happened to stay in sync by discipline, not by
// anything that would catch a miss. Adding a post without adding its entry
// would ship it with the generic "/blog/" prefix title shared by every other
// post — the same duplicate-title problem fixed for /tools/ and /compare/.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";
const SRC = resolve(ROOT, "client/src/data/blog-posts.ts");

const src = readFileSync(SRC, "utf-8");

// blog-posts.ts is TypeScript with template-literal-free string fields, so a
// targeted regex per post object is reliable here — same approach already
// proven for tool-compare.ts. Each post is delimited by `{ slug: "..."` up to
// the matching top-level `},` at the same nesting depth; extracting just the
// four scalar fields (slug/title/excerpt/lang) is simpler and doesn't need to
// track nesting at all.
const postBlocks = src.split(/\n  \{\n/).slice(1); // drop the header before the first post

const posts = [];
for (const block of postBlocks) {
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const title = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  const excerpt = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  const lang = block.match(/lang:\s*"(en|bn)"/)?.[1] ?? "en";
  if (slug && title && excerpt) posts.push({ slug, title, excerpt, lang });
}

if (posts.length === 0) {
  console.error("gen:blog FAILED — parsed 0 posts from blog-posts.ts; extraction is out of date");
  process.exit(1);
}

const unescape = (s) => s.replace(/\\"/g, '"').replace(/\\n/g, " ");
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

// Meta description is capped near Google's ~160-char display limit; the
// excerpt is written longer, for the card on /blog, so it is trimmed here
// rather than duplicated by hand for every post.
const trimDesc = (s) => (s.length <= 157 ? s : s.slice(0, 157).replace(/\s+\S*$/, "") + "...");

const records = posts
  .map((p) => {
    const title = unescape(p.title);
    const description = trimDesc(unescape(p.excerpt));
    const path = `/blog/${p.slug}`;
    return {
      path,
      title: `${title} | AI Team Premium`,
      description,
      canonical: `${SITE}${path}`,
      lang: p.lang,
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/data/blog-posts.ts
// Regenerate: npm run gen:blog

export const BLOG_ROUTE_META = {
${records
  .map(
    (r) =>
      `  "${r.path}": { title: "${esc(r.title)}", description: "${esc(
        r.description
      )}", canonical: "${r.canonical}", lang: "${r.lang}" },`
  )
  .join("\n")}
};

export const BLOG_PATHS = Object.keys(BLOG_ROUTE_META);
`;

const OUT = resolve(ROOT, "lib/blog-routes.js");

if (process.argv.includes("--check")) {
  let existing = null;
  try {
    existing = readFileSync(OUT, "utf-8");
  } catch {
    console.error("lib/blog-routes.js is missing — run: npm run gen:blog");
    process.exit(1);
  }
  if (existing !== out) {
    console.error("lib/blog-routes.js is stale — run: npm run gen:blog");
    process.exit(1);
  }
  process.exit(0);
}

writeFileSync(OUT, out, "utf-8");
console.log(`gen:blog  wrote lib/blog-routes.js — ${records.length} posts`);
