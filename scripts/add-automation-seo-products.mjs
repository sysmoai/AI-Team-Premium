#!/usr/bin/env node
// Adds the automation, SEO, learning and assistant products the catalog had no
// entry for. Idempotent — re-running skips anything already present by id.
//
//   node scripts/add-automation-seo-products.mjs && npm run build:catalog
//
// The 106-product catalog covered assistants, video, image, voice, code, writing,
// workspace and design, and had nothing at all in automation, SEO or learning —
// categories with real Bangladesh search demand (freelancers reselling automation
// and SEO work) and no page to land on.
//
// PRICING. Every officialUSD below was read off the vendor's own pricing page on
// 2026-07-31, not recalled. Sell prices use the model already documented in
// scripts/set-catalog-prices.mjs:
//
//   floor = officialUSD x 130 x 1.15      (USD->BDT, VAT)
//   sell  = ceil(floor x 1.15 / 16) x 16  (15% margin, rounded to ৳16)
//
// SOURCING BASIS matters more than the margin. "annual" means we pay the vendor's
// discounted yearly rate, so an annual-basis price is only profitable if the
// subscription is actually bought annually — buying it monthly turns the margin
// negative. Products sit on a monthly basis where committing a year is the bigger
// risk: a vendor mid-restructure, or one whose published rate is monthly-only.
//
// EXCLUDED ON PURPOSE (do not "fix" by adding them):
//   n8n            pricing page quotes EUR only (Starter 20€, Pro 50€). The
//                  schema field is officialUSD; writing euros into it would be a
//                  currency error of exactly the kind the price gates exist to
//                  catch. Needs the USD rate confirmed before it can be listed.
//   DeepSeek       deepseek.com shows no paid consumer subscription — there is
//                  nothing to resell.
//   SciSpace       pricing page returned 403; unverified.
//   Consensus      pricing page returned 403; unverified.
//   Storyblocks    pricing page returned empty; unverified.
//   Skillshare     /membership returned 404; unverified.
//   Semrush Starter and above, Ahrefs Advanced, Surfer Pro — real tiers, but
//                  their floors land far above anything else in the catalog and
//                  they are not the tier a Bangladeshi freelancer buys. Add on
//                  demand rather than listing a ৳34,000 SKU nobody asked for.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "client/src/data/products-complete.json");

const USD_BDT = 130;
const VAT = 1.15;
const MARGIN = 1.15;
const floorOf = (usd) => usd * USD_BDT * VAT;
const sellOf = (usd) => Math.ceil((floorOf(usd) * MARGIN) / 16) * 16;

const WHY_BN =
  "bKash, Nagad বা ব্যাংক ট্রান্সফারে পেমেন্ট — ইন্টারন্যাশনাল কার্ড লাগে না। সেটআপ আমরা করে দিই, ৩০ দিনের রিপ্লেসমেন্ট গ্যারান্টি, আর WhatsApp-এ বাংলা সাপোর্ট।";

