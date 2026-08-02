import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
  const posts = BLOG_POSTS.filter((p) => categorySlug(p.category) === slug);
  const name = posts[0]?.category ?? slug.replace(/-/g, " ");

  // No "| AI Team Premium" suffix here — usePageMeta appends it (see
  // use-page-meta.ts: `${title} | ${BASE}`). Including it produced
  // "… | AI Team Premium | AI Team Premium" in the real browser tab, which the
  // build could not catch because the generated route-meta entry (which does
  // carry the suffix, correctly, since it is injected server-side without
  // usePageMeta) looked right on its own.
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
          <h1 className="text-2xl font-bold" style={{ color: BRAND.navy }}>Category not found</h1>
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

      <section className="py-16 md:py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-6"
            style={{ color: BRAND.blue, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
            data-testid="link-back-to-blog"
          >
            <ArrowLeft size={14} /> All guides
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: BRAND.navy }}>
            {name}
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: BRAND.navy, opacity: 0.65 }}>
            {posts.length} {posts.length === 1 ? "guide" : "guides"} written for people using AI tools
            from Bangladesh — local payment methods, real prices, no signup needed.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
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
                  className="rounded-2xl p-6 h-full flex flex-col hover-elevate transition-all cursor-pointer"
                  style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}
                >
                  <div className="text-2xl mb-3">{post.heroEmoji}</div>
                  <h2
                    className="mb-2"
                    style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="flex-1"
                    style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.85rem", lineHeight: 1.6 }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1"
                    style={{ color: BRAND.blue, fontSize: "0.8rem", fontWeight: 600 }}
                  >
                    Read <ArrowRight size={12} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <h2 className="mb-6" style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 700 }}>
            Other topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all hover-elevate"
                style={{
                  background: BRAND.white,
                  border: "1px solid rgba(37,99,235,0.12)",
                  color: BRAND.navy,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                data-testid={`link-other-category-${c.slug}`}
              >
                {c.name}
                <span style={{ color: BRAND.blue, opacity: 0.7 }}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
