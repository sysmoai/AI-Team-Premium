import { ToolDetail } from "@/components/ToolDetail";
import { Cpu } from "lucide-react";

const GROK_USE_CASES = [
  {
    emoji: "📡",
    title: "Real-Time Social Intelligence",
    who: "Marketers, journalists, brand managers",
    makes: "Live X/Twitter trend analysis — what's happening in Bangladesh and globally right now",
    timeSaved: "Hours of social monitoring → 2-minute DeepSearch summary",
    prompt: "DeepSearch: বাংলাদেশে আজকের trending X posts বিশ্লেষণ করো — কোন topics viral, কোন brands mention হচ্ছে, এবং sentiment কেমন",
  },
  {
    emoji: "🎨",
    title: "Unlimited Aurora Image Generation",
    who: "Content creators, marketers, designers",
    makes: "Unlimited photorealistic AI images — social media visuals, product mockups, concept art",
    timeSaved: "Stock photo library ৳5,000/mo → ৳0 (unlimited Aurora)",
    prompt: "Aurora: a confident Bangladeshi entrepreneur presenting at a startup demo day, modern Dhaka coworking space, cinematic lighting, 4K photorealistic",
  },
  {
    emoji: "💻",
    title: "Advanced Code Development",
    who: "Software developers, CS students, freelance programmers",
    makes: "Full project scaffolding, architecture advice, and bug fixing in 1M token context",
    timeSaved: "Senior developer consultation ৳10,000 → ৳0",
    prompt: "Grok 3: design the complete backend architecture for a Bangladesh-based fintech app — payment gateway (bKash/Nagad API), user auth, transaction history, compliance with Bangladesh Bank regulations",
  },
  {
    emoji: "🔬",
    title: "Scientific & Mathematical Reasoning",
    who: "Researchers, engineers, university students",
    makes: "Step-by-step solutions to complex physics, mathematics, and engineering problems",
    timeSaved: "Expert tutor ৳3,000/hour → Think mode included",
    prompt: "Think mode: derive the optimal antenna array configuration for a 5G base station covering a 10km² area in Dhaka — consider building density, interference, spectral efficiency",
  },
  {
    emoji: "📊",
    title: "Business Intelligence with Live Data",
    who: "Startup founders, e-commerce owners, business analysts",
    makes: "Real-time competitor analysis using X posts, news, and web data synthesis",
    timeSaved: "Market research agency ৳50,000 → DeepSearch in 5 minutes",
    prompt: "DeepSearch: আমার Daraz competitor-দের সর্বশেষ pricing, promotions, এবং customer feedback X-এ বিশ্লেষণ করো — actionable insights দাও",
  },
  {
    emoji: "🗣️",
    title: "Bangla Voice AI Conversations",
    who: "Professionals, students, anyone needing hands-free AI",
    makes: "Natural real-time voice conversations in both Bangla and English without a keyboard",
    timeSaved: "English tutor ৳1,000/hour → voice practice 24/7",
    prompt: "Grok voice mode: আমি IELTS speaking test-এর জন্য practice করতে চাই — Part 1, 2, 3 questions করো এবং আমার answers-এ feedback দাও",
  },
  {
    emoji: "🎬",
    title: "AI Video Generation",
    who: "YouTubers, TikTok creators, social media managers",
    makes: "Short AI video clips from text prompts — intros, transitions, social reels",
    timeSaved: "Video production ৳15,000 → ৳0 (Grok Video included)",
    prompt: "Grok Video: generate a 5-second cinematic intro — a glowing neural network morphing into the Bangladeshi map, gold and blue, dramatic orchestral feel",
  },
];

