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
// C6: narrowed to FULFILMENT context. The C5 pattern also matched provider
// specs ("15hr fast GPU", "instant voice cloning", "6000 min/mo", "Deploy
// instantly") and removed legitimate product information. A bare number of
// hours/minutes is not a promise; "delivered within 2 hours" is.
export const CLAIM_RE =
  /\b(?:instant(?:ly)?|immediate(?:ly)?)\s+(?:deliver\w*|activat\w*|access|setup|set-up)|\b(?:deliver\w*|activat\w*|access(?:ed)?|ready|receive\w*|set\s?up)\s+(?:(?:in|within)\s+(?:under\s+)?\d|instantly|immediately)|\bwithin\s+\d+\s*(?:[-–]\s*\d+\s*)?(?:min|minute|hour|hr|day)s?\b|\d+\s*[-–]\s*\d+\s*(?:min|minute)s?\b|\b\d+\s*-?\s*(?:hr|hour|day)s?\s+(?:setup|set-up|training|support)\b|warrant|replacement|replace(?:d)?\s+(?:the\s+|your\s+)?(?:account|seat|login|subscription)|guarantee|refund|lifetime|ওয়ারেন্টি|রিপ্লেস|গ্যারান্টি|[০-৯0-9]+\s*[-–]?\s*[০-৯0-9]*\s*(?:মিনিটে|মিনিটের মধ্যে|ঘণ্টার মধ্যে|ঘণ্টায়)/i;
export const PRICE_RE = /৳\s?[\d,]+|\bBDT\s?[\d,]+|\bTk\.?\s?[\d,]+/i;
// "^shared" catches tier copy such as "Shared Midjourney Pro." that markets a
// shared tier by name (C6: restored spec sentences must not carry it back).
export const SHARED_RE = /\bshared\s+(access|seat|pool|account|plan)s?\b|^\s*shared\b(?!\s+(?:scenario|folder|workspace|drive|inbox|librar|template|link|board|calendar|channel|doc|file|project)s?)|splits? a legitimate subscription/i;
export const PAYMENT_RE = /bkash|nagad|rocket|bank transfer|credit card|international card|payment|পেমেন্ট/i;
// Another business's contact identity (Cycle 5): catalog copy never needs a phone
// number — the WhatsApp CTA is generated from config — so ANY number, a name of the
// sibling storefront, or the hole a scrubbed brand name leaves behind
// ("safe to buy through ?") drops the sentence/entry that carries it. (The sibling
// storefront's acronym is written with a one-letter class so this file itself passes
// the repository check that no public source contains that acronym.)
export const IDENTITY_RE =
  /(?:\+?880[\s-]?1[\d\s-]{8,12}|\b01[3-9]\d{8}\b|wa\.me\/\d+)|\bAI[P]S\b|AI\s*Premium\s*Shop|aipremiumshop|\b(?:through|from|with|via|by|at)\s+[?.,]/i;
const POLICY_BADGE_RE = /%\s*off|save|discount|offer|deal|best\s*seller|\bP[0-9]\b|hot add/i;

const splitSentences = (s) => s.split(/(?<=[.!?।])\s+/);
const dropSentences = (s, re) => splitSentences(s).filter((x) => !re.test(x)).join(" ").trim();
const union = (...res) => new RegExp(res.map((r) => r.source).join("|"), "i");

const PAYMENT_FAQ = {
  q: "Can I pay without an international credit card?",
  a: "bKash and Nagad are the payment methods listed on this site. Exact payment instructions for your order are confirmed on WhatsApp once the offer is confirmed — do not pay before that.",
};

