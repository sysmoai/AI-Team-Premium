import { ToolDetail } from "@/components/ToolDetail";
import { Search } from "lucide-react";

export default function Perplexity() {
  return (
    <ToolDetail
      name="Perplexity Pro"
      tagline="Search Redefined"
      description="The world's most powerful AI answer engine. Sonar Pro with Deep Research, real-time web citations, multi-model access (o4-mini, GPT-4.5, Claude Sonnet 4, Gemini 2.5 Pro), unlimited file uploads and Perplexity Assistant voice mode."
      accentColor="#20B2AA"
      icon={Search}
      features={[
        "Sonar Pro — Perplexity's fastest and most accurate model",
        "Deep Research: autonomous multi-step research with cited reports",
        "Real-time web search with numbered citations",
        "Switch between o4-mini, GPT-4.5, Claude Sonnet 4, Gemini 2.5 Pro, and Sonar",
        "Upload and analyse unlimited PDFs, spreadsheets and documents",
        "Perplexity Assistant — voice-based AI assistant",
        "Visualisations: charts, diagrams and timelines in answers",
        "No knowledge cut-off — always current information",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Perplexity Pro — Shared",
          price: "৳599",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Shared seat" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "WhatsApp 24/7" },
          ],
        },
      ]}
    />
  );
}
