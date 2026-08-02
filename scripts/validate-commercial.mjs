#!/usr/bin/env node
// Access-model-aware commercial validator for the catalog the site actually
// ships (client/src/data/products-catalog.json).
//
// This exists because the pre-existing scripts/validate-catalog.mjs validates
// data/catalog.json — a 2-product scaffolding file the site does not render
// from — using a flat ৳29,900 floor for every product. That validator is not
// wired into `npm run ship`, and it currently FAILS by flagging the CEO's own
// approved CapCut relist prices (2510/3350) as "below floor 29900". A single
// global floor cannot work: a shared seat and a personal seat have different
// economics by design.
//
// This validator therefore checks each record against its OWN access model, and
// deliberately does NOT compute a "correct" price. The eligibility protocol is
// explicit: "Never use an automatic percentage formula to create public prices.
// Price is a management decision supported by current cost and risk data." So a
// cost-basis figure is only ever used as a review signal, never as an authority.
//
// Usage: node scripts/validate-commercial.mjs [--strict]
//   default: prints the report, exits 0 unless a HARD failure is found
//   --strict: also exits 1 on warnings

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");

const catalog = JSON.parse(readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8"));
const governance = JSON.parse(readFileSync(resolve(ROOT, "data/commercial-governance.json"), "utf-8")).records;

const failures = [];
const warnings = [];

// Statuses that must never carry a fixed public price or a buy action.
const NO_PUBLIC_PURCHASE = new Set([
  "pending_evidence", "not_for_resale", "prohibited",
  "request_price_only", "unavailable", "retired",
]);

// ---------- 1. every shipped record must be known to governance ----------
// A product that reaches the site without a governance entry has bypassed the
// eligibility protocol entirely, which is the exact failure this whole layer
// exists to prevent.
for (const p of catalog) {
  if (!governance[p.id]) {
    failures.push(`${p.id}: ships in the catalog but has no governance entry — run: node scripts/gen-governance.mjs`);
  }
}

// ---------- 2. quarantined records must not expose a price ----------
for (const p of catalog) {
  const g = governance[p.id];
  if (!g) continue;

  if (NO_PUBLIC_PURCHASE.has(g.commercial_status)) {
    if (!p.priceOnRequest) {
      failures.push(`${p.id}: commercial_status "${g.commercial_status}" must not offer a direct purchase, but priceOnRequest is not set`);
    }
    // A price leaking through the WhatsApp prefill bypasses every price component.
    if (/৳\s?[\d,]+/.test(p.whatsappMsg || "")) {
      failures.push(`${p.id}: quarantined but its whatsappMsg still quotes a ৳ figure: "${p.whatsappMsg}"`);
    }
    // Savings/scarcity badges are claims about a price we are not standing behind.
    if (p.badge && /%\s*off|save|discount|limited|only\s+\d/i.test(p.badge)) {
      failures.push(`${p.id}: quarantined but still carries a promotional badge "${p.badge}"`);
    }
  }
}

// ---------- 3. shared access requires an explicit, evidenced model ----------
// The eligibility protocol: "Do not assume that every product can be sold
// through shared credentials... unless current written provider rules clearly
// permit the exact arrangement and management approves it."
for (const p of catalog) {
  const g = governance[p.id];
  if (!g || p.accessType !== "shared") continue;

  if (g.access_model === "UNVERIFIED_SHARED" && !NO_PUBLIC_PURCHASE.has(g.commercial_status)) {
    failures.push(`${p.id}: shared access with an unverified access model must not be publicly purchasable`);
  }
  if (g.credential_sharing_required === true && g.commercial_status !== "prohibited" && g.commercial_status !== "not_for_resale") {
    failures.push(`${p.id}: credential_sharing_required is true — this must be not_for_resale or prohibited, not "${g.commercial_status}"`);
  }
  // Ownership disclosure is a customer-safety requirement, not a nicety: the
  // customer needs to know who can recover (and therefore seize) the account.
  if (!NO_PUBLIC_PURCHASE.has(g.commercial_status) && (!g.account_owner || !g.recovery_owner)) {
    failures.push(`${p.id}: sellable shared record without documented account_owner / recovery_owner`);
  }
}

// ---------- 4. approved fixed prices need an approval record ----------
for (const p of catalog) {
  const g = governance[p.id];
  if (!g) continue;
  if (g.commercial_status === "approved" && g.approved_bdt_price != null && !g.price_approval_id) {
    failures.push(`${p.id}: status "approved" with a fixed price but no price_approval_id`);
  }
  if (g.approval_valid_until && new Date(g.approval_valid_until) < new Date()) {
    warnings.push(`${p.id}: price approval expired on ${g.approval_valid_until}`);
  }
}

// ---------- 5. never-reviewed records are surfaced, not silently accepted ----------
const unreviewed = catalog.filter((p) => governance[p.id]?.commercial_status === "approved_legacy_unreviewed");
if (unreviewed.length) {
  warnings.push(`${unreviewed.length} record(s) still carry "approved_legacy_unreviewed" — they predate the eligibility protocol and their status is unknown, not approved`);
}

// ---------- 6. brand firewall ----------
// A deterministic check that the sibling storefront cannot reappear in shipped
// data. build-catalog.mjs already scrubs the source; this proves the result.
const AIPS_PATTERNS = [/aipremiumshop/i, /AI\s*Premium\s*Shop/i, /\bAIPS\b/];
const serialized = JSON.stringify(catalog);
for (const re of AIPS_PATTERNS) {
  const hits = (serialized.match(new RegExp(re.source, re.flags.includes("i") ? "gi" : "g")) || []).length;
  if (hits) failures.push(`brand firewall: shipped catalog contains ${hits} match(es) for /${re.source}/`);
}

// ---------- 7. structural integrity ----------
const seen = new Set();
for (const p of catalog) {
  if (seen.has(p.id)) failures.push(`duplicate id "${p.id}"`);
  seen.add(p.id);
}

// ---------- report ----------
const byStatus = {};
const byAccess = {};
for (const p of catalog) {
  const g = governance[p.id];
  byStatus[g?.commercial_status ?? "NO_ENTRY"] = (byStatus[g?.commercial_status ?? "NO_ENTRY"] || 0) + 1;
  byAccess[p.accessType ?? "unset"] = (byAccess[p.accessType ?? "unset"] || 0) + 1;
}

console.log(`\nvalidate-commercial: ${catalog.length} shipped records\n`);
console.log("  commercial status:");
for (const [k, v] of Object.entries(byStatus).sort((a, b) => b[1] - a[1])) console.log(`    ${String(v).padStart(4)}  ${k}`);
console.log("  access type:");
for (const [k, v] of Object.entries(byAccess).sort((a, b) => b[1] - a[1])) console.log(`    ${String(v).padStart(4)}  ${k}`);
console.log(`    ${String(catalog.filter((p) => p.priceOnRequest).length).padStart(4)}  price-on-request (no fixed public price)`);

if (failures.length) {
  console.log(`\n✖ ${failures.length} HARD FAILURE(S):`);
  failures.forEach((f) => console.log(`  - ${f}`));
}
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (!failures.length && !warnings.length) console.log("\n✓ no issues\n");
else console.log("");

if (failures.length || (strict && warnings.length)) process.exit(1);
