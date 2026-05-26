# AI Team Premium BD — QA Checklist

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
- [x] WhatsApp links work with prefilled messages (most pages)
- [x] Messenger links work
- [x] All internal navigation links work
- [ ] No broken external links (spot-check only)

## Mobile
- [ ] No horizontal scroll on 360px–390px
- [ ] Navbar works on mobile
- [ ] Cards stack correctly
- [ ] Footer readable
- [ ] CTAs tappable

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
- [x] Footer disclaimer present on all pages (global)
- [x] Refund policy clear
- [x] Privacy policy exists
- [x] Terms of service exists
- [ ] Per-page disclaimers on commercial pages (only Footer has it)

## Performance
- [ ] Lighthouse LCP < 2.5s
- [ ] No render-blocking issues
- [ ] Images optimized
- [x] Bundle size reasonable (manual chunks configured)

## Accessibility
- [ ] Semantic HTML
- [ ] Heading order correct
- [ ] Alt text on images
- [ ] Color contrast adequate
- [ ] Focus states visible
