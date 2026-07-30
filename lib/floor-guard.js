// Floor-guard: Validates that all published prices meet minimum cost threshold

export class FloorGuard {
  constructor(floorPrice = 29900) {
    this.floorPrice = floorPrice;
  }

  validateCatalog(catalog) {
    const violations = [];

    if (!catalog.products || !Array.isArray(catalog.products)) {
      throw new Error('Invalid catalog structure: missing products array');
    }

    catalog.products.forEach((product) => {
      if (product.pricing.status === 'hold') {
        // Pending pricing is allowed
        return;
      }

      if (product.pricing.minFloor) {
        if (product.pricing.minFloor < this.floorPrice) {
          violations.push({
            productId: product.id,
            type: 'floor-violation',
            message: `Product "${product.name}" minFloor (${product.pricing.minFloor}) below threshold (${this.floorPrice})`,
            severity: 'error',
          });
        }
      }

      // Check all pricing tiers
      if (product.pricing.annual) {
        const annualPrice = product.pricing.annual.amount;
        if (annualPrice > 0 && annualPrice < this.floorPrice) {
          violations.push({
            productId: product.id,
            type: 'floor-violation',
            tier: 'annual',
            message: `Product "${product.name}" annual price (${annualPrice}) below floor (${this.floorPrice})`,
            severity: 'error',
          });
        }
      }

      if (product.pricing.monthly) {
        const monthlyPrice = product.pricing.monthly.amount;
        if (monthlyPrice > 0 && monthlyPrice < this.floorPrice) {
          violations.push({
            productId: product.id,
            type: 'floor-violation',
            tier: 'monthly',
            message: `Product "${product.name}" monthly price (${monthlyPrice}) below floor (${this.floorPrice})`,
            severity: 'error',
          });
        }
      }

      if (product.pricing.legacy && !product.pricing.legacy.status?.includes('deprecated')) {
        const legacyPrice = product.pricing.legacy.amount;
        if (legacyPrice > 0 && legacyPrice < this.floorPrice) {
          violations.push({
            productId: product.id,
            type: 'floor-violation',
            tier: 'legacy',
            message: `Product "${product.name}" legacy price (${legacyPrice}) below floor (${this.floorPrice}) - must be deprecated`,
            severity: 'warning',
          });
        }
      }
    });

    return {
      valid: violations.length === 0,
      violations,
      floorPrice: this.floorPrice,
      timestamp: new Date().toISOString(),
    };
  }

  enforceStrict(catalog) {
    const result = this.validateCatalog(catalog);
    if (result.violations.some((v) => v.severity === 'error')) {
      const errors = result.violations.filter((v) => v.severity === 'error');
      throw new Error(
        `Floor guard violations:\n${errors.map((e) => `  - ${e.message}`).join('\n')}`
      );
    }
    return result;
  }
}

export default FloorGuard;
