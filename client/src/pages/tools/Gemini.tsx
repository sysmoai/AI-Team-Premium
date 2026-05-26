import { ToolDetail } from "@/components/ToolDetail";
import { Star } from "lucide-react";

const GEMINI_USE_CASES = [
  {
    emoji: "🔬",
    title: "Deep Research Reports",
    who: "Students, journalists, researchers, consultants",
    makes: "30+ source research reports with citations, tables, and executive summaries",
    timeSaved: "3 days research → 5 minutes",
    prompt: "Deep Research: বাংলাদেশের রপ্তানি খাতে AI-র প্রভাব ২০২৪–২০২৮ — statistics, expert opinions, policy recommendations সহ বিস্তারিত report",
  },
  {
    emoji: "🎙️",
    title: "Live Voice Conversations",
    who: "English learners, business professionals, call centre trainers",
    makes: "Real-time English speaking practice and interview preparation via Gemini Live",
    timeSaved: "৳500/hr English tutor → ৳0",
    prompt: "Gemini Live: act as an interviewer for a software engineer position at a Dhaka tech startup — ask me 10 questions and give feedback in Bangla",
  },
  {
    emoji: "📧",
    title: "Gmail & Google Workspace AI",
    who: "Business professionals, executives, office workers",
    makes: "Auto-draft email replies, summarise threads, generate meeting agendas in Gmail and Docs",
    timeSaved: "2 hours daily email → 20 minutes",
    prompt: "এই email thread summarise করো এবং formal English-এ একটি diplomatic response draft করো যা supplier-এর delivery delay address করে",
  },
  {
    emoji: "📊",
    title: "Google Sheets Data Analysis",
    who: "Analysts, accountants, e-commerce owners",
    makes: "AI-generated formulas, pivot tables, charts, and trend analysis inside Google Sheets",
    timeSaved: "Full-day spreadsheet work → 30 minutes",
    prompt: "Gemini in Sheets: এই quarterly sales data থেকে month-over-month growth %, top 5 SKUs, এবং seasonal trends identify করো — chart সহ",
  },
  {
    emoji: "📚",
    title: "NotebookLM Document Q&A",
    who: "Students, lawyers, researchers reading dense documents",
    makes: "Instant Q&A across multiple PDFs — ask questions and get cited answers from your documents",
    timeSaved: "50 pages reading → 5 minutes",
    prompt: "Upload: 5 research papers on microfinance in Bangladesh. Question: what are the key success factors and failure modes identified across all papers?",
  },
  {
    emoji: "🖼️",
    title: "Imagen 4 Image Creation",
    who: "Marketers, content creators, e-commerce sellers",
    makes: "High-quality product images, social media graphics, and ad creatives with perfect text",
    timeSaved: "৳8,000 designer → ৳0",
    prompt: "Imagen 4: a premium bangladeshi handmade leather bag on marble surface, professional product photography, 4K, studio lighting, white background",
  },
  {
    emoji: "🎬",
    title: "Veo 2 Video Generation",
    who: "YouTubers, social media managers, ad agencies",
    makes: "8-second 1080p AI video clips for YouTube intros, ads, and social content",
    timeSaved: "৳20,000 video crew → ৳0",
    prompt: "Veo 2: a Bangladeshi tea garden worker picking leaves at sunrise, cinematic drone shot, mist rising, golden hour, 1080p smooth",
  },
];

