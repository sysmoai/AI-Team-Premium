// server/seo.ts — Per-route SEO meta injection + 404 handler
// DEPLOY-TRIGGER: 1784770828
// Generated from sitemap. Route map covers all 66 URLs.
import { type Request, type Response } from "express";
import fs from "fs";
import path from "path";

const SITE_URL = "https://aipremium.tools";
const DIST_PATH = path.resolve(import.meta.dirname, "public");

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/": { title: "AIPT — Affordable AI Subscriptions in Bangladesh | ChatGPT, Claude, Midjourney", description: "Bangladesh's #1 store for premium AI subscriptions. ChatGPT Plus, Claude Pro, Midjourney, Canva Pro and 99+ more — paid in BDT via bKash, Nagad or bank. 1-hour activation, 30-day warranty.", canonical: "https://aipremium.tools/" },
  "/chatgpt-plans": { title: "ChatGPT Plans & Pricing in Bangladesh — ৳499/mo | AIPT — AI Premium Tools", description: "Compare all ChatGPT plans: Plus Shared (৳499/mo), Premium Shared (৳999/mo), Personal (৳2,990/mo), Business, and Pro. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/chatgpt-plans" },
  "/chatgpt/plus-shared": { title: "ChatGPT Plus Shared — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy ChatGPT Plus Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery. Premium AI subscription from AIPT — AI Premium Tools.", canonical: "https://aipremium.tools/chatgpt/plus-shared" },
  "/chatgpt/plus-premium-shared": { title: "ChatGPT Plus Premium Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Plus Premium Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/chatgpt/plus-premium-shared" },
  "/chatgpt/plus-personal-seat": { title: "ChatGPT Plus Personal Seat — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Plus Personal Seat in Bangladesh. Pay via bKash/Nagad. 2-4 hour delivery.", canonical: "https://aipremium.tools/chatgpt/plus-personal-seat" },
  "/chatgpt/business-shared": { title: "ChatGPT Team Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Team Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/chatgpt/business-shared" },
  "/chatgpt/business-premium-shared": { title: "ChatGPT Team Premium Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Team Premium Shared in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/chatgpt/business-premium-shared" },
  "/chatgpt/business-personal-like": { title: "ChatGPT Team Personal — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Team Personal in Bangladesh. Pay via bKash/Nagad.", canonical: "https://aipremium.tools/chatgpt/business-personal-like" },
  "/chatgpt/pro-premium-shared": { title: "ChatGPT Pro Premium Shared — Buy in Bangladesh | AIPT — AI Premium Tools", description: "Buy ChatGPT Pro Premium Shared in Bangladesh. The most powerful plan. Pay via bKash/Nagad.", canonical: "https://aipremium.tools/chatgpt/pro-premium-shared" },
  "/claude-plans": { title: "Claude Pro Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy Claude Pro (Sonnet 4.5 + Opus 4) in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/claude-plans" },
  "/gemini-plans": { title: "Gemini Advanced Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy Gemini Advanced (Gemini 3.0 Pro) in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/gemini-plans" },
  "/grammarly-plans": { title: "Grammarly Premium Plans in Bangladesh | AIPT — AI Premium Tools", description: "Buy Grammarly Premium in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/grammarly-plans" },
  "/canva-plans": { title: "Canva Pro Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy Canva Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/canva-plans" },
  "/perplexity-plans": { title: "Perplexity Pro Plans in Bangladesh | AIPT — AI Premium Tools", description: "Buy Perplexity Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/perplexity-plans" },
  "/grok-plans": { title: "SuperGrok Plans & Pricing in Bangladesh | AIPT — AI Premium Tools", description: "Buy SuperGrok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/grok-plans" },
  "/ai-tools-vault": { title: "AI Tools Vault — 25+ Premium AI Tools in Bangladesh | AIPT — AI Premium Tools", description: "Access 25+ premium AI tools in one vault: ChatGPT, Claude, Gemini, Midjourney, Canva, Grammarly and more.", canonical: "https://aipremium.tools/ai-tools-vault" },
  "/ai-subscriptions": { title: "AI Subscriptions — All Plans & Pricing | AIPT — AI Premium Tools", description: "Browse all AI subscriptions: ChatGPT, Claude, Gemini, Canva, Grammarly, Perplexity, Grok, Midjourney and more. Pay via bKash/Nagad.", canonical: "https://aipremium.tools/ai-subscriptions" },
  "/pricing": { title: "Pricing — AI Subscriptions in Bangladesh | AIPT — AI Premium Tools", description: "Full pricing for all AI subscriptions in Bangladesh. ChatGPT from ৳499/mo. Pay via bKash/Nagad. No extra VAT.", canonical: "https://aipremium.tools/pricing" },
  "/support": { title: "Support — AIPT — AI Premium Tools Bangladesh", description: "Get support for your AI subscriptions. WhatsApp, Messenger, or live AI consultation.", canonical: "https://aipremium.tools/support" },
  "/about": { title: "About AIPT — AI Premium Tools — Bangladesh's Trusted AI Partner", description: "Learn about AIPT — AI Premium Tools, Bangladesh's premier provider of AI subscriptions, supporting 3,000+ customers.", canonical: "https://aipremium.tools/about" },
  "/start-a-project": { title: "Start a Project — AIPT — AI Premium Tools", description: "Start a project with AIPT — AI Premium Tools. Tell us about your needs and we'll create a custom solution.", canonical: "https://aipremium.tools/start-a-project" },
  "/refund-policy": { title: "Refund Policy — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools refund policy. 24-hour replacement SLA for shared subscriptions. Contact us for refund requests.", canonical: "https://aipremium.tools/refund-policy" },
  "/privacy-policy": { title: "Privacy Policy — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools privacy policy. How we collect, use, and protect your personal information.", canonical: "https://aipremium.tools/privacy-policy" },
  "/terms": { title: "Terms of Service — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools terms of service. Please read these terms carefully before using our services.", canonical: "https://aipremium.tools/terms" },
  "/services": { title: "Services — AI Ops, Design, Web, Marketing | AIPT — AI Premium Tools", description: "Complete digital services: AI Ops sprint, brand design, web development, digital marketing, app development, and AI consultancy.", canonical: "https://aipremium.tools/services" },
  "/services/ai-ops-sprint": { title: "AI Ops Sprint — 2-Week AI Integration | AIPT — AI Premium Tools", description: "A 2-week intensive AI integration sprint for your business. Custom AI workflows, team training, automation setup.", canonical: "https://aipremium.tools/services/ai-ops-sprint" },
  "/services/brand-design": { title: "Brand Design Services — Logo, Identity, Creative | AIPT — AI Premium Tools", description: "Professional brand design services: logo, identity, brand guidelines, creative direction.", canonical: "https://aipremium.tools/services/brand-design" },
  "/services/web-development": { title: "Web Development Services — Modern, Fast, SEO-Optimized | AIPT — AI Premium Tools", description: "Professional web development: modern, fast, SEO-optimized websites built with React and Tailwind.", canonical: "https://aipremium.tools/services/web-development" },
  "/services/digital-marketing": { title: "Digital Marketing Services — Growth Strategy | AIPT — AI Premium Tools", description: "Data-driven digital marketing: growth strategy, content creation, campaign execution, social media management.", canonical: "https://aipremium.tools/services/digital-marketing" },
  "/services/app-development": { title: "App Development Services — Mobile-First Apps | AIPT — AI Premium Tools", description: "Mobile-first app development: iOS, Android, cross-platform. From concept to production.", canonical: "https://aipremium.tools/services/app-development" },
  "/compare": { title: "Compare AI Tools — Side-by-Side Comparison | AIPT — AI Premium Tools", description: "Compare AI tools side-by-side: ChatGPT vs Claude, Gemini vs ChatGPT, Midjourney vs Leonardo, and more.", canonical: "https://aipremium.tools/compare" },
  "/contact": { title: "Contact AIPT — AI Premium Tools — WhatsApp, Messenger, Email", description: "Contact AIPT — AI Premium Tools. Reach us via WhatsApp, Facebook Messenger, or email. Available 7 days a week.", canonical: "https://aipremium.tools/contact" },
  "/tools/chatgpt": { title: "ChatGPT — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy ChatGPT in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/chatgpt" },
  "/tools/claude": { title: "Claude AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Claude AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/claude" },
  "/tools/gemini": { title: "Gemini — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Gemini in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/gemini" },
  "/tools/supergrok": { title: "SuperGrok — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy SuperGrok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/supergrok" },
  "/tools/google-ai-pro": { title: "Google AI Pro — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Google AI Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/google-ai-pro" },
  "/tools/midjourney": { title: "Midjourney — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Midjourney in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/midjourney" },
  "/tools/leonardo": { title: "Leonardo AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Leonardo AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/leonardo" },
  "/tools/runway": { title: "Runway ML — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Runway ML in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/runway" },
  "/tools/kling": { title: "Kling AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Kling AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/kling" },
  "/tools/grammarly": { title: "Grammarly — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Grammarly in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/grammarly" },
  "/tools/canva": { title: "Canva Pro — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Canva Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/canva" },
  "/tools/perplexity": { title: "Perplexity Pro — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Perplexity Pro in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/perplexity" },
  "/tools/grok": { title: "Grok — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Grok in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/grok" },
  "/tools/copilot": { title: "GitHub Copilot — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy GitHub Copilot in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/copilot" },
  "/tools/vault": { title: "AI Tools Vault — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy AI Tools Vault in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/vault" },
  "/tools/elevenlabs": { title: "ElevenLabs — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy ElevenLabs in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/elevenlabs" },
  "/tools/notion": { title: "Notion AI — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Notion AI in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/notion" },
  "/tools/microsoft365": { title: "Microsoft 365 — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy Microsoft 365 in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/microsoft365" },
  "/tools/linkedin": { title: "LinkedIn Premium — Buy in Bangladesh with bKash | AIPT — AI Premium Tools", description: "Buy LinkedIn Premium in Bangladesh. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://aipremium.tools/tools/linkedin" },
};

