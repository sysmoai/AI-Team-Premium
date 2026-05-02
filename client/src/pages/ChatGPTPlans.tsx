import { usePageMeta } from "@/hooks/use-page-meta";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { chatgptPlans } from "@/lib/plans";
import { config } from "@/lib/config";
import { SupportUpsell } from "@/components/SupportUpsell";
import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { 
  MessageCircle, 
  Zap, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Check, 
  X,
  ChevronDown,
  ShoppingBag,
  Info,
  ArrowRight
} from "lucide-react";
import { useState, useRef } from "react";

export default function ChatGPTPlans() {
  usePageMeta({
    title: "ChatGPT Plans in Bangladesh 2026 — ৳৩৯৯ থেকে",
    description: "বাংলাদেশে সরাসরি bKash/Nagad দিয়ে ChatGPT Plus, Business এবং Pro সাবস্ক্রিপশন কিনুন। ৫-১৫ মিনিটে ডেলিভারি ও ৩০ দিনের ওয়ারেন্টি।"
  });

  const [activePlanSlug, setActivePlanSlug] = useState<string | null>(null);
  const planRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToPlan = (slug: string) => {
    setActivePlanSlug(slug);
    planRefs.current[slug]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const trustItems = [
    { icon: <Zap className="w-5 h-5" />, text: "⚡ Instant Delivery (5-15 min)" },
    { icon: <CreditCard className="w-5 h-5" />, text: "💳 bKash/Nagad" },
    { icon: <MessageCircle className="w-5 h-5" />, text: "💬 WhatsApp Support" },
    { icon: <ShieldCheck className="w-5 h-5" />, text: "🛡️ 30-Day Warranty" },
  ];

  const quickSelectors = [
    { label: "সস্তায় Plus চাই", slug: "plus-shared" },
    { label: "একটু stable চাই", slug: "plus-premium-shared" },
    { label: "নিজের account চাই", slug: "plus-personal-seat" },
    { label: "টিমের জন্য চাই", slug: "business-personal-like" },
    { label: "সস্তায় Business চাই", slug: "business-shared" },
    { label: "Stable Business চাই", slug: "business-premium-shared" },
    { label: "সবচেয়ে powerful চাই", slug: "pro-premium-shared" },
  ];

  const faqs = [
    { q: "ChatGPT Plus কী?", a: "ChatGPT Plus হলো OpenAI-এর একটি paid subscription যা GPT-4o, DALL-E 3, web browsing, file upload, voice mode সহ অনেক advanced feature দেয়। Free-এর তুলনায় অনেক দ্রুত এবং শক্তিশালী।" },
    { q: "Shared Seat মানে কী?", a: "Shared Seat মানে একটি account-এ আমরা limited number of users add করি। এটি cost কমায়, কিন্তু একটি device থেকে ব্যবহার করতে হবে এবং password জানার সুযোগ নেই।" },
    { q: "Personal Seat Shared-এর চেয়ে আলাদা কীভাবে?", a: "Personal Seat মানে account টি আপনার নিজের নামে। আপনি password জানেন, যেকোনো device থেকে login করতে পারেন, billing আপনার control-এ। তবে দাম বেশি।" },
    { q: "কতক্ষণে access পাবো?", a: "Shared ও Pro plan-এ payment confirm হলে ৫-১৫ মিনিটের মধ্যে WhatsApp-এ login details পাঠানো হয়। Business plan-এ সর্বোচ্চ ১২ ঘন্টা লাগতে পারে।" },
    { q: "bKash বা Nagad-এ কীভাবে পেমেন্ট করবো?", a: "WhatsApp-এ অর্ডার করলে আমরা আপনাকে bKash/Nagad নম্বর দেব। Privacy-র জন্য পেমেন্ট নম্বর publicly শেয়ার করা হয় না।" },
    { q: "Account কি officially ChatGPT থেকে?", a: "হ্যাঁ! আমরা official OpenAI accounts ব্যবহার করি। কোনো cracked বা fake access নয়।" },
    { q: "একাধিক device-এ ব্যবহার করা যাবে?", a: "Shared account-এ একটি device থেকে একসাথে ব্যবহার করতে হবে। Personal Seat-এ কোনো restriction নেই।" },
    { q: "Account ban হলে কী হবে?", a: "Rules মেনে চললে ban হওয়ার সম্ভাবনা নেই। তবে misuse বা multiple device ব্যবহারে ban হলে warranty void হয়ে যাবে।" },
    { q: "Password change করতে পারবো?", a: "Shared account-এ password change করা strictly prohibited — এতে warranty void হয়। Personal Seat-এ আপনি যা খুশি করতে পারেন।" },
    { q: "Refund policy কী?", a: "Subscription ফি refundable নয়। তবে কাজ না করলে আমরা 24 ঘন্টার মধ্যে replace করি। বিস্তারিত আমাদের Refund Policy পেজে আছে।" },
    { q: "30-day warranty মানে কী?", a: "আপনি যে 30 দিনের জন্য সাবস্ক্রিপশন নিয়েছেন, সেই পুরো সময় account কাজ না করলে আমরা replace করব। Misuse হলে warranty প্রযোজ্য নয়।" },
    { q: "ChatGPT Pro কি Plus থেকে ভালো?", a: "হ্যাঁ, Pro সবচেয়ে শক্তিশালী plan। GPT-5.2 unlimited access, 256K context, priority speed — সব কিছুতেই Pro এগিয়ে। তবে দামও বেশি (৳৪,৫০০)।" },
    { q: "Business Plan কি Plus থেকে আলাদা?", a: "ChatGPT Business-এ admin console, SSO, 60+ integrations, HIPAA eligibility আছে। এটি team/workspace model। ChatGPT Plus individual use-এর জন্য।" },
    { q: "কীভাবে order করবো?", a: "WhatsApp-এ মেসেজ করুন বা Facebook-এ যোগাযোগ করুন। আমরা plan confirm করে bKash/Nagad নম্বর দেব। Payment হলে ৫-১৫ মিনিটে access পাবেন।" },
    { q: "Memory feature কি আছে?", a: "হ্যাঁ, ChatGPT Plus-এ memory feature available। ChatGPT আপনার previous conversations মনে রাখবে এবং personalized response দেবে।" },
    { q: "DALL-E image generation কি কাজ করবে?", a: "হ্যাঁ! Plus, Pro এবং Business সব plan-এই DALL-E 3 image generation available।" },
    { q: "GPT-4o কি GPT-5 থেকে আলাদা?", a: "GPT-4o বর্তমান standard model। GPT-5.2 শুধু Pro plan-এ unlimited access আছে। Plus-এ GPT-5 limited access পাওয়া যায়।" },
    { q: "Upgrade করা যাবে?", a: "হ্যাঁ! বর্তমান plan শেষ হলে বা মাঝপথে upgrade করতে চাইলে WhatsApp-এ জানান। আমরা difference calculate করে upgrade করে দেব।" },
    { q: "বাংলায় support পাবো?", a: "অবশ্যই! আমাদের পুরো team বাংলায় communicate করে। ১০০% Bangla support।" },
    { q: "Login করতে না পারলে কী করবো?", a: "সঙ্গে সঙ্গে WhatsApp-এ জানান। আমরা ৩০ মিনিটের মধ্যে সমস্যা সমাধান করব বা নতুন access দেব।" },
    { q: "Business plan-এর জন্য কি team members লাগবে?", a: "Business plan workspace invite model-এ কাজ করে। আপনাকে workspace-এ invite করা হবে। OpenAI directly minimum 2 seats বিক্রি করে, কিন্তু আমরা local pricing-এ দিই।" },
    { q: "কোন plan টি আমার জন্য সবচেয়ে ভালো?", a: "Student/beginner হলে Plus Shared (৳৩৯৯)। Freelancer/creator হলে Plus Premium Shared (৳৯৫০)। Power user হলে Plus Personal (৳২,৯৫০) বা Pro (৳৪,৫০০)। Team হলে Business plan।" },
    { q: "Security কতটুকু নিরাপদ?", a: "আমরা trusted accounts ব্যবহার করি। Shared account-এ আপনার personal data সুরক্ষিত — অন্য users আপনার conversation দেখতে পারে না।" },
    { q: "প্রতি মাসে কি automatically renew হবে?", a: "না। প্রতিটি subscription ৩০ দিনের জন্য। Renewal চাইলে WhatsApp-এ আগেই জানান।" },
    { q: "ChatGPT কি বাংলায় কথা বলতে পারে?", a: "হ্যাঁ! ChatGPT বাংলায় চমৎকার responses দেয়। আপনি বাংলায় প্রশ্ন করুন, বাংলায় উত্তর পাবেন।" },
  ];

  const comparisonFeatures = [
    { name: "GPT model access", free: "Basic", plus: "Advanced (4o)", pro: "Unlimited (5.2)", business: "Advanced (4o)" },
    { name: "Image generation (DALL-E)", free: false, plus: true, pro: true, business: true },
    { name: "Web browsing", free: false, plus: true, pro: true, business: true },
    { name: "File uploads", free: false, plus: true, pro: true, business: true },
    { name: "Deep Research", free: false, plus: true, pro: true, business: true },
    { name: "Projects/Memory", free: false, plus: true, pro: true, business: true },
    { name: "Voice mode", free: false, plus: true, pro: true, business: true },
    { name: "Image editing", free: false, plus: true, pro: true, business: true },
    { name: "Video generation (Sora)", free: false, plus: "Limited", pro: "Full", business: "Full" },
    { name: "API access", free: false, plus: false, pro: true, business: true },
    { name: "Admin console", free: false, plus: false, pro: false, business: true },
    { name: "256K context", free: false, plus: false, pro: true, business: false },
    { name: "Unlimited usage", free: false, plus: false, pro: true, business: false },
  ];

  const renderCheck = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />;
    }
    return <span className="text-sm font-medium">{val}</span>;
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Team Premium BD",
    "url": "https://aiteampremiumbd.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801533262758",
      "contactType": "sales",
      "availableLanguage": ["Bengali", "English"]
    },
    "areaServed": "BD",
    "sameAs": ["https://www.facebook.com/profile.php?id=61586742067282"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <Layout>
    <div className="flex flex-col gap-0 pb-20">
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* 1. HERO */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: BRAND.sky }}>
        <div className="container px-4 mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6" style={{ color: BRAND.navy }}>
            বাংলাদেশে ChatGPT — <span style={{ color: BRAND.blue }}>৳৩৯৯</span> থেকে শুরু
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto">
            Get official ChatGPT Plus, Business, and Pro subscriptions with local bKash/Nagad payment and instant delivery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle className="w-5 h-5" /> Messenger
            </a>
            <Button size="lg" variant="outline" className="h-12 px-7 text-base font-bold gap-2" onClick={() => planRefs.current["plus-shared"]?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-hero-plans">
              প্যাকগুলো দেখুন
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <div className="border-y bg-white">
        <div className="container px-4 py-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-navy">
                <span style={{ color: BRAND.blue }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. QUICK PLAN SELECTOR */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">আপনার কোনটি প্রয়োজন?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {quickSelectors.map((item) => (
              <Button 
                key={item.slug} 
                variant="outline" 
                className={`rounded-full hover-elevate ${activePlanSlug === item.slug ? 'border-blue-600 bg-blue-50' : ''}`}
                onClick={() => scrollToPlan(item.slug)}
                data-testid={`selector-${item.slug}`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLAN CARDS GRID */}
      <section className="py-20 bg-gray-50/50">
        <div className="container px-4 mx-auto">
          {["Plus", "Business", "Pro"].map((planType) => (
            <div key={planType} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-border" />
                <h2 className="text-3xl font-bold text-navy" style={{ color: BRAND.navy }}>ChatGPT {planType} Tiers</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chatgptPlans.filter(p => p.plan === planType).map((plan) => (
                  <Card 
                    key={plan.slug}
                    ref={el => planRefs.current[plan.slug] = el}
                    className={`relative flex flex-col transition-all duration-300 ${plan.badge === "Most Popular" ? "border-2 border-blue-500 shadow-xl scale-105 z-10" : ""} ${activePlanSlug === plan.slug ? "ring-2 ring-blue-600 ring-offset-4" : ""}`}
                    data-testid={`card-plan-${plan.slug}`}
                  >
                    {plan.badge && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm bg-blue-600 text-white">
                        {plan.badge}
                      </Badge>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-xl mb-2">{plan.title}</CardTitle>
                      <div className="text-4xl font-extrabold text-blue-600 mb-2">{plan.priceLabel}</div>
                      <CardDescription>{plan.duration} Subscription</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm border-y py-4">
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {plan.deliverySLA}</div>
                        <div className="flex items-center gap-2 text-right justify-end"><ShoppingBag className="w-4 h-4" /> {plan.seats} Seats</div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{plan.deviceRule}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{plan.accessType === "shared" ? "Shared access" : "Private access"}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{plan.targetBuyer}</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 pb-8">
                      <a
                        href={`${config.whatsappUrl}?text=${encodeURIComponent((config as any).whatsappPlanTemplates?.[plan.slug] || `Hi, I want to order ${plan.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`button-order-${plan.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md py-2.5 font-bold text-white text-sm"
                        style={{ background: "#25D366" }}
                      >
                        <WhatsAppIcon size={15} color="#fff" /> Order on WhatsApp
                      </a>
                      <a
                        href={config.messenger}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`button-order-msg-${plan.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md py-2.5 font-bold text-white text-sm"
                        style={{ background: "#0084FF" }}
                      >
                        <MessageCircle className="w-4 h-4" /> Or Messenger
                      </a>
                      <Button variant="ghost" className="w-full text-blue-600" asChild data-testid={`link-details-${plan.slug}`}>
                        <Link href={`/chatgpt/${plan.slug}`}>
                          Details & Rules <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OFFICIAL vs LOCAL PRICING */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl font-bold mb-6 text-navy">কেন আমাদের সার্ভিস প্রয়োজন?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg">OpenAI থেকে সরাসরি কিনতে গেলে অধিকাংশ বাংলাদেশি ইউজার ৩টি সমস্যার সম্মুখীন হন:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span>No International Credit/Debit Card</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span>USD Conversion & High Bank Rates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span>3DS Verification Failures</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-lg font-semibold text-blue-700">আমাদের সমাধান:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Pay with bKash, Nagad or Rocket</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Instant Delivery in 5-15 Minutes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Full 30-Day Replacement Warranty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO BUY */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">কিভাবে কিনবেন? (How to Buy)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "১", title: "প্যাক পছন্দ করুন", desc: "আপনার প্রয়োজন অনুযায়ী সেরা প্যাকটি সিলেক্ট করুন" },
              { step: "২", title: "WhatsApp এ মেসেজ দিন", desc: "অর্ডার বাটনে ক্লিক করে আমাদের WhatsApp এ মেসেজ দিন" },
              { step: "৩", title: "পেমেন্ট করুন", desc: "bKash বা Nagad এর মাধ্যমে পেমেন্ট কনফার্ম করুন" },
              { step: "৪", title: "ডেলিভারি নিন", desc: "৫-১৫ মিনিটের মধ্যে আপনার লগইন ডিটেইলস পেয়ে যাবেন" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Feature Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-bold border-b min-w-[200px]">Features</th>
                  <th className="p-4 text-center font-bold border-b min-w-[120px]">Free</th>
                  <th className="p-4 text-center font-bold border-b min-w-[120px] bg-blue-50">Plus</th>
                  <th className="p-4 text-center font-bold border-b min-w-[120px]">Pro</th>
                  <th className="p-4 text-center font-bold border-b min-w-[120px]">Business</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((f, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 border-b font-medium">{f.name}</td>
                    <td className="p-4 border-b text-center">{renderCheck(f.free)}</td>
                    <td className="p-4 border-b text-center bg-blue-50/30">{renderCheck(f.plus)}</td>
                    <td className="p-4 border-b text-center">{renderCheck(f.pro)}</td>
                    <td className="p-4 border-b text-center">{renderCheck(f.business)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. SUPPORT UPSELL BLOCK */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <SupportUpsell />
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. FOOTER CTA */}
      <section className="py-20 border-t bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">আজই আপনার ChatGPT প্যাকটি বুঝে নিন</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp"
              className="inline-flex items-center gap-3 rounded-md h-14 px-8 text-lg font-bold text-white"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={22} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-messenger"
              className="inline-flex items-center gap-3 rounded-md h-14 px-8 text-lg font-bold text-white"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle className="w-6 h-6" /> Messenger
            </a>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold gap-3" asChild data-testid="footer-facebook">
              <a href={config.facebook} target="_blank" rel="noopener noreferrer">
                Facebook Page
              </a>
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            By ordering, you agree to our <Link href="/refund-policy" className="text-blue-600 hover:underline">Refund & Replacement Policy</Link>.
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
}
