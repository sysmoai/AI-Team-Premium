import { useMemo, useRef } from "react";
import { useRoute, Link } from "wouter";
import {
  Sparkles, Image as ImageIcon, Video, Mic, Code2, PenLine, LayoutGrid,
  Search, Bot, Eye, Clock, Check, ShieldCheck, MessageCircle, ArrowRight,
  FileText, Wand2, Scissors, Maximize2, Users, PenTool, Captions, Film,
  Monitor, AudioLines, Languages, Palette,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { config } from "@/lib/config";
import { bestTextOn } from "@/lib/contrast";
import { categoryLabel } from "@/lib/categories";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";
import { SearchableFAQ, UseCaseCards, TrustAndBuySection } from "@/components/product";
import type { UseCase } from "@/components/product";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import catalog from "../data/products-catalog.json";
import NotFound from "@/pages/not-found";

/* ------------------------------------------------------------------ types */
// The catalog is hand-maintained JSON, so every field beyond the core few is
// treated as optional here. A missing field must degrade to a hidden section,
// never to a crash on a live product page.
interface CatalogPlan {
  planName?: string;
  tierLevel?: number;
  priceBDT?: number;
  officialUSD?: number;
  billingCycle?: string;
  deliveryType?: string;
  whatsIncluded?: string[];
  features?: string[];
  limitations?: string[];
  bestFor?: string;
  seats?: number;
  badge?: string;
  inStock?: boolean;
}

interface CatalogFaq {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug?: string;
  provider?: string;
  brandColor?: string;
  category: string;
  price: number;
  officialUSD?: number;
  tier?: string;
  accessType?: string;
  badge?: string;
  description: string;
  descriptionBN?: string;
  capabilities?: string[];
  deliverySLA?: string;
  featured?: boolean;
  whatsappMsg?: string;
  status?: string;
  useCases?: string[];
  whyBuyBN?: string;
  plans?: CatalogPlan[];
  faq?: CatalogFaq[];
  uniqueSellingPoints?: string[];
  howItWorksSteps?: string[];
  deliveryMethod?: string;
  lastVerifiedDate?: string;
  priceOnRequest?: boolean;
  commercialStatus?: string;
  accessModel?: string;
}

const products = catalog as unknown as CatalogProduct[];

/* -------------------------------------------------------------- constants */
// Capability slugs in the catalog are terse ("image-gen"). These give each one a
// human label plus an icon so the feature grid reads as prose, not as data.
//
// Descriptions say what the capability *is*, never how much of it a given plan
// includes — quotas differ per tier and live in the plan data, so claiming a
// number here would misstate it on some page.
const CAPABILITY_META: Record<string, { label: string; desc: string; icon: LucideIcon }> = {
  text: { label: "Text & Writing", desc: "Drafting, rewriting, summarising and long-form writing in English and Bangla.", icon: PenLine },
  code: { label: "Code & Debugging", desc: "Write, explain and fix code across languages, with full-file context.", icon: Code2 },
  vision: { label: "Vision & Image Input", desc: "Upload screenshots, photos and documents and ask questions about them.", icon: Eye },
  search: { label: "Live Web Search", desc: "Answers grounded in current web results instead of stale training data.", icon: Search },
  document: { label: "Document Analysis", desc: "Read PDFs, spreadsheets and long documents, then summarise or query them.", icon: FileText },
  "image-gen": { label: "Image Generation", desc: "Generate original images and graphics from a written prompt.", icon: ImageIcon },
  "ai-image-gen": { label: "AI Image Generation", desc: "Generate original images and graphics from a written prompt.", icon: ImageIcon },
  "image-edit": { label: "Image Editing", desc: "Edit existing images with AI — retouch, replace elements and change style.", icon: Wand2 },
  "generative-fill": { label: "Generative Fill", desc: "Extend or repair part of an image and have AI paint in the missing area.", icon: Wand2 },
  "background-remover": { label: "Background Removal", desc: "Cut a subject out of its background in one click for clean product shots.", icon: Scissors },
  "ai-upscaler": { label: "AI Upscaling", desc: "Raise resolution and recover detail in low-quality or small images.", icon: Maximize2 },
  "ai-reimagine": { label: "Reimagine", desc: "Generate fresh variations of an image while keeping its overall composition.", icon: Wand2 },
  "character-consistency": { label: "Character Consistency", desc: "Keep the same character recognisable across a series of generations.", icon: Users },
  vectors: { label: "Vector Assets", desc: "Editable vector graphics that stay sharp at any size, including print.", icon: PenTool },
  photos: { label: "Stock Photos", desc: "Licensed photography you can use in commercial work.", icon: ImageIcon },
  icons: { label: "Icon Library", desc: "Consistent icon sets for interfaces, decks and marketing material.", icon: LayoutGrid },
  "stock-assets": { label: "Stock Asset Library", desc: "Photos, vectors, templates and video you can drop straight into a project.", icon: LayoutGrid },
  "video-gen": { label: "Video Generation", desc: "Turn text prompts or still images into short video clips.", icon: Video },
  "text-to-video": { label: "Text to Video", desc: "Describe a scene in words and get a rendered video clip back.", icon: Video },
  "image-to-video": { label: "Image to Video", desc: "Animate a still image into motion while keeping the original framing.", icon: Video },
  "video-edit": { label: "Video Editing", desc: "Cut, arrange and polish footage with AI assistance on the timeline.", icon: Video },
  "video-editing": { label: "Video Editing", desc: "Cut, arrange and polish footage with AI assistance on the timeline.", icon: Video },
  "video-repurpose": { label: "Repurpose Long Video", desc: "Turn one long recording into many short clips sized for social platforms.", icon: Scissors },
  "shorts-maker": { label: "Shorts & Reels", desc: "Produce vertical short-form video formatted for Reels, Shorts and TikTok.", icon: Video },
  "reels-maker": { label: "Reels Maker", desc: "Produce vertical short-form video formatted for Reels, Shorts and TikTok.", icon: Video },
  "viral-hooks": { label: "Hook Detection", desc: "Surfaces the moments in a recording most likely to hold attention.", icon: Sparkles },
  "auto-captions": { label: "Auto Captions", desc: "Burn in accurate subtitles automatically instead of typing them by hand.", icon: Captions },
  "ai-effects": { label: "AI Effects", desc: "Transitions, filters and visual effects applied automatically.", icon: Sparkles },
  keyframe: { label: "Keyframe Control", desc: "Set start and end frames to direct exactly how a shot moves.", icon: Film },
  "4k-export": { label: "4K Export", desc: "Export finished video at 4K resolution for client and broadcast work.", icon: Maximize2 },
  "cinematic-quality": { label: "Cinematic Quality", desc: "Film-style lighting, depth of field and camera movement in generated shots.", icon: Film },
  "motion-realism": { label: "Realistic Motion", desc: "Physically plausible movement, so subjects and camera behave naturally.", icon: Film },
  "screen-recording": { label: "Screen Recording", desc: "Capture your screen and webcam together for tutorials and demos.", icon: Monitor },
  "ai-avatars": { label: "AI Avatars", desc: "Presenter-style video from a script, without filming anyone.", icon: Users },
  "custom-avatars": { label: "Custom Avatars", desc: "Build an avatar from your own footage so the presenter is you.", icon: Users },
  "corporate-training": { label: "Training Video", desc: "Turn documents and slides into narrated training video at scale.", icon: Monitor },
  voice: { label: "Voice & Audio", desc: "Natural speech generation and voice-driven conversation.", icon: Mic },
  "text-to-speech": { label: "Text to Speech", desc: "Convert written script into natural-sounding narration.", icon: Mic },
  "voice-cloning": { label: "Voice Cloning", desc: "Create a reusable synthetic voice from a sample recording.", icon: Mic },
  overdub: { label: "Overdub", desc: "Fix a line by editing the transcript — the audio is regenerated to match.", icon: Mic },
  "studio-quality": { label: "Studio-Quality Audio", desc: "High-bitrate output clean enough for client and broadcast delivery.", icon: AudioLines },
  "podcast-editing": { label: "Podcast Editing", desc: "Remove filler words, silences and stumbles from spoken recordings.", icon: AudioLines },
  "auto-transcription": { label: "Auto Transcription", desc: "Turn speech into searchable, timestamped text automatically.", icon: FileText },
  "text-based-editing": { label: "Edit by Transcript", desc: "Delete a sentence in the transcript and the media is cut to match.", icon: FileText },
  music: { label: "Music Generation", desc: "Full tracks with vocals and instrumentation from a prompt.", icon: AudioLines },
  agents: { label: "AI Agents", desc: "Multi-step tasks the model plans and executes on your behalf.", icon: Bot },
  "autonomous-coding": { label: "Autonomous Coding", desc: "Hand over a whole task and let the agent write and run the code itself.", icon: Bot },
  "cascade-agent": { label: "Agentic Editing", desc: "The assistant edits across multiple files in one coordinated pass.", icon: Bot },
  "code-completion": { label: "Code Completion", desc: "Inline suggestions as you type, aware of the rest of your project.", icon: Code2 },
  debugging: { label: "Debugging", desc: "Explain an error, trace the cause and propose a working fix.", icon: Code2 },
  "grammar-check": { label: "Grammar Checking", desc: "Catch grammar and punctuation mistakes before anyone else sees them.", icon: PenLine },
  "spell-check": { label: "Spell Checking", desc: "Real-time spelling correction as you write, everywhere you type.", icon: PenLine },
  "tone-detection": { label: "Tone Detection", desc: "Shows how your writing will read — formal, blunt, friendly — before you send.", icon: PenLine },
  "clarity-improvements": { label: "Clarity Rewrites", desc: "Tighten wordy sentences so the point lands faster.", icon: PenLine },
  "plagiarism-check": { label: "Plagiarism Check", desc: "Compare text against published sources before you submit it.", icon: ShieldCheck },
  paraphrase: { label: "Paraphrasing", desc: "Rewrite text in different words while keeping the original meaning.", icon: PenLine },
  summarizer: { label: "Summarising", desc: "Condense long articles, papers and reports into their key points.", icon: FileText },
  "citation-generator": { label: "Citation Generator", desc: "Build correctly formatted references in APA, MLA and other styles.", icon: FileText },
  translator: { label: "Translation", desc: "Translate between languages, including Bangla and English.", icon: Languages },
  "multi-language": { label: "Multi-Language", desc: "Works across many languages, not just English.", icon: Languages },
  "blog-writing": { label: "Blog & Article Writing", desc: "Draft long-form articles from an outline or a single topic line.", icon: PenLine },
  "ad-copy": { label: "Ad Copy", desc: "Write and vary ad headlines and body copy for testing.", icon: PenLine },
  "email-writing": { label: "Email Writing", desc: "Draft professional emails and replies in seconds.", icon: PenLine },
  "social-media": { label: "Social Content", desc: "Captions, posts and hooks sized for each platform.", icon: Sparkles },
  "social-media-templates": { label: "Social Templates", desc: "Ready-made post layouts you edit instead of designing from scratch.", icon: LayoutGrid },
  "seo-content": { label: "SEO Content", desc: "Content structured around the terms people actually search for.", icon: Search },
  "brand-voice": { label: "Brand Voice", desc: "Teach it your tone once so everything it writes sounds like you.", icon: Sparkles },
  "brand-kit": { label: "Brand Kit", desc: "Lock your logo, fonts and colours so every asset stays on-brand.", icon: Palette },
  "ai-design": { label: "AI Design", desc: "Generate layouts and design variations from a short description.", icon: Palette },
  "magic-studio": { label: "AI Design Studio", desc: "A bundled set of AI editing tools built into the design canvas.", icon: Wand2 },
  design: { label: "Design & Templates", desc: "Templates, brand assets and layout tools for fast production work.", icon: LayoutGrid },
  "text-effects": { label: "Text Effects", desc: "Styled and shaped typography without opening a design tool.", icon: Palette },
  "commercial-safe": { label: "Commercially Safe", desc: "Trained on licensed content, so output is cleared for commercial use.", icon: ShieldCheck },
  "photoshop-integration": { label: "Photoshop Integration", desc: "Works inside Photoshop rather than as a separate app.", icon: Palette },
  workspace: { label: "Workspace & Docs", desc: "Notes, docs, tasks and databases kept in one searchable place.", icon: LayoutGrid },
  "word-ai": { label: "AI in Word", desc: "Drafting and rewriting help directly inside Microsoft Word.", icon: FileText },
  "excel-ai": { label: "AI in Excel", desc: "Analyse spreadsheets and build formulas by describing what you want.", icon: FileText },
  "powerpoint-ai": { label: "AI in PowerPoint", desc: "Turn a document or prompt into a formatted slide deck.", icon: Monitor },
  "outlook-ai": { label: "AI in Outlook", desc: "Summarise long threads and draft replies inside your inbox.", icon: FileText },
  "teams-ai": { label: "AI in Teams", desc: "Meeting recaps and action items captured automatically.", icon: Users },
  research: { label: "Deep Research", desc: "Long-running research runs that read many sources and cite them.", icon: Search },
};

// Slugs outside the map are still worth showing, so they get a readable label —
// but no description, because inventing one would risk stating something untrue.
const ACRONYMS = new Set(["ai", "4k", "hd", "seo", "gpt", "gpt4", "pdf", "api", "ui", "ux"]);

function capabilityLabel(slug: string) {
  const mapped = CAPABILITY_META[slug];
  if (mapped) return mapped.label;
  return slug
    .split("-")
    .map((w) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : /^\d/.test(w)
          ? w.toUpperCase()
          : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
}

function formatBDT(n: number) {
  return `৳${n.toLocaleString("en-US")}`;
}

/* ---------------------------------------------------------------- helpers */
// Every variant sharing a slug is one product family (e.g. all ChatGPT Plus
// tiers). The cheapest variant anchors the hero price and the page title.
function familyFor(slug: string) {
  const matches = products.filter((p) => p.slug === slug);
  // When a family mixes approved offers with explicitly unverified/pending
  // variants, publish only the approved variants. This keeps legacy catalog
  // records available to governance tooling without turning them into live
  // purchase options. Families with no governance metadata retain their
  // historical behaviour until Catalog Domain V2 takes ownership.
  const approved = matches.filter(
    (p) => p.commercialStatus === "approved" && !/^UNVERIFIED/i.test(p.accessModel || "")
  );
  return approved.length ? approved : matches;
}

// Keep in sync with familyDisplayName() in scripts/gen-product-routes.mjs — the
// <h1> here and the <title> generated there must name the product identically.
//
// `brand` is too coarse to show ("Adobe" for Firefly, "Bundles" for every
// package), so the name comes from the product names themselves: the shared
// prefix across variants, or the part before the tier separator for one variant.
const TRAIL = /[\s—–:\-]+$/;

function familyDisplayName(variants: CatalogProduct[]) {
  const names = variants.map((v) => v.name);
  if (names.length > 1) {
    const split = names.map((n) => n.split(/\s+/));
    const head: string[] = [];
    for (let i = 0; i < split[0].length; i++) {
      if (split.every((s) => s[i] === split[0][i])) head.push(split[0][i]);
      else break;
    }
    const prefix = head.join(" ").replace(TRAIL, "").trim();
    if (prefix.length >= 3) return prefix;
  }
  const lead = names[0].split(/\s+[—–]\s+/)[0].replace(TRAIL, "").trim();
  return lead.length >= 3 ? lead : names[0];
}

function whatsappHref(p: CatalogProduct) {
  const base = p.whatsappMsg || `Hi! I want ${p.name}${p.priceOnRequest ? "" : ` (${formatBDT(p.price)}/mo)`}`;
  return `${config.whatsappUrl}?text=${encodeURIComponent(`${base} — please share payment details.`)}`;
}

const UNSAFE_PUBLIC_PROMISE = /(warranty|guarantee|replacement|delivery|within\s+\d+|24\/7|instant|trusted|served since|most customers|official provider requires|shared plan safe|private from other users|productivity gains|most students)/i;
const UNSAFE_PUBLIC_PROMISE_BN = /(ওয়ারেন্টি|ওয়ারেন্টি|ডেলিভারি|প্রতিস্থাপন|গ্যারান্টি|মিনিট|ঘণ্টা|ঘন্টা)/i;

function safePublicCopy(value?: string) {
  if (!value) return undefined;
  return UNSAFE_PUBLIC_PROMISE.test(value) || UNSAFE_PUBLIC_PROMISE_BN.test(value) ? undefined : value;
}

function normalizeFaq(faq: CatalogFaq) {
  const question = (faq.question || faq.q || "").trim();
  const answer = (faq.answer || faq.a || "").trim();
  if (!question || !answer) return null;
  if (!safePublicCopy(`${question} ${answer}`)) return null;
  return { question, answer };
}

function planHighlights(p: CatalogProduct) {
  const nested = p.plans?.find(
    (plan) => plan.planName?.trim().toLowerCase() === p.tier?.trim().toLowerCase()
  );
  return nested?.whatsIncluded ?? p.capabilities?.map(capabilityLabel) ?? [];
}

function buildFaqs(family: CatalogProduct[], name: string) {
  const authored = family
    .flatMap((p) => p.faq ?? [])
    .map(normalizeFaq)
    .filter((faq): faq is { question: string; answer: string } => faq !== null);
  const priced = family.filter((p) => !p.priceOnRequest);
  const generated = [
    { question: `How much does ${name} cost in Bangladesh?`, answer: priced.length ? `${name} currently starts at ${formatBDT(Math.min(...priced.map((p) => p.price)))} per month on the public catalog. Confirm the exact plan and current price before payment.` : `Public pricing for ${name} is currently price-on-request. Ask on WhatsApp and confirm the current rate before payment.` },
    { question: `How do I order ${name}?`, answer: `Ask on WhatsApp. Before payment we confirm the approved access model, current price, availability, fulfillment timing and applicable support terms for the specific offer.` },
    { question: `What access model will I receive?`, answer: `The access model varies by product and offer. We confirm whether the approved method is a customer-owned account, workspace seat or another supported model before payment.` },
    { question: `What happens if there is an access issue?`, answer: `Contact WhatsApp support with your order details. Recovery, replacement, refund or service-credit eligibility is assessed against the terms confirmed for that order and applicable law.` },
  ];
  return dedupeFaq([...authored, ...generated]);
}

function dedupeFaq(items: { question: string; answer: string }[]) {
  const seen = new Set<string>();
  return items.filter((f) => {
    const k = f.question.trim().toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// The catalog stores use cases as plain Bangla strings. UseCaseCards wants a
// richer shape, so the string becomes the title and the rest stays empty rather
// than being padded with invented detail.
function toUseCases(raw: string[], name: string): UseCase[] {
  const EMOJI = ["🎓", "💼", "📱", "⚡", "✍️", "📊", "🎬", "🔍"];
  return raw.slice(0, 6).map((u, i) => ({
    emoji: EMOJI[i % EMOJI.length],
    title: u,
    who: "",
    what: `${name} can support this workflow depending on the provider features available to your plan.`,
    timeSaved: "",
    examplePrompt: "",
  }));
}

/* ------------------------------------------------------------------- page */
export default function ProductDetail() {
  const [, params] = useRoute("/tools/:slug");
  const slug = params?.slug ?? "";
  const heroRef = useRef<HTMLElement>(null);

  const family = useMemo(() => familyFor(slug), [slug]);

  // Hooks must run before any early return, so the metadata falls back to safe
  // strings when the slug doesn't resolve.
  const anchor = family.length ? family.reduce((a, b) => (a.price <= b.price ? a : b)) : null;
  const familyName = anchor ? familyDisplayName(family) : "AI Tools";
  const startPrice = family.filter((p) => !p.priceOnRequest);

  usePageMeta({
    // Must produce the same string as buildMeta() in scripts/gen-product-routes.mjs.
    // The server ships that title in the HTML and this hook overwrites it on
    // mount; if the two disagree, a crawler can record a different title than
    // the one the page settles on.
    title: anchor
      ? startPrice.length
        ? `${familyName} Price in Bangladesh — from ${formatBDT(Math.min(...startPrice.map((p) => p.price)))}/mo`
        : `${familyName} in Bangladesh — Pricing & Plans`
      : "AI Tools in Bangladesh",
    description: anchor
      ? `${familyName} in Bangladesh. ${startPrice.length ? `Public catalog pricing starts at ${formatBDT(Math.min(...startPrice.map((p) => p.price)))}/month. ` : "Pricing is confirmed on request. "}Current access model, availability, fulfillment timing and support terms are confirmed before purchase.`
      : undefined,
    path: `/tools/${slug}`,
  });

  if (!anchor) return <NotFound />;

  const accent = anchor.brandColor || BRAND.blue;
  const onAccent = bestTextOn(accent);
  const faqs = buildFaqs(family, familyName);
  const useCaseStrings = Array.from(new Set(family.flatMap((p) => p.useCases ?? [])));
  const capabilities = Array.from(new Set(family.flatMap((p) => p.capabilities ?? [])));
  const usps = Array.from(new Set(family.flatMap((p) => p.uniqueSellingPoints ?? []))).filter((item) => Boolean(safePublicCopy(item)));
  const bnBlurb = safePublicCopy(family.find((p) => p.descriptionBN)?.descriptionBN);
  const whyBN = safePublicCopy(family.find((p) => p.whyBuyBN)?.whyBuyBN);

  const related = products
    .filter((p) => p.category === anchor.category && p.slug !== slug)
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 6);

  const sorted = [...family].sort((a, b) => a.price - b.price);

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "All Products", path: "/all-products" },
          { name: familyName, path: `/tools/${slug}` },
        ]}
      />
      {startPrice.length > 0 && (
        <ProductSchema
          name={familyName}
          description={`${familyName} in Bangladesh. Current access model, availability, fulfillment timing and support terms are confirmed before purchase.`}
          priceBDT={Math.min(...startPrice.map((p) => p.price))}
          brand={anchor.brand}
          category={anchor.category}
          path={`/tools/${slug}`}
        />
      )}

      {/* ---------------------------------------------------------- hero */}
      <section ref={heroRef} className="py-16 md:py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="mb-6 flex flex-wrap items-center gap-2" style={{ fontSize: "0.78rem", color: BRAND.navy, opacity: 0.55 }} aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/all-products" className="hover:underline">All Products</Link>
            <span>/</span>
            <span style={{ fontWeight: 600, opacity: 0.85 }}>{familyName}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5" style={{ background: `${accent}15`, color: accent, fontSize: "0.72rem", fontWeight: 600 }}>
                <Sparkles size={12} /> {categoryLabel(anchor.category)}
                {anchor.provider ? <span style={{ opacity: 0.7 }}>· by {anchor.provider}</span> : null}
              </div>

              <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.12 }}>
                {familyName} <span style={{ color: accent }}>in Bangladesh</span>
              </h1>

              <p className="mt-4 max-w-xl" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "1rem", lineHeight: 1.7 }}>
                {safePublicCopy(anchor.description) || `${familyName} plan details are confirmed against the current catalog before purchase.`}
              </p>

              {bnBlurb && (
                <p className="mt-3 max-w-xl" lang="bn" style={{ color: BRAND.navy, opacity: 0.62, fontSize: "0.95rem", lineHeight: 1.85 }}>
                  {bnBlurb}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ fontSize: "0.82rem", color: BRAND.navy, opacity: 0.65 }}>
                <span className="inline-flex items-center gap-1.5"><Clock size={14} color={accent} /> Timing confirmed before payment</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} color={accent} /> Support terms confirmed before payment</span>
                <span className="inline-flex items-center gap-1.5"><Check size={14} color={accent} strokeWidth={3} /> bKash · Nagad · Bank</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref(anchor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(familyName, anchor.tier || "hero", formatBDT(anchor.price), `product-${slug}`)}
                  data-testid="button-wa-hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5"
                  style={{ background: "#25D366", color: "#fff", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <WhatsAppIcon size={16} color="#fff" /> Order on WhatsApp
                </a>
                <a
                  href={config.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMessengerClick(familyName, `product-${slug}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5"
                  style={{ background: "#0084FF", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <MessageCircle size={15} color="#fff" /> Messenger
                </a>
              </div>
            </div>

            {/* price card */}
            <div className="rounded-2xl p-7" style={{ background: BRAND.white, border: `1px solid ${accent}22`, boxShadow: `0 8px 32px ${accent}14` }}>
              <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.76rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {anchor.priceOnRequest ? "Pricing" : "Starting from"}
              </p>
              {anchor.priceOnRequest ? (
                <p className="mt-2" style={{ color: BRAND.navy, fontSize: "1.4rem", fontWeight: 700 }}>Request price on WhatsApp</p>
              ) : (
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span style={{ color: BRAND.navy, fontSize: "2.6rem", fontWeight: 700, lineHeight: 1 }}>{formatBDT(anchor.price)}</span>
                  <span style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem" }}>/month</span>
                </p>
              )}
              {anchor.officialUSD ? (
                <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.78rem" }}>
                  Official reference price ${anchor.officialUSD}/mo — provider billing and taxes can vary by account and region
                </p>
              ) : null}

              <div className="mt-6 h-px" style={{ background: `${BRAND.navy}12` }} />

              <p className="mt-5" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.8rem", fontWeight: 600 }}>
                {sorted.length} plan{sorted.length === 1 ? "" : "s"} available
              </p>
              <ul className="mt-3 space-y-2">
                {sorted.slice(0, 5).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3" style={{ fontSize: "0.82rem" }}>
                    <span style={{ color: BRAND.navy, opacity: 0.7 }}>{p.tier || p.name}</span>
                    <span style={{ color: BRAND.navy, fontWeight: 600 }}>
                      {p.priceOnRequest ? "On request" : `${formatBDT(p.price)}/mo`}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="#plans" className="mt-5 inline-flex items-center gap-1" style={{ color: accent, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
                Compare all plans <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- plans */}
      <section id="plans" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 style={{ color: BRAND.navy, fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 700 }}>
            {familyName} plans &amp; pricing
          </h2>
          <p className="mt-2 max-w-2xl" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.92rem", lineHeight: 1.7 }}>
            Choose from the currently published plan options. We confirm the current price, approved access model, availability and fulfillment timing before payment.
          </p>

          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((p) => (
              <div
                key={p.id}
                className="relative flex flex-col rounded-2xl p-7"
                style={{
                  background: BRAND.white,
                  border: p.featured ? `2px solid ${accent}` : `1px solid ${BRAND.navy}0F`,
                  boxShadow: p.featured ? `0 8px 32px ${accent}18` : undefined,
                }}
              >
                {p.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1"
                    style={{ background: accent, color: onAccent, fontSize: "0.67rem", fontWeight: 600 }}
                  >
                    {p.badge}
                  </span>
                )}

                <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.76rem", fontWeight: 600 }}>{p.tier || p.name}</p>
                <p className="mt-1" style={{ color: BRAND.navy, fontSize: p.priceOnRequest ? "1.15rem" : "2rem", fontWeight: 700, lineHeight: 1.15 }}>
                  {p.priceOnRequest ? "Request price" : formatBDT(p.price)}
                  {!p.priceOnRequest && <span style={{ fontSize: "0.85rem", fontWeight: 500, opacity: 0.5 }}>/mo</span>}
                </p>

                <p className="mt-2.5 flex items-center gap-1.5" style={{ color: accent, fontSize: "0.75rem", fontWeight: 500 }}>
                  <Clock size={12} /> Fulfillment timing confirmed before payment
                </p>

                <p className="mt-4" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.84rem", lineHeight: 1.65 }}>
                  {safePublicCopy(p.description) || `${familyName} plan details are confirmed before purchase.`}
                </p>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {planHighlights(p)
                    .slice(0, 5)
                    .map((f, i) => (
                      <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: BRAND.navy, opacity: 0.65 }}>
                        <Check size={13} color={accent} className="mt-0.5 shrink-0" strokeWidth={3} /> {f}
                      </li>
                    ))}
                </ul>

                <a
                  href={whatsappHref(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(familyName, p.tier || p.name, formatBDT(p.price), `product-${slug}`)}
                  data-testid={`button-wa-${p.id}`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3"
                  style={{ background: "#25D366", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <WhatsAppIcon size={14} color="#fff" /> Order this plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ features */}
      {capabilities.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: BRAND.sky }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 style={{ color: BRAND.navy, fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 700 }}>
              What you can do with {familyName}
            </h2>
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map((c) => {
                const meta = CAPABILITY_META[c];
                const Icon = meta?.icon ?? Sparkles;
                return (
                  <div key={c} className="rounded-2xl p-6" style={{ background: BRAND.white, border: `1px solid ${BRAND.navy}0F` }}>
                    <div className="inline-flex items-center justify-center rounded-xl mb-4" style={{ width: 40, height: 40, background: `${accent}15` }}>
                      <Icon size={19} color={accent} strokeWidth={1.9} />
                    </div>
                    <p style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 600 }}>
                      {capabilityLabel(c)}
                    </p>
                    {meta?.desc && (
                      <p className="mt-1.5" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.84rem", lineHeight: 1.65 }}>
                        {meta.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ use cases */}
      {useCaseStrings.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="mb-9" style={{ color: BRAND.navy, fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 700 }}>
              Potential workflows in Bangladesh
            </h2>
            <UseCaseCards useCases={toUseCases(useCaseStrings, familyName)} productName={familyName} />
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- why */}
      {(usps.length > 0 || whyBN) && (
        <section className="py-16 md:py-20" style={{ background: BRAND.sky }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 style={{ color: BRAND.navy, fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 700 }}>
              Why buy {familyName} from AI Team Premium
            </h2>
            {whyBN && (
              <p className="mt-3 max-w-2xl" lang="bn" style={{ color: BRAND.navy, opacity: 0.62, fontSize: "0.95rem", lineHeight: 1.85 }}>
                {whyBN}
              </p>
            )}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(usps.length
                ? usps
                : [
                    "Pay with bKash, Nagad or bank transfer — no international card required",
                    "Fulfillment timing is confirmed before payment for the selected offer",
                    "Applicable support and recovery terms confirmed before payment",
                    "Current access model and availability are confirmed before payment",
                  ]
              ).map((u, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl p-5" style={{ background: BRAND.white, border: `1px solid ${BRAND.navy}0F` }}>
                  <Check size={16} color={accent} className="mt-0.5 shrink-0" strokeWidth={3} />
                  <span style={{ color: BRAND.navy, opacity: 0.7, fontSize: "0.88rem", lineHeight: 1.6 }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- FAQ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <h2 className="mb-8" style={{ color: BRAND.navy, fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 700 }}>
            {familyName} — frequently asked questions
          </h2>
          <SearchableFAQ faqs={faqs} productName={familyName} />
        </div>
      </section>

      {/* --------------------------------------------------------- trust */}
      <TrustAndBuySection />

      {/* ------------------------------------------------------- related */}
      {related.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: BRAND.sky }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 style={{ color: BRAND.navy, fontSize: "clamp(1.2rem, 2.6vw, 1.6rem)", fontWeight: 700 }}>
              Other {categoryLabel(anchor.category).toLowerCase()} we supply
            </h2>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/tools/${r.slug}`}
                  className="block rounded-2xl p-6 transition-shadow hover:shadow-lg"
                  style={{ background: BRAND.white, border: `1px solid ${BRAND.navy}0F`, textDecoration: "none" }}
                >
                  <p style={{ color: r.brandColor || BRAND.blue, fontSize: "0.72rem", fontWeight: 600 }}>{r.brand}</p>
                  <p className="mt-1.5" style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 600 }}>{r.name}</p>
                  <p className="mt-2 line-clamp-2" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.82rem", lineHeight: 1.6 }}>
                    {safePublicCopy(r.description) || "Current offer details are confirmed before purchase."}
                  </p>
                  <p className="mt-3" style={{ color: BRAND.navy, fontWeight: 600, fontSize: "0.88rem" }}>
                    {r.priceOnRequest ? "Price on request" : `${formatBDT(r.price)}/mo`}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
