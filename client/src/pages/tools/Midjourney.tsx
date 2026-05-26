import { ToolDetail } from "@/components/ToolDetail";
import { Image } from "lucide-react";

const MIDJOURNEY_USE_CASES = [
  {
    emoji: "👗",
    title: "Fashion & Apparel Mockups",
    who: "Bangladeshi garment exporters, fashion designers, Daraz clothing sellers",
    makes: "Photorealistic clothing on models without an actual photoshoot",
    timeSaved: "৳50,000 fashion shoot → ৳0",
    prompt: "Midjourney v7: a traditional Bangladeshi jamdani saree worn by a confident woman in a modern Dhaka setting, editorial fashion photography, 4K, --ar 4:5",
  },
  {
    emoji: "🏗️",
    title: "Architecture & Real Estate Visualisation",
    who: "Architects, real estate developers, interior designers",
    makes: "Photorealistic building renders and interior concepts before any construction",
    timeSaved: "3D rendering service ৳30,000 → ৳0",
    prompt: "A modern 10-storey residential apartment in Dhaka, contemporary Bangladeshi architecture, green spaces, rooftop garden, photorealistic exterior render, golden hour lighting --ar 16:9",
  },
  {
    emoji: "📱",
    title: "Social Media Visual Content",
    who: "Influencers, marketers, brand managers",
    makes: "40+ unique, stunning visual posts per month — photorealistic, illustration, or artistic styles",
    timeSaved: "Stock photos ৳5,000/month → ৳0",
    prompt: "Eid ul-Fitr celebration atmosphere in Dhaka — lanterns, family gathering, warm festive lighting, vibrant colors, photorealistic, Instagram-ready composition --ar 1:1",
  },
  {
    emoji: "🎮",
    title: "Game Asset & Concept Art",
    who: "Game developers, indie studios, animators",
    makes: "Character sheets, environment concepts, weapon designs, and UI elements",
    timeSaved: "Concept artist ৳15,000 per design → ৳0",
    prompt: "--cref [character_ref] --sref [style_ref]: Bangladeshi warrior hero in fantasy armour — multiple poses: idle, attack, victory. Consistent character across all frames --ar 1:1",
  },
  {
    emoji: "📚",
    title: "Book & Album Cover Design",
    who: "Authors, publishers, musicians",
    makes: "Professional book covers, album artwork, and creative direction visuals",
    timeSaved: "Graphic designer ৳10,000 per cover → ৳0",
    prompt: "Book cover: 'The Last River' — a Bangladeshi thriller novel. A lone figure standing on a flooded paddy field at dusk, cinematic, moody, award-winning book cover composition --ar 2:3",
  },
  {
    emoji: "🛒",
    title: "E-commerce Product Photography",
    who: "Online retailers, Amazon/Daraz sellers, brand owners",
    makes: "Studio-quality product images in multiple backgrounds, angles, and settings",
    timeSaved: "Product photography studio ৳20,000 → ৳0",
    prompt: "Premium handmade leather wallet on a minimalist white surface, professional product photography, multiple angles, studio lighting, soft shadows, 4K detail --ar 1:1",
  },
  {
    emoji: "🎨",
    title: "Brand Identity Concepts",
    who: "Designers, brand agencies, startups building visual identity",
    makes: "Logo concepts, brand mood boards, colour palette explorations, and style guides",
    timeSaved: "Brand agency consultation ৳50,000 → creative direction in hours",
    prompt: "Brand identity concept for a Bangladeshi premium tea brand: elegant, heritage-meets-modern, gold and deep green colour palette, logo concepts, packaging mockups --ar 4:3",
  },
];

