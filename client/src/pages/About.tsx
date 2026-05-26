import { Layout } from "@/components/layout/Layout";
import { BRAND, LogoStacked, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { Users, Shield, Lightbulb, ArrowUpRight, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, JsonLd, FAQSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

const ABOUT_FAQS = [
  { q: "What is AI Team Premium BD (AITPBD)?", a: "AI Team Premium BD (AITPBD), founded in 2024 and based in Dhaka, Bangladesh, is the country's trusted local access provider of premium AI subscriptions including ChatGPT Plus, Claude Pro, Gemini Advanced, Grammarly Premium, Canva Pro, and more — all payable in BDT via bKash, Nagad, Rocket or Bank Transfer." },
  { q: "How long has AI Team Premium BD been in business?", a: "AI Team Premium BD was founded in 2024 and has since served a growing community of users across Bangladesh, with a strong track record of fast delivery and reliable 30-day replacement guarantees." },
  { q: "Is AI Team Premium BD a legitimate seller of AI subscriptions?", a: "Yes. AI Team Premium BD sells 100% genuine AI subscriptions — not cracked, not fake. Every subscription includes a 30-day replacement warranty, 24-hour SLA, and Bangla-language customer support via WhatsApp at +880 1533-262758." },
  { q: "Where is AI Team Premium BD located?", a: "AI Team Premium BD is based in Dhaka, Bangladesh, and serves customers across the entire country. Contact us via WhatsApp at +880 1533-262758 or through our Facebook page." },
];

const VALUES = [
  { icon: Shield, title: "Trust & Transparency", desc: "We deliver exactly what we promise. No hidden fees, no fake accounts. 100% genuine subscriptions sourced through legitimate means." },
  { icon: Users, title: "Local First", desc: "Built for Bangladesh. We understand local payment challenges and provide tailored solutions." },
  { icon: Lightbulb, title: "Cutting-Edge", desc: "We stay ahead of AI trends so our clients can focus on what matters — their work." },
];

export default function About() {
  usePageMeta({
    title: "About AI Team Premium BD — AI Subscriptions in Bangladesh",
    description: "AI Team Premium BD (AITPBD), founded in 2024, provides genuine AI subscriptions in Bangladesh — ChatGPT, Claude, Gemini, Midjourney, SuperGrok & more — payable in BDT via bKash and Nagad.",
    path: "/about",
  });
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://aiteampremiumbd.com/about",
    "name": "About AI Team Premium BD",
    "description": "AI Team Premium BD (AITPBD), founded in 2024 in Dhaka, Bangladesh, is the country's trusted local access provider of premium AI subscriptions — ChatGPT, Claude, Gemini and more — payable in BDT via bKash and Nagad.",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "AI Team Premium BD",
      "alternateName": "AITPBD",
      "foundingDate": "2024",
      "url": "https://aiteampremiumbd.com",
      "telephone": "+8801533262758",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "09:00",
          "closes": "23:00",
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Bangladesh",
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61586742067282",
        "https://www.instagram.com/ai_team_premium_bd/",
      ],
    },
  };

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <JsonLd data={aboutPageSchema} />
      <FAQSchema items={ABOUT_FAQS} />
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
            {/* DIRECT ANSWER BLOCK (GEO) */}
            <div className="rounded-2xl p-6 md:p-7" style={{ background: BRAND.sky, opacity: 1 }}>
              <p style={{ color: BRAND.navy, opacity: 1, fontSize: "1rem", lineHeight: 1.7, fontWeight: 500 }}>
                <strong>AI Team Premium BD (AITPBD)</strong>, founded in <strong>2024</strong> and based in <strong>Dhaka, Bangladesh</strong>, is the country's trusted local access provider of premium AI subscriptions. We sell <strong>a wide range of AI tools</strong> — ChatGPT, Claude, Gemini, Midjourney, SuperGrok, Google AI Pro, Leonardo, Runway, Kling and more — all payable in BDT via bKash, Nagad, Rocket or Bank Transfer. We deliver in 5–15 minutes and guarantee replacement within 24 hours.
              </p>
            </div>

            <div>
              <h2 className="mb-4" style={{ color: BRAND.navy, opacity: 1, fontSize: "1.4rem", fontWeight: 700 }}>Who We Are</h2>
              <p>
                AI Team Premium BD (AITPBD) started in 2024 with a simple mission: to bridge the gap between global AI technology and the Bangladeshi market. We noticed that many talented professionals, students, and businesses in Bangladesh were struggling to access premium global AI tools due to international payment restrictions — over 95% of Bangladeshi users do not hold an international credit card capable of recurring USD billing.
              </p>
              <p className="mt-4">
                We solve this by acting as your trusted local partner. We provide genuine access to tools like <strong>ChatGPT Plus, ChatGPT Pro, ChatGPT Team, Claude Pro, Gemini Advanced, Google AI Pro, SuperGrok, Midjourney, Leonardo AI, Runway ML, Kling AI, Canva Pro, Grammarly Premium, Perplexity Pro, ElevenLabs and GitHub Copilot</strong> — allowing you to pay in BDT via accessible methods like bKash and Nagad.
              </p>
            </div>

            <div>
              <h2 className="mb-4" style={{ color: BRAND.navy, opacity: 1, fontSize: "1.4rem", fontWeight: 700 }}>By the Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
                {[
                  { n: "18+", l: "AI tools available" },
                  { n: "৳399", l: "Starting price/mo" },
                  { n: "5–15 min", l: "Median delivery" },
                  { n: "24 h", l: "Replacement SLA" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl p-5 text-center" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
                    <p style={{ color: BRAND.blue, fontSize: "1.3rem", fontWeight: 700, opacity: 1 }}>{s.n}</p>
                    <p className="mt-1" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.78rem" }}>{s.l}</p>
                  </div>
                ))}
              </div>
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
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "about-bottom-cta")}
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
              onClick={() => trackMessengerClick(undefined, "about-bottom-cta")}
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