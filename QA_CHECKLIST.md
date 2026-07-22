# AI Team Premium — QA Checklist

## Build & Type Safety
- [x] `npm run check` passes with 0 errors
- [x] `npm run build` passes successfully
- [x] Production start works (`npm run start`)

## Core Routes
- [x] / — Home loads, no console errors
- [x] /chatgpt-plans — ChatGPT plans hub
- [x] /chatgpt/plus-shared — Plan detail
- [x] /chatgpt/plus-premium-shared — Plan detail
- [x] /chatgpt/plus-personal-seat — Plan detail
- [x] /chatgpt/business-shared — Plan detail
- [x] /chatgpt/business-premium-shared — Plan detail
- [x] /chatgpt/business-personal-like — Plan detail
- [x] /chatgpt/pro-premium-shared — Plan detail
- [x] /claude-plans — Claude plans
- [x] /gemini-plans — Gemini plans
- [x] /grammarly-plans — Grammarly plans
- [x] /canva-plans — Canva plans
- [x] /perplexity-plans — Perplexity plans
- [x] /grok-plans — Grok plans
- [x] /ai-tools-vault — Bundle page
- [x] /ai-subscriptions — Catalog
- [x] /pricing — Pricing page
- [x] /services — Services hub
- [x] /support — Services hub (alias)
- [x] /services/ai-ops-sprint — Service detail
- [x] /services/brand-design — Service detail
- [x] /services/web-development — Service detail
- [x] /services/digital-marketing — Service detail
- [x] /services/app-development — Service detail
- [x] /about — About page
- [x] /start-a-project — Contact page
- [x] /refund-policy — Refund policy
- [x] /privacy-policy — Privacy policy
- [x] /terms — Terms of service
- [x] /tools/chatgpt — Tool detail
- [x] /tools/claude — Tool detail
- [x] /tools/gemini — Tool detail
- [x] /tools/grammarly — Tool detail
- [x] /tools/canva — Tool detail
- [x] /tools/midjourney — Tool detail
- [x] /tools/perplexity — Tool detail
- [x] /tools/grok — Tool detail
- [x] /tools/copilot — Tool detail
- [x] /tools/vault — Tool detail
- [x] /tools/notion — Tool detail
- [x] /tools/microsoft365 — Tool detail
- [x] /tools/linkedin — Tool detail
- [x] /tools/elevenlabs — Tool detail
- [x] /tools/supergrok — Tool detail
- [x] /tools/google-ai-pro — Tool detail
- [x] /tools/leonardo — Tool detail
- [x] /tools/runway — Tool detail
- [x] /tools/kling — Tool detail
- [x] /compare — Compare hub
- [x] /compare/:slug — Compare detail
- [x] /admin/audit — Audit dashboard

## CTAs & Links
- [x] WhatsApp links work with prefilled messages (all CTAs)
- [x] Messenger links work
- [x] All internal navigation links work
- [ ] No broken external links (spot-check only)

## Mobile
- [ ] No horizontal scroll on 360px–390px (requires browser verification)
- [ ] Navbar works on mobile (requires browser verification)
- [ ] Cards stack correctly (requires browser verification)
- [ ] Footer readable (requires browser verification)
- [ ] CTAs tappable (requires browser verification)

## SEO
- [x] robots.txt valid
- [x] sitemap.xml valid
- [x] Page titles unique per page
- [x] Meta descriptions present
- [x] Canonical URLs correct
- [x] Open Graph tags present
- [x] JSON-LD structured data present
- [x] apple-touch-icon.png exists
- [x] manifest.json exists

## Legal & Trust
- [x] No false official partnership claims ("official reseller" / "authorized distributor" removed)
- [x] Misleading "official" language softened to "genuine"/"legitimate" on product pages
- [x] "#1" ranking claims removed from meta descriptions
- [x] "instant delivery" softened to "fast delivery"
- [x] "unlimited usage" removed from ChatGPT Pro
- [x] Superlative claims softened ("leading provider", "best AI experience")
- [x] Footer disclaimer present on all pages (global)
- [x] Refund policy clear
- [x] Privacy policy exists
- [x] Terms of service exists
- [x] No fake review ratings
- [x] Pricing consistent across pages

## Performance
- [ ] Lighthouse LCP < 2.5s (requires browser)
- [ ] No render-blocking issues (requires browser)
- [ ] Images optimized (requires browser)
- [x] Bundle size reasonable (manual chunks configured, 242KB gzipped)

## Accessibility
- [ ] Semantic HTML (requires manual review)
- [ ] Heading order correct (requires manual review)
- [ ] Alt text on images (requires manual review)
- [ ] Color contrast adequate (requires manual review)
- [ ] Focus states visible (requires manual review)
