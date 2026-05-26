import { ToolDetail } from "@/components/ToolDetail";
import { SiGithub } from "react-icons/si";

const COPILOT_FAQS = [
  { q: "GitHub Copilot কি VS Code-এ কাজ করে?", a: "হ্যাঁ! GitHub Copilot VS Code, JetBrains IDE (IntelliJ, PyCharm, WebStorm), Neovim, Xcode এবং GitHub.com-এ সরাসরি কাজ করে। Extension install করলেই real-time code suggestions শুরু হয়।" },
  { q: "GitHub Copilot-এ কোন AI model ব্যবহার করা হয়?", a: "GitHub Copilot একাধিক model সাপোর্ট করে — GPT-4.1, Claude Sonnet, এবং Gemini 2.5। আপনি settings থেকে পছন্দের model বেছে নিতে পারবেন।" },
  { q: "Copilot Agents কী করে?", a: "Copilot Agents হলো autonomous coding mode। এটি feature request, bug fix বা refactor-এর জন্য নিজেই multiple files পড়ে, plan তৈরি করে এবং কোড লেখে — শুধু approve করলেই হয়।" },
  { q: "বাংলাদেশে GitHub Copilot কীভাবে কিনবো?", a: "AI Team Premium BD-এর মাধ্যমে ৳১,২০০/মাসে আপনার নিজের GitHub account-এ Copilot সক্রিয় করুন — bKash বা Nagad-এ পেমেন্ট, ২-৪ ঘন্টায় delivery।" },
  { q: "Copilot কি free GitHub account-এ চলবে?", a: "হ্যাঁ, আপনার free GitHub account-এই Copilot activate করা হবে। আলাদা paid GitHub plan লাগবে না।" },
];

export default function Copilot() {
  return (
    <ToolDetail
      name="GitHub Copilot"
      tagline="Your AI Pair Programmer"
      description="The AI coding tool used by millions of developers. Real-time code completion, Copilot Chat, autonomous Copilot Agents, pull-request summaries and test generation — upgraded privately on your GitHub account, payable via bKash/Nagad."
      accentColor="#24292F"
      icon={SiGithub as any}
      features={[
        "Multi-model code completion: GPT-4.1, Claude Sonnet, Gemini 2.5",
        "Copilot Chat — conversational AI in VS Code, JetBrains and web",
        "Copilot Agents — autonomous multi-file coding and refactoring",
        "AI-generated pull-request descriptions and summaries",
        "Unit test generation from your existing code",
        "Code review suggestions inline in GitHub",
        "Supports VS Code, Neovim, JetBrains, Xcode and more",
        "Upgraded privately on your own GitHub account",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "GitHub Copilot — Private",
          price: "৳1,200",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Private",
          specs: [
            { label: "Access", value: "Your own GitHub" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "WhatsApp 24/7" },
          ],
        },
      ]}
      extendedFaqs={COPILOT_FAQS}
    />
  );
}
