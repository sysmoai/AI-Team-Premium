// lib/route-meta.js — THE source of truth for route metadata.
//
// Imported by both api/index.js (production, on Vercel) and server/seo.ts (local
// production preview), so the two cannot disagree about a page's title,
// description or canonical. Add a page here when you add it to App.tsx —
// `npm run verify` fails if you forget.
//
// Plain ESM, and it lives outside api/ on purpose: Vercel turns every file in
// api/ into its own serverless function.

import { PRODUCT_ROUTE_META, TOOL_COUNT, PRODUCT_COUNT, PRICE_ANCHORS } from "./product-routes.js";
import { COMPARE_ROUTE_META } from "./compare-routes.js";
import { BLOG_ROUTE_META, BLOG_CATEGORY_ROUTE_META } from "./blog-routes.js";
import { CATEGORY_ROUTE_META } from "./category-routes.js";
import { BUNDLE_PRICES } from "../shared/bundle-prices.js";
import { CANONICAL_MAP } from "../shared/canonical-map.js";

export const SITE_URL = "https://www.aiteampremium.com";

// Interpolated into the catalog-wide copy below. These were hardcoded as "80",
// which was already wrong the moment the catalog grew — a stale count in a
// title is a claim we can't stand behind, so it is derived instead.
const CATALOG_COPY = {
  tools: TOOL_COUNT,
  products: PRODUCT_COUNT,
};

// Prices quoted in the hand-written entries below. Same reasoning as the counts:
// these were typed in and had all drifted away from the catalog — the homepage
// advertised "from ৳349" against a ৳190 floor, and /chatgpt-plans quoted ৳499
// and ৳999 for tiers that sell at ৳350 and ৳950. A wrong price in a <title> is
// what a customer reads before they ever reach the page.
const bdt = (n) => `৳${n.toLocaleString("en-US")}`;
const P = PRICE_ANCHORS;

