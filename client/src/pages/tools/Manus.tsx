import { ToolDetail } from "@/components/ToolDetail";
import { Bot } from "lucide-react";

// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "manus",
  "category": "code",
  "priceBdt": 1499,
  "priceLabel": "৳1,499/mo",
  "model": "Claude + GPT-4 + Gemini (multi-agent)",
  "contextWindow": "N/A (agent orchestration)",
  "multimodal": "Text, files, code, browser",
  "banglaQuality": "⭐⭐⭐⭐ (good)",
  "speed": "Medium (agent tasks take 2-15 min)",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "Manus AI",
  "tagline": "Agentic AI automation platform",
  "toolPath": "/tools/manus",
  "iconName": "Bot",
  "accent": "#8B5CF6",
  "bestUseCase": "Automated research, data extraction, workflow automation",
  "bestFor": [
    "Multi-step research & data gathering",
    "Browser automation & web scraping",
    "File processing & report generation",
    "Autonomous task execution"
  ],
  "weaknesses": [
    "Not a real-time chat tool",
    "Tasks take minutes to complete"
  ]
} as const;

const MANUS_USE_CASES = [
  {
    emoji: "🔍",
    title: "Automated Market Research",
    who: "Business analysts, marketers, researchers",
    makes: "Manus autonomously browses websites, collects data, and compiles reports",
    timeSaved: "8 hours research → 15 minutes",
    prompt: "Manus: Research the top 10 AI marketing tools in 2026, compare their pricing, features, and user reviews. Compile into a comparison table with sources.",
  },
  {
    emoji: "📊",
    title: "Data Extraction & Analysis",
    who: "Data analysts, finance professionals",
    makes: "Extracts structured data from websites, PDFs, and documents",
    timeSaved: "6 hours manual extraction → 20 minutes",
    prompt: "Manus: Extract all product prices from this e-commerce site, organize by category, and calculate average price per category.",
  },
  {
    emoji: "🌐",
    title: "Browser Automation",
    who: "Anyone doing repetitive web tasks",
    makes: "Logs into websites, fills forms, navigates pages, and extracts results",
    timeSaved: "Automated entirely",
    prompt: "Manus: Log into my analytics dashboard, navigate to the monthly report, download the PDF, and email it to me.",
  },
  {
    emoji: "📝",
    title: "Report Generation",
    who: "Consultants, analysts, students",
    makes: "Multi-source research compiled into structured reports with citations",
    timeSaved: "1 day of research → 30 minutes",
    prompt: "Manus: Research the AI industry trends in Bangladesh for 2026. Find job postings, training programs, and government initiatives. Compile into a 3-page report.",
  },
];

const MANUS_FAQS = [
  { q: "Manus AI কী? এটি কীভাবে কাজ করে?", a: "Manus AI একটি autonomous agent platform যা নিজে নিজেই ব্রাউজ করে, ডেটা সংগ্রহ করে, ফাইল প্রসেস করে এবং রিপোর্ট তৈরি করে। আপনি একটি টাস্ক দেন — Manus নিজে থেকে সেটি সম্পন্ন করে।" },
  { q: "Manus AI-এর দাম কত?", a: "AI Team Premium থেকে Manus AI পাওয়া যায় ৳১,৪৯৯/মাসে। bKash বা Nagad-এ পেমেন্ট করুন, ২-৪ ঘন্টার মধ্যে access দেওয়া হয়।" },
  { q: "Manus AI কীভাবে ChatGPT বা Claude থেকে আলাদা?", a: "ChatGPT/Claude চ্যাট-ভিত্তিক AI — আপনি প্রশ্ন করেন, উত্তর দেয়। Manus AI autonomous agent — আপনি একটি goal দেন, এটি নিজে থেকে plan করে, browser ব্যবহার করে, ডেটা সংগ্রহ করে এবং ফাইল তৈরি করে।" },
];

export default function ManusPage() {
  return (
    <ToolDetail
      name="Manus AI"
      tagline="Autonomous AI Agent"
      description="Manus AI is a next-generation autonomous agent platform. Give it a goal — it researches, browses, extracts data, and delivers results. Perfect for market research, data analysis, and workflow automation. Payable via bKash/Nagad."
      accentColor="#8B5CF6"
      icon={Bot}
      features={[
        "Autonomous multi-step task execution",
        "Web browsing & data extraction",
        "File processing & report generation",
        "Works with Claude, GPT-4, and Gemini models",
        "No coding required — just describe the goal",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Manus AI — Shared",
          price: "৳1,499",
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
      useCases={MANUS_USE_CASES}
      competitorRows={[]}
      extendedFaqs={MANUS_FAQS}
    />
  );
}