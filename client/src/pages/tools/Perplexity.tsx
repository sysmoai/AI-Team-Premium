import { ToolDetail } from "@/components/ToolDetail";
import { Search } from "lucide-react";

const PERPLEXITY_USE_CASES = [
  {
    emoji: "📰",
    title: "Real-Time News Research",
    who: "Journalists, students, business professionals",
    makes: "Cited news summaries with source links — no outdated ChatGPT knowledge cutoff",
    timeSaved: "1 hour of browsing → 2 minutes",
    prompt: "What are the latest economic policies in Bangladesh affecting SMEs in 2025? Provide sources and key statistics.",
  },
  {
    emoji: "🎓",
    title: "Academic Research with Citations",
    who: "University students, researchers, thesis writers",
    makes: "Research summaries with proper academic citations from journals, papers, and reports",
    timeSaved: "Library research 6 hours → 15 minutes",
    prompt: "Summarise the latest peer-reviewed research on microfinance impact in South Asia — include journal citations and key findings",
  },
  {
    emoji: "💼",
    title: "Competitor & Market Analysis",
    who: "Business owners, startup founders, marketers",
    makes: "Real-time competitor pricing, market size data, and industry news compiled with sources",
    timeSaved: "3 days research → 30 minutes",
    prompt: "Deep Research: analyse the top 5 Bangladeshi e-commerce platforms — pricing, features, market share, and recent news. Cited sources only.",
  },
  {
    emoji: "🔬",
    title: "Medical & Health Research",
    who: "Medical students, healthcare professionals, patients",
    makes: "Evidence-based health information with medical journal citations and doctor guidance",
    timeSaved: "Unreliable Google → verified sources",
    prompt: "What are the latest WHO guidelines on dengue treatment in 2025? Compare with Bangladesh DGDA recommendations. Cite sources.",
  },
  {
    emoji: "💻",
    title: "Developer Documentation Search",
    who: "Software developers, programmers, IT professionals",
    makes: "Instant answers from official docs, Stack Overflow, and GitHub — no hallucinated APIs",
    timeSaved: "30 min doc reading → 2 minutes",
    prompt: "How do I implement JWT authentication in a Next.js 15 app with App Router? Show me the current recommended approach with official docs.",
  },
  {
    emoji: "📊",
    title: "Financial & Investment Research",
    who: "Investors, traders, finance students",
    makes: "Real-time stock data, company financials, and investment analysis with cited sources",
    timeSaved: "Bloomberg subscription → ৳499/mo Perplexity",
    prompt: "Analyse Bangladesh's remittance inflow trends 2023–2025 with statistical sources — impact on BDT exchange rate and stock market",
  },
  {
    emoji: "🌐",
    title: "Multi-Model AI Comparison",
    who: "AI power users, researchers, content creators",
    makes: "Use o3-mini, Claude Sonnet 3.5, GPT-4.5, and Gemini 2.5 Pro from one interface",
    timeSaved: "4 subscriptions (৳2,000+) → ৳499 all-in-one",
    prompt: "Switch to Claude Sonnet 3.5: Write a detailed analysis of Bangladesh's garment industry in 2025 with trade data — then compare with GPT-4.5's version",
  },
];

