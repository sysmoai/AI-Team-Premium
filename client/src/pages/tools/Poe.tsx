import { ToolDetail } from "@/components/ToolDetail";
import { MessageCircle } from "lucide-react";

// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "poe",
  "category": "chat",
  "priceBdt": 799,
  "priceLabel": "৳799/mo",
  "model": "GPT-5.x, Claude-Opus, Gemini, 100+ models",
  "contextWindow": "Varies by model (up to 200K)",
  "multimodal": "Text, images, files, code",
  "banglaQuality": "⭐⭐⭐⭐ (good)",
  "speed": "Varies by model",
  "accuracy": "⭐⭐⭐⭐ (varies by model)",
  "pricingTier": "Budget",
  "brand": "Quora (Poe)",
  "tagline": "One subscription, 100+ AI models",
  "toolPath": "/tools/poe",
  "iconName": "MessageCircle",
  "accent": "#6366F1",
  "bestUseCase": "Multi-model access in one platform",
  "bestFor": [
    "Access to ChatGPT, Claude, Gemini in one place",
    "Custom bot creation",
    "Model comparison & switching",
    "Budget-friendly multi-model access"
  ],
  "weaknesses": [
    "Credit-based system limits flagship model usage",
    "No memory across sessions",
    "Limited native features vs direct subscriptions"
  ]
} as const;

const POE_USE_CASES = [
  {
    emoji: "🔄",
    title: "Multi-Model Comparison",
    who: "AI researchers, power users, content creators",
    makes: "Compare outputs from GPT-5.x, Claude-Opus, and Gemini in one interface",
    timeSaved: "Managing 3 separate subscriptions → 1 Poe account",
    prompt: "Ask the same question to GPT-5.x, Claude-Opus, and Gemini simultaneously — compare their answers side by side.",
  },
  {
    emoji: "🤖",
    title: "Custom Bot Creation",
    who: "Developers, educators, business owners",
    makes: "Create custom bots with specific system prompts, knowledge bases, and model selection",
    timeSaved: "Building custom AI tools without coding",
    prompt: "Create a bot: 'Bangladeshi Tax Assistant' — knows local tax laws, answers in Bangla, uses Claude model, has a knowledge base of NBR rules.",
  },
  {
    emoji: "💰",
    title: "Cost-Effective AI Access",
    who: "Students, freelancers, budget-conscious users",
    makes: "Access to premium models at a fraction of individual subscription costs",
    timeSaved: "Saves ৳4,000+/month vs individual subscriptions",
    prompt: "Student needing ChatGPT, Claude, and Gemini — Poe gives all three at ৳799/mo instead of ৳4,500+ for separate subscriptions.",
  },
];

const POE_FAQS = [
  { q: "Poe AI কী? এটি কীভাবে কাজ করে?", a: "Poe (Platform for Open Exploration) হলো Quora-এর AI platform যেখানে ১০০+ AI model একসাথে ব্যবহার করা যায়। GPT-5.x, Claude, Gemini সহ সব major model এক জায়গায়।" },
  { q: "Poe AI-এর দাম কত?", a: "AI Team Premium থেকে Poe AI পাওয়া যায় ৳৭৯৯/মাসে। bKash বা Nagad-এ পেমেন্ট করুন, ৫-১৫ মিনিটের মধ্যে access দেওয়া হয়।" },
  { q: "Poe-এর মাধ্যমে কোন মডেলগুলো ব্যবহার করা যায়?", a: "GPT-5.x, Claude-Opus, Gemini, Mistral, Llama, এবং ১০০+ অন্যান্য মডেল। Poe-এর Subscriber plan-এ সব মডেলের access আছে।" },
];

export default function PoePage() {
  return (
    <ToolDetail
      name="Poe AI"
      tagline="100+ AI Models, One Subscription"
      description="Poe by Quora gives you access to 100+ AI models including GPT-5.x, Claude-Opus, Gemini, and more — all in one platform. Create custom bots, compare models side by side, and pay in BDT via bKash/Nagad."
      accentColor="#6366F1"
      icon={MessageCircle}
      features={[
        "Access to 100+ AI models in one platform",
        "GPT-5.x, Claude-Opus, Gemini, and more",
        "Create custom bots with specific prompts",
        "Compare model outputs side by side",
        "Web + mobile app access",
        "5-15 min delivery · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Poe AI — Shared",
          price: "৳799",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Shared account" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "WhatsApp 24/7" },
          ],
        },
      ]}
      useCases={POE_USE_CASES}
      competitorRows={[]}
      extendedFaqs={POE_FAQS}
    />
  );
}