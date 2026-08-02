import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Shield, Lock, Key, Server, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";

const INCLUDED = [
  "Account security audit for your AI tools",
  "Two-factor authentication (2FA) setup",
  "Recovery email and backup code configuration",
  "Password hygiene and credential management",
  "API key security and rotation policy",
  "Data privacy settings review",
  "Shared vs. personal access model guidance",
  "30-day post-setup WhatsApp support",
];

const FAQS = [
  { q: "AI Setup & Security Service কার জন্য?", a: "যেকোনো business বা individual যারা ChatGPT, Claude, Gemini বা অন্য premium AI tools use করছেন — এবং account security, data privacy, বা shared access setup নিয়ে confused। বিশেষ করে যারা team-এর জন্য AI tools setup করছেন।" },
  { q: "কেন AI account security important?", a: "AI tools-এ আপনার business data, client conversations, এবং sensitive information থাকতে পারে। Weak password বা missing 2FA থাকলে account compromise হতে পারে। Shared account setup ভুল হলে একজনের data অন্য জন দেখতে পারে। আমরা সঠিক security setup করে দেই।" },
  { q: "Service কিভাবে work করে?", a: "First, আমরা আপনার current AI accounts এবং security settings review করি। তারপর prioritized security hardening plan তৈরি করি এবং step-by-step setup করি — সাথে live screen share বা recorded video tutorial। শেষে documented security policy share করি।" },
  { q: "কত সময় লাগে?", a: "Standard setup 1-2 sessions (total 2-4 hours), আপনার কতটি account এবং কতজন user আছে তার উপর নির্ভর করে। Complex enterprise setup একটু বেশি সময় নিতে পারে।" },
  { q: "Pricing কী?", a: "Account এবং team size-র উপর নির্ভর করে। Standard setup শুরু ৳3,999 থেকে। Free assessment call-এ exact scope এবং pricing discuss করি।" },
  { q: "আমার password বা OTP share করতে হবে?", a: "কখনোই না। AI Team Premium কখনো আপনার password, 2FA code, বা OTP চাইবে না। আমরা আপনাকে guide করি — আপনি নিজের device-এ setup complete করেন।" },
];

export default function AiSetupSecurity() {
  usePageMeta({
    title: "AI Setup & Security — Hardening for Bangladesh Teams",
    description: "Account security audit, 2FA setup, recovery configuration, password hygiene, API key rotation, and data privacy for AI tools. Guide-based setup — we never ask for your password. From ৳3,999.",
    path: "/services/ai-setup-security",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Support & Services", path: "/services" },
        { name: "AI Setup & Security", path: "/services/ai-setup-security" },
      ]} />
      <FAQSchema items={FAQS} />
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>AI Setup & Security</strong> is a hardening service from AI Team Premium in Bangladesh. We audit your existing AI tool accounts, configure two-factor authentication, recovery methods, API key security, and data privacy settings. All setup is <strong>guide-based</strong> — we never ask for your password, 2FA codes, or OTPs. Standard setup from <strong>৳3,999</strong>. Pay via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Shield size={13} /> Security Hardening
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            AI Setup & Security — <span style={{ color: BRAND.blue }}>Lock It Down</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            আপনার AI accounts secure করুন — 2FA, recovery, password hygiene, data privacy। Guide-based setup, আপনার password আমরা কখনোই চাই না।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Setup+%26+Security+service"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-setup"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Free Assessment
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Shield size={16} color={BRAND.blue} />, text: "Security Audit" },
              { icon: <Lock size={16} color={BRAND.blue} />, text: "2FA & Recovery" },
              { icon: <Key size={16} color={BRAND.blue} />, text: "API Key Security" },
              { icon: <Server size={16} color={BRAND.blue} />, text: "Data Privacy" },
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
                From ৳3,999
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>AI Setup & Security</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "2.5rem", fontWeight: 800 }}>Starts ৳3,999</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Shield size={13} /> Guide-based — we never ask passwords
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
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Setup+%26+Security+service"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-setup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Free Assessment
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>We never ask for your password or OTP.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Best for</h3>
              <div className="space-y-3">
                {[
                  { emoji: "👥", title: "Team Leads", desc: "যারা team-এর জন্য multiple AI accounts manage করছেন এবং centralized security policy দরকার।" },
                  { emoji: "🏢", title: "SME Owners", desc: "যারা employee-দের AI tools দিয়েছেন কিন্তু account security setup confirm করতে চান।" },
                  { emoji: "🔐", title: "Security-Conscious Users", desc: "যারা premium AI subscriptions use করছেন এবং account compromise risk minimize করতে চান।" },
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
          <h2 className="text-3xl font-extrabold text-white mb-4">আপনার AI Accounts সুরক্ষিত করুন</h2>
          <p className="text-white/50 mb-8">Free security assessment — WhatsApp-এ message করুন। আমরা আপনার setup review করে specific recommendations share করবো।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Setup+%26+Security+service"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-final-cta"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> Free Assessment
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
