import { ToolDetail } from "@/components/ToolDetail";
import { Sparkles } from "lucide-react";

export default function GoogleAIPro() {
  return (
    <ToolDetail
      name="Google AI Pro"
      tagline="in Bangladesh"
      description="Google's most complete AI bundle — Google AI Pro (formerly Google One AI Premium) includes Gemini 2.5 Pro Ultra, NotebookLM Plus, Imagen 4 image generation, Veo 2 video generation, 2TB Google Drive storage, and Google Workspace AI. All from ৳449/month via bKash/Nagad."
      accentColor="#4285F4"
      icon={Sparkles}
      features={[
        "Gemini 2.5 Pro Ultra — Google's most capable model with 1M token context",
        "NotebookLM Plus — AI that reads your PDFs, books, and notes (podcast feature)",
        "Imagen 4 — Google's highest quality text-to-image generator",
        "Veo 2 — Google's professional AI video generation model",
        "Deep Research — 30+ source synthesis for academic and business research",
        "2TB Google Drive storage (vs 15GB free)",
        "Gemini in Gmail, Docs, Sheets, Slides — AI across all Google apps",
        "Google Search integration — real-time grounded responses",
        "Bangla language generation (superior to most competitors)",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Google AI Pro — Shared Seat",
          price: "৳449",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Includes", value: "Gemini + NotebookLM+" },
            { label: "Storage", value: "2TB Google Drive" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Google AI Pro — Personal Seat",
          price: "৳1,299",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Account", value: "Your own Google account" },
            { label: "Workspace AI", value: "Gmail, Docs, Sheets" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/google-ai-pro"
      specTables={[
        {
          title: "AI Chat & Research",
          emoji: "🤖",
          rows: [
            { label: "AI Model", free: "Gemini 2.0 Flash", pro: "Gemini 2.5 Pro Ultra" },
            { label: "Context Window", free: "32K tokens", pro: "1,000,000 tokens" },
            { label: "Deep Research", free: "No", pro: "Yes (30+ sources)" },
            { label: "Web Search (Google)", free: "Limited", pro: "Full real-time" },
            { label: "NotebookLM", free: "Basic", pro: "Plus (unlimited)" },
            { label: "Workspace AI (Docs/Gmail)", free: "No", pro: "Yes, all apps" },
            { label: "File Upload", free: "Images only", pro: "PDFs, docs, sheets, videos" },
            { label: "Google Drive Storage", free: "15GB", pro: "2TB" },
          ],
        },
        {
          title: "Imagen 4 — Image Generation",
          emoji: "🖼️",
          rows: [
            { label: "Image Engine", free: "Imagen 3 (limited)", pro: "Imagen 4 (best quality)" },
            { label: "Images Per Day", free: "1–2/day", pro: "~50/day" },
            { label: "Max Resolution", free: "Standard", pro: "Up to 4K" },
            { label: "Generation Speed", free: "Slow", pro: "~6 seconds" },
            { label: "Photorealism", free: "Good", pro: "Excellent (best-in-class)" },
            { label: "Text in Images", free: "Poor", pro: "Accurate (Google strength)" },
            { label: "Style Control", free: "Basic", pro: "Advanced prompting" },
            { label: "Editing (Inpainting)", free: "No", pro: "Yes" },
          ],
        },
        {
          title: "Veo 2 — Video Generation",
          emoji: "🎬",
          rows: [
            { label: "Video Engine", free: "No", pro: "Veo 2 (Google DeepMind)" },
            { label: "Videos Per Day", free: "None", pro: "~5 videos/day" },
            { label: "Max Duration", free: "—", pro: "Up to 8 seconds" },
            { label: "Max Resolution", free: "—", pro: "1080p" },
            { label: "Text-to-Video", free: "No", pro: "Yes" },
            { label: "Image-to-Video", free: "No", pro: "Yes" },
            { label: "Camera Control", free: "No", pro: "Yes (pan, zoom, etc.)" },
          ],
        },
        {
          title: "NotebookLM Plus Features",
          emoji: "📚",
          rows: [
            { label: "Sources per notebook", free: "50", pro: "500" },
            { label: "Notebooks", free: "100", pro: "Unlimited" },
            { label: "Audio Overview (podcast)", free: "3/day", pro: "Unlimited" },
            { label: "Document types", free: "PDF, web, YouTube", pro: "All types + Google Drive" },
            { label: "Mind map", free: "No", pro: "Yes" },
            { label: "Collaboration", free: "No", pro: "Yes, team sharing" },
          ],
        },
      ]}
      useCases={[
        {
          emoji: "📚",
          title: "Research with NotebookLM",
          who: "Students, researchers, academics",
          makes: "Upload 10 research PDFs → get a full synthesis + audio podcast summary",
          timeSaved: "20 hours reading → 45 minutes",
          prompt: "এই ৫টি research paper থেকে climate change এর সবচেয়ে গুরুত্বপূর্ণ findings summarize করো এবং podcast audio তৈরি করো",
        },
        {
          emoji: "🖼️",
          title: "Product Image Generation",
          who: "E-commerce sellers, marketers",
          makes: "Professional product photos with perfect text overlays in Bangla",
          timeSaved: "৳8,000 photoshoot → ৳0",
          prompt: "Imagen 4: a premium Bangladeshi handmade pottery bowl on a wooden table, studio lighting, white background, product photography",
        },
        {
          emoji: "📧",
          title: "Gmail & Workspace AI",
          who: "Business professionals, executives",
          makes: "Auto-draft replies, summarise email threads, generate meeting agendas",
          timeSaved: "2 hours daily email → 20 minutes",
          prompt: "এই email thread summarise করো এবং professional Bangla response draft করো",
        },
        {
          emoji: "🎬",
          title: "AI Video Creation (Veo 2)",
          who: "YouTubers, social media managers",
          makes: "1080p short video clips for ads, intros, and explainer content",
          timeSaved: "৳15,000 video production → ৳0",
          prompt: "Veo 2: a Bangladeshi entrepreneur launching a product, cinematic 1080p, golden hour lighting",
        },
        {
          emoji: "📊",
          title: "Sheets & Data Analysis",
          who: "Analysts, accountants, business owners",
          makes: "Gemini in Sheets auto-generates formulas, charts, and pivot tables",
          timeSaved: "3 hours analysis → 10 minutes",
          prompt: "এই sales data থেকে monthly trend chart তৈরি করো এবং top 5 products identify করো",
        },
        {
          emoji: "🎓",
          title: "Deep Research Reports",
          who: "Journalists, consultants, students",
          makes: "30+ source synthesis report with citations in 5 minutes",
          timeSaved: "3 days research → 5 minutes",
          prompt: "Deep Research: Bangladesh's fintech industry growth 2020–2025, statistics, key players, and future predictions",
        },
      ]}
      competitorRows={[
        { feature: "AI Model", thisProduct: "Gemini 2.5 Pro Ultra", chatgpt: "GPT-4o", claude: "Claude Sonnet 4", gemini: "Gemini 2.5 Pro (same base)" },
        { feature: "Context Window", thisProduct: "1M tokens", chatgpt: "128K tokens", claude: "200K tokens", gemini: "1M tokens" },
        { feature: "Image Generation", thisProduct: "✅ Imagen 4 (~50/day)", chatgpt: "Limited DALL·E", claude: "❌ No", gemini: "✅ Imagen 4" },
        { feature: "Video Generation", thisProduct: "✅ Veo 2 (1080p)", chatgpt: "Limited Sora", claude: "❌ No", gemini: "✅ Veo 2" },
        { feature: "Deep Research", thisProduct: "✅ 30+ sources", chatgpt: "✅ Yes", claude: "✅ Yes", gemini: "✅ Yes" },
        { feature: "NotebookLM Plus", thisProduct: "✅ 500 sources", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Google Drive (2TB)", thisProduct: "✅ Included", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No (separate)" },
        { feature: "Bangla Text Quality", thisProduct: "⭐⭐⭐⭐⭐", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐", gemini: "⭐⭐⭐⭐⭐" },
        { feature: "AITPBD Shared Price", thisProduct: "৳449/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
      ]}
      extendedFaqs={[
        { q: "What is the difference between Google AI Pro and Gemini Advanced?", a: "Google AI Pro (formerly Google One AI Premium) is a bundle that includes Gemini Advanced (Gemini 2.5 Pro Ultra), NotebookLM Plus, Imagen 4 image generation, Veo 2 video generation, AND 2TB Google Drive storage. Gemini Advanced alone is just the chat interface — Google AI Pro includes everything." },
        { q: "How many images can I generate with Google AI Pro per day?", a: "With Google AI Pro, you get access to Imagen 4 with approximately 50 images per day. This is significantly more than the free tier (1–2/day). The images are high resolution and best-in-class for accurate text rendering within images." },
        { q: "What is NotebookLM Plus and how does it help Bangladesh students?", a: "NotebookLM Plus lets you upload up to 500 research sources (PDFs, web pages, YouTube videos) per notebook. It answers questions about your sources, creates mind maps, and generates 'Audio Overviews' — AI-generated podcast conversations summarising your research. Perfect for BD students doing thesis or assignment research." },
        { q: "Can Google AI Pro generate videos?", a: "Yes. Google AI Pro includes Veo 2, Google DeepMind's video generation model. You can generate up to approximately 5 videos per day, each up to 8 seconds long at 1080p resolution. Veo 2 supports both text-to-video and image-to-video with camera movement control." },
        { q: "Does Google AI Pro include Gmail and Docs AI?", a: "Yes, the Personal Seat plan includes Gemini integration in Gmail, Google Docs, Sheets, and Slides. This means you can have AI draft emails, summarise documents, generate spreadsheet formulas, and create presentation content directly inside your Google Workspace apps." },
        { q: "Is Google AI Pro better than ChatGPT for Bangla language?", a: "Google AI Pro (Gemini 2.5 Pro) and ChatGPT are both excellent at Bangla. However, Gemini has a slight edge for Bangla due to Google's extensive multilingual training data. For document reading and research with NotebookLM, Google AI Pro is clearly better. For coding and custom assistants, ChatGPT has more ecosystem maturity." },
      ]}
    />
  );
}
