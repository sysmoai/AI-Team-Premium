import ToolPlansPage, { ToolPageData } from "@/components/ToolPlansPage";

const data: ToolPageData = {
  seoTitle: "Canva Pro Bangladesh — ৳599/mo | AI Team Premium BD",
  seoDescription: "Buy Canva Pro in Bangladesh via bKash/Nagad. Monthly and annual plans from ৳599/month. AI Magic Write, premium templates, 1TB storage.",
  heroBanglaTitle: "বাংলাদেশে Canva Pro — ৳৫৯৯ থেকে শুরু",
  subtitle: "Full Canva Pro with AI image generation, premium templates, and Magic Write. bKash/Nagad.",
  plans: [
    {
      name: "Canva Pro — Monthly",
      price: "৳599/month",
      delivery: "2–4 hours",
      seats: "1 individual account",
      tag: "Best for Designers",
      popular: true,
      features: [
        "100M+ premium templates & assets",
        "AI Magic Write (text generation)",
        "Magic Edit & Magic Erase",
        "Background Remover tool",
        "Brand Kit — fonts, colors, logos",
        "1TB cloud storage",
        "Schedule social media posts",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Canva+Pro+%E2%98%85599%2Fmo",
    },
    {
      name: "Canva Pro — Annual",
      price: "৳4,999/year",
      delivery: "2–4 hours",
      seats: "1 individual account (12 months)",
      tag: "Best Value",
      features: [
        "All monthly Pro features",
        "12 months full access",
        "100M+ premium templates",
        "All AI Magic tools included",
        "Brand Kit & 1TB storage",
        "Priority support",
        "bKash / Nagad payment accepted",
      ],
      whatsappUrl: "https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+Canva+Pro+Annual",
    },
  ],
  aboutText:
    "Canva Pro হলো সবচেয়ে জনপ্রিয় online design tool। AI-powered Magic Write, Magic Edit, Background Remover সহ ১০ কোটিরও বেশি premium template পাওয়া যায়। Designers, content creators, এবং social media managers-দের জন্য এটি অপরিহার্য।",
  whoIsItFor: ["Graphic Designers", "Content Creators", "Social Media Managers", "Freelancers", "Agencies", "Students"],
  faqs: [
    { q: "Canva Pro কি free version থেকে অনেক বেশি সুবিধা দেয়?", a: "হ্যাঁ! Free version-এ limited templates ও features আছে। Pro-তে 100M+ assets, AI Magic tools, background remover, brand kit, 1TB storage পাওয়া যায়।" },
    { q: "Magic Write কী?", a: "Magic Write হলো Canva-র AI text generator। Design-এর মধ্যেই copywriting, social caption, blog post — সব লেখা যায়।" },
    { q: "Background Remover কীভাবে কাজ করে?", a: "যেকোনো image upload করলে একক click-এ background remove হয়ে যায়। Product photography, profile pictures-এর জন্য অত্যন্ত useful।" },
    { q: "Annual plan কি সাশ্রয়ী?", a: "হ্যাঁ! Monthly plan ১২ মাসে ৭,১৮৮ টাকা হয়, কিন্তু Annual plan মাত্র ৪,৯৯৯ টাকা — প্রায় ৩০% সাশ্রয়।" },
    { q: "Delivery কতক্ষণ লাগে?", a: "২-৪ ঘণ্টার মধ্যে account setup করে দেওয়া হয়।" },
    { q: "Mobile-এ Canva Pro ব্যবহার করা যাবে?", a: "হ্যাঁ, Canva-র iOS ও Android app-এ Pro features সব পাওয়া যায়।" },
    { q: "Brand Kit কী?", a: "Brand Kit-এ আপনার brand-এর font, color palette, logo store করে রাখা যায়। সব design-এ automatically apply হয়।" },
    { q: "Payment কীভাবে করব?", a: "bKash, Nagad বা Bank Transfer-এ। WhatsApp-এ message করলে details পাবেন।" },
  ],
};

export default function CanvaPlans() {
  return <ToolPlansPage data={data} />;
}
