import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Shield, Users, Lightbulb, Target, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";

const INCLUDED = [
  "AI readiness assessment for your business",
  "Opportunity mapping — identify highest-ROI AI use cases",
  "Vendor and tool selection strategy",
  "Build-vs-buy analysis for AI investments",
  "Risk and compliance review",
  "3-6 month AI adoption roadmap",
  "Executive summary presentation",
];

const FAQS = [
  { q: "AI Advisory কার জন্য?", a: "Business owners, founders এবং decision-makers যারা জানেন AI invest করতে হবে কিন্তু কোন direction-এ যাবেন বুঝতে পারছেন না — তাদের জন্য। আপনাকে AI কিনতে সাহায্য করা না, বরং business strategy-র সাথে AI কে align করতে সাহায্য করা।" },
  { q: "Advisory service কিভাবে কাজ করে?", a: "First, আমরা আপনার business goals, constraints এবং current tech stack review করি। Then specific AI opportunities identify করে prioritized roadmap তৈরি করি। Vendor selection এবং implementation plan সহ full strategy document deliver করি।" },
  { q: "কত সময় লাগে?", a: "Standard engagement 2-4 সপ্তাহ, আপনার business complexity-র উপর নির্ভর করে। Discovery phase 1 সপ্তাহ, strategy development 1-2 সপ্তাহ, এবং final presentation ও handover 1 সপ্তাহ।" },
  { q: "Pricing কী?", a: "Every business আলাদা — আমরা first consultation-এ আপনার scope বুঝে proposal দেই। Consultation itself বিনামূল্যে। Pricing depends on scope, complexity, এবং timeline." },
  { q: "কি ধরনের business-এর জন্য?", a: "SME, startup, agency এবং mid-size company — যেকোনো business যেখানে AI adoption strategy দরকার কিন্তু in-house expertise নেই। E-commerce, fintech, healthcare, education, manufacturing — সব sector cover করি।" },
  { q: "Consultation process-এ কী পাব?", a: "Free 30-minute discovery call, তারপর detailed proposal with scope, timeline এবং investment estimate. আপনি approve করলে আমরা full engagement শুরু করি।" },
];

export default function AiAdvisory() {
  usePageMeta({
    title: "AI Advisory — Strategy & Consulting for Bangladesh Businesses | AI Team Premium",
    description: "AI readiness assessment, opportunity mapping, vendor selection strategy, and 3-6 month AI adoption roadmap for Bangladeshi businesses. Free consultation. Pay via bKash/Nagad.",
    path: "/services/ai-advisory",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Support & Services", path: "/services" },
        { name: "AI Advisory", path: "/services/ai-advisory" },
      ]} />
      <FAQSchema items={FAQS} />
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>AI Advisory</strong> is a strategic consulting service from AI Team Premium in Bangladesh. We help businesses assess their AI readiness, identify high-ROI opportunities, select the right tools and vendors, and build a 3–6 month AI adoption roadmap. Engagement starts with a free discovery call. Pricing is scoped per engagement. Pay via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Lightbulb size={13} /> Strategic Consulting
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            AI Advisory — <span style={{ color: BRAND.blue }}>Strategy First</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            AI invest করার আগে — right strategy, right tools, right timeline। আমরা আপনার business-এর জন্য AI roadmap design করি।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+a+free+consultation+for+AI+Advisory"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-advisory"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Free Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Lightbulb size={16} color={BRAND.blue} />, text: "AI Readiness Assessment" },
              { icon: <Target size={16} color={BRAND.blue} />, text: "Opportunity Mapping" },
              { icon: <Users size={16} color={BRAND.blue} />, text: "Vendor Selection" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "Risk & Compliance" },
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
                Scoped Per Engagement
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>AI Advisory Engagement</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "2.5rem", fontWeight: 800 }}>Request</span>
                <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.9rem" }}>pricing</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Target size={13} /> Free discovery call included
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
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+a+free+consultation+for+AI+Advisory"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-advisory"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Free Consultation
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>No commitment. Scoped proposal after discovery.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Best for</h3>
              <div className="space-y-3">
                {[
                  { emoji: "🏢", title: "Founders & CEOs", desc: "যারা জানেন AI invest করতে হবে, কিন্তু board বা team-কে convincing roadmap দেখাতে চান।" },
                  { emoji: "📊", title: "Operations Leaders", desc: "যারা multiple AI tools evaluate করছেন এবং objective vendor comparison দরকার।" },
                  { emoji: "🚀", title: "Scale-Up Companies", desc: "যারা 10-50 employee stage-এ আছেন এবং AI দিয়ে competitive advantage তৈরি করতে চান।" },
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
          <h2 className="text-3xl font-extrabold text-white mb-4">আপনার AI Strategy শুরু করুন</h2>
          <p className="text-white/50 mb-8">Free 30-minute discovery call — WhatsApp-এ message করুন। আপনার business goals বুঝে আমরা strategy proposal share করবো।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+a+free+consultation+for+AI+Advisory"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-final-cta"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> Free Consultation
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
