# Analytics Setup Guide — AI Team Premium

> **Owner configuration task.** Missing analytics IDs do NOT break the site. All tracking fails silently when IDs are absent.

---

## Supported Platforms

| Platform | Env Var | What It Tracks |
|----------|---------|---------------|
| Google Analytics 4 | `VITE_GA_MEASUREMENT_ID` | Page views, events, conversions |
| Google Tag Manager | `VITE_GTM_ID` | Tag deployment, triggers |
| Meta (Facebook) Pixel | `VITE_META_PIXEL_ID` | Ad attribution, audiences |
| TikTok Pixel | `VITE_TIKTOK_PIXEL_ID` | TikTok ad conversions |
| Microsoft Clarity | `VITE_MICROSOFT_CLARITY_ID` | Heatmaps, session recordings |

---

## Where to Add Env Vars

### Local Development
Create or edit `client/.env.local`:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXX
VITE_META_PIXEL_ID=XXXXXXXXXX
VITE_TIKTOK_PIXEL_ID=XXXXXXXXXX
VITE_MICROSOFT_CLARITY_ID=XXXXXXXXXX
```

> **Never commit `.env.local` to git.** It is already in `.gitignore`.

### Production (Cloud Run)

Add env vars to the Cloud Run service:

```bash
gcloud run services update ai-team-premium-bd \
  --set-env-vars "VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX" \
  --set-env-vars "VITE_GTM_ID=GTM-XXXXXX" \
  --set-env-vars "VITE_META_PIXEL_ID=XXXXXXXXXX" \
  --set-env-vars "VITE_TIKTOK_PIXEL_ID=XXXXXXXXXX" \
  --set-env-vars "VITE_MICROSOFT_CLARITY_ID=XXXXXXXXXX" \
  --region us-central1 \
  --project sysmoai-hq-prod
```

**Important:** Vite embeds env vars at **build time**, not runtime. After setting env vars, you must **rebuild and redeploy**:

```bash
npm run build
gcloud run deploy ai-team-premium-bd \
  --source . \
  --region us-central1 \
  --project sysmoai-hq-prod
```

---

## How to Test

### 1. Verify Scripts Load

Open DevTools → Network tab → filter by `googletagmanager`, `facebook`, `tiktok`, `clarity`. Click a WhatsApp CTA. You should see:

- `gtag` calls to `google-analytics.com` (GA4)
- `dataLayer` pushes (GTM)
- `fbq` calls (Meta Pixel)
- `ttq.track` calls (TikTok)
- `clarity` calls (Clarity)

### 2. Verify Events Fire

Open DevTools → Console and run:

```javascript
// Should log events when CTAs are clicked
gtag && console.log("GA4 ready");
fbq && console.log("Meta Pixel ready");
ttq && console.log("TikTok ready");
clarity && console.log("Clarity ready");
```

### 3. Verify No Console Errors

With IDs missing, the site should show **zero errors**. With IDs present, tracking should work without blocking navigation.

---

## Tracked Events

All WhatsApp and Messenger CTAs across the site now fire tracking events:

| Event Name | Fired When | Payload |
|-----------|-----------|---------|
| `whatsapp_cta_click` | Any WhatsApp link clicked | `product`, `plan`, `price`, `source` |
| `messenger_cta_click` | Any Messenger link clicked | `product`, `source` |
| `plan_cta_click` | Plan card CTA clicked | `product`, `plan`, `price`, `source` |
| `tool_cta_click` | Tool page CTA clicked | `product`, `plan`, `price`, `source` |
| `service_cta_click` | Service CTA clicked | `product`, `source` |
| `compare_cta_click` | Compare page CTA clicked | `product`, `source` |
| `contact_cta_click` | Contact form CTA clicked | `source` |
| `footer_cta_click` | Footer CTA clicked | `product`, `source` |
| `hero_cta_click` | Hero CTA clicked | `product`, `source` |
| `page_view` | Reserved for future router integration | — |

**Source values** identify the page/section: `home-hero`, `pricing-card`, `tool-plan`, `navbar-desktop`, `floating`, `sticky-mobile`, etc.

---

## Files Instrumented

- `client/src/lib/analytics.ts` — Core tracking functions
- `client/src/components/AnalyticsProvider.tsx` — Script injection
- `client/src/components/layout/Footer.tsx`
- `client/src/components/layout/Navbar.tsx`
- `client/src/components/ui/FloatingWhatsApp.tsx`
- `client/src/components/StickyMobileCTA.tsx`
- `client/src/components/SupportUpsell.tsx`
- `client/src/components/ToolPlansPage.tsx`
- `client/src/components/ToolDetail.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/Pricing.tsx`
- `client/src/pages/ChatGPTPlans.tsx`
- `client/src/pages/AISubscriptions.tsx`
- `client/src/pages/AIToolsVault.tsx`
- `client/src/pages/Services.tsx`
- `client/src/pages/Contact.tsx`
- `client/src/pages/Compare.tsx`
- `client/src/pages/About.tsx`
- `client/src/pages/chatgpt/PlanDetail.tsx`
- `client/src/pages/tools/ChatGPT.tsx`
- `client/src/pages/services/ServiceComingSoon.tsx`

---

## Safety Guarantees

1. **No crash without IDs** — `AnalyticsProvider` checks each ID before injecting scripts.
2. **No crash if scripts fail** — `trackEvent` is wrapped in `try/catch`.
3. **No fake IDs** — No hardcoded IDs in source.
4. **No secrets exposed** — Only measurement IDs (public) are used; no API keys.
5. **No performance impact** — Scripts load async; tracking is non-blocking.
