import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, Shield, MessageCircle, Star, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";

const SERVICES_LIST = [
  { emoji: "📘", title: "Facebook Ads", desc: "Targeted campaigns with compelling creatives. Lead generation, brand awareness, e-commerce retargeting." },
  { emoji: "🔍", title: "Google Ads", desc: "Search, Display, and Shopping campaigns. Keyword research, bid management, conversion tracking." },
  { emoji: "📈", title: "SEO", desc: "On-page, technical, and content SEO. Keyword rankings, backlink building, monthly reporting." },
  { emoji: "📱", title: "Social Media Management", desc: "Content calendar, post creation, community management for Facebook and Instagram." },
];

const TIERS = [
  {
    name: "Starter",
    price: "৳9,999/mo",
    features: ["1 platform (Facebook OR Google)", "5 ad creatives/month", "Audience research", "Monthly performance report", "WhatsApp support"],
    popular: false,
    whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+the+Starter+Digital+Marketing+package+%E2%98%859%2C999%2Fmo",
  },
  {
    name: "Growth",
    price: "৳19,999/mo",
    features: ["Facebook + Google Ads", "10 ad creatives/month", "Social media management (2 platforms)", "Bi-weekly reporting", "Landing page optimization", "WhatsApp support"],
    popular: true,
    whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+the+Growth+Digital+Marketing+package+%E2%98%8519%2C999%2Fmo",
  },
  {
    name: "Agency",
    price: "Custom",
    features: ["Full-funnel strategy", "All platforms covered", "Unlimited creatives", "Weekly reporting + calls", "SEO + content included", "Dedicated account manager"],
    popular: false,
    whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+a+custom+Digital+Marketing+Agency+package",
  },
];

const RESULTS = [
  { metric: "Avg. ROAS", value: "4.2×", label: "Return on Ad Spend (Facebook Ads)" },
  { metric: "Leads/month", value: "50–200", label: "For SME clients on Facebook Lead Ads" },
  { metric: "Organic growth", value: "35%", label: "Average Instagram follower growth in 90 days" },
];

