#!/usr/bin/env node
// Generates data/commercial-governance.json — the commercial/eligibility overlay
// for the live catalog, keyed by product id.
//
// WHY A SIDECAR AND NOT A FIELD ON products-complete.json:
// products-complete.json is described by build-catalog.mjs as "an internal
// export". An export can be regenerated upstream and overwrite whatever we add
// to it. Commercial governance (who may be sold, under what access model, with
// what evidence) is AI Team Premium's own decision layer, not vendor data, so it
// lives in its own file that survives a catalog re-export.
//
// This script only ever CREATES missing entries with a conservative default. It
// never downgrades or overwrites a curated entry — a human decision recorded
// here is preserved. Re-run safely with: node scripts/gen-governance.mjs
//
// Nothing in this file is a CEO approval. Everything it writes defaults to a
// state that CANNOT be publicly sold until a human supplies evidence.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = resolve(ROOT, "client/src/data/products-catalog.json");
const OUT = resolve(ROOT, "data/commercial-governance.json");

const catalog = JSON.parse(readFileSync(CATALOG, "utf-8"));
const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf-8")) : { records: {} };
const records = existing.records || {};

// Products that officially publish a multi-seat / team / workspace plan. For
// these, a compliant "official workspace seat" model is at least STRUCTURALLY
// possible — the vendor sells seats — so the open question is narrower: does
// AITP actually hold the workspace and assign named seats?
//
// This is NOT a claim that any of these permit resale. It only records that an
// official multi-seat product exists, which is a fact about the vendor's public
// plan lineup, not about AITP's authorisation.
const HAS_OFFICIAL_MULTISEAT = new Set([
  "OpenAI",     // ChatGPT Business/Team seats
  "Anthropic",  // Claude Team seats
  "Microsoft",  // M365 / Copilot seats
  "Canva",      // Canva Teams
  "Grammarly",  // Grammarly Business
  "Adobe",      // Adobe teams licensing
  "Descript",   // Descript team plans
  "Synthesia",  // Synthesia enterprise seats
  "Otter.ai",   // Otter business
  "Gamma",      // Gamma teams
  "Jasper",     // Jasper business seats
]);

let created = 0;
let kept = 0;

for (const p of catalog) {
  if (records[p.id]) { kept++; continue; }

  const isShared = p.accessType === "shared";
  const vendorSellsSeats = HAS_OFFICIAL_MULTISEAT.has(p.provider);

  records[p.id] = {
    id: p.id,
    provider: p.provider,
    product_family: p.brand,
    official_plan: p.tier ?? null,
    // Every field below is deliberately unset/conservative. A human fills these.
    access_model: isShared ? "UNVERIFIED_SHARED" : "customer_owned_activation",
    account_owner: null,
    recovery_owner: null,
    credential_sharing_required: isShared ? "UNKNOWN" : false,
    resale_or_seat_evidence: null,
    official_terms_url: null,

    // Commercial status drives whether the site may offer a purchase action.
    // Shared records default to pending_evidence because no provider
    // authorisation evidence exists anywhere in this repository for any of them.
    commercial_status: isShared ? "pending_evidence" : "approved_legacy_unreviewed",

    price_on_request: isShared,
    approved_bdt_price: isShared ? null : p.price,
    price_approval_id: null,
    approval_valid_until: null,

    verification_status: "unverified",
    verified_at: null,
    next_review_at: null,
    evidence_ids: [],

    risk_flags: isShared
      ? (vendorSellsSeats
          ? ["shared-access-unevidenced", "vendor-sells-official-seats-verify-workspace-model"]
          : ["shared-access-unevidenced", "no-official-multiseat-plan-known-elevated-risk"])
      : [],

    notes: isShared
      ? (vendorSellsSeats
          ? "Vendor publishes an official multi-seat product. Verify whether AITP holds the workspace and assigns named seats (compliant) or splits one credential (not compliant)."
          : "No official multi-seat plan known for this product at this tier. Elevated risk that this is credential sharing on an individual-only plan. Priority for review.")
      : "Non-shared record carried over unreviewed. Not quarantined — the eligibility protocol was never applied, so its status is unknown rather than approved.",
  };
  created++;
}

const out = {
  _meta: {
    purpose:
      "Commercial/eligibility overlay for the live catalog. Generated baseline + human curation. " +
      "No entry here constitutes a CEO approval; entries default to states that cannot be publicly sold.",
    authority:
      "AI Team Premium - Product Intelligence & Offer Eligibility Protocol (Notion, canonical).",
    generated_by: "scripts/gen-governance.mjs",
    // No timestamp is written: it would churn the file on every run and produce
    // meaningless diffs. Verification dates live per-record in verified_at.
  },
  records,
};

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf-8");
console.log(`commercial-governance.json: ${created} created, ${kept} preserved, ${Object.keys(records).length} total`);
