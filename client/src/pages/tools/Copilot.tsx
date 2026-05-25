import { ToolDetail } from "@/components/ToolDetail";
import { SiGithub } from "react-icons/si";

export default function Copilot() {
  return (
    <ToolDetail
      name="GitHub Copilot"
      tagline="Your AI Pair Programmer"
      description="The AI coding tool used by over 2 million developers. Real-time code completion, Copilot Chat, autonomous Copilot Agents, pull-request summaries and test generation — upgraded privately on your GitHub account, payable via bKash/Nagad."
      accentColor="#24292F"
      icon={SiGithub as any}
      features={[
        "Multi-model code completion: GPT-4.1, Claude 4 Sonnet, Gemini 2.5",
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
    />
  );
}