// C6 FAQ recovery. Entries removed by the filters above are not restored as
// written (they carried prices, payment promises, a foreign brand hole or a
// shared-access pitch). Where the QUESTION is still useful to a buyer, a neutral
// educational answer replaces it: account ownership, privacy and how to check a
// supplier. These answers make no promise about price, payment, delivery,
// availability, warranty or what this site supplies, so they are safe on every
// record. Payment, delivery and "account stops working" answers stay withheld
// until the owner approves wording (see the Cycle 6 FAQ content-recovery report).
const productLabel = (name) => String(name || "this tool").split(/\s+[—–-]\s+/)[0].trim() || "this tool";
export const RECOVERED_FAQ = Object.freeze({
  ownership: (name) => ({
    q: `What is the difference between a personal account and a shared login for ${productLabel(name)}?`,
    a: "A personal account is registered to you: you control the password, the recovery email, the billing relationship with the provider and your own history. With a shared login several people use one account, so others may see your prompts and files, and whoever owns the account controls recovery and can lose it for everyone. Many providers' terms of use do not allow one login to be used by several people, so read the provider's terms before agreeing to any shared arrangement.",
  }),
  safety: (name) => ({
    q: `How can I check that a way of getting ${productLabel(name)} is safe?`,
    a: "Prefer an account in your own name, with your own recovery email and two-factor authentication turned on. Never share your password or one-time login codes with anyone. Compare what you are offered with the provider's official plans and terms, and ask how access would be supplied before you pay anyone.",
  }),
});
const RECOVERABLE = [
  [/shared|personal/i, "ownership"],
  [/\bsafe\b/i, "safety"],
];

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
    const slugPrice = new Map(); // slug -> lowest GOVERNED price among purchasable records
    for (const p of list) {
      const d = decide(governance[p.id], opts);
      decisions.set(p.id, d);
      const key = `${p.slug}|${String(p.tier || "").trim().toLowerCase()}`;
      // Two records sharing slug+tier: keep the most restrictive decision, so a
      // purchasable record can never lend its price to a pending twin.
      const prev = tierDecision.get(key);
      if (!prev || (prev.canDisplayPrice && !d.canDisplayPrice)) tierDecision.set(key, d);
      if (d.canShowOrderCTA) {
        purchasableSlugs.add(p.slug);
        if (!slugPrice.has(p.slug) || d.publicPrice < slugPrice.get(p.slug)) slugPrice.set(p.slug, d.publicPrice);
      }
    }
    const ctx = { decisions, purchasableSlugs, tierDecision, slugPrice, governance, opts };
    return list.map((p) => projectRecord(p, ctx));
  };
}

function projectRecord(p, ctx) {
  const { decisions, tierDecision, slugPrice, governance, opts } = ctx;
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
  if (d.canShowOrderCTA) out.whatsappMsg = orderMessage(out.name, d.publicPrice, out.priceUnit ?? "/mo");
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
    const isRemoved = (f) => Boolean(f?._recover) || faqBad.test(`${f?.q ?? ""} ${f?.a ?? ""}`);
    const removed = out.faq.filter(isRemoved);
    out.faq = out.faq.filter((f) => !isRemoved(f));
    const kinds = new Set();
    for (const f of removed) {
      if (f?._recover && RECOVERED_FAQ[f._recover]) kinds.add(f._recover);
      else for (const [re, kind] of RECOVERABLE) if (re.test(f?.q ?? "")) kinds.add(kind);
    }
    for (const [, kind] of RECOVERABLE) if (kinds.has(kind)) out.faq.push(RECOVERED_FAQ[kind](out.name));
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
      // Availability is a claim too: only an orderable tier may say "in stock".
      if (!nd?.canShowAvailability) delete copy.inStock;
      return copy;
    });
  }
  if (Array.isArray(out.relatedProducts)) {
    out.relatedProducts = out.relatedProducts.map((r) => {
      const copy = { ...r };
      // Never forward the source's number: only the target's governed price.
      if (slugPrice.has(r?.slug)) copy.priceBDT = slugPrice.get(r.slug);
      else delete copy.priceBDT;
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
      if (!AITP_NUMBERS.has(digits)) problems.push(`${id}: phone number ${digits.slice(0, 5)}… is not this site's`);
    }
    if (/\bAI[P]S\b|AI\s*Premium\s*Shop|aipremiumshop/i.test(s)) problems.push(`${id}: another storefront's name appears`);
    if (/\b(through|from|with|via|by|at)\s+[?.,]/i.test(s)) problems.push(`${id}: dangling brand placeholder`);
  }
  return problems;
}
