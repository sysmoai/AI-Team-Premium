import { ToolDetail } from "@/components/ToolDetail";
import { Video } from "lucide-react";

export default function KlingPage() {
  return (
    <ToolDetail
      name="Kling AI"
      tagline="in Bangladesh"
      description="Kling AI by Kuaishou is China's breakthrough AI video generator — producing realistic, smooth 1080p videos at 30fps. Kling 2.0 Master matches or beats Sora for motion quality at a fraction of the price. Perfect for Bangladeshi creators making social videos and ads. From ৳599/month via bKash/Nagad."
      accentColor="#E11D48"
      icon={Video}
      features={[
        "Kling 2.0 Master — latest model with smooth 30fps 1080p video output",
        "5-minute video generation — one of the longest per-clip durations available",
        "Image-to-Video — animate any photo with professional motion",
        "Text-to-Video — describe any scene in Bangla or English",
        "Lip Sync — make any face in any image speak your script",
        "AI Elements — overlay dynamic motion elements on real footage",
        "Video Extension — extend any clip seamlessly",
        "Effects Studio — 100+ cinematic transition and effect templates",
        "Virtual Try-On — place products on models without a photoshoot",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Kling Pro — Shared",
          price: "৳599",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Credits", value: "660/month" },
            { label: "Videos", value: "~200 sec of footage" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Kling Premier — Shared",
          price: "৳1,499",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Premier Shared",
          specs: [
            { label: "Credits", value: "3,000/month" },
            { label: "Videos", value: "~900 sec of footage" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/kling"
      specTables={[
        {
          title: "Video Generation",
          emoji: "🎬",
          rows: [
            { label: "Top Model", free: "Kling 1.6 (limited)", pro: "Kling 2.0 Master" },
            { label: "Credits Per Month", free: "66 (free tier)", pro: "660 (Pro)" },
            { label: "Max Duration Per Clip", free: "5 seconds", pro: "5 minutes (!) " },
            { label: "Max Resolution", free: "720p", pro: "1080p" },
            { label: "Frame Rate", free: "24fps", pro: "30fps" },
            { label: "Text-to-Video", free: "Yes (basic)", pro: "Yes (Kling 2.0)" },
            { label: "Image-to-Video", free: "Yes (basic)", pro: "Yes (high quality)" },
            { label: "Video Extension", free: "No", pro: "Yes" },
          ],
        },
        {
          title: "Special Features",
          emoji: "✨",
          rows: [
            { label: "Lip Sync", free: "No", pro: "Yes" },
            { label: "Virtual Try-On", free: "No", pro: "Yes" },
            { label: "AI Elements", free: "No", pro: "Yes" },
            { label: "Effects Studio", free: "Limited", pro: "100+ effects" },
            { label: "Camera Control", free: "No", pro: "Yes" },
            { label: "Commercial Rights", free: "No", pro: "Yes" },
            { label: "Watermark", free: "Yes", pro: "No" },
            { label: "Priority Queue", free: "No", pro: "Yes" },
          ],
        },
      ]}
      useCases={[
        {
          emoji: "👗",
          title: "Fashion Virtual Try-On",
          who: "Clothing brands, Daraz sellers, fashion designers",
          makes: "Products displayed on realistic models without a photoshoot",
          timeSaved: "৳30,000 model shoot → ৳0",
          prompt: "Virtual Try-On: this traditional jamdani saree on a professional female model, studio lighting, multiple angles",
        },
        {
          emoji: "📱",
          title: "TikTok & Reels Content",
          who: "TikTok creators, Instagram influencers",
          makes: "Eye-catching 15–30 second AI video clips for viral content",
          timeSaved: "৳5,000 production → ৳0",
          prompt: "Kling 2.0: a street food chef in Dhaka dramatically plating a beautiful dish, cinematic slow motion, 1080p",
        },
        {
          emoji: "💋",
          title: "Lip Sync Brand Videos",
          who: "Marketers, educators, vloggers",
          makes: "Make any character or portrait speak a custom script in Bangla",
          timeSaved: "Voice actor ৳8,000 → ৳0",
          prompt: "Lip Sync: animate this brand mascot to deliver a 30-second product pitch in Bangla",
        },
        {
          emoji: "🏖️",
          title: "Tourism & Hospitality",
          who: "Hotels, travel agencies, tour operators",
          makes: "Promotional videos of destinations and experiences without filming",
          timeSaved: "৳2,00,000 video crew → ৳0",
          prompt: "Cinematic drone footage over Cox's Bazar beach at golden hour, turquoise water, smooth camera glide, 1080p 30fps",
        },
        {
          emoji: "🎓",
          title: "Educational Animation",
          who: "Teachers, coaching centres, EdTech startups",
          makes: "Animated concept videos for Bangla medium students",
          timeSaved: "2 weeks animation → 2 hours",
          prompt: "Animated science video: how a rocket launches, clear educational style, colourful, 5-minute narrated explanation",
        },
        {
          emoji: "🛍️",
          title: "E-commerce Product Demos",
          who: "Online sellers, D2C brands",
          makes: "360-degree product demos and unboxing animations",
          timeSaved: "৳15,000 video → ৳0",
          prompt: "Product reveal: a premium leather bag slowly rotating on a luxury dark background, soft spotlight, 1080p",
        },
      ]}
      competitorRows={[
        { feature: "Max Clip Duration", thisProduct: "5 minutes (!)", chatgpt: "20 seconds (Sora)", claude: "❌ None", gemini: "8 seconds (Veo 2)" },
        { feature: "Resolution", thisProduct: "1080p @ 30fps", chatgpt: "1080p (Sora)", claude: "❌ None", gemini: "1080p (Veo 2)" },
        { feature: "Lip Sync", thisProduct: "✅ Yes", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Virtual Try-On", thisProduct: "✅ Yes", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
        { feature: "Video Extension", thisProduct: "✅ Yes", chatgpt: "Limited", claude: "❌ No", gemini: "Limited" },
        { feature: "Monthly Volume (Pro)", thisProduct: "~200 sec/mo", chatgpt: "Add-on cost", claude: "None", gemini: "~40 sec/mo" },
        { feature: "Best For", thisProduct: "Long video, fashion, social", chatgpt: "General AI chat", claude: "Writing/code", gemini: "Google ecosystem" },
        { feature: "AITPBD Shared Price", thisProduct: "৳599/mo", chatgpt: "৳399/mo", claude: "৳599/mo", gemini: "৳449/mo" },
      ]}
      extendedFaqs={[
        { q: "How long can Kling AI videos be?", a: "Kling AI supports up to 5-minute video clips per generation — one of the longest available from any AI video tool. This is a major advantage over competitors: Runway Gen-3 Alpha (10 seconds), Veo 2 (8 seconds), and Sora (20 seconds). For longer content needs like explainer videos and short documentaries, Kling is the best choice." },
        { q: "What is Kling Virtual Try-On and how does it work for Bangladesh sellers?", a: "Virtual Try-On lets you upload a product image (clothing, accessories) and have Kling AI place it realistically on a model figure. For Bangladeshi Daraz sellers and clothing brands, this eliminates the need for expensive model photoshoots — you can create professional product display images and videos at zero additional cost." },
        { q: "How does Kling Lip Sync work?", a: "Lip Sync takes any portrait image (real person, character, illustration) and makes the face speak your audio or script. You provide the audio track and the portrait — Kling generates a realistic video where the face lip-syncs naturally. Perfect for creating spokespeople, animated mascots, or educational presenters in Bangla." },
        { q: "Is Kling 2.0 Master better than Sora or Runway Gen-3?", a: "For motion smoothness and 1080p 30fps quality, Kling 2.0 Master is competitive with Sora and outperforms Runway Gen-3 Alpha in many scenarios — especially for longer clips. Kling's unique advantages are the 5-minute duration limit and features like Lip Sync and Virtual Try-On that competitors don't have. Runway Gen-3 Alpha has slightly better prompt adherence for complex scenes." },
        { q: "How many credits does each Kling video generation use?", a: "Kling Pro costs approximately 3.3 credits per second of video at 1080p with Kling 2.0 Master. With 660 credits per month: a 10-second clip costs ~33 credits, giving you ~20 clips. A 5-second clip costs ~16 credits, giving you ~41 clips. Using the faster Kling 1.6 model uses fewer credits if volume matters more than quality." },
      ]}
    />
  );
}
