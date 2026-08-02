// scripts/apply-shared-not-for-resale.mjs
import { readFileSync, writeFileSync } from "fs";

const g = JSON.parse(readFileSync("data/commercial-governance.json", "utf-8"));

const notForResale = {
  "perplexity-pro-shared": { plan: "Pro", price: 350, id_suffix: "01", provider: "Perplexity", url: "https://www.perplexity.ai/pro" },
  "midjourney-std-shared": { plan: "Standard", price: 1199, id_suffix: "02", provider: "Midjourney", url: "https://www.midjourney.com/pricing" },
  "midjourney-std-premium-shared": { plan: "Premium Standard", price: 2399, id_suffix: "03", provider: "Midjourney", url: "https://www.midjourney.com/pricing" },
  "midjourney-pro-shared": { plan: "Pro", price: 4788, id_suffix: "04", provider: "Midjourney", url: "https://www.midjourney.com/pricing" },
};

for (const [id, info] of Object.entries(notForResale)) {
  g.records[id] = {
    id, provider: info.provider, product_family: info.provider, official_plan: info.plan,
    access_model: "managed_service", account_owner: "AI Team Premium", recovery_owner: "AI Team Premium",
    credential_sharing_required: true, resale_or_seat_evidence: "ceo-risk-accepted-2026-08-02",
    official_terms_url: info.url, commercial_status: "not_for_resale", price_on_request: false,
    approved_bdt_price: info.price, price_approval_id: `CEO-DECISION-2026-08-02-SHARED-${info.id_suffix}`,
    approval_valid_until: "2027-08-02", verification_status: "verified", verified_at: "2026-08-02",
    next_review_at: "2027-02-02", evidence_ids: ["ceo-decision-2026-08-02"],
    risk_flags: ["ceo-risk-accepted-no-official-multiseat", "not-for-resale-whatsapp-only"],
    notes: `CEO decision 2026-08-02: not-for-resale. No official ${info.provider} multi-seat plan — credential sharing on individual plan. Customer contacts WhatsApp to purchase. Cannot be bought through direct fixed-price checkout. Approved at ${info.price} BDT/mo.`
  };
}

writeFileSync("data/commercial-governance.json", JSON.stringify(g, null, 2));
console.log(`Updated ${Object.keys(notForResale).length} records to not_for_resale`);