// basis: which vendor rate the floor is derived from. source: the page it was
// read from on 2026-07-31.
const NEW = [
  // ---------------------------------------------------------------- automation
  {
    id: "zapier-professional", name: "Zapier — Professional", slug: "zapier-bangladesh",
    brand: "Zapier", provider: "Zapier", brandColor: "#FF4F00", category: "automation",
    officialUSD: 19.99, basis: "annual", source: "zapier.com/pricing",
    tier: "Professional", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["automation", "integrations", "multi-step", "webhooks", "no-code"],
    description:
      "Connects the apps you already use so a task in one triggers work in another — a Facebook lead into Google Sheets, a form response into an email sequence. Professional is the first tier with multi-step workflows, which is where automation stops being a toy. 750 tasks a month at this rate.",
    descriptionBN:
      "আপনার ব্যবহার করা অ্যাপগুলোকে যুক্ত করে — Facebook lead সরাসরি Google Sheets-এ, ফর্ম রেসপন্স থেকে অটো ইমেইল। Professional টিয়ারেই প্রথম multi-step ওয়ার্কফ্লো পাওয়া যায়, যেখান থেকে অটোমেশন সত্যিই কাজে লাগে। মাসে ৭৫০ টাস্ক।",
    useCases: [
      "Facebook/ওয়েবসাইট lead সরাসরি Google Sheets বা CRM-এ পাঠানো",
      "অর্ডার এলে ক্লায়েন্টকে অটো কনফার্মেশন ইমেইল",
      "ক্লায়েন্টের জন্য অটোমেশন সেটআপ করে ফ্রিল্যান্স আয়",
      "একাধিক টুলের মধ্যে ডেটা সিঙ্ক রাখা",
    ],
  },
  {
    id: "zapier-team", name: "Zapier — Team", slug: "zapier-bangladesh",
    brand: "Zapier", provider: "Zapier", brandColor: "#FF4F00", category: "automation",
    officialUSD: 69, basis: "annual", source: "zapier.com/pricing",
    tier: "Team", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["automation", "integrations", "multi-step", "webhooks", "shared-workspace"],
    description:
      "Adds a shared workspace and unlimited users, so automations belong to the team rather than to whoever built them. The tier to pick if an agency runs client automations that must keep working when one person is away. 2,000 tasks a month.",
    descriptionBN:
      "শেয়ার্ড ওয়ার্কস্পেস ও আনলিমিটেড ইউজার — অটোমেশনগুলো টিমের, কোনো একজনের নয়। এজেন্সি যদি ক্লায়েন্টের অটোমেশন চালায় এবং একজন ছুটিতে থাকলেও কাজ চালু রাখতে হয়, এই টিয়ারটাই দরকার। মাসে ২,০০০ টাস্ক।",
    useCases: [
      "এজেন্সিতে একাধিক ক্লায়েন্টের অটোমেশন একসাথে চালানো",
      "টিমের সবাই একই ওয়ার্কফ্লো দেখতে ও ঠিক করতে পারা",
      "কর্মী পরিবর্তন হলেও অটোমেশন বন্ধ না হওয়া",
    ],
  },
  {
    id: "make-core", name: "Make — Core", slug: "make-bangladesh",
    brand: "Make", provider: "Make (Celonis)", brandColor: "#6D00CC", category: "automation",
    officialUSD: 9, basis: "monthly", source: "make.com/en/pricing",
    tier: "Core", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["automation", "integrations", "visual-builder", "webhooks", "no-code"],
    description:
      "A visual canvas for automation — you draw the flow rather than filling in a form, which makes branching and loops far easier to follow than a linear builder. Cheaper per operation than most alternatives, which is why it suits high-volume, low-value steps. 10,000 operations a month.",
    descriptionBN:
      "অটোমেশনের ভিজ্যুয়াল ক্যানভাস — ফর্ম পূরণ নয়, ফ্লো এঁকে কাজ করবেন, ফলে branching ও loop অনেক সহজে বোঝা যায়। প্রতি অপারেশনে খরচ কম, তাই বেশি সংখ্যক ছোট কাজের জন্য উপযুক্ত। মাসে ১০,০০০ অপারেশন।",
    useCases: [
      "ই-কমার্স অর্ডার থেকে ইনভয়েস ও স্টক আপডেট অটো করা",
      "একাধিক Facebook পেজের মেসেজ এক জায়গায় আনা",
      "বড় পরিমাণ ডেটা এক টুল থেকে আরেকটিতে সরানো",
    ],
  },
  {
    id: "make-pro", name: "Make — Pro", slug: "make-bangladesh",
    brand: "Make", provider: "Make (Celonis)", brandColor: "#6D00CC", category: "automation",
    officialUSD: 16, basis: "monthly", source: "make.com/en/pricing",
    tier: "Pro", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["automation", "integrations", "visual-builder", "webhooks", "priority-run"],
    description:
      "Adds priority execution and the operators you need once a scenario has to handle failure properly — custom error handling, and full-text log search for working out what broke at 3am. The tier for automations someone else depends on.",
    descriptionBN:
      "প্রায়োরিটি এক্সিকিউশন, কাস্টম error handling ও পূর্ণ লগ সার্চ — কোথায় সমস্যা হয়েছে তা খুঁজে বের করার জন্য। যেসব অটোমেশনের উপর অন্য কেউ নির্ভর করে, তার জন্য এই টিয়ার।",
    useCases: [
      "ক্লায়েন্টের ব্যবসায়িক প্রসেস অটোমেট করা যেখানে ভুল হলে ক্ষতি",
      "ব্যর্থ হলে অটো রিট্রাই ও অ্যালার্ট সেটআপ",
    ],
  },
  {
    id: "make-teams", name: "Make — Teams", slug: "make-bangladesh",
    brand: "Make", provider: "Make (Celonis)", brandColor: "#6D00CC", category: "automation",
    officialUSD: 29, basis: "monthly", source: "make.com/en/pricing",
    tier: "Teams", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["automation", "integrations", "visual-builder", "shared-workspace", "roles"],
    description:
      "Shared scenario folders and role-based access, so an agency can let a junior build without giving them the keys to every client account. Worth it at the point where more than one person edits automations.",
    descriptionBN:
      "শেয়ার্ড ফোল্ডার ও রোল-ভিত্তিক অ্যাক্সেস — জুনিয়র কেউ কাজ করতে পারবে, কিন্তু সব ক্লায়েন্ট অ্যাকাউন্টের অ্যাক্সেস পাবে না। একাধিক জন অটোমেশন এডিট করলে এটি দরকার।",
    useCases: [
      "এজেন্সিতে জুনিয়র-সিনিয়র আলাদা অ্যাক্সেস",
      "ক্লায়েন্টভিত্তিক আলাদা ফোল্ডারে কাজ গুছিয়ে রাখা",
    ],
  },

  // ---------------------------------------------------------------------- SEO
  {
    id: "semrush-seo", name: "Semrush — SEO", slug: "semrush-bangladesh",
    brand: "Semrush", provider: "Semrush", brandColor: "#FF642D", category: "seo",
    // Monthly basis on purpose: Semrush restructured its plans (the tiers are now
    // SEO / Starter / Pro+ / Advanced), and prepaying a year into a lineup that
    // just moved is the bigger risk.
    officialUSD: 139, basis: "monthly", source: "semrush.com/prices",
    tier: "SEO", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["keyword-research", "rank-tracking", "backlink-audit", "site-audit", "competitor-analysis"],
    description:
      "Keyword research, rank tracking, backlink and site audits in one place. The reason to pay for it rather than use free tools is the historical database — you can see what a competitor ranked for last year, not just today.",
    descriptionBN:
      "কীওয়ার্ড রিসার্চ, র‍্যাঙ্ক ট্র্যাকিং, ব্যাকলিংক ও সাইট অডিট — সব এক জায়গায়। ফ্রি টুলের বদলে এটি নেওয়ার মূল কারণ এর ঐতিহাসিক ডেটাবেস: প্রতিযোগী গত বছর কোন কীওয়ার্ডে ছিল তাও দেখা যায়।",
    useCases: [
      "ক্লায়েন্টের সাইটের SEO অডিট করে রিপোর্ট দেওয়া",
      "Upwork/Fiverr-এ SEO সার্ভিস দেওয়ার জন্য ডেটা",
      "প্রতিযোগীর কীওয়ার্ড ও ব্যাকলিংক বিশ্লেষণ",
      "নিজের ব্লগ/ই-কমার্স সাইটের র‍্যাঙ্ক ট্র্যাক করা",
    ],
  },
  {
    id: "ahrefs-starter", name: "Ahrefs — Starter", slug: "ahrefs-bangladesh",
    brand: "Ahrefs", provider: "Ahrefs", brandColor: "#054ADA", category: "seo",
    officialUSD: 29, basis: "monthly", source: "ahrefs.com/pricing",
    tier: "Starter", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["backlink-audit", "keyword-research", "site-audit", "rank-tracking"],
    description:
      "The entry tier, and the cheapest honest way into Ahrefs' backlink index — which is the thing Ahrefs is actually best at. Limited report volume, so it suits checking a handful of sites rather than running an agency.",
    descriptionBN:
      "সবচেয়ে সাশ্রয়ী উপায়ে Ahrefs-এর ব্যাকলিংক ইনডেক্সে ঢোকা — এই জায়গাতেই Ahrefs সবচেয়ে ভালো। রিপোর্টের পরিমাণ সীমিত, তাই কয়েকটি সাইট দেখার জন্য উপযুক্ত, এজেন্সি চালানোর জন্য নয়।",
    useCases: [
      "নিজের সাইটের ব্যাকলিংক প্রোফাইল দেখা",
      "প্রতিযোগী কোথা থেকে লিংক পাচ্ছে তা বের করা",
      "ছোট পরিসরে কীওয়ার্ড রিসার্চ",
    ],
  },
  {
    id: "ahrefs-lite", name: "Ahrefs — Lite", slug: "ahrefs-bangladesh",
    brand: "Ahrefs", provider: "Ahrefs", brandColor: "#054ADA", category: "seo",
    officialUSD: 129, basis: "monthly", source: "ahrefs.com/pricing",
    tier: "Lite", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["backlink-audit", "keyword-research", "site-audit", "rank-tracking", "content-explorer"],
    description:
      "The tier most SEO freelancers actually work on: enough report credits to service clients, plus Content Explorer for finding what already ranks in a niche. Step up from Starter when the report limits start blocking work.",
    descriptionBN:
      "বেশিরভাগ SEO ফ্রিল্যান্সার আসলে এই টিয়ারেই কাজ করেন — ক্লায়েন্ট সার্ভিস দেওয়ার মতো রিপোর্ট ক্রেডিট, সাথে Content Explorer। Starter-এর লিমিট কাজে বাধা দিলে এখানে আসবেন।",
    useCases: [
      "একাধিক ক্লায়েন্টের সাইট অডিট ও রিপোর্ট",
      "কনটেন্ট গ্যাপ বিশ্লেষণ করে আর্টিকেল প্ল্যান",
      "ব্যাকলিংক আউটরিচের জন্য টার্গেট লিস্ট তৈরি",
    ],
  },
  {
    id: "surfer-discovery", name: "Surfer SEO — Discovery", slug: "surfer-seo-bangladesh",
    brand: "Surfer SEO", provider: "Surfer", brandColor: "#22B4B9", category: "seo",
    officialUSD: 49, basis: "annual", source: "surferseo.com/pricing",
    tier: "Discovery", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["content-optimization", "serp-analysis", "content-brief", "keyword-research"],
    description:
      "Scores a draft against what is already ranking for the target keyword and tells you what the top pages cover that yours does not. Useful precisely because it turns 'write good SEO content' into a checklist. 120 documents.",
    descriptionBN:
      "আপনার লেখা ড্রাফটকে বর্তমানে র‍্যাঙ্ক করা পেজগুলোর সাথে তুলনা করে স্কোর দেয় এবং দেখায় কোন বিষয়গুলো আপনার লেখায় নেই। 'ভালো SEO কনটেন্ট লিখুন' কথাটাকে একটা চেকলিস্টে পরিণত করে। ১২০টি ডকুমেন্ট।",
    useCases: [
      "ব্লগ পোস্ট লেখার আগে কনটেন্ট ব্রিফ তৈরি",
      "পুরনো আর্টিকেল অপ্টিমাইজ করে র‍্যাঙ্ক বাড়ানো",
      "ক্লায়েন্টকে ডেটা-ভিত্তিক কনটেন্ট সার্ভিস দেওয়া",
    ],
  },
  {
    id: "surfer-standard", name: "Surfer SEO — Standard", slug: "surfer-seo-bangladesh",
    brand: "Surfer SEO", provider: "Surfer", brandColor: "#22B4B9", category: "seo",
    officialUSD: 99, basis: "annual", source: "surferseo.com/pricing",
    tier: "Standard", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["content-optimization", "serp-analysis", "content-brief", "keyword-research", "content-audit"],
    description:
      "Triples the document allowance and adds the site-wide audit, which finds existing pages losing rank rather than only helping with new ones. The tier for someone running content for several sites at once.",
    descriptionBN:
      "তিনগুণ বেশি ডকুমেন্ট, সাথে সাইট-ওয়াইড অডিট — যেসব পুরনো পেজ র‍্যাঙ্ক হারাচ্ছে সেগুলো খুঁজে দেয়, শুধু নতুন লেখায় সাহায্য নয়। একসাথে একাধিক সাইটের কনটেন্ট চালালে এই টিয়ার।",
    useCases: [
      "একাধিক সাইটের কনটেন্ট একসাথে ম্যানেজ করা",
      "র‍্যাঙ্ক পড়ে যাওয়া পেজ খুঁজে ঠিক করা",
    ],
  },

  // ------------------------------------------------------------------ learning
  {
    id: "coursera-plus-personal", name: "Coursera Plus — Personal", slug: "coursera-plus-bangladesh",
    brand: "Coursera", provider: "Coursera", brandColor: "#0056D2", category: "ai-learning",
    // $160/year on the annual plan, divided out to a monthly equivalent so it
    // sits alongside everything else. The 12-month commitment is stated in the
    // description rather than hidden — leaving early costs us the remainder.
    officialUSD: 13.33, basis: "annual", source: "coursera.org/courseraplus",
    tier: "Annual", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["courses", "certificates", "specializations", "guided-projects"],
    description:
      "Unlimited access to most of Coursera's catalog plus the certificates, billed as a 12-month plan. Worth it only if you actually finish courses — the certificate is what an employer can verify, and it is included here rather than charged per course.",
    descriptionBN:
      "Coursera-র বেশিরভাগ কোর্স ও সার্টিফিকেটে আনলিমিটেড অ্যাক্সেস, ১২ মাসের প্ল্যান হিসেবে। কোর্স সত্যিই শেষ করলেই এটি লাভজনক — সার্টিফিকেট নিয়োগকর্তা যাচাই করতে পারেন, আর সেটি এখানে প্রতি কোর্সে আলাদা চার্জ ছাড়াই আছে।",
    useCases: [
      "Google/Meta/IBM প্রফেশনাল সার্টিফিকেট করা",
      "CV-তে যাচাইযোগ্য সার্টিফিকেট যোগ করা",
      "ডেটা অ্যানালিটিকস বা প্রজেক্ট ম্যানেজমেন্টে ক্যারিয়ার বদল",
      "বিশ্ববিদ্যালয়ের পড়ার পাশাপাশি স্কিল তৈরি",
    ],
  },

  // ----------------------------------------------------------------- assistant
  {
    id: "mistral-le-chat-pro", name: "Mistral Le Chat — Pro", slug: "mistral-le-chat-bangladesh",
    brand: "Mistral", provider: "Mistral AI", brandColor: "#FA520F", category: "ai-assistant",
    officialUSD: 14.99, basis: "monthly", source: "mistral.ai/pricing",
    tier: "Pro", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["text", "code", "vision", "search", "document-analysis"],
    description:
      "A European-hosted assistant, which matters if you or a client need data processed outside US jurisdiction. Fast at everyday drafting and code, with generous limits at this price — though its ecosystem is smaller than ChatGPT's.",
    descriptionBN:
      "ইউরোপে হোস্ট করা AI অ্যাসিস্ট্যান্ট — আপনার বা ক্লায়েন্টের ডেটা যদি যুক্তরাষ্ট্রের বাইরে প্রসেস করা দরকার হয়, তখন এটি গুরুত্বপূর্ণ। দৈনন্দিন লেখা ও কোডিংয়ে দ্রুত, এই দামে লিমিটও ভালো — তবে ChatGPT-র তুলনায় ইকোসিস্টেম ছোট।",
    useCases: [
      "ইউরোপীয় ক্লায়েন্টের ডেটা নিয়ে কাজ করা",
      "দ্রুত ইমেইল, প্রপোজাল ও ডকুমেন্ট ড্রাফট",
      "কোড লেখা ও ডিবাগ করা",
    ],
  },
  {
    id: "mistral-le-chat-team", name: "Mistral Le Chat — Team", slug: "mistral-le-chat-bangladesh",
    brand: "Mistral", provider: "Mistral AI", brandColor: "#FA520F", category: "ai-assistant",
    officialUSD: 24.99, basis: "monthly", source: "mistral.ai/pricing",
    tier: "Team", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["text", "code", "vision", "search", "document-analysis", "shared-workspace"],
    description:
      "Per-seat tier with shared workspaces and admin controls, so a team's prompts and documents stay in one place instead of scattered across personal accounts. Priced per user by the vendor.",
    descriptionBN:
      "প্রতি সিট ভিত্তিক টিয়ার — শেয়ার্ড ওয়ার্কস্পেস ও অ্যাডমিন কন্ট্রোল, ফলে টিমের প্রম্পট ও ডকুমেন্ট ব্যক্তিগত অ্যাকাউন্টে ছড়িয়ে না থেকে এক জায়গায় থাকে। ভেন্ডর প্রতি ইউজারে দাম নেয়।",
    useCases: [
      "টিমের সবার জন্য একই AI ওয়ার্কস্পেস",
      "প্রতিষ্ঠানের ডকুমেন্ট এক জায়গায় রেখে কাজ",
    ],
  },
];