export const ROUTE_META = {
  // Catalog-driven product pages served by /tools/:slug. Generated from
  // products-catalog.json so each one carries its own title and canonical —
  // run `npm run gen:routes` after editing the catalog. Spread first so a
  // hand-written entry below always wins on a slug collision.
  ...PRODUCT_ROUTE_META,
  // Comparison pages, likewise generated so each pair ships its own title
  // instead of sharing the generic /compare/ prefix record.
  ...COMPARE_ROUTE_META,
  // Blog posts, generated from blog-posts.ts so a new post can't ship without
  // its own title — previously 14 hand-written entries below "/blog" that
  // happened to stay in sync by discipline rather than by anything enforcing it.
  ...BLOG_ROUTE_META,
  // Blog category hubs — generated alongside the posts so a new category cannot
  // ship without its own title/canonical.
  ...BLOG_CATEGORY_ROUTE_META,
  // Category landing pages. The nav used to link these as
  // /all-products?category=<slug>, which is one indexable URL for twelve real
  // categories — so none of them could rank for their own demand.
  ...CATEGORY_ROUTE_META,
  "/": { title: `Buy ChatGPT Plus in Bangladesh — from ${bdt(P.catalogMin)}/mo with bKash & Nagad | AI Team Premium`, description: `Buy ChatGPT Plus, Claude Pro, Gemini Advanced and ${CATALOG_COPY.tools} premium AI tools in Bangladesh. Pay via bKash or Nagad — no international credit card needed. 5-30 min delivery, Bangla WhatsApp support.`, canonical: "https://www.aiteampremium.com/" },
  "/all-products": { title: `All Premium AI Products — Complete Catalog (${CATALOG_COPY.tools} AI Tools) | AI Team Premium`, description: `Complete catalog of ${CATALOG_COPY.tools} premium AI tools across ${CATALOG_COPY.products} plans. ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Runway & more. Search, filter by brand/category. One-click WhatsApp ordering.`, canonical: "https://www.aiteampremium.com/all-products" },
  "/products": { title: `All Premium AI Products — Complete Catalog (${CATALOG_COPY.tools} AI Tools) | AI Team Premium`, description: `Complete catalog of ${CATALOG_COPY.tools} premium AI tools across ${CATALOG_COPY.products} plans. ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Runway & more. Search, filter by brand/category. One-click WhatsApp ordering.`, canonical: "https://www.aiteampremium.com/products" },
  // Corrected 2026-08-02. This whole family previously advertised "Buy X" for
  // ChatGPT Plus/Business/Pro Shared and quoted specific shared-tier prices —
  // but every one of those five products is quarantined (pending_evidence,
  // see docs/audit/AITP_SHARED_ACCESS_AUDIT.md): no documented access model,
  // ownership/recovery disclosure or provider-terms evidence exists for any of
  // them. "chatgpt-go-shared" specifically does not exist in the catalog at
  // all — this route's old copy referenced a product with no real record
  // behind it whatsoever. Personal-seat routes (plus-personal-seat,
  // business-personal-like, go-personal) are untouched: those products are
  // real, non-shared, and currently purchasable.
  "/chatgpt-plans": { title: `ChatGPT Plans & Pricing in Bangladesh — Personal from ${bdt(P.chatgptPlusPersonal)}/mo | AI Team Premium`, description: `Compare ChatGPT plans in Bangladesh: Personal from ${bdt(P.chatgptPlusPersonal)}/mo, Business, and Pro. Shared-seat availability is confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad.`, canonical: "https://www.aiteampremium.com/chatgpt-plans" },
  "/chatgpt/plus-shared": { title: "ChatGPT Plus Shared in Bangladesh | AI Team Premium", description: "ChatGPT Plus Shared Seat (up to 8 users) availability and current price confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/plus-shared" },
  "/chatgpt/plus-premium-shared": { title: "ChatGPT Plus Premium Shared in Bangladesh | AI Team Premium", description: "ChatGPT Plus Premium Shared (2-3 users) availability and current price confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/plus-premium-shared" },
  "/chatgpt/plus-personal-seat": { title: "ChatGPT Plus Personal Seat — Buy in Bangladesh | AI Team Premium", description: "Buy ChatGPT Plus Personal Seat in Bangladesh. Pay via bKash/Nagad. 2-4 hour delivery.", canonical: "https://www.aiteampremium.com/chatgpt/plus-personal-seat" },
  "/chatgpt/business-shared": { title: "ChatGPT Team Shared in Bangladesh | AI Team Premium", description: "ChatGPT Business Shared workspace seat availability and current price confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/business-shared" },
  "/chatgpt/business-premium-shared": { title: "ChatGPT Team Premium Shared in Bangladesh | AI Team Premium", description: "ChatGPT Business Premium Shared workspace seat availability and current price confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/business-premium-shared" },
  "/chatgpt/business-personal-like": { title: "ChatGPT Team Personal — Buy in Bangladesh | AI Team Premium", description: "Buy ChatGPT Team Personal in Bangladesh. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/business-personal-like" },
  "/chatgpt/pro-premium-shared": { title: "ChatGPT Pro Premium Shared in Bangladesh | AI Team Premium", description: "Availability and current price confirmed after plan verification — ask on WhatsApp. This is our most capable plan.", canonical: "https://www.aiteampremium.com/chatgpt/pro-premium-shared" },
  "/chatgpt/go-personal": { title: "ChatGPT Go Personal — Buy in Bangladesh | AI Team Premium", description: "Buy ChatGPT Go Personal in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt/go-personal" },
  "/chatgpt/go-shared": { title: "ChatGPT Go — Availability in Bangladesh | AI Team Premium", description: "ChatGPT Go Shared Seat availability and current price confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/chatgpt/go-shared" },
  "/claude-plans": { title: `Buy Claude Pro in Bangladesh — bKash & Nagad Payment | from ${bdt(P.chatgptPlusPersonal)}/mo`, description: `Buy Claude Pro (Sonnet 4.5 + Opus 4) in Bangladesh. Personal account from ${bdt(P.chatgptPlusPersonal)}/mo. Pay via bKash or Nagad, 5-15 min delivery.`, canonical: "https://www.aiteampremium.com/claude-plans" },
  "/gemini-plans": { title: `Buy Gemini Advanced in Bangladesh — bKash & Nagad Payment | from ${bdt(P.chatgptPlusPersonal)}/mo`, description: `Buy Gemini Advanced (Gemini 3.0 Pro) in Bangladesh. Pay via bKash or Nagad with Google integration and 2TB storage. From ${bdt(P.chatgptPlusPersonal)}/mo.`, canonical: "https://www.aiteampremium.com/gemini-plans" },
  "/grammarly-plans": { title: "Buy Grammarly Premium in Bangladesh — bKash & Nagad Payment | AI Team Premium", description: "Buy Grammarly Premium in Bangladesh. Improve your English writing with AI-powered grammar checking, tone detection, and plagiarism checking. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/grammarly-plans" },
  "/canva-plans": { title: "Buy Canva Pro in Bangladesh — bKash & Nagad Payment | AI Team Premium", description: "Buy Canva Pro in Bangladesh. Access premium templates, AI design tools, brand kit, background remover, and 100M+ assets. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/canva-plans" },
  "/perplexity-plans": { title: "Buy Perplexity Pro in Bangladesh — bKash & Nagad Payment | AI Team Premium", description: "Buy Perplexity Pro in Bangladesh. AI-powered research with source citations, file upload, and advanced search. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/perplexity-plans" },
  "/grok-plans": { title: "Buy SuperGrok in Bangladesh — bKash & Nagad Payment | AI Team Premium", description: "Buy SuperGrok (xAI) in Bangladesh — real-time AI with X/Twitter integration, image generation, and unrestricted mode. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/grok-plans" },
  // Vault metadata carries no price and no delivery/warranty claim while
  // VAULT_QUARANTINE.quarantined is true (shared/bundle-prices.js). This entry is
  // server-injected and is a SEPARATE surface from the page component: editing
  // the React page alone left "৳1,990/mo" and both withdrawn claims sitting in
  // the served <title> and meta description, which is what a crawler reads.
  "/ai-tools-vault": { title: "AI Tools Vault — ChatGPT + Claude + Gemini Bundle | AI Team Premium", description: "ChatGPT Plus, Claude Pro and Gemini Advanced in one bundle with shared onboarding and a single support channel. Pricing and availability confirmed after plan verification — ask on WhatsApp.", canonical: "https://www.aiteampremium.com/ai-tools-vault" },
  "/ai-subscriptions": { title: "AI Subscriptions — All Plans & Pricing | AI Team Premium", description: "Browse all AI subscriptions: ChatGPT, Claude, Gemini, Canva, Grammarly, Perplexity, Grok, Midjourney and more. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/ai-subscriptions" },
  "/pricing": { title: "Pricing — AI Subscriptions in Bangladesh | AI Team Premium", description: `Full pricing for all AI subscriptions in Bangladesh, from ${bdt(P.catalogMin)}/mo. Pay via bKash/Nagad. Prices shown in BDT.`, canonical: "https://www.aiteampremium.com/pricing" },
  "/support": { title: "Support — AI Team Premium Bangladesh", description: "Get support for your AI subscriptions. WhatsApp, Messenger, or live AI consultation.", canonical: "https://www.aiteampremium.com/support" },
  "/about": { title: "About AI Team Premium — Bangladesh's Trusted AI Partner", description: "Learn about AI Team Premium, AI subscriptions for Bangladesh, paid in BDT via bKash or Nagad.", canonical: "https://www.aiteampremium.com/about" },
  "/start-a-project": { title: "Start a Project — AI Team Premium", description: "Start a project with AI Team Premium. Tell us about your needs and we'll create a custom solution.", canonical: "https://www.aiteampremium.com/start-a-project" },
  "/refund-policy": { title: "Refund Policy — AI Team Premium", description: "AI Team Premium refund policy. 24-hour replacement SLA for shared subscriptions. Contact us for refund requests.", canonical: "https://www.aiteampremium.com/refund-policy" },
  "/access-types": { title: "Access Types Explained — Who Owns the Account? | AI Team Premium", description: "Customer-owned account, official team seat, managed service or your own API key — what actually differs, who controls recovery, and what AI Team Premium will never ask you for.", canonical: "https://www.aiteampremium.com/access-types" },
  "/pricing-how-it-works": { title: "Pricing — How It Works | AI Team Premium", description: "How AI Team Premium sets prices: official USD cost, Bangladesh exchange rate, service margin, and what 'Request Price' means. Transparent, no hidden fees.", canonical: "https://www.aiteampremium.com/pricing-how-it-works" },
  "/non-affiliation": { title: "Third-Party Trademark & Non-Affiliation Disclosure | AI Team Premium", description: "AI Team Premium is an independent subscription facilitator. We are not officially affiliated with or endorsed by any AI provider whose subscriptions we help you access.", canonical: "https://www.aiteampremium.com/non-affiliation" },
  "/corrections": { title: "Corrections Policy | AI Team Premium", description: "How AI Team Premium handles corrections: we fix errors promptly, publish corrections publicly when warranted, and never silently edit substantive mistakes.", canonical: "https://www.aiteampremium.com/corrections" },
  "/incident-escalation": { title: "Incident & Escalation Process | AI Team Premium", description: "What to do if you experience an access issue, account problem, or security concern. Step-by-step escalation process with response times.", canonical: "https://www.aiteampremium.com/incident-escalation" },
  "/privacy-policy": { title: "Privacy Policy — AI Team Premium", description: "AI Team Premium privacy policy. How we collect, use, and protect your personal information.", canonical: "https://www.aiteampremium.com/privacy-policy" },
  "/terms": { title: "Terms of Service — AI Team Premium", description: "AI Team Premium terms of service. Please read these terms carefully before using our services.", canonical: "https://www.aiteampremium.com/terms" },
  "/services": { title: "Services — AI Ops, Design, Web, Marketing | AI Team Premium", description: "Complete digital services: AI Ops sprint, brand design, web development, digital marketing, app development, and AI consultancy.", canonical: "https://www.aiteampremium.com/services" },
  "/services/ai-ops-sprint": { title: "AI Ops Sprint — 2-Week AI Integration | AI Team Premium", description: "A 2-week intensive AI integration sprint for your business. Custom AI workflows, team training, automation setup.", canonical: "https://www.aiteampremium.com/services/ai-ops-sprint" },
  "/services/brand-design": { title: "Brand Design Services — Logo, Identity, Creative | AI Team Premium", description: "Professional brand design services: logo, identity, brand guidelines, creative direction.", canonical: "https://www.aiteampremium.com/services/brand-design" },
  "/services/web-development": { title: "Web Development Services — Modern, Fast, SEO-Optimized | AI Team Premium", description: "Professional web development: modern, fast, SEO-optimized websites built with React and Tailwind.", canonical: "https://www.aiteampremium.com/services/web-development" },
  "/services/digital-marketing": { title: "Digital Marketing Services — Growth Strategy | AI Team Premium", description: "Data-driven digital marketing: growth strategy, content creation, campaign execution, social media management.", canonical: "https://www.aiteampremium.com/services/digital-marketing" },
  "/services/app-development": { title: "App Development Services — Mobile-First Apps | AI Team Premium", description: "Mobile-first app development: iOS, Android, cross-platform. From concept to production.", canonical: "https://www.aiteampremium.com/services/app-development" },
  "/services/ai-advisory": { title: "AI Advisory — Strategy & Consulting for Bangladesh Businesses | AI Team Premium", description: "AI readiness assessment, opportunity mapping, vendor selection strategy, and 3-6 month AI adoption roadmap for Bangladeshi businesses. Free consultation.", canonical: "https://www.aiteampremium.com/services/ai-advisory" },
  "/services/ai-setup-security": { title: "AI Setup & Security — Hardening for Bangladesh Teams | AI Team Premium", description: "Account security audit, 2FA setup, recovery configuration, password hygiene, API key rotation, and data privacy for AI tools. Guide-based — we never ask for your password.", canonical: "https://www.aiteampremium.com/services/ai-setup-security" },
  "/services/ai-training": { title: "AI Training & Workshops — Team Enablement in Bangladesh | AI Team Premium", description: "Custom AI training for teams in Bangladesh. Hands-on workshops on ChatGPT, Claude, Gemini, Midjourney, and more. Live sessions, practical exercises, 30-day support.", canonical: "https://www.aiteampremium.com/services/ai-training" },
  "/services/ai-automation": { title: "AI Automation — Workflow Integration for Bangladesh | AI Team Premium", description: "End-to-end AI workflow automation for Bangladeshi businesses. Process mapping, tool setup (Zapier, Make, n8n), deployment, and 30-day support.", canonical: "https://www.aiteampremium.com/services/ai-automation" },
  "/services/managed-ai-operations": { title: "Managed AI Operations — Ongoing AI Management Bangladesh | AI Team Premium", description: "Ongoing management of your AI subscriptions. Renewal tracking, security audits, quarterly optimization, priority WhatsApp support, and monthly reports.", canonical: "https://www.aiteampremium.com/services/managed-ai-operations" },
  "/compare": { title: "Compare AI Tools — Side-by-Side Comparison | AI Team Premium", description: "Compare AI tools side-by-side: ChatGPT vs Claude, Gemini vs ChatGPT, Midjourney vs Leonardo, and more.", canonical: "https://www.aiteampremium.com/compare" },
  "/contact": { title: "Contact AI Team Premium — WhatsApp, Messenger, Email", description: "Contact AI Team Premium. Reach us via WhatsApp, Facebook Messenger, or email. Available 7 days a week.", canonical: "https://www.aiteampremium.com/contact" },
  "/tools/chatgpt": { title: "ChatGPT — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy ChatGPT in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/chatgpt" },
  "/tools/claude": { title: "Claude AI — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Claude AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/claude" },
  "/tools/gemini": { title: "Gemini — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Gemini in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/gemini" },
  "/tools/supergrok": { title: "SuperGrok — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy SuperGrok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/supergrok" },
  "/tools/google-ai-pro": { title: "Google AI Pro — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Google AI Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/google-ai-pro" },
  "/tools/midjourney": { title: "Midjourney — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Midjourney in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/midjourney" },
  "/tools/leonardo": { title: "Leonardo AI — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Leonardo AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/leonardo" },
  "/tools/runway": { title: "Runway ML — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Runway ML in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/runway" },
  "/tools/kling": { title: "Kling AI — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Kling AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/kling" },
  "/tools/grammarly": { title: "Grammarly — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Grammarly in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/grammarly" },
  "/tools/canva": { title: "Canva Pro — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Canva Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/canva" },
  "/tools/perplexity": { title: "Perplexity Pro — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Perplexity Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/perplexity" },
  "/tools/grok": { title: "Grok — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Grok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/grok" },
  "/tools/copilot": { title: "GitHub Copilot — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy GitHub Copilot in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/copilot" },
  "/tools/vault": { title: "AI Tools Vault — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy AI Tools Vault in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/vault" },
  "/tools/elevenlabs": { title: "ElevenLabs — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy ElevenLabs in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/elevenlabs" },
  "/tools/notion": { title: "Notion AI — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Notion AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/notion" },
  "/tools/microsoft365": { title: "Microsoft 365 — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy Microsoft 365 in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/microsoft365" },
  "/tools/linkedin": { title: "LinkedIn Premium — Buy in Bangladesh with bKash | AI Team Premium", description: "Buy LinkedIn Premium in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/tools/linkedin" },
  "/tools/adobe-cc": { title: "Adobe Creative Cloud — Buy in Bangladesh | AI Team Premium", description: "Buy Adobe Creative Cloud in Bangladesh. Photoshop, Illustrator, Premiere Pro and more. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/adobe-cc" },
  "/tools/firefly": { title: "Adobe Firefly — Buy in Bangladesh | AI Team Premium", description: "Buy Adobe Firefly in Bangladesh. Generative AI image creation. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/firefly" },
  "/tools/freepik": { title: "Freepik Pro — Buy in Bangladesh | AI Team Premium", description: "Buy Freepik Pro in Bangladesh. Unlimited design resources. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/freepik" },
  "/tools/ideogram": { title: "Ideogram — Buy in Bangladesh | AI Team Premium", description: "Buy Ideogram Pro in Bangladesh. AI image generation with text. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/ideogram" },
  "/tools/manus": { title: "Manus — Buy in Bangladesh | AI Team Premium", description: "Buy Manus AI in Bangladesh. Premium AI tools package. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/manus" },
  "/tools/poe": { title: "Poe — Buy in Bangladesh | AI Team Premium", description: "Buy Poe Premium in Bangladesh. Access multiple AI chatbots. Pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/tools/poe" },
  "/admin/audit": { title: "Audit Dashboard — AI Team Premium", description: "Admin audit dashboard for monitoring system performance and metrics.", canonical: "https://www.aiteampremium.com/admin/audit" },
  "/blog": { title: "AI Blog — Guides for Bangladesh | AI Team Premium", description: "Practical guides on ChatGPT, Claude, Gemini and AI tools for Bangladeshi students, freelancers and businesses — pricing, comparisons, and how to pay via bKash/Nagad.", canonical: "https://www.aiteampremium.com/blog" },
  "/ai-readiness": { title: "AI Readiness Assessment — Is Your Business Ready for AI? | AI Team Premium", description: "5-minute self-assessment: Strategy, security, training, automation, and ongoing management. Discover where your business is ready for AI and where help is needed.", canonical: "https://www.aiteampremium.com/ai-readiness" },
};

