// WhatsApp helper: Generates WhatsApp message intents and CTAs for products

export class WhatsAppHelper {
  constructor(phoneNumber = '8801612345678', options = {}) {
    this.phoneNumber = phoneNumber;
    this.baseUrl = options.baseUrl || 'https://wa.me';
  }

  /**
   * Generate WhatsApp chat intent URL
   * @param {string} message - Pre-filled message
   * @returns {string} WhatsApp chat link
   */
  generateChatIntent(message = '') {
    const encoded = encodeURIComponent(message);
    return `${this.baseUrl}/${this.phoneNumber}?text=${encoded}`;
  }

  /**
   * Generate WhatsApp message for product inquiry
   * @param {object} product - Product object from catalog
   * @returns {object} { message, link }
   */
  generateProductInquiry(product) {
    const message = this._buildProductMessage(product);
    return {
      message,
      link: this.generateChatIntent(message),
      productId: product.id,
      productName: product.name,
    };
  }

  /**
   * Generate WhatsApp message for pending pricing
   * @param {string} productName - Product name
   * @returns {object} { message, link }
   */
  generatePricingRequest(productName) {
    const message = `আমি ${productName} সম্পর্কে জানতে চাই। দাম এবং প্যাকেজ বিস্তারিত জানান। (I want to know about ${productName}. Please share pricing and package details.)`;
    return {
      message,
      link: this.generateChatIntent(message),
      productName,
      type: 'pricing-request',
    };
  }

  /**
   * Generate WhatsApp message for purchase
   * @param {object} product - Product object
   * @param {string} tier - Pricing tier (annual, monthly, etc)
   * @returns {object} { message, link }
   */
  generatePurchaseIntent(product, tier = 'annual') {
    const price = product.pricing[tier];
    let message;

    if (!price) {
      message = `আমি ${product.name} কিনতে চাই। (I want to purchase ${product.name}.)`;
    } else {
      message = `আমি ${product.name} (${tier === 'annual' ? 'বার্ষিক' : 'মাসিক'}) কিনতে চাই - ৳${price.amount}। (I want to purchase ${product.name} (${tier}) - BDT ${price.amount}.)`;
    }

    return {
      message,
      link: this.generateChatIntent(message),
      productId: product.id,
      productName: product.name,
      tier,
      type: 'purchase',
    };
  }

  /**
   * Generate WhatsApp CTA button data
   * @param {object} options - { product, tier, text }
   * @returns {object} Button config for UI
   */
  generateCTAButton(options = {}) {
    const { product, tier = 'annual', text = 'Ask on WhatsApp' } = options;

    let link;
    let trackingData = {};

    if (product.pricing.status === 'hold') {
      link = this.generatePricingRequest(product.name).link;
      trackingData = { event: 'pricing-inquiry', productId: product.id };
    } else if (product.status === 'pending-pricing') {
      link = this.generatePricingRequest(product.name).link;
      trackingData = { event: 'pending-pricing', productId: product.id };
    } else {
      const intent = this.generatePurchaseIntent(product, tier);
      link = intent.link;
      trackingData = { event: 'purchase-intent', productId: product.id, tier };
    }

    return {
      text,
      link,
      icon: 'whatsapp',
      target: '_blank',
      rel: 'noopener noreferrer',
      tracking: trackingData,
    };
  }

  /**
   * Privacy-friendly click tracker (no pixels, no cookies)
   * @param {object} event - Event data
   * @returns {Promise<void>}
   */
  async trackClick(event) {
    // No cookies, no external pixels - only log to server-side analytics
    try {
      await fetch('/api/track/wa-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          // Do NOT include IP, user agent, or fingerprinting data
        }),
      });
    } catch (error) {
      console.error('Failed to track WhatsApp click:', error);
      // Silently fail - do not expose tracking errors to users
    }
  }

  // Private helpers

  _buildProductMessage(product) {
    const { name, category, description } = product;
    const bangla = this._translateToBangla(name);
    return `${bangla} সম্পর্কে তথ্য চাই। (Info about ${name}. ${description ? `Category: ${category}` : ''})`;
  }

  _translateToBangla(text) {
    // Simple mapping - extend as needed
    const translations = {
      'ChatGPT Pro Premium Shared': 'চ্যাটজিপিটি প্রো প্রিমিয়াম শেয়ারড',
      'CapCut Premium': 'ক্যাপকাট প্রিমিয়াম',
    };
    return translations[text] || text;
  }
}

export default WhatsAppHelper;
