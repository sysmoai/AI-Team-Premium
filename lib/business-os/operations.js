// lib/business-os/operations.js — CRM leads, support tickets, renewals, finance
// and the cross-business output gate. Pure functions over plain records.

import { authorize } from "./rbac.js";
import { IDENTITY_RE } from "../public-projection.js";

// ------------------------------------------------------------------ CRM
const LEAD_STAGES = ["NEW", "CONTACTED", "QUALIFIED", "QUOTED", "WON", "LOST", "DORMANT"];
export const LEAD_RETENTION_DAYS = 365; // proposal; owner sets the real policy

export function createLead(input, { actor, now = new Date() }) {
  authorize(actor, "lead.write", { now });
  if (!input?.source) throw new Error("LEAD_SOURCE_REQUIRED");
  const consent = input.consent === true;
  return {
    id: input.id,
    businessId: "U05",
    source: input.source,
    contact: consent ? input.contact ?? null : null, // no consent = no stored contact
    consent: { marketing: consent, recordedAt: consent ? now.toISOString() : null },
    interest: input.interest ?? null,
    qualification: { need: input.need ?? null, budget: input.budget ?? "UNKNOWN" },
    assignedTo: null,
    stage: "NEW",
    lastContactAt: null,
    nextAction: "qualify",
    deleteAfter: new Date(now.getTime() + LEAD_RETENTION_DAYS * 864e5).toISOString(),
  };
}

export function moveLead(lead, stage, { actor, now = new Date() }) {
  authorize(actor, "lead.write", { now });
  if (!LEAD_STAGES.includes(stage)) throw new Error("LEAD_BAD_STAGE");
  return { ...lead, stage, lastContactAt: now.toISOString() };
}

/** Export requires lead.export and strips contacts without consent. */
export function exportLeads(leads, { actor, now = new Date() }) {
  authorize(actor, "lead.export", { now });
  return leads.map((l) => ({ ...l, contact: l.consent?.marketing ? l.contact : null }));
}

export function purgeExpiredLeads(leads, now = new Date()) {
  return leads.filter((l) => new Date(l.deleteAfter) > now);
}

// --------------------------------------------------------------- support
const TICKET_EDGES = { OPEN: ["IN_PROGRESS", "ESCALATED"], IN_PROGRESS: ["WAITING_CUSTOMER", "RESOLVED", "ESCALATED"], WAITING_CUSTOMER: ["IN_PROGRESS", "RESOLVED"], ESCALATED: ["IN_PROGRESS", "RESOLVED"], RESOLVED: ["CLOSED", "IN_PROGRESS"], CLOSED: [] };

export function moveTicket(ticket, to, { actor, now = new Date(), note }) {
  authorize(actor, "support.handle", { now });
  if (!TICKET_EDGES[ticket.status]?.includes(to)) throw new Error("TICKET_INVALID_TRANSITION");
  if (to === "CLOSED" && ticket.customerConfirmedResolution !== true) throw new Error("TICKET_NEEDS_CUSTOMER_CONFIRMATION");
  return { ...ticket, status: to, history: [...(ticket.history ?? []), { to, by: actor.id, at: now.toISOString(), note: note ?? null }] };
}

// --------------------------------------------------------------- renewals
/**
 * A reminder may be queued only for a real, provider-permitted term with a
 * recorded end date, a customer who consented, inside the reminder window, and
 * not already reminded for this term.
 */
export function renewalReminderDecision(sub, { now = new Date(), windowDays = 7, sent = new Set() } = {}) {
  if (!sub || sub.businessId !== "U05") return { ok: false, code: "WRONG_BUSINESS" };
  if (sub.providerPermitted !== true) return { ok: false, code: "NOT_PROVIDER_PERMITTED" };
  if (sub.consentToRemind !== true) return { ok: false, code: "NO_CONSENT" };
  const end = new Date(sub.termEndsAt);
  if (Number.isNaN(end.getTime())) return { ok: false, code: "NO_TERM_DATE" };
  const days = (end - now) / 864e5;
  if (days < 0) return { ok: false, code: "TERM_ENDED" };
  if (days > windowDays) return { ok: false, code: "OUTSIDE_WINDOW" };
  const key = `${sub.id}:${sub.termEndsAt}`;
  if (sent.has(key)) return { ok: false, code: "DUPLICATE_REMINDER" };
  return { ok: true, key };
}

