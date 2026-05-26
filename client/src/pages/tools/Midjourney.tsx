import { ToolDetail } from "@/components/ToolDetail";
import { Image } from "lucide-react";

const MIDJOURNEY_FAQS = [
  { q: "বাংলাদেশে Midjourney কীভাবে কিনবো?", a: "AI Team Premium BD-এর মাধ্যমে ৳১,২০০/মাসে shared Midjourney access পান। bKash বা Nagad-এ পেমেন্ট করুন — ৫-১৫ মিনিটে WhatsApp-এ Discord invite পাঠানো হবে।" },
  { q: "Midjourney v7 কী নতুন এনেছে?", a: "Midjourney v7 আগের version-গুলোর চেয়ে অনেক বেশি photorealistic। Character consistency, improved lighting, better text rendering এবং faster generation এই version-এর প্রধান উন্নতি।" },
  { q: "Midjourney Discord ছাড়া ব্যবহার করা যায়?", a: "হ্যাঁ! Midjourney-র নিজস্ব web interface (midjourney.com) আছে যেখানে browser থেকে সরাসরি images generate করা যায়। Discord bot-ও available।" },
  { q: "Character Reference (--cref) কী কাজ করে?", a: "--cref parameter দিয়ে একটি reference image-এর character-কে নতুন scene বা style-এ বসানো যায়। Consistent character design-এর জন্য এটি অত্যন্ত কার্যকর — character sheet, comic, product mockup-এ বহুল ব্যবহৃত।" },
  { q: "Shared Midjourney account কি safe?", a: "হ্যাঁ। Shared account-এ আপনার generated images আপনার নিজস্ব gallery-তে থাকে। অন্য users শুধু public gallery-তে দেখতে পারে (যদি Stealth mode না থাকে)। বাংলাদেশে হাজারো ডিজাইনার এই পদ্ধতিতে ব্যবহার করছেন।" },
];

export default function Midjourney() {
  return (
    <ToolDetail
      name="Midjourney"
      tagline="Shared Access"
      description="The world's most stunning AI image generator. Midjourney v7 produces photorealistic and artistic images with character consistency, style reference, and Vary (Region) editing — all accessible in Bangladesh via bKash/Nagad."
      accentColor="#2563EB"
      icon={Image}
      features={[
        "Midjourney v7 — most realistic AI images ever generated",
        "Character Reference (--cref) for consistent characters across scenes",
        "Style Reference (--sref) to match any artistic style",
        "Vary (Region) — AI-powered inpainting to edit specific areas",
        "Photorealistic portraits, landscapes, product shots and concepts",
        "Turbo Mode — ultra-fast image generation",
        "Web interface + Discord bot access",
        "Commercial usage rights included",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Midjourney — Shared",
          price: "৳1,200",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Discord + Web" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Rules", value: "1 device only" },
          ],
        },
      ]}
      extendedFaqs={MIDJOURNEY_FAQS}
    />
  );
}
