// shared/service-eligibility.js
//
// The ONE rule for what the public site may say about AITP's own services
// (training, setup, automation, consulting, design, development).
//
// Services are governed separately from subscriptions on purpose
// (shared/service-governance.json, not data/commercial-governance.json):
//   - a subscription's "approved" status never approves a service, and
//   - a service label must never be used to sell subscription access.
//
// Fail closed: a missing record, unknown status, missing approval id, expired
// or invalid date, or any unapproved term (scope, deliverables, payment,
// refund, support) means no price, no booking button and no Offer schema.
// A neutral enquiry ("ask us about this") stays possible for pending services.
//
// Pure ESM, no I/O: used by the client bundle, build scripts and tests.

import governance from "./service-governance.json" with { type: "json" };

export const SERVICE_STATES = Object.freeze({
  BOOKABLE: "bookable",
  ENQUIRY_ONLY: "enquiry_only",
  UNAVAILABLE: "unavailable",
  RETIRED: "retired",
  UNKNOWN: "unknown",
});

const REQUIRED_TERMS = [
  "scope_approved",
  "deliverables_approved",
  "payment_terms_approved",
  "refund_terms_approved",
  "support_terms_approved",
];

const CLOSED = Object.freeze({
  canDisplayPrice: false,
  canShowBookingCTA: false,
  canRequestQuote: false,
  canPublishOfferSchema: false,
  publicPrice: null,
  publicPriceUnit: null,
});

function out(state, flags, reasons) {
  return Object.freeze({ ...CLOSED, ...flags, state, reasons: Object.freeze(reasons) });
}

function parseDate(v) {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const d = new Date(v + "T23:59:59Z");
  // Reject dates JS silently rolls over (2027-02-30 -> 2027-03-02).
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v) return null;
  return d;
}

/**
 * @param {object|undefined} rec  one entry of service-governance.json `services`
 * @param {{now?: Date}} [opts]
 */
export function decideService(rec, opts = {}) {
  const now = opts.now instanceof Date ? opts.now : new Date();
  if (!rec || typeof rec !== "object") return out(SERVICE_STATES.UNKNOWN, {}, ["no service record"]);

  switch (rec.status) {
    case "retired":
      return out(SERVICE_STATES.RETIRED, {}, ["status retired"]);
    case "unavailable":
      return out(SERVICE_STATES.UNAVAILABLE, {}, ["status unavailable"]);
    case "pending_owner_approval":
      return out(SERVICE_STATES.ENQUIRY_ONLY, { canRequestQuote: true }, ["status pending_owner_approval"]);
    case "owner_approved":
      break;
    default:
      return out(SERVICE_STATES.UNKNOWN, {}, [`unrecognised status ${JSON.stringify(rec.status)}`]);
  }

  const why = [];
  for (const k of REQUIRED_TERMS) if (rec[k] !== true) why.push(`${k} is not true`);
  const price = rec.approved_bdt_price;
  if (!(typeof price === "number" && Number.isFinite(price) && price > 0)) why.push("no valid approved_bdt_price");
  if (typeof rec.price_unit !== "string" || !rec.price_unit.trim()) why.push("no price_unit");
  if (typeof rec.price_approval_id !== "string" || !rec.price_approval_id.trim() || /LEGACY|PLACEHOLDER|^TBD/i.test(rec.price_approval_id))
    why.push("price_approval_id missing or placeholder");
  const until = parseDate(rec.approval_valid_until);
  if (!until) why.push("approval_valid_until missing or invalid");
  else if (until < now) why.push("approval expired");

  if (why.length) return out(SERVICE_STATES.ENQUIRY_ONLY, { canRequestQuote: true }, why);

  return out(
    SERVICE_STATES.BOOKABLE,
    {
      canDisplayPrice: true,
      canShowBookingCTA: true,
      canRequestQuote: true,
      canPublishOfferSchema: true,
      publicPrice: price,
      publicPriceUnit: rec.price_unit.trim(),
    },
    ["owner approved with complete terms"]
  );
}

export function serviceRecord(id, list = governance.services) {
  return Array.isArray(list) ? list.find((s) => s && s.id === id) : undefined;
}

/** "from ৳N/unit" when the service may show a price, otherwise null. */
export function servicePriceLabel(id, opts) {
  const d = decideService(serviceRecord(id, opts?.list), opts);
  if (!d.canDisplayPrice) return null;
  return `from ৳${d.publicPrice.toLocaleString("en-US")}${d.publicPriceUnit ? "/" + d.publicPriceUnit : ""}`;
}
