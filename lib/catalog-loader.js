// Catalog loader: Loads and manages the product catalog with safety checks

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import FloorGuard from './floor-guard.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class CatalogLoader {
  constructor(options = {}) {
    this.catalogPath = options.catalogPath || path.join(__dirname, '../data/catalog.json');
    this.floorPrice = options.floorPrice || 29900;
    this.floorGuard = new FloorGuard(this.floorPrice);
    this._catalog = null;
  }

  async load() {
    try {
      const data = await fs.readFile(this.catalogPath, 'utf-8');
      this._catalog = JSON.parse(data);

      // Validate catalog
      const validation = this.floorGuard.validateCatalog(this._catalog);
      if (!validation.valid) {
        console.warn('Catalog validation warnings:', validation.violations);
      }

      return this._catalog;
    } catch (error) {
      throw new Error(`Failed to load catalog: ${error.message}`);
    }
  }

  getCatalog() {
    if (!this._catalog) {
      throw new Error('Catalog not loaded. Call load() first.');
    }
    return this._catalog;
  }

  getProduct(productId) {
    const catalog = this.getCatalog();
    return catalog.products.find((p) => p.id === productId);
  }

  getProductsByStatus(status) {
    const catalog = this.getCatalog();
    return catalog.products.filter((p) => p.pricing.status === status);
  }

  getPublishedProducts() {
    const catalog = this.getCatalog();
    return catalog.products.filter((p) => p.pricing.status !== 'hold' && p.status === 'active');
  }

  getPendingProducts() {
    const catalog = this.getCatalog();
    return catalog.products.filter((p) => p.pricing.status === 'hold' || p.status === 'pending-pricing');
  }

  getPrice(productId, tier = 'annual') {
    const product = this.getProduct(productId);
    if (!product) return null;

    if (product.pricing.status === 'hold') {
      return { status: 'pending', contact: product.contact };
    }

    const pricing = product.pricing[tier];
    if (!pricing) return null;

    return {
      amount: pricing.amount,
      currency: pricing.currency || 'BDT',
      period: pricing.period || tier,
      verified: pricing.verified || false,
    };
  }

  requiresLiveVerification(productId) {
    const catalog = this.getCatalog();
    return catalog.metadata.requiresLiveVerification.includes(productId);
  }

  validateStrict() {
    return this.floorGuard.enforceStrict(this._catalog);
  }
}

// Singleton instance
let _instance = null;

export async function initCatalog(options = {}) {
  if (!_instance) {
    _instance = new CatalogLoader(options);
    await _instance.load();
  }
  return _instance;
}

export function getCatalogInstance() {
  if (!_instance) {
    throw new Error('Catalog not initialized. Call initCatalog() first.');
  }
  return _instance;
}

export default CatalogLoader;
