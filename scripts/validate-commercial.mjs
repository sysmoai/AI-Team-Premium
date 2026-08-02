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
import { pathToFileURL } from "node:url";
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

// ---------- 5b. quarantined prices must not survive in DERIVED artifacts ----------
// Suppressing a price in the catalog is not enough. Route metadata, product
// route descriptions and JSON-LD are all generated FROM the catalog, and they
// are generated in a dependency order: gen:routes produces the descriptions that
// gen:schema then embeds. Regenerating them out of order leaves a quarantined
// price sitting in structured data — which Google ingests as a literal price
// claim — while every component-level check still passes.
//
// Checked against the REAL rendered output rather than by grepping the
// generated files. Two earlier regex attempts produced only false positives:
// grepping whole files matched a code comment in route-meta.js describing a past
// bug and a blog post's editorial copy about monthly budgets; narrowing to a
// character window around each slug then spilled into neighbouring entries and
// flagged other products' perfectly legitimate prices. A validator that cries
// wolf gets ignored, which is worse than not having one.
//
// The serverless handler is ground truth: it is the surface a customer and a
// crawler actually receive, with metadata and JSON-LD already injected. Asking
// it directly removes all of the guessing.
//
// This matters because the artifacts are generated in a dependency order —
// gen:routes produces the descriptions that gen:schema embeds. Running them out
// of order leaves a quarantined price in structured data, which Google ingests
// as a literal price claim, while every component-level check still passes.
// That exact failure occurred here with CapCut ("From ৳399/month" in JSON-LD).
const bySlug = new Map();
for (const p of catalog) {
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
  bySlug.get(p.slug).push(p);
}

// Only slugs where EVERY variant is quarantined can be asserted price-free: a
// family with a quarantined shared tier and a priced personal tier should still
// legitimately show the sibling's price.
const fullyQuarantined = [...bySlug.entries()].filter(([, vs]) =>
  vs.every((v) => {
    const g = governance[v.id];
    return g && NO_PUBLIC_PURCHASE.has(g.commercial_status);
  })
);

let handler = null;
try {
  const mod = await import(pathToFileURL(resolve(ROOT, "api/index.js")).href);
  handler = mod.default || mod.handler;
} catch {
  warnings.push("api/index.js could not be loaded — skipped the rendered-output price-leak check (run `npm run build` first)");
}

if (handler) {
  for (const [slug, variants] of fullyQuarantined) {
    const res = {
      statusCode: 200, headers: {}, body: "",
      setHeader(k, v) { this.headers[k] = v; },
      status(c) { this.statusCode = c; return this; },
      send(b) { this.body = b; return this; },
      end(b) { this.body = b || ""; return this; },
    };
    try {
      await handler({ url: `/tools/${slug}`, method: "GET", headers: {} }, res);
    } catch {
      continue;
    }
    for (const v of variants) {
      if (typeof v.price !== "number" || !v.price) continue;
      const money = new RegExp(`৳\\s?${v.price.toLocaleString("en-US")}(?![\\d,])|৳\\s?${v.price}(?![\\d,])`);
      if (money.test(res.body)) {
        failures.push(
          `/tools/${slug}: served HTML still quotes ৳${v.price} for quarantined record ${v.id} — regenerate in order: npm run gen:routes && npm run gen:schema`
        );
      }
    }
  }
}

// ---------- 5bb. quarantined families must not advertise purchase or promises ----------
// Suppressing the price is only half of it. A fully-quarantined family was still
// described as "Buy X in Bangladesh ... 5-30 min delivery, 30-day replacement
// guarantee" — an active purchase invitation with a delivery promise and a
// guarantee, for something withdrawn from sale. That copy feeds both the meta
// description and the Product JSON-LD, so it is the version crawlers index.
// Fourteen live product pages carried it.
{
  const routeMetaText = (() => {
    try { return readFileSync(resolve(ROOT, "lib/product-routes.js"), "utf-8"); } catch { return ""; }
  })();

  for (const [slug, variants] of bySlug) {
    const allQuarantined = variants.every((v) => {
      const g = governance[v.id];
      return g && NO_PUBLIC_PURCHASE.has(g.commercial_status);
    });
    if (!allQuarantined) continue;

    const line = routeMetaText.split("\n").find((l) => l.includes(`"/tools/${slug}"`));
    if (!line) continue;

    if (/\bBuy /.test(line)) {
      failures.push(`/tools/${slug}: fully quarantined but its description still invites purchase ("Buy ...") — run npm run gen:routes && npm run gen:schema`);
    }
    if (/replacement guarantee|warranty/i.test(line)) {
      failures.push(`/tools/${slug}: fully quarantined but its description still promises a guarantee/warranty`);
    }
    if (/\d+\s*(-|–|\s)\s*\d*\s*(min|hour|hr|day)s?\s+delivery/i.test(line)) {
      failures.push(`/tools/${slug}: fully quarantined but its description still promises a delivery time`);
    }
  }
}

// ---------- 5c. quarantined NON-catalog pages ----------
// Some offers are sold on their own hand-built page rather than as a catalog
// entry, so data/commercial-governance.json does not reach them and check 5b
// (which iterates catalog slugs) cannot see them. The AI Tools Vault is one:
// it advertised a hardcoded ৳1,990 for shared access to three identity-bound
// accounts and sat outside every guard built here.
//
// Quarantining the React component was NOT sufficient — the server-injected
// route metadata is a separate surface, and the price plus both withdrawn claims
// survived in the served <title> and meta description, which is exactly what a
// crawler reads. So this asserts against rendered output too.
if (handler) {
  const { VAULT_QUARANTINE, BUNDLE_PRICES } = await import(
    pathToFileURL(resolve(ROOT, "shared/bundle-prices.js")).href
  );

  if (VAULT_QUARANTINE?.quarantined) {
    const res = {
      statusCode: 200, headers: {}, body: "",
      setHeader(k, v) { this.headers[k] = v; },
      status(c) { this.statusCode = c; return this; },
      send(b) { this.body = b; return this; },
      end(b) { this.body = b || ""; return this; },
    };
    await handler({ url: "/ai-tools-vault", method: "GET", headers: {} }, res);
    const body = res.body;

    const price = BUNDLE_PRICES.vault;
    const bnPrice = String(price).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
    if (new RegExp(`৳\\s?${price.toLocaleString("en-US")}|৳\\s?${price}\\b`).test(body) || body.includes(bnPrice)) {
      failures.push(`/ai-tools-vault: quarantined but served HTML still quotes ৳${price}`);
    }
    // A Product/Offer node asserts "this is for sale at a price" to a crawler.
    if (/"@type":\s*"Product"/.test(body)) {
      failures.push(`/ai-tools-vault: quarantined but still emits Product structured data`);
    }
    for (const claim of VAULT_QUARANTINE.withdrawnClaims ?? []) {
      // Match the claim loosely enough to catch rewordings of the same promise.
      const pattern = claim.replace(/[-\s]+/g, "[-\\s]?").replace(/\d+/g, "\\d+");
      if (new RegExp(pattern, "i").test(body)) {
        failures.push(`/ai-tools-vault: withdrawn claim "${claim}" still appears in served HTML`);
      }
    }
  }
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
