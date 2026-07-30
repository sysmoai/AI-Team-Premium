#!/usr/bin/env node
// Sets published prices for the products added by add-catalog-products.mjs,
// which shipped priceOnRequest while pricing was undecided.
//
//   node scripts/set-catalog-prices.mjs && npm run build:catalog
//
// CEO decisions applied (2026-07-31):
//   margin        15% over the cost floor
//   sourcing      annual for proven sellers, monthly for volatile ones
//   tiers         entry and pro listed as separate plans, not merged
//   high-floor    Adobe CC and M365 Copilot stay "request price on WhatsApp"
//
// Floor  = officialUSD x 130 x 1.15   (USD->BDT x VAT, per the pricing model)
// Sell   = ceil(floor x 1.15 / 16) x 16
//
// SOURCING BASIS matters more than the margin does. "annual" means we pay the
// vendor's discounted yearly rate, which is where the floor comes from — so an
// annual-basis price is only profitable if the subscription is actually bought
// annually. Buying one of these monthly turns its margin negative.
//
// Products are on a monthly basis when committing a year is the bigger risk:
// credit-metered tools whose pricing keeps moving, a vendor mid-restructure, or
// one carrying a jurisdictional risk we may need to exit quickly.

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

// usd = the vendor rate we actually pay on the stated basis.
const PRICING = {
  // -- annual basis: steady demand, worth committing a year -----------------
  "figma-professional":       { usd: 12,    basis: "annual",  note: "Professional seat, billed annually" },
  "photoroom-personal":       { usd: 7.5,   basis: "annual",  note: "Pro, billed annually" },
  "speechify-personal":       { usd: 11.58, basis: "annual",  note: "Reader Premium, billed annually" },
  "krisp-personal":           { usd: 8,     basis: "annual",  note: "Core, billed annually" },
  "fathom-personal":          { usd: 16,    basis: "annual",  note: "Premium, billed annually" },
  "fireflies-personal":       { usd: 10,    basis: "annual",  note: "Pro seat, billed annually" },
  "recraft-personal":         { usd: 10,    basis: "annual",  note: "Basic, billed annually" },
  "beautiful-ai-personal":    { usd: 12,    basis: "annual",  note: "Pro, billed annually" },
  "plus-ai-personal":         { usd: 10,    basis: "annual",  note: "Basic seat, billed annually" },
  "google-workspace-ai-seat": { usd: 14,    basis: "annual",  note: "Business Standard seat, billed annually" },
  "veed-personal":            { usd: 10,    basis: "annual",  note: "Lite, billed annually" },
  "veed-pro":                 { usd: 24,    basis: "annual",  note: "Pro, billed annually" },
  "krea-pro":                 { usd: 21,    basis: "annual",  note: "Pro, billed annually (-40%)" },
  // Filmora is a yearly licence, not a subscription. Priced as its monthly
  // equivalent so it sits alongside everything else, with the 12-month
  // commitment stated on the page — a customer who leaves early costs us the
  // remainder of the licence.
  "filmora-annual":           { usd: 5.83,  basis: "annual",  note: "Cross-Platform licence, 12-month commitment" },

  // -- monthly basis: too volatile or too risky to prepay a year -----------
  "poe-personal":             { usd: 19.99, basis: "monthly", note: "Standard subscription" },
  "lovable-personal":         { usd: 25,    basis: "monthly", note: "Pro — credit pricing still moving" },
  "bolt-new-personal":        { usd: 25,    basis: "monthly", note: "Pro — token pricing still moving" },
  "playht-personal":          { usd: 31.2,  basis: "monthly", note: "Creator — vendor mid-restructure" },
  "hailuo-minimax-personal":  { usd: 14.99, basis: "monthly", note: "Standard — China hosting, keep exit easy" },
  "captions-personal":        { usd: 9.99,  basis: "monthly", note: "Basic" },
  "captions-max":             { usd: 24.99, basis: "monthly", note: "Max" },
  "luma-dream-machine-personal": { usd: 9.99,  basis: "monthly", note: "Lite" },
  "luma-dream-machine-plus":     { usd: 29.99, basis: "monthly", note: "Plus" },
  "krea-personal":            { usd: 9,     basis: "monthly", note: "Basic" },
};

