import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Users, BookOpen, GraduationCap, Video, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";

const INCLUDED = [
  "Custom training curriculum based on your team's needs",
  "Hands-on workshops — live sessions via Zoom/Meet",
  "Per-tool deep dives (ChatGPT, Claude, Gemini, etc.)",
  "Prompt engineering training for your industry",
  "Practical exercises with real team tasks",
  "Training materials and quick-reference guides",
  "Post-training Q&A support (30 days)",
];

const FAQS = [
  { q: "AI Training কার জন্য?", a: "Team, department বা পুরো company — যারা employees-কে AI tools effectively use করতে শেখাতে চান। Freelancers, SMEs, agencies, corporate teams — সবাই eligible। Training curriculum আপনার industry এবং use case-র জন্য customized।" },
  { q: "Training কিভাবে হয়?", a: "Live online sessions via Zoom বা Google Meet — with screen sharing, hands-on exercises, এবং real-time Q&A। আমরা theory না, practical use case শেখাই। আপনার team-এর real tasks use করে exercise design করি।" },
  { q: "কোন tools cover করবেন?", a: "ChatGPT, Claude, Gemini, Perplexity, Midjourney, Canva, GitHub Copilot — আপনার team-এর need অনুযায়ী। Per-tool deep dive বা multi-tool overview — দুই ধরনের training available।" },
  { q: "কতটি session এবং কতদিন?", a: "Standard program: 4-6 sessions over 2-3 weeks, per session 60-90 minutes। Custom program: আপনার requirement অনুযায়ী design করি। আমরা recommendation দেই discovery call-এ।" },
  { q: "Pricing কী?", a: "Team size, session count এবং customization level-র উপর নির্ভর করে। Standard program starts from ৳15,000 for up to 10 participants। Free consultation-এ exact quote দেই।" },
  { q: "Training-এর পর support থাকবে?", a: "হ্যাঁ। Training শেষে 30-day WhatsApp support — team members প্রশ্ন করতে পারবে, prompt review করতে পারবে। Plus, আমরা recorded sessions share করি future reference-এর জন্য।" },
];

export default function AiTraining() {
  usePageMeta({
    title: "AI Training & Workshops — Team Enablement in Bangladesh | AI Team Premium",
    description: "Custom AI training for teams in Bangladesh. Hands-on workshops on ChatGPT, Claude, Gemini, Midjourney, and more. Live sessions, practical exercises, 30-day support. From ৳15,000.",
    path: "/services/ai-training",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Support & Services", path: "/services" },
        { name: "AI Training & Workshops", path: "/services/ai-training" },
      ]} />
      <FAQSchema items={FAQS} />
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>AI Training & Workshops</strong> is a team enablement service from AI Team Premium in Bangladesh. We deliver custom, hands-on training sessions for your team on ChatGPT, Claude, Gemini, Midjourney, Canva, GitHub Copilot, and other AI tools. Curriculum is built around your actual workflows. Standard program from <strong>৳15,000</strong> for up to 10 participants. Pay via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <GraduationCap size={13} /> Team Enablement
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            AI Training — <span style={{ color: BRAND.blue }}>Make Your Team AI-Ready</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            আপনার team-কে ChatGPT, Claude, Gemini এবং আরও AI tools-এ দক্ষ করে তুলুন। Hands-on workshops, real tasks, practical skills।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Training+for+my+team"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-training"
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
              { icon: <GraduationCap size={16} color={BRAND.blue} />, text: "Custom Curriculum" },
              { icon: <Video size={16} color={BRAND.blue} />, text: "Live Sessions" },
              { icon: <BookOpen size={16} color={BRAND.blue} />, text: "Training Materials" },
              { icon: <Users size={16} color={BRAND.blue} />, text: "30-Day Support" },
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
                From ৳15,000
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>Team AI Training</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "2.5rem", fontWeight: 800 }}>Starts ৳15,000</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Users size={13} /> Up to 10 participants
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
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Training+for+my+team"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-order-training"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Free Consultation
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>Custom quote after discovery call.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Best for</h3>
              <div className="space-y-3">
                {[
                  { emoji: "🏢", title: "Companies & Agencies", desc: "যারা 5-50 employee team-কে AI tools-এ train করতে চান — productivity boost, better output, competitive advantage।" },
                  { emoji: "🏫", title: "Educational Institutions", desc: "Teachers এবং students-দের জন্য AI literacy program — research, writing, presentation skills।" },
                  { emoji: "💼", title: "Professional Teams", desc: "Marketing, sales, HR, customer support — department-specific AI training with real use cases।" },
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
          <h2 className="text-3xl font-extrabold text-white mb-4">আপনার Team-কে AI-Ready করুন</h2>
          <p className="text-white/50 mb-8">Free consultation — WhatsApp-এ message করুন। আপনার team size এবং goals বুঝে আমরা custom training plan share করবো।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+AI+Training+for+my+team"
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
