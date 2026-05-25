import { ToolDetail } from "@/components/ToolDetail";
import { Cpu } from "lucide-react";

export default function Grok() {
  return (
    <ToolDetail
      name="Grok Premium"
      tagline="by xAI — in Bangladesh"
      description="xAI's Grok 3 with real-time X/internet data, DeepSearch, Aurora image generation, and Think mode. Upgrade to SuperGrok (৳499/mo) for unlimited Aurora images and video generation. Pay with bKash/Nagad in Bangladesh."
      accentColor="#7C3AED"
      icon={Cpu}
      features={[
        "Grok 3 — xAI's most capable model",
        "Think mode: extended chain-of-thought reasoning",
        "DeepSearch: real-time web + X (Twitter) data synthesis",
        "Aurora image generation — photorealistic AI images",
        "1,000,000 token context window for long documents",
        "Real-time information without knowledge cut-off",
        "Code generation, analysis and debugging",
        "Voice mode — natural conversation in Bangla and English",
        "Pay via bKash / Nagad · 30-day warranty",
      ]}
      plans={[
        {
          label: "SuperGrok — Shared (Recommended)",
          price: "৳499",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Images", value: "Unlimited Aurora" },
            { label: "Video", value: "Yes (Grok Video)" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "SuperGrok — Personal Seat",
          price: "৳3,990",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Account", value: "Your own X account" },
            { label: "Images", value: "Unlimited + priority" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/grok"
      extendedFaqs={[
        { q: "What is SuperGrok and how is it different from regular Grok?", a: "SuperGrok ($30/month from xAI) is the premium tier that unlocks unlimited Aurora image generation, video generation with Grok Video, Big Brain deep reasoning mode, and higher message limits. Regular Grok is limited to 10 images/month with no video. AITPBD sells SuperGrok Shared at ৳499/month." },
        { q: "How many images can I generate with Grok/SuperGrok?", a: "With the SuperGrok Shared plan (৳499/mo), you get unlimited Aurora image generation — no daily or monthly cap. Aurora produces photorealistic, high-resolution images comparable to Midjourney and DALL·E 3." },
        { q: "Does Grok/SuperGrok have real-time X (Twitter) data?", a: "Yes — this is Grok's unique killer feature. DeepSearch integrates live X/Twitter data with full web search, giving you real-time social media intelligence that ChatGPT, Claude, and Gemini cannot provide." },
      ]}
    />
  );
}
