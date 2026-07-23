import { ToolDetail } from "@/components/ToolDetail";
import { Layers } from "lucide-react";

export const TOOL_META = {
  "slug": "adobe-cc",
  "category": "image",
  "priceBdt": 499,
  "priceLabel": "৳499/mo",
  "model": "Photoshop, Lightroom, Express, Firefly",
  "contextWindow": "N/A (creative suite)",
  "multimodal": "Photo editing, design, AI, cloud storage",
  "banglaQuality": "N/A",
  "speed": "N/A (desktop apps)",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Budget",
  "brand": "Adobe",
  "tagline": "Photoshop + Lightroom + Firefly AI",
  "toolPath": "/tools/adobe-cc",
  "iconName": "Layers",
  "accent": "#FF0000",
  "bestUseCase": "Photographers, designers needing full Adobe suite",
  "bestFor": [
    "Photoshop + Lightroom photo editing",
    "Adobe Express premium templates",
    "Firefly AI image generation",
    "20GB cloud storage"
  ],
  "weaknesses": [
    "Desktop app installation required",
    "No video tools (Premiere separate)"
  ]
} as const;

const USE_CASES = [
  {
    emoji: "📸",
    title: "Professional Photo Editing",
    who: "Photographers, real estate agents, e-commerce sellers",
    makes: "Full Photoshop + Lightroom suite for professional photo editing",
    timeSaved: "Free editors ৳0 → professional-grade tools",
    prompt: "Edit a product photo in Lightroom: adjust exposure, remove background in Photoshop, add text with Firefly AI — all in the Adobe ecosystem.",
  },
  {
    emoji: "🎨",
    title: "Graphic Design + AI Generation",
    who: "Designers, marketers, students",
    makes: "Adobe Express (web/mobile) with Firefly AI for instant designs",
    timeSaved: "Complex design software → 1-click AI templates",
    prompt: "Create a social media post in Adobe Express: use an AI-generated background from Firefly, add text overlay, and export in 1:1 format.",
  },
  {
    emoji: "☁️",
    title: "Cloud Sync & Cross-Device Work",
    who: "Remote workers, freelancers, teams",
    makes: "20GB cloud storage with automatic sync across desktop, web, and mobile",
    timeSaved: "Manual file transfer → automatic cloud sync",
    prompt: "Start editing on desktop, continue on iPad, share from web — all files synced automatically via Creative Cloud.",
  },
];

const FAQS = [
  { q: "Adobe Creative Cloud কী?", a: "Adobe Creative Cloud-এর Photography plan-এ Photoshop, Lightroom, Lightroom Classic, Adobe Express, এবং Firefly AI অন্তর্ভুক্ত। 20GB cloud storage-সহ।" },
  { q: "Adobe CC-এর দাম কত?", a: "AI Team Premium থেকে Adobe Creative Cloud Photography plan পাওয়া যায় ৳৪৯৯/মাসে। bKash বা Nagad-এ পেমেন্ট করুন, ২-৪ ঘন্টার মধ্যে access দেওয়া হয়।" },
  { q: "Photoshop ছাড়া আর কী কী পাওয়া যায়?", a: "Lightroom (desktop + mobile), Lightroom Classic, Adobe Express Premium, Firefly AI, এবং 20GB cloud storage — সব এক plan-এ।" },
];

export default function AdobeCCPage() {
  return (
    <ToolDetail
      name="Adobe Creative Cloud"
      tagline="Photoshop + Lightroom + Firefly"
      description="Adobe Creative Cloud Photography plan gives you Photoshop, Lightroom, Adobe Express, and Firefly AI — the complete creative toolkit. Payable via bKash/Nagad."
      accentColor="#FF0000"
      icon={Layers}
      features={[
        "Photoshop — professional image editing",
        "Lightroom + Lightroom Classic — photo management",
        "Adobe Express Premium — quick designs",
        "Firefly AI — generative image creation",
        "20GB cloud storage with cross-device sync",
        "2-4 hr delivery · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Adobe CC Photography — Shared",
          price: "৳499",
          period: "/mo",
          delivery: "2–4 hr delivery",
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