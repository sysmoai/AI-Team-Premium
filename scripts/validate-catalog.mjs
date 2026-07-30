#!/usr/bin/env node
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
