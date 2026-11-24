// lib/business-os/crypto.js — WebCrypto only (works in Node >= 20 and in the
// Cloudflare Workers runtime without `nodejs_compat`). No node:* imports.

const subtle = globalThis.crypto.subtle;
const enc = new TextEncoder();

export const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
export const fromHex = (hex) => Uint8Array.from(hex.match(/../g) ?? [], (h) => parseInt(h, 16));

export function randomHex(bytes = 16) {
  const a = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(a);
  return toHex(a);
}

export async function sha256Hex(text) {
  return toHex(await subtle.digest("SHA-256", enc.encode(String(text))));
}

const hmacKeys = new WeakMap();
async function importHmac(keyBytes) {
  let k = hmacKeys.get(keyBytes);
  if (!k) {
    k = await subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    hmacKeys.set(keyBytes, k);
  }
  return k;
}

export async function hmacHex(keyBytes, text) {
  if (!(keyBytes instanceof Uint8Array) || keyBytes.length < 32) throw new Error("HMAC_KEY_TOO_SHORT");
  return toHex(await subtle.sign("HMAC", await importHmac(keyBytes), enc.encode(String(text))));
}

/** Constant-time comparison of two hex/ASCII strings. */
export function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export function newKey() {
  const a = new Uint8Array(32);
  globalThis.crypto.getRandomValues(a);
  return a;
}

/** Deterministic JSON (sorted keys) so signatures do not depend on key order. */
export function canonicalJson(v) {
  if (Array.isArray(v)) return `[${v.map(canonicalJson).join(",")}]`;
  if (v && typeof v === "object") return `{${Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => `${JSON.stringify(k)}:${canonicalJson(v[k])}`).join(",")}}`;
  return JSON.stringify(v);
}

// ------------------------------------------------------------- AES-256-GCM
// Used for customer-bound outbox payloads, so a database reader never sees the
// one-time links. `aad` binds the ciphertext to one message.
async function importAes(keyBytes) {
  if (!(keyBytes instanceof Uint8Array) || keyBytes.length !== 32) throw new Error("SEAL_KEY_MUST_BE_32_BYTES");
  return subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
export async function sealJson(keyBytes, value, aad) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const ct = await subtle.encrypt({ name: "AES-GCM", iv, additionalData: enc.encode(aad) }, await importAes(keyBytes), enc.encode(canonicalJson(value)));
  return `${toHex(iv)}.${toHex(ct)}`;
}
export async function openJson(keyBytes, sealed, aad) {
  const [iv, ct] = String(sealed).split(".");
  const pt = await subtle.decrypt({ name: "AES-GCM", iv: fromHex(iv ?? ""), additionalData: enc.encode(aad) }, await importAes(keyBytes), fromHex(ct ?? ""));
  return JSON.parse(new TextDecoder().decode(pt));
}

// ---------------------------------------------------------------- Ed25519
// Used for trusted statement sources: the importer holds the PRIVATE key
// outside the ops system; the ops database stores only the public key.
export async function ed25519Generate() {
  return subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
}
export async function exportPublicJwk(key) {
  return subtle.exportKey("jwk", key);
}
export async function ed25519Sign(privateKey, text) {
  return toHex(await subtle.sign({ name: "Ed25519" }, privateKey, enc.encode(text)));
}
export async function ed25519Verify(publicJwk, text, sigHex) {
  try {
    const key = await subtle.importKey("jwk", publicJwk, { name: "Ed25519" }, false, ["verify"]);
    return await subtle.verify({ name: "Ed25519" }, key, fromHex(sigHex), enc.encode(text));
  } catch {
    return false;
  }
}