// ---------------------------------------------------------------- finance
const COST_KEYS = ["supplierCost", "processingFee", "fulfillmentLabor", "supportLabor", "refunds", "acquisitionCost"];

/**
 * Contribution per verified order. A missing cost is UNKNOWN, never 0.
 * Synthetic/demo orders are excluded from real totals.
 */
export function contribution(orders) {
  const real = orders.filter((o) => o && o.synthetic !== true && o.paymentVerified === true);
  let revenue = 0, unknown = [];
  let costs = 0;
  for (const o of real) {
    revenue += o.recognizedRevenueBdt ?? 0;
    for (const k of COST_KEYS) {
      if (typeof o[k] !== "number" || !Number.isFinite(o[k])) unknown.push(`${o.id}.${k}`);
      else costs += o[k];
    }
  }
  return {
    ordersCounted: real.length,
    excludedSynthetic: orders.filter((o) => o?.synthetic === true).length,
    recognizedRevenueBdt: revenue,
    contributionBdt: unknown.length ? "UNKNOWN" : revenue - costs,
    unknownInputs: unknown,
  };
}

export function operatingProfit(contrib, fixedOverheadBdt) {
  if (contrib.contributionBdt === "UNKNOWN" || typeof fixedOverheadBdt !== "number") return "UNKNOWN";
  return contrib.contributionBdt - fixedOverheadBdt;
}

// ------------------------------------------------- cross-business output gate
export const AITP_NUMBERS = new Set(["8801533262758"]);

/** Fails when another unit's identity or a non-AI Team Premium phone/payment number appears. */
export function crossBusinessViolations(text, { allowedNumbers = AITP_NUMBERS } = {}) {
  const v = [];
  const s = String(text ?? "");
  // Normalise every phone-shaped run (with +880 / 880 / 0 / no prefix, any
  // separators, or inside wa.me links) to 880XXXXXXXXXX and compare the WHOLE
  // number. Anything phone-shaped that does not normalise to exactly 13 digits
  // fails closed.
  // Take every MAXIMAL run of digits and separators (space . - ( ) /), with an
  // optional + or 00 international prefix, normalise it, and if it contains a
  // Bangladeshi mobile shape (1[3-9] + 8 digits) it must normalise to exactly an
  // allowed 13-digit number — anything else fails closed.
  // Bengali (০-৯) and Arabic-Indic digits are mapped to ASCII first.
  const ascii = s.replace(/[০-৯]/g, (c) => String(c.charCodeAt(0) - 0x09e6)).replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660));
  for (const m of ascii.matchAll(/\+?\d[\d\s.()\/\u200b-]{7,40}\d/g)) {
    let d = m[0].replace(/\D/g, "");
    if (!/1[3-9]\d{8}/.test(d)) continue; // not a mobile-number shape
    if (d.startsWith("00")) d = d.slice(2);
    if (d.startsWith("880")) { /* already international */ }
    else if (d.startsWith("0")) d = "88" + d;
    else d = "880" + d;
    if (d.length !== 13) { v.push(`unrecognised phone-like number (${d.length} digits)`); continue; }
    if (!allowedNumbers.has(d)) v.push(`foreign number ${d.slice(0, 6)}…`);
  }
  if (/\bAI[P]S\b|AI\s*Premium\s*Shop|aipremiumshop|save\s?on\s?sub|AI\s*Premium\s*Tools|softsuper/i.test(s)) v.push("other business identity");
  if (IDENTITY_RE.test(s) && v.length === 0 && /through ?[?.,]/.test(s)) v.push("dangling brand placeholder");
  return v;
}
