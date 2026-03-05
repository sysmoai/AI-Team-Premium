const WA_BASE = "https://wa.me/8801533262758";
const WA_GENERAL_TEXT = encodeURIComponent(
  "Hi! I want help from AI Team Premium BD.\n\n1) My name:\n2) What I need (ChatGPT / Claude / Support / Service / Other):\n3) Budget range (optional):"
);

export const config = {
  brand: "AI Team Premium BD",
  phone: "+8801533262758",
  phoneDisplay: "+880 1533-262758",

  whatsapp: "+8801533262758",
  whatsappUrl: WA_BASE,
  whatsappGeneral: `${WA_BASE}?text=${WA_GENERAL_TEXT}`,

  messenger: "https://www.facebook.com/messages/t/61586742067282/",
  fbPage: "https://www.facebook.com/profile.php?id=61586742067282",
  fbGroup: "https://www.facebook.com/groups/333019393218410",
  instagram: "https://www.instagram.com/ai_team_premium_bd/",

  supportFormUrl: "/start-a-project",
  lastVerified: "2026-03-05",
  officialPricingUrl: "https://chatgpt.com/pricing/",

  whatsappPlanTemplates: {
    "plus-shared":            "Hi! I want to order 'ChatGPT Plus Shared (৳399/mo)' from AI Team Premium BD. Please share payment details (bKash/Nagad).",
    "plus-premium-shared":    "Hi! I want to order 'ChatGPT Plus Premium Shared (৳950/mo)'. How do I pay and get access?",
    "plus-personal-seat":     "Hi! I want my own ChatGPT Plus account — 'Plus Personal Seat (৳2,950/mo)'. Is it available?",
    "business-shared":        "Hi! I want the 'ChatGPT Business Shared (৳699/mo)' plan. Please guide me.",
    "business-premium-shared":"Hi! I want 'ChatGPT Business Premium Shared (৳1,299/mo)'. What are the next steps?",
    "business-personal-like": "Hi! I want 'ChatGPT Business Personal-like (৳3,899/mo)'. How do I get started?",
    "pro-premium-shared":     "Hi! I want the most powerful plan — 'ChatGPT Pro Premium Shared (৳4,500/mo)'. Is it ready?"
  },

  whatsappSupportTemplates: {
    "entry":      "Hi! I need a 1-hour AI Support session (৳799) from AI Team Premium BD. When are you available?",
    "student":    "Hi! I'm a student and I want the 'Student Smart Study Pack' (৳1,999). Please guide me.",
    "freelancer": "Hi! I'm a freelancer and I want the 'Freelancer Fast Delivery Pack' (৳4,999). Please guide me.",
    "business":   "Hi! I want 'Business AI Setup' (৳12,999) for my team. When can we schedule a Google Meet?",
    "hourly":     "Hi! I want to book a 1-hour live AI support session (৳799). Are you available?"
  }
};
