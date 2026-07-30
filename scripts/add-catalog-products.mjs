#!/usr/bin/env node
// One-off migration: adds the Tier 1/Tier 2 products that had no catalog record
// to client/src/data/products-complete.json (the source the shipped catalog is
// generated from). Idempotent — re-running skips anything already present by id.
//
//   node scripts/add-catalog-products.mjs && npm run build:catalog
//
// PRICING: every product added here ships with priceOnRequest so no invented
// number reaches a customer. `price` holds the BDT cost floor — (official USD x
// 130) x 1.15 — which is a cost basis, not a sell price, and is never rendered
// while priceOnRequest is set. It exists so the listing sorts sensibly and so
// the floor is visible when the CEO sets the real sell price.
//
// EXCLUDED ON PURPOSE (do not "fix" by adding them):
//   OpenAI Sora     - discontinued Apr 2026; advertising access would be false
//   Tome            - AI presentation product shut down; tome.app is a CRM now
//   Google Flow/Veo - ships inside Google AI Pro, already in the catalog
//   NotebookLM Plus - ships inside Google AI Pro, already in the catalog
//   Higgsfield      - resale not approved; pending CEO decision

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "client/src/data/products-complete.json");

const USD_BDT = 130;
const VAT = 1.15;
const floor = (usd) => Math.round((usd * USD_BDT * VAT) / 16) * 16;

