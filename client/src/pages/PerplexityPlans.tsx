import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Perplexity Pro Bangladesh — ৳499/mo | AI Team Premium BD",
  seoDescription: "Buy Perplexity Pro in Bangladesh via bKash/Nagad. AI-powered search with unlimited deep research from ৳499/month.",
  path: "/perplexity-plans",
  toolName: "Perplexity Pro",
  heroBanglaTitle: "বাংলাদেশে Perplexity Pro — ৳৪৯৯ থেকে শুরু",
  subtitle: "AI-powered search with deep research. Unlimited Pro searches. Access GPT-4o + Claude. bKash/Nagad.",
  plans: [
    {
      name: "Perplexity Pro — Shared Access",
      price: "৳499/month",
      delivery: "2–4 hours",
      seats: "Shared access",
      tag: "Best for Researchers",
      popular: true,
      features: [
        "Unlimited Pro search queries",
        "Deep Research mode — detailed reports",
        "GPT-4o + Claude + Gemini access",
        "File uploads & analysis",
        "AI image generation",
        "Real-time web data with citations",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Perplexity+Pro+%E2%98%85499%2Fmo",
    },
  ],
  aboutText:
    "Perplexity Pro হলো AI-powered search engine যা real-time web data সহ detailed research করতে পারে। এটি GPT-4o, Claude ও Gemini সবগুলো model একসাথে use করে এবং প্রতিটি answer-এ citation দেয়। Researchers ও students-দের জন্য এটি অত্যন্ত শক্তিশালী tool।",
  whoIsItFor: ["Researchers", "Students", "Journalists", "Content Creators", "Academics", "Freelancers"],
  faqs: [
    { q: "Perplexity Pro কী এবং Google-এর চেয়ে কীভাবে আলাদা?", a: "Perplexity Pro শুধু link দেখায় না — সে real-time web data পড়ে আপনাকে summarized answer দেয় এবং সব source cite করে। Google search-এর চেয়ে অনেক বেশি smart।" },
    { q: "Deep Research mode কী?", a: "Deep Research-এ Perplexity কয়েক ডজন source পড়ে একটি comprehensive research report তৈরি করে। Academic paper-এর মতো detailed answer পাওয়া যায়।" },
    { q: "কোন AI models access পাওয়া যায়?", a: "Pro-তে GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro — সব model switch করে ব্যবহার করা যায়।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "২-৪ ঘণ্টার মধ্যে access দেওয়া হয়।" },
    { q: "File upload করা যায়?", a: "হ্যাঁ, PDF, Word, Excel upload করে AI-দের দিয়ে analyze করানো যায়।" },
    { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। WhatsApp-এ message করলে details পাবেন।" },
    { q: "Shared access কি safe?", a: "হ্যাঁ। আপনার search history শুধু আপনিই দেখতে পাবেন। Account এবং password sharing হয় না।" },
    { q: "ChatGPT-র চেয়ে Perplexity Pro কখন ভালো?", a: "Real-time internet search এবং citation সহ research-এর জন্য Perplexity ভালো। Creative writing বা coding-এর জন্য ChatGPT বেশি উপযুক্ত।" },
  ],
};

export default function PerplexityPlans() {
  return <ToolPlansPage data={data} />;
}
