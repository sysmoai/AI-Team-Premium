import type { InsertProductRegistry } from "@shared/schema";

export const PRODUCT_SEED: InsertProductRegistry[] = [
  { slug: "chatgpt-plus", name: "ChatGPT Plus", company: "OpenAI", officialUrls: ["https://openai.com/chatgpt/pricing"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 20, baselineData: { model: "GPT-5" }, staleScore: "fresh" },
  { slug: "chatgpt-pro", name: "ChatGPT Pro", company: "OpenAI", officialUrls: ["https://openai.com/chatgpt/pricing"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 200, baselineData: { model: "GPT-5 Pro, o4" }, staleScore: "fresh" },
  { slug: "chatgpt-team", name: "ChatGPT Team", company: "OpenAI", officialUrls: ["https://openai.com/chatgpt/team"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 25, baselineData: {}, staleScore: "fresh" },
  { slug: "supergrok", name: "SuperGrok", company: "xAI", officialUrls: ["https://x.ai/grok"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 30, baselineData: { model: "Grok 4" }, staleScore: "fresh" },
  { slug: "perplexity-pro", name: "Perplexity Pro", company: "Perplexity", officialUrls: ["https://www.perplexity.ai/pro"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 20, baselineData: {}, staleScore: "fresh" },
  { slug: "google-ai-pro", name: "Google AI Pro", company: "Google", officialUrls: ["https://one.google.com/about/google-ai-plans"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 20, baselineData: { model: "Gemini 3" }, staleScore: "fresh" },
  { slug: "claude-pro", name: "Claude Pro", company: "Anthropic", officialUrls: ["https://www.anthropic.com/pricing"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 20, baselineData: { model: "Claude Sonnet 4.5, Opus 4" }, staleScore: "fresh" },
  { slug: "claude-team", name: "Claude Team", company: "Anthropic", officialUrls: ["https://www.anthropic.com/pricing"], auditFrequencyDays: 3, priority: "P0", baselinePriceUsd: 30, baselineData: {}, staleScore: "fresh" },
  { slug: "midjourney", name: "Midjourney", company: "Midjourney", officialUrls: ["https://www.midjourney.com/plans"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 10, baselineData: { model: "v7" }, staleScore: "fresh" },
  { slug: "netflix", name: "Netflix", company: "Netflix", officialUrls: ["https://www.netflix.com/signup/planform"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 16, baselineData: {}, staleScore: "fresh" },
  { slug: "canva-pro", name: "Canva Pro", company: "Canva", officialUrls: ["https://www.canva.com/pricing"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 15, baselineData: {}, staleScore: "fresh" },
  { slug: "grammarly", name: "Grammarly Premium", company: "Grammarly", officialUrls: ["https://www.grammarly.com/premium"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 12, baselineData: {}, staleScore: "fresh" },
  { slug: "spotify", name: "Spotify Premium", company: "Spotify", officialUrls: ["https://www.spotify.com/premium"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 12, baselineData: {}, staleScore: "fresh" },
  { slug: "youtube-premium", name: "YouTube Premium", company: "Google", officialUrls: ["https://www.youtube.com/premium"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 14, baselineData: {}, staleScore: "fresh" },
  { slug: "notion-ai", name: "Notion AI", company: "Notion", officialUrls: ["https://www.notion.so/pricing"], auditFrequencyDays: 7, priority: "P1", baselinePriceUsd: 10, baselineData: {}, staleScore: "fresh" },
  { slug: "leonardo-ai", name: "Leonardo AI", company: "Leonardo", officialUrls: ["https://leonardo.ai/pricing"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 12, baselineData: {}, staleScore: "fresh" },
  { slug: "runway-ml", name: "Runway ML", company: "Runway", officialUrls: ["https://runwayml.com/pricing"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 15, baselineData: { model: "Gen-4" }, staleScore: "fresh" },
  { slug: "kling-ai", name: "Kling AI", company: "Kuaishou", officialUrls: ["https://klingai.com/pricing"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 10, baselineData: { model: "Kling 2.5" }, staleScore: "fresh" },
  { slug: "pika", name: "Pika", company: "Pika Labs", officialUrls: ["https://pika.art/pricing"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 10, baselineData: {}, staleScore: "fresh" },
  { slug: "copilot-pro", name: "GitHub Copilot Pro", company: "GitHub", officialUrls: ["https://github.com/features/copilot/plans"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 10, baselineData: {}, staleScore: "fresh" },
  { slug: "google-one", name: "Google One", company: "Google", officialUrls: ["https://one.google.com/about/plans"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 2, baselineData: {}, staleScore: "fresh" },
  { slug: "apple-one", name: "Apple One", company: "Apple", officialUrls: ["https://www.apple.com/apple-one"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 20, baselineData: {}, staleScore: "fresh" },
  { slug: "merlin", name: "Merlin AI", company: "Foyer", officialUrls: ["https://www.getmerlin.in/pricing"], auditFrequencyDays: 14, priority: "P2", baselinePriceUsd: 19, baselineData: {}, staleScore: "fresh" },
];

export const RETIRED_MODELS = [
  "GPT-4o", "GPT-4.1", "GPT-4 Turbo", "GPT-4", "GPT-3.5",
  "o1", "o1-mini", "o1-preview", "o3", "o3-mini",
  "Grok 1", "Grok 2", "Grok 3",
  "Claude 1", "Claude 2", "Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku", "Claude 3.5 Sonnet", "Claude 3.5 Haiku", "Claude 3.7 Sonnet",
  "Gemini 1.0", "Gemini 1.5", "Gemini 2.0", "Gemini 2.5",
  "Midjourney v5", "Midjourney v6",
];
