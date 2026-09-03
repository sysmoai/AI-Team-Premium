import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon, THEME_COLORS } from "@/components/brand/LogoIcons";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema, FAQSchema, JsonLd } from "@/components/seo/JsonLd";
import { Link, useLocation, useParams } from "wouter";
import { Clock, Calendar, MessageCircle, ArrowRight, Bookmark, ShieldAlert } from "lucide-react";
import { config } from "@/lib/config";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";
import { BLOG_POSTS, getBlogPost } from "@/data/blog-posts";
import { categorySlug } from "@/pages/BlogCategory";
import { QUARANTINED_BLOG_SLUGS } from "@shared/content-quarantine.js";

const SITE_URL = "https://www.aiteampremium.com";

export default function BlogPost() {
  const { isDark } = useDarkMode();
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);
  const quarantined = Boolean(slug && QUARANTINED_BLOG_SLUGS.has(slug));
  const [, setLocation] = useLocation();

  usePageMeta({
    title: quarantined ? "Guide Under Evidence Review" : post ? post.title : "Blog Post Not Found",
    description: quarantined
      ? "This guide is temporarily under evidence review. Commercial, pricing and provider-policy claims are being re-verified before republication."
      : post
        ? post.excerpt
        : "This blog post could not be found.",
    path: post ? `/blog/${post.slug}` : "/blog",
  });

  useEffect(() => {
    if (!quarantined) return;

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    const previous = robots?.content ?? "";
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, follow";

    return () => {
      if (!robots) return;
      if (created) robots.remove();
      else robots.content = previous;
    };
  }, [quarantined]);

  if (!post) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post not found</h1>
          <button onClick={() => setLocation("/blog")} className="mt-6 inline-flex items-center gap-1 font-semibold" style={{ color: THEME_COLORS.accent(isDark) }}>
            Back to Blog <ArrowRight size={16} />
          </button>
        </div>
      </Layout>
    );
  }

  if (quarantined) {
    return (
      <Layout>
        <section className="py-20 md:py-28" style={{ background: THEME_COLORS.sectionBg(isDark) }}>
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: THEME_COLORS.cardBg(isDark), border: `1px solid ${THEME_COLORS.border(isDark)}` }}>
              <ShieldAlert size={26} color={THEME_COLORS.accent(isDark)} />
            </div>
            <h1 style={{ color: THEME_COLORS.heading(isDark), fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2 }}>
              Guide under evidence review
            </h1>
            <p className="mx-auto mt-5 max-w-2xl" style={{ color: THEME_COLORS.text(isDark), fontSize: "1rem", lineHeight: 1.8 }}>
              We temporarily removed this article's commercial, pricing and provider-policy guidance while we re-verify it against current provider rules and AI Team Premium's approved operating evidence. We will republish only after those claims are supported.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => setLocation("/blog")} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white" style={{ background: BRAND.blue }}>
                Back to Blog <ArrowRight size={16} />
              </button>
              <a href="/access-types" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold" style={{ color: THEME_COLORS.accent(isDark), border: `1px solid ${THEME_COLORS.border(isDark)}` }}>
                Review access types
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "url": `${SITE_URL}/blog/${post.slug}`,
    "datePublished": post.publishedDate,
    "dateModified": post.publishedDate,
    "inLanguage": post.lang === "bn" ? "bn-BD" : "en",
    "author": { "@type": "Organization", "name": "AI Team Premium" },
    "publisher": {
      "@type": "Organization",
      "name": "AI Team Premium",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.png` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  const idx = Math.max(0, BLOG_POSTS.findIndex((p) => p.slug === post.slug));
  const rotate = (arr: typeof BLOG_POSTS) =>
    arr.length ? arr.slice(idx % arr.length).concat(arr.slice(0, idx % arr.length)) : arr;

  const eligibleRelated = BLOG_POSTS.filter((p) => !QUARANTINED_BLOG_SLUGS.has(p.slug));
  const sameCategory = rotate(
    eligibleRelated.filter((p) => p.slug !== post.slug && p.category === post.category)
  );
  const otherCategory = rotate(
    eligibleRelated.filter((p) => p.slug !== post.slug && p.category !== post.category)
  );
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
      <JsonLd data={articleSchema} />
      <FAQSchema items={post.faqs} />

      <section className="py-14 md:py-20" style={{ background: THEME_COLORS.sectionBg(isDark) }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            href={`/blog/category/${categorySlug(post.category)}`}
            className="inline-flex rounded-lg px-3 py-1.5 mb-5 hover-elevate transition-all"
            style={{
              background: THEME_COLORS.cardBg(isDark),
              color: THEME_COLORS.accent(isDark),
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textDecoration: "none",
              border: `1px solid ${THEME_COLORS.border(isDark)}`
            }}
            data-testid="link-post-category"
          >
            ← {post.category}
          </Link>
          <h1 style={{ color: THEME_COLORS.heading(isDark), fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            {post.heroEmoji} {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4" style={{ color: THEME_COLORS.textMuted(isDark), fontSize: "0.9rem" }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {post.readMinutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Bookmark size={16} />
              {post.subcategory || "General"}
            </span>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10" lang={post.lang === "bn" ? "bn" : undefined}>
          <p style={{ color: THEME_COLORS.text(isDark), fontSize: "1.05rem", lineHeight: 1.9, fontWeight: 500, marginBottom: "2rem" }}>
            {post.excerpt}
          </p>

          <div className="mt-10 space-y-12">
            {post.sections.map((section, i) => (
              <div key={i}>
                <h2 style={{ color: THEME_COLORS.heading(isDark), fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((para, j) => (
                    <p key={j} style={{ color: THEME_COLORS.text(isDark), fontSize: "0.95rem", lineHeight: 1.85 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl p-7 md:p-8" style={{ background: THEME_COLORS.sectionBg(isDark), border: `1px solid ${THEME_COLORS.border(isDark)}` }}>
            <div className="flex items-start gap-3 mb-3">
              <Bookmark size={22} color={THEME_COLORS.accent(isDark)} />
              <h3 style={{ color: THEME_COLORS.heading(isDark), fontSize: "1.15rem", fontWeight: 700 }}>Need help choosing an access model?</h3>
            </div>
            <p style={{ color: THEME_COLORS.text(isDark), fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Message us for the current governed options, availability and support details. We will confirm the exact access model and current commercial terms before you purchase.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={config.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(undefined, undefined, undefined, `blog-post-${post.slug}`)}
                data-testid="button-blog-post-whatsapp"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white text-sm"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> WhatsApp
              </a>
              <a
                href={config.messenger}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMessengerClick(undefined, `blog-post-${post.slug}`)}
                data-testid="button-blog-post-messenger"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white text-sm"
                style={{ background: "#0084FF" }}
              >
                <MessageCircle size={16} color="#fff" /> Messenger
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-5 text-slate-900 dark:text-white" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Frequently Asked Questions</h3>
            <div className="space-y-3">
              {post.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <h4 style={{ color: BRAND.navy, fontSize: "0.92rem", fontWeight: 600 }}>{faq.q}</h4>
                  <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.85rem", lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16" style={{ background: BRAND.sky }}>
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-center mb-10" style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>More Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }} data-testid={`card-related-${p.slug}`}>
                  <div className="rounded-2xl p-6 h-full hover-elevate transition-all cursor-pointer" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                    <div className="text-2xl mb-3">{p.heroEmoji}</div>
                    <h3 style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.4 }}>{p.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1" style={{ color: THEME_COLORS.accent(isDark), fontSize: "0.78rem", fontWeight: 600 }}>
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
