// scripts/apply-shared-access-decisions-1.mjs
import { readFileSync, writeFileSync } from "fs";

const g = JSON.parse(readFileSync("data/commercial-governance.json", "utf-8"));

const sharedAccepted = {
  "perplexity-pro-shared": { plan: "Pro", price: 350, id_suffix: "01", provider: "Perplexity", url: "https://www.perplexity.ai/pro" },
  "midjourney-std-shared": { plan: "Standard", price: 1199, id_suffix: "02", provider: "Midjourney", url: "https://www.midjourney.com/pricing" },
  "midjourney-std-premium-shared": { plan: "Premium Standard", price: 2399, id_suffix: "03", provider: "Midjourney", url: "https://www.midjourney.com/pricing" },
  "midjourney-pro-shared": { plan: "Pro", price: 4788, id_suffix: "04", provider: "Midjourney", url: "https://www.midjourney.com/pricing" },
};

const customerOwned = {
  "leonardo-ai-shared": { plan: "Standard (Customer-Owned)", price: 599, id_suffix: "05", provider: "Leonardo AI", url: "https://leonardo.ai/pricing" },
  "heygen-creator-shared": { plan: "Creator (Customer-Owned)", price: 1499, id_suffix: "06", provider: "HeyGen", url: "https://www.heygen.com/pricing" },
  "udio-pro-shared": { plan: "Pro (Customer-Owned)", price: 499, id_suffix: "07", provider: "Udio", url: "https://www.udio.com/pricing" },
  "freepik-premium-shared": { plan: "Premium (Customer-Owned)", price: 450, id_suffix: "08", provider: "Freepik", url: "https://www.freepik.com/pricing" },
};

for (const [id, info] of Object.entries(sharedAccepted)) {
  g.records[id] = {
    id, provider: info.provider, product_family: info.provider, official_plan: info.plan,
    access_model: "managed_service", account_owner: "AI Team Premium", recovery_owner: "AI Team Premium",
    credential_sharing_required: true, resale_or_seat_evidence: "ceo-risk-accepted-2026-08-02",
    official_terms_url: info.url, commercial_status: "approved", price_on_request: false,
    approved_bdt_price: info.price, price_approval_id: `CEO-DECISION-2026-08-02-SHARED-${info.id_suffix}`,
    approval_valid_until: "2027-08-02", verification_status: "verified", verified_at: "2026-08-02",
    next_review_at: "2027-02-02", evidence_ids: ["ceo-decision-2026-08-02"],
    risk_flags: ["ceo-risk-accepted-no-official-multiseat"],
    notes: `CEO decision 2026-08-02: risk accepted. No official ${info.provider} multi-seat plan — credential sharing. Approved at ${info.price} BDT/mo.`
  };
}

for (const [id, info] of Object.entries(customerOwned)) {
  g.records[id] = {
    id, provider: info.provider, product_family: info.provider, official_plan: info.plan,
    access_model: "customer_owned_activation", account_owner: "Customer", recovery_owner: "Customer",
    credential_sharing_required: false, resale_or_seat_evidence: "customer-owned-activation",
    official_terms_url: info.url, commercial_status: "approved", price_on_request: false,
    approved_bdt_price: info.price, price_approval_id: `CEO-DECISION-2026-08-02-SHARED-${info.id_suffix}`,
    approval_valid_until: "2027-08-02", verification_status: "verified", verified_at: "2026-08-02",
    next_review_at: "2027-02-02", evidence_ids: ["ceo-decision-2026-08-02"],
    risk_flags: [],
    notes: `CEO decision 2026-08-02: converted to customer-owned activation. Approved at ${info.price} BDT/mo.`
  };
}

writeFileSync("data/commercial-governance.json", JSON.stringify(g, null, 2));
console.log(`Updated ${Object.keys(sharedAccepted).length + Object.keys(customerOwned).length} records`);
