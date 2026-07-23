import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { BRAND, LogoStacked, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { chatgptPlans } from "@/lib/plans";
import { SupportUpsell } from "@/components/SupportUpsell";
import { config } from "@/lib/config";
import { FAQSchema, JsonLd, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick, trackHeroClick } from "@/lib/analytics";
import {
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
  GraduationCap,
  Briefcase,
  Building2,
  Video,
} from "lucide-react";

const IMG_HERO = "/hero-bg.jpg";

const OFFERS = [
  { badge: "Solo", color: "#22C55E", tier: "Student / Freelancer", price: "৳499", period: "/mo", tool: "ChatGPT Plus Shared", delivery: "5-15 min", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+ChatGPT+Plus+Shared+(Solo)" },
  { badge: "Pro", color: "#2563EB", tier: "Coder / Designer / Researcher", price: "৳999", period: "/mo", tool: "ChatGPT Plus Premium Shared", delivery: "5-15 min", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+ChatGPT+Plus+Premium+Shared+(Pro)" },
  { badge: "Team", color: "#0F172A", tier: "Agency / Startup", price: "৳699", period: "/seat/mo", tool: "ChatGPT Business Shared", delivery: "5-15 min", whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+ChatGPT+Business+Shared" },
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
    title: "ChatGPT, Claude & AI Tools in Bangladesh",
    description: "Buy ChatGPT Plus from ৳499/mo. Claude Pro, Gemini Advanced & more. Pay via bKash/Nagad. 5-15 min delivery. Bangladesh's trusted AI subscription provider.",
    path: "/",
  });
  const homeFaqs = FAQS.map((f) => ({ q: f.q, a: f.a }));
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Team Premium — Premium AI Subscriptions in Bangladesh",
    "url": "https://aiteampremium.com/",
    "description":
      "AI Team Premium sells premium ChatGPT Plus, Pro, Team, Claude Pro, Gemini Advanced, Canva Pro, Grammarly Premium, Midjourney and other premium AI subscriptions in Bangladesh, payable via bKash and Nagad, with 5–15 minute delivery and a 30-day replacement warranty.",
    "inLanguage": ["en", "bn"],
    "isPartOf": { "@id": "https://aiteampremium.com/#website" },
  };
  const featuredPlans = [
    chatgptPlans.find(p => p.slug === 'plus-shared'),
    chatgptPlans.find(p => p.slug === 'plus-premium-shared'),
    chatgptPlans.find(p => p.slug === 'pro-premium-shared')
  ].filter(Boolean);

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }]} />
      <JsonLd data={collectionPageSchema} />
      <FAQSchema items={homeFaqs} />
      <section className="relative overflow-hidden" style={{ background: BRAND.navy }}>
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="AI Team Premium — Bangladesh's trusted AI subscription provider, offering ChatGPT Plus, Claude Pro, and Gemini Advanced payable via bKash and Nagad" className="w-full h-full object-cover" style={{ opacity: 0.15, mixBlendMode: "luminosity" }} loading="eager" fetchPriority="high" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BRAND.navy} 0%, rgba(15,23,42,0.6) 50%, ${BRAND.navy} 100%)` }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10">
              <LogoStacked size="xl" iconColor={BRAND.white} textColor={BRAND.white} />
            </div>
            <h1 style={{ color: BRAND.white, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              বাংলাদেশে ChatGPT — ৳৪৯৯ থেকে শুরু
              <br />
              <span style={{ color: BRAND.blue }}>Premium AI & Digital Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              ChatGPT Plus, Pro & Business at Bangladesh-friendly prices. Fast delivery. bKash & Nagad accepted.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <a
                href={config.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackHeroClick("whatsapp", "home-hero")}
                data-testid="button-hero-whatsapp"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
                style={{ background: "#25D366", color: BRAND.white, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
              >
                <WhatsAppIcon size={18} color="#fff" />
                Order on WhatsApp
              </a>
              <a
                href={config.messenger}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMessengerClick(undefined, "home-hero")}
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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
      </section>

      {/* DIRECT ANSWER BLOCK (GEO: answer-first, 40-60 words, statistics) */}
      <section className="relative -mt-8 z-10 mb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-2xl p-6 md:p-8 mb-4" style={{ background: BRAND.white, boxShadow: "0 8px 40px rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.06)" }}>
            <p style={{ color: BRAND.navy, fontSize: "1.02rem", lineHeight: 1.7, fontWeight: 500 }}>
              <strong>AI Team Premium (AITP)</strong> is a local access provider of premium AI subscriptions in Bangladesh — ChatGPT Plus from <strong>৳499/month</strong>, Claude Pro, Gemini Advanced, Canva Pro, Grammarly, Midjourney and more — payable in BDT via <strong>bKash and Nagad</strong>, with <strong>5–15 minute delivery</strong>, a <strong>30-day replacement warranty</strong>, and Bangla + English WhatsApp support, serving <strong>Bangladeshi users</strong> since 2024.
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

      {/* WHO IS THIS FOR — PERSONA SECTION */}
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Designed For</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>কাদের জন্য AITP?</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem", lineHeight: 1.65 }}>Whether you're a student, freelancer, business, or creator — we have the right AI tool for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Students", tagline: "৳499/mo থেকে শুরু", tools: "ChatGPT · Grammarly · Perplexity", desc: "Assignment writing, research summaries, IELTS prep, thesis — let AI do the heavy lifting while you focus on understanding.", color: "#16A34A", link: "/tools/chatgpt" },
              { icon: Briefcase, title: "Freelancers", tagline: "Fiverr & Upwork-এ এগিয়ে থাকুন", tools: "Claude Pro · Canva Pro · Midjourney", desc: "Faster proposals, better content, stunning visuals — outperform competitors on Fiverr and Upwork with AI-powered work.", color: BRAND.blue, link: "/ai-subscriptions" },
              { icon: Building2, title: "Businesses", tagline: "Team-wide AI দক্ষতা", tools: "ChatGPT Team · Copilot · Gemini", desc: "Equip your entire team with AI tools. Boost productivity, automate reports, and get live Bangla AI training for your staff.", color: "#7C3AED", link: "/chatgpt-plans" },
              { icon: Video, title: "Content Creators", tagline: "ভাইরাল কন্টেন্ট বানান", tools: "Midjourney · ElevenLabs · Canva", desc: "AI-generated images, voice-overs in Bangla, thumbnail design — create professional content without a studio or equipment.", color: "#F59E0B", link: "/tools/midjourney" },
            ].map((p) => (
              <Link key={p.title} href={p.link} style={{ textDecoration: "none" }} data-testid={`card-persona-${p.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="rounded-2xl p-7 h-full flex flex-col hover-elevate transition-all cursor-pointer" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <div className="inline-flex items-center justify-center rounded-xl mb-5" style={{ width: 52, height: 52, background: `${p.color}18` }}>
                    <p.icon size={24} color={p.color} strokeWidth={1.8} />
                  </div>
                  <p style={{ color: p.color, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.tagline}</p>
                  <h3 className="mt-1 mb-3" style={{ color: BRAND.navy, fontSize: "1.1rem", fontWeight: 700 }}>{p.title}</h3>
                  <p className="mb-4 flex-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem", lineHeight: 1.65 }}>{p.desc}</p>
                  <p style={{ color: p.color, fontSize: "0.72rem", fontWeight: 600 }}>{p.tools}</p>
                </div>
              </Link>
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
                      onClick={() => trackWhatsAppClick(o.title, undefined, o.priceLabel, "home-offer")}
                      data-testid={`button-offer-${o.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 transition-all"
                      style={{ background: "#25D366", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <WhatsAppIcon size={13} color="#fff" /> Order on WhatsApp
                    </a>
                    <a
                      href={config.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMessengerClick(o.title, "home-offer")}
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

      {/* HOW TO ORDER — 3 STEPS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>How It Works</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>৩ ধাপে AI Subscription নিন</h2>
            <p className="mt-4 max-w-md mx-auto" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem", lineHeight: 1.65 }}>No credit card setup, no registration. Just WhatsApp → Pay → Get access.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { step: "01", icon: MessageCircle, color: "#25D366", title: "Message on WhatsApp", desc: "Tell us which AI tool you want. We confirm price and payment details within 5 minutes — in Bangla or English." },
              { step: "02", icon: CreditCard, color: BRAND.blue, title: "Pay via bKash or Nagad", desc: "We share the bKash/Nagad number privately. Pay in BDT. No international card, no hidden fees, no registration." },
              { step: "03", icon: Zap, color: "#F59E0B", title: "Get Access Instantly", desc: "Shared plans delivered in 5–15 minutes. Personal plans in 2–4 hours. Your AI tool is ready — we guide setup." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl mb-5 flex items-center justify-center" style={{ background: `${s.color}15`, border: `2px solid ${s.color}30` }}>
                  <s.icon size={32} color={s.color} strokeWidth={1.8} />
                </div>
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full mb-4" style={{ background: s.color }}>
                  <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 800 }}>{s.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: BRAND.navy }}>{s.title}</h3>
                <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.85rem", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "home-how-to-order")}
              data-testid="button-how-to-order-cta"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 transition-all font-bold text-white"
              style={{ background: "#25D366", fontSize: "1rem" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

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
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Why AITP</p>
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

      {/* STATS STRIP */}
      <section className="py-12" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "18+", label: "Premium AI Tools" },
              { value: "৳499", label: "Starting Price / mo" },
              { value: "5–15 min", label: "Avg. Delivery Time" },
              { value: "30 days", label: "Replacement Warranty" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ color: BRAND.white, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{stat.value}</p>
                <p className="mt-2" style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.78rem", fontWeight: 500 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Customer Reviews</p>
            <h2 style={{ color: BRAND.white, fontSize: "2rem", fontWeight: 700, lineHeight: 1.15 }}>Trusted by BD Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                review: "ChatGPT Plus access in 8 minutes! bKash payment was super smooth. I was worried at first but the delivery was faster than expected. Now I use it daily for my freelance work.",
                name: "Farhan Ahmed",
                role: "Freelance Graphic Designer, Dhaka",
              },
              {
                review: "The AI Tools Vault bundle is perfect — ChatGPT, Claude and Gemini all in one subscription. One WhatsApp order and all three were ready within 6 hours. The support on WhatsApp is also very responsive.",
                name: "Tasnia Rahman",
                role: "Content Manager, Chittagong",
              },
              {
                review: "I've been using AITP for 6 months for GitHub Copilot and Claude Pro. The 30-day replacement guarantee is real — they replaced my slot once within an hour when there was an issue. Highly reliable.",
                name: "Mehedi Hossain",
                role: "Software Developer, Rajshahi",
              },
            ].map(({ review, name, role }) => (
              <div key={name} className="rounded-2xl p-8 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill={BRAND.blue} color={BRAND.blue} />
                  ))}
                </div>
                <p className="flex-1 mb-6" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.75 }}>
                  "{review}"
                </p>
                <div>
                  <p style={{ color: BRAND.white, fontSize: "0.84rem", fontWeight: 700 }}>{name}</p>
                  <p className="mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.76rem" }}>{role}</p>
                </div>
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
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "home-bottom-cta")}
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
              onClick={() => trackMessengerClick(undefined, "home-bottom-cta")}
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