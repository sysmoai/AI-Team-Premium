import { ToolDetail } from "@/components/ToolDetail";
import { SiCanva } from "react-icons/si";

const CANVA_USE_CASES = [
  {
    emoji: "📱",
    title: "Social Media Content Factory",
    who: "Instagram influencers, brand managers, content creators",
    makes: "50+ on-brand social posts, stories, reels thumbnails per month using brand kit",
    timeSaved: "৳15,000 design agency → ৳0",
    prompt: "Magic Studio: create 10 Instagram posts for a Bangladeshi organic food brand — earth tones, Bangla headline, consistent brand kit",
  },
  {
    emoji: "🎓",
    title: "Student Presentation Design",
    who: "University students, teachers, researchers",
    makes: "Professional 20-slide academic presentations from text in minutes",
    timeSaved: "8 hours PowerPoint → 20 minutes",
    prompt: "Design a 20-slide presentation on 'Digital Bangladesh 2041 Vision' — professional academic style, relevant icons, infographics, blue and white",
  },
  {
    emoji: "🛒",
    title: "E-commerce Product Banners",
    who: "Daraz sellers, Facebook shop owners, online retailers",
    makes: "Product banners, promotional flyers, and discount announcements that drive clicks",
    timeSaved: "৳3,000 per banner → ৳0",
    prompt: "Create a Eid sale banner: 50% off on all products, Bangladeshi festive colours, Bangla and English text, product placeholder, urgent CTA",
  },
  {
    emoji: "🏢",
    title: "Business Pitch Decks",
    who: "Entrepreneurs, startup founders, NGOs",
    makes: "Investor-ready pitch decks with professional infographics, financial charts, and branding",
    timeSaved: "2 weeks design → 2 hours",
    prompt: "Build a 15-slide startup pitch deck for a Dhaka-based agri-tech company — market size, problem/solution, team, financials, professional look",
  },
  {
    emoji: "📺",
    title: "YouTube Thumbnail & Channel Art",
    who: "YouTubers, educators, vloggers",
    makes: "High-CTR thumbnails, channel banners, and video end screens with consistent branding",
    timeSaved: "৳500/thumbnail designer → ৳0",
    prompt: "YouTube thumbnail: shocked face + '১০ মিনিটে ১০ হাজার টাকা!' — bold red/yellow, dramatic lighting, professional thumbnail style",
  },
  {
    emoji: "📰",
    title: "Print & Marketing Materials",
    who: "Local businesses, restaurants, clinics, coaches",
    makes: "Flyers, brochures, business cards, menus, and banners ready for printing",
    timeSaved: "৳5,000 print shop design → ৳0",
    prompt: "Design a folded brochure for a Bangladeshi private clinic: services list, doctor photos, address, professional medical blue and white",
  },
  {
    emoji: "🎨",
    title: "Dream Lab AI Image Generation",
    who: "Designers, creative directors, marketers",
    makes: "Custom AI-generated photos and illustrations directly inside Canva projects",
    timeSaved: "Stock photo ৳2,000 → ৳0",
    prompt: "Dream Lab: a Bangladeshi businesswoman confidently presenting in a modern Dhaka office boardroom, natural light, photorealistic, for a corporate brochure",
  },
];

