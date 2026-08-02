import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Zap, Workflow, Repeat, Cog, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";

const INCLUDED = [
  "Workflow audit — identify automation opportunities",
  "Process mapping and redesign for AI integration",
  "Tool selection (Zapier, Make, n8n, custom solutions)",
  "End-to-end automation build and testing",
  "Integration with existing tools and platforms",
  "Error handling and monitoring setup",
  "Documentation and team handover",
  "30-day post-deployment support",
];

const FAQS = [
  { q: "AI Automation Service কার জন্য?", a: "Businesses যারা repetitive manual tasks automate করতে চান — data entry, email processing, report generation, customer follow-ups, content scheduling, social media posting, এবং আরও অনেক কিছু। Freelancers থেকে enterprise — সবাই eligible।" },
  { q: "Automation কিভাবে কাজ করে?", a: "First, আমরা আপনার current workflows review করি এবং automation opportunities identify করি। তারপর process redesign করি AI integration-এর জন্য। Tools set up করি (Zapier, Make, n8n, বা custom scripts), test করি, এবং আপনার team-কে handover করি documentation সহ।" },
  { q: "কি ধরনের tasks automate করা যায়?", a: "Email sorting & response, invoice generation, data scraping & entry, report compilation, social media scheduling, customer onboarding, lead qualification, task assignment, notification routing — যেকোনো rule-based বা AI-enhanced repetitive task।" },
  { q: "কত সময় লাগে?", a: "Simple automation: 1-2 weeks। Complex multi-step workflow: 3-6 weeks। Discovery phase-এ আমরা exact timeline estimate দেই। Rush delivery available for urgent needs।" },
  { q: "Pricing কী?", a: "Project-based pricing — automation complexity এবং tool stack-এর উপর নির্ভর করে। Simple automation from ৳5,000, complex workflow from ৳25,000। Free consultation-এ scoped quote দেই।" },
  { q: "Automation setup-এর পর support থাকবে?", a: "হ্যাঁ। Deployment-এর পর 30-day support — কোন workflow break করলে fix করি, adjustment দরকার হলে করি। Plus, আমরা documentation share করি যাতে আপনার team নিজেও manage করতে পারে।" },
];

export default function AiAutomation() {
  usePageMeta({
    title: "AI Automation — Workflow Integration for Bangladesh | AI Team Premium",
    description: "End-to-end AI workflow automation for Bangladeshi businesses. Process mapping, tool setup (Zapier, Make, n8n), deployment, and 30-day support. From ৳5,000.",
    path: "/services/ai-automation",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Support & Services", path: "/services" },
        { name: "AI Automation", path: "/services/ai-automation" },
      ]} />
      <FAQSchema items={FAQS} />
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>AI Automation & Workflow Integration</strong> is an end-to-end service from AI Team Premium in Bangladesh. We audit your manual workflows, redesign them for AI integration, build and test automation using tools like Zapier, Make, and n8n, and hand over documented, monitored systems. Simple automation from <strong>৳5,000</strong>, complex workflows from <strong>৳25,000</strong>. Pay via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Workflow size={13} /> Workflow Automation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            AI Automation — <span style={{ color: BRAND.blue }}>Work Smarter</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            Repetitive tasks automate করুন — AI-powered workflows দিয়ে। Process redesign, tool setup, deployment, আর support — সব এক জায়গায়।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Automation+for+my+business"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-automation"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Free Audit Call
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Workflow size={16} color={BRAND.blue} />, text: "Process Mapping" },
              { icon: <Zap size={16} color={BRAND.blue} />, text: "AI-Powered Tasks" },
              { icon: <Repeat size={16} color={BRAND.blue} />, text: "End-to-End Build" },
              { icon: <Cog size={16} color={BRAND.blue} />, text: "Monitoring & Support" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 py-3">
                {item.icon}
                <span style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl p-8" style={{ background: BRAND.white, border: `2px solid ${BRAND.blue}`, boxShadow: "0 8px 32px rgba(37,99,235,0.12)" }}>
              <div className="inline-flex items-center rounded-full px-3 py-1 mb-4" style={{ background: BRAND.sky, color: BRAND.blue, fontSize: "0.72rem", fontWeight: 700 }}>
                From ৳5,000
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>AI Automation Engagement</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "2.5rem", fontWeight: 800 }}>From ৳5,000</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Zap size={13} /> Project-based pricing
              </div>
              <ul className="space-y-3 mb-8">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5" style={{ fontSize: "0.88rem", color: BRAND.navy, opacity: 0.75 }}>
                    <Check size={15} color={BRAND.blue} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Automation+for+my+business"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-automation"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Free Audit Call
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>Scoped quote after workflow audit.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Best for</h3>
              <div className="space-y-3">
                {[
                  { emoji: "📧", title: "High-Volume Operations", desc: "যারা daily hundreds of emails, forms, বা data entries process করেন — automate করে hours save করুন।" },
                  { emoji: "🏪", title: "E-commerce & Dropshipping", desc: "Order processing, inventory updates, customer notifications — সব automate করে business scale করুন।" },
                  { emoji: "📊", title: "Agencies & Service Providers", desc: "Client onboarding, reporting, invoicing, follow-ups — recurring tasks automate করে team-কে strategic কাজে focus করতে দিন।" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl p-4" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.10)" }}>
                    <p className="font-semibold" style={{ color: BRAND.navy }}>{item.emoji} {item.title}</p>
                    <p className="text-sm mt-1" style={{ color: BRAND.navy, opacity: 0.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-white">সাধারণ প্রশ্ন (FAQ)</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border px-5" style={{ borderColor: "rgba(37,99,235,0.10)" }}>
                <AccordionTrigger className="text-left font-semibold py-4 text-slate-900 dark:text-white" style={{ fontSize: "0.95rem" }}>{faq.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-slate-900/65 dark:text-slate-300" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">আপনার Workflow Automate করুন</h2>
          <p className="text-white/50 mb-8">Free workflow audit — WhatsApp-এ message করুন। আমরা আপনার manual processes review করে automation plan share করবো।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Automation+for+my+business"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-final-cta"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> Free Audit Call
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