const GROK_COMPETITOR_ROWS = [
  { feature: "AI Model", thisProduct: "Grok 3 (xAI)", chatgpt: "GPT-4o / o3-mini", claude: "Claude Sonnet 3.5", gemini: "Gemini 2.5 Pro" },
  { feature: "Context Window", thisProduct: "1M tokens", chatgpt: "128K tokens", claude: "200K tokens", gemini: "1M tokens" },
  { feature: "Real-time X/Twitter Data", thisProduct: "✅ Full live access", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Image Generation (Aurora)", thisProduct: "✅ Unlimited (SuperGrok)", chatgpt: "GPT-image-1 (limited)", claude: "❌ None", gemini: "✅ Imagen 4" },
  { feature: "Video Generation", thisProduct: "✅ Grok Video (beta)", chatgpt: "Limited (Sora add-on)", claude: "❌ None", gemini: "✅ Veo 2" },
  { feature: "Deep Reasoning (Think)", thisProduct: "✅ Think mode", chatgpt: "✅ o3-mini", claude: "✅ Extended Thinking", gemini: "✅ Flash Thinking" },
  { feature: "DeepSearch (web + X)", thisProduct: "✅ Web + live X data", chatgpt: "✅ Web only", claude: "✅ Web only", gemini: "✅ Google web" },
  { feature: "Voice Mode (Bangla)", thisProduct: "✅ Yes, Bangla supported", chatgpt: "✅ Advanced Voice Mode", claude: "❌ No voice", gemini: "✅ Gemini Live" },
  { feature: "Knowledge Cutoff", thisProduct: "✅ None (always live)", chatgpt: "Apr 2024", claude: "Apr 2024", gemini: "✅ Live (Google)" },
  { feature: "Document/File Upload", thisProduct: "✅ Images, PDFs", chatgpt: "✅ Full (many types)", claude: "✅ Full (200K ctx)", gemini: "✅ Full (many types)" },
  { feature: "Code Generation Quality", thisProduct: "⭐⭐⭐⭐⭐", chatgpt: "⭐⭐⭐⭐⭐", claude: "⭐⭐⭐⭐⭐", gemini: "⭐⭐⭐⭐" },
  { feature: "Bangla Language Quality", thisProduct: "⭐⭐⭐⭐", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐⭐", gemini: "⭐⭐⭐⭐⭐" },
  { feature: "AITPBD Shared Price", thisProduct: "৳499/mo (SuperGrok)", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
];

const GROK_FAQS = [
  { q: "What is SuperGrok and how is it different from regular Grok?", a: "SuperGrok ($30/month from xAI) is the premium tier that unlocks unlimited Aurora image generation, video generation with Grok Video, Big Brain deep reasoning mode, and higher message limits. Regular Grok is limited to 10 images/month with no video. AITPBD sells SuperGrok Shared at ৳499/month." },
  { q: "How many images can I generate with Grok/SuperGrok?", a: "With the SuperGrok Shared plan (৳499/mo), you get unlimited Aurora image generation — no daily or monthly cap. Aurora produces photorealistic, high-resolution images comparable to Midjourney and DALL·E 3." },
  { q: "Does Grok/SuperGrok have real-time X (Twitter) data?", a: "Yes — this is Grok's unique killer feature. DeepSearch integrates live X/Twitter data with full web search, giving you real-time social media intelligence that ChatGPT, Claude, and Gemini cannot provide." },
  { q: "What is Grok Think mode and when should I use it?", a: "Think mode is Grok's extended reasoning system — similar to ChatGPT's o3-mini or Claude's Extended Thinking. When you enable Think mode, Grok takes more time to reason through a problem step-by-step before answering. Use it for complex math, scientific problems, coding architecture decisions, and any task where accuracy matters more than speed. In Think mode, Grok shows its reasoning process, which you can follow and learn from." },
  { q: "How is Grok's Aurora image quality compared to Midjourney?", a: "Aurora produces photorealistic images at a quality level competitive with Midjourney v6 and DALL·E 3. The main advantage of Aurora over Midjourney is that it's included unlimited in the SuperGrok plan — you don't need to manage GPU minutes or credits. For artistic/stylistic work, Midjourney v7 still has a slight quality edge. For photorealistic images where unlimited volume matters, Aurora is the better value proposition." },
  { q: "Can SuperGrok generate videos?", a: "Yes. SuperGrok includes Grok Video — xAI's text-to-video and image-to-video generator (currently in beta). It produces short clips typically 5–10 seconds. This feature is evolving rapidly. Both Shared and Personal SuperGrok plans from AITPBD include Grok Video access, though the beta nature means occasional feature updates and changes." },
  { q: "What is the 1M token context window useful for in Bangladesh?", a: "The 1,000,000 token context window means you can paste an entire codebase (hundreds of files), a full book, multiple research papers, or months of business documents into a single Grok conversation. For Bangladeshi developers reviewing large legacy codebases, researchers analysing entire dissertation libraries, or businesses feeding historical transaction data — this massive context changes what's possible with AI." },
  { q: "Does Grok understand Bangla language well?", a: "Grok 3 produces good Bangla text — better than early versions of Grok. You can write prompts in Bangla and receive Bangla responses. For Bangladeshi users, Grok's Bangla quality is on par with ChatGPT Plus. However, for superior Bangla academic writing, Claude and Gemini still have a slight edge. Grok's strength is in its real-time data access and image generation, not Bangla language leadership." },
  { q: "Is the Grok Personal Seat worth it vs Shared?", a: "The Personal Seat (৳3,990/mo) activates SuperGrok on your own X/Twitter account — giving you the Premium badge on X, full tweet analytics, longer post visibility, and the most private AI usage. The Shared plan (৳499/mo) gives full SuperGrok AI features (Grok 3, Aurora, Grok Video) without the X account upgrade. For most AI users, the Shared plan at ৳499 provides excellent value. For active Twitter/X power users who also want the X Premium benefits, the Personal plan makes sense." },
  { q: "How is SuperGrok delivered from AITPBD?", a: "For the Shared plan (৳499/mo): we deliver credentials within 5–15 minutes of payment confirmation on WhatsApp. For the Personal plan (৳3,990/mo): we need your X/Twitter account email and process the SuperGrok upgrade within 2–4 hours. Both plans come with a 30-day replacement warranty and 24/7 WhatsApp support in Bangla and English." },
  { q: "Is Grok better than ChatGPT for Bangladesh users?", a: "SuperGrok has specific advantages: unlimited Aurora image generation (ChatGPT limits this), real-time X/Twitter data intelligence (no ChatGPT equivalent), and Grok Video generation. ChatGPT has a larger ecosystem of custom GPTs, plugins, and Canvas. For visual content creators and social media researchers who need live X data, SuperGrok wins on unique features. For document analysis, coding workflows, and general AI tasks, ChatGPT and Claude remain strong alternatives." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "grok",
  "category": "chat",
  "priceBdt": 999,
  "priceLabel": "৳999/mo",
  "model": "Grok 4 + Grok 4 Heavy",
  "contextWindow": "256K tokens",
  "multimodal": "Text, image, voice",
  "banglaQuality": "⭐⭐⭐",
  "speed": "Fast",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "xAI",
  "tagline": "Grok 4 — uncensored & X-native",
  "toolPath": "/tools/supergrok",
  "iconName": "Sparkles",
  "accent": "#1DA1F2",
  "bestUseCase": "Power users wanting fewer guardrails",
  "bestFor": [
    "Less restrictive answers on edgy topics",
    "Real-time X (Twitter) data and trends",
    "Grok 4 Heavy multi-agent reasoning",
    "DeepSearch live web research"
  ],
  "weaknesses": [
    "Most expensive of the chat AIs",
    "Smaller ecosystem of apps & plugins"
  ]
} as const;

export default function Grok() {
  return (
    <ToolDetail
      name="Grok Premium"
      tagline="by xAI — in Bangladesh"
      description="xAI's Grok 3 with real-time X/internet data, DeepSearch, Aurora image generation, and Think mode. Upgrade to SuperGrok (৳499/mo) for unlimited Aurora images and video generation. Pay with bKash/Nagad in Bangladesh."
      accentColor="#7C3AED"
      icon={Cpu}
      features={[
        "Grok 3 — xAI's most capable model",
        "Think mode: extended chain-of-thought reasoning",
        "DeepSearch: real-time web + X (Twitter) data synthesis",
        "Aurora image generation — unlimited photorealistic AI images (SuperGrok)",
        "Grok Video — text-to-video generation (beta)",
        "1,000,000 token context window for long documents and codebases",
        "Real-time information without knowledge cut-off",
        "Code generation, analysis and debugging",
        "Voice mode — natural conversation in Bangla and English",
        "Pay via bKash / Nagad · 30-day warranty",
      ]}
      plans={[
        {
          label: "SuperGrok — Shared (Recommended)",
          price: "৳499",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Images", value: "Unlimited Aurora" },
            { label: "Video", value: "Yes (Grok Video)" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "SuperGrok — Personal Seat",
          price: "৳3,990",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Account", value: "Your own X account" },
            { label: "Images", value: "Unlimited + priority" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/grok"
      specTables={[
        {
          title: "AI Chat & Reasoning",
          emoji: "🤖",
          tier2Label: "Shared (৳499/mo)",
          tier3Label: "Personal (৳1,499/mo)",
          rows: [
            { label: "AI Model", free: "Grok 3 Mini (free)", pro: "Grok 3 (full, SuperGrok)", premium: "Grok 3 (dedicated account)" },
            { label: "Context Window", free: "Limited", pro: "1,000,000 tokens", premium: "1,000,000 tokens" },
            { label: "Think Mode (deep reasoning)", free: "No", pro: "Unlimited", premium: "Unlimited (dedicated)" },
            { label: "DeepSearch (web + X)", free: "Limited", pro: "Unlimited, full live data", premium: "Unlimited, full live data" },
            { label: "Real-time X/Twitter Data", free: "Yes (limited)", pro: "Full live access", premium: "Full live access" },
            { label: "Voice Mode", free: "No", pro: "Yes, Bangla + English", premium: "Yes, Bangla + English" },
            { label: "File Upload (images/PDFs)", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Message Limits", free: "Very limited (free)", pro: "High limits (SuperGrok)", premium: "Full SuperGrok personal quota" },
          ],
        },
        {
          title: "Aurora Images & Grok Video",
          emoji: "🖼️",
          tier2Label: "Shared (৳499/mo)",
          tier3Label: "Personal (৳1,499/mo)",
          rows: [
            { label: "Image Engine", free: "Basic (10/mo)", pro: "Aurora — unlimited", premium: "Aurora — unlimited (dedicated)" },
            { label: "Image Resolution", free: "Standard", pro: "Up to 4K", premium: "Up to 4K" },
            { label: "Generation Speed", free: "Slow", pro: "~8 seconds", premium: "~8 seconds (priority)" },
            { label: "Reference Image Upload", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Commercial Use", free: "No", pro: "Yes", premium: "Yes (own account)" },
            { label: "Video Generation", free: "None", pro: "Grok Video (beta)", premium: "Grok Video (beta)" },
            { label: "Video Max Duration", free: "—", pro: "5–10 seconds", premium: "5–10 seconds" },
            { label: "Text-to-Video", free: "No", pro: "Yes (beta)", premium: "Yes (beta)" },
          ],
        },
      ]}
      useCases={GROK_USE_CASES}
      competitorRows={GROK_COMPETITOR_ROWS}
      extendedFaqs={GROK_FAQS}
    />
  );
}