// Point the duplicate product URLs at the catalog page that should be indexed.
//
// Applied here, after the table is built, so the canonical each route ships is
// the consolidated one without every entry having to remember. The pages stay
// reachable and are not redirected — see shared/canonical-map.js for why.
for (const [from, to] of Object.entries(CANONICAL_MAP)) {
  if (!ROUTE_META[from]) {
    throw new Error(`canonical map: "${from}" is not a route in ROUTE_META`);
  }
  if (!ROUTE_META[to]) {
    throw new Error(`canonical map: "${from}" points at "${to}", which is not a route`);
  }
  ROUTE_META[from] = { ...ROUTE_META[from], canonical: `${SITE_URL}${to}` };
}

// Routes with a dynamic trailing segment. Matched by prefix when no exact key hits.
export const DYNAMIC_PREFIXES = [
  { prefix: "/compare/", meta: { title: "Compare AI Tools — Side-by-Side Comparison | AI Team Premium", description: "Compare AI tools side-by-side. Detailed comparison of features, pricing, and capabilities.", canonical: "https://www.aiteampremium.com/compare" } },
  { prefix: "/blog/", meta: { title: "AI Blog — Guides for Bangladesh | AI Team Premium", description: "Practical guides on ChatGPT, Claude, Gemini and AI tools for Bangladeshi students, freelancers and businesses.", canonical: "https://www.aiteampremium.com/blog" } },
  // Safety net for /tools/:slug. Every real product already has an exact entry
  // above (exact keys are matched first), so this only catches a slug that is
  // not in the catalog — which the page renders as a 404.
  { prefix: "/tools/", meta: { title: "AI Tools & Subscriptions in Bangladesh | AI Team Premium", description: "Premium AI subscriptions for Bangladesh. Pay with bKash or Nagad — no international card needed. Fast delivery and 30-day replacement guarantee.", canonical: "https://www.aiteampremium.com/all-products" } },
  // Safety net for /category/:slug. Every real category has an exact entry above
  // (exact keys match first), so this only catches a slug the catalog has no
  // products for — which the page renders as a 404.
  { prefix: "/category/", meta: { title: "AI Tool Categories in Bangladesh | AI Team Premium", description: "Browse premium AI subscriptions by category. Pay with bKash or Nagad — no international card needed. Fast delivery and 30-day replacement guarantee.", canonical: "https://www.aiteampremium.com/all-products" } },
];

// Single matching rule, shared by the Vercel function (api/index.js) and the
// local dev server (server/seo.ts) so the two can never disagree about which
// metadata a path gets. Returns null for unknown paths.
export function lookupMeta(path) {
  if (ROUTE_META[path]) return ROUTE_META[path];
  // Tolerate a trailing slash on any route except "/".
  if (path.length > 1 && path.endsWith("/")) {
    const trimmed = path.slice(0, -1);
    if (ROUTE_META[trimmed]) return ROUTE_META[trimmed];
  }
  for (const { prefix, meta } of DYNAMIC_PREFIXES) {
    if (path.startsWith(prefix) && path.length > prefix.length) return meta;
  }
  return null;
}
