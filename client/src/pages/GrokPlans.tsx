import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Grok Bangladesh — ৳499/mo",
  seoDescription: "Buy Grok (xAI) in Bangladesh via bKash/Nagad. Shared access from ৳499/month, Personal Seat from ৳3,990/month. Real-time data, DeepSearch, Aurora image generation.",
  path: "/grok-plans",
  toolName: "Grok",
  toolEmoji: "⚡",
  ratingCount: "72",
  heroBanglaTitle: "বাংলাদেশে Grok — ৳৪৯৯ থেকে শুরু",
  subtitle: "xAI's Grok-3 — real-time X/Twitter data, DeepSearch, Think mode reasoning, Aurora AI image generation, and unfiltered responses. Shared or Personal Seat. bKash/Nagad.",
  plans: [
    {
      name: "Grok — Shared Access",
      price: "৳699/month",
      delivery: "2–4 hours",
      seats: "Shared access",
      tag: "Real-time AI",
      popular: true,
      features: [
        "Grok-3 — xAI's most powerful model",
        "Real-time internet & X/Twitter data",
        "DeepSearch for in-depth research",
        "Think mode for complex reasoning",
        "Aurora AI image generation",
        "Unfiltered, direct AI responses",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Grok+Shared+Access+%E2%98%85499%2Fmo",
    },
    {
      name: "Grok — Personal Seat",
      price: "৳4,990/month",
      delivery: "2–4 hours",
      seats: "1 seat (your own X/xAI account)",
      tag: "Private & Dedicated",
      features: [
        "All Grok features on your own account",
        "Personal X Premium subscription",
        "No sharing — 100% private history",
        "Full Aurora image generation access",
        "Unlimited DeepSearch usage",
        "Priority model access",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Grok+Personal+Seat+%E2%98%853990%2Fmo",
    },
  ],
  aboutText:
    "Grok হলো Elon Musk-এর xAI-এর AI assistant। এটি real-time internet data access করতে পারে এবং X (Twitter)-এর সাথে directly integrate হয়। Grok-3-এর বিশেষত্ব হলো DeepSearch, Think mode reasoning, Aurora AI image generation, এবং unfiltered direct answers। News, trends, ও current events সম্পর্কে up-to-date information পেতে এটি সেরা। Shared বা Personal Seat — দুই option-ই পাওয়া যায়।",
  whoIsItFor: ["Journalists", "Researchers", "Traders", "Social Media Managers", "Tech Enthusiasts", "Content Creators"],
  faqs: [
    { q: "Grok কী এবং কেন ব্যবহার করব?", a: "Grok হলো xAI-এর AI যা real-time internet এবং X (Twitter) data access করতে পারে। Current events, trending topics, market news-এর জন্য এটি সবচেয়ে up-to-date AI।" },
    { q: "Grok কি ChatGPT-র চেয়ে ভালো?", a: "Real-time data ও X integration-এর জন্য Grok এগিয়ে। Creative writing এবং coding-এ ChatGPT এগিয়ে। Use case অনুযায়ী choose করুন।" },
    { q: "DeepSearch কী?", a: "DeepSearch-এ Grok internet-এ গভীরভাবে search করে comprehensive research report তৈরি করে — Perplexity-র মতো, কিন্তু X data সহ।" },
    { q: "Aurora image generation কী?", a: "Aurora হলো xAI-এর নিজস্ব AI image generation model। Grok-এর মাধ্যমে text prompt দিয়ে high-quality image তৈরি করা যায়।" },
    { q: "Think mode কী?", a: "Think mode-এ Grok complex reasoning tasks-এ step-by-step চিন্তা করে। Math, logic, scientific problems-এর জন্য এটি অত্যন্ত effective।" },
    { q: "Shared vs Personal Seat — কোনটি নেব?", a: "যদি privacy বেশি গুরুত্বপূর্ণ হয় এবং আপনি নিজের X account-এ Grok চান, তাহলে Personal Seat (৳3,990/mo) নিন। কম বাজেটে শুধু Grok ব্যবহার করতে চাইলে Shared (৳499/mo) যথেষ্ট।" },
    { q: "Personal Seat-এ কি X Premium subscription থাকবে?", a: "হ্যাঁ, Personal Seat-এ আপনার নিজের X (Twitter) account-এ X Premium subscription সহ Grok premium access দেওয়া হয়।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "২-৪ ঘণ্টার মধ্যে access দেওয়া হয়।" },
    { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। WhatsApp-এ message করলে details পাবেন।" },
    { q: "Shared access কি safe?", a: "হ্যাঁ। আপনার conversation অন্য কেউ দেখতে পাবে না। Secure login setup করে দেওয়া হয়।" },
    { q: "Grok কি বাংলায় কথা বলতে পারে?", a: "হ্যাঁ, Grok বাংলাসহ অনেক ভাষায় respond করতে পারে।" },
    { q: "Refund policy কী?", a: "Subscription fee refundable নয়, কিন্তু access না পেলে 24 ঘণ্টায় replace করা হবে।" },
    { q: "SuperGrok থেকে Grok কীভাবে আলাদা?", a: "SuperGrok হলো xAI-এর সর্বোচ্চ tier — unlimited Think mode, unlimited DeepSearch, এবং xAI API access সহ। Grok হলো standard premium tier যা সাধারণ users-দের জন্য যথেষ্ট।" },
    { q: "Grok কি real-time stock price দিতে পারে?", a: "হ্যাঁ, Grok real-time web data access করে বলে latest stock prices, market trends, এবং financial news সরাসরি দিতে পারে।" },
    { q: "AI Team Premium থেকে কেন কিনব?", a: "কারণ আমরা বাংলাদেশ থেকে bKash/Nagad-এ payment গ্রহণ করি। International card ছাড়া Grok পাওয়ার সবচেয়ে সহজ উপায়। 30 দিনের warranty এবং Bangla support।" },
  ],
};

export default function GrokPlans() {
  return <ToolPlansPage data={data} />;
}
