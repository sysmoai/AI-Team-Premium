import { WhatsAppIcon } from "@/components/brand/LogoIcons";

export default function StickyMobileCTABar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 py-2.5 bg-white/95 backdrop-blur border-t" style={{ borderColor: "rgba(37,99,235,0.08)" }}>
      <a
        href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+order+ChatGPT+Plus"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-sticky-whatsapp"
        className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl active:scale-[0.98] transition-transform"
        style={{ background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}
      >
        <WhatsAppIcon size={19} color="#fff" />
        WhatsApp এ অর্ডার করুন
      </a>
    </div>
  );
}
