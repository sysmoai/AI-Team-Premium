// Prices for bundles that are sold as their own page rather than as a catalog
// entry, so PRICE_ANCHORS (generated from products-catalog.json) cannot cover
// them.
//
// The AI Tools Vault is one product page, but its price was typed separately
// into route metadata, the page hero, the comparison table, two WhatsApp order
// links and several FAQ answers. They currently agree — the point of moving it
// here is that the next reprice only has to be right once. `npm run verify`
// fails if the page and this file disagree.
//
// Not a catalog entry: the Vault bundles three shared seats that are each sold
// separately, so it has no single officialUSD to derive a price from.
// QUARANTINED 2026-08-02 — the Vault is not publicly purchasable at a fixed
// price until its access model is evidenced.
//
// The Vault bundles shared access to ChatGPT Plus, Claude Pro and Gemini
// Advanced. All three are identity-bound individual products, and the three
// underlying shared catalog records are themselves quarantined pending a
// provider-terms review (docs/audit/AITP_SHARED_ACCESS_AUDIT.md). Continuing to
// sell the bundle at a fixed price while its components are under review would
// be selling the same unevidenced access with a different label on it.
//
// This page is not a catalog entry, so data/commercial-governance.json does not
// reach it — the flag has to live here, next to the price it governs.
//
// Reversing this is one line: set quarantined back to false once an access model
// and a management price approval exist. The price is retained rather than
// deleted so the decision is auditable.
export const VAULT_QUARANTINE = {
  quarantined: true,
  since: "2026-08-02",
  reason:
    "Access model unevidenced. The three underlying shared records are quarantined pending provider-terms review.",
  publicLabel: "Request current price",
  // Claims that shipped alongside the price and are not currently evidenced.
  // They are listed here so removing them is a recorded decision, not an edit
  // someone has to notice in a diff.
  withdrawnClaims: ["6-hour delivery", "30-day replacement warranty", "24-hour replacement"],
};

export const BUNDLE_PRICES = {
  vault: 1990,

  // The Vault page argues its value by adding up what the three tools cost
  // bought separately. That total has to be the sum of real catalog prices, or
  // the comparison overstates the saving — which is the one number on that page
  // a customer is most likely to check.
  //
  // Personal seats, from products-catalog.json:
  //   ChatGPT Plus — Personal              2990
  //   Claude Pro — Personal                2990
  //   Google AI Pro (Gemini Advanced)      3390
  vaultDerivedTotals: [2990 + 2990 + 3390],
};
