# AITPBD — AI Team Premium BD Website

## Overview
A comprehensive website for AI Team Premium BD (AITPBD), Bangladesh's premium AI subscription provider. Sells ChatGPT Plus/Pro/Business, Claude, Gemini, Grammarly, Canva, Midjourney and more — payable via bKash/Nagad. Also offers premium human AI support (Google Meet sessions). Revenue target: $15,000/month.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL (Drizzle ORM)
- **Routing**: wouter
- **Data Fetching**: @tanstack/react-query

## Brand System (Figma-sourced)
- **Primary Blue**: `#2563EB` (HSL 217 91% 53%)
- **Deep Navy**: `#0F172A` (HSL 222 47% 11%)
- **Light Sky**: `#EFF6FF` (HSL 214 100% 97%)
- **Font**: Inter (300-700 weights) + Hind Siliguri (Bangla text)
- **Logo**: "Neural Nexus" SVG orbit icon + wordmark ("**AI** Team **Premium** BD")
- **Logo components**: `client/src/components/brand/LogoIcons.tsx`
  - `IconOrbit` — standalone orbit SVG
  - `LogoStacked` — vertical logo (sizes: sm/md/lg/xl)
  - `LogoHorizontal` — horizontal logo
  - `WhatsAppIcon` — WhatsApp SVG icon
  - `BRAND` — color constants object

## All Pages
| Path | Page | File |
|------|------|------|
| `/` | Home | `client/src/pages/Home.tsx` |
| `/chatgpt-plans` | ChatGPT Plans Hub | `client/src/pages/ChatGPTPlans.tsx` |
| `/chatgpt/plus-shared` | Plus Shared detail | `client/src/pages/chatgpt/PlusShared.tsx` |
| `/chatgpt/plus-premium-shared` | Plus Premium Shared detail | `client/src/pages/chatgpt/PlusPremiumShared.tsx` |
| `/chatgpt/plus-personal-seat` | Plus Personal Seat detail | `client/src/pages/chatgpt/PlusPersonalSeat.tsx` |
| `/chatgpt/business-shared` | Business Shared detail | `client/src/pages/chatgpt/BusinessShared.tsx` |
| `/chatgpt/business-premium-shared` | Business Premium Shared detail | `client/src/pages/chatgpt/BusinessPremiumShared.tsx` |
| `/chatgpt/business-personal-like` | Business Personal-like detail | `client/src/pages/chatgpt/BusinessPersonalLike.tsx` |
| `/chatgpt/pro-premium-shared` | Pro Premium Shared detail | `client/src/pages/chatgpt/ProPremiumShared.tsx` |
| `/support` | Support/Services Hub | `client/src/pages/Services.tsx` |
| `/services` | Support/Services Hub (alias) | `client/src/pages/Services.tsx` |
| `/ai-subscriptions` | All AI Tools catalog | `client/src/pages/AISubscriptions.tsx` |
| `/pricing` | Pricing overview | `client/src/pages/Pricing.tsx` |
| `/about` | About AITPBD | `client/src/pages/About.tsx` |
| `/start-a-project` | Contact form | `client/src/pages/Contact.tsx` |
| `/refund-policy` | Refund Policy | `client/src/pages/legal/RefundPolicy.tsx` |
| `/privacy-policy` | Privacy Policy | `client/src/pages/legal/PrivacyPolicy.tsx` |
| `/terms` | Terms of Service | `client/src/pages/legal/TermsOfService.tsx` |
| `/tools/chatgpt` | ChatGPT all plans | `client/src/pages/tools/ChatGPT.tsx` |
| `/tools/claude` | Claude Pro | `client/src/pages/tools/Claude.tsx` |
| `/tools/gemini` | Gemini Advanced | `client/src/pages/tools/Gemini.tsx` |
| `/tools/grammarly` | Grammarly Premium | `client/src/pages/tools/Grammarly.tsx` |
| `/tools/canva` | Canva Pro | `client/src/pages/tools/Canva.tsx` |
| `/tools/midjourney` | Midjourney | `client/src/pages/tools/Midjourney.tsx` |
| `/tools/perplexity` | Perplexity Pro | `client/src/pages/tools/Perplexity.tsx` |
| `/tools/grok` | Grok Premium | `client/src/pages/tools/Grok.tsx` |
| `/tools/copilot` | GitHub Copilot | `client/src/pages/tools/Copilot.tsx` |
| `/tools/vault` | AI Tools Vault bundle | `client/src/pages/tools/Vault.tsx` |

