import { ToolDetail } from "@/components/ToolDetail";
import { Zap } from "lucide-react";

export default function Vault() {
  return (
    <ToolDetail
      name="AI Tools Vault"
      tagline="The Ultimate Bundle"
      description="ChatGPT Plus + Claude Pro + Gemini Advanced — all three top AI tools in one order, one payment, one WhatsApp channel. Bangladesh's simplest way to run all three AI models. Pay via bKash/Nagad."
      accentColor="#F59E0B"
      icon={Zap}
      features={[
        "ChatGPT Plus — GPT-4o, Canvas, Advanced Voice Mode, Deep Research, Custom GPTs",
        "Claude Pro — Claude Sonnet 4 with Extended Thinking & 200K context",
        "Gemini Advanced — Gemini 2.5 Pro with Deep Research & 1M context",
        "Single WhatsApp order — all three delivered together",
        "One consolidated support channel for all three tools",
        "Priority delivery (max 6 hours total for all three)",
        "30-day replacement warranty on every tool",
        "Pay in BDT — bKash, Nagad or Bank Transfer",
        "No international credit card needed",
      ]}
      plans={[
        {
          label: "AI Tools Vault — Bundle",
          price: "৳1,990",
          period: "/mo",
          delivery: "Max 6 hr delivery",
          type: "Bundle",
          specs: [
            { label: "Tools included", value: "ChatGPT + Claude + Gemini" },
            { label: "Delivery", value: "Max 6 hours total" },
            { label: "Support", value: "Priority WhatsApp" },
          ],
        },
      ]}
    />
  );
}
