import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Grammarly Premium Bangladesh — ৳499/mo | AI Team Premium BD",
  seoDescription: "Buy Grammarly Premium in Bangladesh via bKash/Nagad. Monthly and annual plans from ৳499/month. AI writing assistant with plagiarism check.",
  path: "/grammarly-plans",
  toolName: "Grammarly Premium",
  heroBanglaTitle: "বাংলাদেশে Grammarly Premium — ৳৪৯৯ থেকে শুরু",
  subtitle: "AI writing assistant — grammar, tone, clarity, plagiarism check. bKash/Nagad accepted.",
  plans: [
    {
      name: "Grammarly Premium — Monthly",
      price: "৳499/month",
      delivery: "2–4 hours",
      seats: "1 individual account",
      tag: "Best for Students",
      popular: true,
      features: [
        "Advanced grammar & spell check",
        "Tone detection & suggestions",
        "Clarity & engagement improvements",
        "Plagiarism checker",
        "AI writing assistance (GrammarlyGO)",
        "Works on browser, MS Word, Google Docs",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Grammarly+Premium+%E2%98%85499%2Fmo",
    },
    {
      name: "Grammarly Premium — Annual",
      price: "৳3,999/year",
      delivery: "2–4 hours",
      seats: "1 individual account (12 months)",
      tag: "Save 33%",
      features: [
        "All monthly Premium features",
        "12 months full access",
        "Advanced grammar & spell check",
        "Plagiarism checker included",
        "AI writing with GrammarlyGO",
        "Priority support",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Grammarly+Premium+Annual",
    },
  ],
  aboutText:
    "Grammarly Premium হলো AI-powered writing assistant যা আপনার English writing-কে professional করে তোলে। Grammar check-এর বাইরেও এটি tone, clarity, engagement analyze করে এবং plagiarism detect করে। Students, freelancers, ও content writers-দের জন্য অপরিহার্য।",
  whoIsItFor: ["Students", "Freelancers", "Researchers", "Content Writers", "Academic Writers", "Job Seekers"],
  faqs: [
    { q: "Grammarly Premium কি free version থেকে অনেক আলাদা?", a: "হ্যাঁ, Free version-এ শুধু basic grammar check আছে। Premium-এ tone detection, clarity suggestions, plagiarism checker, এবং AI writing assistant (GrammarlyGO) সব পাওয়া যায়।" },
    { q: "কোন device/platform-এ কাজ করে?", a: "Grammarly Chrome extension, MS Word, Google Docs, Outlook — সব জায়গায় কাজ করে। Mobile app-ও আছে।" },
    { q: "Plagiarism checker কীভাবে কাজ করে?", a: "আপনার লেখা billions of web pages-এর সাথে compare করে এবং যেকোনো similar content detect করে। Academic writing-এর জন্য অত্যন্ত useful।" },
    { q: "Annual plan কি ভালো deal?", a: "হ্যাঁ! Monthly plan ১২ মাসে মোট ৫,৯৮৮ টাকা হয়, কিন্তু Annual plan মাত্র ৩,৯৯৯ টাকা — প্রায় ৩৩% সাশ্রয়।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "২-৪ ঘণ্টার মধ্যে account setup করে দেওয়া হয়।" },
    { q: "বাংলা writing-এ Grammarly কাজ করে?", a: "না, Grammarly শুধু English language support করে। কিন্তু English লেখার জন্য এটি অত্যন্ত কার্যকর।" },
    { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। WhatsApp-এ message করলে details পাবেন।" },
    { q: "Refund policy কী?", a: "Subscription fee refundable নয়। কিন্তু access না পেলে 24 ঘণ্টায় replace করা হবে।" },
  ],
};

export default function GrammarlyPlans() {
  return <ToolPlansPage data={data} />;
}
