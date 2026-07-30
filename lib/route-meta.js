// lib/route-meta.js — THE source of truth for route metadata.
//
// Imported by both api/index.js (production, on Vercel) and server/seo.ts (local
// production preview), so the two cannot disagree about a page's title,
// description or canonical. Add a page here when you add it to App.tsx —
// `npm run verify` fails if you forget.
//
// Plain ESM, and it lives outside api/ on purpose: Vercel turns every file in
// api/ into its own serverless function.

import { PRODUCT_ROUTE_META, TOOL_COUNT, PRODUCT_COUNT } from "./product-routes.js";

export const SITE_URL = "https://www.aiteampremium.com";

// Interpolated into the catalog-wide copy below. These were hardcoded as "80",
// which was already wrong the moment the catalog grew — a stale count in a
// title is a claim we can't stand behind, so it is derived instead.
const CATALOG_COPY = {
  tools: TOOL_COUNT,
  products: PRODUCT_COUNT,
};

export const ROUTE_META = {
  // Catalog-driven product pages served by /tools/:slug. Generated from
  // products-catalog.json so each one carries its own title and canonical —
  // run `npm run gen:routes` after editing the catalog. Spread first so a
  // hand-written entry below always wins on a slug collision.
  ...PRODUCT_ROUTE_META,
  "/": { title: "AI Team Premium — ChatGPT, Claude & AI Tools in Bangladesh | ৳349+/mo", description: `ChatGPT Plus, Claude Pro, Gemini, Midjourney, Canva and ${CATALOG_COPY.tools} premium AI tools for Bangladesh. Pay via bKash/Nagad. 5-30 min delivery. 30-day warranty.`, canonical: "https://www.aiteampremium.com/" },
  "/all-products": { title: `All Premium AI Products — Complete Catalog (${CATALOG_COPY.tools} AI Tools) | AI Team Premium`, description: `Complete catalog of ${CATALOG_COPY.tools} premium AI tools across ${CATALOG_COPY.products} plans. ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Runway & more. Search, filter by brand/category. One-click WhatsApp ordering.`, canonical: "https://www.aiteampremium.com/all-products" },
  "/products": { title: `All Premium AI Products — Complete Catalog (${CATALOG_COPY.tools} AI Tools) | AI Team Premium`, description: `Complete catalog of ${CATALOG_COPY.tools} premium AI tools across ${CATALOG_COPY.products} plans. ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Runway & more. Search, filter by brand/category. One-click WhatsApp ordering.`, canonical: "https://www.aiteampremium.com/products" },
  "/chatgpt-plans": { title: "ChatGPT Plans & Pricing in Bangladesh — ৳499/mo | AIPT — AI Premium Tools", description: "Compare all ChatGPT plans: Plus Shared (৳499/mo), Premium Shared (৳999/mo), Personal (৳2,990/mo), Business, and Pro. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt-plans" },
  "/chatgpt/plus-shared": { title: "ChatGPT Plus Shared — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy ChatGPT Plus Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery. Premium AI subscription from AIPT — AI Premium Tools.", canonical: "https://www.aiteampremium.com/chatgpt/plus-shared" },
  "/chatgpt/plus-premium-shared": { title: "ChatGPT Plus Premium Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Plus Premium Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt/plus-premium-shared" },
  "/chatgpt/plus-personal-seat": { title: "ChatGPT Plus Personal Seat — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Plus Personal Seat in Bangladesh. Pay via bKash/Nagad. 2-4 hour delivery.", canonical: "https://www.aiteampremium.com/chatgpt/plus-personal-seat" },
  "/chatgpt/business-shared": { title: "ChatGPT Team Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Team Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt/business-shared" },
  "/chatgpt/business-premium-shared": { title: "ChatGPT Team Premium Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Team Premium Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt/business-premium-shared" },
  "/chatgpt/business-personal-like": { title: "ChatGPT Team Personal — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Team Personal in Bangladesh. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/business-personal-like" },
  "/chatgpt/pro-premium-shared": { title: "ChatGPT Pro Premium Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Pro Premium Shared in Bangladesh. The most powerful plan. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/pro-premium-shared" },
  "/chatgpt/go-personal": { title: "ChatGPT Go Personal — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Go Personal in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt/go-personal" },
  "/chatgpt/go-shared": { title: "ChatGPT Go Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Go Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt/go-shared" },
  "/claude-plans": { title: "Claude Pro Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy Claude Pro (Sonnet 4.5 + Opus 4) in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/claude-plans" },
  "/gemini-plans": { title: "Gemini Advanced Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy Gemini Advanced (Gemini 3.0 Pro) in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/gemini-plans" },
  "/grammarly-plans": { title: "Grammarly Premium Plans in Bangladesh | AIPT — AI Premium Tools", description: "Buy Grammarly Premium in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/grammarly-plans" },
  "/canva-plans": { title: "Canva Pro Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy Canva Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/canva-plans" },
  "/perplexity-plans": { title: "Perplexity Pro Plans in Bangladesh | AIPT — AI Premium Tools", description: "Buy Perplexity Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/perplexity-plans" },
  "/grok-plans": { title: "SuperGrok Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy SuperGrok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/grok-plans" },
  "/ai-tools-vault": { title: "AI Tools Vault — ChatGPT + Claude + Gemini Bundle ৳1,990/mo | AI Team Premium", description: "Get ChatGPT Plus, Claude Pro and Gemini Advanced together for ৳1,990/month in Bangladesh. Pay via bKash/Nagad. 6-hour delivery, 30-day warranty.", canonical: "https://www.aiteampremium.com/ai-tools-vault" },
  "/ai-subscriptions": { title: "AI Subscriptions — All Plans & Pricing | AIPT — AI Premium Tools", description: "Browse all AI subscriptions: ChatGPT, Claude, Gemini, Canva, Grammarly, Perplexity, Grok, Midjourney and more. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/ai-subscriptions" },
  "/pricing": { title: "Pricing — AI Subscriptions in Bangladesh | AIPT — AI Premium Tools", description: "Full pricing for all AI subscriptions in Bangladesh. ChatGPT from ৳499/mo. Pay via bKash/Nagad. No extra VAT.", canonical: "https://www.aiteampremium.com/pricing" },
  "/support": { title: "Support — AIPT — AI Premium Tools Bangladesh", description: "Get support for your AI subscriptions. WhatsApp, Messenger, or live AI consultation.", canonical: "https://www.aiteampremium.com/support" },
  "/about": { title: "About AIPT — AI Premium Tools — Bangladesh's Trusted AI Partner", description: "Learn about AIPT — AI Premium Tools, AI subscriptions for Bangladesh, paid in BDT via bKash or Nagad.", canonical: "https://www.aiteampremium.com/about" },
  "/start-a-project": { title: "Start a Project — AIPT — AI Premium Tools", description: "Start a project with AIPT — AI Premium Tools. Tell us about your needs and we'll create a custom solution.", canonical: "https://www.aiteampremium.com/start-a-project" },
  "/refund-policy": { title: "Refund Policy — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools refund policy. 24-hour replacement SLA for shared subscriptions. Contact us for refund requests.", canonical: "https://www.aiteampremium.com/refund-policy" },
  "/privacy-policy": { title: "Privacy Policy — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools privacy policy. How we collect, use, and protect your personal information.", canonical: "https://www.aiteampremium.com/privacy-policy" },
  "/terms": { title: "Terms of Service — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools terms of service. Please read these terms carefully before using our services.", canonical: "https://www.aiteampremium.com/terms" },
  "/services": { title: "Services — AI Ops, Design, Web, Marketing | AIPT — AI Premium Tools", description: "Complete digital services: AI Ops sprint, brand design, web development, digital marketing, app development, and AI consultancy.", canonical: "https://www.aiteampremium.com/services" },
  "/services/ai-ops-sprint": { title: "AI Ops Sprint — 2-Week AI Integration | AIPT — AI Premium Tools", description: "A 2-week intensive AI integration sprint for your business. Custom AI workflows, team training, automation setup.", canonical: "https://www.aiteampremium.com/services/ai-ops-sprint" },
  "/services/brand-design": { title: "Brand Design Services — Logo, Identity, Creative | AIPT — AI Premium Tools", description: "Professional brand design services: logo, identity, brand guidelines, creative direction.", canonical: "https://www.aiteampremium.com/services/brand-design" },
  "/services/web-development": { title: "Web Development Services — Modern, Fast, SEO-Optimized | AIPT — AI Premium Tools", description: "Professional web development: modern, fast, SEO-optimized websites built with React and Tailwind.", canonical: "https://www.aiteampremium.com/services/web-development" },
  "/services/digital-marketing": { title: "Digital Marketing Services — Growth Strategy | AIPT — AI Premium Tools", description: "Data-driven digital marketing: growth strategy, content creation, campaign execution, social media management.", canonical: "https://www.aiteampremium.com/services/digital-marketing" },
  "/services/app-development": { title: "App Development Services — Mobile-First Apps | AIPT — AI Premium Tools", description: "Mobile-first app development: iOS, Android, cross-platform. From concept to production.", canonical: "https://www.aiteampremium.com/services/app-development" },
  "/compare": { title: "Compare AI Tools — Side-by-Side Comparison | AIPT — AI Premium Tools", description: "Compare AI tools side-by-side: ChatGPT vs Claude, Gemini vs ChatGPT, Midjourney vs Leonardo, and more.", canonical: "https://www.aiteampremium.com/compare" },
  "/contact": { title: "Contact AIPT — AI Premium Tools — WhatsApp, Messenger, Email", description: "Contact AIPT — AI Premium Tools. Reach us via WhatsApp, Facebook Messenger, or email. Available 7 days a week.", canonical: "https://www.aiteampremium.com/contact" },
  "/tools/chatgpt": { title: "ChatGPT — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy ChatGPT in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/chatgpt" },
  "/tools/claude": { title: "Claude AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Claude AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/claude" },
  "/tools/gemini": { title: "Gemini — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Gemini in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/gemini" },
  "/tools/supergrok": { title: "SuperGrok — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy SuperGrok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/supergrok" },
  "/tools/google-ai-pro": { title: "Google AI Pro — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Google AI Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/google-ai-pro" },
  "/tools/midjourney": { title: "Midjourney — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Midjourney in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/midjourney" },
  "/tools/leonardo": { title: "Leonardo AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Leonardo AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/leonardo" },
  "/tools/runway": { title: "Runway ML — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Runway ML in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/runway" },
  "/tools/kling": { title: "Kling AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Kling AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/kling" },
  "/tools/grammarly": { title: "Grammarly — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Grammarly in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/grammarly" },
  "/tools/canva": { title: "Canva Pro — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Canva Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/canva" },
  "/tools/perplexity": { title: "Perplexity Pro — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Perplexity Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/perplexity" },
  "/tools/grok": { title: "Grok — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Grok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/grok" },
  "/tools/copilot": { title: "GitHub Copilot — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy GitHub Copilot in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/copilot" },
  "/tools/vault": { title: "AI Tools Vault — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy AI Tools Vault in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/vault" },
  "/tools/elevenlabs": { title: "ElevenLabs — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy ElevenLabs in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/elevenlabs" },
  "/tools/notion": { title: "Notion AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Notion AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/notion" },
  "/tools/microsoft365": { title: "Microsoft 365 — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Microsoft 365 in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/microsoft365" },
  "/tools/linkedin": { title: "LinkedIn Premium — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy LinkedIn Premium in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/linkedin" },
  "/tools/adobe-cc": { title: "Adobe Creative Cloud — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy Adobe Creative Cloud in Bangladesh. Photoshop, Illustrator, Premiere Pro and more. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/adobe-cc" },
  "/tools/firefly": { title: "Adobe Firefly — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy Adobe Firefly in Bangladesh. Generative AI image creation. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/firefly" },
  "/tools/freepik": { title: "Freepik Pro — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy Freepik Pro in Bangladesh. Unlimited design resources. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/freepik" },
  "/tools/ideogram": { title: "Ideogram — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy Ideogram Pro in Bangladesh. AI image generation with text. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/ideogram" },
  "/tools/manus": { title: "Manus — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy Manus AI in Bangladesh. Premium AI tools package. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/manus" },
  "/tools/poe": { title: "Poe — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy Poe Premium in Bangladesh. Access multiple AI chatbots. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/poe" },
  "/admin/audit": { title: "Audit Dashboard — AIPT — AI Premium Tools", description: "Admin audit dashboard for monitoring system performance and metrics.", canonical: "https://www.aiteampremium.com/admin/audit" },
  "/blog": { title: "AI Blog — Guides for Bangladesh | AIPT — AI Premium Tools", description: "Practical guides on ChatGPT, Claude, Gemini and AI tools for Bangladeshi students, freelancers and businesses — pricing, comparisons, and how to pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/blog" },
  "/blog/chatgpt-plus-price-bangladesh-bkash-guide": { title: "ChatGPT Plus Price in Bangladesh (2026): Full bKash & Nagad Payment Guide | AI Team Premium", description: "OpenAI doesn't accept Bangladeshi cards directly. Here's exactly what ChatGPT Plus costs in BDT, how shared vs personal seats work, and how to pay with bKash…", canonical: "https://www.aiteampremium.com/blog/chatgpt-plus-price-bangladesh-bkash-guide" },
  "/blog/best-ai-tools-bangladeshi-university-students": { title: "5 Best AI Tools for Bangladeshi University Students in 2026 | AI Team Premium", description: "From assignment research to IELTS prep and thesis writing — a practical, budget-first breakdown of which AI subscriptions are actually worth ৳499/month for…", canonical: "https://www.aiteampremium.com/blog/best-ai-tools-bangladeshi-university-students" },
  "/blog/chatgpt-vs-claude-vs-gemini-bangladesh-freelancers": { title: "ChatGPT vs Claude vs Gemini: Which AI Should Freelancers in Bangladesh Actually Use? | AI Team Premium", description: "A practical comparison for Bangladeshi Fiverr and Upwork freelancers — not a spec sheet, but which tool wins for proposals, code, long documents, and client…", canonical: "https://www.aiteampremium.com/blog/chatgpt-vs-claude-vs-gemini-bangladesh-freelancers" },
  "/blog/pay-chatgpt-without-international-credit-card-bangladesh": { title: "How to Pay for ChatGPT Plus Without an International Credit Card in Bangladesh | AI Team Premium", description: "No dual-currency card? No problem. Here are the real options Bangladeshi users have for accessing premium AI subscriptions — and the tradeoffs of each.", canonical: "https://www.aiteampremium.com/blog/pay-chatgpt-without-international-credit-card-bangladesh" },
  "/blog/ai-tools-fiverr-upwork-freelancers-bangladesh": { title: "AI Tools for Fiverr & Upwork Freelancers in Bangladesh: The Complete Toolkit | AI Team Premium", description: "Bangladesh is one of the largest freelancer markets in the world. Here's the AI toolkit that actually moves the needle on proposal win-rate, delivery speed…", canonical: "https://www.aiteampremium.com/blog/ai-tools-fiverr-upwork-freelancers-bangladesh" },
  "/blog/live-ai-training-bangladesh-what-you-get": { title: "Free & Paid Live AI Training in Bangladesh: What You Actually Get From a Support Session | AI Team Premium", description: "Subscriptions solve access — not know-how. Here's what AI Team Premium's live, Bangla-language AI coaching sessions actually cover, and who they're built for.", canonical: "https://www.aiteampremium.com/blog/live-ai-training-bangladesh-what-you-get" },
  "/blog/ai-diye-income-bangladesh-bangla-guide": { title: "AI দিয়ে ঘরে বসে ইনকাম: বাংলাদেশে বাস্তব ৭টি উপায় (২০২৬) | AI Team Premium", description: "AI দিয়ে টাকা আয় করার নামে অনেক ভুয়া প্রতিশ্রুতি ঘুরছে। এখানে শুধু বাস্তব উপায়গুলো — যেগুলোতে বাংলাদেশ থেকে সত্যিই আয় করা সম্ভব, কত সময় লাগে, আর কোন AI…", canonical: "https://www.aiteampremium.com/blog/ai-diye-income-bangladesh-bangla-guide" },
  "/blog/chatgpt-kivabe-babohar-korben-bangla": { title: "ChatGPT কিভাবে ব্যবহার করবেন: শুরু থেকে শেষ পর্যন্ত বাংলা গাইড | AI Team Premium", description: "ChatGPT অ্যাকাউন্ট খোলা থেকে ভালো prompt লেখা পর্যন্ত — বাংলাদেশি ব্যবহারকারীদের জন্য সম্পূর্ণ বাংলা গাইড। কোন ভুলগুলো নতুনরা করে আর কীভাবে এড়াবেন।", canonical: "https://www.aiteampremium.com/blog/chatgpt-kivabe-babohar-korben-bangla" },
  "/blog/canva-pro-price-bangladesh-worth-it": { title: "Canva Pro Price in Bangladesh (2026): Is It Worth Paying For? | AI Team Premium", description: "Canva's free tier is genuinely good — so when does Pro actually pay for itself? An honest breakdown for Bangladeshi students, freelancers and small business…", canonical: "https://www.aiteampremium.com/blog/canva-pro-price-bangladesh-worth-it" },
  "/blog/ai-detector-plagiarism-assignment-bangladesh": { title: "AI Detectors and University Assignments in Bangladesh: What Actually Gets You Caught | AI Team Premium", description: "Universities in Bangladesh are increasingly running AI detection on submissions. Here's how these tools actually work, why they produce false positives, and…", canonical: "https://www.aiteampremium.com/blog/ai-detector-plagiarism-assignment-bangladesh" },
  "/blog/shared-vs-personal-ai-subscription-which-to-buy": { title: "Shared vs Personal AI Subscriptions: Which Should You Actually Buy? | AI Team Premium", description: "Shared seats cost a fraction of personal accounts — but they come with real rules and real tradeoffs. A straight comparison so you buy the right one the…", canonical: "https://www.aiteampremium.com/blog/shared-vs-personal-ai-subscription-which-to-buy" },
  "/blog/bkash-diye-chatgpt-kena-bangla-guide": { title: "বিকাশ দিয়ে ChatGPT কেনার সম্পূর্ণ গাইড (২০২৬) | AI Team Premium", description: "ইন্টারন্যাশনাল কার্ড ছাড়া বিকাশ বা নগদ দিয়ে ChatGPT Plus কিভাবে নেবেন — ধাপে ধাপে, প্রতারণা এড়ানোর উপায়সহ সম্পূর্ণ বাংলা গাইড।", canonical: "https://www.aiteampremium.com/blog/bkash-diye-chatgpt-kena-bangla-guide" },
  "/blog/ai-diye-cv-cover-letter-chakri-bangla": { title: "AI দিয়ে CV ও কভার লেটার বানানো: চাকরিপ্রার্থীদের জন্য বাংলা গাইড | AI Team Premium", description: "ATS সিস্টেমে আটকে যাওয়া CV থেকে শুরু করে ইন্টারভিউ প্রস্তুতি — AI দিয়ে চাকরির আবেদন কিভাবে শক্তিশালী করবেন, বাস্তব উদাহরণসহ।", canonical: "https://www.aiteampremium.com/blog/ai-diye-cv-cover-letter-chakri-bangla" },
  "/blog/ai-diye-english-shekha-bangla-guide": { title: "AI দিয়ে ইংরেজি শেখা: প্রতিদিন ৩০ মিনিটের বাস্তব পরিকল্পনা | AI Team Premium", description: "কথা বলার জড়তা, গ্রামার ভুল, IELTS প্রস্তুতি — AI-কে ব্যক্তিগত ইংরেজি টিউটর হিসেবে ব্যবহার করার সম্পূর্ণ বাংলা গাইড, বাস্তব prompt সহ।", canonical: "https://www.aiteampremium.com/blog/ai-diye-english-shekha-bangla-guide" },
};

