import { ToolDetail } from "@/components/ToolDetail";
import { PenTool } from "lucide-react";

const GRAMMARLY_FAQS = [
  { q: "Grammarly Premium কি বাংলাদেশে ব্যবহার করা যায়?", a: "হ্যাঁ! AI Team Premium BD-এর মাধ্যমে আপনার নিজের Grammarly account-এ Premium upgrade করা হয়। ৳৮০০/মাসে bKash বা Nagad-এ পেমেন্ট করুন — ১-২ ঘন্টায় access পাবেন।" },
  { q: "GrammarlyGO কী?", a: "GrammarlyGO হলো Grammarly-র generative AI feature। এটি পুরো paragraph rewrite করতে, emails draft করতে এবং context-aware suggestions দিতে পারে — শুধু একটি prompt দিলেই হয়।" },
  { q: "Grammarly কোথায় কোথায় কাজ করে?", a: "Grammarly Premium Chrome extension হিসেবে Gmail, Google Docs, Twitter/X, LinkedIn এবং যেকোনো website-এ কাজ করে। আলাদা desktop app আছে Windows ও Mac-এর জন্য। Microsoft Word ও Outlook-এ native add-in আছে।" },
  { q: "Plagiarism checker কতটা accurate?", a: "Grammarly-র plagiarism checker ১৬ billion+ web pages ও academic database-এর বিরুদ্ধে text compare করে। এটি student assignments ও blog posts-এর জন্য বিশ্বাসযোগ্য এবং widely accepted।" },
  { q: "Grammarly Premium vs Free-এর পার্থক্য কী?", a: "Free version শুধু basic grammar fix করে। Premium-এ advanced punctuation, clarity suggestions, tone detection, vocabulary enhancement, GrammarlyGO AI rewriting এবং plagiarism checker সব পাবেন।" },
];

export default function Grammarly() {
  return (
    <ToolDetail
      name="Grammarly Premium"
      tagline="for BD Writers"
      description="The world's leading AI writing assistant. GrammarlyGO full-paragraph AI rewrites, advanced grammar correction, plagiarism checking and tone tuning — essential for students, freelancers and professionals."
      accentColor="#15B881"
      icon={PenTool}
      features={[
        "GrammarlyGO — AI-powered full paragraph and email rewrites",
        "Advanced grammar, spelling and punctuation correction",
        "Plagiarism checker against 16 billion web pages",
        "Tone detector — adjust formality, confidence and clarity",
        "Vocabulary enhancements and sentence restructuring",
        "Inline suggestions in Gmail, Google Docs, MS Word and Chrome",
        "Genre-specific writing style guidance (academic, business, casual)",
        "Works across web browser, desktop app and Microsoft Office",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Grammarly Premium",
          price: "৳800",
          period: "/mo",
          delivery: "1–2 hr delivery",
          type: "Private",
          specs: [
            { label: "Access", value: "Your own account" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "24/7 WhatsApp" },
          ],
        },
      ]}
      extendedFaqs={GRAMMARLY_FAQS}
    />
  );
}
