import { useLocation } from "wouter";
import { config } from "./config";

const WA_BASE = "https://wa.me/8801533262758";

const PAGE_MESSAGES: Record<string, string> = {
  // ── ChatGPT individual plan pages ──────────────────────────────────────────
  "/chatgpt/plus-shared":            config.whatsappPlanTemplates["plus-shared"],
  "/chatgpt/plus-premium-shared":    config.whatsappPlanTemplates["plus-premium-shared"],
  "/chatgpt/plus-personal-seat":     config.whatsappPlanTemplates["plus-personal-seat"],
  "/chatgpt/business-shared":        config.whatsappPlanTemplates["business-shared"],
  "/chatgpt/business-premium-shared":config.whatsappPlanTemplates["business-premium-shared"],
  "/chatgpt/business-personal-like": config.whatsappPlanTemplates["business-personal-like"],
  "/chatgpt/pro-premium-shared":     config.whatsappPlanTemplates["pro-premium-shared"],

  // ── ChatGPT plans hub ──────────────────────────────────────────────────────
  "/chatgpt-plans": "Hi! I'm looking at ChatGPT plans from AI Team Premium BD. Which plan do you recommend for me?",

  // ── Other plan hub pages ───────────────────────────────────────────────────
  "/claude-plans":      "Hi! I want Claude Pro from AI Team Premium BD. What plans are available?",
  "/gemini-plans":      "Hi! I want Gemini Advanced from AI Team Premium BD. How do I subscribe?",
  "/grammarly-plans":   "Hi! I want Grammarly Premium from AI Team Premium BD. What are the options?",
  "/canva-plans":       "Hi! I want Canva Pro from AI Team Premium BD. Please guide me.",
  "/perplexity-plans":  "Hi! I want Perplexity Pro from AI Team Premium BD. How do I get access?",
  "/grok-plans":        "Hi! I want Grok from AI Team Premium BD. What plans do you offer?",
  "/ai-tools-vault":    "Hi! I'm interested in the AI Tools Vault bundle from AI Team Premium BD. What's included and how do I pay?",

  // ── AI tool detail pages ───────────────────────────────────────────────────
  "/tools/chatgpt":      "Hi! I want ChatGPT Plus/Pro from AI Team Premium BD. Which plan fits my needs?",
  "/tools/claude":       "Hi! I want Claude Pro from AI Team Premium BD. Please guide me on how to subscribe.",
  "/tools/gemini":       "Hi! I want Gemini Advanced from AI Team Premium BD. How do I get access?",
  "/tools/supergrok":    "Hi! I want SuperGrok (xAI) from AI Team Premium BD. Is it available? How do I order?",
  "/tools/grok":         "Hi! I want Grok Premium from AI Team Premium BD. What are the plans and pricing?",
  "/tools/midjourney":   "Hi! I want Midjourney from AI Team Premium BD. How do I subscribe?",
  "/tools/grammarly":    "Hi! I want Grammarly Premium from AI Team Premium BD. Please share payment details.",
  "/tools/canva":        "Hi! I want Canva Pro from AI Team Premium BD. How do I get access?",
  "/tools/perplexity":   "Hi! I want Perplexity Pro from AI Team Premium BD. How do I subscribe?",
  "/tools/copilot":      "Hi! I want GitHub Copilot from AI Team Premium BD. What plans are available?",
  "/tools/notion":       "Hi! I want Notion AI from AI Team Premium BD. How do I subscribe?",
  "/tools/microsoft365": "Hi! I want Microsoft 365 Copilot from AI Team Premium BD. Please guide me.",
  "/tools/linkedin":     "Hi! I want LinkedIn Premium from AI Team Premium BD. What are the options?",
  "/tools/elevenlabs":   "Hi! I want ElevenLabs Voice AI from AI Team Premium BD. How do I get access?",
  "/tools/google-ai-pro":"Hi! I want Google AI Pro from AI Team Premium BD. Is it available? How do I order?",
  "/tools/leonardo":     "Hi! I want Leonardo AI from AI Team Premium BD. How do I subscribe?",
  "/tools/runway":       "Hi! I want Runway ML from AI Team Premium BD. What plans do you offer?",
  "/tools/kling":        "Hi! I want Kling AI from AI Team Premium BD. How do I get access?",
  "/tools/vault":        "Hi! I'm interested in the AI Tools Vault bundle from AI Team Premium BD. What's included?",

  // ── Support / services hub ─────────────────────────────────────────────────
  "/support":   "Hi! I need AI support or a training session from AI Team Premium BD. Can you help me?",
  "/services":  "Hi! I need AI support or a training session from AI Team Premium BD. Can you help me?",

  // ── Digital service sub-pages ──────────────────────────────────────────────
  "/services/brand-design":      "Hi! I'm interested in Brand Design services from AI Team Premium BD. Can you share the packages?",
  "/services/web-development":   "Hi! I'm interested in Web Development from AI Team Premium BD. What do you offer?",
  "/services/digital-marketing": "Hi! I'm interested in Digital Marketing services from AI Team Premium BD. Please share details.",
  "/services/app-development":   "Hi! I'm interested in App Development from AI Team Premium BD. Can we discuss my project?",
  "/services/ai-ops-sprint":     "Hi! I'm interested in the AI Ops Sprint service from AI Team Premium BD. How does it work?",

  // ── AI subscriptions catalog ───────────────────────────────────────────────
  "/ai-subscriptions": "Hi! I'm browsing AI subscriptions on AI Team Premium BD. Can you help me pick the right tool?",
};

export function useContextualWhatsAppUrl(override?: string): string {
  const [location] = useLocation();
  if (override) {
    return `${WA_BASE}?text=${encodeURIComponent(override)}`;
  }
  const msg = PAGE_MESSAGES[location];
  return msg ? `${WA_BASE}?text=${encodeURIComponent(msg)}` : config.whatsappGeneral;
}
