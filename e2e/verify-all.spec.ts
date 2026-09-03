// e2e/verify-all.spec.ts — governance-aware end-to-end coverage for legacy aliases and canonical catalog pages
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:5000";

// The 25 historical editorial /tools/<short> routes are intentionally preserved
// for link continuity, but are no longer commercial truth surfaces. They must
// render the evidence-review state instead of stale product copy or prices.
const TOOLS = [
  // Chat / AI Assistants
  { slug: "chatgpt",       name: "ChatGPT",              compareName: "ChatGPT",          canonical: "/tools/chatgpt-plus-bangladesh" },
  { slug: "claude",        name: "Claude",               compareName: "Claude",           canonical: "/tools/claude-pro-bangladesh" },
  { slug: "gemini",        name: "Gemini",               compareName: "Gemini",           canonical: "/tools/gemini-advanced-bangladesh" },
  { slug: "perplexity",    name: "Perplexity",           compareName: "Perplexity",       canonical: "/tools/perplexity-pro-bangladesh" },
  { slug: "grok",          name: "Grok",                 compareName: "Grok",             canonical: "/tools/supergrok-bangladesh" },
  { slug: "supergrok",     name: "SuperGrok",            compareName: "SuperGrok",        canonical: "/tools/supergrok-bangladesh" },
  { slug: "google-ai-pro", name: "Google AI Pro",        compareName: "Google AI Pro",    canonical: "/tools/gemini-advanced-bangladesh" },
  { slug: "copilot",       name: "GitHub Copilot",       compareName: "Copilot",          canonical: "/tools/github-copilot-bangladesh" },
  // Image Generation
  { slug: "midjourney",    name: "Midjourney",           compareName: "Midjourney",       canonical: "/tools/midjourney-bangladesh" },
  { slug: "leonardo",      name: "Leonardo AI",          compareName: "Leonardo AI",      canonical: "/tools/leonardo-ai-bangladesh" },
  { slug: "ideogram",      name: "Ideogram AI",          compareName: "Ideogram AI",      canonical: "/tools/ideogram-bangladesh" },
  { slug: "freepik",       name: "Freepik",              compareName: "Freepik",          canonical: "/tools/freepik-premium-bangladesh" },
  { slug: "firefly",       name: "Adobe Firefly",        compareName: "Adobe Firefly",    canonical: "/tools/adobe-firefly-bangladesh" },
  { slug: "adobe-cc",      name: "Adobe Creative Cloud", compareName: "adobe-cc",         canonical: "/tools/adobe-creative-cloud-bangladesh" },
  { slug: "canva",         name: "Canva Pro",            compareName: "Canva Pro",        canonical: "/tools/canva-pro-bangladesh" },
  // Video Generation
  { slug: "runway",        name: "Runway ML",            compareName: "Runway ML",        canonical: "/tools/runway-bangladesh" },
  { slug: "kling",         name: "Kling AI",             compareName: "Kling AI",         canonical: "/tools/kling-ai-bangladesh" },
  // Writing & Productivity
  { slug: "grammarly",     name: "Grammarly",            compareName: "Grammarly",        canonical: "/tools/grammarly-premium-bangladesh" },
  { slug: "notion",        name: "Notion AI",            compareName: "Notion AI",        canonical: "/tools/notion-business-bangladesh" },
  { slug: "manus",         name: "Manus AI",             compareName: "Manus AI",         canonical: "/tools/manus-ai-bangladesh" },
  { slug: "poe",           name: "Poe AI",               compareName: "Poe AI",           canonical: "/tools/poe-bangladesh" },
  { slug: "microsoft365",  name: "Microsoft 365",        compareName: "Microsoft 365",    canonical: "/tools/microsoft-365-copilot-bangladesh" },
  { slug: "linkedin",      name: "LinkedIn Premium",     compareName: "LinkedIn Premium", canonical: null },
  // Audio & Special
  { slug: "elevenlabs",    name: "ElevenLabs",           compareName: "ElevenLabs",       canonical: "/tools/elevenlabs-bangladesh" },
  { slug: "vault",         name: "AI Tools Vault",       compareName: "AI Tools Vault",   canonical: null },
];

// Representative canonical catalog routes retain the actual product-detail
// contract. This preserves positive commercial coverage while the legacy aliases
// are deliberately noindex/evidence-review pages.
const CANONICAL_PRODUCT_EXPECTATIONS = [
  { path: "/tools/chatgpt-plus-bangladesh", name: "ChatGPT" },
  { path: "/tools/adobe-creative-cloud-bangladesh", name: "Adobe Creative Cloud" },
  { path: "/tools/runway-bangladesh", name: "Runway" },
  { path: "/tools/github-copilot-bangladesh", name: "GitHub Copilot" },
  { path: "/tools/elevenlabs-bangladesh", name: "ElevenLabs" },
];

// Representative purchasable catalog entries across the governed pricing
// categories. Pricing assertions follow catalog truth, not legacy editorial copy.
const PRICING_CATALOG_EXPECTATIONS = [
  "129 AI subscription plans",
  "ChatGPT Plus",
  "Adobe Creative Cloud",
  "Runway Standard",
  "ElevenLabs Starter",
  "GitHub Copilot Pro",
  "Coursera Plus",
  "Student Essentials Package",
];

