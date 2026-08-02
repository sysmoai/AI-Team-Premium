import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Shield, Headphones, RefreshCw, BarChart3, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";

const INCLUDED = [
  "24/7 monitoring of your AI tool accounts and subscriptions",
  "Renewal management — no lapses, no disruptions",
  "Account recovery assistance if access is lost",
  "Quarterly tool stack review and optimization",
  "Security audit every 90 days",
  "Priority WhatsApp support channel",
  "Monthly usage and performance report",
  "Dedicated account manager",
];

const FAQS = [
  { q: "Managed AI Operations কার জন্য?", a: "Businesses যারা multiple AI subscriptions use করছে এবং centralized management চায় — renewals, security, support, optimization সব এক জায়গায়। 5+ AI subscriptions থাকলে Managed Ops বিশেষভাবে useful।" },
  { q: "Managed service-এ কী কী manage করবেন?", a: "Account access এবং credential security, subscription renewal tracking, usage monitoring, quarterly tool stack review (কোন tool বেশি ব্যবহার হচ্ছে, নতুন better alternative আছে কিনা), security audit, এবং priority support।" },
  { q: "আমার account password share করতে হবে?", a: "না। Managed AI Operations service-এ আমরা আপনার passwords access করি না। আমরা monitoring, renewal reminders, security guidance এবং optimization recommendations দেই। Account setup আমরা guide করি — আপনি control retain করেন।" },
  { q: "Pricing কী?", a: "Monthly retainer basis — number of managed subscriptions এবং service level-র উপর নির্ভর করে। Standard plan starts from ৳3,500/month for up to 10 subscriptions। Enterprise custom pricing available। Free consultation-এ detailed proposal দেই।" },
  { q: "কি ধরনের support পাব?", a: "Priority WhatsApp channel — direct line to your account manager। Standard response time: under 2 hours during business hours (9 AM - 9 PM Bangladesh time)। Emergency support available 24/7 for critical issues।" },
  { q: "Managed Ops আর AI Advisory-এর মধ্যে পার্থক্য কী?", a: "AI Advisory হল one-time strategic engagement — roadmap তৈরি করে দেই। Managed AI Operations হল ongoing operational service — month-over-month আপনার AI ecosystem monitor, manage এবং optimize করি। Advisory plan execute করার জন্য Managed Ops।" },
];

export default function ManagedAiOperations() {
  usePageMeta({
    title: "Managed AI Operations — Ongoing AI Management Bangladesh",
    description: "Ongoing management of your AI subscriptions. Renewal tracking, security audits, quarterly optimization, priority WhatsApp support, and monthly reports. From ৳3,500/month.",
    path: "/services/managed-ai-operations",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Support & Services", path: "/services" },
        { name: "Managed AI Operations", path: "/services/managed-ai-operations" },
      ]} />
      <FAQSchema items={FAQS} />
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>Managed AI Operations</strong> is an ongoing operational service from AI Team Premium in Bangladesh. We monitor your AI subscriptions, manage renewals, perform quarterly security audits and tool stack reviews, and provide priority WhatsApp support with a dedicated account manager. Standard plan from <strong>৳3,500/month</strong> for up to 10 subscriptions. We never ask for your passwords. Pay via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Headphones size={13} /> Ongoing Management
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            Managed AI Ops — <span style={{ color: BRAND.blue }}>We Handle It</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            আপনার AI subscriptions-এর ongoing management — renewals, security, optimization, support। আপনি focus করুন business-এ, বাকিটা আমরা দেখছি।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+Managed+AI+Operations+service"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-managed"
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
              { icon: <RefreshCw size={16} color={BRAND.blue} />, text: "Renewal Management" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "Quarterly Security Audit" },
              { icon: <BarChart3 size={16} color={BRAND.blue} />, text: "Monthly Reports" },
              { icon: <Headphones size={16} color={BRAND.blue} />, text: "Priority Support" },
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
                Monthly Retainer
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>Managed AI Operations</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "2.5rem", fontWeight: 800 }}>From ৳3,500</span>
                <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.9rem" }}>/month</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Shield size={13} /> Up to 10 subscriptions
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
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+Managed+AI+Operations+service"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-managed"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Free Consultation
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>No long-term commitment. Cancel anytime.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Best for</h3>
              <div className="space-y-3">
                {[
                  { emoji: "🏢", title: "Multi-Tool Businesses", desc: "যারা 5+ AI subscriptions manage করছেন এবং renewals, security, আর optimization track করা কঠিন মনে হচ্ছে।" },
                  { emoji: "👔", title: "Busy Founders & Executives", desc: "যাদের AI tools important কিন্তু নিজে manage করার time নেই — আমরা operational layer handle করি, আপনি strategic decisions নেন।" },
                  { emoji: "🔄", title: "Growing Teams", desc: "Team-এ নতুন tools add হচ্ছে, পুরনো tools expire হচ্ছে — আমরা পুরো lifecycle manage করি যাতে কোন disruption না হয়।" },
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
          <h2 className="text-3xl font-extrabold text-white mb-4">আপনার AI Operations-টা আমাদের দিন</h2>
          <p className="text-white/50 mb-8">Free consultation — WhatsApp-এ message করুন। আমরা আপনার current subscriptions review করে managed ops plan share করবো।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+Managed+AI+Operations+service"
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
