// The one place category slugs get a human label.
//
// This map used to be copy-pasted into AllProducts.tsx and ProductDetail.tsx.
// Both had a title-case fallback, so a category missing from the map did not
// crash — it silently rendered the slug prettified. That is fine for
// "automation" and wrong for "seo" ("Seo") or "ai-learning" ("Ai Learning"),
// and the failure only shows up on whichever page you did not check.
//
// A category added to the catalog without an entry here is caught by the
// "category labels" check in scripts/verify.mjs rather than by a reader.
export const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Assistants",
  "ai-image": "Image Generation",
  "ai-video": "Video Generation",
  "ai-voice-music": "Voice & Music",
  "ai-code": "Coding",
  "ai-writing": "Writing",
  "ai-workspace": "Workspace",
  "ai-design": "Design",
  automation: "Automation",
  seo: "SEO & Marketing",
  "ai-research": "Research",
  "ai-learning": "Learning",
  bundles: "Bundles",
};

export function categoryLabel(c: string) {
  return (
    CATEGORY_LABELS[c] ||
    c
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
