// lib/public-projection.js
//
// Turns the internal catalog records into the PUBLIC records that ship in
// client/src/data/products-catalog.json. products-catalog.json is imported by the
// client bundle and read by every generator (routes, JSON-LD, nav, pricing
// table), so this is the only place where restricted commercial data can be kept
// out of public output — hiding it in React afterwards would still ship it in the
// JavaScript bundle.
//
// Every number, assurance and CTA flag in the public record comes from
// lib/commercial-eligibility.js. Internal reference prices stay in
// data/commercial-governance.json and the internal products-complete.json; the
// client imports neither.
//
// Kept as a module (not inline in scripts/build-catalog.mjs) so tests can feed it
// synthetic unsafe records and prove the leak guards fire.

import { decide, STATE_LABEL, inquiryMessage, orderMessage } from "./commercial-eligibility.js";

// Fulfilment/assurance wording nobody has evidenced. Removed from ALL records,
// purchasable or not: no source in the repository backs a delivery time, a
// warranty or a replacement promise. (Bare "ডেলিভারি" is NOT matched: it also means
// ordinary project delivery in use-case copy; delivery promises are caught by the
// number+মিনিট/ঘণ্টা patterns; "ঘণ্টাভিত্তিক" = hour-based billing is not a promise.)
export const CLAIM_RE =
  /instant|immediate|within\s+\d+|\d+\s*[-–]\s*\d+\s*(min|minute|hour|hr)|\b\d+\s*(minute|min|hour|hr)s?\b|warrant|replac|guarantee|refund|lifetime|ওয়ারেন্টি|রিপ্লেস|গ্যারান্টি|[০-৯0-9]+\s*[-–]?\s*[০-৯0-9]*\s*(মিনিট|ঘণ্টা)/i;
export const PRICE_RE = /৳\s?[\d,]+|\bBDT\s?[\d,]+|\bTk\.?\s?[\d,]+/i;
export const SHARED_RE = /\bshared\s+(access|seat|pool|account|plan)s?\b|splits? a legitimate subscription/i;
export const PAYMENT_RE = /bkash|nagad|rocket|bank transfer|credit card|international card|payment|পেমেন্ট/i;
// Another business's contact identity (Cycle 5): catalog copy never needs a phone
// number — the WhatsApp CTA is generated from config — so ANY number, a name of the
// sibling storefront, or the hole a scrubbed brand name leaves behind
// ("safe to buy through ?") drops the sentence/entry that carries it.
export const IDENTITY_RE =
  /(?:\+?880[\s-]?1[\d\s-]{8,12}|\b01[3-9]\d{8}\b|wa\.me\/\d+)|\bAIPS\b|AI\s*Premium\s*Shop|aipremiumshop|\b(?:through|from|with|via|by|at)\s+[?.,]/i;
const POLICY_BADGE_RE = /%\s*off|save|discount|\bP[0-9]\b|hot add/i;

const splitSentences = (s) => s.split(/(?<=[.!?।])\s+/);
const dropSentences = (s, re) => splitSentences(s).filter((x) => !re.test(x)).join(" ").trim();
const union = (...res) => new RegExp(res.map((r) => r.source).join("|"), "i");

const PAYMENT_FAQ = {
  q: "Can I pay without an international credit card?",
  a: "bKash and Nagad are the payment methods listed on this site. Exact payment instructions for your order are confirmed on WhatsApp once the offer is confirmed — do not pay before that.",
};

/**
 * @param {Record<string, object>} governance  data/commercial-governance.json `records`
 * @param {{now?: Date}} [opts]
 * @returns {(list: object[]) => object[]} projector for one full catalog list
 */
