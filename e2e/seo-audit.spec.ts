// e2e/seo-audit.spec.ts — Full on-page SEO audit
import { test, expect } from "@playwright/test";

const BASE = "http://localhost:5000";

// All URLs from sitemap
const SITEMAP_URLS = [
  "/", "/about", "/ai-subscriptions", "/ai-tools-vault",
  "/canva-plans", "/chatgpt-plans",
  "/chatgpt/go-shared", "/chatgpt/go-personal", "/chatgpt/plus-shared",
  "/chatgpt/plus-premium-shared", "/chatgpt/plus-personal-seat",
  "/chatgpt/business-shared", "/chatgpt/business-premium-shared",
  "/chatgpt/business-personal-like", "/chatgpt/pro-premium-shared",
  "/claude-plans", "/gemini-plans", "/grammarly-plans", "/grok-plans",
  "/perplexity-plans",
  "/pricing", "/start-a-project", "/support", "/services",
  "/services/ai-ops-sprint", "/services/app-development",
  "/services/brand-design", "/services/digital-marketing",
  "/services/web-development",
  "/refund-policy", "/privacy-policy", "/terms",
  "/compare",
  "/compare/canva-vs-midjourney", "/compare/chatgpt-vs-perplexity",
  "/compare/claude-vs-chatgpt", "/compare/claude-vs-gemini",
  "/compare/claude-vs-perplexity", "/compare/copilot-vs-chatgpt",
  "/compare/elevenlabs-vs-runway", "/compare/gemini-vs-chatgpt",
  "/compare/google-ai-pro-vs-chatgpt", "/compare/grammarly-vs-chatgpt",
  "/compare/grok-vs-chatgpt", "/compare/microsoft365-vs-notion",
  "/compare/midjourney-vs-chatgpt", "/compare/midjourney-vs-leonardo",
  "/compare/notion-vs-chatgpt", "/compare/runway-vs-kling",
  "/compare/supergrok-vs-chatgpt", "/compare/vault-vs-chatgpt",
  "/tools/chatgpt", "/tools/claude", "/tools/gemini", "/tools/perplexity",
  "/tools/grok", "/tools/supergrok", "/tools/google-ai-pro",
  "/tools/copilot", "/tools/midjourney", "/tools/leonardo",
  "/tools/ideogram", "/tools/freepik", "/tools/firefly", "/tools/adobe-cc",
  "/tools/canva", "/tools/runway", "/tools/kling", "/tools/grammarly",
  "/tools/notion", "/tools/manus", "/tools/poe",
  "/tools/microsoft365", "/tools/linkedin", "/tools/elevenlabs",
  "/tools/vault",
];

interface SEOData {
  path: string;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescLength: number;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  h1Count: number;
  h1Texts: string[];
  h2Count: number;
  h2Texts: string[];
  jsonLd: string[];
  pageText: string;
  textLength: number;
  httpStatus: number;
}

const results: SEOData[] = [];
const issues: string[] = [];

