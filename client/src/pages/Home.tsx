import { Link } from "wouter";
import { readableOn, bestTextOn } from "@/lib/contrast";
import { Layout } from "@/components/layout/Layout";
import { BRAND, LogoStacked, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { chatgptPlans } from "@/lib/plans";
import { bnDigits } from "@/lib/bangla-numerals";
import { SupportUpsell } from "@/components/SupportUpsell";
import { config } from "@/lib/config";
import { FAQSchema, JsonLd, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { BLOG_POSTS } from "@/data/blog-posts";
import { useReveal } from "@/hooks/use-reveal";
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


const SERVICES = [
  { icon: Brain, title: "AI Subscriptions", desc: "ChatGPT, Claude, Gemini, Perplexity, Grok, Canva, Grammarly, Midjourney" },
  { icon: Paintbrush, title: "Brand Design", desc: "Logo, identity, brand guidelines, creative direction" },
  { icon: Code, title: "Web Development", desc: "Modern, fast, SEO-optimized websites" },
  { icon: LineChart, title: "Digital Marketing", desc: "Growth strategy, content, campaign execution" },
  { icon: Smartphone, title: "App Development", desc: "Mobile-first apps and product builds" },
  { icon: MessageSquare, title: "AI Consultancy", desc: "1:1 sessions, team workshops" },
];

const DIFFERENTIATORS = [
  { icon: CreditCard, title: "Local payment coordination", desc: "Current BDT payment instructions are confirmed before payment" },
  { icon: Clock, title: "Fulfillment timing", desc: "Confirmed for the specific offer before payment" },
  { icon: Headphones, title: "WhatsApp support", desc: "Bangla + English support channel" },
  { icon: RefreshCw, title: "Support & recovery terms", desc: "Confirmed for the specific order before payment" },
];

const FAQS = [
  { q: "কীভাবে অর্ডার করব?", a: "WhatsApp-এ যে AI tool বা service দরকার সেটি জানান। Payment-এর আগে আমরা current price, access model, availability, fulfillment timing এবং applicable support terms confirm করি।" },
  { q: "bKash/Nagad-এ payment করা যায়?", a: "Current BDT payment instructions order-এর জন্য WhatsApp-এ confirm করা হয়। Payment confirmation পাওয়ার আগে কোনো public account-এ টাকা পাঠাবেন না।" },
  { q: "Shared বা personal access কোনটা পাব?", a: "Access model product ও provider policy অনুযায়ী ভিন্ন হতে পারে। Specific offer-এর approved access model payment-এর আগে confirm করা হয়।" },
  { q: "Delivery কত সময় লাগে?", a: "Availability ও fulfillment timing offer অনুযায়ী পরিবর্তিত হয়। আমরা fixed public delivery SLA publish করি না; current timing payment-এর আগে confirm করা হয়।" },
  { q: "Access issue হলে কী হবে?", a: "WhatsApp support-এ order details দিন। Recovery, replacement, refund বা service-credit eligibility সেই order-এর confirmed terms এবং applicable law অনুযায়ী assess করা হয়।" },
  { q: "Training বা setup help আছে?", a: "প্রয়োজন অনুযায়ী setup বা training scope আলাদাভাবে confirm করা যায়।" },
];

const POPULAR_TOOLS = [
  { name: "ChatGPT", desc: "সবচেয়ে জনপ্রিয় AI চ্যাট", href: "/tools/chatgpt-plus-bangladesh", emoji: "💬" },
  { name: "Claude Pro", desc: "লম্বা ডকুমেন্ট ও কোডিং", href: "/tools/claude-pro-bangladesh", emoji: "🧠" },
  { name: "Gemini Advanced", desc: "Google Workspace-এর সাথে", href: "/tools/gemini-advanced-bangladesh", emoji: "✨" },
  { name: "Google AI Pro", desc: "Gemini + NotebookLM + 2TB", href: "/tools/google-ai-pro", emoji: "🔷" },
  { name: "SuperGrok", desc: "লাইভ X ডেটা + ছবি", href: "/tools/supergrok-bangladesh", emoji: "⚡" },
  { name: "Perplexity Pro", desc: "সোর্সসহ AI সার্চ", href: "/tools/perplexity-pro-bangladesh", emoji: "🔍" },
  { name: "Midjourney", desc: "সেরা মানের AI ছবি", href: "/tools/midjourney-bangladesh", emoji: "🎨" },
  { name: "Leonardo AI", desc: "২০+ মডেল, সাশ্রয়ী", href: "/tools/leonardo-ai-bangladesh", emoji: "🖼️" },
  { name: "Runway ML", desc: "প্রফেশনাল AI ভিডিও", href: "/tools/runway-bangladesh", emoji: "🎬" },
  { name: "Kling AI", desc: "৫ মিনিটের ভিডিও", href: "/tools/kling-ai-bangladesh", emoji: "📹" },
  { name: "Canva Pro", desc: "ডিজাইন + Magic Studio", href: "/tools/canva-pro-bangladesh", emoji: "🖌️" },
  { name: "Grammarly", desc: "ইংরেজি লেখা নিখুঁত করুন", href: "/tools/grammarly-premium-bangladesh", emoji: "✍️" },
  { name: "ElevenLabs", desc: "বাংলা ভয়েস ও ডাবিং", href: "/tools/elevenlabs-bangladesh", emoji: "🎙️" },
  { name: "GitHub Copilot", desc: "AI কোড অ্যাসিস্ট্যান্ট", href: "/tools/github-copilot-bangladesh", emoji: "👨‍💻" },
  { name: "Notion AI", desc: "AI ওয়ার্কস্পেস ও নোট", href: "/tools/notion-business-bangladesh", emoji: "📝" },
  { name: "AI Tools Vault", desc: "৩টি টুল এক বান্ডিলে", href: "/ai-tools-vault", emoji: "💎" },
];

const COMPARISONS = [
  { label: "Claude vs ChatGPT", href: "/compare/claude-vs-chatgpt" },
  { label: "Gemini vs ChatGPT", href: "/compare/gemini-vs-chatgpt" },
  { label: "Claude vs Gemini", href: "/compare/claude-vs-gemini" },
  { label: "Google AI Pro vs ChatGPT", href: "/compare/google-ai-pro-vs-chatgpt" },
  { label: "SuperGrok vs ChatGPT", href: "/compare/supergrok-vs-chatgpt" },
  { label: "ChatGPT vs Perplexity", href: "/compare/chatgpt-vs-perplexity" },
  { label: "Midjourney vs Leonardo", href: "/compare/midjourney-vs-leonardo" },
  { label: "Runway vs Kling", href: "/compare/runway-vs-kling" },
  { label: "Copilot vs ChatGPT", href: "/compare/copilot-vs-chatgpt" },
];

const TRAINING_TRACKS = [
  { icon: GraduationCap, title: "শিক্ষার্থীদের জন্য", price: "৳১,৯৯৯ থেকে", points: ["অ্যাসাইনমেন্ট ও রিসার্চে AI", "IELTS ও ইংরেজি লেখা", "থিসিস ও প্রেজেন্টেশন"], color: "#15803D" },
  { icon: Briefcase, title: "ফ্রিল্যান্সারদের জন্য", price: "৳৪,৯৯৯ থেকে", points: ["প্রপোজাল ও ক্লায়েন্ট কমিউনিকেশন", "দ্রুত ডেলিভারি ওয়ার্কফ্লো", "কাস্টম prompt pack"], color: "#2563EB" },
  { icon: Building2, title: "ব্যবসার জন্য", price: "৳১২,৯৯৯ থেকে", points: ["পুরো টিমের AI ট্রেনিং", "কাস্টমার সাপোর্ট অটোমেশন", "রিপোর্ট ও কনটেন্ট সিস্টেম"], color: "#7C3AED" },
];

// Was hardcoded at ৳499 across 5 separate places on this page (title, hero,
// body paragraph, student tagline, stat tile) — a sixth and seventh
// independent, disagreeing "ChatGPT starts at X" figure found in this
// codebase in one session. None derived from anything. Now derived once,
// from the same real, currently-purchasable catalog data every other fixed
// page on the site uses.
const HOME_CHATGPT_MIN = Math.min(
  ...chatgptPlans.filter((p) => !p.quarantined).map((p) => p.priceBDT)
);

export default function Home() {
  usePageMeta({
    title: "ChatGPT, Claude & AI Tools in Bangladesh",
    description: `Buy ChatGPT from ৳${HOME_CHATGPT_MIN.toLocaleString("en-US")}/mo. Claude Pro, Gemini Advanced & more. Pay via bKash/Nagad. Bangladesh premium AI subscription provider.`,
    path: "/",
  });
  useReveal();
  const homeFaqs = FAQS.map((f) => ({ q: f.q, a: f.a }));
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Team Premium — Premium AI Subscriptions in Bangladesh",
    "url": "https://www.aiteampremium.com/",
    "description":
      "AI Team Premium helps Bangladesh users evaluate and order eligible AI subscriptions with local support. Current access model, price, availability, fulfillment timing and support terms are confirmed before purchase.",
    "inLanguage": ["en", "bn"],
    "isPartOf": { "@id": "https://www.aiteampremium.com/#website" },
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
          <img src={IMG_HERO} alt="AI Team Premium — Bangladesh's trusted AI subscription provider, offering ChatGPT Plus, Claude Pro, and Gemini Advanced payable via bKash and Nagad" className="w-full h-full object-cover" style={{ opacity: 0.15, mixBlendMode: "luminosity" }} loading="eager" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BRAND.navy} 0%, rgba(15,23,42,0.6) 50%, ${BRAND.navy} 100%)` }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10">
              <LogoStacked size="xl" iconColor={BRAND.white} textColor={BRAND.white} animated />
            </div>
            <h1 style={{ color: BRAND.white, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              বাংলাদেশে ChatGPT — ৳{bnDigits(HOME_CHATGPT_MIN)} থেকে শুরু
              <br />
              <span style={{ color: BRAND.blue }}>Premium AI & Digital Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Explore current ChatGPT options for Bangladesh. Access model, price and fulfillment terms are confirmed before purchase.
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
              <strong>AI Team Premium</strong> is an independent Bangladesh-focused AI access and enablement platform. Current access model, price, availability, fulfillment timing and support terms are confirmed for each offer before purchase.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-2xl p-6 md:p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 text-center" style={{ background: BRAND.white, boxShadow: "0 8px 40px rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.06)" }}>
            {["Current terms confirmed", "BDT payment coordination", "WhatsApp support", "Provider-policy review", "Evidence-first catalog"].map((t) => (
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
          <div className="text-center mb-14" data-reveal>
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Designed For</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>কাদের জন্য AI Team Premium?</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem", lineHeight: 1.65 }}>Whether you're a student, freelancer, business, or creator — we have the right AI tool for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Students", tagline: `৳${HOME_CHATGPT_MIN.toLocaleString("en-US")}/mo থেকে শুরু`, tools: "ChatGPT · Grammarly · Perplexity", desc: "Assignment writing, research summaries, IELTS prep, thesis — let AI do the heavy lifting while you focus on understanding.", color: "#15803D", link: "/tools/chatgpt" },
              { icon: Briefcase, title: "Freelancers", tagline: "Fiverr & Upwork-এ এগিয়ে থাকুন", tools: "Claude Pro · Canva Pro · Midjourney", desc: "Faster proposals, better content, stunning visuals — outperform competitors on Fiverr and Upwork with AI-powered work.", color: BRAND.blue, link: "/ai-subscriptions" },
              { icon: Building2, title: "Businesses", tagline: "Team-wide AI দক্ষতা", tools: "ChatGPT Team · Copilot · Gemini", desc: "Equip your entire team with AI tools. Boost productivity, automate reports, and get live Bangla AI training for your staff.", color: "#7C3AED", link: "/chatgpt-plans" },
              { icon: Video, title: "Content Creators", tagline: "ভাইরাল কন্টেন্ট বানান", tools: "Midjourney · ElevenLabs · Canva", desc: "AI-generated images, voice-overs in Bangla, thumbnail design — create professional content without a studio or equipment.", color: "#F59E0B", link: "/tools/midjourney" },
            ].map((p, i) => (
              <Link data-reveal="item" data-reveal-delay={i * 80} key={p.title} href={p.link} style={{ textDecoration: "none" }} data-testid={`card-persona-${p.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="rounded-2xl p-7 h-full flex flex-col hover-elevate card-lift cursor-pointer" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <div className="inline-flex items-center justify-center rounded-xl mb-5" style={{ width: 52, height: 52, background: `${p.color}18` }}>
                    <p.icon size={24} color={p.color} strokeWidth={1.8} />
                  </div>
                  <p style={{ color: readableOn(p.color, "#ffffff", 4.5), fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.tagline}</p>
                  <h3 className="mt-1 mb-3" style={{ color: BRAND.navy, fontSize: "1.1rem", fontWeight: 700 }}>{p.title}</h3>
                  <p className="mb-4 flex-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem", lineHeight: 1.65 }}>{p.desc}</p>
                  <p style={{ color: readableOn(p.color, "#ffffff", 4.5), fontSize: "0.72rem", fontWeight: 600 }}>{p.tools}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16" data-reveal>
            <p className="mb-3 uppercase text-blue-600 dark:text-blue-400" style={{ fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Featured Offers</p>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>Start with the Right Plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPlans.map((o, i) => {
              if (!o) return null;
              return (
                <div data-reveal="item" data-reveal-delay={i * 90} key={o.slug} className="rounded-2xl p-6 flex flex-col hover-elevate card-lift" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
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
            <Link href="/chatgpt-plans" className="inline-flex items-center gap-1 font-semibold hover:underline text-blue-600 dark:text-blue-400">
              View All ChatGPT Plans <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR AI TOOLS */}
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14" data-reveal>
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Browse by Tool</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>জনপ্রিয় AI Tools</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem", lineHeight: 1.65 }}>
              ৩৭টি premium AI tool · ৮০টি subscription plan — সবই bKash / Nagad দিয়ে টাকায়।
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {POPULAR_TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }} data-testid={`card-tool-${tool.href.split("/").pop()}`}>
                <div className="rounded-2xl p-5 h-full flex flex-col hover-elevate card-lift cursor-pointer" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <div className="text-2xl mb-3">{tool.emoji}</div>
                  <h3 style={{ color: BRAND.navy, fontSize: "0.92rem", fontWeight: 700, lineHeight: 1.3 }}>{tool.name}</h3>
                  <p className="mt-1.5 flex-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.76rem", lineHeight: 1.5 }}>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/all-products"
              data-testid="link-all-products"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
              style={{ background: BRAND.blue, color: BRAND.white, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            >
              সব ৮০টি প্ল্যান দেখুন <ChevronRight size={16} />
            </Link>
            <Link
              href="/pricing"
              data-testid="link-home-pricing"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate"
              style={{ border: `1px solid ${BRAND.blue}`, color: BRAND.blue, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            >
              সম্পূর্ণ প্রাইস লিস্ট
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE AI TRAINING */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14" data-reveal>
            <p className="mb-3 uppercase text-blue-600 dark:text-blue-400" style={{ fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Live AI Training</p>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>শুধু Subscription নয় — ব্যবহারটাও শিখুন</h2>
            <p className="mt-4 max-w-xl mx-auto text-slate-900/70 dark:text-slate-300" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
              লাইভ Google Meet সেশনে বাংলা ভাষায় হাতে-কলমে শেখানো হয়। প্রতিটি সেশনের পর আপনার কাজ অনুযায়ী custom prompt pack ও workflow ডকুমেন্ট পাবেন।
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TRAINING_TRACKS.map((track, i) => (
              <div data-reveal="item" data-reveal-delay={i * 90} key={track.title} className="rounded-2xl p-7 flex flex-col" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
                <div className="inline-flex items-center justify-center rounded-xl mb-5" style={{ width: 48, height: 48, background: `${track.color}18` }}>
                  <track.icon size={22} color={track.color} strokeWidth={1.9} />
                </div>
                <h3 style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 700 }}>{track.title}</h3>
                <p className="mt-1 mb-5" style={{ color: track.color, fontSize: "0.85rem", fontWeight: 700 }}>{track.price}</p>
                <ul className="space-y-2.5 flex-1">
                  {track.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.82rem", lineHeight: 1.5 }}>
                      <Check size={14} color={track.color} strokeWidth={3} className="mt-0.5 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "home-training")}
              data-testid="button-training-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white"
              style={{ background: "#25D366", fontSize: "0.9rem" }}
            >
              <WhatsAppIcon size={17} color="#fff" /> সেশন বুক করুন
            </a>
            <Link
              href="/support"
              data-testid="link-home-training-details"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all hover-elevate border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              style={{ fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            >
              সব প্যাকেজ দেখুন <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SupportUpsell />

      {/* HOW TO ORDER — 3 STEPS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14" data-reveal>
            <p className="mb-3 uppercase text-blue-600 dark:text-blue-400" style={{ fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>How It Works</p>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>৩ ধাপে AI Subscription নিন</h2>
            <p className="mt-4 max-w-md mx-auto text-slate-900/70 dark:text-slate-300" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>No credit card setup, no registration. Just WhatsApp → Pay → Get access.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { step: "01", icon: MessageCircle, color: "#25D366", title: "Message on WhatsApp", desc: "Tell us which AI tool you want. We confirm the current offer details in Bangla or English before payment." },
              { step: "02", icon: CreditCard, color: BRAND.blue, title: "Pay via bKash or Nagad", desc: "We share the bKash/Nagad number privately. Pay in BDT. No international card, no hidden fees, no registration." },
              { step: "03", icon: Zap, color: "#F59E0B", title: "Confirm & Fulfill", desc: "After the offer and payment are confirmed, fulfillment follows the timing agreed for that specific order. Setup guidance is provided where applicable." },
            ].map((s, i) => (
              <div data-reveal="item" data-reveal-delay={i * 140} key={s.step} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl mb-5 flex items-center justify-center" style={{ background: `${s.color}15`, border: `2px solid ${s.color}30` }}>
                  <s.icon size={32} color={s.color} strokeWidth={1.8} />
                </div>
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full mb-4" style={{ background: s.color }}>
                  <span style={{ color: bestTextOn(s.color), fontSize: "0.65rem", fontWeight: 800 }}>{s.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-slate-900/70 dark:text-slate-300" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{s.desc}</p>
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
          <div className="text-center mb-16" data-reveal>
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
          <div className="text-center mb-16" data-reveal>
            <p className="mb-3 uppercase text-blue-600 dark:text-blue-400" style={{ fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Why AI Team Premium</p>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>AI Access & Support for Bangladesh</h2>
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

      {/* COMPARE TOOLS */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center mb-10" data-reveal>
            <p className="mb-3 uppercase text-blue-600 dark:text-blue-400" style={{ fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Still Deciding?</p>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.15 }}>কোন AI টুল আপনার জন্য?</h2>
            <p className="mt-4 max-w-lg mx-auto text-slate-900/70 dark:text-slate-300" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
              পাশাপাশি তুলনা দেখে সিদ্ধান্ত নিন — ফিচার, দাম আর কোনটা কার জন্য ভালো।
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3" data-reveal>
            {COMPARISONS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                data-testid={`link-compare-${c.href.split("/").pop()}`}
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 transition-all hover-elevate"
                style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.12)", color: BRAND.navy, fontSize: "0.83rem", fontWeight: 600, textDecoration: "none" }}
              >
                {c.label} <ChevronRight size={13} color={BRAND.blue} />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/compare" className="inline-flex items-center gap-1 font-semibold hover:underline text-blue-600 dark:text-blue-400">
              সব তুলনা দেখুন <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FROM THE BLOG */}
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14" data-reveal>
            <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>AI Blog</p>
            <h2 style={{ color: BRAND.navy, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.15 }}>Guides for Bangladesh</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem", lineHeight: 1.65 }}>Pricing, comparisons, and practical AI guides for students, freelancers and businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <Link data-reveal="item" data-reveal-delay={i * 90} key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }} data-testid={`card-home-blog-${post.slug}`}>
                <div className="rounded-2xl p-6 h-full flex flex-col hover-elevate card-lift cursor-pointer" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <div className="text-2xl mb-3">{post.heroEmoji}</div>
                  <h3 className="mb-2" style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>{post.title}</h3>
                  <p className="mb-4 flex-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem", lineHeight: 1.6 }}>{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-auto" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
                    Read <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center gap-1 font-semibold hover:underline" style={{ color: BRAND.blue }}>
              View All Guides <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PURCHASE CHECKS */}
      <section className="py-16" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="uppercase" style={{ color: "#60A5FA", fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700 }}>Before you pay</p>
          <h2 className="mt-3" style={{ color: BRAND.white, fontSize: "2rem", fontWeight: 700 }}>We confirm the commercial facts that can change</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-left">{["Access model", "Current price", "Availability & timing", "Support / recovery terms"].map((item) => <div key={item} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,.05)", color: BRAND.white }}>{item}</div>)}</div>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="text-center mb-12" data-reveal>
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
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Ask about a current AI subscription offer or start a digital project with our team. Commercial terms are confirmed before payment.
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