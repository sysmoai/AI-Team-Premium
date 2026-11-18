// lib/commercial-eligibility.js
//
// The ONE place that decides what the public site may say or offer for a
// product record. Everything customer-facing (catalog projection, generated
// routes, JSON-LD, client components, WhatsApp prefills) must take its answer
// from decide(); nothing may infer "can sell" from `commercial_status` alone.
//
// Why: `commercial_status: "approved"` is an INTERNAL management/price flag. In
// data/commercial-governance.json all 95 "approved" records were produced by
// scripts/approve-all-legacy.mjs from `approved_legacy_unreviewed` and carry
// no `resale_or_seat_evidence`, no `official_terms_url` and only a
// self-referential bulk evidence id. Internal approval is not evidence that the
// provider permits this reseller to supply this access, so it must not unlock a
// purchase action, a published price, an availability claim or Offer schema.
//
// Fail closed: a missing governance record, unknown status, malformed date,
// missing/placeholder evidence or contradictory fields never widens access.
//
// Pure ESM, no I/O, importable from Node build scripts, the Worker and the
// client bundle (via @shared/ or relative path).

export const PUBLIC_STATES = Object.freeze({
  PURCHASABLE: "purchasable", //             evidence + valid price approval
  INQUIRY_ONLY: "inquiry_only", //           internally approved, provider evidence missing/invalid
  PENDING_EVIDENCE: "pending_provider_evidence",
  REQUEST_PRICE_ONLY: "request_price_only",
  UNAVAILABLE: "unavailable",
  NOT_FOR_RESALE: "not_for_resale",
  PROHIBITED: "prohibited",
  RETIRED: "retired",
  UNKNOWN: "unknown", //                     no governance record / unrecognised status
});

// Evidence ids that are self-referential placeholders, not citations. The
// 2026-08-02 incident recorded in governance `_meta` produced exactly these.
const PLACEHOLDER_EVIDENCE = [/^ceo-decision-\d{4}-\d{2}-\d{2}(-bulk)?$/i, /^placeholder/i, /^todo/i, /^tbd/i];
const PLACEHOLDER_APPROVAL = [/-LEGACY-/i, /^TBD/i, /^PLACEHOLDER/i];

const isNonEmpty = (v) =>
  Array.isArray(v) ? v.some(isNonEmpty) : typeof v === "string" ? v.trim().length > 0 : v != null && v !== false;

function isHttpsUrl(v) {
  if (typeof v !== "string") return false;
  try {
    const u = new URL(v.trim());
    return u.protocol === "https:" && u.hostname.includes(".");
  } catch {
    return false;
  }
}

function parseDate(v) {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(v)) return null;
  const d = new Date(v.slice(0, 10) + "T23:59:59Z");
  return Number.isNaN(d.getTime()) ? null : d;
}

const CLOSED = Object.freeze({
  canDisplay: true, // the page itself may exist for discovery/education
  canDisplayPrice: false,
  canShowOrderCTA: false,
  canRequestQuote: false,
  canShowAvailability: false,
  canPublishOfferSchema: false,
  canOfferCustomerOwnedSetup: false,
  canAutoFulfill: false,
  canAcceptPayment: false,
  publicPrice: null,
  publicDeliverySLA: null,
});

function result(state, flags, reasons) {
  return Object.freeze({ ...CLOSED, ...flags, publicCommercialState: state, reasons: Object.freeze(reasons) });
}

/**
 * @param {object|undefined} g   a data/commercial-governance.json record
 * @param {{now?: Date}} [opts]
 */
