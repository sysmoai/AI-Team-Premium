import { ToolDetail } from "@/components/ToolDetail";
import { Zap } from "lucide-react";

export default function Vault() {
  return (
    <ToolDetail
      name="AI Tools Vault"
      tagline="The Ultimate Bundle"
      description="ChatGPT Plus + Claude Pro + Gemini Advanced — all three in one plan. Save over 50% vs buying separately. Bangladesh's best-value AI subscription bundle, payable via bKash/Nagad with a single support channel."
      accentColor="#F59E0B"
      icon={Zap}
      features={[
        "ChatGPT Plus (GPT-4.5 / o4-mini, GPT-image-1 image generation, Canvas, Advanced Voice Mode, Deep Research, Custom GPTs)",
        "Claude Pro — Claude Sonnet 4 with Extended Thinking & 200K context",
        "Gemini Advanced — Gemini 2.5 Pro with Deep Research & 1M context",
        "All three shared seats delivered via single WhatsApp order",
        "Saves ৳508/mo vs buying each tool individually",
        "One consolidated support channel for all three tools",
        "Priority delivery (max 6 hours total for all three)",
        "30-day replacement warranty on every tool",
        "Pay once in BDT — bKash, Nagad or Bank Transfer",
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
            { label: "Savings", value: "৳508/mo vs separate" },
            { label: "Support", value: "Priority WhatsApp" },
          ],
        },
      ]}
    />
  );
}
