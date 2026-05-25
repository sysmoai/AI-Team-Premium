import { ToolDetail } from "@/components/ToolDetail";
import { Monitor } from "lucide-react";

export default function Microsoft365Page() {
  return (
    <ToolDetail
      name="Microsoft 365 Copilot"
      tagline="in Bangladesh"
      description="Microsoft 365 with Copilot AI brings intelligence to Word, Excel, PowerPoint, Outlook, and Teams. Draft documents, analyse data, build presentations, summarise emails — all with AI. Available in Bangladesh via bKash/Nagad, no international card needed."
      accentColor="#0078D4"
      icon={Monitor}
      features={[
        "Copilot in Word — draft, rewrite and summarise documents with AI",
        "Copilot in Excel — analyse data, create formulas and generate charts",
        "Copilot in PowerPoint — turn prompts or Word docs into full presentations",
        "Copilot in Outlook — draft emails and summarise long email threads",
        "Microsoft Teams with AI transcription and meeting summaries",
        "1TB OneDrive cloud storage for all files and documents",
        "Word, Excel, PowerPoint, OneNote, Access — full suite",
        "Access from any device — PC, Mac, tablet, phone",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Microsoft 365 Copilot — Shared",
          price: "৳899",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Shared",
          specs: [
            { label: "Apps", value: "Word · Excel · PPT · Teams" },
            { label: "Storage", value: "1TB OneDrive" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Microsoft 365 Copilot — Personal",
          price: "৳3,500",
          period: "/mo",
          delivery: "4–6 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Dedicated private seat" },
            { label: "Copilot", value: "Full unlimited AI" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/microsoft365"
    />
  );
}