export function handleSeoRequest(req: Request, res: Response): void {
  const requestPath = req.path;
  const indexPath = path.resolve(DIST_PATH, "index.html");

  if (!fs.existsSync(indexPath)) {
    res.status(500).send("Server error: index.html not found");
    return;
  }

  let template: string;
  try {
    template = fs.readFileSync(indexPath, "utf-8");
  } catch {
    res.status(500).send("Server error: could not read index.html");
    return;
  }

  // Look up route meta
  const meta = ROUTE_META[requestPath];

  if (!meta) {
    // Unknown path -> return 404 with proper meta
    let result = template
      .replace(/<title>.*?<\/title>/, "<title>404 - Page Not Found | AIPT — AI Premium Tools</title>")
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, '<meta name="description" content="The page you requested was not found. Browse our AI subscriptions or return home." />')
      .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${SITE_URL}${requestPath}" />`);

    // Add hreflang on 404 too
    const hreflang = `    <link rel="alternate" hreflang="en" href="${SITE_URL}${requestPath}" />\n    <link rel="alternate" hreflang="x-default" href="${SITE_URL}${requestPath}" />\n  `;
    result = result.replace("</head>", hreflang + "\n</head>");

    res.status(404).send(result);
    return;
  }

  // Inject per-route meta tags
  let result = template
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${meta.canonical}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  // Remove hardcoded canonical from index.html and set per-route
  if (result.includes('rel="canonical"')) {
    result = result.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${meta.canonical}" />`);
  } else {
    result = result.replace("</head>", `  <link rel="canonical" href="${meta.canonical}" />\n</head>`);
  }

  // Add hreflang tags for multi-language support
  const hreflangTags = `    <link rel="alternate" hreflang="en" href="${meta.canonical}" />\n    <link rel="alternate" hreflang="bn" href="${meta.canonical}?lang=bn" />\n    <link rel="alternate" hreflang="x-default" href="${meta.canonical}" />\n  `;
  result = result.replace("</head>", hreflangTags + "\n</head>");

  res.status(200).send(result);
}