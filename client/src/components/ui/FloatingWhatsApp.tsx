import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/8801533262758?text=Hello%20AITPBD!%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-pulse-ring bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:-translate-y-1 transition-transform duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
}
