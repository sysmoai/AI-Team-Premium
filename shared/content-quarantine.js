// Public-content quarantine for pages with confirmed high-risk claims that
// contradict current evidence/governance. URLs remain reachable, but the
// disputed article body/schema stays suppressed until issue #20 is reconciled.
export const QUARANTINED_BLOG_SLUGS = new Set([
  "chatgpt-plus-price-bangladesh-bkash-guide",
  "best-ai-tools-bangladeshi-university-students",
  "chatgpt-vs-claude-vs-gemini-bangladesh-freelancers",
  "pay-chatgpt-without-international-credit-card-bangladesh",
  "canva-pro-price-bangladesh-worth-it",
  "midjourney-vs-ideogram-vs-leonardo-ai-image-bangladesh",
  "buy-perplexity-pro-research-tool-bangladesh",
  // C6 editorial hold (2026-11-19): the article is built on AITP prices, shared-seat
  // offers or bKash purchase/delivery promises; a minimal rewrite cannot fix it.
  "shared-vs-personal-ai-subscription-which-to-buy",
  "bkash-diye-chatgpt-kena-bangla-guide",
  "claude-pro-bangladesh-price-bkash-guide",
  "chatgpt-plus-personal-vs-shared-bangladesh",
  "buy-chatgpt-pro-bangladesh-bkash-guide",
  "complete-guide-ai-subscriptions-bangladesh-pricing",
]);

// C6: the legacy STATIC blog (320 pages that used to live in client/public/blog
// and were served straight from assets, 257 of them indexable) stated AITP
// prices, "5-minute delivery", "30-day replacement guarantee" and bKash/Nagad
// purchase steps on almost every page, and rendered double-encoded text. It is
// held in docs/content-hold/legacy-static-blog/ (UTF-8 repaired, templated
// commercial blocks removed); its URLs answer with the noindex holding page
// until each article is re-verified and ported to the React blog.
export const LEGACY_STATIC_BLOG_SECTIONS = Object.freeze([
  "advanced", "beginner", "bonus", "business", "chatgpt", "comparisons",
  "freelancing", "image-video", "productivity", "prompts", "students",
]);
const LEGACY_RE = new RegExp(`^/blog/(?:${LEGACY_STATIC_BLOG_SECTIONS.join("|")})/[^/]+/?$`);

export function isQuarantinedBlogPath(path) {
  if (!path.startsWith("/blog/")) return false;
  if (LEGACY_RE.test(path)) return true;
  const rawSlug = path.slice("/blog/".length);
  const slug = rawSlug.endsWith("/") ? rawSlug.slice(0, -1) : rawSlug;
  return QUARANTINED_BLOG_SLUGS.has(slug);
}
