import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BRAND } from "@/components/brand/LogoIcons";
import { PlayCircle, RefreshCw, CheckCircle2, AlertTriangle, AlertCircle, Activity } from "lucide-react";
import type { ProductRegistry, AuditIssue, AuditLogEntry } from "@shared/schema";

type DashboardSummary = {
  totalProducts: number;
  p0Open: number;
  p1Open: number;
  p2Open: number;
  changesToday: number;
  brokenLinks: number;
  priceChanges: number;
};

const STALE_STYLE: Record<string, { bg: string; fg: string; emoji: string; label: string }> = {
  fresh: { bg: "#16A34A15", fg: "#16A34A", emoji: "🟢", label: "Fresh" },
  aging: { bg: "#F59E0B15", fg: "#F59E0B", emoji: "🟡", label: "Aging" },
  stale: { bg: "#EA580C15", fg: "#EA580C", emoji: "🟠", label: "Stale" },
  rotten: { bg: "#EF444415", fg: "#EF4444", emoji: "🔴", label: "Rotten" },
};

const SEV_STYLE: Record<string, { bg: string; fg: string }> = {
  P0: { bg: "#EF444415", fg: "#EF4444" },
  P1: { bg: "#F59E0B15", fg: "#F59E0B" },
  P2: { bg: "#2563EB15", fg: "#2563EB" },
};

