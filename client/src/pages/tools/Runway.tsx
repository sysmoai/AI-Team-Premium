import { ToolDetail } from "@/components/ToolDetail";
import { Film } from "lucide-react";


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "runway",
  "category": "video",
  "priceBdt": 1499,
  "priceLabel": "৳1,499/mo",
  "model": "Gen-4 + Gen-4 Turbo",
  "contextWindow": "N/A (video gen)",
  "multimodal": "Text-to-video, image-to-video, video-to-video",
  "banglaQuality": "N/A",
  "speed": "~60 sec per 5-sec clip",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "Runway",
  "tagline": "AI video — Gen-4 cinema quality",
  "toolPath": "/tools/runway",
  "iconName": "Video",
  "accent": "#FF6B6B",
  "bestUseCase": "Filmmakers, ad agencies, content studios",
  "bestFor": [
    "Text-to-video with cinematic motion",
    "Image-to-video (animate stills)",
    "Pro-grade timeline editor + green screen",
    "Hollywood-used motion brush controls"
  ],
  "weaknesses": [
    "Limited free credits, paid plans add up",
    "Shorter clip lengths than Kling"
  ]
} as const;

export default function RunwayPage() {
  return (
    <ToolDetail
      name="Runway ML"
      tagline="in Bangladesh"
      description="Runway ML is the professional AI video studio used by Hollywood productions, ad agencies, and top content creators. Gen-4 Turbo text-to-video, image-to-video animation, inpainting, background removal, and motion tracking — all in one platform. Available in Bangladesh from ৳999/month via bKash/Nagad."
      accentColor="#00C4B4"
      icon={Film}
      features={[
        "Gen-4 Turbo — fastest, highest-quality AI video generation",
        "Text-to-video — describe a scene, get a professional clip",
        "Image-to-video — animate any photo or AI-generated image",
        "Video-to-video — transform existing footage with AI styles",
        "Act One — AI character animation from reference video",
        "Inpainting — remove or replace objects in video frame-by-frame",
        "Motion Tracking — AI tracks objects for VFX overlays",
        "Background Removal (Green Screen) — without an actual green screen",
        "720p to 4K upscaling of existing videos",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Runway Standard — Shared",
          price: "৳999",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Credits", value: "625/month" },
            { label: "Resolution", value: "Up to 1080p" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Runway Pro — Personal",
          price: "৳2,999",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Credits", value: "2,250/month" },
            { label: "Resolution", value: "4K upscaling" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/runway"
      specTables={[
        {
          title: "Video Generation — Gen-4 Turbo",
          emoji: "🎬",
          tier2Label: "Standard Shared (৳999/mo)",
          tier3Label: "Pro Personal (৳2,999/mo)",
          rows: [
            { label: "Best Model", free: "Gen-3 Alpha (limited)", pro: "Gen-4 Turbo", premium: "Gen-4 Turbo (priority)" },
            { label: "Credits Per Month", free: "125", pro: "625", premium: "2,250" },
            { label: "Videos Per Month (5s)", free: "~5", pro: "~60", premium: "~225" },
            { label: "Max Clip Duration", free: "4 seconds", pro: "10 seconds", premium: "10 seconds" },
            { label: "Max Resolution", free: "720p", pro: "1080p", premium: "1080p + 4K upscale" },
            { label: "Image-to-Video", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Video-to-Video Restyle", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Priority Queue", free: "No", pro: "Standard", premium: "Priority" },
          ],
        },
        {
          title: "Professional VFX Tools",
          emoji: "🎞️",
          tier2Label: "Standard Shared (৳999/mo)",
          tier3Label: "Pro Personal (৳2,999/mo)",
          rows: [
            { label: "Inpainting (remove objects)", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Background Removal", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Motion Tracking", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Act One (character anim.)", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Slow Motion", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Video Upscaling (4K)", free: "No", pro: "No", premium: "Yes" },
            { label: "Audio Sync", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Lip Sync (face)", free: "No", pro: "Yes", premium: "Yes" },
          ],
        },
      ]}
      deepDive={{
        type: "video",
        intro: "Runway ML Gen-4 Turbo is used in Hollywood productions and the world's leading advertising campaigns. Here are step-by-step video production workflows for Bangladeshi creators — from social media reels to professional ads.",
        workflows: [
          {
            step: 1,
            label: "Product Video Ad (Facebook / Instagram)",
            prompt: "Image-to-video | Upload: product photo of Bangladeshi honey jar | Camera motion: slow zoom in, slight parallax | Lighting: golden, warm, studio | Motion: honey drips slightly, background bokeh shifts | Duration: 8 seconds | Resolution: 1080p",
            result: "A ৳50,000-quality product video ad from a single product photo. The camera moves naturally, light shifts warmly, and subtle motion makes it look like a live premium studio shoot. Ready for Facebook Ads Manager upload.",
          },
          {
            step: 2,
            label: "YouTube Channel Intro (Text-to-Video)",
            prompt: "Text-to-video: a glowing neural network of light particles converging into a golden hexagon logo, dark background, cinematic slow motion, dramatic orchestral feel, light particles trail and orbit, 5 seconds, 1080p, --style cinematic",
            result: "A professional YouTube intro comparable to those made by motion graphics studios. No After Effects knowledge needed — generate, download as MP4, and add to the start of every video in CapCut or Adobe Premiere.",
          },
          {
            step: 3,
            label: "Interview Background Swap (AI Green Screen)",
            prompt: "Upload: interview video recorded at home against white wall | Background Removal: remove background | New background: modern corporate office interior, Dhaka skyline through glass windows, shallow depth of field, naturally lit | Maintain: lighting match on subject",
            result: "The interviewee appears in a professional broadcast studio without physically being there. Used by Bangladeshi journalists, YouTubers, and corporate communicators to create credible, professional-looking interview footage from any location.",
          },
          {
            step: 4,
            label: "Act One Character Animation",
            prompt: "Act One: Upload reference performance video (person speaking and gesturing) | Apply to: AI-generated 3D character (or 2D illustration) | Character style: professional animated presenter, clean and corporate | Preserve: facial expressions, hand gestures, head movement",
            result: "The AI character performs with the same expressions and movements as the reference actor. Used for educational videos, corporate training content, and animated brand spokespeople — without a dedicated 3D animation team.",
          },
        ],
        tips: [
          "For product videos, shoot or generate a clean product image first — better input = better video output",
          "Image-to-video with subtle camera motion (2–3 degrees of movement) looks more natural than dramatic pans",
          "Background Removal works best with good contrast between subject and background — avoid patterned backgrounds",
          "Act One works best with clear, well-lit reference video — avoid dark or backlit footage",
          "Chain multiple 10-second clips together in CapCut or Premiere for longer content",
          "Runway Gen-4 Turbo follows text prompts very precisely — be descriptive about lighting, style, and motion",
          "625 Standard credits = ~60 clips per month — plan one batch generation day per week for social content",
          "Export at 1080p and compress with HandBrake for WhatsApp and Facebook sharing to reduce file size",
        ],
      }}
      useCases={[
        {
          emoji: "🎬",
          title: "YouTube & TikTok Intros",
          who: "Content creators, influencers, YouTubers",
          makes: "Cinematic 5–10 second branded intro animations without video editing skills",
          timeSaved: "Motion designer ৳10,000 → ৳0",
          prompt: "Gen-4 Turbo: a futuristic neural network dissolving into a golden AI logo, cinematic 1080p, dramatic orchestral, 5 seconds",
        },
        {
          emoji: "🛒",
          title: "Product Video Ads",
          who: "E-commerce brands, Daraz sellers, marketing agencies",
          makes: "Professional product showcase videos for Facebook and Instagram ads",
          timeSaved: "৳50,000 video production → ৳0",
          prompt: "Image-to-video: animate this product photo — camera slowly orbits the premium skincare bottle, soft bokeh, lifestyle setting, 8 seconds",
        },
        {
          emoji: "🎭",
          title: "AI Character Animation",
          who: "Filmmakers, game developers, animators",
          makes: "Animate AI characters from a reference performance video using Act One",
          timeSaved: "Motion capture studio ৳5,00,000 → Runway Act One",
          prompt: "Act One: capture facial expressions from this reference video of an actor, apply to the AI-generated character model",
        },
        {
          emoji: "📰",
          title: "News & Explainer Videos",
          who: "Media outlets, educators, training teams",
          makes: "B-roll and explainer visuals for news stories, educational content, and corporate training",
          timeSaved: "Stock footage library ৳10,000/mo → Runway generation",
          prompt: "Text-to-video: Bangladesh flooding documentary footage, drone view, photorealistic climate documentary style, 10 seconds",
        },
        {
          emoji: "🌐",
          title: "AI Background Removal",
          who: "Video editors, content creators without studio equipment",
          makes: "Professional-looking background removal without an actual green screen",
          timeSaved: "Green screen studio setup ৳50,000 → Runway AI",
          prompt: "Remove background from this interview video, replace with a modern office environment, lighting matched to subject",
        },
        {
          emoji: "🎞️",
          title: "Film & Short Video Production",
          who: "Filmmakers, ad agencies, creative directors",
          makes: "High-quality AI scenes that cut into live-action footage seamlessly",
          timeSaved: "VFX team ৳5,00,000 → Runway Pro ৳2,999/mo",
          prompt: "Gen-4 Turbo: a traditional Bangladeshi fishing boat on the Padma river at sunrise, cinematic anamorphic lens, golden hour, 10 seconds",
        },
        {
          emoji: "🎓",
          title: "Educational & Training Videos",
          who: "EdTech companies, corporate trainers, university faculty",
          makes: "Professional animated explainer videos for complex topics without animators",
          timeSaved: "Animation studio ৳1,00,000 per module → Runway monthly",
          prompt: "Text-to-video: animate a diagram showing how bKash peer-to-peer transactions work — clean infographic style, 2D animation, 10 seconds",
        },
      ]}
      competitorRows={[
        { feature: "Video Quality", thisProduct: "⭐⭐⭐⭐⭐ (professional grade)", chatgpt: "Limited Sora access", claude: "❌ No video", gemini: "⭐⭐⭐⭐ (Veo 2)" },
        { feature: "Max Clip Duration", thisProduct: "10 seconds (Gen-4)", chatgpt: "Sora: up to 60s", claude: "❌ N/A", gemini: "Veo 2: 8 seconds" },
        { feature: "Image-to-Video", thisProduct: "✅ Yes, full control", chatgpt: "Limited Sora", claude: "❌ No", gemini: "✅ Yes (Veo 2)" },
        { feature: "Video-to-Video Restyle", thisProduct: "✅ Full style transfer", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Inpainting (remove objects)", thisProduct: "✅ Frame-accurate", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "AI Background Removal", thisProduct: "✅ No green screen needed", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Act One (character anim.)", thisProduct: "✅ Unique to Runway", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Motion Tracking", thisProduct: "✅ Professional VFX", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "4K Upscaling", thisProduct: "✅ Yes (Pro plan)", chatgpt: "❌ No", claude: "❌ No", gemini: "Limited" },
        { feature: "Hollywood Use", thisProduct: "✅ Used in major films", chatgpt: "Limited Sora", claude: "❌ No", gemini: "Growing adoption" },
        { feature: "Lip Sync", thisProduct: "✅ Yes, built-in", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Credits System", thisProduct: "625/mo Standard | 2,250/mo Pro", chatgpt: "Sora: separate pricing", claude: "N/A", gemini: "Veo 2: ~5/day" },
        { feature: "AITPBD Shared Price", thisProduct: "৳999/mo", chatgpt: "৳399/mo (text AI)", claude: "৳599/mo (text AI)", gemini: "৳449/mo (Google AI)" },
      ]}
      extendedFaqs={[
        { q: "How many videos can I generate per month with Runway Standard (৳999)?", a: "Runway Standard gives 625 credits per month. Each 5-second video clip at 720p uses about 10 credits. This means approximately 60 five-second clips per month. For 10-second clips, it's about 30 per month. The Pro plan (৳2,999/mo, 2,250 credits) generates ~225 five-second clips per month." },
        { q: "What is the difference between Gen-3 Alpha and Gen-4 Turbo in Runway?", a: "Gen-4 Turbo is Runway's latest and most advanced model — faster, higher quality, and more accurately follows complex prompts. Gen-3 Alpha was the previous generation. The Shared plan from AITPBD gives access to Gen-4 Turbo, giving you the best quality available." },
        { q: "Can Runway ML remove backgrounds from videos without a green screen?", a: "Yes. Runway's AI Background Removal works on any video footage — it precisely separates the foreground subject from background without needing a physical green screen or studio setup. For Bangladeshi content creators who don't have studio equipment, this allows professional-looking virtual backgrounds on any video." },
        { q: "What is Act One in Runway and how does it work?", a: "Act One is Runway's character animation feature. You record yourself (or an actor) performing expressions, gestures, and movements on video. Act One transfers those movements onto an AI-generated character. For game developers, animators, and filmmakers in Bangladesh, this enables professional character animation without motion capture equipment." },
        { q: "Is Runway Gen-4 Turbo better than Sora (OpenAI) for video quality?", a: "Both are professional-grade tools. The key differences: Runway has more professional editing tools (inpainting, motion tracking, background removal, Act One) which make it a complete post-production platform. Sora supports longer clips (up to 60 seconds vs Runway's 10 seconds). For full video production workflows, Runway wins. For longer single clips, Sora has an edge." },
        { q: "Can Bangladeshi filmmakers and ad agencies use Runway professionally?", a: "Absolutely. Runway is used in Hollywood productions and major international advertising campaigns. Bangladeshi production houses and ad agencies can use Runway to: generate B-roll and establishing shots without location filming, add VFX to live footage, create animated explainer videos, and produce social media ad content. The Standard plan (৳999/mo) covers most agency needs." },
        { q: "Does Runway support image-to-video animation?", a: "Yes. Image-to-video is one of Runway's most popular features. Upload any image (product photo, portrait, landscape, AI-generated image) and Runway animates it into a video clip — camera movements, environmental effects like wind or water, and subject motion. Perfect for e-commerce product videos from static product photography." },
        { q: "What does video-to-video restyle mean in Runway?", a: "Video-to-video restyle lets you take an existing video and transform its visual style with AI. For example: take a standard live-action video and restyle it to look like a watercolour painting, cyberpunk animation, or film noir — while preserving the original motion and composition. Used in music videos, art projects, and brand content." },
        { q: "Can Runway upscale low-quality videos to 4K?", a: "Yes, on the Pro plan (৳2,999/mo). Runway's video upscaler takes 480p or 720p footage and enhances it to up to 4K — adding detail and sharpness. Useful for Bangladeshi content creators who have older archival footage or phone camera recordings that need to look professional for modern platforms." },
        { q: "How is Runway delivered from AITPBD?", a: "The Shared plan (৳999/mo) provides Runway Standard account credentials within 5–15 minutes of WhatsApp payment confirmation. The Personal Pro plan (৳2,999/mo) is set up on your own Runway account within 2–4 hours. Both plans come with a 30-day replacement warranty and 24/7 WhatsApp support in Bangla and English." },
        { q: "What is the minimum video clip length I can generate in Runway?", a: "Runway Gen-4 Turbo generates video clips with a minimum of approximately 4 seconds and up to 10 seconds per generation. You can concatenate multiple clips in video editing software to create longer videos. For a 60-second ad, you would generate 6–10 clips and edit them together — this is standard workflow for Runway-based production." },
      ]}
    />
  );
}
