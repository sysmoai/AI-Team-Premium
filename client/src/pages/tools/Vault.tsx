import { ToolDetail } from "@/components/ToolDetail";
import { Zap } from "lucide-react";

const VAULT_USE_CASES = [
  {
    emoji: "🎓",
    title: "Student AI Power User",
    who: "University students, HSC & varsity researchers",
    makes: "Use ChatGPT for coding assignments, Claude for thesis writing, Gemini for research with citations",
    timeSaved: "৳5,000 tutoring + research tools → ৳1,990 all-in-one",
    prompt: "ChatGPT: debug my Python assignment. Claude: write my literature review. Gemini Deep Research: find cited sources on the topic.",
  },
  {
    emoji: "🖥️",
    title: "Full-Stack Developer Workflow",
    who: "Freelance developers, software engineers",
    makes: "ChatGPT writes code, Claude reviews architecture, Gemini searches for latest documentation",
    timeSaved: "3 AI subscriptions (৳3,500) → ৳1,990 bundle",
    prompt: "ChatGPT: scaffold a full MERN stack app. Claude: review security and code quality. Gemini: find latest React 19 documentation and changes.",
  },
  {
    emoji: "✍️",
    title: "Content Agency Workflow",
    who: "Content writers, marketing agencies, freelance copywriters",
    makes: "ChatGPT generates draft ideas, Claude refines and polishes, Gemini verifies facts with sources",
    timeSaved: "Inconsistent 1-model output → 3-model quality pipeline",
    prompt: "ChatGPT: generate 10 blog topic ideas for a Bangladeshi fintech brand. Claude: write the best one in full. Gemini: verify all statistics cited.",
  },
  {
    emoji: "💼",
    title: "Business Intelligence Hub",
    who: "Startup founders, business analysts, consultants",
    makes: "Market research (Gemini), strategy documents (Claude), financial models (ChatGPT)",
    timeSaved: "Consultant fees ৳50,000 → ৳1,990/mo",
    prompt: "Gemini Deep Research: latest Bangladesh e-commerce data. Claude: write a strategic analysis. ChatGPT: build a 3-year financial projection model in Excel.",
  },
  {
    emoji: "🎨",
    title: "Creative Production Suite",
    who: "Designers, social media managers, creative directors",
    makes: "ChatGPT for scripts/copy, Claude for brand storytelling, Gemini for image generation (Imagen 4)",
    timeSaved: "3 separate subscriptions → one bundle order",
    prompt: "Claude: write a compelling brand story for a Bangladeshi artisan brand. ChatGPT: create 30 social media caption variations. Gemini Imagen 4: generate product photography.",
  },
  {
    emoji: "🏥",
    title: "Healthcare & Medical Education",
    who: "Medical students, doctors, pharmacy students",
    makes: "ChatGPT explains medical concepts, Claude analyses case studies, Gemini searches latest clinical guidelines",
    timeSaved: "Research hours → minutes, with verified sources",
    prompt: "Gemini: latest WHO guideline on antibiotic resistance 2025. Claude: write a patient education document. ChatGPT: create study flashcards from this pharmacology chapter.",
  },
  {
    emoji: "🌐",
    title: "Model-Hopping for Best Output",
    who: "AI power users, researchers, professionals",
    makes: "Compare outputs from 3 models for any task — pick the best answer for each use case",
    timeSaved: "One inferior model → best answer from 3 models",
    prompt: "Ask the same question to all 3: 'What is the best growth strategy for a Bangladeshi SME in 2025?' — compare ChatGPT, Claude, and Gemini responses.",
  },
];