const GEMINI_COMPETITOR_ROWS = [
  { feature: "AI Model", thisProduct: "Gemini 2.5 Pro (Ultra)", chatgpt: "GPT-4o / o3-mini", claude: "Claude Sonnet 3.5", gemini: "Gemini 2.0 Flash (free)" },
  { feature: "Context Window", thisProduct: "1,000,000 tokens", chatgpt: "128K tokens", claude: "200K tokens", gemini: "32K tokens (free)" },
  { feature: "Deep Research", thisProduct: "✅ 30+ sources", chatgpt: "✅ Yes", claude: "✅ Yes", gemini: "❌ No (free)" },
  { feature: "Image Generation", thisProduct: "✅ Imagen 4 (~50/day)", chatgpt: "GPT-image-1 (limited)", claude: "❌ None", gemini: "❌ No (free)" },
  { feature: "Video Generation", thisProduct: "✅ Veo 2 (1080p)", chatgpt: "Limited (Sora)", claude: "❌ None", gemini: "❌ No (free)" },
  { feature: "Google Drive Storage", thisProduct: "2TB (Personal plan)", chatgpt: "❌ No storage", claude: "❌ No storage", gemini: "15GB (free)" },
  { feature: "Workspace AI (Gmail/Docs)", thisProduct: "✅ Full integration", chatgpt: "❌ No", claude: "❌ No", gemini: "Limited (free)" },
  { feature: "Real-time Voice (Live)", thisProduct: "✅ Gemini Live", chatgpt: "✅ Advanced Voice", claude: "❌ No", gemini: "❌ No (free)" },
  { feature: "Web Search Quality", thisProduct: "⭐⭐⭐⭐⭐ (Google native)", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐⭐", gemini: "Limited (free)" },
  { feature: "Bangla Language Quality", thisProduct: "⭐⭐⭐⭐⭐", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐⭐", gemini: "⭐⭐⭐ (free)" },
  { feature: "File Upload Types", thisProduct: "PDFs, images, video, audio", chatgpt: "PDFs, images, docs", claude: "PDFs, images, docs", gemini: "Images only (free)" },
  { feature: "Knowledge Freshness", thisProduct: "✅ Real-time Google Search", chatgpt: "Apr 2024 cutoff", claude: "Apr 2024 cutoff", gemini: "Partial (free)" },
  { feature: "AITPBD Shared Price", thisProduct: "৳449/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "Free (limited)" },
];

const GEMINI_FAQS = [
  { q: "What is the difference between Gemini Advanced and the free Gemini?", a: "Free Gemini uses Gemini 2.0 Flash with a 32K context window, no image generation, no video generation, and very limited usage. Gemini Advanced gives you Gemini 2.5 Pro Ultra with a 1,000,000 token context window, Deep Research, Imagen 4 image generation, Veo 2 video generation, and unlimited usage for normal workloads." },
  { q: "What is Gemini Deep Research and how does it work?", a: "Deep Research is Gemini's autonomous research mode. You give it a research question, and it independently searches 30+ web sources, evaluates them, and synthesises a comprehensive report with citations — similar to hiring a research assistant. It takes 2–5 minutes but produces work that would take hours manually. Perfect for Bangladeshi students, journalists, and business analysts." },
  { q: "Can Gemini Advanced generate images? How many per day?", a: "Yes. Gemini Advanced includes Imagen 4 — Google's best text-to-image model. You can generate approximately 50 high-quality images per day. Imagen 4 excels at photorealism, accurate text rendering within images (a weakness for most AI), and following complex style instructions. Best for product photos, social media graphics, and marketing materials." },
  { q: "What is Gemini Live and can I use it in Bangla?", a: "Gemini Live is a real-time voice conversation mode — you speak to Gemini and it responds naturally, almost like a phone call. It supports Bangla voice input and output. Use cases include English speaking practice, business presentation rehearsal, interview prep, and hands-free AI assistance while multitasking. Available on Android and iOS." },
  { q: "Does Gemini Advanced work inside Gmail and Google Docs in Bangladesh?", a: "Yes — this is Gemini Advanced's killer feature for office workers. With the Personal Seat plan, Gemini integrates directly into Gmail (auto-draft replies, summarise threads), Google Docs (generate content, improve writing), Google Sheets (create formulas, analyse data), Google Slides (generate presentations), and Google Meet (meeting transcripts and summaries)." },
  { q: "What is the 1 million token context window in practical terms?", a: "1 million tokens ≈ approximately 750,000 words. This means you can upload and analyse an entire book (or multiple books), a large codebase with hundreds of files, years of business documents, or a lengthy audio/video transcript in a single conversation. ChatGPT handles 128K tokens and Claude Pro handles 200K — Gemini Advanced has by far the largest context." },
  { q: "Does the Personal plan include 2TB Google Drive storage?", a: "Yes. The Gemini Advanced Personal Seat (৳2,300/mo) upgrades your own Google account and includes 2TB of Google Drive storage — up from the free 15GB. This is shared across Gmail, Drive, and Google Photos. It's the equivalent of Google One AI Premium, which costs $19.99/month internationally." },
  { q: "Can Gemini Advanced generate videos with Veo 2?", a: "Yes. Veo 2 is Google DeepMind's professional video generation model — capable of creating 8-second 1080p video clips with camera movement control (pan, zoom, dolly). You can do text-to-video and image-to-video. Approximately 5 videos per day are included. For Bangladeshi YouTubers and ad agencies, this eliminates expensive stock footage purchases." },
  { q: "What is NotebookLM and why is it useful for Bangladesh students?", a: "NotebookLM is a separate Google AI tool that reads your documents and lets you ask questions about them, create summaries, and generate 'Audio Overviews' — AI podcast-style discussions of your uploaded material. You can upload research papers, textbooks, lecture notes, and get instant answers. With Gemini Advanced, you get NotebookLM's enhanced features including unlimited notebooks." },
  { q: "Is Gemini Advanced good at Bangla language tasks?", a: "Yes — Gemini 2.5 Pro produces excellent Bangla text, matching or exceeding ChatGPT Plus for Bangla quality. Google's language models are trained on extensive multilingual data including Bangla. For Bangla document translation, content writing, and academic work in Bangla, Gemini is one of the top choices alongside ChatGPT." },
  { q: "How do I receive my Gemini Advanced access after paying on WhatsApp?", a: "For the Shared Seat (৳449/mo): we send you login credentials within 5–15 minutes of payment confirmation. For the Personal Seat (৳2,300/mo): we need your Google email address and process the upgrade to your account within 2–4 hours. You'll receive a Google notification confirming the Gemini Advanced upgrade." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "gemini",
  "category": "chat",
  "priceBdt": 449,
  "priceLabel": "৳449/mo",
  "model": "Gemini 2.5 Pro",
  "contextWindow": "1,000,000 tokens",
  "multimodal": "Text, image, video, voice, code",
  "banglaQuality": "⭐⭐⭐⭐⭐",
  "speed": "Very fast",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Mainstream",
  "brand": "Google",
  "tagline": "Gemini 2.5 Pro + Google ecosystem",
  "toolPath": "/tools/google-ai-pro",
  "iconName": "Star",
  "accent": "#4285F4",
  "bestUseCase": "Heavy Google Workspace users, video creators",
  "bestFor": [
    "Largest context window in the industry (1M tokens)",
    "Real-time Google Search integration",
    "Veo 3 video generation included",
    "Gmail, Docs & Drive integration",
    "2 TB Google One storage bundled"
  ],
  "weaknesses": [
    "Less polished writing voice than Claude",
    "Smaller plugin ecosystem than ChatGPT"
  ]
} as const;

export default function Gemini() {
  return (
    <ToolDetail
      name="Gemini Advanced"
      tagline="— Google AI in BD"
      description="Google's most powerful AI — Gemini 2.5 Pro with a 1 million token context, Deep Research, Gemini Live voice mode, and 2 TB Google Drive storage. Pay with bKash/Nagad, no international card."
      accentColor="#4285F4"
      icon={Star}
      features={[
        "Gemini 2.5 Pro Ultra — Google's smartest model",
        "1,000,000 token context window (largest in class)",
        "Deep Research: multi-step web research with cited reports",
        "Gemini Live — real-time voice conversations in Bangla & English",
        "Imagen 4 — Google's best text-to-image generator (~50 images/day)",
        "Veo 2 — AI video generation up to 1080p (Personal plan)",
        "2 TB Google Drive storage included (Personal plan)",
        "Seamlessly integrated into Gmail, Docs, Sheets and Slides",
        "NotebookLM-style document analysis and Q&A",
        "State-of-the-art coding, maths and science reasoning",
        "Accurate Bangla language generation",
        "30-day warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Gemini Advanced — Shared",
          price: "৳449",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Shared seat" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "24/7 WhatsApp" },
          ],
        },
        {
          label: "Gemini Advanced — Personal",
          price: "৳2,300",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Storage", value: "2 Terabytes Drive" },
            { label: "Type", value: "100% Private" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      specTables={[
        {
          title: "AI Chat & Research",
          emoji: "🤖",
          tier2Label: "Shared (৳449/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "AI Model", free: "Gemini 2.0 Flash", pro: "Gemini 2.5 Pro Ultra", premium: "Gemini 2.5 Pro Ultra (dedicated)" },
            { label: "Context Window", free: "32K tokens", pro: "1,000,000 tokens", premium: "1,000,000 tokens" },
            { label: "Deep Research", free: "No", pro: "Yes (30+ web sources)", premium: "Yes (30+ web sources)" },
            { label: "Gemini Live (Voice)", free: "No", pro: "Yes, Bangla + English", premium: "Yes, Bangla + English" },
            { label: "Daily Message Limit", free: "Very limited", pro: "Shared quota", premium: "Full personal quota" },
            { label: "Google Search Integration", free: "Limited", pro: "Full real-time", premium: "Full real-time" },
            { label: "File Upload", free: "Images only", pro: "PDFs, audio, video, docs", premium: "PDFs, audio, video, docs" },
            { label: "Workspace AI (Gmail/Docs)", free: "No", pro: "No", premium: "Yes (personal account)" },
          ],
        },
        {
          title: "Imagen 4 & Veo 2 — Media Generation",
          emoji: "🖼️",
          tier2Label: "Shared (৳449/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "Image Generation", free: "No", pro: "Imagen 4 (~50 images/day)", premium: "Imagen 4 (~50 images/day)" },
            { label: "Image Quality", free: "—", pro: "Best-in-class, 4K", premium: "Best-in-class, 4K" },
            { label: "Text in Images", free: "—", pro: "Accurate (Google strength)", premium: "Accurate (Google strength)" },
            { label: "Inpainting / Editing", free: "—", pro: "Yes", premium: "Yes" },
            { label: "Video Generation", free: "No", pro: "Veo 2 (8s, 1080p)", premium: "Veo 2 (8s, 1080p)" },
            { label: "Videos Per Day", free: "None", pro: "~5 videos/day (shared)", premium: "~5 videos/day (dedicated)" },
            { label: "Google Drive Storage", free: "15GB", pro: "Shared plan storage", premium: "2TB (own account)" },
            { label: "Google Photos Storage", free: "15GB (shared)", pro: "Shared plan storage", premium: "2TB (own account)" },
          ],
        },
      ]}
      useCases={GEMINI_USE_CASES}
      competitorRows={GEMINI_COMPETITOR_ROWS}
      extendedFaqs={GEMINI_FAQS}
    />
  );
}