// Stay on request. Both floors are far above the rest of the catalogue and a
// published number would read as a mistake next to a ৳499 seat; M365 Copilot's
// real cost also depends on the base licence the customer already holds.
const KEEP_ON_REQUEST = new Set(["adobe-cc-personal", "m365-copilot-seat"]);

// The second tier for products the CEO chose to list as two plans. Same slug,
// so they render as two plans on one product page.
const NEW_TIERS = [
  {
    id: "luma-dream-machine-plus", name: "Luma Dream Machine — Plus", slug: "luma-dream-machine-bangladesh",
    brand: "Luma Dream Machine", provider: "Luma AI", brandColor: "#1A1A1A", category: "ai-video",
    officialUSD: 29.99, tier: "Plus", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["video-gen", "text-to-video", "image-to-video", "keyframe", "cinematic-quality"],
    description: "The higher Luma tier, for when the Lite credit allowance runs out mid-project — roughly three times the monthly generation budget.",
    descriptionBN: "Luma-এর উঁচু টিয়ার — Lite-এর ক্রেডিট প্রজেক্টের মাঝপথে ফুরিয়ে গেলে এটি নিন। প্রায় তিন গুণ বেশি মাসিক জেনারেশন বাজেট।",
    useCases: ["নিয়মিত ক্লায়েন্ট ভিডিও ডেলিভারি", "একাধিক ভিডিও প্রজেক্ট একসাথে চালানো"],
  },
  {
    id: "captions-max", name: "Captions — Max", slug: "captions-app-bangladesh",
    brand: "Captions", provider: "Captions AI", brandColor: "#000000", category: "ai-video",
    officialUSD: 24.99, tier: "Max", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["auto-captions", "video-editing", "ai-avatars", "shorts-maker", "text-to-video"],
    description: "Adds the generative features the Basic tier leaves out — AI Twin, AI actors and text-to-video. Needed if you want an avatar presenting rather than just captions on your own footage.",
    descriptionBN: "Basic-এ যা নেই সেই জেনারেটিভ ফিচারগুলো এখানে আছে — AI Twin, AI অ্যাক্টর ও টেক্সট-টু-ভিডিও। নিজের ফুটেজে শুধু ক্যাপশন নয়, অ্যাভাটার দিয়ে উপস্থাপনা চাইলে এটি লাগবে।",
    useCases: ["অ্যাভাটার দিয়ে ভিডিও উপস্থাপনা", "ক্যামেরার সামনে না গিয়ে কনটেন্ট বানানো"],
  },
  {
    id: "veed-pro", name: "VEED — Pro", slug: "veed-bangladesh",
    brand: "VEED", provider: "Veed Labs", brandColor: "#B5FF3B", category: "ai-video",
    officialUSD: 24, tier: "Pro", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["video-editing", "auto-captions", "translator", "screen-recording", "ai-avatars", "4k-export"],
    description: "Unlocks 4K export, translations and the full AI toolset. The tier to pick if you deliver to clients rather than posting to your own page.",
    descriptionBN: "4K এক্সপোর্ট, অনুবাদ ও সম্পূর্ণ AI টুলসেট খুলে দেয়। নিজের পেজে পোস্ট নয়, ক্লায়েন্টকে ডেলিভারি দিলে এই টিয়ারটাই নেবেন।",
    useCases: ["ক্লায়েন্টের জন্য 4K ভিডিও ডেলিভারি", "ইংরেজি ভিডিও একাধিক ভাষায় অনুবাদ"],
  },
  {
    id: "krea-pro", name: "Krea AI — Pro", slug: "krea-ai-bangladesh",
    brand: "Krea AI", provider: "Krea", brandColor: "#FF6B00", category: "ai-image",
    officialUSD: 21, tier: "Pro", accessType: "personal", deliverySLA: "2-4 hours",
    capabilities: ["image-gen", "image-edit", "ai-upscaler", "video-gen", "ai-reimagine", "cinematic-quality"],
    description: "A much larger compute allowance plus the premium video models. Basic's units disappear quickly once you start generating video rather than stills.",
    descriptionBN: "অনেক বেশি কম্পিউট বরাদ্দ, সাথে প্রিমিয়াম ভিডিও মডেল। স্থিরচিত্র ছেড়ে ভিডিও বানানো শুরু করলে Basic-এর ইউনিট দ্রুত ফুরিয়ে যায়।",
    useCases: ["প্রিমিয়াম মডেল দিয়ে ভিডিও জেনারেশন", "বেশি পরিমাণে ছবি তৈরি ও আপস্কেল"],
  },
];

