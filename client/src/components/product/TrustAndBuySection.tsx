import { MessageSquare, CreditCard, ClipboardCheck, Shield } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/LogoIcons";

interface TrustAndBuySectionProps { productName?: string; whatsappText?: string; }

export function TrustAndBuySection({ productName, whatsappText }: TrustAndBuySectionProps) {
  const waText = whatsappText ?? `Hi! I want to ask about ${productName ?? "an AI subscription"}. Please confirm the current access model, price, availability, fulfillment timing and support terms before payment.`;
  const waUrl = `https://wa.me/8801533262758?text=${encodeURIComponent(waText)}`;
  const steps = [
    { icon: MessageSquare, title: "Ask on WhatsApp", body: "Tell us the product and plan you are considering." },
    { icon: ClipboardCheck, title: "Confirm the offer", body: "We confirm the access model, current price, availability, fulfillment timing and applicable support terms." },
    { icon: CreditCard, title: "Pay only after confirmation", body: "Use the payment instructions supplied for the confirmed order." },
  ];
  return (
    <div className="space-y-8">
      <div><h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">How ordering works</h2><div className="grid sm:grid-cols-3 gap-4">{steps.map(({icon: Icon, title, body}) => <div key={title} className="rounded-2xl p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"><Icon size={20} className="text-blue-600 dark:text-blue-400"/><h3 className="mt-3 font-bold text-sm text-gray-900 dark:text-gray-100">{title}</h3><p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{body}</p></div>)}</div></div>
      <div className="rounded-2xl p-5 border border-blue-200/60 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 flex gap-3"><Shield size={21} className="text-blue-600 dark:text-blue-400 shrink-0"/><div><h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Support and recovery terms</h3><p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">Support, recovery, refund or replacement eligibility is confirmed for the specific order before payment. Do not rely on a fixed public SLA or warranty from older site copy.</p></div></div>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm" style={{ background: "#25D366", textDecoration: "none" }}><WhatsAppIcon size={18} color="#fff" /> Ask on WhatsApp</a>
    </div>
  );
}
