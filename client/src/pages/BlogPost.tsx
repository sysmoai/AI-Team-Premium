import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema, FAQSchema, JsonLd } from "@/components/seo/JsonLd";
import { Link, useLocation, useParams } from "wouter";
import { Clock, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { config } from "@/lib/config";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";
import { BLOG_POSTS, getBlogPost } from "@/data/blog-posts";

const SITE_URL = "https://www.aiteampremium.com";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);
  const [, setLocation] = useLocation();

  usePageMeta({
    title: post ? post.title : "Blog Post Not Found",
    description: post ? post.excerpt : "This blog post could not be found.",
    path: post ? `/blog/${post.slug}` : "/blog",
  });

  if (!post) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post not found</h1>
          <button onClick={() => setLocation("/blog")} className="mt-6 inline-flex items-center gap-1 font-semibold" style={{ color: BRAND.blue }}>
            Back to Blog <ArrowRight size={16} />
          </button>
        </div>
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

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
      <JsonLd data={articleSchema} />
      <FAQSchema items={post.faqs} />

      <section className="py-14" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <span className="inline-flex rounded-full px-3 py-1 mb-4" style={{ background: BRAND.white, color: BRAND.blue, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em" }}>
            {post.category}
          </span>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25 }}>
            {post.heroEmoji} {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-5" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem" }}>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readMinutes} min read</span>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-10" lang={post.lang === "bn" ? "bn" : undefined}>
          <p className="text-slate-900/75 dark:text-slate-300" style={{ fontSize: "1.02rem", lineHeight: 1.8, fontWeight: 500 }}>
            {post.excerpt}
          </p>

          <div className="mt-10 space-y-10">
            {post.sections.map((section, i) => (
              <div key={i}>
                <h2 className="mb-4 text-slate-900 dark:text-white" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{section.heading}</h2>
                <div className="space-y-3">
                  {section.body.map((para, j) => (
                    <p key={j} className="text-slate-900/70 dark:text-slate-300" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl p-7" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }}>
            <h3 style={{ color: BRAND.navy, fontSize: "1.1rem", fontWeight: 700 }}>Ready to get started?</h3>
            <p className="mt-2 mb-5" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.88rem", lineHeight: 1.6 }}>
              Message us on WhatsApp — pay via bKash/Nagad, get access in minutes.
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
                    <span className="mt-3 inline-flex items-center gap-1" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
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