// Entry tiers were created before the two-plan decision, so their tier label and
// officialUSD still describe whichever plan seemed representative. Realign them
// with the tier we actually sell.
const RETIER = {
  "luma-dream-machine-personal": { tier: "Lite", officialUSD: 9.99 },
  "captions-personal":           { tier: "Basic", officialUSD: 9.99 },
  "veed-personal":               { tier: "Lite", officialUSD: 10 },
  "krea-personal":               { tier: "Basic", officialUSD: 9 },
};

const raw = JSON.parse(readFileSync(SRC, "utf-8"));
const list = raw.products;
const byId = new Map(list.map((p) => [p.id, p]));

// 1. add the second tiers
let addedTiers = 0;
for (const t of NEW_TIERS) {
  if (byId.has(t.id)) continue;
  const rec = {
    ...t,
    price: 0,
    badge: "New",
    featured: false,
    status: "Active",
    brandSlug: t.slug,
    whatsappMsg: `Hi! I want ${t.name} — please share payment details.`,
    whyBuyFromAIPS:
      "bKash, Nagad বা ব্যাংক ট্রান্সফারে পেমেন্ট — ইন্টারন্যাশনাল কার্ড লাগে না। সেটআপ আমরা করে দিই, ৩০ দিনের রিপ্লেসমেন্ট গ্যারান্টি, আর WhatsApp-এ বাংলা সাপোর্ট।",
    deliveryMethod: "WhatsApp activation on your own account",
    lastVerifiedDate: "2026-07-31",
  };
  list.push(rec);
  byId.set(t.id, rec);
  addedTiers++;
}

// 2. realign entry tiers
for (const [id, patch] of Object.entries(RETIER)) {
  const p = byId.get(id);
  if (p) Object.assign(p, patch);
}

// 3. apply prices
const rows = [];
let priced = 0;
for (const [id, cfg] of Object.entries(PRICING)) {
  const p = byId.get(id);
  if (!p) {
    console.error(`  ! no product with id "${id}" — skipped`);
    continue;
  }
  const sell = sellOf(cfg.usd);
  const floor = floorOf(cfg.usd);
  p.price = sell;
  p.officialUSD = cfg.usd;
  delete p.priceOnRequest;
  p.whatsappMsg = `Hi! I want ${p.name} (৳${sell.toLocaleString("en-US")}/mo) — please share payment details.`;
  priced++;
  rows.push({
    name: p.name,
    basis: cfg.basis,
    usd: cfg.usd,
    floor: Math.round(floor),
    sell,
    margin: (((sell - floor) / sell) * 100).toFixed(1) + "%",
    note: cfg.note,
  });
}

for (const id of KEEP_ON_REQUEST) {
  const p = byId.get(id);
  if (p) p.priceOnRequest = true;
}

writeFileSync(SRC, JSON.stringify(raw, null, 2) + "\n", "utf-8");

rows.sort((a, b) => a.basis.localeCompare(b.basis) || a.sell - b.sell);
console.log(`\nadded ${addedTiers} tier variant(s); priced ${priced} product(s)\n`);
console.log(
  "BASIS    " + "PRODUCT".padEnd(34) + "USD".padStart(7) + "FLOOR".padStart(9) + "SELL".padStart(9) + "MARGIN".padStart(8) + "  NOTE"
);
console.log("-".repeat(116));
for (const r of rows) {
  console.log(
    r.basis.padEnd(9) +
      r.name.slice(0, 33).padEnd(34) +
      String(r.usd).padStart(7) +
      String(r.floor).padStart(9) +
      String(r.sell).padStart(9) +
      r.margin.padStart(8) +
      "  " + r.note
  );
}
console.log(`\nstill price-on-request: ${[...KEEP_ON_REQUEST].join(", ")}`);
