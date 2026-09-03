// Public-content quarantine for pages with confirmed high-risk claims that
// contradict current evidence/governance. Keep this list intentionally small:
// URLs remain reachable so we do not delete ranking equity, but search engines
// are asked not to index them until the claims are reconciled against current
// provider facts and approved AITP operational evidence.
//
// Remove a slug only after issue #20 verification has completed for that page.
export const QUARANTINED_BLOG_SLUGS = new Set([
  "chatgpt-plus-price-bangladesh-bkash-guide",
  "best-ai-tools-bangladeshi-university-students",
  "chatgpt-vs-claude-vs-gemini-bangladesh-freelancers",
  "pay-chatgpt-without-international-credit-card-bangladesh",
]);

export function isQuarantinedBlogPath(path) {
  if (!path.startsWith("/blog/")) return false;
  const slug = path.slice("/blog/".length).replace(/\/$/, "");
  return QUARANTINED_BLOG_SLUGS.has(slug);
}
