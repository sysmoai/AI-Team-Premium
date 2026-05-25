import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Google Gemini Advanced Bangladesh — ৳499/mo | AI Team Premium BD",
  seoDescription: "Buy Google Gemini Advanced in Bangladesh via bKash/Nagad. Shared and personal seats from ৳499/month. Google Workspace integration.",
  path: "/gemini-plans",
  toolName: "Google Gemini Advanced",
  heroBanglaTitle: "বাংলাদেশে Google Gemini Advanced — ৳৪৯৯ থেকে শুরু",
  subtitle: "Google's AI with 1M token context + Google Workspace integration. bKash/Nagad. Fast delivery.",
  plans: [
    {
      name: "Gemini Advanced — Shared Seat",
      price: "৳499/month",
      delivery: "2–4 hours",
      seats: "Shared access",
      tag: "Best for Google Users",
      popular: true,
      features: [
        "Gemini 1.5 Pro model access",
        "Google One 2TB cloud storage",
        "Gmail / Docs / Sheets integration",
        "Real-time Google Search grounding",
        "1M token context window",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Gemini+Advanced+%E2%98%85499%2Fmo",
    },
    {
      name: "Gemini Advanced — Personal Seat",
      price: "৳1,800/month",
      delivery: "2–4 hours",
      seats: "1 seat (your own account)",
      tag: "Full Google Integration",
      features: [
        "Personal Google account access",
        "Full Google One 2TB storage",
        "Gemini in all Google apps",
        "Gemini in Gmail, Docs, Slides",
        "Exclusive Gemini Live feature",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Gemini+Advanced+Personal",
    },
  ],
  aboutText:
    "Google Gemini হলো Google-এর AI — Gmail, Docs, Sheets-এর সাথে সরাসরি কাজ করে। Students ও Researchers-দের জন্য আদর্শ। বাংলাদেশ থেকে সরাসরি কিনতে আন্তর্জাতিক card লাগে, কিন্তু আমাদের কাছ থেকে bKash/Nagad-এ পাওয়া যায়।",
  whoIsItFor: ["Students", "Researchers", "Google Workspace Users", "Content Creators", "Freelancers", "Office Workers"],
  faqs: [
    { q: "Gemini Advanced কী?", a: "Google-এর সবচেয়ে শক্তিশালী AI model, যা Gmail, Google Docs, Sheets-এর সাথে integrated। এটি 1M token context সহ দীর্ঘ document বিশ্লেষণ করতে পারে।" },
    { q: "Google Workspace-এর সাথে কীভাবে কাজ করে?", a: "Gemini Advanced আপনার Gmail, Docs, Sheets-এ সরাসরি integrate হয়ে যায়। Email draft করা, document summary, spreadsheet analysis — সব করতে পারে।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "২-৪ ঘণ্টার মধ্যে access দেওয়া হয়।" },
    { q: "Google One 2TB storage কী?", a: "Google One 2TB মানে আপনার Google Drive, Gmail, Google Photos-এ মোট ২ টেরাবাইট storage। এটি Gemini Advanced subscription-এর সাথে আসে।" },
    { q: "bKash-এ কীভাবে pay করব?", a: "WhatsApp-এ message করলে payment details পাঠানো হবে। bKash, Nagad বা Bank Transfer গ্রহণযোগ্য।" },
    { q: "Shared seat কি safe?", a: "হ্যাঁ। আমরা secure login করিয়ে দিই। আপনার conversation কেউ দেখতে পাবে না।" },
    { q: "ChatGPT-র চেয়ে Gemini কী ভালো?", a: "Google Search-এর সাথে real-time integration এবং Google Workspace-এ সরাসরি কাজ করার ক্ষেত্রে Gemini এগিয়ে। তবে উভয়ই ভালো — use case অনুযায়ী choice করুন।" },
    { q: "Refund policy কী?", a: "Subscription fee refundable নয়, কিন্তু access দিতে ব্যর্থ হলে 24 ঘণ্টার মধ্যে replace করা হবে।" },
  ],
};

export default function GeminiPlans() {
  return <ToolPlansPage data={data} />;
}
