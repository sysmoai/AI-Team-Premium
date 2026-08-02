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

// Normalise CRLF before parsing. blog-posts.ts is source a human edits, so it
// isn't pinned to LF the way the generated files are — a checkout on Windows
// can hand it back with \r\n, which broke the block-splitting regex below
// outright (0 posts parsed) rather than just failing a byte comparison.
const src = readFileSync(SRC, "utf-8").replace(/\r\n/g, "\n");

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
  // Needed for BlogPosting.datePublished. Only a real date ships — a post
  // without one gets no date rather than today's, which would be a claim.
  const publishedDate = block.match(/publishedDate:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1] ?? null;
  const category = block.match(/category:\s*"([^"]+)"/)?.[1] ?? null;
  if (slug && title && excerpt) posts.push({ slug, title, excerpt, lang, publishedDate, category });
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
      headline: title,
      publishedDate: p.publishedDate,
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

// Category slug: lowercase, ampersands spelled out, spaces to hyphens.
// "Career & Income" -> "career-and-income", "For Students" -> "for-students".
const categorySlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const categoryCounts = new Map();
for (const p of posts) {
  if (!p.category) continue;
  categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
}

const categoryRecords = [...categoryCounts.entries()]
  .map(([name, count]) => {
    const slug = categorySlug(name);
    const path = `/blog/category/${slug}`;
    // Descriptions are built from what is actually true of the category — its
    // name and how many guides are in it — rather than a hand-written claim per
    // category that would go stale the moment a post is added.
    const plural = count === 1 ? "guide" : "guides";
    return {
      name,
      slug,
      path,
      count,
      title: `${name} — AI Guides for Bangladesh | AI Team Premium`,
      description: `${count} ${plural} on ${name.toLowerCase()} for Bangladesh — practical, locally relevant, written for bKash/Nagad users. Read free, no signup.`,
      canonical: `${SITE}${path}`,
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

// Article fields for BlogPosting schema. Separate from BLOG_ROUTE_META because
// that is <head> metadata; this is what the post *is*. publishedDate is null
// where the post does not state one — an absent date is emitted as no date
// rather than as today's, which would be a claim we cannot support.
export const BLOG_ARTICLES = {
${records
  .map(
    (r) =>
      `  "${r.path}": { headline: "${esc(r.headline)}", description: "${esc(
        r.description
      )}", datePublished: ${r.publishedDate ? `"${r.publishedDate}"` : "null"}, lang: "${r.lang}" },`
  )
  .join("\n")}
};

// Category hubs.
//
// The 50 posts already carried a category field, but it rendered as inert text:
// no landing page, no filtering, not even a link. So the blog was a flat list of
// 50 items with no topical structure — nothing grouped related posts, and a
// category with 13 posts in it had no page that could rank for that topic.
//
// These pages also fix an internal-linking problem structurally: every post now
// has a guaranteed inbound link from its category hub, which the per-post
// "related" rotation alone could not promise.
export const BLOG_CATEGORY_ROUTE_META = {
${categoryRecords
  .map(
    (c) =>
      `  "${c.path}": { title: "${esc(c.title)}", description: "${esc(
        c.description
      )}", canonical: "${c.canonical}" },`
  )
  .join("\n")}
};

export const BLOG_CATEGORIES = ${JSON.stringify(
  categoryRecords.map((c) => ({ name: c.name, slug: c.slug, path: c.path, count: c.count })),
  null,
  2
)};
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
