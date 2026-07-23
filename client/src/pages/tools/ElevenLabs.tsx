import { ToolDetail } from "@/components/ToolDetail";
import { Mic } from "lucide-react";

const ELEVENLABS_USE_CASES = [
  {
    emoji: "🎬",
    title: "YouTube Video Voiceover",
    who: "YouTubers, educators, tutorial creators",
    makes: "Professional narrator voiceovers for 10+ YouTube videos per month in Bangla or English",
    timeSaved: "Voice artist ৳3,000/video → ৳0",
    prompt: "Use 'Rachel' voice (natural English): narrate this 800-word educational script on climate change — confident, warm, 120 words/minute pace",
  },
  {
    emoji: "🎙️",
    title: "Podcast Production",
    who: "Podcast hosts, content creators, journalists",
    makes: "Full podcast episodes with intro/outro narration, multiple voices, and professional quality",
    timeSaved: "Studio recording ৳10,000 → ৳0",
    prompt: "Generate a podcast intro: 'আস্সালামু আলাইকুম, AI Team Podcast-এ আপনাকে স্বাগতম' — Bangla voice, warm and enthusiastic, background music compatible",
  },
  {
    emoji: "🗣️",
    title: "Voice Cloning for Brand",
    who: "Businesses, educators, influencers",
    makes: "Clone your own voice and generate unlimited content — maintain consistent brand voice",
    timeSaved: "Record once → unlimited content forever",
    prompt: "Clone voice from: 30-second clean audio sample. Generate: 'আমাদের নতুন পণ্যটি আপনার জীবনকে সহজ করে দেবে' — exactly in cloned voice",
  },
  {
    emoji: "🎓",
    title: "Educational Audio Content",
    who: "Teachers, coaching centres, e-learning creators",
    makes: "Audio lessons, chapter narrations, and study guides for blind or auditory learners",
    timeSaved: "Recording studio ৳20,000/course → ৳0",
    prompt: "Narrate this HSC Physics chapter on electromagnetic induction — clear Bangla pronunciation, pause at equations, educational tone, female voice",
  },
  {
    emoji: "🎭",
    title: "Video Dubbing & Translation",
    who: "Video producers, agencies, international content teams",
    makes: "Automatically translate and re-voice any video in 32+ languages with lip-sync ready audio",
    timeSaved: "Professional dubbing ৳50,000 → ৳0",
    prompt: "Dub this Bangla product video into English — translate the script, generate natural English voiceover, preserve original pacing and timing",
  },
  {
    emoji: "📱",
    title: "App & Game Audio",
    who: "App developers, game studios, interactive media creators",
    makes: "Full character voice libraries, UI sound text-to-speech, and dynamic narration for apps",
    timeSaved: "Voice actor casting ৳1,00,000+ → ৳0",
    prompt: "Generate 50 variations of 'Level complete!' for a mobile game — excited, different energies, male/female voices, for a Bangladeshi audience",
  },
  {
    emoji: "📢",
    title: "Advertising Voiceovers",
    who: "Ad agencies, marketing teams, small businesses",
    makes: "Professional radio-quality voiceovers for Facebook video ads, TV commercials, and online campaigns",
    timeSaved: "Voice artist per ad ৳5,000 → ৳0",
    prompt: "Create a 30-second radio ad voiceover: 'AI Team Premium-তে ChatGPT Plus পাচ্ছেন মাত্র ৳৩৯৯/মাসে, bKash-এ পেমেন্ট করুন' — energetic male voice, Bengali",
  },
];

