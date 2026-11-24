// lib/business-os/rbac.js — authorisation for AI Team Premium (business U05).
//
// An actor is trusted ONLY if it was produced by identity.resolveActor() from a
// verified session and the owner-controlled grant store. A plain object built
// from request data (even one that claims role "business_owner") is rejected
// as FORGED_ACTOR. Role labels are proposals; no real person holds a grant.

export const BUSINESS_ID = "U05";

export const ROLES = Object.freeze([
  "business_owner", "strategic_admin", "operations_manager", "sales_support",
  "content_editor", "finance_reviewer", "fulfillment_operator", "auditor",
]);

export const CAPABILITIES = Object.freeze({
  "lead.read": ["business_owner", "operations_manager", "sales_support"],
  "lead.write": ["business_owner", "operations_manager", "sales_support"],
  "lead.export": ["business_owner"],
  "quote.prepare": ["business_owner", "operations_manager", "sales_support"],
  "order.read": ["business_owner", "operations_manager", "sales_support", "fulfillment_operator", "finance_reviewer", "auditor"],
  "order.create": ["business_owner", "operations_manager", "sales_support"],
  "order.cancel": ["business_owner", "operations_manager"],
  "payment.record_customer_report": ["business_owner", "operations_manager", "sales_support"],
  "payment.verify": ["business_owner", "finance_reviewer"],
  "finance.register_source": ["business_owner"],
  "finance.import_statement": ["business_owner", "finance_reviewer"],
  "finance.record_cost": ["business_owner", "finance_reviewer"],
  "finance.read": ["business_owner", "finance_reviewer", "auditor"],
  "fulfillment.claim": ["business_owner", "operations_manager", "fulfillment_operator"],
  "fulfillment.complete": ["business_owner", "operations_manager", "fulfillment_operator"],
  "refund.review": ["business_owner", "finance_reviewer"],
  "refund.approve": ["business_owner"],
  "support.handle": ["business_owner", "operations_manager", "sales_support"],
  "renewal.remind": ["business_owner", "operations_manager", "sales_support"],
  "grant.manage": ["business_owner"],
  "audit.read": ["business_owner", "auditor"],
  "audit.checkpoint": ["business_owner"],
  "catalog.price_mutation": [], // nobody: prices change only through governance files under review
});

export class AuthzError extends Error {
  constructor(code, detail) { super(`${code}${detail ? `: ${detail}` : ""}`); this.code = code; }
}

const VERIFIED = new WeakSet();

/** Only identity.js may call this. */
export function _markVerified(actor) {
  const frozen = Object.freeze(actor);
  VERIFIED.add(frozen);
  return frozen;
}
export const isVerifiedActor = (a) => Boolean(a) && typeof a === "object" && VERIFIED.has(a);

export function check(actor, capability, { now = new Date() } = {}) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) return { ok: false, code: "INVALID_CLOCK" };
  if (!actor) return { ok: false, code: "ANONYMOUS" };
  if (!isVerifiedActor(actor)) return { ok: false, code: "FORGED_ACTOR" };
  if (actor.businessId !== BUSINESS_ID) return { ok: false, code: "WRONG_BUSINESS" };
  if (actor.sessionExpiresAt && new Date(actor.sessionExpiresAt) <= now) return { ok: false, code: "SESSION_EXPIRED" };
  const allowed = CAPABILITIES[capability];
  if (!allowed) return { ok: false, code: "UNKNOWN_CAPABILITY" };
  const live = (actor.grants ?? []).filter((g) => g.active && !g.revokedAt && (!g.expiresAt || new Date(g.expiresAt) > now) && ROLES.includes(g.role));
  if (!live.length) return { ok: false, code: "NO_ACTIVE_GRANT" };
  if (!live.some((g) => allowed.includes(g.role))) return { ok: false, code: "FORBIDDEN" };
  return { ok: true };
}

/** Throws AuthzError; reports every denial to `audit` (if given). */
export function authorize(actor, capability, { now = new Date(), audit } = {}) {
  const r = check(actor, capability, { now });
  if (!r.ok) {
    audit?.({ type: "authz.denied", actor: isVerifiedActor(actor) ? actor.id : null, capability, code: r.code, at: now.toISOString() });
    throw new AuthzError(r.code, capability);
  }
}
