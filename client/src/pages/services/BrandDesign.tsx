import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, Shield, MessageCircle, Star, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";

const DELIVERABLES = [
  { emoji: "🎨", title: "Logo Design", desc: "Primary logo + variations (horizontal, stacked, icon-only) in all formats (SVG, PNG, PDF)" },
  { emoji: "📘", title: "Brand Identity", desc: "Color palette, typography system, visual guidelines document (PDF)" },
  { emoji: "📱", title: "Social Media Kit", desc: "Profile picture, cover photo, post templates for Facebook, Instagram, and LinkedIn" },
  { emoji: "💼", title: "Business Card", desc: "Print-ready business card design (front + back) in CMYK format" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "আপনার brand vision, target audience, এবং competitor landscape বুঝি।" },
  { step: "02", title: "Concepts", desc: "৩টি initial logo concept তৈরি করে present করি।" },
  { step: "03", title: "Revisions", desc: "আপনার পছন্দের concept নিয়ে ২ রাউন্ড revision করি।" },
  { step: "04", title: "Delivery", desc: "সব files organized folder-এ deliver করি।" },
];

const TIERS = [
  {
    name: "Starter",
    price: "৳4,999",
    turnaround: "5 business days",
    features: ["Logo (3 concepts, 2 revisions)", "Color palette", "Primary typeface", "PNG + SVG files"],
    popular: false,
    whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+the+Starter+Brand+Design+package+%E2%98%854%2C999",
  },
  {
    name: "Professional",
    price: "৳9,999",
    turnaround: "7 business days",
    features: ["Everything in Starter", "Brand guidelines PDF", "Social media kit (3 platforms)", "Business card design", "3 revision rounds"],
    popular: true,
    whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+the+Professional+Brand+Design+package+%E2%98%859%2C999",
  },
  {
    name: "Premium",
    price: "৳19,999",
    turnaround: "14 business days",
    features: ["Everything in Professional", "Full brand identity system", "Letterhead + email signature", "Social media templates (6)", "Unlimited revisions", "Brand style guide (20+ pages)"],
    popular: false,
    whatsapp: "https://wa.me/8801533262758?text=Hi%2C+I+want+the+Premium+Brand+Design+package+%E2%98%8519%2C999",
  },
];

