import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Claude Plans Bangladesh — ৳599/mo | AI Team Premium BD",
  seoDescription: "Buy Anthropic Claude Pro (Claude Sonnet 4) in Bangladesh via bKash/Nagad. Shared and personal seats from ৳599/month. Extended Thinking, 200K context. No international card needed.",
  path: "/claude-plans",
  toolName: "Claude Pro",
  toolEmoji: "🧠",
  ratingCount: "98",
  heroBanglaTitle: "বাংলাদেশে Claude — ৳৫৯৯ থেকে শুরু",
  subtitle: "Anthropic's Claude Sonnet 4 (May 2026) — Extended Thinking, 200K context window. Best for research, coding, long documents and academic writing. bKash/Nagad payment. Shared or Personal.",
  plans: [
    {
      name: "Claude Pro — Shared Seat",
      price: "৳599/month",
      delivery: "5–15 minutes",
      seats: "2–3 seats shared",
      tag: "Popular for Researchers",
      popular: true,
      features: [
        "Claude Sonnet 4 — Anthropic's May 2026 model",
        "200K token context window (read entire books)",
        "Extended Thinking for deep step-by-step reasoning",
        "Long PDF & document analysis",
        "Advanced code generation & debugging",
        "Projects feature for organized work",
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
        "Full personal Anthropic account",
        "Claude Sonnet 4 — latest model",
        "200K context window",
        "Maximum privacy — no sharing",
        "Your own Projects & chat history",
        "Extended Thinking included",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Claude+Pro+Personal+Seat",
    },
  ],
  aboutText:
    "Claude হলো Anthropic-এর AI — লম্বা ডকুমেন্ট বিশ্লেষণ, কোডিং, এবং একাডেমিক লেখার জন্য সেরা। Claude Sonnet 4 (May 2026) Extended Thinking সহ আসে যা complex problems step-by-step solve করতে পারে। বাংলাদেশ থেকে সরাসরি কিনতে গেলে international card লাগে। আমাদের কাছ থেকে bKash/Nagad-এ কিনুন।",
  whoIsItFor: ["Researchers", "Coders", "Academic Writers", "Freelancers", "Legal Professionals", "Students"],
  faqs: [
    { q: "Claude কী এবং ChatGPT থেকে কীভাবে আলাদা?", a: "Claude হলো Anthropic-এর AI যা 200K token context window সহ আসে — দীর্ঘ ডকুমেন্ট পড়া ও বিশ্লেষণে Claude অনেক ভালো। ChatGPT-র মতো সাধারণ কাজের পাশাপাশি legal, academic ও technical writing-এ Claude বিশেষ দক্ষ।" },
    { q: "Claude Sonnet 4 কি নতুন model?", a: "হ্যাঁ, Claude Sonnet 4 হলো Anthropic-এর May 2026-এ release হওয়া সর্বশেষ model। এটি Extended Thinking, coding benchmark-এ উল্লেখযোগ্য improvement এবং better instruction following সহ আসে।" },
    { q: "Extended Thinking কী?", a: "Extended Thinking mode-এ Claude complex problems solve করার আগে step-by-step চিন্তা করে। Math, coding, research — যেকোনো জটিল বিষয়ে আরও accurate এবং nuanced answer দেয়।" },
    { q: "Shared seat মানে কী?", a: "Shared seat মানে একটি Claude Pro account আমরা ২-৩ জনের মধ্যে নিরাপদভাবে share করি। প্রতিটি user আলাদা conversation করতে পারেন। আপনি password পাবেন না — আমরা secure login setup করে দিই।" },
    { q: "Shared এবং Personal Seat-এর মধ্যে কোনটি নেব?", a: "যদি privacy এবং নিজের projects/history চান, তাহলে Personal Seat (৳2,500/mo)। কম বাজেটে শুধু Claude ব্যবহার করতে চাইলে Shared (৳599/mo) যথেষ্ট।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "Shared Seat সাধারণত 5–15 মিনিটে, Personal Seat ২-৪ ঘণ্টার মধ্যে access দেওয়া হয়।" },
    { q: "বাংলাদেশ থেকে কীভাবে pay করব?", a: "bKash, Nagad বা Bank Transfer-এ pay করা যায়। Payment details WhatsApp-এ শেয়ার করা হয়।" },
    { q: "Account ban হলে কী হবে?", a: "30 দিনের warranty আছে। যদি আমাদের দোষে account কাজ না করে, আমরা বিনামূল্যে replace করব।" },
    { q: "Claude কি PDF upload করতে পারে?", a: "হ্যাঁ, Claude Pro-এ file upload সুবিধা আছে। PDF, Word doc, code file সব upload করে analysis করা যায়।" },
    { q: "Personal seat-এ আমার নিজের account থাকবে?", a: "হ্যাঁ, Personal Seat plan-এ আপনার নিজের Anthropic account তৈরি করে দেওয়া হয়। আপনি সম্পূর্ণ control পাবেন।" },
    { q: "Refund policy কী?", a: "Subscription fee refundable নয়। কিন্তু যদি আমরা access দিতে ব্যর্থ হই, 24 ঘণ্টার মধ্যে replace করা হবে।" },
    { q: "200K context window মানে কী?", a: "200K token মানে আপনি প্রায় ১৫০,০০০ শব্দের document (একটি পুরো বই) একসাথে Claude-কে দিয়ে analyze করাতে পারবেন। Legal documents, research papers, codebase analysis-এর জন্য আদর্শ।" },
    { q: "Projects feature কী?", a: "Projects-এ আপনি related conversations এবং documents একসাথে organize করতে পারেন। একটি project-এ Claude আপনার previous context মনে রাখে।" },
    { q: "Claude কি বাংলায় ভালো?", a: "হ্যাঁ, Claude বাংলায় ভালো response দেয়। Academic ও professional Bangla writing-এ Claude অত্যন্ত helpful।" },
    { q: "AI Team Premium BD থেকে কেন Claude কিনব?", a: "কারণ আমরা বাংলাদেশ থেকে bKash/Nagad-এ payment গ্রহণ করি — international card লাগে না। 30 দিনের warranty এবং WhatsApp-এ বাংলায় support পাবেন।" },
  ],
};

export default function ClaudePlans() {
  return <ToolPlansPage data={data} />;
}
