/**
 * USD retail prices for AI tools (per month), as published on the official
 * international websites. Used by the "Compare to international price" widget
 * on each tool detail page.
 *
 * Last verified: 2026-05
 *
 * Key format: `${ToolDetail.name}::${plan.label}` — exact match.
 * Add new plans here; the widget gracefully hides if no entry is found.
 */
export const USD_RETAIL: Record<string, number> = {
  // ChatGPT (openai.com/chatgpt/pricing — Plus $20, Business $25/seat, Pro $200)
  "ChatGPT::ChatGPT Plus — Shared Seat": 20,
  "ChatGPT::ChatGPT Plus — Premium Shared": 20,
  "ChatGPT::ChatGPT Plus — Personal Seat": 20,
  "ChatGPT::ChatGPT Business — Shared": 25,
  "ChatGPT::ChatGPT Business — Premium Shared": 25,
  "ChatGPT::ChatGPT Business — Personal-like": 25,
  "ChatGPT::ChatGPT Pro — Premium Shared": 200,

  // Claude Pro (anthropic.com/pricing)
  "Claude Pro::Claude Pro — Shared": 20,
  "Claude Pro::Claude Pro — Personal": 20,

  // Gemini Advanced (one.google.com — Google AI Premium)
  "Gemini Advanced::Gemini Advanced — Shared": 20,
  "Gemini Advanced::Gemini Advanced — Personal": 20,

  // Google AI Pro (Google One AI Premium plan)
  "Google AI Pro::Google AI Pro — Shared Seat": 20,
  "Google AI Pro::Google AI Pro — Personal Seat": 20,

  // Grammarly Premium (grammarly.com/premium)
  "Grammarly Premium::Grammarly Premium": 30,

  // Canva Pro (canva.com/pricing — $14.99/mo)
  "Canva Pro::Canva Pro — Team Seat": 15,
  "Canva Pro::Canva Pro — Personal Upgrade": 15,

  // Midjourney (midjourney.com — Standard $30, Pro $60)
  "Midjourney::Midjourney — Shared": 30,
  "Midjourney::Midjourney — Personal": 60,

  // Perplexity Pro (perplexity.ai/pro)
  "Perplexity Pro::Perplexity Pro — Shared": 20,
  "Perplexity Pro::Perplexity Pro — Personal": 20,

  // Grok / SuperGrok (x.com/premium+ and grok.com — SuperGrok $30)
  "Grok Premium::SuperGrok — Shared (Recommended)": 30,
  "Grok Premium::SuperGrok — Personal Seat": 30,
  "SuperGrok::SuperGrok — Shared Seat": 30,
  "SuperGrok::SuperGrok — Personal Seat": 30,

  // GitHub Copilot (github.com/features/copilot — Individual Pro $10)
  "GitHub Copilot::GitHub Copilot — Private": 10,

  // AI Tools Vault (ChatGPT Plus $20 + Claude Pro $20 + Gemini Advanced $20)
  "AI Tools Vault::AI Tools Vault — Bundle": 60,

  // Leonardo AI (leonardo.ai/pricing — Artisan $24)
  "Leonardo AI::Leonardo Artisan — Shared": 24,
  "Leonardo AI::Leonardo Artisan — Personal": 24,

  // Runway ML (runwayml.com/pricing — Standard $15, Pro $35)
  "Runway ML::Runway Standard — Shared": 15,
  "Runway ML::Runway Pro — Personal": 35,

  // Kling AI (klingai.com — Standard $10, Pro $37)
  "Kling AI::Kling AI Standard — Shared": 10,
  "Kling AI::Kling AI Pro — Personal": 37,

  // Microsoft 365 Copilot (microsoft.com — $30/user/mo for Business)
  "Microsoft 365 Copilot::Microsoft 365 Copilot — Shared": 30,
  "Microsoft 365 Copilot::Microsoft 365 Copilot — Personal": 30,

  // LinkedIn Premium (linkedin.com/premium — Career $40, Business $70)
  "LinkedIn Premium::LinkedIn Premium Career": 40,
  "LinkedIn Premium::LinkedIn Premium Business": 70,

  // ElevenLabs Voice AI (elevenlabs.io/pricing — Creator $22, Independent $99)
  "ElevenLabs Voice AI::ElevenLabs Creator — Shared": 22,
  "ElevenLabs Voice AI::ElevenLabs Creator — Personal": 99,

  // Notion AI (notion.so/pricing — Plus + AI $20/seat)
  "Notion AI::Notion AI — Team Seat": 20,
  "Notion AI::Notion AI — Personal Seat": 20,
};

export function getUsdRetail(toolName: string, planLabel: string): number | undefined {
  return USD_RETAIL[`${toolName}::${planLabel}`];
}
