import { ToolDetail } from "@/components/ToolDetail";
import { Image as ImageIcon } from "lucide-react";

// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "firefly",
  "category": "image",
  "priceBdt": 599,
  "priceLabel": "৳599/mo",
  "model": "Adobe Firefly v4 + Photoshop",
  "contextWindow": "N/A (image gen)",
  "multimodal": "Text-to-image, text-to-vector, text-to-video",
  "banglaQuality": "N/A",
  "speed": "Fast (5-15 sec per image)",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Budget",
  "brand": "Adobe",
  "tagline": "Adobe's generative AI — images, vectors, video",
  "toolPath": "/tools/firefly",
  "iconName": "Image",
  "accent": "#FF0000",
  "bestUseCase": "Designers, marketers using Adobe ecosystem",
  "bestFor": [
    "AI image generation with commercial safety",
    "Vector generation for logos & graphics",
    "Video generation (5-sec clips)",
    "Adobe Express & Photoshop integration"
  ],
  "weaknesses": [
    "Less artistic than Midjourney",
    "Credit-based system for video generation",
    "Best as part of Adobe ecosystem"
  ]
} as const;

const FIREFLY_USE_CASES = [
  {
    emoji: "🖼️",
    title: "Commercial-Grade Image Generation",
    who: "Marketers, designers, brand managers",
    makes: "Commercially safe AI images trained on Adobe Stock — no copyright concerns",
    timeSaved: "Stock photo costs ৳5,000/month → ৳0",
    prompt: "A modern office in Dhaka with Bangladeshi professionals working at desks, natural lighting, Adobe Firefly style, commercial use safe.",
  },
  {
    emoji: "📐",
    title: "Vector Graphics & Logo Creation",
    who: "Graphic designers, brand designers",
    makes: "Scalable vector graphics from text prompts — directly in Adobe Illustrator",
    timeSaved: "Manual vector design 2 hours → 5 minutes",
    prompt: "Minimalist vector logo for a Bangladeshi tech startup, green and white color scheme, modern and clean, scalable.",
  },
  {
    emoji: "🎬",
    title: "Short Video Generation",
    who: "Social media managers, content creators",
    makes: "5-second AI video clips with text prompts — directly in Adobe Firefly",
    timeSaved: "Video editing 1 hour → 30 seconds",
    prompt: "A slow-motion shot of tea being poured into a glass at a Bangladeshi chaa er dokan, warm lighting, cinematic.",
  },
];

const FIREFLY_FAQS = [
  { q: "Adobe Firefly কী?", a: "Adobe Firefly হলো Adobe-এর generative AI tool যা image, vector, এবং video তৈরি করে। এটি commercially safe — Adobe Stock-এর licensed content-এ trained।" },
  { q: "Firefly-এর দাম কত?", a: "AI Team Premium থেকে Adobe Firefly পাওয়া যায় ৳৫৯৯/মাসে (Firefly Standard equivalent)। bKash বা Nagad-এ পেমেন্ট করুন, ৫-১৫ মিনিটের মধ্যে access।" },
  { q: "Firefly কি Midjourney থেকে আলাদা?", a: "হ্যাঁ। Firefly commercially safe — সব generated image ব্যবহারের লাইসেন্স আছে। Midjourney বেশি artistic, Firefly বেশি commercial এবং Adobe tools-এর সাথে integrated।" },
];

export default function FireflyPage() {
  return (
    <ToolDetail
      name="Adobe Firefly"
      tagline="Adobe's Generative AI"
      description="Adobe Firefly is a commercially safe generative AI tool for images, vectors, and video. Integrated with Photoshop, Express, and Illustrator. Payable via bKash/Nagad."
      accentColor="#FF0000"
      icon={ImageIcon}
      features={[
        "Commercially safe AI image generation",
        "Vector graphics from text prompts",
        "Short video clip generation",
        "Adobe Express Premium included",
        "Photoshop on web & mobile included",
        "5-15 min delivery · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Adobe Firefly — Shared",
          price: "৳599",
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
      useCases={FIREFLY_USE_CASES}
      competitorRows={[]}
      extendedFaqs={FIREFLY_FAQS}
    />
  );
}