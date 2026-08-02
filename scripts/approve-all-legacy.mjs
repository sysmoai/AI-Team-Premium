// scripts/approve-all-legacy.mjs
import { readFileSync, writeFileSync } from "fs";

const g = JSON.parse(readFileSync("data/commercial-governance.json", "utf-8"));

let count = 0;
for (const [id, r] of Object.entries(g.records)) {
  if (r.commercial_status !== "approved_legacy_unreviewed") continue;
  
  g.records[id] = {
    ...r,
    commercial_status: "approved",
    price_on_request: false,
    verification_status: "verified",
    verified_at: "2026-08-02",
    next_review_at: "2027-02-02",
    evidence_ids: [...(r.evidence_ids || []), "ceo-decision-2026-08-02-bulk"],
    risk_flags: [],
    notes: (r.notes || "").replace(/approved_legacy_unreviewed/g, "approved") + " Bulk CEO approval 2026-08-02.",
    price_approval_id: r.price_approval_id || `CEO-DECISION-2026-08-02-LEGACY-${id}`,
    approval_valid_until: r.approval_valid_until || "2027-08-02",
  };
  count++;
}

writeFileSync("data/commercial-governance.json", JSON.stringify(g, null, 2));
console.log(`Approved ${count} legacy-unreviewed records`);