const CANVA_COMPETITOR_ROWS = [
  { feature: "Design Templates", thisProduct: "610,000+ (updated daily)", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "AI Image Generation", thisProduct: "✅ Dream Lab + Magic Studio", chatgpt: "GPT-image-1 (separate tool)", claude: "❌ None", gemini: "Imagen 4 (separate tool)" },
  { feature: "Background Remover", thisProduct: "✅ 1-click, any image", chatgpt: "Basic (image editing)", claude: "❌ None", gemini: "❌ None" },
  { feature: "Magic Eraser", thisProduct: "✅ Yes, AI brush", chatgpt: "Limited", claude: "❌ None", gemini: "❌ None" },
  { feature: "Brand Kit", thisProduct: "✅ Colors, fonts, logos", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Social Media Scheduler", thisProduct: "✅ 8+ platforms", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Video Editing", thisProduct: "✅ Full editor + AI", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Premium Stock Photos", thisProduct: "100M+ photos/videos", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Print Services", thisProduct: "✅ Direct to print", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Team Collaboration", thisProduct: "✅ Real-time co-editing", chatgpt: "❌ None", claude: "❌ None", gemini: "Google Slides only" },
  { feature: "Magic Write (AI Copy)", thisProduct: "✅ Built-in AI copywriting", chatgpt: "✅ Excellent", claude: "✅ Excellent", gemini: "✅ Good" },
  { feature: "Presentation Mode", thisProduct: "✅ Built-in presenter view", chatgpt: "❌ None", claude: "❌ None", gemini: "Google Slides" },
  { feature: "AITPBD Shared Price", thisProduct: "৳350/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
];

const CANVA_FAQS = [
  { q: "What is the difference between Canva Free and Canva Pro?", a: "Canva Free gives you about 250,000 free templates and basic tools. Canva Pro unlocks 610,000+ premium templates (updated daily), 100M+ premium stock photos and videos, the background remover, Magic Eraser, Dream Lab AI image generation, Brand Kit, social media scheduler, and unlimited cloud storage. Pro is roughly 10× more powerful than Free." },
  { q: "What is Canva Dream Lab and how does it work?", a: "Dream Lab is Canva's advanced AI image generator built directly into the design editor. Type a description, choose a style (photo, illustration, 3D, painting, etc.), and Dream Lab generates custom images you can immediately drop into your design. Unlike Midjourney (which requires Discord), Dream Lab works inside your existing Canva workflow." },
  { q: "How does the Canva Pro Team Seat work from AITPBD?", a: "We send you an official team invitation to your existing Canva account. You accept the invite and immediately get all Pro features — you keep your existing designs, account history, and folders. There's no new account to create. The team seat is official and delivered within 5–15 minutes of payment on WhatsApp." },
  { q: "Can I use Canva Pro for commercial client work in Bangladesh?", a: "Yes. Canva Pro includes a commercial licence for all premium assets — stock photos, videos, audio, and templates. You can use Pro designs for client projects, sell them, and use them in advertising. The only restriction is you cannot resell the stock assets themselves (e.g., create a stock photo website using Canva images)." },
  { q: "What is the Canva Brand Kit and why is it important for businesses?", a: "Brand Kit lets you upload your logo, set your brand colours, and select your brand fonts. Every new design automatically uses these brand elements — team members can't accidentally use wrong colours or fonts. For Bangladeshi businesses managing consistent branding across social media, print materials, and presentations, this is a massive time-saver." },
  { q: "Does Canva Pro include video editing?", a: "Yes. Canva Pro includes a full video editor — you can trim, cut, add transitions, add text overlays, include background music (from 1M+ audio tracks), and use AI-powered video features. You can also create animated presentations, short social videos, YouTube intros, and Instagram Reels directly in Canva." },
  { q: "Can I schedule social media posts with Canva Pro?", a: "Yes. Canva Pro includes a built-in social media scheduler. Design your post in Canva, then schedule it to publish automatically to Instagram, Facebook, Twitter/X, LinkedIn, Pinterest, TikTok, and more — up to 8 platforms simultaneously. No need for separate tools like Buffer or Hootsuite for basic scheduling." },
  { q: "How many people can share one Canva Pro team seat?", a: "For the Team Seat plan (৳350/mo), the seat is added to one Canva account. AITPBD manages this through an official team, so your seat is exclusive to you — others in the team don't affect your designs or brand kit. Your designs are private to your own account within the team." },
  { q: "Does Canva Pro include Canva Docs and Canva Websites?", a: "Yes. Canva Pro includes all Canva products — Canva Design, Canva Docs (AI-powered document creation), Canva Websites (publish a website directly from a Canva design), Canva Presentations, and Canva Video. Pro features apply across all of them, giving you an all-in-one creative suite." },
  { q: "Is Canva Pro worth it for Bangladeshi freelancers and students?", a: "Absolutely. For freelancers, Canva Pro pays for itself with the first client project — professional designs worth ৳3,000–10,000 in design fees take 30 minutes. For students, the presentation templates and academic design tools eliminate the need for a graphic designer for assignments and group projects. At ৳350/month from AITPBD, it's the most cost-effective design tool available." },
  { q: "Can I download Canva designs without a watermark?", a: "Yes. Canva Free watermarks premium elements in downloaded files. Canva Pro removes all watermarks from every premium element — your downloads are clean, professional files in PNG, JPG, PDF, MP4, and GIF formats. You can also download in multiple resolutions and file types simultaneously with Canva Pro." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "canva",
  "category": "image",
  "priceBdt": 399,
  "priceLabel": "৳399/mo",
  "model": "Canva Magic Studio (multi-model)",
  "contextWindow": "N/A (design tool)",
  "multimodal": "Text, image, video, templates",
  "banglaQuality": "⭐⭐⭐⭐ (text in designs)",
  "speed": "Real-time editor",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Affordable",
  "brand": "Canva",
  "tagline": "Drag-and-drop design with AI Magic Studio",
  "toolPath": "/tools/canva",
  "iconName": "Palette",
  "accent": "#00C4CC",
  "bestUseCase": "Marketers, students, small business owners",
  "bestFor": [
    "Social media graphics, presentations, posters",
    "Magic Write, Magic Edit, Magic Design AI tools",
    "100M+ premium templates, photos, elements",
    "Brand Kit + team collaboration",
    "Background remover and Magic Resize"
  ],
  "weaknesses": [
    "Not a true generative image AI — template-first",
    "Less artistic control than Midjourney / Leonardo"
  ]
} as const;

export default function Canva() {
  return (
    <ToolDetail
      name="Canva Pro"
      tagline="Team Access in BD"
      description="Design anything like a pro. Magic Studio AI image generation, Dream Lab text-to-image, background remover, 100M+ premium assets and 610K+ templates — officially added to your Canva team, no credit card needed."
      accentColor="#00C4CC"
      icon={SiCanva as any}
      features={[
        "Magic Studio — AI image generation inside Canva",
        "Dream Lab — advanced text-to-image with style control",
        "Magic Write — AI copywriting and content assistant",
        "Instant background remover and Magic Eraser",
        "100+ million premium photos, videos, audio and graphics",
        "610,000+ professional templates (updated daily)",
        "Brand Kit — lock colours, fonts and logos for your team",
        "Social media scheduler to 8+ platforms",
        "Full video editor with AI-powered tools",
        "Canva Websites — publish a site directly from Canva",
        "Official team seat — added to your own Canva account",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Canva Pro — Team Seat",
          price: "৳350",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Team",
          specs: [
            { label: "Access", value: "Official team invite" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "24/7 WhatsApp" },
          ],
        },
        {
          label: "Canva Pro — Personal Upgrade",
          price: "৳1,200",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Your own Canva account" },
            { label: "Storage", value: "Unlimited cloud storage" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      specTables={[
        {
          title: "Design & AI Features",
          emoji: "🎨",
          tier2Label: "Shared (৳499/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "Premium Templates", free: "250,000", pro: "610,000+ (daily updates)", premium: "610,000+ (daily updates)" },
            { label: "Stock Photos & Videos", free: "Limited free", pro: "100M+ premium assets", premium: "100M+ premium assets" },
            { label: "AI Image Generation (Dream Lab)", free: "No", pro: "Yes (style-controlled)", premium: "Yes (unlimited generations)" },
            { label: "Magic Write (AI Copy)", free: "No", pro: "Yes, unlimited", premium: "Yes, unlimited" },
            { label: "Background Remover", free: "No", pro: "1-click, any image", premium: "1-click, any image" },
            { label: "Magic Eraser", free: "No", pro: "Yes, AI brush", premium: "Yes, AI brush" },
            { label: "Brand Kit", free: "No", pro: "Logos, colours, fonts", premium: "Logos, colours, fonts (private)" },
            { label: "Transparent PNG Downloads", free: "No", pro: "Yes", premium: "Yes" },
          ],
        },
        {
          title: "Publishing & Collaboration",
          emoji: "📤",
          tier2Label: "Shared (৳499/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "Social Media Scheduler", free: "No", pro: "8+ platforms", premium: "8+ platforms (own account)" },
            { label: "Video Editor with AI", free: "Basic", pro: "Full editor + AI tools", premium: "Full editor + AI tools" },
            { label: "Canva Websites", free: "Limited", pro: "Full, custom domain", premium: "Full, custom domain" },
            { label: "Canva Docs (AI-powered)", free: "Basic", pro: "Full AI integration", premium: "Full AI integration" },
            { label: "Team Collaboration", free: "Limited", pro: "Real-time co-editing", premium: "Real-time co-editing" },
            { label: "Presentation Presenter View", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Bulk Create (data merge)", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Cloud Storage", free: "5GB", pro: "Unlimited (shared)", premium: "Unlimited (private account)" },
          ],
        },
      ]}
      useCases={CANVA_USE_CASES}
      competitorRows={CANVA_COMPETITOR_ROWS}
      extendedFaqs={CANVA_FAQS}
    />
  );
}
