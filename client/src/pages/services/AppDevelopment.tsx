import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, Shield, MessageCircle, Star, Smartphone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";

const APP_TYPES = [
  { emoji: "📱", title: "MVP App", desc: "Core feature set to validate your idea. Fast, lean, investor-ready. iOS + Android.", price: "৳29,999", timeline: "21–30 days" },
  { emoji: "🛒", title: "E-Commerce App", desc: "Product catalog, cart, bKash/Nagad checkout, order tracking, admin panel.", price: "৳49,999", timeline: "30–45 days" },
  { emoji: "📅", title: "Booking / Service App", desc: "Appointment scheduling, service listings, provider profiles, and in-app chat.", price: "৳39,999", timeline: "25–35 days" },
  { emoji: "⚙️", title: "Custom App", desc: "Complex feature sets, third-party integrations, or enterprise requirements. Contact for quote.", price: "Custom", timeline: "Custom" },
];

const TECH = ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "bKash API", "Nagad API"];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "আপনার app idea, user flows, এবং core features বুঝি।" },
  { step: "02", title: "Design", desc: "UI/UX wireframes এবং clickable prototype তৈরি করি।" },
  { step: "03", title: "Development", desc: "iOS + Android উভয়ের জন্য cross-platform code লিখি।" },
  { step: "04", title: "Launch", desc: "Play Store এবং App Store-এ publish করি।" },
];

const FAQS = [
  { q: "iOS এবং Android দুটোর জন্য কি আলাদা আলাদা তৈরি হবে?", a: "না। আমরা React Native ব্যবহার করি যা দিয়ে একটি codebase থেকে iOS এবং Android দুটো app তৈরি হয়। ফলে cost অনেক কম।" },
  { q: "App Store এবং Play Store-এ publish করবে?", a: "হ্যাঁ। উভয় store-এ publish করা service-এর অন্তর্ভুক্ত। App Store-এর জন্য Apple Developer account (USD 99/year) এবং Play Store-এর জন্য Google Play account (USD 25, one-time) লাগবে।" },
  { q: "bKash/Nagad payment app-এ integrate করা যাবে?", a: "হ্যাঁ। bKash Payment Gateway API এবং Nagad API দিয়ে in-app payment integration করা হয়।" },
  { q: "MVP মানে কী?", a: "MVP (Minimum Viable Product) মানে আপনার সবচেয়ে core features নিয়ে একটি working app — যা দিয়ে আপনি market validate করতে পারবেন। Complete product-এর চেয়ে অনেক কম time এবং cost-এ।" },
  { q: "Backend/Admin panel কি থাকবে?", a: "হ্যাঁ, e-commerce এবং booking app-এ admin dashboard include করা হয়। MVP-তে basic backend থাকে।" },
  { q: "Payment structure কী?", a: "৩০% advance, milestone অনুযায়ী ৪০%, এবং launch-এর সময় বাকি ৩০%।" },
  { q: "After launch কি support পাব?", a: "হ্যাঁ, launch-এর পর ৩০ দিন free bug fix support। Ongoing maintenance-এর জন্য monthly retainer plan available।" },
  { q: "Notification feature কি থাকবে?", a: "হ্যাঁ, push notification (Firebase Cloud Messaging) integration করা হয়।" },
  { q: "App-এর data কোথায় store হবে?", a: "আমরা PostgreSQL বা Firebase database ব্যবহার করি। Data Bangladesh-এ বা secure cloud server-এ store করা হয়।" },
  { q: "কতদিনে app তৈরি হবে?", a: "MVP: 21–30 days, E-Commerce: 30–45 days, Booking: 25–35 days। Complexity অনুযায়ী সময় vary করতে পারে।" },
];

export default function AppDevelopment() {
  usePageMeta({
    title: "App Development Bangladesh — Mobile App from ৳29,999",
    description: "Professional iOS & Android app development in Bangladesh from ৳29,999. React Native, e-commerce apps, booking apps, MVP builds. Pay via bKash/Nagad. AI Team Premium.",
    path: "/services/app-development",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "App Development", path: "/services/app-development" },
      ]} />
      <FAQSchema items={FAQS} />
      <ProductSchema
        name="App Development Services Bangladesh"
        description="Professional iOS and Android app development from ৳29,999. React Native, e-commerce, booking apps. Pay via bKash/Nagad. AI Team Premium."
        path="/services/app-development"
        priceBDT={29999}
        category="App Development Service"

      />

      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Smartphone size={13} /> iOS & Android · React Native
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            📱 App Development — <span style={{ color: BRAND.blue }}>৳২৯,৯৯৯</span> থেকে
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            iOS এবং Android উভয়ের জন্য cross-platform app — MVP থেকে full e-commerce app পর্যন্ত।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+App+Development+services+from+AITP" target="_blank" rel="noopener noreferrer" data-testid="button-hero-app" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-hero-app-messenger" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base" style={{ background: "#0084FF" }}>
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Smartphone size={16} color={BRAND.blue} />, text: "iOS + Android" },
              { icon: <Check size={16} color={BRAND.blue} />, text: "bKash/Nagad Integration" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "30-Day Bug Fix" },
              { icon: <Clock size={16} color={BRAND.blue} />, text: "21–45 Day Delivery" },
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
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: BRAND.navy }}>App Types & Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {APP_TYPES.map((at) => (
              <div key={at.title} className="rounded-2xl p-6" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
                <div className="text-3xl mb-3">{at.emoji}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg" style={{ color: BRAND.navy }}>{at.title}</h3>
                  <span className="text-lg font-bold" style={{ color: BRAND.blue }}>{at.price}</span>
                </div>
                <p className="text-sm mb-3" style={{ color: BRAND.navy, opacity: 0.6 }}>{at.desc}</p>
                <div className="flex items-center gap-1 text-xs font-medium" style={{ color: BRAND.blue }}>
                  <Clock size={12} /> {at.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: BRAND.navy }}>Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH.map((tech) => (
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
          <p className="text-white/50 mb-8">আপনার app idea নিয়ে WhatsApp করুন — free consultation দেওয়া হবে।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/8801533262758?text=Hi%2C+I%27m+interested+in+App+Development+services+from+AITP" target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-app" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#25D366" }}>
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a href={config.messenger} target="_blank" rel="noopener noreferrer" data-testid="button-final-cta-app-messenger" className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg" style={{ background: "#0084FF" }}>
              <MessageCircle size={20} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
