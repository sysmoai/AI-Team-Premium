# AI Team Premium BD — QA Checklist

## Build & Type Safety
- [x] `npm run check` passes with 0 errors
- [x] `npm run build` passes successfully
- [x] Production start works (`npm run start`)

## Core Routes
- [ ] / — Home loads, no console errors
- [ ] /chatgpt-plans — ChatGPT plans hub
- [ ] /chatgpt/plus-shared — Plan detail
- [ ] /chatgpt/plus-premium-shared — Plan detail
- [ ] /chatgpt/plus-personal-seat — Plan detail
- [ ] /chatgpt/business-shared — Plan detail
- [ ] /chatgpt/business-premium-shared — Plan detail
- [ ] /chatgpt/business-personal-like — Plan detail
- [ ] /chatgpt/pro-premium-shared — Plan detail
- [ ] /claude-plans — Claude plans
- [ ] /gemini-plans — Gemini plans
- [ ] /grammarly-plans — Grammarly plans
- [ ] /canva-plans — Canva plans
- [ ] /perplexity-plans — Perplexity plans
- [ ] /grok-plans — Grok plans
- [ ] /ai-tools-vault — Bundle page
- [ ] /ai-subscriptions — Catalog
- [ ] /pricing — Pricing page
- [ ] /services — Services hub
- [ ] /support — Services hub (alias)
- [ ] /services/ai-ops-sprint — Service detail
- [ ] /services/brand-design — Service detail
- [ ] /services/web-development — Service detail
- [ ] /services/digital-marketing — Service detail
- [ ] /services/app-development — Service detail
- [ ] /about — About page
- [ ] /start-a-project — Contact page
- [ ] /refund-policy — Refund policy
- [ ] /privacy-policy — Privacy policy
- [ ] /terms — Terms of service
- [ ] /tools/chatgpt — Tool detail
- [ ] /tools/claude — Tool detail
- [ ] /tools/gemini — Tool detail
- [ ] /tools/grammarly — Tool detail
- [ ] /tools/canva — Tool detail
- [ ] /tools/midjourney — Tool detail
- [ ] /tools/perplexity — Tool detail
- [ ] /tools/grok — Tool detail
- [ ] /tools/copilot — Tool detail
- [ ] /tools/vault — Tool detail
- [ ] /tools/notion — Tool detail
- [ ] /tools/microsoft365 — Tool detail
- [ ] /tools/linkedin — Tool detail
- [ ] /tools/elevenlabs — Tool detail
- [ ] /tools/supergrok — Tool detail
- [ ] /tools/google-ai-pro — Tool detail
- [ ] /tools/leonardo — Tool detail
- [ ] /tools/runway — Tool detail
- [ ] /tools/kling — Tool detail
- [ ] /compare — Compare hub
- [ ] /compare/:slug — Compare detail
- [ ] /admin/audit — Audit dashboard

## CTAs & Links
- [ ] WhatsApp links work with prefilled messages
- [ ] Messenger links work
- [ ] All internal navigation links work
- [ ] No broken external links

## Mobile
- [ ] No horizontal scroll on 360px–390px
- [ ] Navbar works on mobile
- [ ] Cards stack correctly
- [ ] Footer readable
- [ ] CTAs tappable

## SEO
- [ ] robots.txt valid
- [ ] sitemap.xml valid
- [ ] Page titles unique per page
- [ ] Meta descriptions present
- [ ] Canonical URLs correct
- [ ] Open Graph tags present
- [ ] JSON-LD structured data present

## Legal & Trust
- [ ] No false official partnership claims
- [ ] Disclaimer present where needed
- [ ] Refund policy clear
- [ ] Privacy policy exists
- [ ] Terms of service exists

## Performance
- [ ] Lighthouse LCP < 2.5s
- [ ] No render-blocking issues
- [ ] Images optimized
- [ ] Bundle size reasonable

## Accessibility
- [ ] Semantic HTML
- [ ] Heading order correct
- [ ] Alt text on images
- [ ] Color contrast adequate
- [ ] Focus states visible
