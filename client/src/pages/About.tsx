import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function About() {
  usePageMeta({ title: "About AI Team Premium", description: "AI Team Premium is an independent Bangladesh-focused AI access and enablement platform. Commercial terms are confirmed before purchase.", path: "/about" });
  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="uppercase mb-3" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700 }}>About</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800 }}>AI access, evaluation and implementation support for Bangladesh</h1>
          <div className="mt-8 space-y-5" style={{ color: BRAND.navy, opacity: 0.72, lineHeight: 1.85 }}>
            <p>AI Team Premium is an independent Bangladesh-focused platform that helps people and businesses evaluate AI tools, coordinate locally supported ordering and payment steps, and get practical setup or implementation support.</p>
            <p>Before a purchase, we confirm the specific access model, current price, availability, fulfillment timing and any applicable support, recovery, refund or replacement terms. We do not treat an old public claim as a standing promise when current evidence is not available.</p>
            <p>AI Team Premium is not presented as an official partner of third-party AI providers unless a specific relationship is independently verified and disclosed.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/all-products" className="rounded-full px-6 py-3 font-semibold text-white" style={{ background: BRAND.blue, textDecoration: "none" }}>Browse current catalog</Link>
            <Link href="/non-affiliation" className="rounded-full px-6 py-3 font-semibold" style={{ background: BRAND.white, color: BRAND.navy, textDecoration: "none", border: "1px solid rgba(15,23,42,.12)" }}>Non-affiliation disclosure</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
