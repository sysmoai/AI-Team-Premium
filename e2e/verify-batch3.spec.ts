// e2e/verify-batch3.spec.ts — End-to-end tests for Batch 3 tool pages
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:5000";

// ── Batch 3 tools ──────────────────────────────────────────────────────
const TOOLS = [
  {
    slug: "ideogram",
    name: "Ideogram AI",
    expectedTitle: /Ideogram/,
    expectedFeatures: [
      "text rendering",
      "Poster",
      "logo",
      "bKash",
      "Nagad",
      "5-15 min",
    ],
  },
  {
    slug: "freepik",
    name: "Freepik",
    expectedTitle: /Freepik|Magnific/,
    expectedFeatures: [
      "200M",
      "stock",
      "Sora",
      "Suno",
      "bKash",
      "Nagad",
    ],
  },
  {
    slug: "adobe-cc",
    name: "Adobe Creative Cloud",
    expectedTitle: /Adobe Creative Cloud|Photoshop/,
    expectedFeatures: [
      "Photoshop",
      "Lightroom",
      "Firefly",
      "Express",
      "bKash",
      "Nagad",
    ],
  },
  {
    slug: "leonardo",
    name: "Leonardo AI",
    expectedTitle: /Leonardo/,
    expectedFeatures: [
      "AI image",
      "Flux",
      "Phoenix",
      "bKash",
      "Nagad",
    ],
  },
  {
    slug: "canva",
    name: "Canva Pro",
    expectedTitle: /Canva/,
    expectedFeatures: [
      "Canva",
      "Magic Studio",
      "bKash",
      "Nagad",
    ],
  },
];

// ── Tests ───────────────────────────────────────────────────────────────

test.describe("Batch 3 — Tool Pages", () => {
  for (const tool of TOOLS) {
    test(`${tool.name} page renders at /tools/${tool.slug}`, async ({ page }) => {
      await page.goto(`${BASE}/tools/${tool.slug}`);
      await page.waitForLoadState("networkidle");

      // 1. Page loads without crash
      await expect(page.locator("body")).not.toHaveText(/not found/i);

      // 2. Product name is visible in the content
      await expect(page.locator("h1, h2").first()).toContainText(tool.expectedTitle);

      // 3. All features are listed somewhere on the page
      for (const feature of tool.expectedFeatures) {
        await expect(page.locator("body")).toContainText(feature, { ignoreCase: true });
      }
    });
  }
});

test.describe("Batch 3 — Compare & Pricing pages", () => {
  test("/pricing contains all 5 tool entries", async ({ page }) => {
    await page.goto(`${BASE}/pricing`);
    await page.waitForLoadState("networkidle");

    for (const tool of TOOLS) {
      await expect(page.locator("body")).toContainText(tool.name, { ignoreCase: true });
    }
  });

  test("/compare contains all 5 tool entries", async ({ page }) => {
    await page.goto(`${BASE}/compare`);
    await page.waitForLoadState("networkidle");

    for (const tool of TOOLS) {
      await expect(page.locator("body")).toContainText(tool.name, { ignoreCase: true });
    }
  });
});