const FAQS = [
  { q: "Digital marketing service-এ কত budget লাগে?", a: "আমাদের management fee আলাদা। Ad spend আপনার নিজের budget (minimum ৳5,000/mo recommended)। Management fee Starter ৳9,999/mo থেকে শুরু।" },
  { q: "Facebook Ads কি সত্যিই কাজ করে?", a: "হ্যাঁ, সঠিকভাবে setup করলে। Target audience, compelling creative, এবং proper landing page — এই তিনটি ঠিক থাকলে Facebook Ads highly effective।" },
  { q: "Minimum কতদিনের জন্য contract?", a: "Minimum ১ মাসের commitment। তবে best results পেতে ৩ মাস recommend করা হয়।" },
  { q: "Campaign চালানোর আগে কী কী করা হয়?", a: "Business audit, competitor analysis, target audience research, এবং ad creative এবং copy তৈরি করা হয়।" },
  { q: "Reporting কত ঘনঘন পাব?", a: "Starter-এ monthly, Growth-এ bi-weekly, Agency-তে weekly report পাওয়া যায়। Google Data Studio dashboard-ও দেওয়া হয়।" },
  { q: "Social media content কি তৈরি করে দেওয়া হবে?", a: "হ্যাঁ। Growth এবং Agency package-এ content calendar, post design, এবং copywriting সব করা হয়।" },
  { q: "SEO-তে কতদিনে result পাওয়া যায়?", a: "SEO একটি long-term strategy। সাধারণত ৩–৬ মাসে significant ranking improvement দেখা যায়।" },
  { q: "Ad account কি আমার নিজের থাকবে?", a: "হ্যাঁ। আপনার নিজের Facebook Business Manager এবং Google Ads account-এ আমরা access নিয়ে কাজ করি। Account ownership সব সময় আপনার।" },
  { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। Monthly subscription basis-এ billing হয়।" },
  { q: "একটু বুঝিয়ে বলবেন — management fee আর ad spend আলাদা কেন?", a: "Management fee হলো আমাদের service charge। Ad spend হলো Facebook/Google-কে দেওয়া টাকা যা directly আপনার target audience-এর কাছে ad দেখায়। দুটি আলাদা payment channel।" },
];

export default function DigitalMarketing() {
  usePageMeta({
    title: "Digital Marketing Bangladesh — Facebook & Google Ads from ৳9,999/mo | AI Team Premium",
    description: "Professional digital marketing in Bangladesh from ৳9,999/month. Facebook Ads, Google Ads, SEO, social media management. Pay via bKash/Nagad. AI Team Premium.",
    path: "/services/digital-marketing",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Digital Marketing", path: "/services/digital-marketing" },
      ]} />
      <FAQSchema items={FAQS} />
      <ProductSchema
        name="Digital Marketing Services Bangladesh"
        description="Professional Facebook Ads, Google Ads, SEO, and social media management from ৳9,999/month. Pay via bKash/Nagad. AI Team Premium."
        path="/services/digital-marketing"
        priceBDT={9999}
        category="Digital Marketing Service"

      />

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <TrendingUp size={13} /> Digital Marketing · bKash/Nagad
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            📢 Digital Marketing — <span style={{ color: BRAND.blue }}>৳৯,৯৯৯</span>/মাস থেকে
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            Facebook Ads, Google Ads, SEO, এবং Social Media Management — আপনার business online-এ grow করুন।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+Digital+Marketing+services+from+AITP" target="_blank" rel="noopener noreferrer" data-testid="button-hero-marketing" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-hero-marketing-messenger" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#0084FF" }}>
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Star size={16} color={BRAND.blue} />, text: "4.2× Avg. ROAS" },
              { icon: <Check size={16} color={BRAND.blue} />, text: "Full Campaign Setup" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "Monthly Reporting" },
              { icon: <WhatsAppIcon size={16} color="#25D366" />, text: "bKash / Nagad" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 py-3">
                {item.icon}
                <span style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>Services We Offer</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES_LIST.map((s) => (
              <div key={s.title} className="rounded-2xl p-6 flex gap-4" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
                <span className="text-3xl flex-shrink-0">{s.emoji}</span>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: BRAND.navy }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: BRAND.navy, opacity: 0.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: BRAND.navy }}>Results We've Delivered</h2>
          <p className="text-center mb-10 text-sm" style={{ color: BRAND.navy, opacity: 0.5 }}>Typical results for SME clients in Bangladesh</p>
          <div className="grid md:grid-cols-3 gap-6">
            {RESULTS.map((r) => (
              <div key={r.metric} className="rounded-2xl p-7 text-center" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BRAND.blue }}>{r.metric}</div>
                <div className="text-4xl font-extrabold mb-2" style={{ color: BRAND.navy }}>{r.value}</div>
                <div className="text-xs" style={{ color: BRAND.navy, opacity: 0.55 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" id="plans">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>Monthly Retainer Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-2xl p-7 flex flex-col relative" style={{ background: BRAND.white, border: tier.popular ? `2px solid ${BRAND.blue}` : "1px solid rgba(37,99,235,0.10)", boxShadow: tier.popular ? "0 8px 32px rgba(37,99,235,0.12)" : undefined }}>
                {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-4 py-1 text-white text-xs font-bold" style={{ background: BRAND.blue }}><Star size={11} fill="#fff" /> Most Popular</span>}
                <h3 className="font-bold text-lg mb-1" style={{ color: BRAND.navy }}>{tier.name}</h3>
                <div className="text-2xl font-bold mb-5" style={{ color: BRAND.blue }}>{tier.price}</div>
                <ul className="space-y-2 mb-7 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: BRAND.navy, opacity: 0.75 }}>
                      <Check size={14} color={BRAND.blue} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href={tier.whatsapp} target="_blank" rel="noopener noreferrer" data-testid={`button-marketing-${tier.name.toLowerCase()}`} className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 font-bold text-white text-sm" style={{ background: tier.popular ? BRAND.blue : "#25D366" }}>
                  <WhatsAppIcon size={15} color="#fff" /> Get Started
                </a>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm" style={{ color: BRAND.navy, opacity: 0.5 }}>* Management fee only. Ad spend billed separately directly to Facebook/Google.</p>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: BRAND.navy }}>Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border px-5" style={{ borderColor: "rgba(37,99,235,0.10)", background: BRAND.white }}>
                <AccordionTrigger className="text-left font-semibold py-4" style={{ color: BRAND.navy, fontSize: "0.95rem" }}>{faq.q}</AccordionTrigger>
                <AccordionContent className="pb-4" style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.88rem", lineHeight: 1.7 }}>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">আজই শুরু করুন</h2>
          <p className="text-white/50 mb-2">সকাল ৯টা – রাত ১১টা · সপ্তাহের ৭ দিন</p>
          <p className="text-white/50 mb-8">WhatsApp বা Messenger-এ message করুন।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+Digital+Marketing+services+from+AITP" target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-marketing" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-marketing-messenger" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#0084FF" }}>
              <MessageCircle size={20} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