test.describe("SEO Audit — All Sitemap URLs", () => {
  for (const urlPath of SITEMAP_URLS) {
    test(`${urlPath} — SEO meta tags and structure`, async ({ page }) => {
      const url = `${BASE}${urlPath}`;

      // Navigate
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(500); // Let React hydrate + set meta tags

      // Get SEO data from the page
      const data = await page.evaluate(() => {
        const getMeta = (selector: string) => {
          const el = document.querySelector<HTMLMetaElement>(selector);
          return el?.content?.trim() ?? "";
        };
        const getLink = (selector: string) => {
          const el = document.querySelector<HTMLLinkElement>(selector);
          return el?.href?.trim() ?? "";
        };

        const h1s = Array.from(document.querySelectorAll("h1")).map((h) => h.textContent?.trim() ?? "");
        const h2s = Array.from(document.querySelectorAll("h2")).map((h) => h.textContent?.trim() ?? "");

        // Extract JSON-LD
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const jsonLd = scripts.map((s) => {
          try {
            const parsed = JSON.parse(s.textContent || "{}");
            return parsed["@type"] || "unknown";
          } catch {
            return "invalid-json";
          }
        });

        const body = document.querySelector("body");
        const pageText = body?.textContent?.trim() ?? "";

        return {
          title: document.title,
          titleLength: document.title.length,
          metaDescription: getMeta('meta[name="description"]'),
          metaDescLength: getMeta('meta[name="description"]').length,
          canonical: getLink('link[rel="canonical"]'),
          ogTitle: getMeta('meta[property="og:title"]'),
          ogDescription: getMeta('meta[property="og:description"]'),
          ogImage: getMeta('meta[property="og:image"]'),
          ogUrl: getMeta('meta[property="og:url"]'),
          twitterCard: getMeta('meta[name="twitter:card"]'),
          twitterTitle: getMeta('meta[name="twitter:title"]'),
          twitterDescription: getMeta('meta[name="twitter:description"]'),
          twitterImage: getMeta('meta[name="twitter:image"]'),
          h1Count: h1s.length,
          h1Texts: h1s,
          h2Count: h2s.length,
          h2Texts: h2s,
          jsonLd,
          pageText,
          textLength: pageText.length,
        };
      });

      data.path = urlPath;
      data.httpStatus = response?.status() ?? 0;

      // ── Validation checks ─────────────────────────────────────────────
      const pageIssues: string[] = [];

      // HTTP status
      if (data.httpStatus !== 200) {
        pageIssues.push(`HTTP ${data.httpStatus} (not 200)`);
      }

      // Title
      if (!data.title) {
        pageIssues.push("MISSING <title>");
      } else if (data.title.includes("undefined") || data.title.includes("null")) {
        pageIssues.push(`Title contains placeholder: "${data.title}"`);
      } else if (data.titleLength < 15) {
        pageIssues.push(`Short title (${data.titleLength} chars): "${data.title}"`);
      } else if (data.titleLength > 70) {
        pageIssues.push(`Long title (${data.titleLength} chars, max 60 recommended): "${data.title}"`);
      }
      if (data.title && !data.title.includes("AI Team Premium")) {
        pageIssues.push(`Title missing brand suffix: "${data.title}"`);
      }

      // Meta description
      if (!data.metaDescription) {
        pageIssues.push("MISSING meta description");
      } else if (data.metaDescLength < 50) {
        pageIssues.push(`Short meta description (${data.metaDescLength} chars): "${data.metaDescription}"`);
      } else if (data.metaDescLength > 170) {
        pageIssues.push(`Long meta description (${data.metaDescLength} chars, max 160 recommended)`);
      }

      // Canonical
      if (!data.canonical) {
        pageIssues.push("MISSING canonical URL");
      } else if (!data.canonical.startsWith("https://aiteampremium.com")) {
        pageIssues.push(`Wrong canonical domain: "${data.canonical}"`);
      }

      // OG tags
      if (!data.ogTitle) pageIssues.push("MISSING og:title");
      if (!data.ogDescription) pageIssues.push("MISSING og:description");
      if (!data.ogImage) pageIssues.push("MISSING og:image");
      if (!data.ogUrl) pageIssues.push("MISSING og:url");
      if (data.ogUrl && data.ogUrl !== data.canonical && data.canonical) {
        pageIssues.push(`og:url "${data.ogUrl}" != canonical "${data.canonical}"`);
      }
      if (data.ogImage && data.ogImage.includes("unsplash")) {
        pageIssues.push("og:image is generic Unsplash photo (not brand-specific)");
      }

      // Twitter card
      if (!data.twitterCard) pageIssues.push("MISSING twitter:card");
      if (!data.twitterTitle) pageIssues.push("MISSING twitter:title");
      if (!data.twitterDescription) pageIssues.push("MISSING twitter:description");
      if (!data.twitterImage) pageIssues.push("MISSING twitter:image");

      // Headings
      if (data.h1Count === 0) {
        pageIssues.push("MISSING <h1>");
      } else if (data.h1Count > 1) {
        pageIssues.push(`${data.h1Count} <h1> tags (should be 1): ${data.h1Texts.join(" | ")}`);
      }
      if (data.h2Count === 0 && urlPath !== "/privacy-policy" && urlPath !== "/terms" && urlPath !== "/refund-policy") {
        pageIssues.push("MISSING <h2> tags");
      }

      // JSON-LD
      if (data.jsonLd.length === 0) {
        pageIssues.push("MISSING JSON-LD structured data");
      }

      // Content
      if (data.textLength < 100) {
        pageIssues.push(`Thin content (${data.textLength} chars)`);
      }

      // ── Record ──
      results.push(data);
      if (pageIssues.length > 0) {
        issues.push(`${urlPath}: ${pageIssues.join("; ")}`);
      }

      // Assert — fail the test if any issues found
      expect(pageIssues, `${urlPath} — SEO issues`).toEqual([]);
    });
  }
});