## Key Components
- `Layout` — Navbar + main + Footer + FloatingWhatsApp + StickyMobileCTA + OrganizationSchema
- `Navbar` — sticky header with "ChatGPT Plans", "Support", "Pricing", "About" nav links
- `Footer` — dark navy footer with ChatGPT Plans, Support, Refund Policy links
- `FloatingWhatsApp` — fixed bottom-right WhatsApp CTA with pulse animation
- `StickyMobileCTA` — fixed bottom WhatsApp bar on mobile only
- `SupportUpsell` — compact upsell block for AI training support (on multiple pages)
- `OrganizationSchema` — JSON-LD Organization schema (on every page via Layout)
- `ToolDetail` — shared component for individual tool detail pages
- `PlanDetail` — reusable ChatGPT plan detail page component

## Data Library
- `client/src/lib/plans.ts` — 7 ChatGPT plans (canonical data model)
- `client/src/lib/support-offers.ts` — 7 support packages + 3 memberships
- `client/src/lib/config.ts` — brand config + WhatsApp plan templates + support templates

## ChatGPT Plans (from lib/plans.ts)
| Slug | Price | Seats | Delivery |
|------|-------|-------|----------|
| plus-shared | ৳399/mo | 8 shared | 5-15 min |
| plus-premium-shared | ৳950/mo | 2-3 shared | 5-15 min |
| plus-personal-seat | ৳2,950/mo | 1 (your own) | 5-15 min |
| business-shared | ৳699/mo | 7 workspace | 12 hrs |
| business-premium-shared | ৳1,299/mo | 2-3 workspace | 12 hrs |
| business-personal-like | ৳3,899/mo | 1 workspace | 12 hrs |
| pro-premium-shared | ৳4,500/mo | 5-6 shared | 5-15 min |

## Support Packages (from lib/support-offers.ts)
- Hourly: ৳799/hr (everyone)
- Student Smart: ৳1,999 (1 session, 75 min)
- Student Pro: ৳3,999 (2 sessions)
- Freelancer Fast: ৳4,999 (2 sessions)
- Freelancer Agency: ৳9,999 (4 sessions)
- Business AI Setup: ৳12,999 (3 sessions)
- 360 AI Solution: ৳24,999+ (custom)
- Memberships: Starter ৳2,999, Pro ৳5,999, Team ৳14,999/mo

## SEO Features
- Organization JSON-LD schema on every page
- FAQ JSON-LD schema on /chatgpt-plans and /support
- Unique meta title + description per page via use-page-meta.ts hook
- Sitemap.xml at client/public/sitemap.xml (all 26 routes)
- Bangla font (Hind Siliguri) for proper Bangla text rendering

## Contact Info
- WhatsApp: `wa.me/8801533262758`
- Phone: `+880 1533-262758`
- Facebook: `https://www.facebook.com/profile.php?id=61586742067282`
- Instagram: `@ai_team_premium_bd`
- FB Group: `facebook.com/groups/333019393218410`

## Database
- `contacts` table: id (serial PK), name, whatsapp, service (optional), needs, createdAt
- Schema: `shared/schema.ts` — includes Zod validation (min lengths, phone regex)
- Storage: `server/storage.ts`

## Hooks
- `use-page-meta.ts` — sets document.title, meta description, og:title, og:description, twitter:title, twitter:description per page

## UI Conventions
- **Navbar logo**: `LogoHorizontal size="sm"` (compact, 28px icon + text side-by-side)
- **Footer logo**: `LogoHorizontal size="md"` (slightly larger, white colors on dark bg)
- **Hero logo** (Home page only): `LogoStacked size="xl"` (the large animated display logo)
- **Dropdown hover**: `hover:bg-blue-50` on each dropdown item link
- **Footer grid**: `grid-cols-2 md:grid-cols-12` — brand col-span-4, each link col col-span-2
- **Hero image**: `loading="eager" fetchpriority="high"` for LCP performance
- **Sticky CTA**: `StickyMobileCTABar` (default export) — single export, md:hidden

## SEO & Meta (index.html)
- Full Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card (summary_large_image)
- Canonical URL: https://aiteampremiumbd.com
- theme-color: #0F172A
- apple-touch-icon
- Preconnect to Google Fonts (Inter + Hind Siliguri)

## Key Rules (Business Logic)
- bKash/Nagad payment numbers shared ONLY via WhatsApp (never public)
- Shared plans: 1 device only, no password access, no recovery email
- Warranty void on misuse/ban/password change/multi-device
- Support session refundable only within 15 min of start if we cannot help
- Subscription fees never refundable; replacement guaranteed within 24h
