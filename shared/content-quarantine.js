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
]);

export function isQuarantinedBlogPath(path) {
  if (!path.startsWith("/blog/")) return false;
  const rawSlug = path.slice("/blog/".length);
  const slug = rawSlug.endsWith("/") ? rawSlug.slice(0, -1) : rawSlug;
  return QUARANTINED_BLOG_SLUGS.has(slug);
}
