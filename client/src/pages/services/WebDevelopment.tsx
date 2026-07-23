import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, Shield, MessageCircle, Star, Code } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";

const PROJECT_TYPES = [
  { emoji: "🚀", title: "Landing Page", desc: "Single-page marketing site — fast, mobile-first, conversion-optimized. Ideal for freelancers, products, and campaigns.", price: "৳7,999", timeline: "5–7 days" },
  { emoji: "🛒", title: "E-Commerce Store", desc: "Full online shop with product listings, cart, payment gateway (bKash/Nagad/Card), and order management.", price: "৳24,999", timeline: "14–21 days" },
  { emoji: "💼", title: "Portfolio / Business Site", desc: "Professional multi-page website for agencies, consultancies, and personal brands. Blog and contact form included.", price: "৳14,999", timeline: "10–14 days" },
  { emoji: "⚙️", title: "Custom Web App", desc: "Dashboard, booking system, CRM, or custom tool — built with React/Next.js. Contact for quote.", price: "Custom", timeline: "Custom" },
];

const TECH_STACK = ["React / Next.js", "Tailwind CSS", "Node.js / Express", "PostgreSQL", "WordPress / WooCommerce", "Vercel / Cloudflare"];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "আপনার requirements, target audience, এবং goals বুঝি।" },
  { step: "02", title: "Design", desc: "Wireframe এবং visual design present করি।" },
  { step: "03", title: "Development", desc: "Clean, fast, SEO-optimized code লিখি।" },
  { step: "04", title: "Launch", desc: "Testing শেষে live করি এবং training দিই।" },
];

const FAQS = [
  { q: "Web development project-এর জন্য কতটুকু information দিতে হবে?", a: "আপনার business type, target audience, required pages, color preference, এবং reference website (optional) দিলেই শুরু করা যায়। আমরা rest guide করব।" },
  { q: "Mobile-friendly কি হবে?", a: "হ্যাঁ, সব website 100% mobile-first ডিজাইন করা হয়। সব device-এ perfect display নিশ্চিত করা হয়।" },
  { q: "SEO কি করা হবে?", a: "হ্যাঁ। On-page SEO (meta tags, structured data, sitemap, page speed optimization) সব website-এ করা হয়।" },
  { q: "Payment structure কী?", a: "Project শুরুতে ৫০% advance, launch-এর সময় বাকি ৫০%।" },
  { q: "Hosting কোথায় হবে?", a: "আমরা Vercel, Cloudflare, বা Namecheap-এ host করি। চাইলে আপনার নিজের hosting-এও deploy করা যাবে।" },
  { q: "Domain name লাগবে?", a: "Domain আলাদাভাবে কিনতে হবে। আমরা Namecheap বা GoDaddy থেকে কেনার জন্য guide করতে পারি (বাংলাদেশ থেকে bKash-এ কেনা যায়)।" },
  { q: "After launch কি support পাব?", a: "হ্যাঁ, launch-এর পর ১৫ দিন free bug fix support পাওয়া যাবে। Ongoing maintenance-এর জন্য separate plan আছে।" },
  { q: "E-commerce-এ bKash payment integration কি সম্ভব?", a: "হ্যাঁ। bKash payment gateway, Nagad, এবং SSLCommerz integration করা হয়।" },
  { q: "WordPress-এ কি করা হয়?", a: "হ্যাঁ। Landing page এবং business site-এর জন্য WordPress/Elementor ব্যবহার করা হয়। E-commerce-এর জন্য WooCommerce।" },
  { q: "Custom web app কী?", a: "Dashboard, booking system, inventory management, CRM — এই ধরনের feature-rich application। Price এবং timeline project অনুযায়ী আলাদা।" },
];

export default function WebDevelopment() {
  usePageMeta({
    title: "Web Development Bangladesh — Landing Page from ৳7,999",
    description: "Professional web development in Bangladesh from ৳7,999. Landing pages, e-commerce, portfolio sites, custom web apps. React, Next.js, WordPress. Pay via bKash/Nagad.",
    path: "/services/web-development",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Web Development", path: "/services/web-development" },
      ]} />
      <FAQSchema items={FAQS} />
      <ProductSchema
        name="Web Development Services Bangladesh"
        description="Professional landing pages, e-commerce stores, portfolio sites, and custom web apps from ৳7,999. Pay via bKash/Nagad. AI Team Premium."
        path="/services/web-development"
        priceBDT={7999}
        category="Web Development Service"

      />

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Code size={13} /> Professional Web Development · bKash/Nagad
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            🌐 Web Development — <span style={{ color: BRAND.blue }}>৳৭,৯৯৯</span> থেকে
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            Fast, SEO-optimized, mobile-first websites — landing page থেকে full e-commerce store পর্যন্ত।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+Web+Development+services+from+AITP" target="_blank" rel="noopener noreferrer" data-testid="button-hero-web" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-hero-web-messenger" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#0084FF" }}>
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Clock size={16} color={BRAND.blue} />, text: "5–21 Day Delivery" },
              { icon: <Check size={16} color={BRAND.blue} />, text: "SEO Optimized" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "15-Day Bug Fix" },
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
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>Project Types & Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECT_TYPES.map((pt) => (
              <div key={pt.title} className="rounded-2xl p-6" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
                <div className="text-3xl mb-3">{pt.emoji}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg" style={{ color: BRAND.navy }}>{pt.title}</h3>
                  <span className="text-xl font-bold" style={{ color: BRAND.blue }}>{pt.price}</span>
                </div>
                <p className="text-sm mb-3" style={{ color: BRAND.navy, opacity: 0.6 }}>{pt.desc}</p>
                <div className="flex items-center gap-1 text-xs font-medium" style={{ color: BRAND.blue }}>
                  <Clock size={12} /> {pt.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: BRAND.navy }}>Tech Stack We Use</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="rounded-full px-4 py-2 font-semibold text-sm" style={{ background: BRAND.white, color: BRAND.blue, border: "1px solid rgba(37,99,235,0.15)" }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
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
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+Web+Development+services+from+AITP" target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-web" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-web-messenger" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#0084FF" }}>
              <MessageCircle size={20} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
