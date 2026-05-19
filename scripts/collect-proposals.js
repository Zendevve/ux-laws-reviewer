#!/usr/bin/env node

/**
 * Collect self-evolution proposals from review output files.
 * 
 * Scans markdown files for <!-- PROPOSED-LAW -->, <!-- PROPOSED-WCAG-MAP -->,
 * and <!-- PROPOSED-CHECKLIST --> blocks, deduplicates them, and outputs a summary.
 * 
 * Usage:
 *   node scripts/collect-proposals.js <directory-of-review-outputs>
 *   node scripts/collect-proposals.js <directory> --json
 */

const fs = require('fs');
const path = require('path');

const PROPOSAL_TYPES = [
  { tag: 'PROPOSED-LAW', label: 'New Law', nameKey: 'name' },
  { tag: 'PROPOSED-WCAG-MAP', label: 'WCAG Mapping', nameKey: 'criterion' },
  { tag: 'PROPOSED-CHECKLIST', label: 'Component Checklist', nameKey: 'ui-type' },
];

function extractProposals(text) {
  const proposals = [];

  for (const type of PROPOSAL_TYPES) {
    const regex = new RegExp(`<!--\\s*${type.tag}\\s*\\n([\\s\\S]*?)-->`, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      const body = match[1].trim();
      const fields = {};
      
      for (const line of body.split('\n')) {
        const kvMatch = line.match(/^(\w[\w-]*):\s*(.+)/);
        if (kvMatch) {
          fields[kvMatch[1]] = kvMatch[2].trim();
        }
      }

      proposals.push({
        type: type.tag,
        label: type.label,
        name: fields[type.nameKey] || 'Unknown',
        fields,
        raw: body
      });
    }
  }

  return proposals;
}

function scanDirectory(dirPath) {
  const allProposals = [];
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const proposals = extractProposals(content);
    for (const p of proposals) {
      p.sourceFile = file;
      allProposals.push(p);
    }
  }

  return allProposals;
}

function deduplicateByName(proposals) {
  const seen = new Set();
  return proposals.filter(p => {
    const key = `${p.type}:${p.name.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// CLI
const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');
const dirArg = args.find(a => !a.startsWith('--'));

if (!dirArg) {
  console.log('Usage: node scripts/collect-proposals.js <directory> [--json]');
  console.log('Scans markdown review outputs for self-evolution proposals.');
  process.exit(0);
}

if (!fs.existsSync(dirArg) || !fs.statSync(dirArg).isDirectory()) {
  console.error(`Not a directory: ${dirArg}`);
  process.exit(1);
}

const raw = scanDirectory(dirArg);
const unique = deduplicateByName(raw);

if (jsonOutput) {
  console.log(JSON.stringify({ total: raw.length, unique: unique.length, proposals: unique }, null, 2));
} else {
  if (unique.length === 0) {
    console.log('No proposals found in review outputs.');
    process.exit(0);
  }

  console.log(`Found ${raw.length} proposal(s), ${unique.length} unique:\n`);
  for (const p of unique) {
    console.log(`  [${p.label}] ${p.name}`);
    if (p.fields['evidence-strength']) {
      console.log(`    Evidence: ${p.fields['evidence-strength']}`);
    }
    if (p.fields.category) {
      console.log(`    Category: ${p.fields.category}`);
    }
    console.log(`    Source: ${p.sourceFile}`);
    console.log('');
  }
}
