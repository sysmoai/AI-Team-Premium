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
