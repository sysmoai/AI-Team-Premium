// lib/business-os/rbac.js — AI Team Premium Business OS: identity and authorisation.
//
// Role labels are PROPOSALS for the owner to assign; nothing here grants access
// to anyone. Every check is deterministic and fail-closed:
//   - the actor must be a known, active, unexpired, unrevoked grant
//   - the grant must belong to business U05 (AI Team Premium) — never another unit
//   - the role must hold the capability
// Owner identity is never hard-coded: an "owner" is whoever holds an active
// business_owner grant in the grant store the owner controls.

export const BUSINESS_ID = "U05";

export const ROLES = Object.freeze([
  "business_owner",
  "strategic_admin",
  "operations_manager",
  "sales_support",
  "content_editor",
  "finance_reviewer",
  "fulfillment_operator",
  "auditor",
]);

// Capability -> roles. Consequential capabilities are deliberately narrow.
export const CAPABILITIES = Object.freeze({
  "lead.read": ["business_owner", "operations_manager", "sales_support"],
  "lead.write": ["business_owner", "operations_manager", "sales_support"],
  "lead.export": ["business_owner"],
  "quote.prepare": ["business_owner", "operations_manager", "sales_support"],
  "order.read": ["business_owner", "operations_manager", "sales_support", "fulfillment_operator", "finance_reviewer", "auditor"],
  "order.cancel": ["business_owner", "operations_manager"],
  "payment.record_customer_report": ["business_owner", "operations_manager", "sales_support"],
  "payment.verify": ["business_owner", "finance_reviewer"],
  "fulfillment.claim": ["business_owner", "operations_manager", "fulfillment_operator"],
  "fulfillment.complete": ["business_owner", "operations_manager", "fulfillment_operator"],
  "refund.review": ["business_owner", "finance_reviewer"],
  "refund.approve": ["business_owner"],
  "support.handle": ["business_owner", "operations_manager", "sales_support"],
  "renewal.remind": ["business_owner", "operations_manager", "sales_support"],
  "finance.read": ["business_owner", "finance_reviewer", "auditor"],
  "finance.record": ["business_owner", "finance_reviewer"],
  "catalog.price_mutation": [], // nobody through the OS: prices come only from governance files under code review
  "audit.read": ["business_owner", "auditor"],
});

export class AuthzError extends Error {
  constructor(code, detail) {
    super(`${code}${detail ? `: ${detail}` : ""}`);
    this.code = code;
  }
}

const isDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

/**
 * @param {{id:string,businessId:string,role:string,active:boolean,expiresAt?:string,revokedAt?:string}|undefined} actor
 * @param {string} capability
 * @param {{now?: Date, businessId?: string}} [opts]
 * @returns {{ok:true}|{ok:false,code:string}}
 */
export function check(actor, capability, opts = {}) {
  const now = opts.now ?? new Date();
  if (!isDate(now)) return { ok: false, code: "INVALID_CLOCK" };
  if (!actor || typeof actor.id !== "string" || !actor.id) return { ok: false, code: "ANONYMOUS" };
  if (actor.businessId !== (opts.businessId ?? BUSINESS_ID)) return { ok: false, code: "WRONG_BUSINESS" };
  if (!ROLES.includes(actor.role)) return { ok: false, code: "UNKNOWN_ROLE" };
  if (actor.active !== true) return { ok: false, code: "INACTIVE_GRANT" };
  if (actor.revokedAt) return { ok: false, code: "REVOKED_GRANT" };
  if (actor.expiresAt) {
    const exp = new Date(actor.expiresAt);
    if (!isDate(exp) || exp <= now) return { ok: false, code: "EXPIRED_GRANT" };
  }
  const roles = CAPABILITIES[capability];
  if (!roles) return { ok: false, code: "UNKNOWN_CAPABILITY" };
  if (!roles.includes(actor.role)) return { ok: false, code: "FORBIDDEN" };
  return { ok: true };
}

/** Throws AuthzError and writes a denial to the audit sink (if given). */
export function authorize(actor, capability, opts = {}) {
  const r = check(actor, capability, opts);
  if (!r.ok) {
    opts.audit?.({ type: "authz.denied", actor: actor?.id ?? null, capability, code: r.code, at: (opts.now ?? new Date()).toISOString?.() ?? null });
    throw new AuthzError(r.code, capability);
  }
  return true;
}
