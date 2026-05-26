import { ToolDetail } from "@/components/ToolDetail";
import { PenTool } from "lucide-react";

const GRAMMARLY_USE_CASES = [
  {
    emoji: "🎓",
    title: "Academic Paper Writing",
    who: "University students, thesis writers, researchers",
    makes: "Publication-quality academic English — proper citations format, formal tone, no grammar errors",
    timeSaved: "English tutor ৳2,000/session → Grammarly 24/7 for ৳800/mo",
    prompt: "Grammarly: review this methodology section of my thesis — correct grammar, improve clarity for academic audience, flag any passive voice overuse, and check citation consistency",
  },
  {
    emoji: "💼",
    title: "Professional Email Communication",
    who: "Business professionals, managers, client-facing teams",
    makes: "Polished, professional emails with correct tone — confident but not aggressive, formal but not stiff",
    timeSaved: "Native English speaker review → instant AI feedback",
    prompt: "Tone check this email to our UK client explaining a 2-week project delay — Grammarly suggests: make it more diplomatic, add reassurance, remove one sentence that sounds defensive",
  },
  {
    emoji: "📝",
    title: "Freelance Content Writing",
    who: "Bangla-speaking content writers, freelancers on Fiverr/Upwork",
    makes: "Error-free, natural English content ready for international clients — no grammar red flags",
    timeSaved: "Client rejection due to grammar errors → 5-star reviews",
    prompt: "GrammarlyGO: rewrite this 500-word blog post introduction about 'Sustainable Fashion in Asia' — make it engaging, fix grammar, improve vocabulary, target American readers",
  },
  {
    emoji: "📄",
    title: "CV & Cover Letter Polish",
    who: "Job seekers applying to international companies, BPO applicants",
    makes: "Professional CV and cover letter that passes ATS systems and impresses international HR managers",
    timeSaved: "CV writing service ৳3,000 → Grammarly + GrammarlyGO",
    prompt: "GrammarlyGO: improve this cover letter for a remote UX designer role at a UK startup — make it concise, confident, specific to the job description, eliminate all Bangla-influenced grammar patterns",
  },
  {
    emoji: "📚",
    title: "Assignment & Essay Editing",
    who: "Students at private universities, English-medium schools, HSC candidates",
    makes: "Error-free English essays and assignments that score higher in grammar and clarity marks",
    timeSaved: "Language editing service → real-time instant feedback",
    prompt: "Fix grammar and improve clarity in this HSC English essay on 'Digital Bangladesh' — maintain student writing voice but correct all errors and improve sentence variety",
  },
  {
    emoji: "🌐",
    title: "Website & SEO Content",
    who: "Website owners, digital marketers, SEO writers",
    makes: "SEO-optimised web content that reads naturally in English with zero grammar errors",
    timeSaved: "Native English editor $50/hour → Grammarly continuous checking",
    prompt: "Check all text on my 10-page website for grammar, clarity, and consistency — Grammarly scans Chrome in real-time and flags every error as I type or edit in the CMS",
  },
  {
    emoji: "📊",
    title: "Business Report & Proposal Editing",
    who: "NGOs, consultants, business development teams writing to donors or clients",
    makes: "Polished, professional English reports and proposals that compete with native speakers",
    timeSaved: "Professional proofreader ৳5,000/document → ৳0",
    prompt: "Grammarly document editor: full scan of this 20-page project proposal for USAID — correct all grammar, improve business vocabulary, set goal to 'Persuasive + Formal'",
  },
];

