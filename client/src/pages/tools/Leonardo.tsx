import { ToolDetail } from "@/components/ToolDetail";
import { Palette } from "lucide-react";


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "leonardo",
  "category": "image",
  "priceBdt": 499,
  "priceLabel": "৳499/mo",
  "model": "Flux + Phoenix + custom models",
  "contextWindow": "N/A (image gen)",
  "multimodal": "Text-to-image, image-to-image, canvas",
  "banglaQuality": "N/A",
  "speed": "~15 sec per image",
  "accuracy": "⭐⭐⭐⭐ (photoreal)",
  "pricingTier": "Mainstream",
  "brand": "Leonardo",
  "tagline": "Game-asset & production-ready images",
  "toolPath": "/tools/leonardo",
  "iconName": "Image",
  "accent": "#FBBF24",
  "bestUseCase": "Game devs, product designers, ad creators",
  "bestFor": [
    "Game assets, sprites, environment art",
    "Photorealistic Flux + Phoenix models",
    "Fine control with custom-trained models",
    "Cheaper than Midjourney for high volume"
  ],
  "weaknesses": [
    "Less iconic / cinematic than Midjourney by default",
    "Steeper learning curve for best results"
  ]
} as const;

export default function LeonardoPage() {
  return (
    <ToolDetail
      name="Leonardo AI"
      tagline="in Bangladesh"
      description="Leonardo AI is the world's most versatile AI image generation platform — with 20+ fine-tuned models including Phoenix, Flux Pro, and Leonardo Diffusion. Perfect for Bangladeshi designers, freelancers, and content creators. Generate consistent game assets, product images, and social content from ৳349/month via bKash/Nagad."
      accentColor="#FF6B35"
      icon={Palette}
      features={[
        "20+ AI image models — Phoenix, Flux Pro 1.1, Kino XL, Leonardo Diffusion",
        "Universal Upscaler — enhance any image to ultra-high resolution",
        "Image-to-image transformation — restyle existing photos with AI",
        "ControlNet — precise control over composition and pose",
        "Canvas Editor — extend, inpaint, and edit images with AI",
        "Real-time image generation — see results as you type",
        "Motion Video — animate any image into a short video clip",
        "3D Texture generation — create game-ready textures and assets",
        "Team workspace with shared assets and brand kits",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Leonardo Artisan — Shared",
          price: "৳349",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Tokens", value: "8,500/month" },
            { label: "Models", value: "All 20+ models" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Leonardo Artisan — Personal",
          price: "৳1,299",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Tokens", value: "25,000/month" },
            { label: "Access", value: "Private dedicated account" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/leonardo"
      specTables={[
        {
          title: "Image Generation",
          emoji: "🖼️",
          tier2Label: "Shared (৳349/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "Top Model", free: "Leonardo Diffusion (basic)", pro: "Phoenix + Flux Pro 1.1", premium: "Phoenix + Flux Pro 1.1" },
            { label: "Tokens Per Month", free: "150/day (~4,500)", pro: "8,500", premium: "25,000" },
            { label: "Images Per Month (est.)", free: "~150", pro: "~850", premium: "~2,500" },
            { label: "Max Resolution", free: "1024×1024", pro: "2048×2048 (4K upscale)", premium: "2048×2048 (4K upscale)" },
            { label: "Generations Per Job", free: "4 at once", pro: "8 at once", premium: "8 at once" },
            { label: "Real-time Generation", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Image-to-Image", free: "No", pro: "Yes", premium: "Yes" },
            { label: "ControlNet (pose/depth)", free: "No", pro: "Yes", premium: "Yes" },
          ],
        },
        {
          title: "Editing, Video & Privacy",
          emoji: "🎬",
          tier2Label: "Shared (৳349/mo)",
          tier3Label: "Personal (৳1,299/mo)",
          rows: [
            { label: "Canvas Editor", free: "No", pro: "Full access", premium: "Full access" },
            { label: "Universal Upscaler", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Inpainting", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Outpainting", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Motion (Animate Image)", free: "No", pro: "Yes (4s clips)", premium: "Yes (4s clips)" },
            { label: "3D Texture Gen", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Remove Background", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Private Generation Mode", free: "No", pro: "No (shared gallery)", premium: "Yes (fully private)" },
          ],
        },
      ]}
      deepDive={{
        type: "image",
        intro: "Leonardo AI's 20+ fine-tuned models make it the most versatile image platform for Bangladeshi creators. Here are real professional workflows — from e-commerce to game development — with exact prompts.",
        workflows: [
          {
            step: 1,
            label: "E-commerce Product Image (Daraz / Shopify Ready)",
            prompt: "Model: Phoenix | Prompt: premium handmade Bangladeshi clay pottery bowl on a minimalist white marble surface, natural studio lighting, soft shadow, professional product photography, 4K, --ar 1:1 | ControlNet: depth map for composition control",
            result: "A ৳15,000-quality product studio shot — white background, sharp detail, e-commerce ready. Upload directly to Daraz or any storefront without any editing. Repeat for 50 products in 2 hours.",
          },
          {
            step: 2,
            label: "Consistent Game Character Sheet",
            prompt: "Model: Kino XL | ControlNet: OpenPose | Prompt: Bangladeshi warrior character, traditional armour with modern fantasy elements, character reference sheet — front view, side view, 3/4 view, attack pose, idle pose, consistent style, white background, game-ready",
            result: "A 5-pose character reference sheet maintaining identical costume, proportions, and colour palette. Game developers and animators use this as the definitive reference for all character variations and animations.",
          },
          {
            step: 3,
            label: "Interior Design Concept Render",
            prompt: "Model: Leonardo Diffusion XL | Prompt: modern Bangladeshi apartment living room, warm neutral tones, rattan furniture, tropical plants, Dhaka city view through floor-to-ceiling windows, golden hour natural lighting, photorealistic interior design render, --ar 16:9",
            result: "A photorealistic room concept render that would cost ৳30,000+ from a 3D rendering studio. Architects and real estate developers use this to show clients design concepts before construction begins.",
          },
          {
            step: 4,
            label: "Canvas Editor — Product Lifestyle Extension",
            prompt: "Upload product photo → Canvas Editor → use outpainting to extend canvas → prompt: lush tropical garden background, wooden table, afternoon sunlight, lifestyle product photography | Then inpaint to add: natural props — fresh flowers, linen cloth",
            result: "A plain product photo becomes a complete lifestyle shot. The AI extends the image naturally, adding a photorealistic environment that makes the product look like it was shot in a professional lifestyle studio.",
          },
        ],
        tips: [
          "Phoenix model gives the best overall photorealism — start here for product and portrait work",
          "Flux Pro 1.1 excels at creative and artistic styles — better for illustrations and abstract brand concepts",
          "Use ControlNet's depth map for consistent product placement across multiple images",
          "Real-time generation lets you refine prompts instantly — type, see result, adjust, repeat",
          "8,500 Shared tokens = ~850 images at 10 tokens each — plan 50 images per client project",
          "Canvas Editor outpainting: extend a 1:1 product shot to 16:9 for YouTube banners without re-generating",
          "Motion feature: animate your best product shot into a 4-second TikTok loop — no video skill needed",
          "For Bangladeshi cultural imagery: include 'Dhaka, jamdani, muslin, rickshaw, sundarbans' for accurate outputs",
        ],
      }}
      useCases={[
        {
          emoji: "🛒",
          title: "E-commerce Product Images",
          who: "Daraz sellers, online shop owners",
          makes: "100 professional product images in multiple angles and backgrounds",
          timeSaved: "৳20,000 photoshoot → ৳0",
          prompt: "Phoenix: a premium leather wallet on a minimalist white marble surface, studio product photography, 4K, multiple angles",
        },
        {
          emoji: "🎮",
          title: "Game Asset Creation",
          who: "Game developers, indie studios",
          makes: "Consistent character sprites, backgrounds, and 3D textures",
          timeSaved: "2 weeks design → 2 hours",
          prompt: "Kino XL: fantasy RPG character — Bangladeshi warrior in traditional armour, consistent style, multiple poses, game-ready",
        },
        {
          emoji: "📱",
          title: "Social Media Content",
          who: "Influencers, marketers, brand managers",
          makes: "50 on-brand social posts, thumbnails, and story templates per month",
          timeSaved: "৳15,000 design agency → ৳0",
          prompt: "Create a consistent brand kit for a Bangladeshi food delivery app — logo variations, banner templates, Instagram posts",
        },
        {
          emoji: "🏠",
          title: "Interior Design Visualisation",
          who: "Architects, real estate agents, interior designers",
          makes: "Photorealistic room renders before any construction begins",
          timeSaved: "৳50,000 3D render → ৳0",
          prompt: "Modern Bangladeshi apartment living room — warm lighting, local fabric textures, open plan, photorealistic interior render",
        },
        {
          emoji: "👗",
          title: "Fashion & Textile Design",
          who: "Fashion designers, RMG exporters",
          makes: "AI fabric patterns, garment mockups, and campaign visuals",
          timeSaved: "3 days design → 1 hour",
          prompt: "Traditional nakshi kantha pattern modernised for global luxury fashion — geometric, bold colours, seamless repeat pattern",
        },
        {
          emoji: "🎨",
          title: "Freelance Design Work",
          who: "Graphic designers, Fiverr/Upwork sellers",
          makes: "Client deliverables: logos, illustrations, concept art, book covers",
          timeSaved: "8 hours per project → 1 hour",
          prompt: "Children's book illustration: a curious Bangladeshi child exploring a magical forest, watercolour style, warm and friendly",
        },
        {
          emoji: "🏗️",
          title: "Architectural Concept Renders",
          who: "Architects, civil engineers, real estate developers",
          makes: "Photorealistic architectural visualisations for client presentations without 3D software",
          timeSaved: "AutoCAD + 3ds Max workflow → Leonardo AI in hours",
          prompt: "Exterior render: a modern 8-storey mixed-use building in Gulshan, Dhaka — glass facade, landscaping, golden hour lighting, photorealistic architectural photography style",
        },
      ]}
      competitorRows={[
        { feature: "Image Quality", thisProduct: "⭐⭐⭐⭐⭐ (specialist)", chatgpt: "⭐⭐⭐⭐ (GPT-image-1)", claude: "❌ No generation", gemini: "⭐⭐⭐⭐ (Imagen 4)" },
        { feature: "Models Available", thisProduct: "20+ fine-tuned models", chatgpt: "GPT-image-1 only", claude: "None", gemini: "Imagen 4 only" },
        { feature: "Image-to-Image", thisProduct: "✅ Full ControlNet", chatgpt: "Basic", claude: "❌ No", gemini: "Basic" },
        { feature: "Canvas / Inpainting", thisProduct: "✅ Professional editor", chatgpt: "Limited", claude: "❌ No", gemini: "Basic" },
        { feature: "Animate Image (Video)", thisProduct: "✅ 4-sec clips", chatgpt: "Via Sora", claude: "❌ No", gemini: "✅ Veo 2" },
        { feature: "Monthly Image Volume", thisProduct: "~850 images (Shared)", chatgpt: "~50 images/day", claude: "0", gemini: "~50 images/day" },
        { feature: "3D Texture Generation", thisProduct: "✅ Game-ready textures", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Real-Time Generation", thisProduct: "✅ See results as you type", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "ControlNet (pose control)", thisProduct: "✅ Full pose/depth control", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Background Removal", thisProduct: "✅ Built-in", chatgpt: "Limited", claude: "❌ No", gemini: "❌ No" },
        { feature: "Team Workspace / Brand Kit", thisProduct: "✅ Shared assets & kits", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Best For", thisProduct: "Visual creatives, game dev", chatgpt: "General AI chat", claude: "Writing & code", gemini: "Google ecosystem" },
        { feature: "AITP Shared Price", thisProduct: "৳349/mo", chatgpt: "৳499/mo", claude: "৳1,495/mo", gemini: "৳899/mo" },
      ]}
      extendedFaqs={[
        { q: "How many images can I generate with Leonardo AI Artisan per month?", a: "The Artisan Shared plan includes 8,500 tokens per month. Each image generation costs 7–15 tokens depending on resolution and model. This means approximately 570–1,200 images per month — enough for heavy professional use. The Personal plan (৳1,299/mo) includes 25,000 tokens for approximately 1,700–3,500 images per month." },
        { q: "What is the difference between Leonardo Phoenix and Flux Pro?", a: "Leonardo Phoenix is Leonardo's own flagship model — excellent for photorealism, consistent characters, and product photography. Flux Pro 1.1 (by Black Forest Labs) is better for creative art, illustrations, and stylistic control. Both are available on the Artisan plan." },
        { q: "Can Leonardo AI generate consistent characters across multiple images?", a: "Yes — this is Leonardo's strongest feature. You can train a character element or use ControlNet to maintain pose, appearance, and style consistency across dozens of images. Essential for game development, comic creation, and brand mascot work." },
        { q: "Does Leonardo AI support Bangla text in images?", a: "Bangla text in AI-generated images is challenging for all tools. Leonardo (like others) has limited Bangla text accuracy. For best results, generate the image first, then add Bangla text in Canva or Photoshop. The image quality itself fully supports Bangladeshi subjects and aesthetics." },
        { q: "What is Leonardo Motion and how do I use it?", a: "Leonardo Motion animates any static image into a 4-second video clip. Upload or generate an image, click 'Motion', and Leonardo creates subtle movement — water flowing, hair blowing, lighting shifts. Perfect for Instagram Reels and TikTok content. Available on the Artisan plan." },
        { q: "What is ControlNet in Leonardo AI and why is it useful for designers?", a: "ControlNet lets you provide a reference image for composition, pose, or depth map — Leonardo generates a new image that matches that structure. For example: upload a photo of a model pose → generate a new AI character in that exact pose. For Bangladeshi fashion designers and game developers, this gives precise control over character positioning that standard image prompting cannot achieve." },
        { q: "How does Real-Time Generation in Leonardo work?", a: "Real-Time Generation lets you see images being generated as you type your prompt — updating live with each keystroke. This makes it much faster to explore prompt variations and find the right direction. Instead of waiting 10–30 seconds per generation, you see changes in near-real-time. Available on the Artisan paid plan and excellent for rapid creative exploration." },
        { q: "Can Bangladeshi freelancers use Leonardo AI commercially for client work?", a: "Yes. The paid Artisan plan includes commercial usage rights. You can deliver AI-generated images to clients, use them in advertisements, print them, and monetise them. Many Bangladeshi designers on Fiverr and Upwork use Leonardo to deliver high-volume design work (social media packages, product images, concept art) at a fraction of the manual design time." },
        { q: "What is Leonardo Universal Upscaler?", a: "The Universal Upscaler takes any image (generated in Leonardo or uploaded) and enhances it to up to 4K resolution — adding detail, sharpness, and texture. For e-commerce sellers needing large print-ready images, and for game developers needing high-resolution textures, this eliminates the need for separate upscaling software like Topaz Gigapixel." },
        { q: "Is the Leonardo AI Shared plan enough for daily professional use?", a: "The Artisan Shared plan (৳349/mo) with 8,500 tokens per month generates approximately 570–850 images per month. A Bangladeshi freelancer doing 20 client projects per month, generating 20–30 images per project, would use about 400–600 tokens total — well within the limit. The Personal plan (৳1,299/mo, 25,000 tokens) is for agencies or professionals generating hundreds of images per day." },
        { q: "How do I get started with Leonardo AI from AITP?", a: "Message AI Team Premium on WhatsApp (+880 1533-262758). We deliver the Artisan Shared plan credentials within 5–15 minutes of payment. Log in at leonardo.ai, and all 20+ models, the Canvas editor, ControlNet, and other Artisan features are immediately available. No additional setup needed." },
      ]}
    />
  );
}
