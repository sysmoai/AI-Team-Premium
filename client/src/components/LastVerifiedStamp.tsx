import { useQuery } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";

type Product = {
  id: number;
  name: string;
  lastVerifiedAt: string | null;
  lastAuditedAt: string | null;
  staleScore: string;
};

const STALE: Record<string, { color: string; emoji: string; label: string }> = {
  fresh: { color: "#16A34A", emoji: "🟢", label: "Fresh" },
  aging: { color: "#F59E0B", emoji: "🟡", label: "Aging" },
  stale: { color: "#EA580C", emoji: "🟠", label: "Stale" },
  rotten: { color: "#EF4444", emoji: "🔴", label: "Rotten" },
};

function fmt(d: string | null): string {
  if (!d) return "Not yet verified";
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function LastVerifiedStamp({ toolName }: { toolName: string }) {
  const { data } = useQuery<Product[]>({
    queryKey: ["/api/admin/audit/products"],
    staleTime: 5 * 60 * 1000,
  });
  const product = data?.find((p) => p.name.toLowerCase() === toolName.toLowerCase());
  if (!product) return null;
  const stale = STALE[product.staleScore] || STALE.fresh;
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${stale.color}40`, fontSize: "0.72rem" }}
      data-testid={`stamp-verified-${toolName.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <ShieldCheck size={12} color={stale.color} />
      <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
        Last verified: <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(product.lastVerifiedAt || product.lastAuditedAt)}</span>
      </span>
      <span style={{ color: stale.color, fontWeight: 600 }}>{stale.emoji} {stale.label}</span>
    </div>
  );
}
