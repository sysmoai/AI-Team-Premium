import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found — AI Team Premium",
    description: "The page you are looking for does not exist. Browse AI subscriptions, tools, and services at AI Team Premium.",
    path: "/404",
  });

  return (
    <Layout>
      <section className="py-32">
        <div className="mx-auto max-w-md px-6 text-center">
          <p style={{ color: BRAND.blue, fontSize: "5rem", fontWeight: 700, lineHeight: 1 }}>404</p>
          <h1 className="mt-4" style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>Page Not Found</h1>
          <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.92rem", lineHeight: 1.6 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            data-testid="link-back-home"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 transition-all"
            style={{ background: BRAND.blue, color: BRAND.white, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}