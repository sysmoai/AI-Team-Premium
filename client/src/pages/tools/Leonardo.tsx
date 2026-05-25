import { ToolDetail } from "@/components/ToolDetail";
import { Palette } from "lucide-react";

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
          rows: [
            { label: "Top Model", free: "Leonardo Diffusion (basic)", pro: "Phoenix + Flux Pro 1.1" },
            { label: "Tokens Per Month", free: "150/day (~4,500)", pro: "8,500 (Artisan)" },
            { label: "Images Per Month", free: "~150", pro: "~850 (at 10 tokens each)" },
            { label: "Max Resolution", free: "1024×1024", pro: "2048×2048 (upscaled to 4K)" },
            { label: "Generations Per Job", free: "4 at once", pro: "8 at once" },
            { label: "Real-time Generation", free: "No", pro: "Yes" },
            { label: "Image-to-Image", free: "No", pro: "Yes" },
            { label: "ControlNet (pose/depth)", free: "No", pro: "Yes" },
          ],
        },
        {
          title: "Editing & Video Tools",
          emoji: "🎬",
          rows: [
            { label: "Canvas Editor", free: "No", pro: "Full access" },
            { label: "Universal Upscaler", free: "No", pro: "Yes" },
            { label: "Inpainting", free: "No", pro: "Yes" },
            { label: "Outpainting", free: "No", pro: "Yes" },
            { label: "Motion (Animate Image)", free: "No", pro: "Yes (4s clips)" },
            { label: "3D Texture Gen", free: "No", pro: "Yes" },
            { label: "Remove Background", free: "No", pro: "Yes" },
            { label: "Private Generation Mode", free: "No", pro: "Yes" },
          ],
        },
      ]}
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
      ]}
      competitorRows={[
        { feature: "Image Quality", thisProduct: "⭐⭐⭐⭐⭐ (specialist)", chatgpt: "⭐⭐⭐ (DALL·E)", claude: "❌ No generation", gemini: "⭐⭐⭐⭐ (Imagen 4)" },
        { feature: "Models Available", thisProduct: "20+ fine-tuned", chatgpt: "DALL·E 3 only", claude: "None", gemini: "Imagen 4 only" },
        { feature: "Image-to-Image", thisProduct: "✅ Full ControlNet", chatgpt: "Basic", claude: "❌ No", gemini: "Basic" },
        { feature: "Canvas / Inpainting", thisProduct: "✅ Professional", chatgpt: "Limited", claude: "❌ No", gemini: "Basic" },
        { feature: "Animate Image (Video)", thisProduct: "✅ 4-sec clips", chatgpt: "Via Sora", claude: "❌ No", gemini: "✅ Veo 2" },
        { feature: "Monthly Image Volume", thisProduct: "~850 images", chatgpt: "~50 images", claude: "0", gemini: "~50 images" },
        { feature: "Best For", thisProduct: "Visual creatives", chatgpt: "General AI chat", claude: "Writing & code", gemini: "Google ecosystem" },
        { feature: "AITPBD Shared Price", thisProduct: "৳349/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
      ]}
      extendedFaqs={[
        { q: "How many images can I generate with Leonardo AI Artisan per month?", a: "The Artisan plan includes 8,500 tokens per month. Each image generation costs 7–15 tokens depending on resolution and model. This means approximately 570–1,200 images per month — enough for heavy professional use. Real-time generation uses fewer tokens." },
        { q: "What is the difference between Leonardo Phoenix and Flux Pro?", a: "Leonardo Phoenix is Leonardo's own flagship model — excellent for photorealism, consistent characters, and product photography. Flux Pro 1.1 (by Black Forest Labs) is better for creative art, illustrations, and stylistic control. Both are available on the Artisan plan." },
        { q: "Can Leonardo AI generate consistent characters across multiple images?", a: "Yes — this is Leonardo's strongest feature. You can train a character element or use ControlNet to maintain pose, appearance, and style consistency across dozens of images. Essential for game development, comic creation, and brand mascot work." },
        { q: "Does Leonardo AI support Bangla text in images?", a: "Bangla text in AI-generated images is challenging for all tools. Leonardo (like others) has limited Bangla text accuracy. For best results, generate the image first, then add Bangla text in Canva or Photoshop. The image quality itself fully supports Bangladeshi subjects and aesthetics." },
        { q: "What is Leonardo Motion and how do I use it?", a: "Leonardo Motion animates any static image into a 4-second video clip. Upload or generate an image, click 'Motion', and Leonardo creates subtle movement — water flowing, hair blowing, lighting shifts. Perfect for Instagram Reels and TikTok content. Available on the Artisan plan." },
      ]}
    />
  );
}