const PERPLEXITY_COMPETITOR_ROWS = [
  { feature: "Real-Time Web Search", thisProduct: "✅ Always current", chatgpt: "✅ With search plugin", claude: "✅ With web access", gemini: "✅ Google native" },
  { feature: "Source Citations", thisProduct: "✅ Numbered, clickable", chatgpt: "✅ Yes", claude: "✅ Yes", gemini: "✅ Yes" },
  { feature: "Deep Research Mode", thisProduct: "✅ Autonomous, 30+ sources", chatgpt: "✅ Good", claude: "✅ Good", gemini: "✅ 30+ sources" },
  { feature: "AI Model Switching", thisProduct: "✅ GPT-4.5, Claude, Gemini, o4", chatgpt: "GPT only", claude: "Claude only", gemini: "Gemini only" },
  { feature: "Perplexity Assistant (Voice)", thisProduct: "✅ Yes, mobile", chatgpt: "✅ Advanced Voice", claude: "❌ No voice", gemini: "✅ Gemini Live" },
  { feature: "File Upload & Analysis", thisProduct: "✅ Unlimited PDFs, sheets", chatgpt: "✅ Yes", claude: "✅ Yes (200K ctx)", gemini: "✅ Yes" },
  { feature: "Visualisations (Charts)", thisProduct: "✅ Auto-generated", chatgpt: "✅ With Code Interpreter", claude: "Limited", gemini: "✅ Yes" },
  { feature: "Knowledge Cutoff", thisProduct: "✅ None — always live", chatgpt: "Apr 2024", claude: "Apr 2024", gemini: "✅ Live (Google)" },
  { feature: "Answer Accuracy", thisProduct: "⭐⭐⭐⭐⭐ (cited sources)", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐⭐", gemini: "⭐⭐⭐⭐" },
  { feature: "Bangla Language Quality", thisProduct: "⭐⭐⭐⭐", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐⭐", gemini: "⭐⭐⭐⭐⭐" },
  { feature: "Image Understanding", thisProduct: "✅ Yes", chatgpt: "✅ Yes", claude: "✅ Yes", gemini: "✅ Yes" },
  { feature: "API Access", thisProduct: "✅ Sonar API", chatgpt: "✅ OpenAI API", claude: "✅ Anthropic API", gemini: "✅ Google AI" },
  { feature: "AITP Shared Price", thisProduct: "৳499/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
];

const PERPLEXITY_FAQS = [
  { q: "What makes Perplexity Pro different from just using Google?", a: "Google shows you a list of links — you still have to read every page yourself. Perplexity Pro reads the top sources, synthesises the key information, and gives you a cited answer in seconds. With Deep Research, it goes further — autonomously searching 30+ sources and writing a comprehensive report. Think of it as Google + a research assistant working together." },
  { q: "Which AI models can I access with Perplexity Pro?", a: "Perplexity Pro lets you switch between: Sonar Pro (Perplexity's own model), OpenAI's o3-mini and GPT-4.5, Anthropic's Claude Sonnet 3.5, and Google's Gemini 2.5 Pro — all from one interface. This means you get the equivalent of 4 AI subscriptions in one, making it extremely cost-effective for power users who want to compare model outputs." },
  { q: "What is Perplexity Deep Research and how is it different from regular search?", a: "Deep Research is Perplexity's autonomous research agent. You give it a complex research question, and it autonomously runs dozens of searches, evaluates sources, synthesises findings, and writes a structured report — typically 500–2,000 words with citations. This takes 2–5 minutes but produces work that would take a professional researcher hours. Perfect for thesis research, market analysis, and investment due diligence." },
  { q: "Can I upload documents and ask Perplexity questions about them?", a: "Yes. Perplexity Pro allows unlimited file uploads — PDFs, spreadsheets, Word documents, and images. You can ask questions about the document content and Perplexity will answer with citations from the specific sections of your uploaded file. This is useful for analysing research papers, business reports, contracts, and textbooks." },
  { q: "Does Perplexity Pro work well for Bangla language searches?", a: "Perplexity Pro handles Bangla searches reasonably well — you can ask questions in Bangla and receive answers in Bangla with citations. For research on Bangladesh-specific topics (economy, politics, culture), Perplexity often finds more relevant recent sources than ChatGPT since it searches the live web. However, for purely Bangla writing tasks, Claude or ChatGPT may produce more natural prose." },
  { q: "What is the Perplexity Assistant feature?", a: "Perplexity Assistant is a voice-based AI mode available on iOS and Android. You ask questions by speaking and Perplexity responds conversationally — it's designed to be your always-on research assistant. Unlike Siri or Google Assistant, it gives you full Perplexity-quality answers with sources, not just quick lookups." },
  { q: "How does Perplexity handle accuracy compared to ChatGPT?", a: "Perplexity is specifically designed to minimise hallucinations by grounding every answer in cited web sources. ChatGPT sometimes generates plausible-sounding but incorrect 'facts' from its training data. Perplexity's answers link to real sources you can verify. For research where accuracy is critical (medical, legal, financial, academic), Perplexity's citation model is a significant advantage." },
  { q: "Can Perplexity Pro create charts and visualisations?", a: "Yes. When you ask data-related questions, Perplexity Pro can auto-generate charts, timelines, and comparison tables directly in the answer. For example, ask about 'Bangladesh GDP growth 2015–2025' and Perplexity can show you a chart alongside the cited statistics. This feature sets it apart from text-only AI chat tools." },
  { q: "How many searches can I do per day with Perplexity Pro?", a: "Perplexity Pro Shared (৳599/mo) gives you 300+ Pro searches per day — enough for the heaviest research workflows. Deep Research queries count as multiple searches (typically 5–10) due to their complexity. Normal web-grounded searches have virtually no limit for reasonable usage." },
  { q: "Is Perplexity Pro useful for software developers in Bangladesh?", a: "Absolutely. Perplexity Pro is a developer's research superpower — you can ask technical questions and get answers grounded in official documentation, Stack Overflow, GitHub, and dev blogs. Unlike ChatGPT which might give outdated code examples, Perplexity searches current docs. Ask about Next.js 15, Python 3.13, or any framework released after ChatGPT's knowledge cutoff and Perplexity gives you current answers." },
  { q: "What is the difference between Sonar Pro and other models in Perplexity?", a: "Sonar Pro is Perplexity's own model — optimised specifically for web-search-grounded answers. It's the fastest option and best for general research questions. The alternative models (GPT-4.5, Claude Sonnet 3.5, Gemini 2.5 Pro) are better for creative writing, complex reasoning, and tasks requiring more nuanced language generation. You can switch between models in settings." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "perplexity",
  "category": "search",
  "priceBdt": 799,
  "priceLabel": "৳799/mo",
  "model": "GPT-4.5, Claude Sonnet 3.5, Gemini 2.5 Pro (you pick)",
  "contextWindow": "Varies by chosen model",
  "multimodal": "Text, image upload, file upload",
  "banglaQuality": "⭐⭐⭐⭐",
  "speed": "Very fast — search-first design",
  "accuracy": "⭐⭐⭐⭐⭐ (cited sources)",
  "pricingTier": "Mainstream",
  "brand": "Perplexity",
  "tagline": "AI search engine with sources",
  "toolPath": "/tools/perplexity",
  "iconName": "Search",
  "accent": "#20B8CD",
  "bestUseCase": "Researchers, students, journalists",
  "bestFor": [
    "Research with cited sources",
    "Real-time web + academic search",
    "Picking which AI model answers (GPT-4.5, Claude, Gemini)",
    "Quick factual lookups, not creative work"
  ],
  "weaknesses": [
    "Not designed for long creative writing",
    "Limited image / video generation"
  ]
} as const;

export default function Perplexity() {
  return (
    <ToolDetail
      name="Perplexity Pro"
      tagline="Search Redefined"
      description="The world's most powerful AI answer engine. Sonar Pro with Deep Research, real-time web citations, multi-model access (o3-mini, GPT-4.5, Claude Sonnet 3.5, Gemini 2.5 Pro), unlimited file uploads and Perplexity Assistant voice mode."
      accentColor="#20B2AA"
      icon={Search}
      features={[
        "Sonar Pro — Perplexity's fastest and most accurate model",
        "Deep Research: autonomous multi-step research with cited reports",
        "Real-time web search with numbered citations",
        "Switch between o3-mini, GPT-4.5, Claude Sonnet 3.5, Gemini 2.5 Pro",
        "Upload and analyse unlimited PDFs, spreadsheets and documents",
        "Perplexity Assistant — voice-based AI assistant",
        "Visualisations: charts, diagrams and timelines in answers",
        "No knowledge cut-off — always current information",
        "300+ Pro searches per day",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Perplexity Pro — Shared",
          price: "৳499",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Shared seat" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "WhatsApp 24/7" },
          ],
        },
        {
          label: "Perplexity Pro — Personal",
          price: "৳2,200",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Your own account" },
            { label: "Models", value: "All 5 AI models" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      specTables={[
        {
          title: "Search & Research Features",
          emoji: "🔍",
          tier2Label: "Shared (৳449/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "AI Model", free: "Sonar (basic)", pro: "Sonar Pro + 4 other models", premium: "Sonar Pro + 4 other models" },
            { label: "Pro Searches per Day", free: "5/day", pro: "300+/day (shared pool)", premium: "300+/day (dedicated)" },
            { label: "Deep Research Mode", free: "No", pro: "Yes, full autonomous", premium: "Yes, full autonomous" },
            { label: "Model Switching", free: "No", pro: "GPT-4.5, Claude, Gemini, o4", premium: "GPT-4.5, Claude, Gemini, o4" },
            { label: "File Upload", free: "No", pro: "Unlimited PDFs, sheets, docs", premium: "Unlimited PDFs, sheets, docs" },
            { label: "Perplexity Assistant (Voice)", free: "No", pro: "Yes, iOS & Android", premium: "Yes, iOS & Android (own account)" },
            { label: "Auto-generated Charts", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Citation Quality", free: "Standard", pro: "Deep, clickable sources", premium: "Deep, clickable sources" },
          ],
        },
        {
          title: "Research Capabilities",
          emoji: "📚",
          tier2Label: "Shared (৳449/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "Knowledge Cutoff", free: "None (live web)", pro: "None (always live)", premium: "None (always live)" },
            { label: "Academic Journal Search", free: "Basic", pro: "Yes, peer-reviewed", premium: "Yes, peer-reviewed" },
            { label: "Image Search & Analysis", free: "Limited", pro: "Yes, full", premium: "Yes, full" },
            { label: "Bangla Language Support", free: "Basic", pro: "Good (all models)", premium: "Good (all models)" },
            { label: "Data Visualisation", free: "No", pro: "Yes, auto-charts", premium: "Yes, auto-charts" },
            { label: "API Access (Sonar)", free: "No", pro: "No", premium: "Yes, separate pricing" },
            { label: "Privacy Mode", free: "No", pro: "Yes, anonymous searches", premium: "Yes, anonymous searches" },
            { label: "Collection Spaces", free: "No", pro: "Unlimited saved threads", premium: "Unlimited saved threads (private)" },
          ],
        },
      ]}
      useCases={PERPLEXITY_USE_CASES}
      competitorRows={PERPLEXITY_COMPETITOR_ROWS}
      extendedFaqs={PERPLEXITY_FAQS}
    />
  );
}
