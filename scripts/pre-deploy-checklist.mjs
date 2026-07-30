#!/usr/bin/env node
// F32: Comprehensive pre-deployment QA checklist

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CHECKS = [
  {
    name: 'Catalog Validation',
    cmd: 'npm run validate:catalog',
    critical: true,
  },
  {
    name: 'Policies Validation',
    cmd: 'npm run validate:policies',
    critical: true,
  },
  {
    name: 'Type Checking',
    cmd: 'npm run check',
    critical: false,
  },
  {
    name: 'Build',
    cmd: 'npm run build',
    critical: true,
  },
];

const MANUAL_CHECKS = [
  {
    category: 'Pricing',
    items: [
      '✓ All prices in BDT only (no USD fallback)',
      '✓ CapCut verified live in-app BD price',
      '✓ ChatGPT Pro Premium pricing final',
      '✓ No "Request price" for published products',
    ],
  },
  {
    category: 'Homepage',
    items: [
      '✓ Hero section renders correctly',
      '✓ All CTAs link to WhatsApp',
      '✓ Mobile responsive (375px+)',
      '✓ Bangla text displays properly',
      '✓ Images load (Lighthouse > 90)',
    ],
  },
  {
    category: 'Tools Pages',
    items: [
      '✓ /tools/chatgpt loads',
      '✓ /tools/claude loads',
      '✓ /tools/gemini loads',
      '✓ All prices from catalog.json',
      '✓ Do-not-sell redirects work (301)',
    ],
  },
  {
    category: 'Policies',
    items: [
      '✓ /privacy loads completely',
      '✓ /terms loads completely',
      '✓ /refund loads completely',
      '✓ No banned claims in any policy',
      '✓ Footer links to policies',
    ],
  },
  {
    category: 'Analytics & Tracking',
    items: [
      '✓ WhatsApp clicks tracked (no cookies)',
      '✓ No external pixels (e.g., Facebook Pixel)',
      '✓ Privacy-first design confirmed',
      '✓ Server-side analytics only',
    ],
  },
  {
    category: 'Security',
    items: [
      '✓ HTTPS only (Cloudflare SSL)',
      '✓ CSP headers in place',
      '✓ XSS protection enabled',
      '✓ No credentials in .env.production',
    ],
  },
  {
    category: 'SEO',
    items: [
      '✓ Sitemap.xml generated',
      '✓ robots.txt configured',
      '✓ Meta tags present on all pages',
      '✓ OG images set (1200×630)',
      '✓ Structured data (Schema.org)',
    ],
  },
];

async function printChecklist() {
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('🚀 F32: PRE-DEPLOYMENT CHECKLIST');
  console.log('═'.repeat(60));

  console.log('\n📋 AUTOMATED CHECKS:\n');
  CHECKS.forEach((check, i) => {
    const critical = check.critical ? '🔴' : '⚪';
    console.log(`${i + 1}. ${critical} ${check.name}`);
    console.log(`   Command: ${check.cmd}\n`);
  });

  console.log('\n✅ MANUAL QA CHECKLIST:\n');
  MANUAL_CHECKS.forEach((section) => {
    console.log(`📌 ${section.category}:`);
    section.items.forEach((item) => {
      console.log(`   ${item}`);
    });
    console.log();
  });

  console.log('\n📋 DEPLOYMENT PROCEDURE:\n');
  console.log('1. Run all automated checks (above)');
  console.log('2. Complete manual QA checklist');
  console.log('3. Verify CapCut live BD pricing');
  console.log('4. git push feat/homepage');
  console.log('5. Open PR to main on GitHub');
  console.log('6. Await CEO sign-off on PR');
  console.log('7. Squash merge to main');
  console.log('8. Verify auto-deploy via Cloudflare Pages');
  console.log('9. Test live at https://aiteampremium.com');
  console.log('10. Log F32 as COMPLETE');

  console.log('\n' + '═'.repeat(60) + '\n');
}

async function main() {
  await printChecklist();
}

await main();
