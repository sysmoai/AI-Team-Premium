// Corrected 2026-08-02, after a P0 audit finding.
//
// Every price in this file used to be typed by hand, independently of both
// client/src/data/products-catalog.json and data/commercial-governance.json —
// a THIRD, disconnected pricing source in a codebase that has spent an entire
// day fixing exactly this pattern in the other two. It disagreed with the real
// catalog on every customer-owned tier it shared a concept with (go-personal:
// 1299 here vs 1196 real; pro-personal: 34900 here vs 29900 real), and its
// "shared"/"workspace-invite" entries advertised fixed prices, a 30-day
// warranty and an "Order on WhatsApp" CTA for products with zero access-model
// evidence, zero CEO review and zero governance entry anywhere.
//
// Worst specific instance: pro-premium-shared was priced at exactly ৳4,990 —
// the precise figure a real, previously-verified CEO decision (F27, 2026-07-26,
// read from Notion) named outright: "৳4,500/৳4,990 must not appear anywhere."
// This file had been quoting the forbidden number in a live <title>, a
// ProductSchema offer and a WhatsApp order button.
//
// Fixed by:
//  - deriving every "customer-owned" price from the real catalog, so it cannot
//    drift from it again (the three ids below are the catalog's own; if one is
//    renamed or removed this throws instead of silently keeping a stale price)
//  - marking every "shared" / "workspace-invite" entry `quarantined: true` with
//    a reason. PlanDetail.tsx must check this flag before rendering ANY price,
//    ProductSchema, warranty claim, or "Order" CTA — see that file.
import catalog from "../data/products-catalog.json";

function catalogPrice(id: string): number {
  const p = (catalog as any[]).find((x) => x.id === id);
  if (!p) throw new Error(`plans.ts: no catalog product with id "${id}"`);
  if (!(p.price > 0)) throw new Error(`plans.ts: "${id}" has no published price`);
  if (p.priceOnRequest) throw new Error(`plans.ts: "${id}" is quarantined — cannot anchor a "customer-owned" plan to it`);
  return p.price;
}

const GO_PERSONAL = catalogPrice("chatgpt-go-personal");
const PLUS_PERSONAL = catalogPrice("chatgpt-plus-personal");
const PRO_PERSONAL = catalogPrice("chatgpt-pro-personal");

const bdt = (n: number) => `৳${n.toLocaleString("en-US")}/month`;

