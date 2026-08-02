import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, ArrowRight, Lightbulb, Lock, GraduationCap, Workflow, Headphones, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { config } from "@/lib/config";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

const CHECKPOINTS = [
  {
    id: "strategy",
    icon: Lightbulb,
    title: "Strategy & Discovery",
    question: "Do you know which AI tools your business actually needs — and which ones are a waste of money?",
    yes: "You have a clear AI adoption roadmap. Our AI Advisory service can validate and refine it, or help you move from plan to execution.",
    no: "Most businesses jump into buying AI tools without a strategy — and end up paying for subscriptions they never use. Start with our AI Advisory: we assess your needs, map opportunities, and build a 3-6 month roadmap.",
    link: "/services/ai-advisory",
    linkLabel: "Get AI Advisory",
  },
  {
    id: "security",
    icon: Lock,
    title: "Security & Compliance",
    question: "Are your team's AI accounts secured with 2FA, proper recovery, and data privacy controls?",
    yes: "Good — security is often overlooked. Our Security Audit can verify your setup is truly robust, not just 'probably fine.' Quarterly reviews recommended.",
    no: "If your team shares passwords or skips 2FA on AI tools, your data — client conversations, business documents — is at risk. Our AI Setup & Security service fixes this without asking for your passwords.",
    link: "/services/ai-setup-security",
    linkLabel: "Secure Your AI Tools",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Team Capability",
    question: "Can every team member who would benefit from AI actually use it effectively today?",
    yes: "Strong foundation. Regular workshops keep skills current as AI tools evolve. Our advanced training covers new features and industry-specific workflows.",
    no: "This is the #1 reason AI investments fail — the tools are bought but nobody knows how to use them beyond basic prompts. Our hands-on workshops train your team on real tasks, in Bangla or English.",
    link: "/services/ai-training",
    linkLabel: "Train Your Team",
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Automation & Integration",
    question: "Are your team's repetitive daily tasks automated — or are people still doing them manually?",
    yes: "Excellent — you're already saving hours per week. Regular workflow reviews uncover new automation opportunities as your business grows and tools evolve.",
    no: "This is where time and money leak. If your team manually copies data between apps, answers the same customer questions repeatedly, or processes orders by hand — automation could save 10-40 hours/week. Starting from ৳5,000.",
    link: "/services/ai-automation",
    linkLabel: "Automate Your Workflows",
  },
  {
    id: "ongoing",
    icon: Headphones,
    title: "Ongoing Management",
    question: "Who's tracking your AI subscription renewals, security updates, and tool stack optimisation?",
    yes: "Great — proactive management prevents subscription lapses and security gaps. Our Managed AI Ops adds dedicated monitoring and quarterly optimisation reviews.",
    no: "Subscription lapses, missed renewals, outdated tools — these quietly cost money and create security gaps. Our Managed AI Operations handles everything: monitoring, renewals, audits, and quarterly reviews.",
    link: "/services/managed-ai-operations",
    linkLabel: "Get Managed Ops",
  },
];

export default function AIReadinessAssessment() {
  usePageMeta({
    title: "AI Readiness Assessment — Is Your Business Ready for AI?",
    description: "5-minute self-assessment: Strategy, security, training, automation, and ongoing management. Discover where your business is strong and where AI services can help. Free, no commitment.",
    path: "/ai-readiness",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Readiness Assessment", path: "/ai-readiness" },
      ]} />
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Lightbulb size={13} /> 5-Minute Self-Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            Is Your Business <span style={{ color: BRAND.blue }}>AI-Ready?</span>
          </h1>
          <p className="text-lg" style={{ color: BRAND.navy, opacity: 0.6 }}>
            Five questions. Five minutes. Discover exactly where AI can make the biggest difference.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-0">
          {CHECKPOINTS.map((cp, i) => (
            <div key={cp.id} className="py-10" style={{ borderBottom: i < CHECKPOINTS.length - 1 ? "1px solid rgba(37,99,235,0.08)" : "none" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: BRAND.sky }}>
                  <cp.icon size={22} color={BRAND.blue} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BRAND.blue }}>Checkpoint {i + 1} of {CHECKPOINTS.length}</div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cp.title}</h2>
                </div>
              </div>

              <p className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-200">
                {cp.question}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl p-5" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} color="#16A34A" />
                    <span className="text-sm font-bold" style={{ color: "#16A34A" }}>YES — You're on track</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{cp.yes}</p>
                </div>
                <div className="rounded-xl p-5" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⚠️</span>
                    <span className="text-sm font-bold" style={{ color: "#DC2626" }}>NO — Opportunity here</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{cp.no}</p>
                </div>
              </div>

              <Link href={cp.link} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: BRAND.blue }}>
                {cp.linkLabel} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ background: "rgba(15,23,42,0.02)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Want a personalised assessment?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Message us on WhatsApp. We'll review your specific situation and tell you exactly where AI can help — no generic advice, no sales pitch.
          </p>
          <a
            href="https://wa.me/8801533262758?text=Hi%2C+I+want+a+free+AI+readiness+assessment+for+my+business"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon size={20} color="#fff" /> Free Assessment
          </a>
        </div>
      </section>
    </Layout>
  );
}
