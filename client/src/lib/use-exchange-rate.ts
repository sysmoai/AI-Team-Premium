import { useQuery } from "@tanstack/react-query";

interface ExchangeRateResponse {
  pair: "USD_BDT";
  rate: number;
  source: string;
  fetchedAt: number;
  ttlMs: number;
}

const FALLBACK_RATE = 121.5;

export function useUsdToBdt() {
  const query = useQuery<ExchangeRateResponse>({
    queryKey: ["/api/exchange-rate"],
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return {
    rate: query.data?.rate ?? FALLBACK_RATE,
    isFallback: !query.data || query.data.source === "fallback",
    isLoading: query.isLoading,
    source: query.data?.source ?? "fallback",
  };
}