const ELEVENLABS_COMPETITOR_ROWS = [
  { feature: "Bangla Voice Quality", thisProduct: "⭐⭐⭐⭐⭐ Natural, accent-aware", chatgpt: "❌ No TTS generation", claude: "❌ No TTS generation", gemini: "⭐⭐⭐ (basic Bangla TTS)" },
  { feature: "Voice Cloning", thisProduct: "✅ 30-sec sample sufficient", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Languages Supported", thisProduct: "32+ incl. Bangla", chatgpt: "Text only", claude: "Text only", gemini: "Limited TTS" },
  { feature: "Characters per Month", thisProduct: "100K (Creator Shared)", chatgpt: "N/A", claude: "N/A", gemini: "N/A" },
  { feature: "Video Dubbing", thisProduct: "✅ Auto translate & re-voice", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Commercial Rights", thisProduct: "✅ Fully commercial", chatgpt: "N/A", claude: "N/A", gemini: "Basic" },
  { feature: "API for Developers", thisProduct: "✅ Full REST API", chatgpt: "Text API only", claude: "Text API only", gemini: "Limited TTS API" },
  { feature: "Voice Library", thisProduct: "30+ ultra-realistic voices", chatgpt: "N/A", claude: "N/A", gemini: "Limited" },
  { feature: "Script-to-Podcast", thisProduct: "✅ 1-click conversion", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Audio Download Format", thisProduct: "MP3, WAV, PCM", chatgpt: "N/A", claude: "N/A", gemini: "Limited" },
  { feature: "Real-time Streaming TTS", thisProduct: "✅ Yes, low latency", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Voice Design (custom)", thisProduct: "✅ Design new voice from text", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "AITP Shared Price", thisProduct: "৳699/mo (100K chars)", chatgpt: "৳499/mo (text AI only)", claude: "৳1,495/mo (text AI only)", gemini: "৳899/mo (text AI + basic TTS)" },
];

const ELEVENLABS_FAQS = [
  { q: "How many videos can I narrate with the ElevenLabs Creator 100K character plan?", a: "100,000 characters per month translates to approximately 10–12 typical YouTube video scripts (each 7,000–10,000 characters), 15+ podcast episodes (each ~5,000 characters), or unlimited short-form social media content. For a Bangladesh-based YouTuber posting 2–3 videos per week, the 100K character plan is more than sufficient." },
  { q: "Can ElevenLabs generate Bangla (Bengali) voices?", a: "Yes. ElevenLabs has dedicated Bangla language support with voices trained on authentic Bangladeshi speech patterns. The voice quality is natural-sounding for both formal and conversational Bangla. You can generate content in Bangla script and the model handles pronunciation, intonation, and typical Bangladeshi speech rhythm correctly." },
  { q: "How does ElevenLabs Voice Cloning work?", a: "Voice Cloning requires just a 30-second to 1-minute clean audio sample (no background noise). Upload it to ElevenLabs, name your voice, and it's ready to use. Generate unlimited text-to-speech in that cloned voice. For businesses, this means a founder or spokesperson can record their voice once and it can be used for unlimited future content without re-recording." },
  { q: "What is ElevenLabs Video Dubbing?", a: "ElevenLabs Dubbing Studio takes any video (upload or URL), translates the script, generates voiceover in the target language using a matching voice profile, and produces a dubbed video with lip-sync-ready audio. Available for 32+ language pairs. A Bangladeshi content creator can take an English YouTube video and produce a Bangla-dubbed version automatically." },
  { q: "Can I build apps with ElevenLabs API?", a: "Yes. ElevenLabs has a full REST API with SDKs for Python, JavaScript, and other languages. Developers can build: voice chatbots, interactive audio apps, narrated reading apps, language learning tools, and more. The API supports real-time text-to-speech streaming with very low latency (~300ms). This is how ElevenLabs powers many commercial AI voice applications." },
  { q: "What is ElevenLabs Sound Effects generator?", a: "ElevenLabs also generates sound effects from text descriptions — not just voices. Describe a sound (e.g., 'heavy rain on a tin roof in Bangladesh', 'busy Dhaka street market ambience') and ElevenLabs generates a realistic audio clip. Perfect for video producers, game developers, and podcast creators who need unique sound design." },
  { q: "How good is the ElevenLabs voice quality compared to human voice artists?", a: "ElevenLabs' premium voices are widely considered the closest to human-sounding AI speech available. Many YouTube viewers cannot tell the difference between ElevenLabs narration and a real voice artist. The key advantages are: zero recording cost, instant generation, unlimited retakes, and consistent tone across months of content. For most content creation purposes, ElevenLabs quality is commercially sufficient." },
  { q: "Is ElevenLabs content commercially licensed?", a: "Yes. The Creator plan includes full commercial rights — you can monetise YouTube content, use voiceovers in client videos, sell podcasts, and use audio in advertisements. The only restriction is you cannot resell ElevenLabs voiceovers directly as a standalone voice service without their Enterprise agreement." },
  { q: "What is the difference between ElevenLabs Creator Shared and Personal plans?", a: "The Shared plan (৳699/mo) gives you access via a shared account — you get the full Creator feature set (100K characters, all voices, voice cloning, commercial rights) but share the account infrastructure with other users. The Personal plan (৳2,500/mo) upgrades your own ElevenLabs account — fully private, your voice clones are only visible to you, and you get 500K characters per month for heavy professional use." },
  { q: "Can ElevenLabs narrate long documents like books or reports?", a: "Yes. ElevenLabs can convert any text to audio — including long documents, chapters, and full books. With 100K characters per month (Creator plan), you can narrate approximately 70,000–80,000 words, which is a full-length non-fiction book. For academics or publishers creating audio versions of research papers, ElevenLabs is the most cost-effective professional solution." },
  { q: "How is ElevenLabs delivered and can I use it immediately?", a: "After payment confirmation on WhatsApp, we deliver ElevenLabs Creator credentials within 5–15 minutes (Shared plan) or 2–4 hours (Personal plan). You log in at elevenlabs.io, and all Creator features are immediately available — no additional setup or downloads needed. The platform is browser-based and works on any device." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "elevenlabs",
  "category": "video",
  "priceBdt": 999,
  "priceLabel": "৳999/mo",
  "model": "Eleven Multilingual v2 + Turbo",
  "contextWindow": "N/A (audio gen)",
  "multimodal": "Text-to-speech, voice clone, dubbing",
  "banglaQuality": "⭐⭐⭐ (limited)",
  "speed": "Real-time streaming",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "ElevenLabs",
  "tagline": "Most realistic AI voice generator",
  "toolPath": "/tools/elevenlabs",
  "iconName": "Mic",
  "accent": "#F5A623",
  "bestUseCase": "Podcasters, YouTubers, audiobook creators",
  "bestFor": [
    "Ultra-realistic text-to-speech in 30+ languages",
    "Voice cloning (your own or stock voices)",
    "Long-form audiobook & podcast generation",
    "AI dubbing across languages",
    "Sound effects generation"
  ],
  "weaknesses": [
    "No native video — audio only",
    "Bangla voice quality lags English"
  ]
} as const;

export default function ElevenLabsPage() {
  return (
    <ToolDetail
      name="ElevenLabs Voice AI"
      tagline="in Bangladesh"
      description="ElevenLabs is the world's most realistic AI voice generator — creating natural-sounding speech in Bangla, English, and 32+ languages. Perfect for BD YouTubers, educators, and content creators. Clone voices, dub videos, generate podcasts — from ৳699/month via bKash/Nagad."
      accentColor="#F97316"
      icon={Mic}
      features={[
        "32+ languages including Bangla and English text-to-speech",
        "100,000 characters/month — enough for 10+ YouTube videos",
        "Voice cloning — replicate any voice from a 30-second sample",
        "30+ ultra-realistic AI voices (male, female, formal, casual)",
        "Video dubbing — translate & re-voice any video automatically",
        "Sound effects generation from text descriptions",
        "Script-to-podcast conversion in one click",
        "Commercial usage rights — monetise on YouTube, client work, ads",
        "API access for developers building voice-enabled apps",
        "Voice Design — create an entirely new synthetic voice",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "ElevenLabs Creator — Shared",
          price: "৳699",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Usage", value: "100K characters/mo" },
            { label: "Languages", value: "32+ incl. Bangla" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "ElevenLabs Creator — Personal",
          price: "৳2,500",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Usage", value: "500K characters/mo" },
            { label: "Access", value: "Dedicated private seat" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/elevenlabs"
      specTables={[
        {
          title: "Voice Generation Features",
          emoji: "🎙️",
          tier2Label: "Shared (৳599/mo)",
          tier3Label: "Personal (৳1,799/mo)",
          rows: [
            { label: "Characters per Month", free: "10,000 (free tier)", pro: "100,000 (Creator)", premium: "500,000 (Independent)" },
            { label: "Voice Cloning", free: "No", pro: "Yes (30-sec sample)", premium: "Yes (professional clone)" },
            { label: "Languages", free: "Limited", pro: "32+ incl. Bangla", premium: "32+ incl. Bangla" },
            { label: "Voice Library", free: "10 basic voices", pro: "30+ ultra-realistic voices", premium: "30+ voices + own clones" },
            { label: "Commercial Rights", free: "No", pro: "Yes, fully commercial", premium: "Yes, fully commercial" },
            { label: "Audio Quality", free: "128kbps", pro: "192kbps (highest quality)", premium: "192kbps (highest quality)" },
            { label: "Voice Design (custom)", free: "No", pro: "Yes, create new voices", premium: "Yes, unlimited custom voices" },
            { label: "Sound Effects Generation", free: "No", pro: "Yes, text-to-SFX", premium: "Yes, text-to-SFX" },
          ],
        },
        {
          title: "Professional & Developer Features",
          emoji: "🔧",
          tier2Label: "Shared (৳599/mo)",
          tier3Label: "Personal (৳1,799/mo)",
          rows: [
            { label: "Video Dubbing Studio", free: "No", pro: "Yes, 32+ languages", premium: "Yes, 32+ languages" },
            { label: "API Access", free: "Limited", pro: "Shared API key", premium: "Own API key + higher limits" },
            { label: "Real-time Streaming TTS", free: "No", pro: "Yes, ~300ms latency", premium: "Yes, ~300ms latency" },
            { label: "Script-to-Podcast", free: "No", pro: "Yes, 1-click", premium: "Yes, 1-click" },
            { label: "Projects (audio manager)", free: "No", pro: "Yes", premium: "Yes (private projects)" },
            { label: "Multiple Output Formats", free: "MP3 only", pro: "MP3, WAV, PCM, FLAC", premium: "MP3, WAV, PCM, FLAC" },
            { label: "Pronunciation Dictionary", free: "No", pro: "Yes, custom words", premium: "Yes, unlimited custom words" },
            { label: "Priority Processing", free: "No", pro: "Yes", premium: "Yes (highest priority)" },
          ],
        },
      ]}
      useCases={ELEVENLABS_USE_CASES}
      competitorRows={ELEVENLABS_COMPETITOR_ROWS}
      extendedFaqs={ELEVENLABS_FAQS}
    />
  );
}
