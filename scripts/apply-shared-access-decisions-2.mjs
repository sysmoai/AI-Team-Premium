// scripts/apply-shared-access-decisions-2.mjs
import { readFileSync, writeFileSync } from "fs";

const g = JSON.parse(readFileSync("data/commercial-governance.json", "utf-8"));

const customerOwned = {
  "v0-dev-shared": { plan: "Pro (Customer-Owned)", price: 999, id_suffix: "09", provider: "Vercel", url: "https://v0.dev/pricing" },
  "writesonic-shared": { plan: "Individual (Customer-Owned)", price: 799, id_suffix: "10", provider: "Writesonic", url: "https://writesonic.com/pricing" },
  "quillbot-premium-starter-shared": { plan: "Premium (Customer-Owned)", price: 390, id_suffix: "11", provider: "QuillBot", url: "https://quillbot.com/premium" },
  "pika-labs-starter-shared": { plan: "Starter (Customer-Owned)", price: 310, id_suffix: "12", provider: "Pika", url: "https://pika.art/pricing" },
  "opus-clip-starter-shared": { plan: "Starter (Customer-Owned)", price: 590, id_suffix: "13", provider: "Opus", url: "https://www.opus.pro/pricing" },
  "murf-ai-starter-shared": { plan: "Starter (Customer-Owned)", price: 740, id_suffix: "14", provider: "Murf", url: "https://murf.ai/pricing" },
  "kling-ai-starter-shared": { plan: "Starter (Customer-Owned)", price: 270, id_suffix: "15", provider: "Kling AI", url: "https://klingai.com/pricing" },
  "windsurf-pro-shared": { plan: "Pro (Customer-Owned)", price: 590, id_suffix: "16", provider: "Codeium", url: "https://codeium.com/pricing" },
};

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
console.log(`Updated ${Object.keys(customerOwned).length} records to customer-owned activation`);
