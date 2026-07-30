const WA_BASE = "https://wa.me/8801533262758";
const WA_GENERAL_TEXT = encodeURIComponent(
  "Hi! I want help from AI Team Premium.\n\n1) My name:\n2) What I need (ChatGPT / Claude / Support / Service / Other):\n3) Preferred payment: bKash / Nagad / Bank Transfer\n4) How urgent (today / this week):\n5) Please confirm availability and payment details."
);

export const config = {
  brand: "AI Team Premium",
  phone: "+8801533262758",
  phoneDisplay: "+880 1533-262758",

  whatsapp: "+8801533262758",
  whatsappUrl: WA_BASE,
  whatsappGeneral: `${WA_BASE}?text=${WA_GENERAL_TEXT}`,

  messenger: "https://www.facebook.com/messages/t/61586742067282/",
  fbPage: "https://www.facebook.com/profile.php?id=61586742067282",
  fbGroup: "https://www.facebook.com/groups/333019393218410",
  instagram: "https://www.instagram.com/ai_team_premium/",

  supportFormUrl: "/start-a-project",
  lastVerified: "2026-05-25",
  officialPricingUrl: "https://chatgpt.com/pricing/",

  whatsappPlanTemplates: {
    "plus-shared":            "Hi! I want to order 'ChatGPT Plus Shared' from AI Team Premium. Please share payment details (bKash/Nagad).",
    "plus-premium-shared":    "Hi! I want to order 'ChatGPT Plus Premium Shared'. How do I pay and get access?",
    "plus-personal-seat":     "Hi! I want my own ChatGPT Plus account — 'Plus Personal Seat'. Is it available?",
    "business-shared":        "Hi! I want the 'ChatGPT Business Shared' plan. Please guide me.",
    "business-premium-shared":"Hi! I want 'ChatGPT Business Premium Shared'. What are the next steps?",
    "business-personal-like": "Hi! I want 'ChatGPT Business Personal'. How do I get started?",
    "pro-premium-shared":     "Hi! I want the most powerful plan — 'ChatGPT Pro Premium Shared'. Is it ready?"
  },

  whatsappSupportTemplates: {
    "entry":      "Hi! I need a 1-hour AI Support session from AI Team Premium. When are you available?",
    "student":    "Hi! I'm a student and I want the 'Student Smart Study Pack'. Please guide me.",
    "freelancer": "Hi! I'm a freelancer and I want the 'Freelancer Fast Delivery Pack'. Please guide me.",
    "business":   "Hi! I want 'Business AI Setup' for my team. When can we schedule a Google Meet?",
    "hourly":     "Hi! I want to book a 1-hour live AI support session. Are you available?"
  },

  whatsappToolTemplates: {
    "claude-shared": "Hi! I want to order Claude Pro Shared from AI Team Premium. Please share payment details.",
    "claude-personal": "Hi! I want my own Claude Pro Personal account. Is it available?",
    "gemini": "Hi! I want Gemini Advanced from AI Team Premium. How do I order?",
    "google-ai-pro": "Hi! I want Google AI Pro. Please guide me through the process.",
    "supergrok": "Hi! I want SuperGrok. What's the next step?",
    "perplexity": "Hi! I want Perplexity Pro. Please share payment details.",
    "midjourney": "Hi! I want Midjourney. How do I get started?",
    "leonardo": "Hi! I want Leonardo AI. Please provide payment options.",
    "runway": "Hi! I want Runway ML. Is it available now?",
    "kling": "Hi! I want Kling AI. Please share details.",
    "canva": "Hi! I want Canva Pro. How do I order?",
    "grammarly": "Hi! I want Grammarly Premium. Please guide me.",
    "notion": "Hi! I want Notion AI. Is it available?",
    "copilot": "Hi! I want GitHub Copilot. Please share details.",
    "microsoft365": "Hi! I want Microsoft 365 Copilot. What are the options?",
    "linkedin": "Hi! I want LinkedIn Premium. Please share pricing for Bangladesh.",
    "elevenlabs": "Hi! I want ElevenLabs. How do I get started?",
    "poe": "Hi! I want Poe AI subscription. Please guide me.",
    "firefly": "Hi! I want Adobe Firefly Pro. What's the pricing?",
    "ideogram": "Hi! I want Ideogram AI. Please share details.",
    "freepik": "Hi! I want Freepik. Is it available?",
    "adobe-cc": "Hi! I want Adobe Creative Cloud. What's the pricing in Bangladesh?",
    "vault": "Hi! I want the AI Tools Vault Bundle — ChatGPT + Claude + Gemini. Please guide me."
  }
};