const FAQS = [
  { q: "Brand Design package-এ কী কী পাব?", a: "Package অনুযায়ী logo, brand identity guidelines, color palette, typography, social media kit, এবং business card design পাওয়া যায়। সব files SVG, PNG, PDF format-এ deliver করা হয়।" },
  { q: "Turnaround time কতদিন?", a: "Starter: 5 business days, Professional: 7 business days, Premium: 14 business days। Rush delivery-র জন্য WhatsApp-এ জিজ্ঞেস করুন।" },
  { q: "Revision কতবার করা যাবে?", a: "Starter-এ ২টি, Professional-এ ৩টি, এবং Premium-এ unlimited revision করা যাবে।" },
  { q: "আমার কি কোনো idea দিতে হবে?", a: "হ্যাঁ, একটি brief form পূরণ করতে হবে — আপনার business, target audience, পছন্দের style, এবং competitor examples দিলে ভালো হয়। তবে আমরা থেকেও idea দিতে পারি।" },
  { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। শুরুতে ৫০% advance নেওয়া হয়, delivery-র সময় বাকি ৫০%।" },
  { q: "Deposit কি refundable?", a: "Initial concept present করার পর deposit refundable নয়। Concept present করার আগে full refund পাওয়া যাবে।" },
  { q: "কী ধরনের businesses-এর জন্য কাজ করেন?", a: "সব ধরনের business — startup, SME, freelancer, e-commerce, restaurant, school, NGO — সবার জন্য brand design করা হয়।" },
  { q: "Files কোন format-এ পাব?", a: "SVG (vector), PNG (transparent background), PDF (print-ready), এবং AI/EPS file (যদি requested হয়)।" },
  { q: "Social media kit-এ কী থাকে?", a: "Profile picture (1:1), cover photo (Facebook, LinkedIn), post template (square + portrait), এবং story template। Canva editable format-এও দেওয়া হয়।" },
  { q: "Brand guidelines কী?", a: "Brand guidelines হলো একটি document যেখানে আপনার brand-এর logo usage, color codes (HEX, RGB, CMYK), fonts, spacing rules — সব লেখা থাকে। নতুন designer hire করলে এটি দিলেই কাজ শুরু করতে পারবে।" },
];

export default function BrandDesign() {
  usePageMeta({
    title: "Brand Design Services Bangladesh — Logo & Identity from ৳4,999 | AI Team Premium BD",
    description: "Professional brand design in Bangladesh from ৳4,999. Logo design, brand identity, social media kit, business card. 5-day turnaround. Pay via bKash/Nagad. AI Team Premium BD.",
    path: "/services/brand-design",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Brand Design", path: "/services/brand-design" },
      ]} />
      <FAQSchema items={FAQS} />
      <ProductSchema
        name="Brand Design Services Bangladesh"
        description="Professional logo design, brand identity, and social media kit from ৳4,999. Pay via bKash/Nagad. AI Team Premium BD."
        path="/services/brand-design"
        priceBDT={4999}
        category="Design Service"

      />

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Star size={13} /> Professional Brand Design · bKash/Nagad
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            🎨 Brand Design — <span style={{ color: BRAND.blue }}>৳৪,৯৯৯</span> থেকে
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            আপনার brand-এর জন্য professional logo, identity system, এবং social media kit — ৫ দিনে delivery।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+Brand+Design+services+from+AITPBD" target="_blank" rel="noopener noreferrer" data-testid="button-hero-brand" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-hero-brand-messenger" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#0084FF" }}>
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Clock size={16} color={BRAND.blue} />, text: "5-Day Turnaround" },
              { icon: <Check size={16} color={BRAND.blue} />, text: "2–Unlimited Revisions" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "50% on Delivery" },
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
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>What We Deliver</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="rounded-2xl p-6 flex gap-4" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
                <span className="text-3xl flex-shrink-0">{d.emoji}</span>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: BRAND.navy }}>{d.title}</h3>
                  <p className="text-sm" style={{ color: BRAND.navy, opacity: 0.6 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>Our Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROCESS.map((p) => (
              <div key={p.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center font-bold text-lg" style={{ background: BRAND.blue, color: "#fff" }}>{p.step}</div>
                <h3 className="font-bold mb-1" style={{ color: BRAND.navy }}>{p.title}</h3>
                <p className="text-xs" style={{ color: BRAND.navy, opacity: 0.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" id="plans">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>Pricing Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-2xl p-7 flex flex-col relative" style={{ background: BRAND.white, border: tier.popular ? `2px solid ${BRAND.blue}` : "1px solid rgba(37,99,235,0.10)", boxShadow: tier.popular ? "0 8px 32px rgba(37,99,235,0.12)" : undefined }}>
                {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-4 py-1 text-white text-xs font-bold" style={{ background: BRAND.blue }}><Star size={11} fill="#fff" /> Most Popular</span>}
                <h3 className="font-bold text-lg mb-1" style={{ color: BRAND.navy }}>{tier.name}</h3>
                <div className="text-3xl font-bold mb-1" style={{ color: BRAND.navy }}>{tier.price}</div>
                <div className="flex items-center gap-1 mb-5 text-sm" style={{ color: BRAND.blue }}>
                  <Clock size={13} /> {tier.turnaround}
                </div>
                <ul className="space-y-2 mb-7 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: BRAND.navy, opacity: 0.75 }}>
                      <Check size={14} color={BRAND.blue} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href={tier.whatsapp} target="_blank" rel="noopener noreferrer" data-testid={`button-brand-${tier.name.toLowerCase()}`} className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 font-bold text-white text-sm" style={{ background: tier.popular ? BRAND.blue : "#25D366" }}>
                  <WhatsAppIcon size={15} color="#fff" /> Get Started
                </a>
              </div>
            ))}
          </div>
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
          <p className="text-white/50 mb-2">সকাল ৯টা – রাত ১১টা · সপ্তাহের ৭ দিন · বাংলা/English support</p>
          <p className="text-white/50 mb-8">WhatsApp বা Messenger-এ message করুন।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+Brand+Design+services+from+AITPBD" target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-brand" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-brand-messenger" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#0084FF" }}>
              <MessageCircle size={20} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