const MIDJOURNEY_COMPETITOR_ROWS = [
  { feature: "Image Quality (photorealism)", thisProduct: "⭐⭐⭐⭐⭐ (industry gold standard)", chatgpt: "⭐⭐⭐⭐ (GPT-image-1)", claude: "❌ No generation", gemini: "⭐⭐⭐⭐ (Imagen 4)" },
  { feature: "Artistic Range", thisProduct: "⭐⭐⭐⭐⭐ Unmatched diversity", chatgpt: "⭐⭐⭐⭐ Good", claude: "❌ None", gemini: "⭐⭐⭐⭐ Good" },
  { feature: "Character Reference (--cref)", thisProduct: "✅ Consistent characters", chatgpt: "Limited", claude: "❌ No", gemini: "Limited" },
  { feature: "Style Reference (--sref)", thisProduct: "✅ Any artistic style", chatgpt: "Style transfer limited", claude: "❌ No", gemini: "Style prompting only" },
  { feature: "Vary (Region) Inpainting", thisProduct: "✅ Yes, precise editing", chatgpt: "✅ Yes", claude: "❌ No", gemini: "Basic inpainting" },
  { feature: "Turbo Mode (speed)", thisProduct: "✅ Ultra-fast generation", chatgpt: "Fast (GPT-image-1)", claude: "❌ N/A", gemini: "Fast (Imagen 4)" },
  { feature: "Web Interface", thisProduct: "✅ midjourney.com", chatgpt: "✅ chatgpt.com", claude: "❌ N/A", gemini: "✅ gemini.google.com" },
  { feature: "Discord Integration", thisProduct: "✅ Full Discord bot", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Commercial Rights", thisProduct: "✅ Full commercial (Paid)", chatgpt: "✅ Yes", claude: "❌ N/A", gemini: "✅ Yes" },
  { feature: "Monthly Image Volume", thisProduct: "~200 fast images (Shared)", chatgpt: "~50 images/day", claude: "0", gemini: "~50 images/day" },
  { feature: "Image Resolution", thisProduct: "Up to 4K via upscale", chatgpt: "Up to 4K", claude: "❌ N/A", gemini: "Up to 4K" },
  { feature: "Best Use Case", thisProduct: "Art, fashion, high-quality visuals", chatgpt: "General AI + images", claude: "Writing & code", gemini: "Google ecosystem" },
  { feature: "AITPBD Shared Price", thisProduct: "৳1,200/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
];

const MIDJOURNEY_BASE_FAQS = [
  { q: "বাংলাদেশে Midjourney কীভাবে কিনবো?", a: "AI Team Premium BD-এর মাধ্যমে ৳১,২০০/মাসে shared Midjourney access পান। bKash বা Nagad-এ পেমেন্ট করুন — ৫-১৫ মিনিটে WhatsApp-এ Discord invite পাঠানো হবে।" },
  { q: "Midjourney v7 কী নতুন এনেছে?", a: "Midjourney v7 আগের version-গুলোর চেয়ে অনেক বেশি photorealistic। Character consistency, improved lighting, better text rendering এবং faster generation এই version-এর প্রধান উন্নতি।" },
  { q: "Midjourney Discord ছাড়া ব্যবহার করা যায়?", a: "হ্যাঁ! Midjourney-র নিজস্ব web interface (midjourney.com) আছে যেখানে browser থেকে সরাসরি images generate করা যায়। Discord bot-ও available।" },
  { q: "Character Reference (--cref) কী কাজ করে?", a: "--cref parameter দিয়ে একটি reference image-এর character-কে নতুন scene বা style-এ বসানো যায়। Consistent character design-এর জন্য এটি অত্যন্ত কার্যকর — character sheet, comic, product mockup-এ বহুল ব্যবহৃত।" },
  { q: "Shared Midjourney account কি safe?", a: "হ্যাঁ। Shared account-এ আপনার generated images আপনার নিজস্ব gallery-তে থাকে। অন্য users শুধু public gallery-তে দেখতে পারে (যদি Stealth mode না থাকে)। বাংলাদেশে হাজারো ডিজাইনার এই পদ্ধতিতে ব্যবহার করছেন।" },
];

const MIDJOURNEY_EXTENDED_FAQS = [
  { q: "How many images can I generate per month with the Midjourney Shared plan?", a: "The Midjourney Shared plan from AITPBD gives you approximately 200 fast-generation images per month (based on Standard tier allocation). With Turbo Mode enabled, generations are faster but consume more GPU minutes. Relax mode (slower, queued) gives unlimited additional images. For most professional use cases including freelance design work and social media content, 200+ fast images per month is more than sufficient." },
  { q: "What is the Style Reference (--sref) parameter in Midjourney?", a: "--sref lets you provide a reference image to define the visual style for your generation. For example: upload a specific painting style → all new generations will adopt that colour palette, brushwork, and aesthetic. This is essential for brand consistency — generate unlimited images that all match the same visual identity. Combined with --cref (character reference), you can create entire consistent visual universes." },
  { q: "Can Midjourney generate text inside images accurately?", a: "Midjourney v7 has significantly improved text rendering in images compared to earlier versions, but it's still not as reliable as Imagen 4 (Google) for accurate text. For images where text must be exact (logos with specific words, signs, etc.), generate the image in Midjourney first, then add text overlays in Canva or Photoshop. For stylistic or slightly imperfect text (street signs, book spines), Midjourney v7 handles it well." },
  { q: "What is the Vary (Region) feature in Midjourney?", a: "Vary (Region) is Midjourney's inpainting tool — you select a specific area of a generated image and describe what you want to change, without affecting the rest. For example: generate a portrait, then use Vary (Region) to change just the background, or swap the shirt colour, or modify a facial expression. This gives precise control over specific elements without regenerating the entire image." },
  { q: "Is Midjourney better than Leonardo AI for professional work?", a: "They excel in different areas. Midjourney v7 is the industry gold standard for artistic quality, photorealism, and creative diversity — the tool most professional photographers, art directors, and creative agencies use as their primary tool. Leonardo AI has more technical tools (ControlNet, real-time generation, 3D textures) and is better for game assets and e-commerce product consistency. For pure image quality and artistic work, Midjourney wins. For technical image workflows, Leonardo is stronger." },
  { q: "Can Bangladeshi designers use Midjourney commercially for client work?", a: "Yes. Paid Midjourney plans include commercial usage rights — you can use generated images for client projects, sell designs, use in advertising, and create commercial products. The only restriction is you cannot claim copyright ownership over the raw AI-generated image (the copyright status of pure AI art is still legally evolving globally), but you can use the images commercially for any project. Many Bangladeshi designers on Fiverr and Upwork build entire businesses using Midjourney." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "midjourney",
  "category": "image",
  "priceBdt": 999,
  "priceLabel": "৳999/mo",
  "model": "Midjourney v7",
  "contextWindow": "N/A (image gen)",
  "multimodal": "Text-to-image, image-to-image",
  "banglaQuality": "N/A",
  "speed": "~30 sec per image",
  "accuracy": "⭐⭐⭐⭐⭐ (artistic)",
  "pricingTier": "Premium",
  "brand": "Midjourney",
  "tagline": "Best AI image generator (artistic)",
  "toolPath": "/tools/midjourney",
  "iconName": "Image",
  "accent": "#7F5AF0",
  "bestUseCase": "Designers, marketers, content creators",
  "bestFor": [
    "Stylised, artistic images & concept art",
    "Marketing visuals with cinematic quality",
    "Character design, illustrations, posters",
    "Web interface + Discord workflow"
  ],
  "weaknesses": [
    "Not as photorealistic as some competitors",
    "Less precise text-in-image than DALL-E / Ideogram"
  ]
} as const;

export default function Midjourney() {
  return (
    <ToolDetail
      name="Midjourney"
      tagline="Shared Access"
      description="The world's most stunning AI image generator. Midjourney v7 produces photorealistic and artistic images with character consistency, style reference, and Vary (Region) editing — all accessible in Bangladesh via bKash/Nagad."
      accentColor="#2563EB"
      icon={Image}
      features={[
        "Midjourney v7 — most realistic AI images ever generated",
        "Character Reference (--cref) for consistent characters across scenes",
        "Style Reference (--sref) to match any artistic style",
        "Vary (Region) — AI-powered inpainting to edit specific areas",
        "Photorealistic portraits, landscapes, product shots and concepts",
        "Turbo Mode — ultra-fast image generation",
        "Web interface (midjourney.com) + Discord bot access",
        "Commercial usage rights included",
        "~200 fast-mode images per month on Shared plan",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "Midjourney — Shared",
          price: "৳1,200",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Discord + Web" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Rules", value: "1 device only" },
          ],
        },
      ]}
      path="/tools/midjourney"
      specTables={[
        {
          title: "Image Generation Capabilities",
          emoji: "🖼️",
          tier2Label: "Shared (৳1,200/mo)",
          tier3Label: "Pro Personal (৳4,500/mo)",
          rows: [
            { label: "Current Model", free: "v5 (limited)", pro: "v7 (latest)", premium: "v7 (latest, dedicated)" },
            { label: "Fast GPU Minutes/Month", free: "~25 min", pro: "~200 images", premium: "~900 images" },
            { label: "Relax Mode (unlimited)", free: "No", pro: "Yes (slower queue)", premium: "Yes (priority queue)" },
            { label: "Turbo Mode", free: "No", pro: "Yes (fastest)", premium: "Yes (highest priority)" },
            { label: "Max Resolution", free: "1024×1024", pro: "Up to 4K (upscale)", premium: "Up to 4K (upscale)" },
            { label: "Images per Job", free: "4", pro: "4 (upscale any)", premium: "4 (upscale any)" },
            { label: "Aspect Ratios", free: "Limited", pro: "Any (--ar 16:9, etc.)", premium: "Any (--ar 16:9, etc.)" },
            { label: "Stealth Mode (private)", free: "No", pro: "No (public gallery)", premium: "Yes (private gallery)" },
          ],
        },
        {
          title: "Advanced Controls & Parameters",
          emoji: "🎛️",
          tier2Label: "Shared (৳1,200/mo)",
          tier3Label: "Pro Personal (৳4,500/mo)",
          rows: [
            { label: "Character Reference (--cref)", free: "No", pro: "Yes, full consistency", premium: "Yes, full consistency" },
            { label: "Style Reference (--sref)", free: "No", pro: "Yes, any style", premium: "Yes, any style" },
            { label: "Vary (Region) Inpainting", free: "No", pro: "Yes, selective editing", premium: "Yes, selective editing" },
            { label: "Upscaler (2×, 4×)", free: "No", pro: "Yes, up to 4K", premium: "Yes, up to 4K" },
            { label: "Pan / Zoom Out", free: "No", pro: "Yes, expand canvas", premium: "Yes, expand canvas" },
            { label: "Image Prompting (--iw)", free: "No", pro: "Yes, blend reference image", premium: "Yes, blend reference image" },
            { label: "Negative Prompting (--no)", free: "No", pro: "Yes, exclude elements", premium: "Yes, exclude elements" },
            { label: "Web Interface Access", free: "No", pro: "Yes, midjourney.com", premium: "Yes, midjourney.com (own account)" },
          ],
        },
      ]}
      deepDive={{
        type: "image",
        intro: "Midjourney v7 is the most powerful text-to-image model available. Here are real step-by-step prompt workflows for Bangladeshi creators — from product shots to fashion and brand concepts.",
        workflows: [
          {
            step: 1,
            label: "E-commerce Product Shot (Daraz / Shopify)",
            prompt: "/imagine prompt: a premium handmade leather bifold wallet, placed on polished white marble, studio product photography, soft box lighting, sharp detail, 4K, commercial --ar 1:1 --v 7",
            result: "A photorealistic, white-background product image ready for Daraz or an international store. The lighting mimics a ৳20,000 studio shoot. Export as PNG and upload directly.",
          },
          {
            step: 2,
            label: "Brand-Consistent Character (--cref + --sref)",
            prompt: "/imagine prompt: [brand mascot reference image URL] --cref [same URL] --sref [style reference URL]: the mascot drinking tea in a cozy Bangladeshi home, morning light, warm and friendly --ar 4:5 --v 7",
            result: "The mascot is reproduced in a completely new scene while maintaining identical face, proportions, and colour palette. Advertisers use this to generate unlimited brand content without a redesign.",
          },
          {
            step: 3,
            label: "Fashion Editorial (Garment Mockup)",
            prompt: "/imagine prompt: a beautiful Bangladeshi woman wearing a hand-embroidered nakshi kantha jacket, standing in the streets of Panam City, golden hour, fashion editorial photography, Vogue cover style, --ar 4:5 --v 7",
            result: "A magazine-quality fashion editorial image — usable for export catalogue covers, social media campaigns, and brand storytelling. No model, no location, no photographer needed.",
          },
          {
            step: 4,
            label: "Vary (Region) Background Swap",
            prompt: "Generate initial image → upscale → click 'Vary (Region)' → paint over the background → type: replace with a lush green tea garden in Sylhet, morning mist, cinematic",
            result: "The subject stays identical while the background becomes a photorealistic Sylhet tea garden. Used by Bangladeshi exporters to contextualise products for international buyers without location travel.",
          },
        ],
        tips: [
          "Always add --ar for the right ratio: --ar 1:1 for Instagram, --ar 16:9 for YouTube, --ar 4:5 for Reels",
          "Add 'photorealistic, 4K, sharp detail' to any product prompt for commercial-grade quality",
          "Use --no to exclude unwanted elements: --no text, watermarks, blurry, low quality",
          "Start with --stylize 100 for balanced results; increase to --stylize 1000 for more artistic interpretation",
          "For Bangladeshi cultural scenes, be specific: 'Dhaka, Bangladesh, jamdani fabric, rickshaw, padma river' triggers culturally accurate results",
          "Use Turbo mode for quick exploration; switch to Standard for final high-quality exports",
          "Vary (Region) is better than regenerating — fix one thing without losing the rest of a good image",
          "Save prompts that work well — build a personal prompt library for consistent brand work",
        ],
      }}
      useCases={MIDJOURNEY_USE_CASES}
      competitorRows={MIDJOURNEY_COMPETITOR_ROWS}
      extendedFaqs={[...MIDJOURNEY_BASE_FAQS, ...MIDJOURNEY_EXTENDED_FAQS]}
    />
  );
}
