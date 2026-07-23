// e2e/verify-all.spec.ts — End-to-end tests for ALL 25 tool pages
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:5000";

// ── All 25 tools ─────────────────────────────────────────────────────────
const TOOLS = [
  // Chat / AI Assistants
  { slug: "chatgpt",     name: "ChatGPT",          pricingName: "ChatGPT Plus",     compareName: "ChatGPT" },
  { slug: "claude",      name: "Claude",           pricingName: "Claude",           compareName: "Claude" },
  { slug: "gemini",      name: "Gemini",           pricingName: "Gemini Advanced",  compareName: "Gemini" },
  { slug: "perplexity",  name: "Perplexity",       pricingName: "Perplexity Pro",   compareName: "Perplexity" },
  { slug: "grok",        name: "Grok",             pricingName: "Grok",             compareName: "Grok" },
  { slug: "supergrok",   name: "SuperGrok",        pricingName: "SuperGrok",        compareName: "SuperGrok" },
  { slug: "google-ai-pro", name: "Google AI Pro",  pricingName: "Google AI Pro",    compareName: "Google AI Pro" },
  { slug: "copilot",     name: "GitHub Copilot",   pricingName: "GitHub Copilot",   compareName: "Copilot" },
  // Image Generation
  { slug: "midjourney",  name: "Midjourney",       pricingName: "Midjourney",       compareName: "Midjourney" },
  { slug: "leonardo",    name: "Leonardo AI",      pricingName: "Leonardo AI",      compareName: "Leonardo AI" },
  { slug: "ideogram",    name: "Ideogram AI",      pricingName: "Ideogram AI",      compareName: "Ideogram AI" },
  { slug: "freepik",     name: "Freepik",          pricingName: "Freepik",          compareName: "Freepik" },
  { slug: "firefly",     name: "Adobe Firefly",    pricingName: "Adobe Firefly",    compareName: "Adobe Firefly" },
  { slug: "adobe-cc",    name: "Adobe Creative Cloud", pricingName: "Adobe CC",         compareName: "adobe-cc" },
  { slug: "canva",       name: "Canva Pro",        pricingName: "Canva Pro",        compareName: "Canva Pro" },
  // Video Generation
  { slug: "runway",      name: "Runway ML",        pricingName: "Runway ML",        compareName: "Runway ML" },
  { slug: "kling",       name: "Kling AI",         pricingName: "Kling AI",         compareName: "Kling AI" },
  // Writing & Productivity
  { slug: "grammarly",   name: "Grammarly",        pricingName: "Grammarly",        compareName: "Grammarly" },
  { slug: "notion",      name: "Notion AI",        pricingName: "Notion AI",        compareName: "Notion AI" },
  { slug: "manus",       name: "Manus AI",         pricingName: "Manus AI",         compareName: "Manus AI" },
  { slug: "poe",         name: "Poe AI",           pricingName: "Poe AI",           compareName: "Poe AI" },
  { slug: "microsoft365", name: "Microsoft 365",   pricingName: "Microsoft 365",    compareName: "Microsoft 365" },
  { slug: "linkedin",    name: "LinkedIn Premium", pricingName: "LinkedIn Premium", compareName: "LinkedIn Premium" },
  // Audio & Special
  { slug: "elevenlabs",  name: "ElevenLabs",       pricingName: "ElevenLabs",       compareName: "ElevenLabs" },
  { slug: "vault",       name: "AI Tools Vault",   pricingName: "AI Tools Vault",   compareName: "AI Tools Vault" },
];

// ── Tests ───────────────────────────────────────────────────────────────

test.describe("All 25 Tool Pages", () => {
  for (const tool of TOOLS) {
    test(`${tool.name} page renders at /tools/${tool.slug}`, async ({ page }) => {
      await page.goto(`${BASE}/tools/${tool.slug}`);
      await page.waitForLoadState("networkidle");

      // Page loads without crash
      await expect(page.locator("body")).not.toHaveText(/not found/i);

      // Product name is visible in the H1 or H2
      const heading = page.locator("h1, h2").first();
      await expect(heading).toContainText(tool.name, { ignoreCase: true });

      // Page has pricing info (৳ symbol)
      await expect(page.locator("body")).toContainText("৳");
    });
  }
});

test.describe("Pricing Page", () => {
  test("/pricing contains all 25 tool entries", async ({ page }) => {
    await page.goto(`${BASE}/pricing`);
    await page.waitForLoadState("networkidle");

    for (const tool of TOOLS) {
      await expect(page.locator("body")).toContainText(tool.pricingName, { ignoreCase: true });
    }
  });
});

test.describe("Compare Page", () => {
  test("/compare contains all 25 tool slugs", async ({ page }) => {
    await page.goto(`${BASE}/compare`);
    await page.waitForLoadState("networkidle");

    for (const tool of TOOLS) {
      await expect(page.locator("body")).toContainText(tool.slug, { ignoreCase: true });
    }
  });
});