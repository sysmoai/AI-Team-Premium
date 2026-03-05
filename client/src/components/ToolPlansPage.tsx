import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, Shield, Star, Users, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface ToolPlan {
  name: string;
  price: string;
  delivery: string;
  seats?: string;
  features: string[];
  tag: string;
  whatsappUrl: string;
  popular?: boolean;
  tagline?: string;
}

export interface ToolPageData {
  seoTitle: string;
  seoDescription: string;
  heroBanglaTitle: string;
  subtitle: string;
  plans: ToolPlan[];
  aboutText: string;
  whoIsItFor: string[];
  faqs: { q: string; a: string }[];
  toolEmoji?: string;
}

export default function ToolPlansPage({ data }: { data: ToolPageData }) {
  usePageMeta({ title: data.seoTitle, description: data.seoDescription });

  return (
    <Layout>
      <section className="py-20 overflow-hidden" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Shield size={13} /> Verified · bKash/Nagad · Instant Delivery
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ color: BRAND.navy }}>
            {data.heroBanglaTitle}
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>{data.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white text-base transition-all"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Order on WhatsApp
            </a>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-base transition-all"
              style={{ background: BRAND.white, color: BRAND.navy, border: `1px solid rgba(37,99,235,0.15)` }}
            >
              View Plans ↓
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Zap size={16} color={BRAND.blue} />, text: "Fast Delivery" },
              { icon: <WhatsAppIcon size={16} color="#25D366" />, text: "bKash / Nagad" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "30-Day Warranty" },
              { icon: <Users size={16} color={BRAND.blue} />, text: "Bangla Support" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 py-3">
                {item.icon}
                <span style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 style={{ color: BRAND.navy, fontSize: "1.6rem", fontWeight: 700 }}>সব প্ল্যান দেখুন</h2>
            <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem" }}>বাংলাদেশ থেকে bKash / Nagad-এ পেমেন্ট করুন</p>
          </div>
          <div className={`grid grid-cols-1 gap-6 ${data.plans.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-md mx-auto"}`}>
            {data.plans.map((plan, i) => (
              <div
                key={i}
                data-testid={`card-plan-${i}`}
                className="relative flex flex-col rounded-2xl p-8 transition-all"
                style={{
                  background: BRAND.white,
                  border: plan.popular ? `2px solid ${BRAND.blue}` : "1px solid rgba(37,99,235,0.10)",
                  boxShadow: plan.popular ? "0 8px 32px rgba(37,99,235,0.12)" : "0 2px 12px rgba(15,23,42,0.04)",
                }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-4 py-1 text-white"
                    style={{ background: BRAND.blue, fontSize: "0.72rem", fontWeight: 700 }}
                  >
                    <Star size={11} fill="#fff" /> Most Popular
                  </span>
                )}
                <div className="inline-flex items-center self-start rounded-full px-3 py-1 mb-4" style={{ background: BRAND.sky, color: BRAND.blue, fontSize: "0.72rem", fontWeight: 700 }}>
                  {plan.tag}
                </div>
                <h3 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>{plan.name}</h3>
                {plan.seats && (
                  <p className="mt-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.8rem" }}>{plan.seats}</p>
                )}
                <div className="mt-3 flex items-baseline gap-1">
                  <span style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 800 }}>{plan.price.split('/')[0]}</span>
                  {plan.price.includes('/') && <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.9rem" }}>/{plan.price.split('/')[1]}</span>}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                  <Clock size={13} /> Delivery: {plan.delivery}
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5" style={{ fontSize: "0.85rem", color: BRAND.navy, opacity: 0.75 }}>
                      <Check size={15} color={BRAND.blue} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`button-order-${i}`}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white transition-all"
                  style={{ background: plan.popular ? BRAND.blue : "#25D366", fontSize: "0.9rem" }}
                >
                  <WhatsAppIcon size={16} color="#fff" /> Order on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND.navy }}>সম্পর্কে জানুন</h2>
          <p className="text-base leading-relaxed" style={{ color: BRAND.navy, opacity: 0.7 }}>{data.aboutText}</p>
          <div className="mt-8">
            <h3 className="font-semibold mb-4" style={{ color: BRAND.navy }}>কারা ব্যবহার করবেন</h3>
            <div className="flex flex-wrap gap-2">
              {data.whoIsItFor.map((who) => (
                <span key={who} className="rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: BRAND.white, color: BRAND.blue, border: `1px solid rgba(37,99,235,0.2)` }}>
                  {who}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: BRAND.navy }}>সাধারণ প্রশ্ন (FAQ)</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border px-5" style={{ borderColor: "rgba(37,99,235,0.10)" }}>
                <AccordionTrigger className="text-left font-semibold py-4" style={{ color: BRAND.navy, fontSize: "0.95rem" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4" style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">অর্ডার করতে প্রস্তুত?</h2>
          <p className="text-white/50 mb-8">WhatsApp-এ মেসেজ করুন — ৫ মিনিটে সাড়া পাবেন।</p>
          <a
            href="https://wa.me/8801533262758"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-final-cta"
            className="inline-flex items-center gap-3 rounded-full px-10 py-4 font-bold text-white text-lg"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon size={22} color="#fff" /> WhatsApp-এ অর্ডার করুন
          </a>
        </div>
      </section>
    </Layout>
  );
}
