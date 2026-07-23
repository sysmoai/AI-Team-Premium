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
  "/chatgpt-plans": "Hi! I'm looking at ChatGPT plans from AI Team Premium. Which plan do you recommend for me? (Budget: ৳499–৳4,500/mo)",

  // ── Other plan hub pages ───────────────────────────────────────────────────
  "/claude-plans":      "Hi! I want Claude Pro from AI Team Premium. What plans are available? (Premium Shared ৳1,495/mo · Personal ৳2,990/mo)",
  "/gemini-plans":      "Hi! I want Gemini Advanced from AI Team Premium. How do I subscribe? (Shared ৳899/mo · Personal ৳2,990/mo)",
  "/grammarly-plans":   "Hi! I want Grammarly Premium from AI Team Premium. What are the options? (৳499/mo)",
  "/canva-plans":       "Hi! I want Canva Pro from AI Team Premium. Please guide me. (৳599/mo)",
  "/perplexity-plans":  "Hi! I want Perplexity Pro from AI Team Premium. How do I get access? (Shared ৳799/mo)",
  "/grok-plans":        "Hi! I want Grok from AI Team Premium. What plans do you offer? (Shared ৳699/mo)",
  "/ai-tools-vault":    "Hi! I'm interested in the AI Tools Vault bundle from AI Team Premium. What's included and how do I pay? (৳1,990/mo)",

  // ── AI tool detail pages ───────────────────────────────────────────────────
  "/tools/chatgpt":      "Hi! I want ChatGPT Plus/Pro from AI Team Premium. Which plan fits my needs? (Starts at ৳499/mo)",
  "/tools/claude":       "Hi! I want Claude Pro from AI Team Premium. Please guide me on how to subscribe. (Starts at ৳1,495/mo)",
  "/tools/gemini":       "Hi! I want Gemini Advanced from AI Team Premium. How do I get access? (Starts at ৳899/mo)",
  "/tools/supergrok":    "Hi! I want SuperGrok (xAI) from AI Team Premium. Is it available? How do I order? (Starts at ৳499/mo)",
  "/tools/grok":         "Hi! I want Grok Premium from AI Team Premium. What are the plans and pricing? (Starts at ৳499/mo)",
  "/tools/midjourney":   "Hi! I want Midjourney from AI Team Premium. How do I subscribe? (Starts at ৳1,299/mo)",
  "/tools/grammarly":    "Hi! I want Grammarly Premium from AI Team Premium. Please share payment details. (৳499/mo)",
  "/tools/canva":        "Hi! I want Canva Pro from AI Team Premium. How do I get access? (Starts at ৳599/mo)",
  "/tools/perplexity":   "Hi! I want Perplexity Pro from AI Team Premium. How do I subscribe? (Starts at ৳799/mo)",
  "/tools/copilot":      "Hi! I want GitHub Copilot from AI Team Premium. What plans are available? (Starts at ৳999/mo)",
  "/tools/notion":       "Hi! I want Notion AI from AI Team Premium. How do I subscribe? (Starts at ৳450/mo)",
  "/tools/microsoft365": "Hi! I want Microsoft 365 Copilot from AI Team Premium. Please guide me. (Starts at ৳899/mo)",
  "/tools/linkedin":     "Hi! I want LinkedIn Premium from AI Team Premium. What are the options? (Starts at ৳999/mo)",
  "/tools/elevenlabs":   "Hi! I want ElevenLabs Voice AI from AI Team Premium. How do I get access? (Starts at ৳699/mo)",
  "/tools/google-ai-pro":"Hi! I want Google AI Pro from AI Team Premium. Is it available? How do I order? (Starts at ৳449/mo)",
  "/tools/leonardo":     "Hi! I want Leonardo AI from AI Team Premium. How do I subscribe? (Starts at ৳349/mo)",
  "/tools/runway":       "Hi! I want Runway ML from AI Team Premium. What plans do you offer? (Starts at ৳899/mo)",
  "/tools/kling":        "Hi! I want Kling AI from AI Team Premium. How do I get access? (Starts at ৳599/mo)",
  "/tools/vault":        "Hi! I'm interested in the AI Tools Vault bundle from AI Team Premium. What's included? (৳1,990/mo)",

  // ── Support / services hub ─────────────────────────────────────────────────
  "/support":   "Hi! I need AI support or a training session from AI Team Premium. Can you help me?",
  "/services":  "Hi! I need AI support or a training session from AI Team Premium. Can you help me?",

  // ── Digital service sub-pages ──────────────────────────────────────────────
  "/services/brand-design":      "Hi! I'm interested in Brand Design services from AI Team Premium. Can you share the packages?",
  "/services/web-development":   "Hi! I'm interested in Web Development from AI Team Premium. What do you offer?",
  "/services/digital-marketing": "Hi! I'm interested in Digital Marketing services from AI Team Premium. Please share details.",
  "/services/app-development":   "Hi! I'm interested in App Development from AI Team Premium. Can we discuss my project?",
  "/services/ai-ops-sprint":     "Hi! I'm interested in the AI Ops Sprint service from AI Team Premium. How does it work?",

  // ── AI subscriptions catalog ───────────────────────────────────────────────
  "/ai-subscriptions": "Hi! I'm browsing AI subscriptions on AI Team Premium. Can you help me pick the right tool?",
};

export function useContextualWhatsAppUrl(override?: string): string {
  const [location] = useLocation();
  if (override) {
    return `${WA_BASE}?text=${encodeURIComponent(override)}`;
  }
  const msg = PAGE_MESSAGES[location];
  return msg ? `${WA_BASE}?text=${encodeURIComponent(msg)}` : config.whatsappGeneral;
}