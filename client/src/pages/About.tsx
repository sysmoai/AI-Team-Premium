import { Layout } from "@/components/layout/Layout";
import { BRAND, LogoStacked, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { Users, Shield, Lightbulb, ArrowUpRight, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";

const VALUES = [
  { icon: Shield, title: "Trust & Transparency", desc: "We deliver exactly what we promise. No hidden fees, no fake accounts. 100% genuine official subscriptions." },
  { icon: Users, title: "Local First", desc: "Built for Bangladesh. We understand local payment challenges and provide tailored solutions." },
  { icon: Lightbulb, title: "Cutting-Edge", desc: "We stay ahead of AI trends so our clients can focus on what matters — their work." },
];

export default function About() {
  usePageMeta({
    title: "About Us",
    description: "Learn about AI Team Premium BD — Bangladesh's trusted provider of premium AI subscriptions and digital services.",
  });
  return (
    <Layout>
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>About Us</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15 }}>
            About AI Team Premium BD
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="flex justify-center mb-12">
            <LogoStacked size="lg" iconColor={BRAND.blue} textColor={BRAND.navy} />
          </div>

          <div className="space-y-8" style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.95rem", lineHeight: 1.8 }}>
            <div>
              <h2 className="mb-4" style={{ color: BRAND.navy, opacity: 1, fontSize: "1.4rem", fontWeight: 700 }}>Who We Are</h2>
              <p>
                AI Team Premium BD (AITPBD) started with a simple mission: to bridge the gap between global AI technology and the Bangladeshi market. We noticed that many talented professionals, students, and businesses in Bangladesh were struggling to access premium global AI tools due to international payment restrictions.
              </p>
              <p className="mt-4">
                We solve this by acting as your trusted local partner. We provide genuine, official access to tools like ChatGPT Plus, Claude Pro, Gemini Advanced, and more — allowing you to pay in BDT via accessible methods like bKash and Nagad.
              </p>
            </div>

            <div>
              <h2 className="mb-4" style={{ color: BRAND.navy, opacity: 1, fontSize: "1.4rem", fontWeight: 700 }}>More Than Just Tools</h2>
              <p>
                As our client base grew, so did their needs. Today, AITPBD is a full-fledged digital agency. Our team of expert designers, developers, and marketers help brands build their digital identity from the ground up. Whether you need a stunning new logo, a high-performance web application, or an AI-driven marketing campaign, we have the expertise to deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <h2 style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl p-8" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                <div className="inline-flex items-center justify-center rounded-xl mb-5" style={{ width: 48, height: 48, background: BRAND.sky }}>
                  <v.icon size={22} color={BRAND.blue} strokeWidth={2} />
                </div>
                <h3 className="mb-3" style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 600 }}>{v.title}</h3>
                <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.85rem", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: BRAND.navy }} className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <h2 style={{ color: BRAND.white, fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.2 }}>
            Join our growing community
          </h2>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Ready to take your digital capabilities to the next level?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-about-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: "#25D366", color: "#fff", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}
            >
              <WhatsAppIcon size={16} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-about-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: "#0084FF", color: "#fff", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}
            >
              <MessageCircle size={16} color="#fff" /> Messenger
            </a>
            <Link
              href="/start-a-project"
              data-testid="link-about-contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: BRAND.white, fontSize: "0.88rem", fontWeight: 500, textDecoration: "none" }}
            >
              Contact <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}