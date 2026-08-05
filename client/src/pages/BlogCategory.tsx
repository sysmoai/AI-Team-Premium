import { Layout } from "@/components/layout/Layout";
import { BRAND, THEME_COLORS } from "@/components/brand/LogoIcons";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Clock, BookOpen } from "lucide-react";

// Blog category hub.
//
// The 50 posts already carried a category field, but it rendered as inert text —
// no landing page, no filter, not even a link. The blog was a flat list of 50
// items with no topical structure, so a category holding 13 related posts had no
// page that could rank for that topic, and most posts had no reliable inbound
// internal link.
//
// Slug derivation is duplicated from scripts/gen-blog-routes.mjs deliberately:
// that script is a build-time Node ESM module and this is client TSX. The two
// must agree, so `npm run verify` cross-checks the routes this page can produce
// against the generated BLOG_CATEGORY_ROUTE_META rather than trusting them to
// stay in sync by discipline.
export const categorySlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

interface BlogCategoryProps {
  slug: string;
}

export default function BlogCategory({ slug }: BlogCategoryProps) {
  const { isDark } = useDarkMode();
  const posts = BLOG_POSTS.filter((p) => categorySlug(p.category) === slug);
  const name = posts[0]?.category ?? slug.replace(/-/g, " ");

  usePageMeta({
    title: `${name} — AI Guides for Bangladesh`,
    description: `${posts.length} ${posts.length === 1 ? "guide" : "guides"} on ${name.toLowerCase()} for Bangladesh — practical, locally relevant, written for bKash/Nagad users. Read free, no signup.`,
    path: `/blog/category/${slug}`,
  });

  // Other categories, for cross-navigation at the foot of the page. Sorted by
  // size so a reader lands on the substantial hubs first.
  const others = Array.from(new Set(BLOG_POSTS.map((p) => p.category)))
    .filter((c) => categorySlug(c) !== slug)
    .map((c) => ({ name: c, slug: categorySlug(c), count: BLOG_POSTS.filter((p) => p.category === c).length }))
    .sort((a, b) => b.count - a.count);

  if (posts.length === 0) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <h1 className="text-2xl font-bold" style={{ color: THEME_COLORS.heading(isDark) }}>Category not found</h1>
          <Link href="/blog" className="mt-4 inline-flex items-center gap-2" style={{ color: BRAND.blue, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to all guides
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name, path: `/blog/category/${slug}` },
        ]}
      />

      <section className="py-16 md:py-24" style={{ background: THEME_COLORS.sectionBg(isDark) }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-6 hover:gap-3 transition-all"
            style={{ color: BRAND.blue, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            data-testid="link-back-to-blog"
          >
            <ArrowLeft size={16} /> All guides
          </Link>
          <div className="flex items-start gap-3 mb-4">
            <BookOpen size={32} color={BRAND.blue} />
            <div>
              <h1 style={{ color: THEME_COLORS.heading(isDark), fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.1 }}>
                {name}
              </h1>
            </div>
          </div>
          <p style={{ color: THEME_COLORS.text(isDark), fontSize: "1rem", lineHeight: 1.7, maxWidth: "40rem" }}>
            {posts.length} {posts.length === 1 ? "guide" : "guides"} written for people using AI tools from Bangladesh — local payment methods, real prices, no signup needed.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
                data-testid={`card-category-post-${post.slug}`}
              >
                <article
                  className="rounded-2xl p-6 h-full flex flex-col hover-elevate card-lift transition-all cursor-pointer"
                  style={{
                    background: THEME_COLORS.cardBg(isDark),
                    border: `1px solid ${THEME_COLORS.border(isDark)}`
                  }}
                >
                  <div className="text-3xl mb-3">{post.heroEmoji}</div>
                  <h2
                    className="mb-3"
                    style={{ color: THEME_COLORS.heading(isDark), fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4 }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="flex-1 mb-4"
                    style={{ color: THEME_COLORS.text(isDark), fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.8 }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${THEME_COLORS.border(isDark)}` }}>
                    <span className="flex items-center gap-1" style={{ color: THEME_COLORS.textMuted(isDark), fontSize: "0.8rem" }}>
                      <Clock size={12} /> {post.readMinutes} min
                    </span>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ color: BRAND.blue, fontSize: "0.85rem", fontWeight: 600 }}
                    >
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14" style={{ background: THEME_COLORS.sectionBg(isDark) }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <h2 className="mb-6" style={{ color: THEME_COLORS.heading(isDark), fontSize: "1.2rem", fontWeight: 700 }}>
            📚 Explore Other Topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-all hover-elevate"
                style={{
                  background: THEME_COLORS.cardBg(isDark),
                  border: `1px solid ${THEME_COLORS.border(isDark)}`,
                  color: THEME_COLORS.heading(isDark),
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                data-testid={`link-other-category-${c.slug}`}
              >
                {c.name}
                <span style={{ background: BRAND.blue, color: BRAND.white, borderRadius: "0.25rem", padding: "0.2rem 0.5rem", fontSize: "0.75rem", fontWeight: 700 }}>
                  {c.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
