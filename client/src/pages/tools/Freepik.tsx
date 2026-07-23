import { ToolDetail } from "@/components/ToolDetail";
import { Image as ImageIcon } from "lucide-react";

export const TOOL_META = {
  "slug": "freepik",
  "category": "image",
  "priceBdt": 499,
  "priceLabel": "৳499/mo",
  "model": "Magnific (multi-model: Flux, SD, Sora, Pika, Suno)",
  "contextWindow": "N/A (image gen + stock)",
  "multimodal": "Text-to-image, AI video, AI audio, stock assets",
  "banglaQuality": "N/A",
  "speed": "Fast (5-20 sec)",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Budget",
  "brand": "Freepik (Magnific)",
  "tagline": "AI image, video, audio + 200M stock assets",
  "toolPath": "/tools/freepik",
  "iconName": "Image",
  "accent": "#FF6B35",
  "bestUseCase": "All-in-one AI + stock media creation",
  "bestFor": [
    "AI image generation with multiple models",
    "AI video generation (Sora 2, Pika)",
    "200M+ premium stock assets",
    "AI audio & music generation"
  ],
  "weaknesses": [
    "Credit-based system limits high-volume use",
    "Less artistic quality than Midjourney"
  ]
} as const;

const USE_CASES = [
  {
    emoji: "🖼️",
    title: "AI Image Generation + Stock Library",
    who: "Designers, marketers, content creators",
    makes: "AI-generated images plus 200M+ premium stock photos in one platform",
    timeSaved: "Multiple subscriptions → one Freepik account",
    prompt: "Generate a modern Bangladeshi office interior with AI, then search stock for 'Dhaka skyline' — all in one platform.",
  },
  {
    emoji: "🎬",
    title: "AI Video Generation",
    who: "Video creators, social media managers",
    makes: "AI videos using Sora 2, Pika, and other models — directly in Freepik",
    timeSaved: "1 hour video editing → 30 seconds AI generation",
    prompt: "A cinematic drone shot flying over the Sundarbans mangrove forest, golden hour lighting, 4K quality.",
  },
  {
    emoji: "🎵",
    title: "AI Music & Audio Generation",
    who: "Content creators, podcasters, video editors",
    makes: "Royalty-free music, sound effects, and voiceovers with Suno AI integration",
    timeSaved: "Music licensing ৳10,000/year → 0",
    prompt: "Upbeat background music for a Bangladeshi vlog, traditional folk instruments mixed with modern beat, 30 seconds.",
  },
];

const FAQS = [
  { q: "Freepik (Magnific) কী?", a: "Freepik এখন Magnific নামে পরিচিত। এটি একটি all-in-one AI platform যেখানে AI image generation, AI video generation, AI audio, এবং ২০০ মিলিয়নের বেশি stock asset রয়েছে।" },
  { q: "Freepik-এর দাম কত?", a: "AI Team Premium থেকে Freepik (Magnific) পাওয়া যায় ৳৪৯৯/মাসে। bKash বা Nagad-এ পেমেন্ট করুন, ৫-১৫ মিনিটের মধ্যে access দেওয়া হয়।" },
  { q: "Freepik-এ কোন AI models ব্যবহার করা যায়?", a: "Flux, Stable Diffusion, Sora 2, Pika, Suno AI, এবং আরও অনেক model — সব এক জায়গায়।" },
];

export default function FreepikPage() {
  return (
    <ToolDetail
      name="Freepik (Magnific)"
      tagline="AI Image + Video + Audio + Stock"
      description="Freepik (now Magnific) is an all-in-one AI creative platform. Generate images with Flux, videos with Sora 2, music with Suno, and access 200M+ premium stock assets. Payable via bKash/Nagad."
      accentColor="#FF6B35"
      icon={ImageIcon}
      features={[
        "AI image generation (Flux, SD, custom models)",
        "AI video generation (Sora 2, Pika)",
        "AI music & audio (Suno AI)",
        "200M+ premium stock images & vectors",
        "Magnific AI upscaler included",
        "5-15 min delivery · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Freepik Premium — Shared",
          price: "৳499",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Shared account" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "WhatsApp 24/7" },
          ],
        },
      ]}
      useCases={USE_CASES}
      competitorRows={[]}
      extendedFaqs={FAQS}
    />
  );
}