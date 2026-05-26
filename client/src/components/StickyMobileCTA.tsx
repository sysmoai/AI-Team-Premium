import { WhatsAppIcon } from "@/components/brand/LogoIcons";
import { MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { useContextualWhatsAppUrl } from "@/lib/whatsapp";

export default function StickyMobileCTABar() {
  const waUrl = useContextualWhatsAppUrl();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 py-2.5 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-t border-gray-100 dark:border-gray-800 flex gap-2">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-sticky-whatsapp"
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl active:scale-[0.98] transition-transform"
        style={{ background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
      >
        <WhatsAppIcon size={17} color="#fff" />
        WhatsApp
      </a>
      <a
        href={config.messenger}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-sticky-messenger"
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl active:scale-[0.98] transition-transform"
        style={{ background: "#0084FF", color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
      >
        <MessageCircle size={17} color="#fff" />
        Messenger
      </a>
    </div>
  );
}
