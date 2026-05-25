import { ToolDetail } from "@/components/ToolDetail";
import { Mic } from "lucide-react";

export default function ElevenLabsPage() {
  return (
    <ToolDetail
      name="ElevenLabs Voice AI"
      tagline="in Bangladesh"
      description="ElevenLabs is the world's most realistic AI voice generator — creating natural-sounding speech in Bangla, English, and 29 languages. Perfect for BD YouTubers, educators, and content creators. Clone voices, dub videos, generate podcasts — from ৳699/month via bKash/Nagad."
      accentColor="#F97316"
      icon={Mic}
      features={[
        "29 languages including Bangla and English text-to-speech",
        "100,000 characters/month — enough for 10+ YouTube videos",
        "Voice cloning — replicate any voice from a 30-second sample",
        "30+ ultra-realistic AI voices (male, female, formal, casual)",
        "Video dubbing — translate & re-voice any video automatically",
        "Commercial usage rights — monetise on YouTube, client work, ads",
        "Script-to-podcast conversion in one click",
        "API access for developers building voice-enabled apps",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "ElevenLabs Creator — Shared",
          price: "৳699",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Usage", value: "100K characters/mo" },
            { label: "Languages", value: "29 incl. Bangla" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "ElevenLabs Creator — Personal",
          price: "৳2,500",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Usage", value: "500K characters/mo" },
            { label: "Access", value: "Dedicated private seat" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/elevenlabs"
    />
  );
}