const raw = JSON.parse(readFileSync(SRC, "utf-8"));
const byId = new Set(raw.products.map((p) => p.id));

const added = [];
for (const item of NEW) {
  if (byId.has(item.id)) continue;
  const { basis, source, ...rest } = item;
  const sell = sellOf(item.officialUSD);
  raw.products.push({
    ...rest,
    price: sell,
    badge: "New",
    featured: false,
    status: "Active",
    brandSlug: item.slug,
    whatsappMsg: `Hi! I want ${item.name} (৳${sell.toLocaleString("en-US")}/mo) — please share payment details.`,
    whyBuyFromAIPS: WHY_BN,
    deliveryMethod: "WhatsApp activation on your own account",
    lastVerifiedDate: "2026-07-31",
  });
  added.push({ ...item, sell, floor: Math.round(floorOf(item.officialUSD)) });
}

writeFileSync(SRC, JSON.stringify(raw, null, 2) + "\n", "utf-8");

console.log(`\nadded ${added.length} product tier(s); catalog source now ${raw.products.length}\n`);
console.log(
  "BASIS    " + "PRODUCT".padEnd(30) + "USD".padStart(8) + "FLOOR".padStart(9) +
    "SELL".padStart(9) + "MARGIN".padStart(8) + "  SOURCE"
);
console.log("-".repeat(104));
for (const r of added.sort((a, b) => a.basis.localeCompare(b.basis) || a.sell - b.sell)) {
  console.log(
    r.basis.padEnd(9) + r.name.slice(0, 29).padEnd(30) + String(r.officialUSD).padStart(8) +
      String(r.floor).padStart(9) + String(r.sell).padStart(9) +
      (((r.sell - r.floor) / r.sell) * 100).toFixed(1).padStart(7) + "%  " + r.source
  );
}
