// WhatsApp intent tracking - privacy-first, no cookies, no pixels

export class WATracker {
  constructor(options = {}) {
    this.apiEndpoint = options.apiEndpoint || '/api/track/wa-click';
    this.disableTracking = options.disableTracking || false;
  }

  async trackClick(event) {
    if (this.disableTracking) return;

    // Privacy-first: only send essential data
    // NO IP, NO user agent, NO fingerprinting, NO cookies
    const payload = {
      event: event.event || 'wa-click',
      productId: event.productId,
      source: event.source, // where the click came from
      timestamp: new Date().toISOString(),
      // Intentionally exclude: IP, user agent, device info, location
    };

    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // Silently fail - never expose tracking errors to users
      console.error('[WATracker] Failed to track:', error.message);
    }
  }

  generateWhatsAppURL(phoneNumber, message, trackingData = {}) {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Track on URL generation (no wait for response)
    if (!this.disableTracking) {
      this.trackClick({
        event: trackingData.event || 'wa-intent-generated',
        productId: trackingData.productId,
        source: trackingData.source || 'unknown',
      });
    }

    return url;
  }

  // Server-side tracking handler for Express/Node
  static createMiddleware() {
    return async (req, res) => {
      const { event, productId, source } = req.body;

      // Log to analytics database (server-side only)
      // This is where you'd store to your database
      // For now, just log to console
      console.log(`[Analytics] ${event} - product: ${productId}, source: ${source}`);

      res.json({ success: true });
    };
  }
}

export default WATracker;
