import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Grok Bangladesh — ৳499/mo | AI Team Premium BD",
  seoDescription: "Buy Grok (xAI) in Bangladesh via bKash/Nagad. Real-time data, unfiltered AI responses. From ৳499/month.",
  path: "/grok-plans",
  toolName: "Grok",
  heroBanglaTitle: "বাংলাদেশে Grok — ৳৪৯৯ থেকে শুরু",
  subtitle: "xAI's Grok — real-time data, unfiltered responses, X/Twitter integration. bKash/Nagad.",
  plans: [
    {
      name: "Grok — Shared Access",
      price: "৳499/month",
      delivery: "2–4 hours",
      seats: "Shared access",
      tag: "Real-time AI",
      popular: true,
      features: [
        "Grok-3 — xAI's latest model",
        "Real-time internet data access",
        "X / Twitter content integration",
        "Unfiltered, direct AI responses",
        "DeepSearch for in-depth research",
        "Think mode for complex reasoning",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Grok+Access+%E2%98%85499%2Fmo",
    },
  ],
  aboutText:
    "Grok হলো Elon Musk-এর xAI-এর AI assistant। এটি real-time internet data access করতে পারে এবং X (Twitter)-এর সাথে directly integrate হয়। Grok-র বিশেষত্ব হলো এটি unfiltered, direct answers দেয়। News, trends, ও current events সম্পর্কে up-to-date information পেতে এটি সেরা।",
  whoIsItFor: ["Journalists", "Researchers", "Traders", "Social Media Managers", "Tech Enthusiasts", "Content Creators"],
  faqs: [
    { q: "Grok কী এবং কেন ব্যবহার করব?", a: "Grok হলো xAI-এর AI যা real-time internet এবং X (Twitter) data access করতে পারে। Current events, trending topics, market news-এর জন্য এটি সবচেয়ে up-to-date AI।" },
    { q: "Grok কি ChatGPT-র চেয়ে ভালো?", a: "Real-time data ও X integration-এর জন্য Grok এগিয়ে। Creative writing এবং coding-এ ChatGPT এগিয়ে। Use case অনুযায়ী choose করুন।" },
    { q: "DeepSearch কী?", a: "DeepSearch-এ Grok internet-এ গভীরভাবে search করে comprehensive research report তৈরি করে — Perplexity-র মতো।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "২-৪ ঘণ্টার মধ্যে access দেওয়া হয়।" },
    { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। WhatsApp-এ message করলে details পাবেন।" },
    { q: "Shared access কি safe?", a: "হ্যাঁ। আপনার conversation অন্য কেউ দেখতে পাবে না। Secure login setup করে দেওয়া হয়।" },
    { q: "Grok কি বাংলায় কথা বলতে পারে?", a: "হ্যাঁ, Grok বাংলাসহ অনেক ভাষায় respond করতে পারে।" },
    { q: "Refund policy কী?", a: "Subscription fee refundable নয়, কিন্তু access না পেলে 24 ঘণ্টায় replace করা হবে।" },
  ],
};

export default function GrokPlans() {
  return <ToolPlansPage data={data} />;
}
