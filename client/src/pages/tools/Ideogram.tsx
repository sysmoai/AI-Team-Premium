import { ToolDetail } from "@/components/ToolDetail";
import { Image as ImageIcon } from "lucide-react";

export const TOOL_META = {
  "slug": "ideogram",
  "category": "image",
  "priceBdt": 599,
  "priceLabel": "৳599/mo",
  "model": "Ideogram 3.0 (multi-model)",
  "contextWindow": "N/A (image gen)",
  "multimodal": "Text-to-image, image editing, text rendering",
  "banglaQuality": "N/A",
  "speed": "Fast (5-15 sec)",
  "accuracy": "⭐⭐⭐⭐⭐ (text rendering best-in-class)",
  "pricingTier": "Budget",
  "brand": "Ideogram",
  "tagline": "Best AI text rendering in images",
  "toolPath": "/tools/ideogram",
  "iconName": "Image",
  "accent": "#1DA1F2",
  "bestUseCase": "Designers needing accurate text in images",
  "bestFor": [
    "Text-heavy image generation (posters, ads)",
    "Logo & typography design",
    "Social media graphics with text",
    "Product mockups with labels"
  ],
  "weaknesses": [
    "Fewer artistic styles than Midjourney",
    "No video generation"
  ]
} as const;

const USE_CASES = [
  {
    emoji: "📝",
    title: "Text-in-Image Generation",
    who: "Marketers, designers, ad creators",
    makes: "Images with accurate, styled text — best-in-class for rendering letters",
    timeSaved: "Photoshop text overlay 20 min → 1 prompt",
    prompt: "A beautiful Eid Mubarak greeting card with Arabic calligraphy, gold text on deep blue background, decorative lanterns, premium quality --ar 4:5",
  },
  {
    emoji: "🎨",
    title: "Poster & Flyer Design",
    who: "Event organizers, small business owners",
    makes: "Complete posters with readable text, dates, and branding",
    timeSaved: "Graphic designer ৳2,000 → 1 prompt",
    prompt: "Concert poster for a Dhaka rock band, bold event title, date and venue at bottom, dark grunge aesthetic, concert photography style --ar 2:3",
  },
  {
    emoji: "🛍️",
    title: "Product Label & Packaging",
    who: "E-commerce sellers, brand owners",
    makes: "Product labels with brand name, ingredients, and pricing",
    timeSaved: "Label design ৳5,000 → 1 prompt",
    prompt: "Premium honey jar label, 'Pure Sylhet Honey' text, gold accents, minimalist design, nutrition facts panel at back --ar 1:1",
  },
];

const FAQS = [
  { q: "Ideogram AI কী?", a: "Ideogram AI হলো একটি image generation tool যা text rendering-এ সবচেয়ে ভালো। পোস্টার, লোগো, এবং বিজ্ঞাপনের জন্য আদর্শ — যেখানে image-এর ভিতরে accurate text প্রয়োজন।" },
  { q: "Ideogram-এর দাম কত?", a: "AI Team Premium থেকে Ideogram AI পাওয়া যায় ৳৫৯৯/মাসে। bKash বা Nagad-এ পেমেন্ট করুন, ৫-১৫ মিনিটের মধ্যে access দেওয়া হয়।" },
  { q: "Ideogram vs Midjourney — কোনটি ভালো?", a: "Ideogram text rendering-এ best-in-class — পোস্টার, লোগো, বিজ্ঞাপনের জন্য এটি সেরা। Midjourney বেশি artistic এবং photorealistic — আর্ট, ফ্যাশন, এবং কনসেপ্ট ডিজাইনের জন্য ভালো।" },
];

export default function IdeogramPage() {
  return (
    <ToolDetail
      name="Ideogram AI"
      tagline="Best Text-in-Image AI"
      description="Ideogram AI is the best AI image generator for accurate text rendering. Create posters, logos, ads, and social media graphics with readable text — no Photoshop needed. Payable via bKash/Nagad."
      accentColor="#1DA1F2"
      icon={ImageIcon}
      features={[
        "Best-in-class text rendering in images",
        "Poster, logo, ad, and label creation",
        "Fast generation (5-15 seconds)",
        "Image editing and style customization",
        "Commercial usage rights included",
        "5-15 min delivery · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Ideogram AI — Shared",
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
      useCases={USE_CASES}
      competitorRows={[]}
      extendedFaqs={FAQS}
    />
  );
}