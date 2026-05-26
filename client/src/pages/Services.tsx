import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { supportOffers, memberships } from "@/lib/support-offers";
import { Check, ArrowUpRight, Clock, Star, Users, Briefcase, GraduationCap, ShieldCheck, MessageCircle, Paintbrush, Code, TrendingUp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";
import { Link } from "wouter";

export default function Services() {
  usePageMeta({
    title: "AI Support & Training in Bangladesh — Live ChatGPT Help (৳799/hr)",
    description: "Book live AI training and ChatGPT support sessions in Bangladesh from ৳799/hour. Student packs (৳1,999), freelancer packs (৳4,999), business AI setup (৳12,999). Live Google Meet in Bangla.",
    path: "/support",
  });

  const faqs = [
    {
      q: "সাপোর্ট সেশনটি কিভাবে হবে?",
      a: "সেশনটি গুগল মিট (Google Meet) এর মাধ্যমে লাইভ হবে। আপনি আপনার স্ক্রিন শেয়ার করতে পারবেন এবং আমাদের এক্সপার্ট আপনাকে সরাসরি গাইড করবেন।"
    },
    {
      q: "আমি কি বাংলায় কথা বলতে পারব?",
      a: "হ্যাঁ, আমাদের সব সাপোর্ট সেশন সম্পূর্ণ বাংলায় হবে। প্রয়োজনে ইংরেজি টার্মগুলো সহজভাবে বুঝিয়ে দেওয়া হবে।"
    },
    {
      q: "সেশনের পর কি কোন রিসোর্স পাব?",
      a: "অবশ্যই। প্রতিটি সেশনের পর আপনি আপনার কাজের উপযোগী একটি কাস্টম Prompt Pack এবং Workflow ডকুমেন্ট পাবেন।"
    },
    {
      q: "আমি একজন স্টুডেন্ট, আমার জন্য কোন প্যাকটি ভালো হবে?",
      a: "স্টুডেন্টদের জন্য আমাদের 'Student Smart Study Pack' আছে যা এসাইনমেন্ট এবং রিসার্চের কাজে খুব কার্যকর। সিরিয়াস লার্নিং এর জন্য 'Student Pro Pack' নিতে পারেন।"
    },
    {
      q: "পেমেন্ট কিভাবে করতে হবে?",
      a: "আপনি বিকাশ বা নগদের মাধ্যমে পেমেন্ট করতে পারবেন। পেমেন্ট করার পর ৫-১৫ মিনিটের মধ্যে আমরা সেশন টাইম কনফার্ম করি।"
    },
    {
      q: "সেশন কি রেকর্ড করা যাবে?",
      a: "হ্যাঁ, আপনি চাইলে আপনার শেখার সুবিধার জন্য সেশনটি রেকর্ড করে রাখতে পারেন।"
    },
    {
      q: "আমার যদি একাধিক ডিভাইসে সাপোর্ট লাগে?",
      a: "সেশন চলাকালীন আমরা আপনার নির্দিষ্ট প্রবলেম সলভ করে দিব। সেটি যে কোন ডিভাইসের জন্যই হতে পারে।"
    },
    {
      q: "সেশন শেষে কি কোন গ্যারান্টি আছে?",
      a: "আমরা ডেলিভারেবল (Prompt/Workflow) গ্যারান্টি দেই। যদি আপনি আপনার প্যাক অনুযায়ী ডেলিভারেবল না পান, তবে আমরা ফ্রি ফলো-আপ সেশন প্রদান করি।"
    }
  ];

  const categories = [
    { id: 'entry', label: 'Entry' },
    { id: 'student', label: 'Students' },
    { id: 'freelancer', label: 'Freelancers' },
    { id: 'business', label: 'Business' }
  ];

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "AI Support & Services", path: "/support" }]} />
      <FAQSchema items={faqs} />
      <ProductSchema
        name="AI Training Sessions Bangladesh"
        description="Live Bangla AI training and ChatGPT support sessions from ৳799/hour. Student packs (৳1,999), freelancer packs (৳4,999), business AI setup (৳12,999). AI Team Premium BD."
        path="/support"
        priceBDT={799}
        category="AI Training Service"
        rating={{ value: "4.9", count: "84" }}
      />
      <section className="py-8" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", fontSize: "0.78rem" }}>
              <Clock size={12} /> সকাল ৯টা – রাত ১১টা · ৭ দিন · 9 AM – 11 PM BST · 7 days a week
            </span>
          </div>
          <div className="rounded-2xl p-6 md:p-7" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "1rem", lineHeight: 1.7, fontWeight: 500 }}>
              <strong>AI Team Premium BD</strong> offers live, Bangla-language AI training and ChatGPT support sessions in Bangladesh. Hourly sessions start at <strong>৳799/hour</strong>, student packs from <strong>৳1,999</strong>, freelancer packs from <strong>৳4,999</strong>, and full business AI setup from <strong>৳12,999</strong> — delivered live over Google Meet by Bangladeshi AI experts, with prompt packs and workflow documents included.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: BRAND.navy }}>Digital Services</h2>
          <p className="text-center text-sm mb-10" style={{ color: BRAND.navy, opacity: 0.5 }}>Brand design, web development, digital marketing, and app development — all in one place.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Paintbrush, label: "Brand Design", sub: "from ৳4,999", href: "/services/brand-design", emoji: "🎨" },
              { icon: Code, label: "Web Development", sub: "from ৳7,999", href: "/services/web-development", emoji: "🌐" },
              { icon: TrendingUp, label: "Digital Marketing", sub: "from ৳9,999/mo", href: "/services/digital-marketing", emoji: "📢" },
              { icon: Smartphone, label: "App Development", sub: "from ৳29,999", href: "/services/app-development", emoji: "📱" },
            ].map((svc) => (
              <Link key={svc.href} href={svc.href} data-testid={`card-service-${svc.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="rounded-2xl p-5 text-center cursor-pointer transition-all hover:shadow-md" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }}>
                  <div className="text-3xl mb-2">{svc.emoji}</div>
                  <div className="font-bold text-sm mb-1" style={{ color: BRAND.navy }}>{svc.label}</div>
                  <div className="text-xs" style={{ color: BRAND.blue, fontWeight: 600 }}>{svc.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h1 className="mb-6 font-bold leading-tight" style={{ color: BRAND.navy, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            শুধু সাবস্ক্রিপশন নয় — আমরা ব্যবহার শিখাই
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg font-medium" style={{ color: BRAND.navy, opacity: 0.8 }}>
            আপনার নির্দিষ্ট কাজকে AI দিয়ে সহজ করার জন্য আমরা দিচ্ছি লাইভ ও কাস্টম সাপোর্ট। 
            <span className="block mt-2 opacity-60">Human-led live sessions to master AI tools for your specific needs.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-book-now"
              className="inline-flex items-center gap-2 rounded-full px-7 h-12 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-book-now-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 h-12 font-bold text-white text-base"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
            <Button size="lg" variant="outline" className="rounded-full px-7 h-12" style={{ borderColor: BRAND.blue, color: BRAND.blue }} asChild data-testid="button-start-project">
              <a href={config.supportFormUrl}>প্রজেক্ট শুরু করুন</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="border-y bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: BRAND.navy }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND.blue }} />
              🇧🇩 বাংলায় সাপোর্ট
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: BRAND.navy }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND.blue }} />
              📦 Prompt Pack + Workflow
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: BRAND.navy }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND.blue }} />
              🎥 Google Meet লাইভ
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: BRAND.navy }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND.blue }} />
              💳 bKash/Nagad
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold mb-16 text-center" style={{ color: BRAND.navy }}>কিভাবে কাজ করে?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {[
              { step: "০১", title: "প্যাক নির্বাচন করুন", desc: "আপনার প্রয়োজন অনুযায়ী প্যাক সিলেক্ট করে হোয়াটসঅ্যাপে জানান।" },
              { step: "০২", title: "পেমেন্ট ও সময় নির্ধারণ", desc: "বিকাশ বা নগদে পেমেন্ট করার পর গুগল মিট সেশনের সময় ঠিক করুন।" },
              { step: "০৩", title: "লাইভ সাপোর্ট সেশন", desc: "আপনার সমস্যার লাইভ সমাধান এবং কিভাবে করতে হবে তা শিখে নিন।" },
              { step: "০৪", title: "ডেলিভারেবল গ্রহণ", desc: "সেশন শেষে কাস্টম প্রম্পট প্যাক ও ওয়ার্কফ্লো ডকুমেন্ট বুঝে নিন।" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl font-bold transition-transform group-hover:scale-110" style={{ background: BRAND.sky, color: BRAND.blue }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: BRAND.navy }}>{item.title}</h3>
                <p className="text-sm opacity-70" style={{ color: BRAND.navy }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24" style={{ background: "rgba(15, 23, 42, 0.02)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold mb-16 text-center" style={{ color: BRAND.navy }}>সাপোর্ট প্যাকেজসমূহ</h2>
          
          <div className="space-y-20">
            {categories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-xl font-bold mb-8 inline-block px-4 py-1 rounded-full" style={{ background: BRAND.blue, color: BRAND.white }}>
                  {cat.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {supportOffers.filter(offer => offer.category === cat.id).map((offer) => (
                    <Card key={offer.slug} className="flex flex-col border-2 rounded-2xl overflow-hidden hover-elevate bg-white" data-testid={`card-support-${offer.slug}`}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.blue }}>{offer.target}</p>
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <CardTitle className="text-xl" style={{ color: BRAND.navy }}>{offer.title}</CardTitle>
                        <div className="mt-4">
                          <span className="text-3xl font-bold" style={{ color: BRAND.navy }}>{offer.priceLabel}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col pt-0">
                        <div className="flex items-center gap-4 text-xs font-semibold mb-6 opacity-60" style={{ color: BRAND.navy }}>
                          <span className="flex items-center gap-1"><Clock size={14} /> {offer.sessions}</span>
                          <span className="flex items-center gap-1"><Check size={14} /> {offer.platform}</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                          {offer.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: BRAND.navy }}>
                              <Check size={16} className="mt-0.5 shrink-0" style={{ color: BRAND.blue }} strokeWidth={3} />
                              <span className="opacity-80">{d}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mb-6 p-3 rounded-xl bg-green-50 flex items-start gap-2 border border-green-100">
                          <ShieldCheck size={16} className="text-green-600 shrink-0 mt-0.5" />
                          <p className="text-[11px] leading-relaxed text-green-800 font-medium">{offer.guarantee}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <a
                            href={config.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-order-${offer.slug}`}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full h-11 font-bold text-white text-sm"
                            style={{ background: "#25D366" }}
                          >
                            <WhatsAppIcon size={16} color="#fff" /> {offer.ctaText}
                          </a>
                          <a
                            href={config.messenger}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-order-msg-${offer.slug}`}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full h-10 font-bold text-white text-sm"
                            style={{ background: "#0084FF" }}
                          >
                            <MessageCircle size={14} color="#fff" /> Or Messenger
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: BRAND.navy }}>সাপোর্ট মেম্বারশিপ</h2>
            <p className="text-lg opacity-70" style={{ color: BRAND.navy }}>দীর্ঘমেয়াদী সাপোর্টের জন্য আমাদের মেম্বারশিপ প্ল্যানগুলো দেখুন</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {memberships.map((m) => (
              <Card key={m.slug} className="text-center p-8 border-2 rounded-2xl bg-white hover-elevate" data-testid={`card-membership-${m.slug}`}>
                <h3 className="text-xl font-bold mb-2" style={{ color: BRAND.navy }}>{m.title}</h3>
                <p className="text-3xl font-bold mb-6" style={{ color: BRAND.blue }}>{m.priceLabel}</p>
                <div className="space-y-4 mb-8 text-sm font-medium" style={{ color: BRAND.navy, opacity: 0.8 }}>
                  <p className="pb-4 border-b">{m.hours} Hours Live Support</p>
                  <p>{m.extras}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={config.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`button-join-${m.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full h-11 font-bold text-white text-sm"
                    style={{ background: "#25D366" }}
                  >
                    <WhatsAppIcon size={16} color="#fff" /> Join via WhatsApp
                  </a>
                  <a
                    href={config.messenger}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`button-join-msg-${m.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full h-10 font-bold text-white text-sm"
                    style={{ background: "#0084FF" }}
                  >
                    <MessageCircle size={14} color="#fff" /> Or Messenger
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-12 text-center text-sm font-medium opacity-60" style={{ color: BRAND.navy }}>
            * অব্যবহৃত ঘন্টা সর্বোচ্চ ৭ দিন carry forward হবে
          </p>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-3xl p-8 rounded-2xl border-2 border-green-200 bg-green-50 text-center">
          <ShieldCheck size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold mb-4 text-green-900">ডেলিভারেবল ও সার্ভিস গ্যারান্টি</h2>
          <p className="text-green-800 leading-relaxed font-medium">
            আমরা প্রতিটি সেশন শেষে কাস্টম প্রম্পট প্যাক এবং ওয়ার্কফ্লো ডকুমেন্ট প্রদান করি। যদি আপনি আপনার প্যাকেজ অনুযায়ী ডেলিভারেবল না পান, তবে আমরা অতিরিক্ত একটি ফ্রি ফলো-আপ সেশন প্রদান করব। আমাদের লক্ষ্য আপনার সমস্যার সঠিক ও স্থায়ী সমাধান।
          </p>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold mb-16 text-center" style={{ color: BRAND.navy }}>কাদের জন্য এই সাপোর্ট?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "ছাত্রছাত্রী", desc: "এসাইনমেন্ট, রিসার্চ এবং ক্লিয়ার কনসেপ্টের জন্য AI ব্যবহার শিখুন।" },
              { icon: Briefcase, title: "ফ্রিল্যান্সার", desc: "দ্রুত প্রপোজাল রাইটিং এবং প্রজেক্ট ডেলিভারি নিশ্চিত করুন।" },
              { icon: Users, title: "জব সিকার", desc: "প্রফেশনাল সিভি এবং ইন্টারভিউ প্রিপারেশনকে AI দিয়ে নেক্সট লেভেলে নিন।" },
              { icon: Briefcase, title: "বিজনেস", desc: "সেলস ও কাস্টমার সার্ভিস অটোমেশনের মাধ্যমে ব্যবসার খরচ কমান।" }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-2 rounded-2xl transition-all hover:border-blue-200">
                <item.icon size={32} className="mb-4" style={{ color: BRAND.blue }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: BRAND.navy }}>{item.title}</h3>
                <p className="text-sm opacity-70" style={{ color: BRAND.navy }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24" style={{ background: "rgba(15, 23, 42, 0.02)" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: BRAND.navy }}>প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border-b-2 border-slate-200">
                <AccordionTrigger className="text-left py-6 text-lg font-bold hover:no-underline" style={{ color: BRAND.navy }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base pb-6 opacity-80" style={{ color: BRAND.navy }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-4xl font-bold mb-8" style={{ color: BRAND.navy }}>আজকেই শুরু করুন</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-final-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-final-messenger"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 font-bold text-white text-lg"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={20} color="#fff" /> Messenger
            </a>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg" style={{ borderColor: BRAND.blue, color: BRAND.blue }} asChild data-testid="button-final-form">
              <a href={config.supportFormUrl}>ফর্ম পূরণ করুন</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