export function createProjector(governance, opts = {}) {
  return function project(list) {
    const decisions = new Map(); // id -> decision
    const purchasableSlugs = new Set();
    const tierDecision = new Map(); // `${slug}|${tier lowercased}` -> decision
    for (const p of list) {
      const d = decide(governance[p.id], opts);
      decisions.set(p.id, d);
      tierDecision.set(`${p.slug}|${String(p.tier || "").trim().toLowerCase()}`, d);
      if (d.canShowOrderCTA) purchasableSlugs.add(p.slug);
    }
    const ctx = { decisions, purchasableSlugs, tierDecision, governance, opts };
    return list.map((p) => projectRecord(p, ctx));
  };
}

function projectRecord(p, ctx) {
  const { decisions, purchasableSlugs, tierDecision, governance, opts } = ctx;
  const g = governance[p.id];
  const d = decisions.get(p.id) ?? decide(g, opts);
  const out = { ...p, commercialStatus: g ? g.commercial_status : undefined, accessModel: g ? g.access_model : undefined };
  out.publicState = d.publicCommercialState;
  out.canOrder = d.canShowOrderCTA;
  out.canQuote = d.canRequestQuote;

  // ---- price: one governed source, nothing else may supply a number ----
  if (d.canDisplayPrice) {
    out.price = d.publicPrice;
    delete out.priceOnRequest;
    delete out.priceOnRequestReason;
  } else {
    out.price = 0;
    out.priceOnRequest = true;
    out.priceOnRequestReason = STATE_LABEL[d.publicCommercialState].en;
    delete out.officialUSD; // no "save X%" comparisons against a price we are not standing behind
  }

  // ---- WhatsApp prefill: payment ask only when an order is allowed ----
  if (d.canShowOrderCTA) out.whatsappMsg = orderMessage(out.name, d.publicPrice);
  else if (d.canRequestQuote) out.whatsappMsg = inquiryMessage(out.name);
  else delete out.whatsappMsg;

  // ---- fulfilment fields: no evidenced source for any of them ----
  for (const f of ["deliverySLA", "estimatedDeliveryTime", "deliveryMethod", "stock", "lastVerifiedDate"]) delete out[f];

  // ---- prose ----
  const bad = d.canShowOrderCTA ? union(CLAIM_RE, PRICE_RE, IDENTITY_RE) : union(CLAIM_RE, PRICE_RE, IDENTITY_RE, SHARED_RE, PAYMENT_RE);
  for (const f of ["description", "descriptionBN", "whyBuyBN"]) {
    if (typeof out[f] === "string") {
      const cleanedText = dropSentences(out[f], bad);
      if (cleanedText) out[f] = cleanedText;
      else delete out[f];
    }
  }
  if (Array.isArray(out.uniqueSellingPoints)) {
    out.uniqueSellingPoints = out.uniqueSellingPoints.filter(
      (s) => typeof s === "string" && !bad.test(s) && (d.canShowOrderCTA || !PAYMENT_RE.test(s))
    );
  }
  if (Array.isArray(out.howItWorksSteps)) {
    out.howItWorksSteps = out.howItWorksSteps.filter((s) => {
      const text = typeof s === "string" ? s : `${s?.title ?? ""} ${s?.desc ?? ""}`;
      return !bad.test(text) && (d.canShowOrderCTA || !PAYMENT_RE.test(text));
    });
  }
  if (Array.isArray(out.faq)) {
    const faqBad = union(CLAIM_RE, PRICE_RE, IDENTITY_RE, SHARED_RE, PAYMENT_RE);
    out.faq = out.faq.filter((f) => !faqBad.test(`${f?.q ?? ""} ${f?.a ?? ""}`));
    if (d.canShowOrderCTA) out.faq.push(PAYMENT_FAQ);
  }

  // ---- nested plans / related products must not smuggle prices ----
  if (Array.isArray(out.plans)) {
    out.plans = out.plans.map((pl) => {
      const nd = tierDecision.get(`${p.slug}|${String(pl?.planName ?? "").trim().toLowerCase()}`);
      const copy = { ...pl };
      const planBad = nd?.canShowOrderCTA ? union(CLAIM_RE, PRICE_RE, IDENTITY_RE) : union(CLAIM_RE, PRICE_RE, IDENTITY_RE, SHARED_RE, PAYMENT_RE);
      for (const f of ["whatsIncluded", "limitations", "features"]) {
        if (Array.isArray(copy[f])) copy[f] = copy[f].filter((s) => typeof s !== "string" || !planBad.test(s));
      }
      if (nd?.canDisplayPrice) copy.priceBDT = nd.publicPrice;
      else {
        delete copy.priceBDT;
        delete copy.officialUSD;
      }
      return copy;
    });
  }
  if (Array.isArray(out.relatedProducts)) {
    out.relatedProducts = out.relatedProducts.map((r) => {
      const copy = { ...r };
      if (!purchasableSlugs.has(r?.slug)) delete copy.priceBDT;
      return copy;
    });
  }

  // ---- internal tags / savings badges ----
  if (out.badge && POLICY_BADGE_RE.test(out.badge)) delete out.badge;
  if (!d.canShowOrderCTA) delete out.badges;
  return out;
}