// officialUSD is the vendor's published monthly rate used to derive our cost
// floor. Where a vendor only sells annually, the annual rate is divided out and
// noted in the description rather than presented as a monthly subscription.
const NEW = [
  {
    id: "adobe-cc-personal", name: "Adobe Creative Cloud — Personal", slug: "adobe-creative-cloud-bangladesh",
    brand: "Adobe Creative Cloud", provider: "Adobe", brandColor: "#FF0000", category: "ai-design",
    officialUSD: 69.99, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["ai-design", "image-edit", "generative-fill", "video-editing", "vectors", "photos"],
    description: "The full Adobe suite — Photoshop, Illustrator, Premiere Pro, After Effects and Firefly generative AI — on your own Adobe account.",
    descriptionBN: "সম্পূর্ণ Adobe স্যুট — Photoshop, Illustrator, Premiere Pro, After Effects এবং Firefly জেনারেটিভ AI, আপনার নিজের Adobe অ্যাকাউন্টে।",
    useCases: [
      "প্রফেশনাল ফটো এডিটিং ও রিটাচিং",
      "ক্লায়েন্টের জন্য লোগো ও ব্র্যান্ড ডিজাইন",
      "ইউটিউব ও ফেসবুকের ভিডিও এডিটিং",
      "প্রিন্ট ডিজাইন — ব্যানার, লিফলেট, ভিজিটিং কার্ড",
    ],
  },
  {
    id: "poe-personal", name: "Poe — Personal", slug: "poe-bangladesh",
    brand: "Poe", provider: "Quora", brandColor: "#5D5CDE", category: "ai-assistant",
    officialUSD: 19.99, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["text", "code", "image-gen", "vision", "agents"],
    description: "One subscription that opens GPT, Claude, Gemini and Grok side by side, plus custom bots — useful when you want to compare answers before trusting one.",
    descriptionBN: "একটি সাবস্ক্রিপশনেই GPT, Claude, Gemini ও Grok — পাশাপাশি তুলনা করে সেরা উত্তরটি বেছে নিন। কাস্টম বটও বানাতে পারবেন।",
    useCases: [
      "একই প্রশ্ন একাধিক AI-তে করে সেরা উত্তর বাছাই",
      "নিজের কাজের জন্য কাস্টম বট তৈরি",
      "রিসার্চ ও কনটেন্ট লেখা",
    ],
  },
  {
    id: "luma-dream-machine-personal", name: "Luma Dream Machine — Personal", slug: "luma-dream-machine-bangladesh",
    brand: "Luma Dream Machine", provider: "Luma AI", brandColor: "#1A1A1A", category: "ai-video",
    officialUSD: 29.99, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["video-gen", "text-to-video", "image-to-video", "keyframe", "cinematic-quality"],
    description: "Text-to-video and image-to-video with keyframe control, so you can set the first and last frame and direct how the shot actually moves.",
    descriptionBN: "টেক্সট বা ছবি থেকে ভিডিও তৈরি করুন। কীফ্রেম কন্ট্রোল দিয়ে শটের শুরু ও শেষ ঠিক করে দিতে পারবেন।",
    useCases: [
      "সোশ্যাল মিডিয়ার জন্য শর্ট ভিডিও ক্লিপ",
      "প্রোডাক্ট ছবিকে অ্যানিমেটেড ভিডিওতে রূপান্তর",
      "ক্লায়েন্ট পিচের জন্য কনসেপ্ট ভিডিও",
    ],
  },
  {
    id: "hailuo-minimax-personal", name: "Hailuo AI (MiniMax) — Personal", slug: "hailuo-ai-bangladesh",
    brand: "Hailuo AI", provider: "MiniMax", brandColor: "#FF4D4F", category: "ai-video",
    officialUSD: 14.99, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["video-gen", "text-to-video", "image-to-video", "motion-realism"],
    description: "Text-to-video known for natural, physically believable motion at a lower cost than the Western tools. Note: MiniMax is based in Shanghai and processes your prompts on servers in China — worth knowing before you upload anything confidential.",
    descriptionBN: "কম খরচে বাস্তবসম্মত মোশনের AI ভিডিও। মনে রাখবেন — MiniMax চীনভিত্তিক এবং আপনার ডেটা চীনের সার্ভারে প্রসেস হয়, তাই গোপনীয় কিছু আপলোড করার আগে বিবেচনা করুন।",
    useCases: [
      "কম বাজেটে সোশ্যাল মিডিয়ার ভিডিও কনটেন্ট",
      "ছবি থেকে অ্যানিমেশন তৈরি",
    ],
  },
  {
    id: "veed-personal", name: "VEED — Personal", slug: "veed-bangladesh",
    brand: "VEED", provider: "Veed Labs", brandColor: "#B5FF3B", category: "ai-video",
    officialUSD: 29, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["video-editing", "auto-captions", "translator", "screen-recording", "ai-avatars"],
    description: "Browser-based video editing with automatic subtitles and translation — no heavy software to install, which matters on a mid-range laptop.",
    descriptionBN: "ব্রাউজারেই ভিডিও এডিটিং, অটো সাবটাইটেল ও অনুবাদসহ। ভারী সফটওয়্যার ইনস্টল করতে হয় না — কম কনফিগারেশনের ল্যাপটপেও চলে।",
    useCases: [
      "ভিডিওতে অটো সাবটাইটেল যোগ করা",
      "ইংরেজি ভিডিও বাংলায় সাবটাইটেল করা",
      "স্ক্রিন রেকর্ড করে টিউটোরিয়াল বানানো",
    ],
  },
  {
    id: "filmora-annual", name: "Filmora — Annual Licence", slug: "filmora-bangladesh",
    brand: "Filmora", provider: "Wondershare", brandColor: "#00C5A1", category: "ai-video",
    officialUSD: 5.83, tier: "Annual Licence", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["video-editing", "ai-effects", "auto-captions", "4k-export"],
    description: "Desktop video editor sold as a yearly licence rather than a monthly subscription — the cheaper route if you edit regularly. AI effects and the stock effects library are billed separately by the vendor.",
    descriptionBN: "ডেস্কটপ ভিডিও এডিটর, মাসিক নয় — বাৎসরিক লাইসেন্স। নিয়মিত এডিট করলে এটাই সাশ্রয়ী। মনে রাখবেন, AI ইফেক্ট ও স্টক লাইব্রেরির খরচ আলাদা।",
    useCases: [
      "ইউটিউব ভিডিও এডিটিং",
      "বিয়ে ও ইভেন্টের ভিডিও এডিটিং",
      "শিক্ষার্থীদের প্রজেক্ট ভিডিও",
    ],
  },
  {
    id: "captions-personal", name: "Captions — Personal", slug: "captions-app-bangladesh",
    brand: "Captions", provider: "Captions AI", brandColor: "#000000", category: "ai-video",
    officialUSD: 24.99, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["auto-captions", "video-editing", "ai-avatars", "shorts-maker"],
    description: "Short-form video editing built around automatic captions and talking-head clean-up. Mobile-first, so the desktop workflow is limited.",
    descriptionBN: "শর্ট ভিডিওর জন্য অটো ক্যাপশন ও টকিং-হেড এডিটিং। মূলত মোবাইল অ্যাপ — ডেস্কটপে সীমিত সুবিধা।",
    useCases: [
      "রিলস ও শর্টসে অটো ক্যাপশন",
      "ফেসবুক ভিডিওর জন্য দ্রুত এডিটিং",
    ],
  },
  {
    id: "speechify-personal", name: "Speechify Reader — Personal", slug: "speechify-bangladesh",
    brand: "Speechify", provider: "Speechify", brandColor: "#2D7FF9", category: "ai-voice-music",
    officialUSD: 11.58, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["text-to-speech", "multi-language", "document"],
    description: "Listens out any PDF, article or textbook in a natural voice. This is the Reader plan for listening — Speechify Studio, which creates voiceovers for publishing, is a separate product.",
    descriptionBN: "PDF, আর্টিকেল বা বইয়ের লেখা শুনতে পারবেন স্বাভাবিক কণ্ঠে। এটি Reader প্ল্যান (শোনার জন্য) — ভয়েসওভার বানানোর Studio আলাদা প্রোডাক্ট।",
    useCases: [
      "যাতায়াতের সময় পড়ার বদলে শোনা",
      "দীর্ঘ রিসার্চ পেপার দ্রুত শেষ করা",
      "চোখের ক্লান্তি কমিয়ে পড়াশোনা",
    ],
  },
  {
    id: "playht-personal", name: "PlayHT — Personal", slug: "playht-bangladesh",
    brand: "PlayHT", provider: "PlayHT", brandColor: "#7C3AED", category: "ai-voice-music",
    officialUSD: 31.2, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["text-to-speech", "voice-cloning", "multi-language", "studio-quality"],
    description: "Text-to-speech and voice cloning aimed at published work — audiobooks, ads and narration where the output has to sound broadcast-clean.",
    descriptionBN: "টেক্সট-টু-স্পিচ ও ভয়েস ক্লোনিং, পাবলিশিং মানের আউটপুটের জন্য — অডিওবুক, বিজ্ঞাপন ও ন্যারেশনে ব্যবহার উপযোগী।",
    useCases: [
      "ইউটিউব ভিডিওর ভয়েসওভার",
      "অডিওবুক ও পডকাস্ট ন্যারেশন",
      "বিজ্ঞাপনের ভয়েসওভার",
    ],
  },
  {
    id: "krisp-personal", name: "Krisp — Personal", slug: "krisp-bangladesh",
    brand: "Krisp", provider: "Krisp", brandColor: "#4A00E0", category: "ai-voice-music",
    officialUSD: 8, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["voice", "auto-transcription", "multi-language"],
    description: "Removes background noise from calls in real time and processes audio on your own device rather than in the cloud. Practical if you take client calls from a noisy street or a shared room.",
    descriptionBN: "কলের ব্যাকগ্রাউন্ড নয়েজ রিয়েল-টাইমে সরিয়ে দেয়, আর অডিও আপনার ডিভাইসেই প্রসেস হয় — ক্লাউডে যায় না। রাস্তার শব্দ বা শেয়ার করা ঘর থেকে ক্লায়েন্ট কল করলে কাজে দেবে।",
    useCases: [
      "ক্লায়েন্ট মিটিংয়ে ব্যাকগ্রাউন্ড নয়েজ বন্ধ",
      "কল সেন্টার ও রিমোট কাজ",
      "অনলাইন ক্লাস ও ইন্টারভিউ",
    ],
  },
  {
    id: "lovable-personal", name: "Lovable — Personal", slug: "lovable-bangladesh",
    brand: "Lovable", provider: "Lovable", brandColor: "#FF4785", category: "ai-code",
    officialUSD: 25, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["code", "autonomous-coding", "agents"],
    description: "Describe an app in plain language and get a working full-stack build you can deploy. Credit-metered — a complex app consumes credits quickly, and hosting is billed separately.",
    descriptionBN: "সাধারণ ভাষায় অ্যাপের বর্ণনা দিন, কাজ করা ফুল-স্ট্যাক অ্যাপ পাবেন। ক্রেডিট-ভিত্তিক — জটিল অ্যাপে ক্রেডিট দ্রুত ফুরায়, আর হোস্টিংয়ের খরচ আলাদা।",
    useCases: [
      "ক্লায়েন্টের জন্য দ্রুত MVP তৈরি",
      "নিজের বিজনেস আইডিয়া যাচাই",
      "ল্যান্ডিং পেজ ও ড্যাশবোর্ড বানানো",
    ],
  },
  {
    id: "bolt-new-personal", name: "Bolt.new — Personal", slug: "bolt-new-bangladesh",
    brand: "Bolt.new", provider: "StackBlitz", brandColor: "#1389FD", category: "ai-code",
    officialUSD: 25, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["code", "autonomous-coding", "debugging"],
    description: "Builds and runs a web app entirely in the browser from a prompt. Strongest on front-end work — complex databases, auth and server logic are where it struggles. Token-metered, and debugging burns tokens fast.",
    descriptionBN: "ব্রাউজারেই প্রম্পট থেকে ওয়েব অ্যাপ তৈরি ও রান করে। ফ্রন্টএন্ডে ভালো — ডাটাবেস, অথেনটিকেশন ও সার্ভার লজিকে দুর্বল। টোকেন-ভিত্তিক, ডিবাগিংয়ে টোকেন দ্রুত খরচ হয়।",
    useCases: [
      "দ্রুত ফ্রন্টএন্ড প্রোটোটাইপ",
      "ল্যান্ডিং পেজ তৈরি",
      "কোড শেখার সময় পরীক্ষা-নিরীক্ষা",
    ],
  },
  {
    id: "figma-professional", name: "Figma Professional — Personal Seat", slug: "figma-bangladesh",
    brand: "Figma", provider: "Figma", brandColor: "#F24E1E", category: "ai-design",
    officialUSD: 16, tier: "Personal Seat", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["ai-design", "workspace", "brand-kit"],
    description: "The industry standard for interface design and prototyping, with Dev Mode for handoff to developers. A full seat also carries a monthly AI credit allowance.",
    descriptionBN: "ইন্টারফেস ডিজাইন ও প্রোটোটাইপিংয়ের ইন্ডাস্ট্রি স্ট্যান্ডার্ড, ডেভেলপারদের হ্যান্ডঅফের জন্য Dev Mode সহ। ফুল সিটে মাসিক AI ক্রেডিটও থাকে।",
    useCases: [
      "ক্লায়েন্টের ওয়েবসাইট ও অ্যাপ ডিজাইন",
      "UI/UX পোর্টফোলিও তৈরি",
      "ডেভেলপারদের সাথে ডিজাইন হ্যান্ডঅফ",
    ],
  },
  {
    id: "photoroom-personal", name: "Photoroom — Personal", slug: "photoroom-bangladesh",
    brand: "Photoroom", provider: "Photoroom", brandColor: "#E91E63", category: "ai-image",
    officialUSD: 12.99, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["background-remover", "image-edit", "ai-image-gen"],
    description: "Product photo editing built for sellers — cut out the background, drop in an AI-generated scene and batch the whole catalogue without touching Photoshop.",
    descriptionBN: "অনলাইন সেলারদের জন্য প্রোডাক্ট ছবি এডিটিং — ব্যাকগ্রাউন্ড সরান, AI ব্যাকগ্রাউন্ড বসান, পুরো ক্যাটালগ একসাথে এডিট করুন। Photoshop লাগে না।",
    useCases: [
      "ফেসবুক পেজের প্রোডাক্ট ছবি পরিষ্কার করা",
      "দারাজ ও ই-কমার্সের জন্য সাদা ব্যাকগ্রাউন্ড",
      "একসাথে অনেক প্রোডাক্ট ছবি এডিট",
    ],
  },
  {
    id: "recraft-personal", name: "Recraft — Personal", slug: "recraft-bangladesh",
    brand: "Recraft", provider: "Recraft AI", brandColor: "#0A0A0A", category: "ai-image",
    officialUSD: 12, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["image-gen", "vectors", "icons", "brand-kit"],
    description: "The one image generator that outputs true editable vectors and SVG, not just pixels — which is what you need for a logo that still looks right on a printed banner.",
    descriptionBN: "একমাত্র AI ইমেজ জেনারেটর যা সত্যিকারের এডিটেবল ভেক্টর ও SVG দেয় — লোগো বা প্রিন্ট ব্যানারে যেটা আসলে দরকার।",
    useCases: [
      "লোগো ও ব্র্যান্ড আইডেন্টিটি ডিজাইন",
      "প্রিন্টের জন্য ভেক্টর গ্রাফিক্স",
      "কাস্টম আইকন সেট তৈরি",
    ],
  },
  {
    id: "krea-personal", name: "Krea AI — Personal", slug: "krea-ai-bangladesh",
    brand: "Krea AI", provider: "Krea", brandColor: "#FF6B00", category: "ai-image",
    officialUSD: 35, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["image-gen", "image-edit", "ai-upscaler", "video-gen", "ai-reimagine"],
    description: "Puts many image and video models behind one subscription with a real-time canvas, so you can see the result change as you type instead of waiting on each render.",
    descriptionBN: "একটি সাবস্ক্রিপশনেই অনেক ইমেজ ও ভিডিও মডেল, রিয়েল-টাইম ক্যানভাসসহ — টাইপ করতে করতেই ফলাফল বদলাতে দেখবেন।",
    useCases: [
      "দ্রুত ভিজ্যুয়াল আইডিয়া পরীক্ষা",
      "ছবির রেজোলিউশন বাড়ানো",
      "একাধিক মডেল তুলনা করা",
    ],
  },
  {
    id: "beautiful-ai-personal", name: "Beautiful.ai — Personal", slug: "beautiful-ai-bangladesh",
    brand: "Beautiful.ai", provider: "Beautiful.ai", brandColor: "#0D1F2D", category: "ai-workspace",
    officialUSD: 12, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["powerpoint-ai", "ai-design", "workspace"],
    description: "Slides that lay themselves out as you add content, so a deck stays visually consistent without you nudging boxes around.",
    descriptionBN: "কনটেন্ট যোগ করার সাথে সাথেই স্লাইড নিজে থেকে সাজিয়ে নেয় — বক্স টেনে ঠিক করতে হয় না, ডেক দেখতে সবসময় গোছানো থাকে।",
    useCases: [
      "ক্লায়েন্ট পিচ ডেক তৈরি",
      "বিশ্ববিদ্যালয়ের প্রেজেন্টেশন",
      "ইনভেস্টর প্রেজেন্টেশন",
    ],
  },
  {
    id: "plus-ai-personal", name: "Plus AI — Personal", slug: "plus-ai-bangladesh",
    brand: "Plus AI", provider: "Plus Docs", brandColor: "#5B5BD6", category: "ai-workspace",
    officialUSD: 15, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["powerpoint-ai", "workspace", "document"],
    description: "Generates decks inside Google Slides and PowerPoint themselves, so the file stays fully editable in the tool your client already uses.",
    descriptionBN: "Google Slides ও PowerPoint-এর ভেতরেই ডেক তৈরি করে — ফাইলটি ক্লায়েন্টের পরিচিত টুলেই সম্পূর্ণ এডিটেবল থাকে।",
    useCases: [
      "Google Slides-এ দ্রুত প্রেজেন্টেশন",
      "রিপোর্ট থেকে স্লাইড বানানো",
    ],
  },
  {
    id: "fireflies-personal", name: "Fireflies.ai — Personal", slug: "fireflies-ai-bangladesh",
    brand: "Fireflies.ai", provider: "Fireflies", brandColor: "#F5A623", category: "ai-workspace",
    officialUSD: 18, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["auto-transcription", "summarizer", "workspace", "multi-language"],
    description: "Joins your calls automatically, records and transcribes them, then writes up the summary and action items. AI features draw on a monthly credit pool that can run out.",
    descriptionBN: "আপনার মিটিংয়ে নিজে থেকেই যোগ দেয়, রেকর্ড ও ট্রান্সক্রাইব করে, তারপর সারসংক্ষেপ ও করণীয় লিখে দেয়। AI ফিচারগুলো মাসিক ক্রেডিট থেকে চলে, যা ফুরিয়ে যেতে পারে।",
    useCases: [
      "ক্লায়েন্ট মিটিংয়ের নোট রাখা",
      "টিম মিটিংয়ের সিদ্ধান্ত লিপিবদ্ধ করা",
    ],
  },
  {
    id: "fathom-personal", name: "Fathom — Personal", slug: "fathom-bangladesh",
    brand: "Fathom", provider: "Fathom Video", brandColor: "#7B61FF", category: "ai-workspace",
    officialUSD: 16, tier: "Personal Account", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["auto-transcription", "summarizer", "multi-language", "workspace"],
    description: "Meeting recording with instant AI summaries. Worth knowing: the free plan already covers unlimited recording and transcription in many languages, so the paid tier is mainly for team dashboards and CRM sync.",
    descriptionBN: "মিটিং রেকর্ডিং ও তাৎক্ষণিক AI সারসংক্ষেপ। জেনে রাখুন — ফ্রি প্ল্যানেই আনলিমিটেড রেকর্ডিং ও ট্রান্সক্রিপশন পাওয়া যায়; পেইড মূলত টিম ড্যাশবোর্ড ও CRM-এর জন্য।",
    useCases: [
      "সেলস কলের নোট ও ফলোআপ",
      "টিমের সাথে মিটিং রেকর্ড শেয়ার",
    ],
  },
  {
    id: "m365-copilot-seat", name: "Microsoft 365 Copilot — Business Seat", slug: "microsoft-365-copilot-bangladesh",
    brand: "Microsoft 365 Copilot", provider: "Microsoft", brandColor: "#0078D4", category: "ai-workspace",
    officialUSD: 52, tier: "Business Seat", accessType: "personal", deliverySLA: "Up to 12 hours",
    capabilities: ["word-ai", "excel-ai", "powerpoint-ai", "outlook-ai", "teams-ai", "document"],
    description: "Copilot inside Word, Excel, PowerPoint, Outlook and Teams. It is an add-on, not a standalone product — it only runs on top of a qualifying Microsoft 365 business licence, so the real cost covers both. Set up on your own company tenant.",
    descriptionBN: "Word, Excel, PowerPoint, Outlook ও Teams-এর ভেতরে Copilot। এটি অ্যাড-অন, আলাদা প্রোডাক্ট নয় — Microsoft 365 বিজনেস লাইসেন্সের উপর চলে, তাই খরচে দুটোই ধরতে হয়। আপনার নিজের কোম্পানি টেন্যান্টে সেটআপ হয়।",
    useCases: [
      "Excel-এ ডেটা বিশ্লেষণ ও রিপোর্ট",
      "দীর্ঘ ইমেইল থ্রেডের সারসংক্ষেপ",
      "ডকুমেন্ট থেকে প্রেজেন্টেশন তৈরি",
    ],
  },
  {
    id: "google-workspace-ai-seat", name: "Google Workspace with Gemini — Business Seat", slug: "google-workspace-ai-bangladesh",
    brand: "Google Workspace", provider: "Google", brandColor: "#4285F4", category: "ai-workspace",
    officialUSD: 14, tier: "Business Standard Seat", accessType: "personal", deliverySLA: "Up to 12 hours",
    capabilities: ["workspace", "document", "text", "summarizer", "multi-language"],
    description: "Business email on your own domain plus Gemini built into Gmail, Docs, Sheets, Slides and Meet. Gemini is bundled into the plan — there is no separate AI add-on to buy any more.",
    descriptionBN: "নিজের ডোমেইনে বিজনেস ইমেইল, সাথে Gmail, Docs, Sheets, Slides ও Meet-এ Gemini। Gemini প্ল্যানের ভেতরেই আছে — আলাদা AI অ্যাড-অন কেনার দরকার নেই।",
    useCases: [
      "নিজের ডোমেইনে প্রফেশনাল ইমেইল",
      "Google Docs-এ AI দিয়ে লেখা",
      "মিটিংয়ের অটো সারসংক্ষেপ",
    ],
  },
];

const raw = JSON.parse(readFileSync(SRC, "utf-8"));
const list = raw.products;
const existing = new Set(list.map((p) => p.id));

let added = 0;
for (const p of NEW) {
  if (existing.has(p.id)) continue;
  list.push({
    ...p,
    price: floor(p.officialUSD),
    priceOnRequest: true,
    badge: "New",
    featured: false,
    status: "Active",
    brandSlug: p.slug,
    whatsappMsg: `Hi! I want ${p.name} — please confirm the current price and payment details.`,
    whyBuyFromAIPS:
      "bKash, Nagad বা ব্যাংক ট্রান্সফারে পেমেন্ট — ইন্টারন্যাশনাল কার্ড লাগে না। সেটআপ আমরা করে দিই, ৩০ দিনের রিপ্লেসমেন্ট গ্যারান্টি, আর WhatsApp-এ বাংলা সাপোর্ট।",
    deliveryMethod: "WhatsApp activation on your own account",
    lastVerifiedDate: "2026-07-31",
  });
  added++;
}

writeFileSync(SRC, JSON.stringify(raw, null, 2) + "\n", "utf-8");
console.log(
  `add-catalog-products  added ${added} product(s); source now has ${list.length} (skipped ${NEW.length - added} already present)`
);
