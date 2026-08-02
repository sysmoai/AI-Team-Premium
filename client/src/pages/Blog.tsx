import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { Link } from "wouter";
import { Clock, ArrowRight, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";
import { BLOG_POSTS } from "@/data/blog-posts";
import { categorySlug } from "@/pages/BlogCategory";

const CATEGORIES = Array.from(new Set(BLOG_POSTS.map((p) => p.category)))
  .map((name) => ({ name, slug: categorySlug(name), count: BLOG_POSTS.filter((p) => p.category === name).length }))
  .sort((a, b) => b.count - a.count);

export default function Blog() {
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

      <section className="py-16" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>AI Blog</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15 }}>
            Guides on AI Tools, Pricing & Learning for Bangladesh
          </h1>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Real, practical guides — not generic AI hype — for students, freelancers and businesses in Bangladesh figuring out which AI tool to use and how to pay for it.
          </p>
        </div>
      </section>


      {/* Category bar. The 50 posts already carried a category, but it rendered
          as inert text with nowhere to go — so the blog was a flat list of 50
          items with no topical structure and no page that could rank for a
          topic. These links give each hub an inbound link from the index. */}
      <section className="pb-2">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all hover-elevate"
                style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.12)", color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
                data-testid={`link-blog-category-${c.slug}`}
              >
                {c.name}
                <span style={{ color: BRAND.blue, opacity: 0.7 }}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }} data-testid={`card-blog-${post.slug}`}>
                <div className="rounded-2xl p-6 h-full flex flex-col hover-elevate transition-all cursor-pointer" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                  <div className="text-3xl mb-4">{post.heroEmoji}</div>
                  <span className="inline-flex self-start rounded-full px-3 py-1 mb-3" style={{ background: BRAND.sky, color: BRAND.blue, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                    {post.category}
                  </span>
                  <h2 className="mb-2" style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.4 }}>{post.title}</h2>
                  <p className="mb-4 flex-1" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.85rem", lineHeight: 1.6 }}>{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(37,99,235,0.06)" }}>
                    <span className="flex items-center gap-1.5" style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.75rem" }}>
                      <Clock size={12} /> {post.readMinutes} min read
                    </span>
                    <span className="flex items-center gap-1" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <h2 style={{ color: BRAND.white, fontSize: "1.6rem", fontWeight: 700 }}>Want personal AI guidance instead of reading?</h2>
          <p className="mt-3 mb-8" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Book a live, Bangla-language AI coaching session — from ৳799/hour.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "blog-index-cta")}
              data-testid="button-blog-cta-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-sm"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={17} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick(undefined, "blog-index-cta")}
              data-testid="button-blog-cta-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-sm"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={17} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
