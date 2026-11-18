// lib/business-os/quote.js — server-side quotation.
//
// The price on a quote comes ONLY from the governance decision for that offer
// (lib/commercial-eligibility.js for subscriptions, shared/service-eligibility.js
// for services). Nothing the browser sends can set or change it. An ineligible
// offer, a missing approved payment policy or missing terms never produce a
// payable quote.

import { createHash } from "node:crypto";
import { decide } from "../commercial-eligibility.js";
import { decideService } from "../../shared/service-eligibility.js";
import { authorize } from "./rbac.js";

export class QuoteError extends Error {
  constructor(code) { super(code); this.code = code; }
}

const MAX_QTY = 50;
const DEFAULT_TTL_HOURS = 48;

/**
 * Payment policy is an OWNER record (accepted methods + AI Team Premium's own receiving
 * account references). It must be approved, belong to U05 and be current.
 */
export function paymentPolicyUsable(policy, now) {
  return Boolean(
    policy && policy.businessId === "U05" && policy.status === "owner_approved" &&
    Array.isArray(policy.methods) && policy.methods.length > 0 &&
    typeof policy.version === "string" && policy.version &&
    (!policy.validUntil || new Date(policy.validUntil) > now)
  );
}

/**
 * @param {object} req  { offer: {kind:"product"|"service", id}, quantity, scope, customerRef, termsVersion }
 *   — fields like `price` in the request are ignored by design.
 * @param {object} ctx  { actor, governance, services, paymentPolicy, now, newId }
 */
export function prepareQuote(req, ctx) {
  const now = ctx.now ?? new Date();
  authorize(ctx.actor, "quote.prepare", { now, audit: ctx.audit });
  const { offer } = req ?? {};
  if (!offer || !["product", "service"].includes(offer.kind) || typeof offer.id !== "string") throw new QuoteError("QUOTE_BAD_OFFER");
  const qty = Number.isInteger(req.quantity) ? req.quantity : 1;
  if (qty < 1 || qty > MAX_QTY) throw new QuoteError("QUOTE_BAD_QUANTITY");

  let unitPrice, unit, eligible;
  if (offer.kind === "product") {
    const d = decide(ctx.governance?.[offer.id], { now });
    eligible = d.canShowOrderCTA && d.canDisplayPrice;
    unitPrice = d.publicPrice;
    unit = "month";
  } else {
    const rec = (ctx.services ?? []).find((s) => s && s.id === offer.id);
    const d = decideService(rec, { now });
    eligible = d.canShowBookingCTA && d.canDisplayPrice;
    unitPrice = d.publicPrice;
    unit = d.publicPriceUnit;
  }
  if (!eligible) throw new QuoteError("QUOTE_INELIGIBLE_OFFER");
  if (!paymentPolicyUsable(ctx.paymentPolicy, now)) throw new QuoteError("QUOTE_NO_APPROVED_PAYMENT_POLICY");
  if (typeof req.termsVersion !== "string" || !req.termsVersion) throw new QuoteError("QUOTE_NO_TERMS_VERSION");

  const body = {
    businessId: "U05",
    offer: { kind: offer.kind, id: offer.id },
    quantity: qty,
    unit,
    unitPriceBdt: unitPrice,
    totalBdt: unitPrice * qty,
    currency: "BDT",
    scope: typeof req.scope === "string" ? req.scope.slice(0, 500) : null,
    termsVersion: req.termsVersion,
    paymentPolicyVersion: ctx.paymentPolicy.version,
    paymentMethods: [...ctx.paymentPolicy.methods],
    customerRef: req.customerRef ?? null,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + DEFAULT_TTL_HOURS * 3600e3).toISOString(),
    preparedBy: ctx.actor.id,
    customerAcceptance: "PENDING",
    orderConversion: "NOT_CONVERTED",
  };
  const id = ctx.newId ? ctx.newId("Q") : "Q-" + createHash("sha256").update(JSON.stringify(body)).digest("hex").slice(0, 16);
  return Object.freeze({ id, ...body });
}

export function isQuoteValid(quote, now = new Date()) {
  return Boolean(quote && quote.customerAcceptance === "ACCEPTED" && new Date(quote.expiresAt) > now);
}
