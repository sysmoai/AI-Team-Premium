import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { CANONICAL_MAP } from "@shared/canonical-map.js";

export default function EvidenceReviewPage() {
  const [location] = useLocation();
  const canonical = (CANONICAL_MAP as Record<string, string | undefined>)[location];
  const destination = canonical || "/all-products";

  usePageMeta({
    title: "Commercial Page Under Evidence Review",
    description: "This page is temporarily under evidence review. Current access model, availability, fulfillment timing and support terms are confirmed before purchase.",
    path: location,
  });

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previous = meta?.content;
    if (meta) meta.content = "noindex, follow";
    return () => {
      if (meta && previous) meta.content = previous;
    };
  }, []);

  return (
    <Layout>
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="uppercase mb-3" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700 }}>Evidence review</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.8rem,5vw,2.6rem)", fontWeight: 800 }}>This commercial page is being re-verified</h1>
          <p className="mt-5" style={{ color: BRAND.navy, opacity: 0.68, lineHeight: 1.8 }}>
            We are re-checking provider policy, access model, current availability, fulfillment timing and support terms before publishing commercial claims here again. The URL remains available so existing links are not broken.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={destination} className="rounded-full px-6 py-3 font-semibold text-white" style={{ background: BRAND.blue, textDecoration: "none" }}>{canonical ? "View current canonical page" : "Browse current catalog"}</Link>
            <Link href="/contact" className="rounded-full px-6 py-3 font-semibold" style={{ color: BRAND.navy, background: BRAND.white, textDecoration: "none", border: "1px solid rgba(15,23,42,.12)" }}>Contact us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
