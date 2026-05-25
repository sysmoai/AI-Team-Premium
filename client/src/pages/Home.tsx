import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { BRAND, LogoStacked, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { chatgptPlans } from "@/lib/plans";
import { SupportUpsell } from "@/components/SupportUpsell";
import { config } from "@/lib/config";
import { FAQSchema, JsonLd } from "@/components/seo/JsonLd";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Brain,
  Code,
  Paintbrush,
  LineChart,
  Smartphone,
  MessageSquare,
  MessageCircle,
  Star,
  Shield,
  Zap,
  Clock,
  CreditCard,
  Headphones,
  RefreshCw,
} from "lucide-react";

const IMG_HERO =
  "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

const OFFERS = [
  { badge: "Solo", color: "#22C55E", tier: "Student / Freelancer", price: "৳399", period: "/mo", tool: "ChatGPT Plus Shared", delivery: "5-15 min", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+ChatGPT+Plus+Shared+(Solo)" },
  { badge: "Pro", color: "#2563EB", tier: "Coder / Designer / Researcher", price: "৳950", period: "/mo", tool: "ChatGPT Premium Shared", delivery: "5-15 min", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+ChatGPT+Premium+Shared+(Pro)" },
  { badge: "Team", color: "#0F172A", tier: "Agency / Startup", price: "৳699", period: "/seat/mo", tool: "ChatGPT Team Shared", delivery: "5-15 min", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+ChatGPT+Team+Shared" },
  { badge: "AI Tools Vault", color: "#F59E0B", tier: "All-in-One Bundle", price: "৳1,990", period: "/mo", tool: "ChatGPT Plus + Claude Pro + Gemini Advanced", delivery: "6 hr", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+AI+Tools+Vault" },
];

const SERVICES = [
  { icon: Brain, title: "AI Subscriptions", desc: "ChatGPT, Claude, Gemini, Perplexity, Grok, Canva, Grammarly, Midjourney" },
  { icon: Paintbrush, title: "Brand Design", desc: "Logo, identity, brand guidelines, creative direction" },
  { icon: Code, title: "Web Development", desc: "Modern, fast, SEO-optimized websites" },
  { icon: LineChart, title: "Digital Marketing", desc: "Growth strategy, content, campaign execution" },
  { icon: Smartphone, title: "App Development", desc: "Mobile-first apps and product builds" },
  { icon: MessageSquare, title: "AI Consultancy", desc: "1:1 sessions, team workshops" },
];

const DIFFERENTIATORS = [
  { icon: CreditCard, title: "No extra VAT at checkout", desc: "VAT-inclusive pricing" },
  { icon: Shield, title: "bKash / Nagad / Bank Transfer", desc: "No international card needed" },
  { icon: Clock, title: "5-15 min delivery", desc: "For shared seats" },
  { icon: Headphones, title: "Bangla + English support", desc: "WhatsApp support" },
  { icon: RefreshCw, title: "Replacement guarantee", desc: "Within 24h SLA" },
  { icon: Zap, title: "Free AI consultation", desc: "Which tool is right for you?" },
];

const FAQS = [
  { q: "কতক্ষণে পাবো?", a: "Shared seat: 5-15 মিনিট। Personal seat: 2-4 ঘণ্টা।" },
  { q: "কীভাবে পে করবো?", a: "bKash, Nagad, বা Bank Transfer। কোনো international card লাগবে না।" },
  { q: "ব্যান হওয়ার ভয় নেই?", a: "আমাদের device rules মানলে কোনো সমস্যা নেই। Rules দেওয়া হয় delivery-তে।" },
];

export default function Home() {
  usePageMeta({
    title: "AI Team Premium BD — ChatGPT, Claude & AI Tools in Bangladesh",
    description: "Buy ChatGPT Plus from ৳399/mo. Claude Pro, Gemini Advanced & more. Pay via bKash/Nagad. 5-15 min delivery. Bangladesh's #1 AI subscription provider.",
    path: "/",
  });
  const homeFaqs = FAQS.map((f) => ({ q: f.q, a: f.a }));
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Team Premium BD — Premium AI Subscriptions in Bangladesh",
    "url": "https://aiteampremiumbd.com/",
    "description":
      "AI Team Premium BD sells official ChatGPT Plus, Pro, Business, Claude Pro, Gemini Advanced, Canva Pro, Grammarly Premium, Midjourney and other premium AI subscriptions in Bangladesh, payable via bKash and Nagad, with 5–15 minute delivery and a 30-day replacement warranty.",
    "inLanguage": ["en", "bn"],
    "isPartOf": { "@id": "https://aiteampremiumbd.com/#website" },
  };
  const featuredPlans = [
    chatgptPlans.find(p => p.slug === 'plus-shared'),
    chatgptPlans.find(p => p.slug === 'plus-premium-shared'),
    chatgptPlans.find(p => p.slug === 'pro-premium-shared')
  ].filter(Boolean);

  return (
    <Layout>
      <JsonLd data={collectionPageSchema} />
      <FAQSchema items={homeFaqs} />
      <section className="relative overflow-hidden" style={{ background: BRAND.navy }}>
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="" className="w-full h-full object-cover" style={{ opacity: 0.15, mixBlendMode: "luminosity" }} loading="eager" fetchpriority="high" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BRAND.navy} 0%, rgba(15,23,42,0.6) 50%, ${BRAND.navy} 100%)` }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10">
              <LogoStacked size="xl" iconColor={BRAND.white} textColor={BRAND.white} />
            </div>
            <h1 style={{ color: BRAND.white, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              বাংলাদেশে ChatGPT — ৳৩৯৯ থেকে শুরু
              <br />
              <span style={{ color: BRAND.blue }}>Premium AI & Digital Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              ChatGPT Plus, Pro & Business at Bangladesh-friendly prices. Instant delivery. bKash & Nagad accepted.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <a
                href={config.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-hero-whatsapp"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
                style={{ background: "#25D366", color: BRAND.white, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
              >
                <WhatsAppIcon size={18} color="#fff" />
                WhatsApp
              </a>
              <a
                href={config.messenger}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-hero-messenger"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
                style={{ background: "#0084FF", color: BRAND.white, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
              >
                <MessageCircle size={18} color="#fff" />
                Messenger
              </a>
              <Link
                href="/chatgpt-plans"
                data-testid="link-hero-chatgpt-plans"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
                style={{ background: BRAND.blue, color: BRAND.white, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
              >
                ChatGPT Plans
              </Link>
              <Link
                href="/ai-subscriptions"
                data-testid="link-hero-subscriptions"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: BRAND.white, fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}
              >
                View All Tools
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: `linear-gradient(to top, ${BRAND.white}, transparent)` }} />
      </section>

      {/* DIRECT ANSWER BLOCK (GEO: answer-first, 40-60 words, statistics) */}
      <section className="relative -mt-8 z-10 mb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-2xl p-6 md:p-8 mb-4" style={{ background: BRAND.white, boxShadow: "0 8px 40px rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.06)" }}>
            <p style={{ color: BRAND.navy, fontSize: "1.02rem", lineHeight: 1.7, fontWeight: 500 }}>
              <strong>AI Team Premium BD (AITPBD)</strong> is Bangladesh's leading provider of official premium AI subscriptions — ChatGPT Plus from <strong>৳399/month</strong>, Claude Pro, Gemini Advanced, Canva Pro, Grammarly, Midjourney and more — payable in BDT via <strong>bKash and Nagad</strong>, with <strong>5–15 minute delivery</strong>, a <strong>30-day replacement warranty</strong>, and Bangla + English WhatsApp support, serving over <strong>10,000+ Bangladeshi users</strong> since 2024.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-2xl p-6 md:p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 text-center" style={{ background: BRAND.white, boxShadow: "0 8px 40px rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.06)" }}>
            {["5-15 min delivery", "bKash/Nagad accepted", "No extra VAT", "WhatsApp support", "Replacement guarantee"].map((t) => (
              <div key={t} className="flex flex-col items-center gap-1.5">
                <Check size={16} color={BRAND.blue} strokeWidth={3} />
                <p style={{ color: BRAND.navy, fontSize: "0.75rem", fontWeight: 500, opacity: 0.7 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Featured Offers</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>Start with the Right Plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPlans.map((o) => {
              if (!o) return null;
              return (
                <div key={o.slug} className="rounded-2xl p-6 flex flex-col hover-elevate transition-all" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-white mb-4" style={{ background: o.color === 'blue' ? BRAND.blue : o.color === 'purple' ? '#9333ea' : BRAND.navy, fontSize: "0.7rem", fontWeight: 600 }}>{o.badge}</span>
                  <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", fontWeight: 500 }}>{o.targetBuyer}</p>
                  <p className="mt-2" style={{ color: BRAND.navy, fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>
                    {o.priceLabel.split('/')[0]}<span style={{ fontSize: "0.85rem", fontWeight: 400, opacity: 0.5 }}>/{o.priceLabel.split('/')[1]}</span>
                  </p>
                  <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem", lineHeight: 1.5 }}>{o.title}</p>
                  <p className="mt-1 flex items-center gap-1.5" style={{ color: BRAND.blue, fontSize: "0.75rem", fontWeight: 500 }}>
                    <Clock size={12} /> {o.deliverySLA} delivery
                  </p>
                  <div className="mt-auto pt-5 flex gap-2">
                    <a
                      href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(o.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-offer-${o.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 transition-all"
                      style={{ background: "#25D366", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <WhatsAppIcon size={13} color="#fff" /> WhatsApp
                    </a>
                    <a
                      href={config.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-offer-msg-${o.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 transition-all"
                      style={{ background: "#0084FF", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <MessageCircle size={13} color="#fff" /> Messenger
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/chatgpt-plans" className="inline-flex items-center gap-1 font-semibold hover:underline" style={{ color: BRAND.blue }}>
              View All ChatGPT Plans <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SupportUpsell />

      <section style={{ background: BRAND.sky }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>What We Do</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>Complete Digital Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="group rounded-2xl p-8 transition-all" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                <div className="inline-flex items-center justify-center rounded-xl mb-5" style={{ width: 48, height: 48, background: BRAND.sky }}>
                  <svc.icon size={22} color={BRAND.blue} strokeWidth={2} />
                </div>
                <h3 className="mb-3" style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.3 }}>{svc.title}</h3>
                <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.85rem", lineHeight: 1.65 }}>{svc.desc}</p>
                <Link
                  href={svc.title === "AI Subscriptions" ? "/pricing" : svc.title === "AI Consultancy" ? "/support" : `/services/${svc.title.toLowerCase().replace(/\s+/g, '-')}`}
                  data-testid={`link-service-${svc.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-5 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: BRAND.blue, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
                >
                  Learn more <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Why AITPBD</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>Bangladesh's Trusted AI Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="flex items-start gap-4 rounded-2xl p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: BRAND.sky }}>
                  <d.icon size={18} color={BRAND.blue} strokeWidth={2} />
                </span>
                <div>
                  <h3 style={{ color: BRAND.navy, fontSize: "0.92rem", fontWeight: 600 }}>{d.title}</h3>
                  <p className="mt-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem" }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Customer Reviews</p>
            <h2 style={{ color: BRAND.white, fontSize: "2rem", fontWeight: 700, lineHeight: 1.15 }}>Trusted by BD Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill={BRAND.blue} color={BRAND.blue} />
                  ))}
                </div>
                <p className="mb-6" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {i === 1 && "Excellent service! Got my ChatGPT Plus access within 10 minutes. bKash payment was super easy. Highly recommended for anyone in Bangladesh."}
                  {i === 2 && "The AI Tools Vault bundle saved me a lot of money compared to buying individually. Great support team, responds quickly on WhatsApp."}
                  {i === 3 && "Professional service with fast delivery. The replacement guarantee gives me peace of mind. Will continue using AITPBD for all my AI subscriptions."}
                </p>
                <p style={{ color: BRAND.white, fontSize: "0.82rem", fontWeight: 600 }}>Verified AITPBD Customer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>FAQ</p>
            <h2 style={{ color: BRAND.navy, fontSize: "1.8rem", fontWeight: 700 }}>সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                <h3 style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 600 }}>{faq.q}</h3>
                <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.88rem", lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-24 text-center">
          <h2 style={{ color: BRAND.white, fontSize: "clamp(1.5rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15 }}>
            Ready to start? Message us now
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Get your premium AI subscription delivered in minutes, or start a digital project with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-bottom-cta-whatsapp"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 transition-all"
              style={{ background: "#25D366", color: "#fff", fontSize: "1.05rem", fontWeight: 600, textDecoration: "none" }}
            >
              <WhatsAppIcon size={20} color="#fff" />
              WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-bottom-cta-messenger"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 transition-all"
              style={{ background: "#0084FF", color: "#fff", fontSize: "1.05rem", fontWeight: 600, textDecoration: "none" }}
            >
              <MessageCircle size={20} color="#fff" />
              Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}