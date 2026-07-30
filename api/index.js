const { readFileSync, existsSync } = require('fs');
const { resolve } = require('path');

const DIST_PATH = resolve(__dirname, '..', 'dist', 'public');
const SITE_URL = "https://www.aiteampremium.com";

const ROUTE_META = {
  "/": { title: "AI Team Premium — ChatGPT, Claude & AI Tools in Bangladesh | ৳349+/mo", description: "Bangladesh's #1 AI subscription platform. ChatGPT Plus, Claude Pro, Gemini, Midjourney, Canva & 56+ premium AI tools. Pay via bKash/Nagad. 5-30 min delivery. 30-day warranty.", canonical: "https://www.aiteampremium.com/" },
  "/all-products": { title: "All Premium AI Products — Complete Catalog (56 Tools) | AI Team Premium", description: "Complete catalog of 56 premium AI subscriptions. ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Runway & more. Search, filter by brand/category. One-click WhatsApp ordering.", canonical: "https://www.aiteampremium.com/all-products" },
  "/products": { title: "All Premium AI Products — Complete Catalog (56 Tools) | AI Team Premium", description: "Complete catalog of 56 premium AI subscriptions. ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Runway & more. Search, filter by brand/category. One-click WhatsApp ordering.", canonical: "https://www.aiteampremium.com/products" },
  "/chatgpt-plans": { title: "ChatGPT Plans & Pricing in Bangladesh — ৳499/mo | AIPT — AI Premium Tools", description: "Compare all ChatGPT plans: Plus Shared (৳499/mo), Premium Shared (৳999/mo), Personal (৳2,990/mo), Business, and Pro. Pay via bKash/Nagad. 5-15 min delivery.", canonical: "https://www.aiteampremium.com/chatgpt-plans" },
  "/pricing": { title: "Pricing — AI Subscriptions in Bangladesh | AIPT — AI Premium Tools", description: "Full pricing for all AI subscriptions in Bangladesh. ChatGPT from ৳499/mo. Pay via bKash/Nagad. No extra VAT.", canonical: "https://www.aiteampremium.com/pricing" },
  "/about": { title: "About AIPT — AI Premium Tools — Bangladesh's Trusted AI Partner", description: "Learn about AIPT — AI Premium Tools, Bangladesh's premier provider of AI subscriptions, supporting 3,000+ customers.", canonical: "https://www.aiteampremium.com/about" },
  "/contact": { title: "Contact AIPT — AI Premium Tools — WhatsApp, Messenger, Email", description: "Contact AIPT — AI Premium Tools. Reach us via WhatsApp, Facebook Messenger, or email. Available 7 days a week.", canonical: "https://www.aiteampremium.com/contact" },
  "/privacy-policy": { title: "Privacy Policy — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools privacy policy. How we collect, use, and protect your personal information.", canonical: "https://www.aiteampremium.com/privacy-policy" },
  "/terms": { title: "Terms of Service — AIPT — AI Premium Tools", description: "AIPT — AI Premium Tools terms of service. Please read these terms carefully before using our services.", canonical: "https://www.aiteampremium.com/terms" },
};

module.exports = (req, res) => {
  const requestPath = (req.url || '/').split('?')[0];

  // Handle static assets
  if (requestPath.startsWith('/assets/') || requestPath.startsWith('/images/') ||
      requestPath === '/favicon.svg' || requestPath === '/favicon.png' ||
      requestPath === '/apple-touch-icon.png' || requestPath === '/manifest.json' ||
      requestPath === '/robots.txt' || requestPath === '/sitemap.xml') {
    const filePath = resolve(DIST_PATH, requestPath);
    if (existsSync(filePath)) {
      try {
        const content = readFileSync(filePath);
        const contentTypes = {
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.json': 'application/json',
          '.xml': 'application/xml'
        };
        const ext = requestPath.substring(requestPath.lastIndexOf('.'));
        const contentType = contentTypes[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year for assets
        res.send(content);
        return;
      } catch (e) {
        console.error('Error reading asset:', e);
      }
    }
  }

  // Serve HTML with SEO metadata
  const indexPath = resolve(DIST_PATH, 'index.html');

  if (!existsSync(indexPath)) {
    res.status(500).send("Server error: index.html not found");
    return;
  }

  try {
    let template = readFileSync(indexPath, 'utf-8');
    const meta = ROUTE_META[requestPath];

    if (!meta) {
      template = template
        .replace(/<title>.*?<\/title>/, "<title>404 - Page Not Found | AIPT — AI Premium Tools</title>")
        .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, '<meta name="description" content="The page you requested was not found. Browse our AI subscriptions or return home." />')
        .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${SITE_URL}${requestPath}" />`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(404).send(template);
      return;
    }

    template = template
      .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
      .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${meta.canonical}" />`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(template);
  } catch (e) {
    res.status(500).send("Server error: " + (e instanceof Error ? e.message : String(e)));
  }
};
