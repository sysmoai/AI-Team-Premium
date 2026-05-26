/**
 * Snapshot of customer-facing model names / version strings rendered on each
 * tool page. Used by the audit engine's retired-model watchlist (Phase 5) so
 * we catch when a page advertises a deprecated model that the brand site
 * forgot to retire. Keep in sync with /tools/* pages.
 */
export const TOOL_PAGE_CONTENT: Record<string, string> = {
  "chatgpt-plus": "ChatGPT Plus GPT-5 OpenAI o4-mini Advanced Voice DALL-E 3",
  "chatgpt-pro": "ChatGPT Pro GPT-5 Pro o4 reasoning unlimited",
  "chatgpt-team": "ChatGPT Team GPT-5 workspace collaboration",
  "claude-pro": "Claude Pro Sonnet 4.5 Opus 4 Anthropic 200k context Projects",
  "claude-team": "Claude Team Anthropic Sonnet 4.5",
  "google-ai-pro": "Google AI Pro Gemini 3 Gemini 3 Pro Veo 3 NotebookLM 2TB storage",
  "perplexity-pro": "Perplexity Pro GPT-5 Claude Sonnet 4.5 Gemini 3 Pro search",
  "supergrok": "SuperGrok xAI Grok 4 Grok 4 Heavy uncensored DeepSearch",
  "midjourney": "Midjourney v7 image generation Discord web",
  "canva-pro": "Canva Pro Magic Studio Magic Design AI templates",
  "grammarly": "Grammarly Premium AI rewrite tone detector plagiarism",
  "spotify": "Spotify Premium ad-free downloads",
  "youtube-premium": "YouTube Premium ad-free background play",
  "netflix": "Netflix HD 4K premium streaming",
  "notion-ai": "Notion AI Q&A AI Connectors workspace",
  "leonardo-ai": "Leonardo AI Flux Phoenix image generation",
  "runway-ml": "Runway Gen-4 video AI text to video",
  "kling-ai": "Kling 2.5 AI video generation Kuaishou",
  "pika": "Pika Labs 2.2 AI video generation",
  "copilot-pro": "GitHub Copilot Pro GPT-5 Claude Sonnet 4.5 code completion",
  "google-one": "Google One 2TB storage Gemini",
  "apple-one": "Apple One iCloud Music TV+ Arcade Fitness+",
  "merlin": "Merlin AI GPT-5 Claude Sonnet 4.5 Gemini 3 unified",
};