// ── Tests ───────────────────────────────────────────────────────────────

test.describe("Homepage public truth", () => {
  test("homepage publishes only non-quarantined featured ChatGPT offers", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    await expect(page.getByTestId("button-offer-go-personal")).toBeVisible();
    await expect(page.getByTestId("button-offer-plus-personal-seat")).toBeVisible();
    await expect(page.getByTestId("button-offer-pro-personal")).toBeVisible();
    await expect(page.getByTestId("button-offer-plus-shared")).toHaveCount(0);
    await expect(page.getByTestId("button-offer-plus-premium-shared")).toHaveCount(0);
    await expect(page.getByTestId("button-offer-pro-premium-shared")).toHaveCount(0);
    await expect(body).not.toContainText(/5\s*[-–]\s*15\s*(?:min|minute)/i);
    await expect(body).not.toContainText(/30[- ]day\s+(?:replacement\s+)?warranty/i);
    await expect(body).not.toContainText(/24[- ]hour\s+replacement/i);
  });
});

test.describe("Legacy tool aliases — evidence review", () => {
  for (const tool of TOOLS) {
    test(`${tool.name} legacy alias is preserved but not commercially published`, async ({ page }) => {
      await page.goto(`${BASE}/tools/${tool.slug}`);
      await page.waitForLoadState("networkidle");

      const body = page.locator("body");
      await expect(body).not.toHaveText(/not found/i);
      await expect(page.locator("h1")).toHaveText("This commercial page is being re-verified");
      await expect(body).toContainText("re-checking provider policy", { ignoreCase: true });

      // Governance invariant: historical aliases must not expose a fixed BDT
      // commercial price or the fixed SLA/warranty claims removed by the hotfix.
      await expect(body).not.toContainText(/৳\s*[\d,]+/);
      await expect(body).not.toContainText(/5\s*[-–]\s*30\s*(?:min|minute)/i);
      await expect(body).not.toContainText(/30[- ]day\s+(?:replacement\s+)?warranty/i);
      await expect(body).not.toContainText(/24[- ]hour\s+replacement/i);

      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex\s*,\s*follow/i);

      if (tool.canonical) {
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          new RegExp(`${tool.canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$`)
        );
        await expect(page.getByRole("link", { name: "View current canonical page" })).toHaveAttribute("href", tool.canonical);
      } else {
        await expect(page.getByRole("link", { name: "Browse current catalog" })).toHaveAttribute("href", "/all-products");
      }
    });
  }
});

test.describe("Canonical product pages", () => {
  for (const product of CANONICAL_PRODUCT_EXPECTATIONS) {
    test(`${product.name} canonical route retains governed product detail`, async ({ page }) => {
      await page.goto(`${BASE}${product.path}`);
      await page.waitForLoadState("networkidle");

      const body = page.locator("body");
      await expect(body).not.toContainText("This commercial page is being re-verified");
      await expect(page.locator("h1, h2").first()).toContainText(product.name, { ignoreCase: true });
      await expect(body).toContainText("৳");
    });
  }
});

test.describe("Pricing Page", () => {
  test("/pricing renders governed catalog summary and representative plans", async ({ page }) => {
    await page.goto(`${BASE}/pricing`);
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    for (const expectedText of PRICING_CATALOG_EXPECTATIONS) {
      await expect(body).toContainText(expectedText, { ignoreCase: true });
    }
  });
});

test.describe("Compare Page", () => {
  test("/compare contains all 25 historical tool slugs", async ({ page }) => {
    await page.goto(`${BASE}/compare`);
    await page.waitForLoadState("networkidle");

    for (const tool of TOOLS) {
      await expect(page.locator("body")).toContainText(tool.slug, { ignoreCase: true });
    }
  });
});


test.describe("Contact public truth", () => {
  test("/contact is canonical and makes no fixed response or fulfillment promise", async ({ page }) => {
    await page.goto(`${BASE}/contact`);
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/contact\/?$/);
    await expect(page.getByTestId("button-submit-contact")).toContainText("Continue on WhatsApp");
    await expect(body).toContainText("Response timing varies", { ignoreCase: true });
    await expect(body).toContainText("Fulfillment timing confirmed", { ignoreCase: true });
    await expect(body).not.toContainText(/5\s*[-–]\s*15\s*(?:min|minute)/i);
    await expect(body).not.toContainText(/within\s+(?:a few\s+)?minutes/i);
    await expect(body).not.toContainText(/9\s*AM\s*[-–]\s*11\s*PM/i);
    await expect(body).not.toContainText(/30[- ]day\s+(?:replacement\s+)?warranty/i);
  });

  test("/start-a-project remains an alias of /contact", async ({ page }) => {
    await page.goto(`${BASE}/start-a-project`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/contact\/?$/);
    await expect(page.getByTestId("button-submit-contact")).toContainText("Continue on WhatsApp");
  });
});