test.afterAll(() => {
  // Print summary
  console.log(`\n=== SEO AUDIT SUMMARY ===`);
  console.log(`Pages checked: ${results.length}`);
  console.log(`Pages with issues: ${issues.length}`);

  // Title length stats
  const titleLengths = results.map((r) => r.titleLength);
  console.log(`Title length: min=${Math.min(...titleLengths)} max=${Math.max(...titleLengths)} avg=${(titleLengths.reduce((a, b) => a + b, 0) / titleLengths.length).toFixed(0)}`);

  // Meta description length stats
  const descLengths = results.map((r) => r.metaDescLength);
  console.log(`Meta description length: min=${Math.min(...descLengths)} max=${Math.max(...descLengths)} avg=${(descLengths.reduce((a, b) => a + b, 0) / descLengths.length).toFixed(0)}`);

  // H1 stats
  const h1Counts = results.map((r) => r.h1Count);
  const pagesWithNoH1 = results.filter((r) => r.h1Count === 0).map((r) => r.path);
  const pagesWithMultipleH1 = results.filter((r) => r.h1Count > 1).map((r) => `${r.path} (${r.h1Count}): ${r.h1Texts.join(" | ")}`);

  if (pagesWithNoH1.length > 0) console.log(`Pages with NO H1: ${pagesWithNoH1.join(", ")}`);
  if (pagesWithMultipleH1.length > 0) console.log(`Pages with MULTIPLE H1: ${pagesWithMultipleH1.join("; ")}`);

  // H2 stats
  const pagesWithNoH2 = results.filter((r) => r.h2Count === 0).map((r) => r.path);
  if (pagesWithNoH2.length > 0) console.log(`Pages with NO H2: ${pagesWithNoH2.join(", ")}`);

  // JSON-LD stats
  const pagesWithNoJsonLd = results.filter((r) => r.jsonLd.length === 0).map((r) => r.path);
  if (pagesWithNoJsonLd.length > 0) console.log(`Pages with NO JSON-LD: ${pagesWithNoJsonLd.join(", ")}`);

  // Duplicate title check
  const titles = results.map((r) => ({ path: r.path, title: r.title }));
  const titleMap = new Map<string, string[]>();
  for (const t of titles) {
    if (!titleMap.has(t.title)) titleMap.set(t.title, []);
    titleMap.get(t.title)!.push(t.path);
  }
  for (const [title, paths] of titleMap) {
    if (paths.length > 1) {
      console.log(`DUPLICATE title "${title}" on ${paths.length} pages: ${paths.join(", ")}`);
    }
  }

  // Wrong title formatting check
  for (const r of results) {
    if (r.title.endsWith("| AI Team Premium")) {
      console.log(`WRONG format (extra |): ${r.path} — "${r.title}"`);
    }
    if (r.title.endsWith("AI Team Premium")) {
      // Check if properly formatted
      if (!r.title.includes(" | AI Team Premium") && r.title !== "AI Team Premium") {
        console.log(`UNUSUAL title format: ${r.path} — "${r.title}"`);
      }
    }
  }

  // Print all issues
  if (issues.length > 0) {
    console.log(`\n=== ALL ISSUES ===`);
    for (const issue of issues) {
      console.log(`  ${issue}`);
    }
  }
});