/**
 * Independent leak audit of a PUBLIC record list (what ships). Returns a list of
 * human-readable violations; empty means clean. Used by validate-commercial and
 * the regression tests, and deliberately does not reuse projectRecord's logic so a
 * bug there cannot hide itself.
 */
export function auditPublicRecords(records, governance, opts = {}) {
  const problems = [];
  const AITP_NUMBERS = new Set(["8801533262758"]);
  for (const r of records) {
    const d = decide(governance[r.id], opts);
    const s = JSON.stringify(r);
    const id = r.id;
    if (Boolean(r.canOrder) !== d.canShowOrderCTA) problems.push(`${id}: canOrder ${r.canOrder} disagrees with eligibility (${d.publicCommercialState})`);
    if (!d.canDisplayPrice) {
      if (r.price !== 0) problems.push(`${id}: numeric price ${r.price} shipped while price is not displayable (${d.publicCommercialState})`);
      if (r.priceOnRequest !== true) problems.push(`${id}: priceOnRequest not set while price is not displayable`);
      if (PRICE_RE.test(s)) problems.push(`${id}: a BDT amount appears in the public record`);
      if ("officialUSD" in r) problems.push(`${id}: officialUSD shipped without a displayable price`);
      if (JSON.stringify(r.plans ?? []).match(/"priceBDT"/)) problems.push(`${id}: plans[].priceBDT shipped without a displayable price`);
    } else if (r.price !== d.publicPrice) {
      problems.push(`${id}: shipped price ${r.price} differs from governed price ${d.publicPrice}`);
    }
    if (!d.canShowOrderCTA && /payment|bkash|nagad|rocket/i.test(r.whatsappMsg ?? "")) problems.push(`${id}: payment wording in a non-order WhatsApp message`);
    if (CLAIM_RE.test(s)) problems.push(`${id}: unevidenced delivery/warranty/replacement/guarantee wording shipped`);
    for (const f of ["deliverySLA", "estimatedDeliveryTime", "deliveryMethod", "stock", "lastVerifiedDate"]) {
      if (f in r) problems.push(`${id}: field ${f} shipped`);
    }
    if (!d.canShowOrderCTA && SHARED_RE.test(s)) problems.push(`${id}: shared-access claim on a record that may not be ordered`);
    // another business's contact identity
    for (const m of s.matchAll(/(?:\+?880[\s-]?|wa\.me\/)(1[\d\s-]{9,12})/g)) {
      const digits = ("880" + m[1]).replace(/\D/g, "");
      if (!AITP_NUMBERS.has(digits)) problems.push(`${id}: phone number ${digits.slice(0, 5)}… is not AITP's`);
    }
    if (/\bAIPS\b|AI\s*Premium\s*Shop|aipremiumshop/i.test(s)) problems.push(`${id}: another storefront's name appears`);
    if (/\b(through|from|with|via|by|at)\s+[?.,]/i.test(s)) problems.push(`${id}: dangling brand placeholder`);
  }
  return problems;
}
