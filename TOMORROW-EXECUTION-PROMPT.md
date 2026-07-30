# Tomorrow's Execution Prompt — AI Team Premium
**For:** Claude Code | **Start here:** July 31, 2026

---

```
You are continuing work on the AI Team Premium website at C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium.

Last commit: afa5636 ("Homepage motion: traced brand mark, scroll reveals, interaction states")
Production: www.aiteampremium.com (deployed and verified, bundle in sync)
Ship gate: npm run check && npm run build && npm run verify — all 18/18 pass

CONTEXT: Yesterday we shipped homepage animations (logo trace, scroll reveals, interaction states), fixed a useReveal threshold bug, removed duplicate font imports, and resolved an "80+ tools" claim contradiction. Everything is live.

CRITICAL FINDING: The price-drift audit revealed 19 of 23 tool pages have prices that don't match the catalog (products-catalog.json). Several are UNDERCHARGING — Google AI Pro shows ৳599 when catalog says ৳3,390, losing ৳2,791 per sale. Ideogram shows ৳599 when catalog says ৳2,990.

DO THIS IN ORDER:

1. FIX PRICE DRIFT (P0 — financial impact)
   - Catalog (products-catalog.json / 80 products) is the source of truth
   - Fix each tool page's prices to match the catalog's CHEAPEST tier price
   - Pages that need fixing: AdobeCC, Canva, Copilot, ElevenLabs, Firefly, Freepik, GoogleAIPro, Grammarly, Grok, Ideogram, Kling, Leonardo, Manus, Microsoft365, Midjourney, Notion, Perplexity, Runway, SuperGrok
   - Pages not in catalog that need adding: Gemini, LinkedIn, Poe, Vault
   - Run `npm run audit:prices` after to confirm 0 drifts

2. FIX AllProducts SEO (P1)
   - AllProducts.tsx is the ONLY page missing SEO metadata (57/58 audit pass)
   - Add usePageMeta hook with proper title/description

3. CENTRALIZE PRODUCT DATA (P2 — structural fix)
   - Create client/src/lib/products.ts with all product data
   - Source prices from products-catalog.json
   - Update tool pages, plan pages, and WhatsApp templates to pull from this single source
   - This prevents future drift

4. COMPLETE PRODUCT PAGES (P3)
   - 25 tool pages exist, only ChatGPT has complete structured data
   - Add FAQSchema and JSON-LD to remaining product plan pages
   - Add structured data to tool pages that lack it

5. CATALOG CONSISTENCY (P4)
   - Resolve: catalog has 80 products but only 25 have tool pages
   - Decide: which of the 55 catalog-only products need pages?
   - Fix: 4 tool pages (Gemini, LinkedIn, Poe, Vault) missing from catalog

KEYS:
   - Run `npm run check && npm run build && npm run verify` after every batch
   - Deploy with `npx vercel deploy --prod --yes` (free tier limit: 100/day)
   - GitHub push auto-deploys too: origin = https://github.com/sysmoai/AI-Team-Premium.git
   - Catalog is truth: client/src/data/products-catalog.json
   - Audit scripts: npm run audit, npm run audit:prices
   - Live: npm run verify:live

READ FIRST: GAP-ANALYSIS-2026-07-30-FINAL.md for full details on every gap found.
```
