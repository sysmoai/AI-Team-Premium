import { ToolDetail } from "@/components/ToolDetail";
import { Video } from "lucide-react";


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "kling",
  "category": "video",
  "priceBdt": 599,
  "priceLabel": "৳599/mo",
  "model": "Kling 2.5",
  "contextWindow": "N/A (video gen)",
  "multimodal": "Text-to-video, image-to-video, lip-sync",
  "banglaQuality": "N/A",
  "speed": "~90 sec per 5-sec clip",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Mainstream",
  "brand": "Kuaishou",
  "tagline": "Long-form AI video, China-native",
  "toolPath": "/tools/kling",
  "iconName": "Video",
  "accent": "#06B6D4",
  "bestUseCase": "Long-form storytelling, social video, ads",
  "bestFor": [
    "Longer clips (up to 2 min vs Runway's 10 sec)",
    "Realistic human motion & physics",
    "Cheaper credit costs than Runway",
    "Strong lip-sync for talking-head videos"
  ],
  "weaknesses": [
    "UI primarily in Chinese (translated)",
    "Less established creative ecosystem"
  ]
} as const;

export default function KlingPage() {
  return (
    <ToolDetail
      name="Kling AI"
      tagline="in Bangladesh"
      description="Kling AI by Kuaishou is China's breakthrough AI video generator — producing realistic, smooth 1080p videos at 30fps. Kling 2.0 Master matches or beats Sora for motion quality at a fraction of the price. Perfect for Bangladeshi creators making social videos and ads. From ৳599/month via bKash/Nagad."
      accentColor="#E11D48"
      icon={Video}
      features={[
        "Kling 2.0 Master — highest quality model, smooth realistic motion at 30fps",
        "Text-to-video — generate professional clips from a text description",
        "Image-to-video — animate any photo into a cinematic video",
        "5 seconds to 3 minutes — longer clips than most competitors",
        "1080p HD resolution output",
        "Camera movement control — pan, zoom, orbit, tracking shots",
        "Face swap in video — change character faces realistically",
        "Lip sync — synchronise mouth movements to audio",
        "Video extension — extend existing clips up to 3 minutes",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Kling AI Standard — Shared",
          price: "৳599",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Credits", value: "660/month" },
            { label: "Resolution", value: "1080p HD" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Kling AI Pro — Personal",
          price: "৳1,799",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Credits", value: "3,000/month" },
            { label: "Access", value: "Private dedicated account" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/kling"
      specTables={[
        {
          title: "Video Generation — Kling 2.0 Master",
          emoji: "🎬",
          tier2Label: "Standard Shared (৳599/mo)",
          tier3Label: "Pro Personal (৳1,799/mo)",
          rows: [
            { label: "Best Model", free: "Kling 1.0 (limited)", pro: "Kling 2.0 Master", premium: "Kling 2.0 Master (priority)" },
            { label: "Credits Per Month", free: "66", pro: "660", premium: "3,000" },
            { label: "Videos Per Month (5s)", free: "~6", pro: "~60", premium: "~300" },
            { label: "Max Clip Duration", free: "5 seconds", pro: "Up to 3 minutes", premium: "Up to 3 minutes" },
            { label: "Resolution", free: "720p", pro: "1080p HD at 30fps", premium: "1080p HD at 30fps" },
            { label: "Text-to-Video", free: "Yes (limited)", pro: "Yes, full quality", premium: "Yes, full quality" },
            { label: "Image-to-Video", free: "No", pro: "Yes, animate any image", premium: "Yes, animate any image" },
            { label: "Camera Control", free: "No", pro: "Pan, zoom, orbit, track", premium: "Pan, zoom, orbit, track" },
          ],
        },
        {
          title: "Advanced Video Features",
          emoji: "🎞️",
          tier2Label: "Standard Shared (৳599/mo)",
          tier3Label: "Pro Personal (৳1,799/mo)",
          rows: [
            { label: "Face Swap in Video", free: "No", pro: "Yes, realistic", premium: "Yes, realistic" },
            { label: "Lip Sync to Audio", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Video Extension", free: "No", pro: "Yes (up to 3 min)", premium: "Yes (up to 3 min)" },
            { label: "Motion Brush", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Reference Character", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Elements Consistency", free: "No", pro: "Yes", premium: "Yes" },
            { label: "API Access", free: "No", pro: "No", premium: "Yes" },
            { label: "Private Generation Mode", free: "No", pro: "No (shared)", premium: "Yes (private)" },
          ],
        },
      ]}
      deepDive={{
        type: "video",
        intro: "Kling 2.0 Master produces the smoothest, most realistic AI video at 30fps — and supports clips up to 3 minutes, unique in the industry. Here are step-by-step video creation workflows for Bangladeshi creators, marketers, and educators.",
        workflows: [
          {
            step: 1,
            label: "Social Media Reel (Instagram / Facebook)",
            prompt: "Text-to-video: a traditional Bangladeshi rickshaw riding through neon-lit Dhaka streets at night, rain-slicked roads reflecting lights, cinematic slow motion, vibrant colours, smooth motion, 10 seconds, 1080p 30fps | Camera: tracking shot following rickshaw",
            result: "A scroll-stopping 10-second reel with cinematic quality — smooth 30fps motion makes it look like professional drone footage. Ready for Instagram Reels, TikTok, and Facebook video ads without any editing.",
          },
          {
            step: 2,
            label: "Product Video from Photo (E-commerce)",
            prompt: "Image-to-video | Upload: product photo of artisanal Bangladeshi mustard honey jar | Camera: slow 180° orbit around product | Lighting: warm golden, honey-coloured tones | Motion: subtle honey drip effect on lid, background bokeh shift | Duration: 8 seconds, 1080p",
            result: "A professional-quality product video from a single photograph. The camera orbits smoothly, lighting shifts naturally, and subtle product motion creates appetite appeal. Ready for Facebook Ads, Daraz, and Shopify product pages.",
          },
          {
            step: 3,
            label: "Long-Form Content (3 Minute Extended)",
            prompt: "Start: text-to-video — Bangladeshi tea gardens in Sylhet at dawn, misty, golden light, 10 seconds | Extend: same scene — sun rises higher, light shifts, birds appear, 30 seconds | Continue extending until 3 minutes | Use video extension for each 10-second batch",
            result: "A 3-minute continuous atmospheric video of Sylhet tea gardens — usable as a relaxing looping background video for YouTube (background music video), ambient display content, or a documentary B-roll sequence. No other AI video tool supports this length natively.",
          },
          {
            step: 4,
            label: "Face Swap for Brand Ambassador Content",
            prompt: "Face swap: Upload source video (model in branded uniform presenting product) + target face (client's face photo) | Maintain: lighting consistency, skin tone matching, natural expression sync | Output: 30-second brand ambassador video, 1080p",
            result: "The client's face is realistically placed on the model's body with perfect lighting and expression matching. Used for corporate brand videos, spokesperson content, and educational presenter videos where the actual person cannot attend a shoot.",
          },
        ],
        tips: [
          "For social media: 5–10 second clips at 1080p 30fps are ideal — smooth Kling motion stands out in feeds",
          "Image-to-video: upload high-resolution product photos (at least 1080px wide) for the best animated results",
          "Camera control: 'slow zoom in' with 'subtle parallax' creates the most natural-looking motion",
          "Face swap: use a well-lit, front-facing reference photo with even lighting for the most realistic results",
          "Video extension: extend in 10-second increments — each extension uses ~10 credits",
          "Lip sync works for Bangla audio — test with short clips first to verify pronunciation matching",
          "660 Standard credits = ~60 clips per month — batch-generate all social content in one session per week",
          "Chain Kling clips in CapCut (free) with Bangla narration and background music for complete local-language content",
        ],
      }}
      useCases={[
        {
          emoji: "📱",
          title: "Facebook & Instagram Reels",
          who: "Content creators, influencers, social media managers",
          makes: "Scroll-stopping short video content at 1080p without a camera or video crew",
          timeSaved: "Video shoot + edit ৳20,000 → ৳0",
          prompt: "Kling 2.0 Master: a traditional Bangladeshi rickshaw riding through a neon-lit Dhaka street at night, cinematic, smooth motion, 10 seconds",
        },
        {
          emoji: "🛒",
          title: "E-commerce Product Ads",
          who: "Daraz sellers, brand owners, digital marketers",
          makes: "Professional product videos from still photos — ready for Facebook and Google ads",
          timeSaved: "Video production ৳30,000 → ৳0",
          prompt: "Image-to-video: animate this product photo of traditional Bangladeshi honey — camera slowly reveals the jar, golden light, droplets of honey, 8 seconds",
        },
        {
          emoji: "🎵",
          title: "Music Video Production",
          who: "Independent artists, music labels, audio producers",
          makes: "Cinematic music video scenes matching the mood and tempo of any song",
          timeSaved: "Music video production ৳2,00,000 → ৳0",
          prompt: "Kling 2.0: slow-motion Bangladeshi classical singer performing in a candlelit room, traditional instruments visible, cinematic colour grade",
        },
        {
          emoji: "🏠",
          title: "Real Estate Walkthroughs",
          who: "Real estate agents, property developers",
          makes: "AI-generated apartment walkthrough videos from architectural renders",
          timeSaved: "Virtual tour production ৳50,000 → ৳0",
          prompt: "Image-to-video: generate a smooth camera walkthrough of this apartment floor plan render — starting at the entrance, moving through living room to balcony",
        },
        {
          emoji: "🎭",
          title: "Face Swap & Lip Sync",
          who: "Content creators, brand ambassadors, media teams",
          makes: "Put a client's face on an AI character, sync their voice to any video",
          timeSaved: "Professional face replacement ৳1,00,000 → ৳0",
          prompt: "Face swap: replace the character's face in this promotional video with the client's face, maintain realistic lighting and skin tone",
        },
        {
          emoji: "🌊",
          title: "Long-Form Video Content",
          who: "Documentary creators, educators, corporate trainers",
          makes: "Up to 3-minute continuous AI video sequences — unique among AI video tools",
          timeSaved: "Filming and editing weeks → hours",
          prompt: "Extend this 10-second scenic Bangladesh river clip to 3 minutes — add seasonal changes, different times of day, weather transitions",
        },
        {
          emoji: "🎓",
          title: "Educational Animation",
          who: "EdTech platforms, online tutors, schools",
          makes: "Engaging animated educational content with consistent characters explaining concepts",
          timeSaved: "Animation studio ৳1,50,000 per video → Kling Pro monthly",
          prompt: "Text-to-video: an animated teacher character explaining the water cycle in Bangla, whiteboard background, friendly and clear animation style, 60 seconds",
        },
      ]}
      competitorRows={[
        { feature: "Video Quality (1080p/30fps)", thisProduct: "⭐⭐⭐⭐⭐ (Kling 2.0 Master)", chatgpt: "Limited Sora", claude: "❌ No video", gemini: "⭐⭐⭐⭐ (Veo 2)" },
        { feature: "Max Clip Duration", thisProduct: "Up to 3 minutes", chatgpt: "Sora: up to 60s", claude: "❌ N/A", gemini: "Veo 2: 8 seconds" },
        { feature: "Image-to-Video", thisProduct: "✅ Yes, HD quality", chatgpt: "Limited", claude: "❌ No", gemini: "✅ Yes (Veo 2)" },
        { feature: "Face Swap in Video", thisProduct: "✅ Yes, realistic", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Lip Sync to Audio", thisProduct: "✅ Yes, built-in", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Camera Control", thisProduct: "✅ Pan, zoom, orbit, track", chatgpt: "Limited (Sora)", claude: "❌ No", gemini: "✅ Yes (Veo 2)" },
        { feature: "Video Extension", thisProduct: "✅ Up to 3 min total", chatgpt: "Limited (Sora)", claude: "❌ No", gemini: "❌ No" },
        { feature: "Motion Brush", thisProduct: "✅ Yes (control areas)", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Monthly Video Credits", thisProduct: "660/mo Std | 3,000/mo Pro", chatgpt: "Sora: limited", claude: "N/A", gemini: "Veo 2: ~5/day" },
        { feature: "Frame Rate", thisProduct: "30fps smooth motion", chatgpt: "24fps (Sora)", claude: "❌ N/A", gemini: "24fps (Veo 2)" },
        { feature: "API Access", thisProduct: "✅ Yes (Pro plan)", chatgpt: "✅ Via OpenAI API", claude: "❌ No video API", gemini: "✅ Via Google API" },
        { feature: "Best Use Case", thisProduct: "Social video, ads, long clips", chatgpt: "General AI + video", claude: "Writing & code", gemini: "Google ecosystem" },
        { feature: "AITP Shared Price", thisProduct: "৳599/mo", chatgpt: "৳499/mo (text AI)", claude: "৳1,495/mo (text AI)", gemini: "৳899/mo (Google AI)" },
      ]}
      extendedFaqs={[
        { q: "How many videos can I generate per month with Kling Standard (৳599)?", a: "Kling Standard includes 660 credits per month. Each 5-second HD video uses about 10 credits, so you can generate approximately 60 five-second clips per month. Longer clips use proportionally more credits — a 30-second video uses ~60 credits. The Pro plan (৳1,799/mo, 3,000 credits) generates ~300 five-second clips per month." },
        { q: "What is special about Kling 2.0 Master compared to earlier Kling versions?", a: "Kling 2.0 Master is Kuaishou's highest quality model — producing significantly smoother motion, more realistic physics, better adherence to text prompts, and higher fidelity character consistency than Kling 1.0 or 1.5. It matches or exceeds Sora (OpenAI) for motion realism in benchmark tests, particularly for fast-moving subjects and water/fluid dynamics." },
        { q: "Can Kling AI generate videos longer than 10 seconds?", a: "Yes — this is Kling's unique differentiator. Kling supports video generation up to 3 minutes in total length through its video extension feature. You start with a 5–10 second clip, then extend it continuously. This enables documentary-style sequences, product showcase videos, and educational content that most AI video tools (limited to 8–10 seconds) cannot produce." },
        { q: "How does face swap in Kling AI work?", a: "Kling's face swap feature lets you replace a character's face in any video with another face — from a photo you upload. The AI maintains realistic lighting, shadows, and skin texture matching the original video. This is used for brand ambassador videos (put a client's face on a model), educational content, and entertainment. Results are high-quality and smooth in motion." },
        { q: "Is Kling better than Runway for social media video creation?", a: "They excel in different areas. Kling is better for: longer clips (up to 3 minutes vs Runway's 10 seconds), face swap and lip sync features, and higher frame rate (30fps vs 24fps) for smoother social media video. Runway is better for: professional VFX workflows (inpainting, motion tracking, background removal, Act One character animation), background removal, and video-to-video style transfer. For pure social media content creation, Kling offers more value per taka." },
        { q: "What camera movements can I control in Kling AI?", a: "Kling's camera control system supports: pan (left/right), tilt (up/down), zoom in/out, orbit around a subject, tracking shots (following a moving subject), and push/pull (moving toward/away from subject). You specify camera movements in your prompt alongside the scene description. This gives cinematic-quality camera work in AI-generated videos without needing to manually animate anything." },
        { q: "Can I use Kling AI for Bangladeshi social media content?", a: "Yes. Kling excels at generating culturally relevant content — Bangladeshi street scenes, traditional settings, festivals, and contemporary Dhaka life all generate accurately from text prompts. The 1080p 30fps output meets the quality requirements for Facebook, YouTube, TikTok, and Instagram Reels. Many Bangladeshi content creators and agencies use Kling for consistent, high-volume social content." },
        { q: "What is Motion Brush in Kling and when do I use it?", a: "Motion Brush lets you paint over specific areas of your image before video generation to indicate where and how motion should occur. For example: paint over water to make it flow, over trees to make them sway, over a character's hair to create wind movement — while keeping the rest of the frame static. This gives precise control over which parts of the scene animate, producing more intentional and professional results." },
        { q: "Does Kling AI have lip sync for Bangla audio?", a: "Yes. Kling's lip sync feature can synchronise a character's mouth movements to any audio, including Bangla speech. Upload a video clip and a Bangla audio track, and Kling generates mouth animation that matches the words. For Bangladeshi educational content creators and media producers making Bangla-dubbed content, this is a powerful tool." },
        { q: "How is Kling AI delivered from AITP?", a: "The Shared plan (৳599/mo) provides credentials within 5–15 minutes of WhatsApp payment confirmation. The Personal Pro plan (৳1,799/mo) is set up on your dedicated account within 2–4 hours. Both plans include a 30-day replacement warranty and 24/7 WhatsApp support in Bangla and English. You access Kling at klingai.com or the Kling mobile app." },
        { q: "Can I use Kling API for my app or website?", a: "Yes. The Pro plan includes Kling API access, allowing you to integrate video generation directly into your application or website. This is useful for Bangladeshi developers building video-generation SaaS products, content platforms, or marketing automation tools. The API returns video URLs you can embed or process programmatically. Contact us on WhatsApp for enterprise API pricing." },
      ]}
    />
  );
}
