// e2e/verify-all.spec.ts — End-to-end tests for ALL 25 editorial tool pages
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:5000";

// ── All 25 editorial tool pages ─────────────────────────────────────────
const TOOLS = [
  // Chat / AI Assistants
  { slug: "chatgpt",     name: "ChatGPT",          compareName: "ChatGPT" },
  { slug: "claude",      name: "Claude",           compareName: "Claude" },
  { slug: "gemini",      name: "Gemini",           compareName: "Gemini" },
  { slug: "perplexity",  name: "Perplexity",       compareName: "Perplexity" },
  { slug: "grok",        name: "Grok",             compareName: "Grok" },
  { slug: "supergrok",   name: "SuperGrok",        compareName: "SuperGrok" },
  { slug: "google-ai-pro", name: "Google AI Pro",  compareName: "Google AI Pro" },
  { slug: "copilot",     name: "GitHub Copilot",   compareName: "Copilot" },
  // Image Generation
  { slug: "midjourney",  name: "Midjourney",       compareName: "Midjourney" },
  { slug: "leonardo",    name: "Leonardo AI",      compareName: "Leonardo AI" },
  { slug: "ideogram",    name: "Ideogram AI",      compareName: "Ideogram AI" },
  { slug: "freepik",     name: "Freepik",          compareName: "Freepik" },
  { slug: "firefly",     name: "Adobe Firefly",    compareName: "Adobe Firefly" },
  { slug: "adobe-cc",    name: "Adobe Creative Cloud", compareName: "adobe-cc" },
  { slug: "canva",       name: "Canva Pro",        compareName: "Canva Pro" },
  // Video Generation
  { slug: "runway",      name: "Runway ML",        compareName: "Runway ML" },
  { slug: "kling",       name: "Kling AI",         compareName: "Kling AI" },
  // Writing & Productivity
  { slug: "grammarly",   name: "Grammarly",        compareName: "Grammarly" },
  { slug: "notion",      name: "Notion AI",        compareName: "Notion AI" },
  { slug: "manus",       name: "Manus AI",         compareName: "Manus AI" },
  { slug: "poe",         name: "Poe AI",           compareName: "Poe AI" },
  { slug: "microsoft365", name: "Microsoft 365",   compareName: "Microsoft 365" },
  { slug: "linkedin",    name: "LinkedIn Premium", compareName: "LinkedIn Premium" },
  // Audio & Special
  { slug: "elevenlabs",  name: "ElevenLabs",       compareName: "ElevenLabs" },
  { slug: "vault",       name: "AI Tools Vault",   compareName: "AI Tools Vault" },
];

// Representative purchasable catalog entries across the governed pricing
// categories. Editorial tool names intentionally do not have a 1:1 mapping to
// current sellable plan names, so pricing assertions must follow catalog truth.
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
  test("/compare contains all 25 tool slugs", async ({ page }) => {
    await page.goto(`${BASE}/compare`);
    await page.waitForLoadState("networkidle");

    for (const tool of TOOLS) {
      await expect(page.locator("body")).toContainText(tool.slug, { ignoreCase: true });
    }
  });
});