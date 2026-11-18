// scripts/test-ui-logic.ts — run: npx tsx --test scripts/test-ui-logic.ts
// Exercises the client WhatsApp-link logic that cannot be reached from the node-only
// tests. Covers the latent ProductCard fallback defect: a missing whatsappMsg used to
// fall back to a raw `৳${price}` even for price-on-request records.
import test from "node:test";
import assert from "node:assert/strict";
import { productWhatsappHref, type ProductCardItem } from "../client/src/components/product/ProductCard";

const base: ProductCardItem = {
  id: "synthetic",
  name: "Synthetic Tool",
  brand: "Synthetic",
  category: "ai-assistant",
  price: 350, // internal reference value that must never reach a link
  description: "x",
};
const text = (u: string) => decodeURIComponent(u.split("text=")[1] ?? "");

test("pending record, NO whatsappMsg: no price, no payment ask", () => {
  const t = text(productWhatsappHref({ ...base, priceOnRequest: true, canOrder: false, canQuote: true }));
  assert.ok(!/350|৳|payment/i.test(t), t);
});

test("canOrder false even with a stale payment-flavoured whatsappMsg: still a neutral enquiry", () => {
  const t = text(productWhatsappHref({ ...base, canOrder: false, whatsappMsg: "Hi, I want it (৳350/mo) — please share payment details." }));
  assert.ok(!/350|৳|payment/i.test(t), t);
});

test("canOrder true with a governed price: order wording with that price", () => {
  const t = text(productWhatsappHref({ ...base, price: 1000, canOrder: true, canQuote: true, priceOnRequest: false }));
  assert.match(t, /৳1,000/);
  assert.match(t, /payment/i);
});

test("canOrder true but priceOnRequest (contradiction): no number", () => {
  const t = text(productWhatsappHref({ ...base, price: 1000, canOrder: true, priceOnRequest: true }));
  assert.ok(!/1,?000|৳/.test(t), t);
});
