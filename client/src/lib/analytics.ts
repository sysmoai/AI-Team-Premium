/**
 * Analytics Configuration for AI Team Premium
 *
 * Supports optional tracking via environment variables:
 * - VITE_GA_MEASUREMENT_ID  → Google Analytics 4
 * - VITE_GTM_ID             → Google Tag Manager
 * - VITE_META_PIXEL_ID      → Meta (Facebook) Pixel
 * - VITE_TIKTOK_PIXEL_ID    → TikTok Pixel
 * - VITE_MICROSOFT_CLARITY_ID → Microsoft Clarity
 *
 * All IDs are optional. If missing, tracking loads as no-ops.
 * No secrets are exposed. No tracking scripts load without valid IDs.
 */

export const analyticsConfig = {
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined,
  gtmId: import.meta.env.VITE_GTM_ID as string | undefined,
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
  tiktokPixelId: import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined,
  clarityId: import.meta.env.VITE_MICROSOFT_CLARITY_ID as string | undefined,
};

export type TrackingEvent =
  | "whatsapp_cta_click"
  | "messenger_cta_click"
  | "plan_cta_click"
  | "pricing_view"
  | "service_cta_click"
  | "tool_cta_click"
  | "compare_cta_click"
  | "contact_cta_click"
  | "footer_cta_click"
  | "hero_cta_click"
  | "page_view";

export interface TrackingPayload {
  event: TrackingEvent;
  product?: string;
  page?: string;
  plan?: string;
  price?: string;
  source?: string;
}

/**
 * Safely push an event to all configured trackers.
 * Fails silently if trackers are unavailable.
 */
export function trackEvent(payload: TrackingPayload): void {
  try {
    const eventName = payload.event;
    const { event: _evt, ...restPayload } = payload;
    const params = {
      event_category: "conversion",
      event_label: payload.product || payload.page || payload.source || "",
      value: payload.price ? parseFloat(payload.price.replace(/[^0-9.]/g, "")) : undefined,
      ...restPayload,
    };

    // Google Analytics 4 (gtag)
    const gtag = (window as any).gtag;
    if (typeof gtag === "function" && analyticsConfig.gaId) {
      gtag("event", eventName, params);
    }

    // Google Tag Manager (dataLayer)
    const dataLayer = (window as any).dataLayer;
    if (Array.isArray(dataLayer) && analyticsConfig.gtmId) {
      dataLayer.push({ event: eventName, ...params });
    }

    // Meta Pixel (fbq)
    const fbq = (window as any).fbq;
    if (typeof fbq === "function" && analyticsConfig.metaPixelId) {
      fbq("trackCustom", eventName, params);
    }

    // TikTok Pixel (ttq)
    const ttq = (window as any).ttq;
    if (typeof ttq === "function" && analyticsConfig.tiktokPixelId) {
      ttq.track(eventName, params);
    }

    // Microsoft Clarity (clarity)
    const clarity = (window as any).clarity;
    if (typeof clarity === "function" && analyticsConfig.clarityId) {
      clarity("event", eventName, params);
    }
  } catch {
    // Tracking fails silently — never block navigation
  }
}

/**
 * Convenience wrapper for WhatsApp CTA clicks.
 */
export function trackWhatsAppClick(product?: string, plan?: string, price?: string, source?: string): void {
  trackEvent({ event: "whatsapp_cta_click", product, plan, price, source });
}

/**
 * Convenience wrapper for Messenger CTA clicks.
 */
export function trackMessengerClick(product?: string, source?: string): void {
  trackEvent({ event: "messenger_cta_click", product, source });
}

/**
 * Convenience wrapper for plan/tool card CTA clicks.
 */
export function trackPlanClick(product: string, plan: string, price?: string, source?: string): void {
  trackEvent({ event: "plan_cta_click", product, plan, price, source });
}

/**
 * Convenience wrapper for tool page CTA clicks.
 */
export function trackToolClick(tool: string, plan?: string, price?: string, source?: string): void {
  trackEvent({ event: "tool_cta_click", product: tool, plan, price, source });
}

/**
 * Convenience wrapper for service CTA clicks.
 */
export function trackServiceClick(service: string, source?: string): void {
  trackEvent({ event: "service_cta_click", product: service, source });
}

/**
 * Convenience wrapper for compare CTA clicks.
 */
export function trackCompareClick(product: string, source?: string): void {
  trackEvent({ event: "compare_cta_click", product, source });
}

/**
 * Convenience wrapper for contact/start-project CTA clicks.
 */
export function trackContactClick(source?: string): void {
  trackEvent({ event: "contact_cta_click", source });
}

/**
 * Convenience wrapper for footer CTA clicks.
 */
export function trackFooterClick(product?: string, source?: string): void {
  trackEvent({ event: "footer_cta_click", product, source });
}

/**
 * Convenience wrapper for hero CTA clicks.
 */
export function trackHeroClick(product?: string, source?: string): void {
  trackEvent({ event: "hero_cta_click", product, source });
}
