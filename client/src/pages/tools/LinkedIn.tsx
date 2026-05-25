import { ToolDetail } from "@/components/ToolDetail";
import { Briefcase } from "lucide-react";

export default function LinkedInPage() {
  return (
    <ToolDetail
      name="LinkedIn Premium"
      tagline="in Bangladesh"
      description="LinkedIn Premium gives Bangladeshi job seekers and professionals InMail credits to contact recruiters directly, full profile viewer insights, AI-powered resume coaching, and access to 16,000+ LinkedIn Learning courses — from ৳999/month via bKash or Nagad."
      accentColor="#0A66C2"
      icon={Briefcase}
      features={[
        "InMail credits — message any recruiter or employer directly",
        "See who viewed your profile — full 90-day list",
        "AI-powered resume and LinkedIn profile suggestions",
        "Job applicant insights — see how you rank vs other applicants",
        "LinkedIn Learning — 16,000+ courses in tech, design, business",
        "AI interview preparation with real-time feedback",
        "Salary benchmarks and compensation data for BD market",
        "Business plan: company insights and advanced lead search",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "LinkedIn Premium Career",
          price: "৳999",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Private",
          specs: [
            { label: "InMail", value: "5 credits/month" },
            { label: "Learning", value: "16,000+ courses" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "LinkedIn Premium Business",
          price: "৳1,800",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Private",
          specs: [
            { label: "InMail", value: "15 credits/month" },
            { label: "Browse", value: "Unlimited profiles" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/linkedin"
    />
  );
}
