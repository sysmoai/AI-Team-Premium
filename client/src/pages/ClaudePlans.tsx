import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Claude Plans Bangladesh — ৳599/mo | AI Team Premium BD",
  seoDescription: "Buy Anthropic Claude Pro in Bangladesh via bKash/Nagad. Shared and personal seats from ৳599/month. No international card needed.",
  heroBanglaTitle: "বাংলাদেশে Claude — ৳৫৯৯ থেকে শুরু",
  subtitle: "Anthropic's Claude Pro — Best for research, coding, and long documents. bKash/Nagad payment. Instant delivery.",
  plans: [
    {
      name: "Claude Pro — Shared Seat",
      price: "৳599/month",
      delivery: "2–4 hours",
      seats: "2–3 seats shared",
      tag: "Popular for Researchers",
      popular: true,
      features: [
        "200K token context window",
        "Long PDF & document analysis",
        "Advanced code generation",
        "Projects feature for organized work",
        "Priority access to Claude 3.5 Sonnet",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Claude+Pro+Shared+%E2%98%85599%2Fmo",
    },
    {
      name: "Claude Pro — Personal Seat",
      price: "৳2,500/month",
      delivery: "2–4 hours",
      seats: "1 seat (your own account)",
      tag: "For Coders & Privacy",
      features: [
        "Full personal account access",
        "200K context window",
        "Maximum security — no sharing",
        "Your own Projects & history",
        "Claude 3.5 Sonnet + Haiku models",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Claude+Pro+Personal+Seat",
    },
  ],
  aboutText:
    "Claude হলো Anthropic-এর AI — লম্বা ডকুমেন্ট বিশ্লেষণ, কোডিং, এবং একাডেমিক লেখার জন্য সেরা। বাংলাদেশ থেকে সরাসরি কিনতে গেলে international card লাগে। আমাদের কাছ থেকে bKash/Nagad-এ কিনুন।",
  whoIsItFor: ["Researchers", "Coders", "Academic Writers", "Freelancers", "Legal Professionals", "Students"],
  faqs: [
    { q: "Claude কী এবং ChatGPT থেকে কীভাবে আলাদা?", a: "Claude হলো Anthropic-এর AI যা 200K token context window সহ আসে — দীর্ঘ ডকুমেন্ট পড়া ও বিশ্লেষণে Claude অনেক ভালো। ChatGPT-র মতো সাধারণ কাজের পাশাপাশি legal, academic ও technical writing-এ Claude বিশেষ দক্ষ।" },
    { q: "Shared seat মানে কী?", a: "Shared seat মানে একটি Claude Pro account আমরা ২-৩ জনের মধ্যে নিরাপদভাবে share করি। প্রতিটি user আলাদা conversation করতে পারেন। আপনি password পাবেন না — আমরা secure login setup করে দিই।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "সাধারণত ২-৪ ঘণ্টার মধ্যে access দেওয়া হয়। বেশিরভাগ ক্ষেত্রে আরও দ্রুত হয়।" },
    { q: "বাংলাদেশ থেকে কীভাবে pay করব?", a: "bKash, Nagad বা Bank Transfer-এ pay করা যায়। Payment details WhatsApp-এ শেয়ার করা হয়।" },
    { q: "Account ban হলে কী হবে?", a: "30 দিনের warranty আছে। যদি আমাদের দোষে account কাজ না করে, আমরা বিনামূল্যে replace করব।" },
    { q: "Claude কি PDF upload করতে পারে?", a: "হ্যাঁ, Claude Pro-এ file upload সুবিধা আছে। PDF, Word doc, code file সব upload করে analysis করা যায়।" },
    { q: "Personal seat-এ আমার নিজের account থাকবে?", a: "হ্যাঁ, Personal Seat plan-এ আপনার নিজের Anthropic account তৈরি করে দেওয়া হয়। আপনি সম্পূর্ণ control পাবেন।" },
    { q: "Refund policy কী?", a: "Subscription fee refundable নয়। কিন্তু যদি আমরা access দিতে ব্যর্থ হই, 24 ঘণ্টার মধ্যে replace করা হবে।" },
  ],
};

export default function ClaudePlans() {
  return <ToolPlansPage data={data} />;
}
