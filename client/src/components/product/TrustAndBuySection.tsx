import { useRef } from "react";
import { Shield, MessageSquare, CreditCard, Zap, ChevronRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { WhatsAppIcon } from "@/components/brand/LogoIcons";
import { config } from "@/lib/config";

interface StatCardProps {
  end: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

function StatCard({ end, suffix = "", label, decimals = 0 }: StatCardProps) {
  const { value, ref } = useCountUp({ end, decimals });
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center"
      data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        {value.toLocaleString()}{suffix}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</span>
    </div>
  );
}

const STATS: { end: number; suffix: string; label: string; decimals?: number }[] = [
  { end: 18, suffix: "+", label: "AI Tools Available" },
  { end: 24, suffix: "/7", label: "WhatsApp Support" },
  { end: 30, suffix: "+", label: "Day Replacement" },
  { end: 4, suffix: "+", label: "Payment Methods" },
];

const BUY_STEPS = [
  {
    icon: MessageSquare,
    step: "1",
    title: "WhatsApp Us",
    desc: "Send a message with the plan you want. We respond within minutes.",
    color: "#25D366",
  },
  {
    icon: CreditCard,
    step: "2",
    title: "Pay via bKash / Nagad",
    desc: "We'll share the payment number privately. No public payments.",
    color: "#E2136E",
  },
  {
    icon: Zap,
    step: "3",
    title: "Get Access Instantly",
    desc: "Receive your credentials within minutes of payment confirmation.",
    color: "#2563EB",
  },
];

interface TrustAndBuySectionProps {
  productName?: string;
  whatsappText?: string;
}

export function TrustAndBuySection({ productName, whatsappText }: TrustAndBuySectionProps) {
  const waText = whatsappText ?? `Hi! I want to order ${productName ?? "a subscription"} from AI Team Premium BD. Please share payment details.`;
  const waUrl = `https://wa.me/8801533262758?text=${encodeURIComponent(waText)}`;

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Trusted by Bangladesh</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((s, i) => (
            <StatCard key={i} end={s.end} suffix={s.suffix} label={s.label} decimals={s.decimals ?? 0} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">How to Buy — 3 Simple Steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
          {BUY_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 h-full">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-xl w-10 h-10"
                      style={{ background: `${step.color}18` }}
                    >
                      <Icon size={20} color={step.color} strokeWidth={1.8} />
                    </div>
                    <span
                      className="text-2xl font-black"
                      style={{ color: `${step.color}40` }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < BUY_STEPS.length - 1 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-trust-buy-whatsapp"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95"
            style={{ background: "#25D366", textDecoration: "none" }}
          >
            <WhatsAppIcon size={18} color="#fff" />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="flex gap-3 p-5 rounded-2xl border" style={{ background: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.25)" }}>
        <Shield size={22} className="text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-2">Warranty & Replacement Guarantee</h3>
          <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> Free replacement within 24h if access stops working</li>
            <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> Warranty valid for the full subscription period</li>
            <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">✓</span> No questions asked for technical issues on our end</li>
            <li className="flex items-start gap-1.5"><span className="text-gray-300 font-bold">✗</span> Warranty void if account is misused or rules are violated</li>
          </ul>
          <a
            href="/refund-policy"
            className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Read full refund policy <ChevronRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
