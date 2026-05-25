import { ToolDetail } from "@/components/ToolDetail";
import { Cpu } from "lucide-react";

export default function SuperGrok() {
  return (
    <ToolDetail
      name="SuperGrok"
      tagline="by xAI — in Bangladesh"
      description="xAI's most powerful AI tier — SuperGrok brings Grok 3 with Big Brain mode, unlimited Aurora image generation, video generation, real-time X + web data, and 1M-token context. The only AI with live X/Twitter intelligence. Pay with bKash/Nagad from ৳499/month."
      accentColor="#7C3AED"
      icon={Cpu}
      features={[
        "Grok 3 — xAI's flagship model, competitive with GPT-4.5 and Claude Sonnet on benchmarks",
        "Big Brain mode — extended deep reasoning for math, science, and complex logic",
        "DeepSearch — real-time synthesis of X/Twitter data + entire web",
        "Aurora image generation — unlimited photorealistic AI images per month",
        "Video generation — create short AI videos from text prompts",
        "1,000,000 token context window — analyse entire codebases or books",
        "Real-time information — no knowledge cut-off, live data always",
        "Voice mode — natural Bangla and English speech conversation",
        "Code generation, debugging, and full project scaffolding",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "SuperGrok — Shared Seat",
          price: "৳499",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Seat type", value: "5–6 shared users" },
            { label: "Images", value: "Unlimited Aurora" },
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
            { label: "Seat type", value: "Your own X account" },
            { label: "Images", value: "Unlimited + priority" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/supergrok"
      specTables={[
        {
          title: "AI Chat & Reasoning",
          emoji: "🤖",
          rows: [
            { label: "AI Model", free: "Grok 3 Mini", pro: "Grok 3 (full)" },
            { label: "Context Window", free: "Limited", pro: "1,000,000 tokens" },
            { label: "Big Brain / Think Mode", free: "No", pro: "Unlimited" },
            { label: "DeepSearch", free: "Limited", pro: "Unlimited" },
            { label: "Real-time X data", free: "Yes (limited)", pro: "Full live access" },
            { label: "Web Search", free: "Yes", pro: "Yes + citations" },
            { label: "Voice Mode", free: "No", pro: "Yes" },
            { label: "File Upload", free: "No", pro: "Images, PDFs, docs" },
          ],
        },
        {
          title: "Aurora Image Generation",
          emoji: "🖼️",
          rows: [
            { label: "Image Engine", free: "Basic", pro: "Aurora (xAI)" },
            { label: "Images Per Month", free: "10/month", pro: "Unlimited" },
            { label: "Resolution", free: "Standard", pro: "Up to 4K" },
            { label: "Generation Speed", free: "Slow", pro: "~8 seconds" },
            { label: "Photorealism", free: "Basic", pro: "Ultra-realistic" },
            { label: "Style Control", free: "Limited", pro: "Full prompting" },
            { label: "Reference Image Upload", free: "No", pro: "Yes" },
            { label: "Commercial Use", free: "No", pro: "Yes" },
          ],
        },
        {
          title: "Video Generation",
          emoji: "🎬",
          rows: [
            { label: "Video Engine", free: "None", pro: "Grok Video (xAI)" },
            { label: "Videos Per Month", free: "None", pro: "Limited (beta)" },
            { label: "Max Duration", free: "—", pro: "Up to 10 seconds" },
            { label: "Max Resolution", free: "—", pro: "720p" },
            { label: "Text-to-Video", free: "No", pro: "Yes" },
            { label: "Image-to-Video", free: "No", pro: "Yes (beta)" },
          ],
        },
        {
          title: "Coding & Other Features",
          emoji: "💻",
          rows: [
            { label: "Code Generation", free: "Basic", pro: "Full project scaffold" },
            { label: "Code Debugging", free: "Limited", pro: "Deep analysis" },
            { label: "Document Analysis", free: "No", pro: "Yes, PDFs & docs" },
            { label: "Bangla Support", free: "Yes", pro: "Yes (strong)" },
            { label: "Data Analysis", free: "Basic", pro: "Advanced + charts" },
            { label: "API Access", free: "No", pro: "Via xAI API" },
          ],
        },
      ]}
      useCases={[
        {
          emoji: "🎓",
          title: "Academic Research",
          who: "University students, researchers",
          makes: "Literature review with live X discussions + web papers synthesised",
          timeSaved: "8 hours → 25 minutes",
          prompt: "DeepSearch বাংলাদেশের জলবায়ু পরিবর্তন নিয়ে সর্বশেষ গবেষণা ও Twitter আলোচনা একসাথে বিশ্লেষণ করো",
        },
        {
          emoji: "🎨",
          title: "AI Image Creation",
          who: "Content creators, designers, marketers",
          makes: "Unlimited photorealistic product images, social media visuals, thumbnails",
          timeSaved: "৳5,000 design cost → ৳0",
          prompt: "Aurora: a Bangladeshi street food stall at night, cinematic lighting, ultra-realistic, 4K",
        },
        {
          emoji: "💻",
          title: "Software Development",
          who: "Freelance developers, CS students",
          makes: "Full React component with hooks, tests, and documentation from a single prompt",
          timeSaved: "4 hours → 20 minutes",
          prompt: "Build a complete Bengali e-commerce product card component in React with TypeScript, Tailwind, and cart state",
        },
        {
          emoji: "📊",
          title: "Business Intelligence",
          who: "Startup founders, e-commerce owners",
          makes: "Real-time competitor analysis using X posts + web data",
          timeSaved: "2 days research → 30 minutes",
          prompt: "DeepSearch: আমার Daraz competitor-দের সর্বশেষ pricing strategy এবং customer complaints বিশ্লেষণ করো",
        },
        {
          emoji: "🎬",
          title: "Video Content",
          who: "YouTubers, TikTok creators",
          makes: "Short AI video clips for intros, transitions, and social reels",
          timeSaved: "৳3,000 video production → ৳0",
          prompt: "Generate a 5-second cinematic intro: a glowing AI brain transforming into the Bangladeshi flag",
        },
        {
          emoji: "🧠",
          title: "Deep Problem Solving",
          who: "Consultants, analysts, engineers",
          makes: "Multi-step mathematical proofs and engineering calculations with Big Brain mode",
          timeSaved: "Expert consultation (৳5,000) → ৳0",
          prompt: "Big Brain: একটি 500-user SaaS-এর optimal database sharding strategy calculate করো, BD server costs সহ",
        },
      ]}
      competitorRows={[
        { feature: "AI Model", thisProduct: "Grok 3 (xAI)", chatgpt: "GPT-4.5 / o4-mini", claude: "Claude Sonnet 4", gemini: "Gemini 2.5 Pro" },
        { feature: "Context Window", thisProduct: "1M tokens", chatgpt: "128K tokens", claude: "200K tokens", gemini: "1M tokens" },
        { feature: "Real-time X/Twitter Data", thisProduct: "✅ Full live", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Image Generation", thisProduct: "✅ Unlimited (Aurora)", chatgpt: "GPT-image-1 (limited)", claude: "❌ No", gemini: "✅ Yes (Imagen 4)" },
        { feature: "Video Generation", thisProduct: "✅ Yes (beta)", chatgpt: "Limited (Sora)", claude: "❌ No", gemini: "✅ Yes (Veo 2)" },
        { feature: "Deep Reasoning", thisProduct: "✅ Big Brain", chatgpt: "✅ o3/o4-mini", claude: "✅ Extended Thinking", gemini: "✅ Flash Thinking" },
        { feature: "Knowledge Cut-off", thisProduct: "✅ None (live)", chatgpt: "Apr 2024", claude: "Apr 2024", gemini: "✅ Live (Google)" },
        { feature: "AITPBD Shared Price", thisProduct: "৳499/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
      ]}
      extendedFaqs={[
        { q: "What is the difference between SuperGrok and regular Grok?", a: "SuperGrok is xAI's premium tier at $30/month (vs free Grok). It unlocks unlimited Aurora image generation, video generation, Big Brain deep reasoning mode, higher message limits, and priority access. Regular Grok has very limited image generation and no video." },
        { q: "How many images can I generate with SuperGrok per day?", a: "SuperGrok includes unlimited Aurora image generation — there's no strict daily cap. You can generate as many photorealistic images as you need. Free Grok limits users to about 10 images per month." },
        { q: "Does SuperGrok have real-time access to X (Twitter)?", a: "Yes — this is SuperGrok's killer differentiator. It integrates live X/Twitter data via DeepSearch, so you can research trending topics, analyse public sentiment, and get real-time insights from the X platform. No other major AI has this." },
        { q: "What is Big Brain mode in SuperGrok?", a: "Big Brain is xAI's extended reasoning mode — similar to OpenAI's o3 or Claude's Extended Thinking. It gives Grok more 'thinking time' to work through complex problems step-by-step, making it significantly better at math, science, coding, and logical analysis." },
        { q: "Can I use SuperGrok for video generation in Bangladesh?", a: "Yes. SuperGrok includes access to Grok Video, xAI's text-to-video and image-to-video generator (currently in beta). It can create short clips up to 10 seconds at 720p. This feature is included in both Shared and Personal plans from AITPBD." },
        { q: "Is Grok better than ChatGPT for Bangladesh users?", a: "SuperGrok has specific advantages: unlimited image generation (ChatGPT caps this), real-time X data (ChatGPT has none), and video generation. However, ChatGPT has a larger ecosystem of plugins and custom GPTs. For visual content creators and researchers who need live social data, SuperGrok wins. For document analysis and coding, they're comparable." },
      ]}
    />
  );
}