const GRAMMARLY_COMPETITOR_ROWS = [
  { feature: "Real-time Grammar Check", thisProduct: "⭐⭐⭐⭐⭐ (most accurate)", chatgpt: "✅ But requires paste-in", claude: "✅ But requires paste-in", gemini: "✅ But requires paste-in" },
  { feature: "Inline Browser Integration", thisProduct: "✅ Works in every website", chatgpt: "❌ ChatGPT.com only", claude: "❌ Claude.ai only", gemini: "✅ Google suite only" },
  { feature: "Gmail Integration", thisProduct: "✅ Inline as you type", chatgpt: "❌ No", claude: "❌ No", gemini: "✅ Yes (Workspace)" },
  { feature: "Microsoft Word/Outlook", thisProduct: "✅ Native add-in", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Plagiarism Checker", thisProduct: "✅ 16B+ page database", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Tone Detector", thisProduct: "✅ Formal/casual/confident", chatgpt: "✅ On request", claude: "✅ On request", gemini: "✅ On request" },
  { feature: "GrammarlyGO (full rewrite)", thisProduct: "✅ Built-in AI rewriting", chatgpt: "✅ Excellent", claude: "✅ Best-in-class", gemini: "✅ Good" },
  { feature: "Genre-specific Style", thisProduct: "✅ Academic/business/casual", chatgpt: "✅ On instruction", claude: "✅ On instruction", gemini: "✅ On instruction" },
  { feature: "Works Offline", thisProduct: "✅ Desktop app (partial)", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Writing Goals Setting", thisProduct: "✅ Audience, intent, style", chatgpt: "❌ No goal system", claude: "❌ No goal system", gemini: "❌ No goal system" },
  { feature: "Vocabulary Enhancement", thisProduct: "✅ Word-level suggestions", chatgpt: "On request", claude: "On request", gemini: "On request" },
  { feature: "Bangla Writing Help", thisProduct: "❌ English only", chatgpt: "✅ Excellent Bangla", claude: "✅ Excellent Bangla", gemini: "✅ Excellent Bangla" },
  { feature: "AITPBD Price", thisProduct: "৳800/mo (private)", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
];

const GRAMMARLY_BASE_FAQS = [
  { q: "Grammarly Premium কি বাংলাদেশে ব্যবহার করা যায়?", a: "হ্যাঁ! AI Team Premium BD-এর মাধ্যমে আপনার নিজের Grammarly account-এ Premium upgrade করা হয়। ৳৮০০/মাসে bKash বা Nagad-এ পেমেন্ট করুন — ১-২ ঘন্টায় access পাবেন।" },
  { q: "GrammarlyGO কী?", a: "GrammarlyGO হলো Grammarly-র generative AI feature। এটি পুরো paragraph rewrite করতে, emails draft করতে এবং context-aware suggestions দিতে পারে — শুধু একটি prompt দিলেই হয়।" },
  { q: "Grammarly কোথায় কোথায় কাজ করে?", a: "Grammarly Premium Chrome extension হিসেবে Gmail, Google Docs, Twitter/X, LinkedIn এবং যেকোনো website-এ কাজ করে। আলাদা desktop app আছে Windows ও Mac-এর জন্য। Microsoft Word ও Outlook-এ native add-in আছে।" },
  { q: "Plagiarism checker কতটা accurate?", a: "Grammarly-র plagiarism checker ১৬ billion+ web pages ও academic database-এর বিরুদ্ধে text compare করে। এটি student assignments ও blog posts-এর জন্য বিশ্বাসযোগ্য এবং widely accepted।" },
  { q: "Grammarly Premium vs Free-এর পার্থক্য কী?", a: "Free version শুধু basic grammar fix করে। Premium-এ advanced punctuation, clarity suggestions, tone detection, vocabulary enhancement, GrammarlyGO AI rewriting এবং plagiarism checker সব পাবেন।" },
];

const GRAMMARLY_EXTENDED_FAQS = [
  { q: "Can Grammarly check Bangla language writing?", a: "Grammarly is designed exclusively for English. It does not check Bangla or other languages — if you write in Bangla, Grammarly will flag the text as errors. Grammarly is the right tool for any English writing task: emails, reports, essays, and content. For Bangla writing assistance, use ChatGPT, Claude, or Gemini." },
  { q: "Is Grammarly Premium better than ChatGPT for English proofreading?", a: "They serve different purposes. Grammarly is the best tool for real-time grammar checking as you type — it works inline in Gmail, Google Docs, Word, and any browser. ChatGPT is better for full rewrites and generating new content. For most Bangladeshi professionals, Grammarly as a typing companion + ChatGPT for content generation is the ideal combination." },
  { q: "Does Grammarly work in Google Docs?", a: "Yes. The Grammarly Chrome extension works directly inside Google Docs, showing inline suggestions as you type — you don't need to copy-paste text. It also works in Gmail, Google Forms, LinkedIn, Twitter/X, Facebook, Outlook Web, and virtually any text input field in Chrome. The desktop app handles Microsoft Word and Outlook." },
  { q: "What is Grammarly's Tone Detector and why is it useful for BD professionals?", a: "Grammarly's Tone Detector analyses your writing and tells you how it will sound to readers — formal, informal, confident, tentative, friendly, aggressive, etc. For Bangladeshi professionals writing to international clients, the tone detector flags emails that might sound 'too aggressive' or 'uncertain' — helping you calibrate your communication for Western business norms where directness and confidence are valued." },
  { q: "How does Grammarly help with academic writing at Bangladeshi universities?", a: "For university students, Grammarly Premium offers academic-style guidance — it can be set to 'Academic' writing goal, which enforces formal vocabulary, flags colloquialisms, and checks for plagiarism. Many Bangladeshi private universities accept Grammarly's plagiarism score as a self-certification tool. For thesis and research paper writing, Grammarly is essential for non-native English writers aiming for high standards." },
  { q: "Can I use Grammarly on my mobile phone?", a: "Yes. Grammarly has an iOS and Android keyboard that works system-wide — in WhatsApp, email apps, LinkedIn, Twitter, and any app where you type. The Grammarly keyboard replaces your standard keyboard and shows grammar and spelling suggestions in real-time on mobile. For Bangladeshi professionals writing English messages on the go, this is extremely useful." },
  { q: "What is the Writing Goals feature in Grammarly?", a: "Writing Goals lets you tell Grammarly who you're writing for and why: Audience (general public, expert, knowledgeable), Formality (formal, informal), Domain (academic, business, creative, casual), Tone (informative, analytical, persuasive). Once set, Grammarly tailors all its suggestions to match your specific writing context — making suggestions appropriate for a USAID report completely different from a casual blog post." },
  { q: "How is Grammarly Premium delivered by AITPBD?", a: "Grammarly Premium from AITPBD is upgraded directly on your own Grammarly account — we need your Grammarly email address. Delivery takes 1–2 hours after payment confirmation on WhatsApp. Your existing documents, account settings, and history are preserved. The upgrade is genuine and comes with a 30-day replacement warranty." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "grammarly",
  "category": "writing",
  "priceBdt": 449,
  "priceLabel": "৳449/mo",
  "model": "Grammarly AI + GPT integrations",
  "contextWindow": "N/A (assistive)",
  "multimodal": "Text only",
  "banglaQuality": "❌ Not supported",
  "speed": "Real-time",
  "accuracy": "⭐⭐⭐⭐⭐ (grammar)",
  "pricingTier": "Affordable",
  "brand": "Grammarly",
  "tagline": "Writing assistant for grammar & tone",
  "toolPath": "/tools/grammarly",
  "iconName": "Edit3",
  "accent": "#15C39A",
  "bestUseCase": "Students, writers, ESL professionals",
  "bestFor": [
    "Real-time grammar, spelling, punctuation fixes",
    "Tone detection (formal vs friendly)",
    "Plagiarism checker built in",
    "Works everywhere — browser, Word, Gmail"
  ],
  "weaknesses": [
    "English only — no Bangla support",
    "Not a generative AI, only assistive"
  ]
} as const;

export default function Grammarly() {
  return (
    <ToolDetail
      name="Grammarly Premium"
      tagline="for BD Writers"
      description="The world's leading AI writing assistant. GrammarlyGO full-paragraph AI rewrites, advanced grammar correction, plagiarism checking and tone tuning — essential for students, freelancers and professionals."
      accentColor="#15B881"
      icon={PenTool}
      features={[
        "GrammarlyGO — AI-powered full paragraph and email rewrites",
        "Advanced grammar, spelling and punctuation correction",
        "Plagiarism checker against 16 billion web pages",
        "Tone detector — adjust formality, confidence and clarity",
        "Vocabulary enhancements and sentence restructuring",
        "Inline suggestions in Gmail, Google Docs, MS Word and Chrome",
        "Genre-specific writing style guidance (academic, business, casual)",
        "Writing Goals — set audience, intent and style for tailored suggestions",
        "Grammarly mobile keyboard for Android & iOS",
        "Works across web browser, desktop app and Microsoft Office",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Grammarly Premium",
          price: "৳800",
          period: "/mo",
          delivery: "1–2 hr delivery",
          type: "Private",
          specs: [
            { label: "Access", value: "Your own account" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "24/7 WhatsApp" },
          ],
        },
      ]}
      specTables={[
        {
          title: "Grammar & Writing Features",
          emoji: "✍️",
          tier2Label: "Shared (৳349/mo)",
          tier3Label: "Personal (৳999/mo)",
          rows: [
            { label: "Grammar & Spelling Check", free: "Basic (common errors only)", pro: "Advanced (all error types)", premium: "Advanced (all error types)" },
            { label: "Punctuation Correction", free: "Basic", pro: "Advanced, context-aware", premium: "Advanced, context-aware" },
            { label: "Clarity Suggestions", free: "No", pro: "Yes, sentence restructuring", premium: "Yes, sentence restructuring" },
            { label: "Vocabulary Enhancement", free: "No", pro: "Yes, word-level upgrades", premium: "Yes, word-level upgrades" },
            { label: "Tone Detector", free: "No", pro: "Yes, 30+ tone labels", premium: "Yes, 30+ tone labels" },
            { label: "Writing Goals", free: "No", pro: "Yes, audience + intent", premium: "Yes, audience + intent" },
            { label: "Genre Style Guidance", free: "No", pro: "Academic/business/creative", premium: "Academic/business/creative" },
            { label: "Plagiarism Checker", free: "No", pro: "Yes, 16B+ page database", premium: "Yes, 16B+ page database" },
          ],
        },
        {
          title: "GrammarlyGO & Platform Coverage",
          emoji: "🚀",
          tier2Label: "Shared (৳349/mo)",
          tier3Label: "Personal (৳999/mo)",
          rows: [
            { label: "GrammarlyGO (AI rewriting)", free: "100 prompts/month", pro: "Unlimited prompts", premium: "Unlimited prompts (dedicated)" },
            { label: "Chrome Extension", free: "Yes (basic check)", pro: "Full premium check", premium: "Full premium check" },
            { label: "Gmail Integration", free: "Yes (basic)", pro: "Full + tone detection", premium: "Full + tone detection" },
            { label: "Google Docs", free: "Yes (basic)", pro: "Full inline suggestions", premium: "Full inline suggestions" },
            { label: "Microsoft Word Add-in", free: "No", pro: "Yes, native add-in", premium: "Yes, native add-in" },
            { label: "Microsoft Outlook", free: "No", pro: "Yes, native add-in", premium: "Yes, native add-in" },
            { label: "Mobile Keyboard (Android/iOS)", free: "Basic", pro: "Full premium features", premium: "Full premium features" },
            { label: "Desktop App (Win/Mac)", free: "No", pro: "Yes, full offline editing", premium: "Yes, own account login" },
          ],
        },
      ]}
      useCases={GRAMMARLY_USE_CASES}
      competitorRows={GRAMMARLY_COMPETITOR_ROWS}
      extendedFaqs={[...GRAMMARLY_BASE_FAQS, ...GRAMMARLY_EXTENDED_FAQS]}
    />
  );
}
