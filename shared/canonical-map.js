// Duplicate product URLs -> the catalog page that should be indexed for them.
//
// The site grew two parallel product-page systems and both are in sitemap.xml:
//
//   /tools/<slug>-bangladesh   66 pages generated from products-catalog.json
//   /tools/<short>             25 hand-written editorial pages
//   /<brand>-plans              7 more hand-written pages
//
// 98 indexed URLs for ~66 products, so for 21 products we were submitting two or
// three URLs that compete with each other for the same query. The hand-written
// pages also quoted their own prices, which had drifted from the catalog.
//
// Decision (2026-07-31): keep both URLs reachable — the editorial pages carry
// real depth worth keeping — but point rel=canonical at the catalog page so only
// one is indexed. Nothing is redirected and nothing is deleted, so this is fully
// reversible by emptying this map.
//
// Not listed = self-canonical. LinkedIn Premium and the AI Tools Vault have no
// catalog entry to point at, so they stay their own canonical.
export const CANONICAL_MAP = {
  // hand-written /tools/<short>
  "/tools/adobe-cc": "/tools/adobe-creative-cloud-bangladesh",
  "/tools/canva": "/tools/canva-pro-bangladesh",
  "/tools/chatgpt": "/tools/chatgpt-plus-bangladesh",
  "/tools/claude": "/tools/claude-pro-bangladesh",
  "/tools/copilot": "/tools/github-copilot-bangladesh",
  "/tools/elevenlabs": "/tools/elevenlabs-bangladesh",
  "/tools/firefly": "/tools/adobe-firefly-bangladesh",
  "/tools/freepik": "/tools/freepik-premium-bangladesh",
  "/tools/gemini": "/tools/gemini-advanced-bangladesh",
  "/tools/google-ai-pro": "/tools/gemini-advanced-bangladesh",
  "/tools/grammarly": "/tools/grammarly-premium-bangladesh",
  "/tools/grok": "/tools/supergrok-bangladesh",
  "/tools/supergrok": "/tools/supergrok-bangladesh",
  "/tools/ideogram": "/tools/ideogram-bangladesh",
  "/tools/kling": "/tools/kling-ai-bangladesh",
  "/tools/leonardo": "/tools/leonardo-ai-bangladesh",
  "/tools/manus": "/tools/manus-ai-bangladesh",
  "/tools/microsoft365": "/tools/microsoft-365-copilot-bangladesh",
  "/tools/midjourney": "/tools/midjourney-bangladesh",
  "/tools/notion": "/tools/notion-business-bangladesh",
  "/tools/perplexity": "/tools/perplexity-pro-bangladesh",
  "/tools/poe": "/tools/poe-bangladesh",
  "/tools/runway": "/tools/runway-bangladesh",

  // Same component on two paths. /products and /all-products render AllProducts
  // and shipped byte-identical titles and descriptions, both self-canonical and
  // both in sitemap.xml — the clearest duplicate on the site. /start-a-project
  // and /contact are likewise one page; /contact is the canonical spelling.
  "/products": "/all-products",
  "/start-a-project": "/contact",

  // hand-written /<brand>-plans
  "/chatgpt-plans": "/tools/chatgpt-plus-bangladesh",
  "/claude-plans": "/tools/claude-pro-bangladesh",
  "/gemini-plans": "/tools/gemini-advanced-bangladesh",
  "/grammarly-plans": "/tools/grammarly-premium-bangladesh",
  "/canva-plans": "/tools/canva-pro-bangladesh",
  "/perplexity-plans": "/tools/perplexity-pro-bangladesh",
  "/grok-plans": "/tools/supergrok-bangladesh",
};
