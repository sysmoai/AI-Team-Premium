// lib/business-os/identity.js — verified sessions + owner-controlled grants.
//
// Contract for production: a session token is issued by the identity layer
// (e.g. Cloudflare Access or a staff login) and signed with SESSION_KEY, a
// Worker secret. Grants live in the `staff_grants` table, which only a holder of
// `grant.manage` (business_owner) can change. Nothing in a request body can
// create an actor: resolveActor() is the only constructor of trusted actors.

import { hmacHex, safeEqual, randomHex } from "./crypto.js";
import { _markVerified, BUSINESS_ID } from "./rbac.js";

const b64u = (s) => btoa(unescape(encodeURIComponent(s))).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const unb64u = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));

export class IdentityError extends Error {
  constructor(code) { super(code); this.code = code; }
}

/** Issue a session token. Production: only the identity layer calls this. */
export async function issueSession(sessionKey, { subject, businessId = BUSINESS_ID, ttlSeconds = 3600, now = new Date() }) {
  if (typeof subject !== "string" || !/^[A-Za-z0-9._@-]{3,80}$/.test(subject)) throw new IdentityError("BAD_SUBJECT");
  const payload = { sub: subject, biz: businessId, exp: Math.floor(now.getTime() / 1000) + ttlSeconds, jti: randomHex(8) };
  const body = b64u(JSON.stringify(payload));
  return `v1.${body}.${await hmacHex(sessionKey, `v1.${body}`)}`;
}

/**
 * @param {string} token
 * @param {{ sessionKey: Uint8Array, grants: (subject:string) => Promise<object[]>, now?: Date }} deps
 */
export async function resolveActor(token, { sessionKey, grants, now = new Date() }) {
  if (typeof token !== "string") throw new IdentityError("NO_SESSION");
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") throw new IdentityError("MALFORMED_SESSION");
  const expect = await hmacHex(sessionKey, `v1.${parts[1]}`);
  if (!safeEqual(expect, parts[2])) throw new IdentityError("BAD_SESSION_SIGNATURE");
  let p;
  try { p = JSON.parse(unb64u(parts[1])); } catch { throw new IdentityError("MALFORMED_SESSION"); }
  if (p.biz !== BUSINESS_ID) throw new IdentityError("WRONG_BUSINESS");
  if (!(typeof p.exp === "number" && p.exp * 1000 > now.getTime())) throw new IdentityError("SESSION_EXPIRED");
  const rows = (await grants(p.sub)) ?? [];
  const own = rows.filter((g) => g.businessId === BUSINESS_ID && g.subject === p.sub);
  return _markVerified({
    id: p.sub,
    businessId: p.biz,
    sessionExpiresAt: new Date(p.exp * 1000).toISOString(),
    grants: own.map((g) => Object.freeze({ role: g.role, active: g.active === true || g.active === 1, revokedAt: g.revokedAt ?? null, expiresAt: g.expiresAt ?? null })),
  });
}