export function decide(g, opts = {}) {
  const now = opts.now instanceof Date ? opts.now : new Date();
  if (!g || typeof g !== "object") {
    return result(PUBLIC_STATES.UNKNOWN, {}, ["no governance record"]);
  }
  const status = g.commercial_status;

  switch (status) {
    case "prohibited":
      return result(PUBLIC_STATES.PROHIBITED, {}, ["status prohibited"]);
    case "not_for_resale":
      return result(PUBLIC_STATES.NOT_FOR_RESALE, {}, ["status not_for_resale"]);
    case "retired":
      return result(PUBLIC_STATES.RETIRED, {}, ["status retired"]);
    case "unavailable":
      return result(PUBLIC_STATES.UNAVAILABLE, {}, ["status unavailable"]);
    case "pending_evidence":
      return result(PUBLIC_STATES.PENDING_EVIDENCE, { canRequestQuote: true }, ["status pending_evidence"]);
    case "request_price_only":
      return result(PUBLIC_STATES.REQUEST_PRICE_ONLY, { canRequestQuote: true }, ["status request_price_only"]);
    case "approved":
      break;
    default:
      // approved_legacy_unreviewed, undefined, typos, anything new: unknown.
      return result(PUBLIC_STATES.UNKNOWN, {}, [`unrecognised status ${JSON.stringify(status)}`]);
  }

  // ---- approved: internal approval. Now require external evidence. ----
  const why = [];

  if (!isNonEmpty(g.resale_or_seat_evidence)) why.push("no resale_or_seat_evidence");
  if (!isHttpsUrl(g.official_terms_url)) why.push("no valid https official_terms_url");

  const ids = Array.isArray(g.evidence_ids) ? g.evidence_ids.filter(isNonEmpty) : [];
  if (!ids.some((id) => !PLACEHOLDER_EVIDENCE.some((re) => re.test(String(id).trim()))))
    why.push("no non-placeholder evidence id");

  if (g.verification_status !== "verified") why.push("verification_status is not verified");
  if (typeof g.access_model !== "string" || !g.access_model || /^UNVERIFIED/i.test(g.access_model))
    why.push("access model unverified");
  if (g.credential_sharing_required !== false) why.push("credential sharing not excluded");

  // contradictions between "approved" and the rest of the record
  if (g.price_on_request === true) why.push("approved but price_on_request is true");
  const price = g.approved_bdt_price;
  if (!(typeof price === "number" && Number.isFinite(price) && price > 0)) why.push("no valid approved_bdt_price");
  if (!isNonEmpty(g.price_approval_id) || PLACEHOLDER_APPROVAL.some((re) => re.test(String(g.price_approval_id))))
    why.push("price_approval_id missing or bulk/legacy placeholder");
  const until = parseDate(g.approval_valid_until);
  if (!until) why.push("approval_valid_until missing or invalid");
  else if (until < now) why.push("price approval expired");
  const nextReview = g.next_review_at == null ? null : parseDate(g.next_review_at);
  if (g.next_review_at != null && !nextReview) why.push("next_review_at invalid");
  else if (nextReview && nextReview < now) why.push("review overdue");

  if (why.length) {
    // Internally approved but not externally evidenced: enquiry only.
    return result(PUBLIC_STATES.INQUIRY_ONLY, { canRequestQuote: true }, why);
  }

  return result(
    PUBLIC_STATES.PURCHASABLE,
    {
      canDisplayPrice: true,
      canShowOrderCTA: true,
      canRequestQuote: true,
      canShowAvailability: true,
      canPublishOfferSchema: true,
      canOfferCustomerOwnedSetup: g.access_model === "customer_owned_activation",
      canAcceptPayment: false, // payment is always confirmed by a human on WhatsApp; no gateway exists
      publicPrice: price,
    },
    ["approved with provider evidence and valid price approval"]
  );
}

/** Human labels for the public states (EN, BN). Kept here so every surface agrees. */
export const STATE_LABEL = Object.freeze({
  purchasable: { en: "Order on WhatsApp", bn: "হোয়াটসঅ্যাপে অর্ডার করুন" },
  inquiry_only: { en: "Ask about availability", bn: "প্রাপ্যতা জানতে মেসেজ করুন" },
  pending_provider_evidence: { en: "Under provider verification", bn: "প্রোভাইডার যাচাই চলছে" },
  request_price_only: { en: "Ask about this plan", bn: "এই প্ল্যান সম্পর্কে জিজ্ঞাসা করুন" },
  unavailable: { en: "Currently unavailable", bn: "এখন পাওয়া যাচ্ছে না" },
  not_for_resale: { en: "Not offered for resale", bn: "পুনর্বিক্রয়ের জন্য নয়" },
  prohibited: { en: "Not offered", bn: "অফার করা হয় না" },
  retired: { en: "No longer offered", bn: "আর অফার করা হয় না" },
  unknown: { en: "Not currently offered", bn: "এখন অফার করা হচ্ছে না" },
});

/** Neutral prefill. Never asks for payment details, never names a price or a delivery time. */
export function inquiryMessage(productName) {
  return `Hi! I have a question about ${productName}. Please tell me whether it is currently available and how you would supply it, before I decide anything.`;
}

/** Prefill used only when canShowOrderCTA is true. */
export function orderMessage(productName, price) {
  const p = typeof price === "number" && price > 0 ? ` (৳${price.toLocaleString("en-US")}/mo)` : "";
  return `Hi! I want ${productName}${p}. Please confirm the offer and share payment details.`;
}
