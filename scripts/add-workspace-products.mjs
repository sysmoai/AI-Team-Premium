#!/usr/bin/env node
// Second catalog batch: workspace, collaboration and site-building tools.
// Idempotent — re-running skips anything already present by id.
//
//   node scripts/add-workspace-products.mjs && npm run build:catalog
//
// Same rules as add-automation-seo-products.mjs: every officialUSD was read off
// the vendor's own pricing page on 2026-07-31 and the page is recorded beside it.
// Sell prices use the documented model (floor = USD x 130 x 1.15, sell =
// ceil(floor x 1.15 / 16) x 16), so no new pricing policy is introduced.
//
// EXCLUDED — attempted and not verifiable, so not listed:
//   LinkedIn Premium  linkedin.com/premium/products serves a sign-in wall to a
//                     logged-out fetch, so no price could be confirmed. Worth
//                     noting that /tools/linkedin already sells it at ৳999 with
//                     no catalog entry behind it — that page is making a price
//                     claim nothing in this repo can substantiate.
//   Webflow           pricing page returned a header-overflow parse error.
//   Canva             pricing page 403 (already in the catalog regardless).

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

const NEW = [
  {
    id: "loom-business", name: "Loom — Business", slug: "loom-bangladesh",
    brand: "Loom", provider: "Atlassian", brandColor: "#625DF5", category: "ai-workspace",
    officialUSD: 18, basis: "monthly", source: "loom.com/pricing",
    tier: "Business", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["screen-recording", "auto-transcript", "video-messaging", "unlimited-length"],
    description:
      "Records your screen and face and turns it into a shareable link with a transcript. The practical use for a freelancer is replacing a client call with a five-minute video across a timezone gap — no scheduling, and the client can rewatch it.",
    descriptionBN:
      "আপনার স্ক্রিন ও ক্যামেরা রেকর্ড করে ট্রান্সক্রিপ্টসহ শেয়ারযোগ্য লিংক বানায়। ফ্রিল্যান্সারের জন্য আসল কাজে লাগে টাইমজোন পার্থক্যের কারণে ক্লায়েন্ট কল বাদ দিয়ে পাঁচ মিনিটের ভিডিও পাঠাতে — মিটিং সেট করতে হয় না, ক্লায়েন্ট বারবার দেখতে পারেন।",
    useCases: [
      "বিদেশি ক্লায়েন্টকে কাজ বুঝিয়ে দেওয়া, মিটিং ছাড়াই",
      "Upwork/Fiverr ডেলিভারির সাথে ভিডিও ওয়াকথ্রু",
      "বাগ বা সমস্যা রেকর্ড করে টিমকে দেখানো",
      "ক্লায়েন্ট অনবোর্ডিং ভিডিও তৈরি",
    ],
  },
  {
    id: "loom-business-ai", name: "Loom — Business + AI", slug: "loom-bangladesh",
    brand: "Loom", provider: "Atlassian", brandColor: "#625DF5", category: "ai-workspace",
    officialUSD: 24, basis: "monthly", source: "loom.com/pricing",
    tier: "Business + AI", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["screen-recording", "auto-transcript", "ai-summary", "auto-chapters", "filler-word-removal"],
    description:
      "Adds the AI layer — automatic titles, summaries, chapters and filler-word removal. Worth the difference only if you record often enough that editing time is the actual cost.",
    descriptionBN:
      "AI স্তর যুক্ত করে — অটো টাইটেল, সারসংক্ষেপ, চ্যাপ্টার ও অপ্রয়োজনীয় শব্দ কেটে দেওয়া। যদি এত ঘন ঘন রেকর্ড করেন যে এডিটিংয়ের সময়টাই আসল খরচ, তবেই এই পার্থক্যটা যুক্তিসঙ্গত।",
    useCases: [
      "বেশি সংখ্যক ভিডিও বানিয়ে অটো সারসংক্ষেপ পাওয়া",
      "এডিটিং ছাড়াই পরিচ্ছন্ন ক্লায়েন্ট ভিডিও",
    ],
  },
  {
    id: "framer-basic", name: "Framer — Basic", slug: "framer-bangladesh",
    brand: "Framer", provider: "Framer", brandColor: "#0055FF", category: "ai-design",
    officialUSD: 10, basis: "monthly", source: "framer.com/pricing",
    tier: "Basic", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["website-builder", "custom-domain", "responsive-design", "cms", "no-code"],
    description:
      "Design a site visually and publish it on your own domain without writing code or arranging hosting. For a Bangladeshi freelancer the point is a portfolio that looks designed rather than templated, which is what wins the first client.",
    descriptionBN:
      "কোড না লিখে, হোস্টিং ছাড়াই নিজের ডোমেইনে সাইট ডিজাইন করে পাবলিশ করুন। বাংলাদেশি ফ্রিল্যান্সারের জন্য মূল কথা — টেমপ্লেটের মতো নয়, সত্যিই ডিজাইন করা পোর্টফোলিও, যেটাই প্রথম ক্লায়েন্ট এনে দেয়।",
    useCases: [
      "নিজের ডোমেইনে প্রফেশনাল পোর্টফোলিও সাইট",
      "ক্লায়েন্টের ল্যান্ডিং পেজ বানিয়ে আয়",
      "কোড ছাড়াই দ্রুত সাইট লঞ্চ",
    ],
  },
  {
    id: "framer-pro", name: "Framer — Pro", slug: "framer-bangladesh",
    brand: "Framer", provider: "Framer", brandColor: "#0055FF", category: "ai-design",
    officialUSD: 30, basis: "monthly", source: "framer.com/pricing",
    tier: "Pro", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["website-builder", "custom-domain", "cms", "analytics", "localization", "no-code"],
    description:
      "Raises the CMS and page limits and adds localisation, which matters if you publish the same site in Bangla and English. The tier for someone delivering sites to clients rather than running one of their own.",
    descriptionBN:
      "CMS ও পেজ লিমিট বাড়ায়, সাথে লোকালাইজেশন — একই সাইট বাংলা ও ইংরেজিতে প্রকাশ করলে এটি দরকার। নিজের একটি সাইট নয়, ক্লায়েন্টকে সাইট ডেলিভারি দিলে এই টিয়ার।",
    useCases: [
      "বাংলা ও ইংরেজি — দুই ভাষায় একই সাইট",
      "একাধিক ক্লায়েন্ট সাইট ম্যানেজ করা",
    ],
  },
  {
    id: "miro-starter", name: "Miro — Starter", slug: "miro-bangladesh",
    brand: "Miro", provider: "Miro", brandColor: "#FFD02F", category: "ai-workspace",
    officialUSD: 8, basis: "annual", source: "miro.com/pricing",
    tier: "Starter", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["whiteboard", "diagramming", "templates", "real-time-collab"],
    description:
      "An infinite whiteboard for planning work with someone who is not in the room — user flows, wireframes, project maps. Unlimited boards at this tier, which is the limit that makes the free plan frustrating.",
    descriptionBN:
      "অসীম হোয়াইটবোর্ড — দূরে থাকা কারও সাথে মিলে ইউজার ফ্লো, ওয়্যারফ্রেম বা প্রজেক্ট ম্যাপ বানানোর জন্য। এই টিয়ারে আনলিমিটেড বোর্ড, আর ফ্রি প্ল্যানে এই লিমিটটাই সবচেয়ে বিরক্তিকর।",
    useCases: [
      "ক্লায়েন্টের সাথে মিলে প্রজেক্ট প্ল্যান করা",
      "ইউজার ফ্লো ও ওয়্যারফ্রেম আঁকা",
      "রিমোট টিমের ব্রেইনস্টর্মিং",
    ],
  },
  {
    id: "miro-business", name: "Miro — Business", slug: "miro-bangladesh",
    brand: "Miro", provider: "Miro", brandColor: "#FFD02F", category: "ai-workspace",
    officialUSD: 20, basis: "annual", source: "miro.com/pricing",
    tier: "Business", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["whiteboard", "diagramming", "templates", "real-time-collab", "guest-access", "ai-tools"],
    description:
      "Adds guest access, so clients can join a board without a paid seat of their own, plus the AI generation tools. The tier that makes sense once outsiders need to be in the board with you.",
    descriptionBN:
      "গেস্ট অ্যাক্সেস যুক্ত করে — ক্লায়েন্ট নিজের পেইড সিট ছাড়াই বোর্ডে যোগ দিতে পারেন, সাথে AI টুল। বাইরের কাউকে বোর্ডে দরকার হলেই এই টিয়ার যুক্তিসঙ্গত।",
    useCases: [
      "ক্লায়েন্টকে বোর্ডে এনে সরাসরি রিভিউ",
      "টিমের জন্য শেয়ার্ড ওয়ার্কস্পেস",
    ],
  },
  {
    id: "airtable-team", name: "Airtable — Team", slug: "airtable-bangladesh",
    brand: "Airtable", provider: "Airtable", brandColor: "#18BFFF", category: "ai-workspace",
    officialUSD: 20, basis: "annual", source: "airtable.com/pricing",
    tier: "Team", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["database", "automation", "views", "forms", "integrations"],
    description:
      "A spreadsheet that behaves like a database — linked records, multiple views over the same data, and forms that write straight into it. Where a Google Sheet stops working is usually where this starts.",
    descriptionBN:
      "স্প্রেডশিট, কিন্তু কাজ করে ডেটাবেসের মতো — লিংকড রেকর্ড, একই ডেটার একাধিক ভিউ, আর ফর্ম যা সরাসরি ডেটা লেখে। Google Sheet যেখানে আর কুলোয় না, সাধারণত সেখান থেকেই এটি শুরু।",
    useCases: [
      "ক্লায়েন্ট ও প্রজেক্ট ট্র্যাকিং সিস্টেম",
      "ই-কমার্স ইনভেন্টরি ও অর্ডার ম্যানেজমেন্ট",
      "কনটেন্ট ক্যালেন্ডার চালানো",
    ],
  },
  {
    id: "airtable-business", name: "Airtable — Business", slug: "airtable-bangladesh",
    brand: "Airtable", provider: "Airtable", brandColor: "#18BFFF", category: "ai-workspace",
    officialUSD: 45, basis: "annual", source: "airtable.com/pricing",
    tier: "Business", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["database", "automation", "views", "forms", "integrations", "admin-controls"],
    description:
      "Higher record limits, more automation runs and admin controls. Only worth the step up when the base is running something a business depends on daily, not when it is a personal tracker.",
    descriptionBN:
      "বেশি রেকর্ড লিমিট, বেশি অটোমেশন রান ও অ্যাডমিন কন্ট্রোল। ব্যক্তিগত ট্র্যাকার নয় — প্রতিদিনের ব্যবসা যেটার উপর নির্ভর করে, তেমন কিছু চালালেই এই ধাপ যুক্তিসঙ্গত।",
    useCases: [
      "প্রতিষ্ঠানের মূল ডেটা সিস্টেম চালানো",
      "বেশি পরিমাণ অটোমেশন চালানো",
    ],
  },
  {
    id: "clickup-unlimited", name: "ClickUp — Unlimited", slug: "clickup-bangladesh",
    brand: "ClickUp", provider: "ClickUp", brandColor: "#7B68EE", category: "ai-workspace",
    officialUSD: 7, basis: "annual", source: "clickup.com/pricing",
    tier: "Unlimited", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["task-management", "time-tracking", "dashboards", "integrations", "guest-access"],
    description:
      "Task and project management with time tracking built in, which is the part that matters if you bill hourly. Cheapest paid tier here and it removes the storage and dashboard limits that make the free plan awkward.",
    descriptionBN:
      "টাস্ক ও প্রজেক্ট ম্যানেজমেন্ট, সাথে টাইম ট্র্যাকিং — ঘণ্টায় বিল করলে এই অংশটাই আসল। সবচেয়ে সস্তা পেইড টিয়ার, আর ফ্রি প্ল্যানের স্টোরেজ ও ড্যাশবোর্ড লিমিটগুলো সরিয়ে দেয়।",
    useCases: [
      "ঘণ্টাভিত্তিক কাজের সময় ট্র্যাক করে ক্লায়েন্টকে বিল",
      "একাধিক প্রজেক্ট একসাথে সামলানো",
      "ক্লায়েন্টকে গেস্ট হিসেবে প্রজেক্টে যুক্ত করা",
    ],
  },
  {
    id: "clickup-business", name: "ClickUp — Business", slug: "clickup-bangladesh",
    brand: "ClickUp", provider: "ClickUp", brandColor: "#7B68EE", category: "ai-workspace",
    officialUSD: 12, basis: "annual", source: "clickup.com/pricing",
    tier: "Business", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["task-management", "time-tracking", "dashboards", "automation", "workload", "integrations"],
    description:
      "Adds workload views, advanced automation and goal tracking. The tier for an agency scheduling several people across overlapping client work rather than one person tracking their own tasks.",
    descriptionBN:
      "ওয়ার্কলোড ভিউ, উন্নত অটোমেশন ও লক্ষ্য ট্র্যাকিং যুক্ত করে। একজনের নিজের টাস্ক নয় — এজেন্সি যখন একাধিক জনকে ওভারল্যাপিং ক্লায়েন্ট কাজে ভাগ করে, তখনকার টিয়ার।",
    useCases: [
      "এজেন্সিতে একাধিক জনের কাজ ভাগ করে দেওয়া",
      "রিপিট কাজ অটোমেট করা",
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
console.log("BASIS    " + "PRODUCT".padEnd(28) + "USD".padStart(7) + "FLOOR".padStart(9) + "SELL".padStart(9) + "  SOURCE");
console.log("-".repeat(92));
for (const r of added.sort((a, b) => a.basis.localeCompare(b.basis) || a.sell - b.sell)) {
  console.log(
    r.basis.padEnd(9) + r.name.slice(0, 27).padEnd(28) + String(r.officialUSD).padStart(7) +
      String(r.floor).padStart(9) + String(r.sell).padStart(9) + "  " + r.source
  );
}