// Routes with a dynamic trailing segment. Matched by prefix when no exact key hits.
export const DYNAMIC_PREFIXES = [
  { prefix: "/compare/", meta: { title: "Compare AI Tools — Side-by-Side Comparison | AIPT — AI Premium Tools", description: "Compare AI tools side-by-side. Detailed comparison of features, pricing, and capabilities.", canonical: "https://www.aiteampremium.com/compare" } },
  { prefix: "/blog/", meta: { title: "AI Blog — Guides for Bangladesh | AIPT — AI Premium Tools", description: "Practical guides on ChatGPT, Claude, Gemini and AI tools for Bangladeshi students, freelancers and businesses.", canonical: "https://www.aiteampremium.com/blog" } },
  // Safety net for /tools/:slug. Every real product already has an exact entry
  // above (exact keys are matched first), so this only catches a slug that is
  // not in the catalog — which the page renders as a 404.
  { prefix: "/tools/", meta: { title: "AI Tools & Subscriptions in Bangladesh | AI Team Premium", description: "Premium AI subscriptions for Bangladesh. Pay with bKash or Nagad — no international card needed. Fast delivery and 30-day replacement guarantee.", canonical: "https://www.aiteampremium.com/all-products" } },
];

// Single matching rule, shared by the Vercel function (api/index.js) and the
// local dev server (server/seo.ts) so the two can never disagree about which
// metadata a path gets. Returns null for unknown paths.
export function lookupMeta(path) {
  if (ROUTE_META[path]) return ROUTE_META[path];
  // Tolerate a trailing slash on any route except "/".
  if (path.length > 1 && path.endsWith("/")) {
    const trimmed = path.slice(0, -1);
    if (ROUTE_META[trimmed]) return ROUTE_META[trimmed];
  }
  for (const { prefix, meta } of DYNAMIC_PREFIXES) {
    if (path.startsWith(prefix) && path.length > prefix.length) return meta;
  }
  return null;
}
