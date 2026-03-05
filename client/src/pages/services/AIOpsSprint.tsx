import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Shield, Clock, Users, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const INCLUDED = [
  "1:1 AI implementation sprint — 3 sessions via WhatsApp/Zoom",
  "Workflow audit: কোথায় AI সবচেয়ে বেশি সময় বাঁচাবে",
  "Custom AI toolstack recommendation (tools + setup)",
  "3 ready-to-use prompt templates for your business",
  "30-day follow-up WhatsApp support",
];

const FAQS = [
  { q: "AI Ops Sprint কার জন্য?", a: "Freelancers, SME owners, agency founders যারা নিজের business-এ AI implement করতে চান কিন্তু কোথা থেকে শুরু করবেন জানেন না — তাদের জন্য।" },
  { q: "৩টি session কীভাবে হবে?", a: "Session গুলো WhatsApp video call বা Zoom-এ হবে। প্রতিটি session ৬০-৯০ মিনিটের। আপনার business workflow বুঝে specific AI solution বলা হবে।" },
  { q: "৩০ দিন follow-up support কী?", a: "Sprint শেষেও ৩০ দিন WhatsApp-এ যেকোনো প্রশ্ন করতে পারবেন। Tool setup, prompt tuning, যেকোনো সমস্যায় সাহায্য পাবেন।" },
  { q: "Refund policy কী?", a: "First session শুরুর আগে full refund পাওয়া যাবে। Session শুরু হলে refund নেই, তবে আমরা value deliver করতে প্রতিশ্রুতিবদ্ধ।" },
  { q: "কোন ধরনের business-এর জন্য?", a: "যেকোনো business — e-commerce, freelancing, agency, consultancy, content creation, digital marketing, real estate, education — সব জায়গায় AI implement করা সম্ভব।" },
  { q: "৩টি session কি একসাথে নিতে হবে?", a: "না। ৩টি session ৭২ ঘণ্টার মধ্যে schedule করতে হবে, কিন্তু একই দিনে নেওয়া বাধ্যতামূলক নয়।" },
];

export default function AIOpsSprint() {
  usePageMeta({
    title: "AI Ops Sprint — ৳9,900 | 1:1 AI Implementation | AI Team Premium BD",
    description: "1:1 AI implementation sprint for freelancers and business owners. 3 expert sessions. Workflow audit, custom AI toolstack, prompt templates. bKash/Nagad.",
  });

  return (
    <Layout>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Users size={13} /> 1:1 Implementation · 3 Sessions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            AI Ops Sprint — <span style={{ color: BRAND.blue }}>৳৯,৯০০</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            AI নিজের business-এ implement করুন — ৩টি expert session-এ।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Ops+Sprint+1%3A1+Implementation+%E2%98%859900"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-sprint"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Book via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Users size={16} color={BRAND.blue} />, text: "1:1 Expert Session" },
              { icon: <Clock size={16} color={BRAND.blue} />, text: "3 Sessions / 72h" },
              { icon: <Zap size={16} color={BRAND.blue} />, text: "30-Day Follow-up" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "Full Refund (before 1st)" },
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
            <div
              className="rounded-2xl p-8"
              style={{ background: BRAND.white, border: `2px solid ${BRAND.blue}`, boxShadow: "0 8px 32px rgba(37,99,235,0.12)" }}
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 mb-4" style={{ background: BRAND.sky, color: BRAND.blue, fontSize: "0.72rem", fontWeight: 700 }}>
                One-Time Investment
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>AI Ops Sprint</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "2.5rem", fontWeight: 800 }}>৳9,900</span>
                <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.9rem" }}>one-time</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Clock size={13} /> 3 sessions within 72 hours
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
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Ops+Sprint+1%3A1+Implementation+%E2%98%859900"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-sprint"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: BRAND.blue }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Book on WhatsApp
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>Full refund before first session.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: BRAND.navy }}>Best for</h3>
              <div className="space-y-3">
                {[
                  { emoji: "🧑‍💻", title: "Freelancers", desc: "যারা AI দিয়ে কাজ দ্রুত করতে চান এবং clients-দের কাছে AI-powered service দিতে চান।" },
                  { emoji: "🏢", title: "SME Owners", desc: "যারা business operations-এ AI automate করতে চান — customer service, marketing, content সব।" },
                  { emoji: "🏗️", title: "Agency Founders", desc: "যারা পুরো team-এর জন্য AI workflow design করতে চান।" },
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
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: BRAND.navy }}>সাধারণ প্রশ্ন (FAQ)</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
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
          <h2 className="text-3xl font-extrabold text-white mb-4">আজই শুরু করুন</h2>
          <p className="text-white/50 mb-8">WhatsApp-এ message করুন — ১ ঘণ্টার মধ্যে আপনার first session schedule হয়ে যাবে।</p>
          <a
            href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Ops+Sprint+1%3A1+Implementation+%E2%98%859900"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-final-cta"
            className="inline-flex items-center gap-3 rounded-full px-10 py-4 font-bold text-white text-lg"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon size={22} color="#fff" /> WhatsApp-এ Book করুন
          </a>
        </div>
      </section>
    </Layout>
  );
}
