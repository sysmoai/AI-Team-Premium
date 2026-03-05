import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";

interface Props {
  title: string;
  banglaTitle: string;
  description: string;
  emoji: string;
  whatsappText: string;
}

export default function ServiceComingSoon({ title, banglaTitle, description, emoji, whatsappText }: Props) {
  usePageMeta({ title: `${title} | AI Team Premium BD`, description });

  return (
    <Layout>
      <section className="py-32" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="text-6xl mb-6">{emoji}</div>
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: BRAND.navy }}>{banglaTitle}</h1>
          <p className="text-lg mb-10" style={{ color: BRAND.navy, opacity: 0.6 }}>{description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/8801533262758?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-service-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp-এ জিজ্ঞেস করুন
            </a>
            <Link
              href="/start-a-project"
              data-testid="link-service-contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-base"
              style={{ background: BRAND.white, color: BRAND.navy, border: `1px solid rgba(37,99,235,0.15)` }}
            >
              Send a Request
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