const VAULT_COMPETITOR_ROWS = [
  { feature: "ChatGPT Plus", thisProduct: "✅ Included", chatgpt: "✅ Yes (separate ৳399/mo)", claude: "❌ No", gemini: "❌ No" },
  { feature: "Claude Pro", thisProduct: "✅ Included", chatgpt: "❌ No", claude: "✅ Yes (separate ৳599/mo)", gemini: "❌ No" },
  { feature: "Gemini Advanced", thisProduct: "✅ Included", chatgpt: "❌ No", claude: "❌ No", gemini: "✅ Yes (separate ৳449/mo)" },
  { feature: "Combined Value", thisProduct: "৳1,447/mo if separate", chatgpt: "GPT-4o only", claude: "Claude only", gemini: "Gemini only" },
  { feature: "Bundle Savings", thisProduct: "Save ৳800–1,500/mo", chatgpt: "No bundle", claude: "No bundle", gemini: "No bundle" },
  { feature: "Single WhatsApp Order", thisProduct: "✅ One message delivers all 3", chatgpt: "Separate orders", claude: "Separate orders", gemini: "Separate orders" },
  { feature: "Consolidated Support", thisProduct: "✅ One WhatsApp thread", chatgpt: "Separate support", claude: "Separate support", gemini: "Separate support" },
  { feature: "Image Generation", thisProduct: "✅ GPT-image-1 + Imagen 4", chatgpt: "GPT-image-1 only", claude: "❌ None", gemini: "Imagen 4 only" },
  { feature: "Deep Research", thisProduct: "✅ All 3 tools combined", chatgpt: "ChatGPT only", claude: "Claude only", gemini: "Gemini only" },
  { feature: "Context Windows", thisProduct: "128K + 200K + 1M tokens", chatgpt: "128K only", claude: "200K only", gemini: "1M only" },
  { feature: "Voice Modes", thisProduct: "ChatGPT AVM + Gemini Live", chatgpt: "Advanced Voice only", claude: "❌ No voice", gemini: "Gemini Live only" },
  { feature: "Delivery Time", thisProduct: "All 3 within 6 hours", chatgpt: "5–15 min", claude: "5–15 min", gemini: "5–15 min" },
  { feature: "AITP Bundle Price", thisProduct: "৳1,990/mo", chatgpt: "৳399/mo only", claude: "৳599/mo only", gemini: "৳449/mo only" },
];

