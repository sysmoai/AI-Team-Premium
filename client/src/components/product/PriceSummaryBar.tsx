import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/brand/LogoIcons";

interface PriceSummaryBarProps {
  sharedPrice: string;
  personalPrice: string;
  whatsappText?: string;
  heroRef: React.RefObject<HTMLElement>;
}

export function PriceSummaryBar({ sharedPrice, personalPrice, whatsappText, heroRef }: PriceSummaryBarProps) {
  const [visible, setVisible] = useState(false);
  const waText = whatsappText ?? "Hi! I want to order from AI Team Premium. Please share payment details.";
  const waUrl = `https://wa.me/8801533262758?text=${encodeURIComponent(waText)}`;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      style={{ top: 80 }}
      data-testid="price-summary-bar"
    >
      <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold">{sharedPrice}</span>
              <span className="bg-emerald-500 text-white text-[9px] font-700 px-1.5 py-0.5 rounded-full">BEST VALUE</span>
            </span>
            <span className="text-gray-400 dark:text-gray-600 font-medium text-xs">VS</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              <span className="font-bold">{personalPrice}</span>
              <span className="bg-purple-500 text-white text-[9px] font-700 px-1.5 py-0.5 rounded-full">FULL OWNERSHIP</span>
            </span>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-price-bar-whatsapp"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-transform active:scale-95"
            style={{ background: "#25D366", textDecoration: "none" }}
          >
            <WhatsAppIcon size={13} color="#fff" />
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
}
