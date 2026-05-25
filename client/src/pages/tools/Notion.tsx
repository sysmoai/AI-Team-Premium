import { ToolDetail } from "@/components/ToolDetail";
import { BookOpen } from "lucide-react";

export default function NotionPage() {
  return (
    <ToolDetail
      name="Notion AI"
      tagline="in Bangladesh"
      description="Notion AI brings an intelligent writing assistant directly into your Notion workspace. Summarise documents, auto-generate action items, draft content, and build databases — without leaving Notion. Perfect for Bangladeshi students, freelancers, and teams."
      accentColor="#000000"
      icon={BookOpen}
      features={[
        "AI writing & editing inside any Notion page",
        "Summarise long documents and research papers instantly",
        "Auto-generate action items from meeting notes",
        "AI-powered database and table generation from text",
        "Brainstorm, outline and draft content in one click",
        "Translate content across Bangla, English and 20+ languages",
        "Ask AI questions about any page or document in your workspace",
        "Fill properties and auto-complete repetitive data entries",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Notion AI — Team Seat",
          price: "৳450",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Team workspace seat" },
            { label: "AI usage", value: "Unlimited in workspace" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Notion AI — Personal Seat",
          price: "৳1,800",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Dedicated private seat" },
            { label: "AI usage", value: "Unlimited personal" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/notion"
    />
  );
}
