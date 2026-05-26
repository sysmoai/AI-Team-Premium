import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

interface Props {
  title: string;
  banglaTitle: string;
  description: string;
  emoji: string;
  whatsappText: string;
  path: string;
}

export default function ServiceComingSoon({ title, banglaTitle, description, emoji, whatsappText, path }: Props) {
  usePageMeta({
    title: `${title} in Bangladesh — AI Team Premium BD`,
    description,
    path,
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/support" },
        { name: title, path },
      ]} />
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
              onClick={() => trackWhatsAppClick(title, undefined, undefined, "service-coming-soon")}
              data-testid="button-service-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick(title, "service-coming-soon")}
              data-testid="button-service-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
            <Link
              href="/start-a-project"
              data-testid="link-service-contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-base"
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