export const chatgptPlans = [
  {
    slug: "go-shared",
    title: "ChatGPT Go — Shared Seat",
    plan: "Go",
    tier: "Shared",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: 8,
    duration: "30 days",
    deliverySLA: "5–15 minutes",
    accessType: "shared",
    deviceRule: "1 device only",
    warranty: "Pending access-model review.",
    segment: "Budget",
    targetBuyer: "Students, casual users",
    badge: "Under Review",
    color: "blue",
    quarantined: true,
    quarantineReason:
      "Shared-credential access with no documented provider authorization, no CEO review, no governance entry. Not in the product catalog at all under any id.",
  },
  {
    slug: "go-personal",
    title: "ChatGPT Go — Personal Account",
    plan: "Go",
    tier: "Personal Account",
    priceBDT: GO_PERSONAL,
    priceLabel: bdt(GO_PERSONAL),
    seats: 1,
    duration: "30 days",
    deliverySLA: "2–4 hours",
    accessType: "customer-owned",
    deviceRule: "No restriction (your account)",
    warranty: "Tied to your own account management.",
    segment: "Budget",
    targetBuyer: "Students wanting private access",
    badge: "Own Account",
    color: "green",
    quarantined: false,
  },
  {
    slug: "plus-shared",
    title: "ChatGPT Plus — Shared Seat",
    plan: "Plus",
    tier: "Shared",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: 8,
    duration: "30 days",
    deliverySLA: "5–15 minutes",
    accessType: "shared",
    deviceRule: "1 device only",
    warranty: "Pending access-model review.",
    segment: "Budget",
    targetBuyer: "Students, beginners",
    badge: "Under Review",
    color: "blue",
    quarantined: true,
    quarantineReason:
      "Corresponds to catalog record chatgpt-plus-starter-shared, quarantined pending_evidence — no documented provider authorization for shared-credential access.",
  },
  {
    slug: "plus-premium-shared",
    title: "ChatGPT Plus — Premium Shared",
    plan: "Plus",
    tier: "Premium Shared",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: "2–3",
    duration: "30 days",
    deliverySLA: "5–15 minutes",
    accessType: "shared",
    deviceRule: "1 device only",
    warranty: "Pending access-model review.",
    segment: "Quality",
    targetBuyer: "Freelancers, creators",
    badge: "Under Review",
    color: "purple",
    quarantined: true,
    quarantineReason:
      "Corresponds to catalog record chatgpt-plus-premium-shared, quarantined pending_evidence — no documented provider authorization for shared-credential access.",
  },
  {
    slug: "plus-personal-seat",
    title: "ChatGPT Plus — Personal Seat",
    plan: "Plus",
    tier: "Personal Seat",
    priceBDT: PLUS_PERSONAL,
    priceLabel: bdt(PLUS_PERSONAL),
    seats: 1,
    duration: "30 days",
    deliverySLA: "5–15 minutes",
    accessType: "customer-owned",
    deviceRule: "No restriction (your account)",
    warranty: "Tied to your own account management.",
    segment: "Professional",
    targetBuyer: "Power users",
    badge: "Own Account",
    color: "green",
    quarantined: false,
  },
  {
    slug: "business-shared",
    title: "ChatGPT Business — Shared",
    plan: "Business",
    tier: "Shared",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: 7,
    duration: "30 days",
    deliverySLA: "Up to 12 hours",
    accessType: "workspace-invite",
    deviceRule: "Workspace rules apply",
    warranty: "Pending access-model review.",
    segment: "Team Budget",
    targetBuyer: "Small teams",
    badge: "Under Review",
    color: "orange",
    quarantined: true,
    quarantineReason:
      "Corresponds to catalog record chatgpt-business-starter-shared, quarantined pending_evidence. A workspace-invite model needs verified seat/ownership evidence before it can be sold, which does not exist for this tier.",
  },
  {
    slug: "business-premium-shared",
    title: "ChatGPT Business — Premium Shared",
    plan: "Business",
    tier: "Premium Shared",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: "2–3",
    duration: "30 days",
    deliverySLA: "Up to 12 hours",
    accessType: "workspace-invite",
    deviceRule: "Workspace rules apply",
    warranty: "Pending access-model review.",
    segment: "Team Quality",
    targetBuyer: "Agencies",
    badge: "Under Review",
    color: "orange",
    quarantined: true,
    quarantineReason:
      "Corresponds to catalog record chatgpt-business-premium-shared, quarantined pending_evidence.",
  },
  {
    slug: "business-personal-like",
    title: "ChatGPT Business — Personal Account",
    plan: "Business",
    tier: "Personal Account",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: 1,
    duration: "30 days",
    deliverySLA: "Up to 12 hours",
    accessType: "workspace-invite",
    deviceRule: "Dedicated experience",
    warranty: "Pending access-model review.",
    segment: "Team Pro",
    targetBuyer: "Businesses, agencies",
    badge: "Under Review",
    color: "orange",
    quarantined: true,
    quarantineReason:
      "\"Workspace-invite\" despite the name — this is a dedicated seat inside a business workspace we do not have verified ownership/evidence for, not a real customer-owned account. Treated the same as the other workspace-invite tiers pending review.",
  },
  {
    slug: "pro-premium-shared",
    title: "ChatGPT Pro — Premium Shared",
    plan: "Pro",
    tier: "Premium Shared",
    priceBDT: 0,
    priceLabel: "Confirm on WhatsApp",
    seats: "5–6",
    duration: "30 days",
    deliverySLA: "5–15 minutes",
    accessType: "shared",
    deviceRule: "1 device only",
    warranty: "Pending access-model review.",
    segment: "Pro",
    targetBuyer: "Heavy power users",
    badge: "Under Review",
    color: "red",
    quarantined: true,
    quarantineReason:
      "Corresponds to catalog record chatgpt-pro-premium-shared. CEO decision F27 (2026-07-26): HOLD, no published price, quote per-enquiry only, \"৳4,500/৳4,990 must not appear anywhere.\" This file previously quoted exactly ৳4,990 in a live title, ProductSchema offer and WhatsApp CTA.",
  },
  {
    slug: "pro-personal",
    title: "ChatGPT Pro — Personal Account",
    plan: "Pro",
    tier: "Personal Account",
    priceBDT: PRO_PERSONAL,
    priceLabel: bdt(PRO_PERSONAL),
    seats: 1,
    duration: "30 days",
    deliverySLA: "2–4 hours",
    accessType: "customer-owned",
    deviceRule: "No restriction (your account)",
    warranty: "Full private access. No sharing.",
    segment: "Enterprise",
    targetBuyer: "Enterprise power users",
    badge: "Ultimate",
    color: "red",
    quarantined: false,
  },
];
