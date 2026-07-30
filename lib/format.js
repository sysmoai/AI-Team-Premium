// Format utilities for catalog and pricing display

export function formatPrice(amount, currency = 'BDT') {
  if (amount === null || amount === undefined) {
    return 'Contact for price';
  }
  return `৳${amount.toLocaleString('bn-BD')}`;
}

export function formatPriceWithPeriod(amount, period = 'month', currency = 'BDT') {
  if (!amount) return 'Contact for price';
  const periodLabel = getPeriodLabel(period);
  return `${formatPrice(amount, currency)}/${periodLabel}`;
}

export function getPeriodLabel(period) {
  const labels = {
    year: 'বছর',
    annual: 'বছর',
    month: 'মাস',
    monthly: 'মাস',
    day: 'দিন',
    week: 'সপ্তাহ',
  };
  return labels[period] || period;
}

export function formatProductForDisplay(product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    status: product.status,
    pricing: formatPricingForDisplay(product.pricing),
    whatsAppMessage: generateWhatsAppMessage(product),
  };
}

export function formatPricingForDisplay(pricing) {
  const formatted = {
    status: pricing.status,
  };

  if (pricing.status === 'hold') {
    formatted.display = 'Request on WhatsApp';
    formatted.cta = 'Ask Price';
    return formatted;
  }

  if (pricing.annual) {
    formatted.annual = {
      amount: pricing.annual.amount,
      display: formatPriceWithPeriod(pricing.annual.amount, 'year'),
      verified: pricing.annual.verified,
    };
  }

  if (pricing.monthly) {
    formatted.monthly = {
      amount: pricing.monthly.amount,
      display: formatPriceWithPeriod(pricing.monthly.amount, 'month'),
      verified: pricing.monthly.verified,
    };
  }

  // Calculate savings if both annual and monthly are available
  if (formatted.annual && formatted.monthly) {
    const monthlyTotal = formatted.monthly.amount * 12;
    const savings = monthlyTotal - formatted.annual.amount;
    const savingsPercent = Math.round((savings / monthlyTotal) * 100);
    formatted.savings = {
      amount: savings,
      percent: savingsPercent,
      display: `৳${savings.toLocaleString('bn-BD')} সাশ্রয় (${savingsPercent}%)`,
    };
  }

  return formatted;
}

export function generateWhatsAppMessage(product) {
  if (product.pricing.status === 'hold') {
    return `আমি ${product.name} সম্পর্কে জানতে চাই। দাম এবং বিস্তারিত শেয়ার করুন।`;
  }

  if (product.pricing.annual && product.pricing.monthly) {
    return `আমি ${product.name} এর annual (৳${product.pricing.annual.amount}) অথবা monthly (৳${product.pricing.monthly.amount}) পরিকল্পনায় আগ্রহী।`;
  }

  return `আমি ${product.name} কিনতে চাই।`;
}

export function isProductPublished(product) {
  return product.status === 'active' && product.pricing.status !== 'hold';
}

export function isProductPending(product) {
  return product.pricing.status === 'hold' || product.status === 'pending-pricing';
}

export function shouldShowPricing(product) {
  return product.pricing.status !== 'hold' && (product.pricing.annual || product.pricing.monthly);
}

export function getPriceRange(products) {
  const prices = [];
  products.forEach((p) => {
    if (p.pricing.annual) prices.push(p.pricing.annual.amount);
    if (p.pricing.monthly) prices.push(p.pricing.monthly.amount);
  });

  if (prices.length === 0) return { min: null, max: null };

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
