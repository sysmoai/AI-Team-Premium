import { WhatsAppIcon } from "@/components/brand/LogoIcons";
import { MessageCircle } from "lucide-react";
import { config } from "@/lib/config";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2.5 md:bottom-8 md:right-8">
      <a
        href={config.messenger}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-messenger-floating"
        aria-label="Chat on Messenger"
        title="Chat on Messenger"
        className="flex items-center justify-center rounded-full transition-transform hover:-translate-y-1 active:scale-95"
        style={{
          width: 52,
          height: 52,
          background: "#0084FF",
          boxShadow: "0 4px 18px rgba(0,132,255,0.4)",
          textDecoration: "none",
        }}
      >
        <MessageCircle size={22} color="#fff" fill="rgba(255,255,255,0.15)" strokeWidth={2} />
      </a>

      <a
        href={config.whatsappGeneral}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-whatsapp-floating"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="flex items-center justify-center rounded-full animate-pulse-ring transition-transform hover:-translate-y-1 active:scale-95"
        style={{
          width: 60,
          height: 60,
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          textDecoration: "none",
        }}
      >
        <WhatsAppIcon size={28} color="#fff" />
      </a>
    </div>
  );
}
