#!/usr/bin/env node
// SUPERSEDED 2026-08-02 — kept as evidence, no longer wired into `npm run ship`.
// Reachable as `npm run validate:catalog:legacy`.
//
// Why it was retired rather than trusted:
//   1. It reads data/catalog.json (2 products) — a scaffolding file the site
//      does NOT render from. The shipped catalog is
//      client/src/data/products-catalog.json (129 products).
//   2. It applies a FLAT ৳29,900 floor to every product regardless of access
//      model, which cannot be right: a shared seat and a personal seat have
//      different economics by design.
//   3. As a result it currently FAILS by flagging the CEO's own approved CapCut
//      relist prices (৳2,510 annual / ৳3,350 monthly, decision F27 2026-07-26)
//      as "below floor ৳29,900" — the validator contradicts the decision it
//      should be enforcing.
//   4. It was never wired into `npm run ship`, so nobody saw it failing.
//
// Replacement: scripts/validate-commercial.mjs (access-model aware, reads the
// catalog the site actually ships). Deleting this file would erase the evidence
// of the gap, so it stays.
//
// Catalog validation script - runs floor-guard checks and reports violations

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import FloorGuard from '../lib/floor-guard.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function validateCatalog() {
  try {
    const catalogPath = path.join(__dirname, '../data/catalog.json');
    const data = await fs.readFile(catalogPath, 'utf-8');
    const catalog = JSON.parse(data);

    const floorGuard = new FloorGuard(catalog.floorPrice);
    const result = floorGuard.validateCatalog(catalog);

    console.log('\n📊 Catalog Validation Report');
    console.log('═'.repeat(50));
    console.log(`Floor Price: ৳${result.floorPrice}`);
    console.log(`Validation Status: ${result.valid ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Total Products: ${catalog.products.length}`);
    console.log(`Violations: ${result.violations.length}`);

    if (result.violations.length > 0) {
      console.log('\n⚠️  Violations Found:');
      console.log('─'.repeat(50));
      result.violations.forEach((v) => {
        const icon = v.severity === 'error' ? '❌' : '⚠️ ';
        console.log(`${icon} [${v.severity.toUpperCase()}] ${v.productId}`);
        console.log(`   ${v.message}`);
      });

      const errors = result.violations.filter((v) => v.severity === 'error');
      if (errors.length > 0) {
        console.log(`\n❌ ${errors.length} error(s) found - build will FAIL`);
        process.exit(1);
      } else {
        console.log(`\n✅ Warnings only - build will PASS`);
      }
    } else {
      console.log('\n✅ All checks passed!');
    }

    // Summary
    console.log('\n📋 Product Summary:');
    console.log('─'.repeat(50));
    catalog.products.forEach((p) => {
      const status = p.pricing.status === 'hold' ? '🔴 HOLD' : '🟢 ACTIVE';
      console.log(`${status} ${p.name}`);
      if (p.pricing.status !== 'hold') {
        if (p.pricing.annual) {
          console.log(`   └─ Annual: ৳${p.pricing.annual.amount}`);
        }
        if (p.pricing.monthly) {
          console.log(`   └─ Monthly: ৳${p.pricing.monthly.amount}`);
        }
      }
    });

    console.log('\n' + '═'.repeat(50) + '\n');

    return result.valid;
  } catch (error) {
    console.error('❌ Validation Error:', error.message);
    process.exit(1);
  }
}

await validateCatalog();
