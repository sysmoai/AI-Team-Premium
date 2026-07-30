#!/usr/bin/env node
// Policy validation: Check for banned claims and phrases

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BANNED_PHRASES = [
  'guaranteed or rebuilt',
  'money-back guarantee',
  '100% refund',
  'promised',
  'assured',
  'Private Limited',
  '500+ projects',
  'Top 5%',
  'premier',
  'leading',
  'Stripe',
  'credit card',
];

async function validatePolicies() {
  try {
    const policiesPath = path.join(__dirname, '../data/policies.json');
    const data = await fs.readFile(policiesPath, 'utf-8');
    const policies = JSON.parse(data);

    console.log('\n📋 Policy Validation Report');
    console.log('═'.repeat(50));
    console.log(`Policy Version: ${policies.version}`);
    console.log(`Last Updated: ${policies.policies.privacy.lastUpdated}`);

    let violations = [];

    // Check all policy content for banned phrases
    const policySections = [
      { name: 'Privacy Policy', content: JSON.stringify(policies.policies.privacy) },
      { name: 'Terms of Service', content: JSON.stringify(policies.policies.terms) },
      { name: 'Refund Policy', content: JSON.stringify(policies.policies.refund) },
    ];

    policySections.forEach((section) => {
      BANNED_PHRASES.forEach((phrase) => {
        const regex = new RegExp(phrase, 'gi');
        const matches = section.content.match(regex);
        if (matches) {
          violations.push({
            policy: section.name,
            phrase,
            count: matches.length,
            severity: 'error',
          });
        }
      });
    });

    if (violations.length > 0) {
      console.log('\n❌ Banned Phrases Found:');
      console.log('─'.repeat(50));
      violations.forEach((v) => {
        console.log(`❌ [${v.policy}] "${v.phrase}" (${v.count}× found)`);
      });
      console.log('\n❌ Validation FAILED');
      process.exit(1);
    } else {
      console.log('\n✅ All policies clean — no banned phrases found');
    }

    // Summary
    console.log('\n📋 Policies Summary:');
    console.log('─'.repeat(50));
    Object.keys(policies.policies).forEach((key) => {
      const policy = policies.policies[key];
      const sectionCount = policy.content.sections?.length || 0;
      console.log(`✓ ${policy.title}: ${sectionCount} sections`);
    });

    console.log('\n' + '═'.repeat(50) + '\n');
    return violations.length === 0;
  } catch (error) {
    console.error('❌ Validation Error:', error.message);
    process.exit(1);
  }
}

await validatePolicies();