const VAULT_FAQS = [
  { q: "What exactly is included in the AI Tools Vault bundle?", a: "The Vault bundle includes: (1) ChatGPT Plus — GPT-4o, Advanced Voice Mode, image generation, Canvas, Deep Research, 5-hour video analysis; (2) Claude Pro — Claude Sonnet 3.5, Extended Thinking, 200K context, document analysis; (3) Gemini Advanced — Gemini 2.5 Pro, 1M context, Deep Research, Gemini Live voice, Imagen 4 image generation. All three in a single WhatsApp order." },
  { q: "How much do I save with the Vault bundle vs buying separately?", a: "Separately: ChatGPT Plus (৳499) + Claude Pro (৳599) + Gemini Advanced (৳449) = ৳1,447/month. The Vault bundle is ৳1,990/month. You pay ৳543 more, but get dedicated consolidated support, priority delivery for all three, and a single WhatsApp channel for all issues. For professionals who need all three tools daily, the convenience alone justifies the difference." },
  { q: "Why would I need all three AI tools — aren't they all similar?", a: "Each model has different strengths. ChatGPT: best ecosystem, custom GPTs, plugins, and code interpreter. Claude: best long-form writing quality and 200K context for documents. Gemini: real-time Google data, Workspace integration, and Imagen 4 image generation. Power users often use all three — ChatGPT for coding, Claude for writing, Gemini for research. The Vault lets you use the best model for each task." },
  { q: "How are the three tools delivered after payment?", a: "After payment confirmation on WhatsApp, we deliver all three tools within a maximum of 6 hours total. Typically ChatGPT and Gemini shared seats are delivered within 5–15 minutes, and Claude within 30 minutes. We deliver each tool's credentials separately via WhatsApp as they're confirmed. The entire process usually completes in 1–2 hours." },
  { q: "Can I use all three AI tools on the same device?", a: "Yes. ChatGPT, Claude, and Gemini all run in the browser (chat.openai.com, claude.ai, gemini.google.com) and have mobile apps. You can have all three open in different browser tabs or switch between apps freely. Some users open all three simultaneously to compare answers to the same question." },
  { q: "What is the warranty for each tool in the bundle?", a: "Each of the three tools in the Vault bundle comes with a separate 30-day replacement warranty. If any single tool stops working (account issue, access problem), we replace that tool independently — you don't have to reorder the whole bundle. Our consolidated WhatsApp support handles issues for all three tools through a single channel." },
  { q: "Does the Vault bundle include Gemini's 2TB Google Drive storage?", a: "The Vault bundle includes the Shared Seat versions of all three tools. The Gemini Shared Seat gives you full Gemini Advanced AI features but does not include the 2TB personal Google Drive storage (which requires a Personal Seat upgrade to your own Google account). For the personal Google Drive storage, you would need the Gemini Personal plan." },
  { q: "Which tool in the Vault is best for which tasks?", a: "Best for coding: ChatGPT (Canvas, Code Interpreter, GitHub Copilot-style completion). Best for writing long documents: Claude (200K context, superior prose). Best for research with sources: Gemini (Deep Research, Google Search integration). Best for image generation: Gemini (Imagen 4, ~50 images/day) or ChatGPT (GPT-image-1). Best for reasoning: Claude (Extended Thinking) or ChatGPT (o3-mini). Best for voice: ChatGPT (Advanced Voice Mode)." },
  { q: "Is the AI Tools Vault suitable for a business team in Bangladesh?", a: "The Vault bundle provides Shared Seats — they are set up for individual professional or student use. For a business team needing multiple seats across multiple team members, we recommend ordering multiple bundles (one per person) or contacting us for custom business arrangements. The bundle is most suited for individual power users or small freelance teams." },
  { q: "Can I upgrade any of the three tools to a Personal Seat later?", a: "Yes. At any time, you can upgrade any of the three Vault tools to a Personal Seat (your own account). Contact us on WhatsApp and we'll provide a price for the upgrade. You continue using the other shared tools while we set up the personal version. Many users start with the Vault bundle and upgrade the tools they use most." },
  { q: "Are there any usage limits on the Vault bundle tools?", a: "The tools in the Vault bundle are the standard Shared Seat tiers with all Pro features enabled. Usage limits match the standard Pro tiers for each tool: ChatGPT Plus (unlimited GPT-4o for normal use), Claude Pro (5× more than free), Gemini Advanced (unlimited for normal use). Heavy-use power users who send 200+ long messages per day on a single tool may experience occasional slowdowns during peak hours." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "vault",
  "category": "chat",
  "priceBdt": 1999,
  "priceLabel": "৳1,999/mo",
  "model": "10+ AI tools combined",
  "contextWindow": "Varies per tool",
  "multimodal": "Text, image, code, design",
  "banglaQuality": "⭐⭐⭐⭐⭐",
  "speed": "Tool-dependent",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Bundle (best value)",
  "brand": "AITP bundle",
  "tagline": "10+ premium AI tools in one bundle",
  "toolPath": "/tools/vault",
  "iconName": "Layers",
  "accent": "#2563EB",
  "bestUseCase": "Heavy AI users, freelancers, startups",
  "bestFor": [
    "Access to ChatGPT Plus, Claude, Gemini, Perplexity together",
    "Massive savings vs buying each separately",
    "Includes Midjourney, Grammarly, Canva and more",
    "Single bKash/Nagad payment",
    "Best for power users + small agencies"
  ],
  "weaknesses": [
    "Shared seats only — not personal accounts",
    "Some tools rotate based on demand"
  ]
} as const;

export default function Vault() {
  return (
    <ToolDetail
      name="AI Tools Vault"
      tagline="The Ultimate Bundle"
      description="ChatGPT Plus + Claude Pro + Gemini Advanced — all three top AI tools in one order, one payment, one WhatsApp channel. Bangladesh's simplest way to run all three AI models. Pay via bKash/Nagad."
      accentColor="#F59E0B"
      icon={Zap}
      features={[
        "ChatGPT Plus — GPT-4o, Canvas, Advanced Voice Mode, Deep Research, Custom GPTs",
        "Claude Pro — Claude Sonnet 3.5 with Extended Thinking & 200K context",
        "Gemini Advanced — Gemini 2.5 Pro with Deep Research & 1M context",
        "Imagen 4 image generation (Gemini) + GPT-image-1 (ChatGPT)",
        "Three voice modes: ChatGPT AVM, Gemini Live, both in Bangla & English",
        "Single WhatsApp order — all three delivered together",
        "One consolidated support channel for all three tools",
        "Priority delivery (max 6 hours total for all three)",
        "30-day replacement warranty on every tool",
        "Pay in BDT — bKash, Nagad or Bank Transfer",
        "No international credit card needed",
      ]}
      plans={[
        {
          label: "AI Tools Vault — Bundle",
          price: "৳1,990",
          period: "/mo",
          delivery: "Max 6 hr delivery",
          type: "Bundle",
          specs: [
            { label: "Tools included", value: "ChatGPT + Claude + Gemini" },
            { label: "Delivery", value: "Max 6 hours total" },
            { label: "Support", value: "Priority WhatsApp" },
          ],
        },
      ]}
      specTables={[
        {
          title: "What Each Tool Unlocks",
          emoji: "🔓",
          tier2Label: "Vault Bundle (৳1,990/mo)",
          tier3Label: "Personal Bundle (৳3,999/mo)",
          rows: [
            { label: "ChatGPT Plus", free: "GPT-3.5 only (free)", pro: "GPT-4o + image gen + Canvas", premium: "GPT-4o (dedicated account)" },
            { label: "Claude Pro", free: "Claude Haiku (limited)", pro: "Sonnet 4 + Extended Thinking", premium: "Sonnet 4 (dedicated account)" },
            { label: "Gemini Advanced", free: "Gemini Flash (limited)", pro: "2.5 Pro + Imagen 4 + Deep Research", premium: "2.5 Pro (dedicated account)" },
            { label: "Context Windows Combined", free: "~8K tokens max", pro: "128K + 200K + 1M tokens", premium: "128K + 200K + 1M (all private)" },
            { label: "Image Generation", free: "None", pro: "GPT-image-1 + Imagen 4", premium: "GPT-image-1 + Imagen 4" },
            { label: "Voice Modes", free: "None", pro: "Advanced Voice + Gemini Live", premium: "Advanced Voice + Gemini Live" },
            { label: "Deep Research", free: "None", pro: "All 3 tools", premium: "All 3 tools (dedicated limits)" },
            { label: "Document Analysis", free: "None", pro: "PDFs via all 3 tools", premium: "PDFs via all 3 tools" },
          ],
        },
        {
          title: "Bundle vs Buying Separately",
          emoji: "💰",
          tier2Label: "Vault Bundle (৳1,990/mo)",
          tier3Label: "Personal Bundle (৳3,999/mo)",
          rows: [
            { label: "ChatGPT Plus (separate)", free: "৳399/mo", pro: "✅ Included (shared)", premium: "✅ Included (personal)" },
            { label: "Claude Pro (separate)", free: "৳599/mo", pro: "✅ Included (shared)", premium: "✅ Included (personal)" },
            { label: "Gemini Advanced (separate)", free: "৳449/mo", pro: "✅ Included (shared)", premium: "✅ Included (personal)" },
            { label: "Total if Separate", free: "৳1,447/mo (shared)", pro: "✅ All for ৳1,990", premium: "✅ All for ৳3,999 (personal)" },
            { label: "Support Channels", free: "3 separate tickets", pro: "1 unified WhatsApp", premium: "1 unified WhatsApp (priority)" },
            { label: "Delivery Speed", free: "3 separate orders", pro: "One order, max 6 hrs", premium: "One order, max 2 hrs" },
            { label: "Warranty", free: "Per tool", pro: "30-day per tool", premium: "30-day per tool" },
            { label: "Payment Methods", free: "3 separate payments", pro: "One bKash / Nagad payment", premium: "One bKash / Nagad payment" },
          ],
        },
      ]}
      useCases={VAULT_USE_CASES}
      competitorRows={VAULT_COMPETITOR_ROWS}
      extendedFaqs={VAULT_FAQS}
    />
  );
}
