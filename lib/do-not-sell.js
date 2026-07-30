// Do-not-sell and redirect rules for products not ready for public sale

import { readFileSync } from 'fs';
import { join } from 'path';

let doNotSellRules = null;

export function loadDoNotSellRules() {
  if (!doNotSellRules) {
    try {
      const path = join(process.cwd(), 'data', 'disclosures.json');
      const data = readFileSync(path, 'utf-8');
      const parsed = JSON.parse(data);
      doNotSellRules = parsed['do-not-sell'] || [];
    } catch (error) {
      console.warn('Failed to load do-not-sell rules:', error.message);
      doNotSellRules = [];
    }
  }
  return doNotSellRules;
}

export function getDoNotSellRule(productId) {
  const rules = loadDoNotSellRules();
  return rules.find((r) => r.productId === productId);
}

export function isProductDoNotSell(productId) {
  return !!getDoNotSellRule(productId);
}

export function getRedirectUrl(productId) {
  const rule = getDoNotSellRule(productId);
  return rule?.redirectUrl || '/';
}

export function validateProductPath(productId) {
  if (isProductDoNotSell(productId)) {
    return {
      valid: false,
      redirect: getRedirectUrl(productId),
      reason: getDoNotSellRule(productId)?.reason,
    };
  }
  return { valid: true };
}

// Middleware for Express/Fastify
export function doNotSellMiddleware(req, res, next) {
  const productId = req.params.slug;
  const validation = validateProductPath(productId);

  if (!validation.valid) {
    return res.redirect(301, validation.redirect);
  }

  next();
}

// Middleware for Next.js (in middleware.ts)
export function createNextDoNotSellMiddleware() {
  return (request) => {
    const slug = request.nextUrl.pathname.match(/\/tools\/([^/]+)/)?.[1];
    if (!slug) return null;

    const validation = validateProductPath(slug);
    if (!validation.valid) {
      return Response.redirect(
        new URL(validation.redirect, request.url),
        301
      );
    }
    return null;
  };
}
