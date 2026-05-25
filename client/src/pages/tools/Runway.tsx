import { ToolDetail } from "@/components/ToolDetail";
import { Film } from "lucide-react";

export default function RunwayPage() {
  return (
    <ToolDetail
      name="Runway ML"
      tagline="in Bangladesh"
      description="Runway ML is the professional AI video generation studio — used by Hollywood filmmakers and top YouTube creators. Gen-3 Alpha creates cinema-quality video from text or images. Perfect for Bangladeshi YouTubers, ad agencies, and video editors. From ৳899/month via bKash/Nagad."
      accentColor="#00D4FF"
      icon={Film}
      features={[
        "Gen-3 Alpha Turbo — Runway's fastest, highest-quality video model",
        "Text-to-Video — describe any scene and get cinema-quality results",
        "Image-to-Video — bring any photo to life with natural motion",
        "Video-to-Video — restyle or transform existing video footage",
        "Motion Brush — paint specific areas to animate independently",
        "Act-One — animate characters from reference video (face/body)",
        "Multi-Motion Brush — complex scene control for professional editors",
        "AI Background Removal — remove video backgrounds in real time",
        "Director Mode — camera control (pan, zoom, dolly, orbit)",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Runway Standard — Shared",
          price: "৳899",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Credits", value: "625/month" },
            { label: "Videos", value: "~40 × 10-sec clips" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Runway Pro — Shared",
          price: "৳1,799",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Pro Shared",
          specs: [
            { label: "Credits", value: "2,250/month" },
            { label: "Videos", value: "~150 × 10-sec clips" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/runway"
      specTables={[
        {
          title: "Video Generation (Gen-3 Alpha)",
          emoji: "🎬",
          rows: [
            { label: "Top Model", free: "Gen-2 (limited)", pro: "Gen-3 Alpha Turbo" },
            { label: "Credits Per Month", free: "125 (free tier)", pro: "625 (Standard)" },
            { label: "Videos Per Month (10s)", free: "~8 clips", pro: "~40 clips" },
            { label: "Max Duration Per Clip", free: "4 seconds", pro: "10 seconds" },
            { label: "Max Resolution", free: "720p", pro: "1080p" },
            { label: "Text-to-Video", free: "Yes", pro: "Yes (Gen-3 Alpha)" },
            { label: "Image-to-Video", free: "Yes (basic)", pro: "Yes (high quality)" },
            { label: "Video-to-Video", free: "No", pro: "Yes" },
          ],
        },
        {
          title: "Professional Features",
          emoji: "🎥",
          rows: [
            { label: "Motion Brush", free: "No", pro: "Yes" },
            { label: "Act-One (face animation)", free: "No", pro: "Yes" },
            { label: "Director Mode (camera)", free: "No", pro: "Yes" },
            { label: "Multi-Motion Brush", free: "No", pro: "Yes" },
            { label: "Background Removal", free: "No", pro: "Yes" },
            { label: "Upscale to 4K", free: "No", pro: "Yes (add-on)" },
            { label: "Commercial Rights", free: "No", pro: "Yes" },
            { label: "Watermark", free: "Yes", pro: "No" },
          ],
        },
      ]}
      useCases={[
        {
          emoji: "📺",
          title: "YouTube Intros & Outros",
          who: "YouTubers, educators, content creators",
          makes: "Professional 5–10 second animated intros and branded outros",
          timeSaved: "৳10,000 motion design → ৳0",
          prompt: "Gen-3 Alpha: cinematic drone shot over Dhaka skyline at sunset, golden hour, sweeping right-to-left pan, 4K",
        },
        {
          emoji: "📱",
          title: "Social Media Ads",
          who: "Brand managers, digital marketers, agencies",
          makes: "10-second video ads for Facebook, Instagram, and TikTok",
          timeSaved: "৳25,000 video production → ৳0",
          prompt: "A Bangladeshi woman confidently unboxing a luxury skincare product, soft studio lighting, cinematic close-ups",
        },
        {
          emoji: "🎬",
          title: "Film Pre-Visualisation",
          who: "Filmmakers, ad directors, storyboard artists",
          makes: "Scene previsualisations to show clients before expensive shoots",
          timeSaved: "3-day shoot → approved in 30 min",
          prompt: "Pre-vis: a rickshaw moving through Old Dhaka rain at night, cinematic, wet reflections on street",
        },
        {
          emoji: "🏢",
          title: "Corporate Presentation Videos",
          who: "Business executives, consultants",
          makes: "Professional B-roll footage for pitch decks and company videos",
          timeSaved: "৳50,000 stock footage → ৳0",
          prompt: "Modern Bangladeshi office with diverse team collaborating around a table, professional lighting, dolly shot",
        },
        {
          emoji: "🎓",
          title: "Educational Explainer Videos",
          who: "Teachers, EdTech creators, coaching centres",
          makes: "Visual explainers for complex concepts — science, math, history",
          timeSaved: "2 weeks animation → 2 hours",
          prompt: "Animated explainer: how photosynthesis works, clean whiteboard style, colourful and clear, educational",
        },
        {
          emoji: "🛍️",
          title: "Product Launch Videos",
          who: "E-commerce brands, startup founders",
          makes: "Full product reveal video sequence for website and social launch",
          timeSaved: "৳1,00,000 production → ৳5,000",
          prompt: "Luxury product reveal: a handmade Bangladeshi jute bag slowly rotating on a dark studio background, cinematic",
        },
      ]}
      competitorRows={[
        { feature: "Video Quality", thisProduct: "⭐⭐⭐⭐⭐ (Gen-3 Alpha)", chatgpt: "⭐⭐⭐ (Sora, limited)", claude: "❌ No video", gemini: "⭐⭐⭐⭐ (Veo 2)" },
        { feature: "Max Duration", thisProduct: "10 seconds/clip", chatgpt: "20 sec (Sora Pro)", claude: "None", gemini: "8 seconds" },
        { feature: "Resolution", thisProduct: "1080p", chatgpt: "1080p (Sora)", claude: "None", gemini: "1080p" },
        { feature: "Director Mode", thisProduct: "✅ Full camera control", chatgpt: "Limited", claude: "❌ No", gemini: "✅ Yes" },
        { feature: "Act-One / Face Animate", thisProduct: "✅ Yes", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Video-to-Video", thisProduct: "✅ Yes", chatgpt: "Limited", claude: "❌ No", gemini: "Limited" },
        { feature: "Best For", thisProduct: "Professional video", chatgpt: "General AI + Sora add-on", claude: "Writing/code", gemini: "Google ecosystem" },
        { feature: "AITPBD Shared Price", thisProduct: "৳899/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
      ]}
      extendedFaqs={[
        { q: "How many videos can I generate with Runway Standard per month?", a: "Runway Standard includes 625 credits per month. Each 10-second Gen-3 Alpha Turbo generation costs approximately 15 credits, meaning roughly 40 full-length 10-second clips per month. Shorter clips (4 seconds) cost ~6 credits, giving you up to 100 clips per month." },
        { q: "What is Gen-3 Alpha and why is it better than Gen-2?", a: "Gen-3 Alpha is Runway's latest video model, significantly better than Gen-2 in terms of motion coherence, lighting realism, and following complex prompts. Gen-3 Alpha Turbo is the faster version — 2–3× quicker than the full Gen-3 Alpha with only minimal quality trade-off, making it ideal for rapid iteration." },
        { q: "Can Runway ML create videos longer than 10 seconds?", a: "Each individual generation is capped at 10 seconds. However, you can chain multiple clips together using video editing software (DaVinci Resolve, Premiere, CapCut) to create longer videos. Many professional Runway users chain 6–10 clips to create 1-minute videos." },
        { q: "What is Runway Act-One and how does it work?", a: "Act-One lets you animate a character using a reference video of a real person. You record yourself (or anyone) speaking or moving, upload it, and Act-One transfers those facial expressions and movements onto any AI-generated or illustrated character. Perfect for animating mascots, cartoon characters, or game sprites." },
        { q: "Is Runway ML used by professional filmmakers?", a: "Yes — Runway is used by major Hollywood studios and ad agencies worldwide. Films like Everything Everywhere All at Once used early Runway tools. Major brands including Nike, Apple, and Netflix have used Runway for commercial production. This is a professional-grade tool, not a toy." },
      ]}
    />
  );
}
