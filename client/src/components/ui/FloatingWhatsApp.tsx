import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/brand/LogoIcons";
import { MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { useContextualWhatsAppUrl } from "@/lib/whatsapp";

interface FloatingWhatsAppProps {
  productWhatsAppText?: string;
}

export function FloatingWhatsApp({ productWhatsAppText }: FloatingWhatsAppProps) {
  const waUrl = useContextualWhatsAppUrl(productWhatsAppText);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2.5 md:bottom-8 md:right-8">
      <a
        href={config.messenger}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-messenger-floating"
        aria-label="Chat on Messenger"
        className="group relative flex items-center justify-center rounded-full transition-transform hover:-translate-y-1"
        style={{
          width: 52,
          height: 52,
          background: "#0084FF",
          boxShadow: "0 4px 18px rgba(0,132,255,0.4)",
          textDecoration: "none",
        }}
      >
        <MessageCircle size={22} color="#fff" fill="rgba(255,255,255,0.15)" strokeWidth={2} />
        <span className="absolute right-full mr-2 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white bg-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          Chat on Messenger
        </span>
      </a>

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-whatsapp-floating"
        aria-label="Chat on WhatsApp"
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center rounded-full animate-pulse-ring transition-transform hover:-translate-y-1"
        style={{
          width: 60,
          height: 60,
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          textDecoration: "none",
        }}
      >
        <WhatsAppIcon size={28} color="#fff" />
        <span className="absolute right-full mr-2 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white bg-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
