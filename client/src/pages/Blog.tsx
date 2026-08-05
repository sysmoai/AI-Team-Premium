import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon, THEME_COLORS } from "@/components/brand/LogoIcons";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { Link } from "wouter";
import { Clock, ArrowRight, MessageCircle, BookOpen, Zap } from "lucide-react";
import { config } from "@/lib/config";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";
import { BLOG_POSTS } from "@/data/blog-posts";
import { categorySlug } from "@/pages/BlogCategory";

const CATEGORIES = Array.from(new Set(BLOG_POSTS.map((p) => p.category)))
  .map((name) => ({ name, slug: categorySlug(name), count: BLOG_POSTS.filter((p) => p.category === name).length }))
  .sort((a, b) => b.count - a.count);

const CATEGORY_ICONS: Record<string, string> = {
  "Buying Guides": "🛍️",
  "For Students": "🎓",
  "For Freelancers": "💼",
  "For Businesses": "🏢",
  "Tool Comparisons": "⚖️",
  "Learning & Tutorials": "📚",
  "News & Updates": "📰",
  "AI Tips": "💡",
};

export default function Blog() {
  const { isDark } = useDarkMode();

  usePageMeta({
    title: "AI Blog — Guides for Bangladesh",
    description: "Practical guides on ChatGPT, Claude, Gemini and AI tools for Bangladeshi students, freelancers and businesses — pricing, comparisons, and how to pay via bKash/Nagad.",
    path: "/blog",
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AI Team Premium Blog",
    "url": "https://www.aiteampremium.com/blog",
    "description": "Practical AI subscription and AI learning guides for Bangladesh.",
    "blogPost": BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `https://www.aiteampremium.com/blog/${p.slug}`,
      "datePublished": p.publishedDate,
    })),
  };

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <JsonLd data={blogSchema} />

      <section className="py-20 md:py-28" style={{ background: THEME_COLORS.sectionBg(isDark) }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={28} color={BRAND.blue} />
            <p className="uppercase" style={{ color: BRAND.blue, fontSize: "0.75rem", letterSpacing: "0.15em", fontWeight: 700 }}>Knowledge Base</p>
          </div>
          <div className="text-center">
            <h1 style={{ color: THEME_COLORS.heading(isDark), fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
              AI Guides, Tools & Learning for Bangladesh
            </h1>
            <p className="max-w-3xl mx-auto" style={{ color: THEME_COLORS.text(isDark), fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              Real, practical guides — not generic hype. Written for students, freelancers and businesses figuring out which AI tool to use, how much it costs, and how to pay for it in BDT.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div style={{ background: THEME_COLORS.cardBg(isDark), padding: "1rem 1.5rem", borderRadius: "0.75rem", border: `1px solid ${THEME_COLORS.border(isDark)}` }}>
                <p style={{ color: BRAND.blue, fontSize: "1.5rem", fontWeight: 700 }}>50+</p>
                <p style={{ color: THEME_COLORS.textMuted(isDark), fontSize: "0.85rem" }}>Quality Guides</p>
              </div>
              <div style={{ background: THEME_COLORS.cardBg(isDark), padding: "1rem 1.5rem", borderRadius: "0.75rem", border: `1px solid ${THEME_COLORS.border(isDark)}` }}>
                <p style={{ color: BRAND.blue, fontSize: "1.5rem", fontWeight: 700 }}>12+</p>
                <p style={{ color: THEME_COLORS.textMuted(isDark), fontSize: "0.85rem" }}>Categories</p>
              </div>
              <div style={{ background: THEME_COLORS.cardBg(isDark), padding: "1rem 1.5rem", borderRadius: "0.75rem", border: `1px solid ${THEME_COLORS.border(isDark)}` }}>
                <p style={{ color: BRAND.blue, fontSize: "1.5rem", fontWeight: 700 }}>Free</p>
                <p style={{ color: THEME_COLORS.textMuted(isDark), fontSize: "0.85rem" }}>No Signup</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Category navigation */}
      <section className="py-8 sticky top-0 z-20" style={{ background: THEME_COLORS.sectionBg(isDark), borderBottom: `1px solid ${THEME_COLORS.border(isDark)}` }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className="mb-4 text-sm font-semibold" style={{ color: THEME_COLORS.textMuted(isDark) }}>Browse by Topic</p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all hover-elevate"
                style={{
                  background: THEME_COLORS.cardBg(isDark),
                  border: `1.5px solid ${THEME_COLORS.border(isDark)}`,
                  color: THEME_COLORS.heading(isDark),
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
                data-testid={`link-blog-category-${c.slug}`}
              >
                <span>{CATEGORY_ICONS[c.name] || "📄"}</span>
                {c.name}
                <span style={{ background: BRAND.blue, color: BRAND.white, borderRadius: "0.25rem", padding: "0.2rem 0.5rem", fontSize: "0.75rem", fontWeight: 700 }}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }} data-testid={`card-blog-${post.slug}`}>
                <div className="rounded-2xl p-6 h-full flex flex-col hover-elevate card-lift transition-all cursor-pointer" style={{
                  background: THEME_COLORS.cardBg(isDark),
                  border: `1px solid ${THEME_COLORS.border(isDark)}`
                }}>
                  <div className="text-4xl mb-4">{post.heroEmoji}</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex rounded-lg px-3 py-1" style={{
                      background: THEME_COLORS.sectionBg(isDark),
                      color: BRAND.blue,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.03em"
                    }}>
                      {post.category}
                    </span>
                    {post.subcategory && (
                      <span className="inline-flex rounded-lg px-3 py-1" style={{
                        background: `${BRAND.blue}15`,
                        color: BRAND.blue,
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.03em"
                      }}>
                        {post.subcategory}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-3" style={{ color: THEME_COLORS.heading(isDark), fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4 }}>
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1" style={{ color: THEME_COLORS.text(isDark), fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.8 }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: `1px solid ${THEME_COLORS.border(isDark)}` }}>
                    <span className="flex items-center gap-1.5" style={{ color: THEME_COLORS.textMuted(isDark), fontSize: "0.8rem" }}>
                      <Clock size={14} /> {post.readMinutes} min
                    </span>
                    <span className="flex items-center gap-1" style={{ color: BRAND.blue, fontSize: "0.85rem", fontWeight: 600 }}>
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "#0F172A" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 p-3" style={{ background: "rgba(37,99,235,0.1)", borderRadius: "0.75rem" }}>
            <Zap size={18} color={BRAND.blue} />
            <span style={{ color: BRAND.blue, fontSize: "0.85rem", fontWeight: 600 }}>Need Personal Guidance?</span>
          </div>
          <h2 style={{ color: "#FFFFFF", fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>
            Book a Live AI Coaching Session
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Get Bangla-language guidance from AI experts — personalized for your needs, starting from ৳799/hour. Perfect for students, freelancers, and teams.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "blog-index-cta")}
              data-testid="button-blog-cta-whatsapp"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-semibold text-white transition-all hover:scale-105"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> Message on WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick(undefined, "blog-index-cta")}
              data-testid="button-blog-cta-messenger"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-semibold text-white transition-all hover:scale-105"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={18} color="#fff" /> Chat on Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