function fmtDate(d: string | Date | null | undefined): string {
  if (!d) return "Never";
  const date = new Date(d);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function AuditDashboard() {
  usePageMeta({ title: "Content Audit Dashboard — AITPBD Internal", description: "Internal content audit dashboard." });
  const [issueSev, setIssueSev] = useState<string>("all");

  const summary = useQuery<DashboardSummary>({
    queryKey: ["/api/admin/audit/dashboard"],
    refetchInterval: 30000,
  });
  const products = useQuery<ProductRegistry[]>({
    queryKey: ["/api/admin/audit/products"],
    refetchInterval: 30000,
  });
  const issues = useQuery<AuditIssue[]>({
    queryKey: ["/api/admin/audit/issues", issueSev],
    queryFn: async () => {
      const url = issueSev === "all" ? "/api/admin/audit/issues" : `/api/admin/audit/issues?severity=${issueSev}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    refetchInterval: 30000,
  });
  const log = useQuery<AuditLogEntry[]>({
    queryKey: ["/api/admin/audit/log"],
    refetchInterval: 30000,
  });

  const runOne = useMutation({
    mutationFn: async (productId: number) => apiRequest("POST", `/api/admin/audit/run/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/issues"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/log"] });
    },
  });

  const runAll = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/admin/audit/run-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/issues"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/log"] });
    },
  });

  const resolveIssue = useMutation({
    mutationFn: async (id: number) => apiRequest("PATCH", `/api/admin/audit/issues/${id}/resolve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit/issues"] });
    },
  });

  const s = summary.data;
  const stats = [
    { label: "Total Products", value: s?.totalProducts ?? 0, icon: Activity, color: BRAND.blue },
    { label: "P0 Open", value: s?.p0Open ?? 0, icon: AlertCircle, color: "#EF4444" },
    { label: "P1 Open", value: s?.p1Open ?? 0, icon: AlertTriangle, color: "#F59E0B" },
    { label: "P2 Open", value: s?.p2Open ?? 0, icon: AlertTriangle, color: "#2563EB" },
    { label: "Changes Today", value: s?.changesToday ?? 0, icon: RefreshCw, color: "#7C3AED" },
    { label: "Broken Links", value: s?.brokenLinks ?? 0, icon: AlertCircle, color: "#EA580C" },
    { label: "Price Changes", value: s?.priceChanges ?? 0, icon: CheckCircle2, color: "#16A34A" },
  ];

  return (
    <Layout>
      <section className="py-10" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 style={{ color: BRAND.navy, fontSize: "1.6rem", fontWeight: 700 }}>Content Audit Dashboard</h1>
              <p style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.85rem", marginTop: 4 }}>
                Real-time health of all {s?.totalProducts ?? 0} products. Auto-refreshes every 30s.
              </p>
            </div>
            <Button
              size="lg"
              data-testid="button-audit-all"
              onClick={() => runAll.mutate()}
              disabled={runAll.isPending}
              style={{ background: BRAND.blue, color: "#fff" }}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              {runAll.isPending ? "Auditing..." : "Audit All"}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon size={14} color={stat.color} />
                  <span style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {stat.label}
                  </span>
                </div>
                <p style={{ color: stat.color, fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 style={{ color: BRAND.navy, fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>Products</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(37,99,235,0.08)", background: "#fff" }}>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: BRAND.sky }}>
                    {["Product", "Company", "Priority", "Status", "Last Audit", "Action"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3"
                        style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.isLoading && (
                    <tr><td colSpan={6} className="text-center py-6" style={{ color: BRAND.navy, opacity: 0.5 }}>Loading…</td></tr>
                  )}
                  {products.data?.map((p) => {
                    const stale = STALE_STYLE[p.staleScore] || STALE_STYLE.fresh;
                    const sev = SEV_STYLE[p.priority] || SEV_STYLE.P2;
                    return (
                      <tr key={p.id} style={{ borderTop: "1px solid rgba(37,99,235,0.05)" }} data-testid={`row-product-${p.slug}`}>
                        <td className="px-4 py-3" style={{ color: BRAND.navy, fontSize: "0.85rem", fontWeight: 600 }}>{p.name}</td>
                        <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.82rem" }}>{p.company}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full px-2 py-0.5" style={{ background: sev.bg, color: sev.fg, fontSize: "0.7rem", fontWeight: 700 }}>
                            {p.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: stale.bg, color: stale.fg, fontSize: "0.72rem", fontWeight: 600 }}>
                            {stale.emoji} {stale.label}
                          </span>
                        </td>
                        <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.8rem" }}>
                          {fmtDate(p.lastAuditedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            variant="outline"
                            data-testid={`button-run-${p.slug}`}
                            onClick={() => runOne.mutate(p.id)}
                            disabled={runOne.isPending}
                          >
                            Run Audit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Tabs defaultValue="issues">
            <TabsList>
              <TabsTrigger value="issues" data-testid="tab-issues">Open Issues</TabsTrigger>
              <TabsTrigger value="log" data-testid="tab-log">Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="issues">
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 700 }}>Open Issues</h3>
                <Select value={issueSev} onValueChange={setIssueSev}>
                  <SelectTrigger className="w-40" data-testid="select-issue-severity"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All severities</SelectItem>
                    <SelectItem value="P0">P0 only</SelectItem>
                    <SelectItem value="P1">P1 only</SelectItem>
                    <SelectItem value="P2">P2 only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                {issues.isLoading && <p style={{ color: BRAND.navy, opacity: 0.5 }}>Loading…</p>}
                {issues.data?.length === 0 && (
                  <div className="rounded-xl p-6 text-center" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)" }}>
                    <p style={{ color: BRAND.navy, opacity: 0.6 }}>No open issues. 🎉</p>
                  </div>
                )}
                {issues.data?.map((iss) => {
                  const sev = SEV_STYLE[iss.severity] || SEV_STYLE.P2;
                  return (
                    <div key={iss.id} className="rounded-xl p-4 flex items-start justify-between gap-4" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)" }} data-testid={`issue-${iss.id}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge style={{ background: sev.bg, color: sev.fg, border: "none" }}>{iss.severity}</Badge>
                          <span style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.75rem" }}>{iss.issueType}</span>
                          <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.72rem" }}>· {fmtDate(iss.detectedAt)}</span>
                        </div>
                        <p style={{ color: BRAND.navy, fontSize: "0.88rem", lineHeight: 1.5 }}>{iss.description}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => resolveIssue.mutate(iss.id)} disabled={resolveIssue.isPending} data-testid={`button-resolve-${iss.id}`}>
                        Resolve
                      </Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="log">
              <h3 className="mb-4 mt-2" style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 700 }}>Audit Log</h3>
              <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full" style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: BRAND.sky }}>
                        {["When", "Product", "Field", "Old → New", "Severity", "Status"].map((h) => (
                          <th key={h} className="text-left px-4 py-3" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {log.isLoading && <tr><td colSpan={6} className="text-center py-6" style={{ color: BRAND.navy, opacity: 0.5 }}>Loading…</td></tr>}
                      {log.data?.length === 0 && <tr><td colSpan={6} className="text-center py-6" style={{ color: BRAND.navy, opacity: 0.5 }}>No log entries yet. Run an audit to populate.</td></tr>}
                      {log.data?.map((row) => {
                        const sev = SEV_STYLE[row.severity] || SEV_STYLE.P2;
                        const product = products.data?.find((p) => p.id === row.productId);
                        return (
                          <tr key={row.id} style={{ borderTop: "1px solid rgba(37,99,235,0.05)" }} data-testid={`log-row-${row.id}`}>
                            <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.78rem" }}>{fmtDate(row.createdAt)}</td>
                            <td className="px-4 py-3" style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600 }}>{product?.name || `#${row.productId}`}</td>
                            <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.7, fontSize: "0.8rem" }}>{row.field}</td>
                            <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.78rem" }}>
                              {row.oldValue ?? "—"} → {row.newValue ?? "—"}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex rounded-full px-2 py-0.5" style={{ background: sev.bg, color: sev.fg, fontSize: "0.7rem", fontWeight: 700 }}>{row.severity}</span>
                            </td>
                            <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.78rem" }}>{row.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
