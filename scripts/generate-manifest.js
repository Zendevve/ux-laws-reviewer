#!/usr/bin/env node

/**
 * Generate or verify manifest.json for the ux-laws-reviewer skill.
 * 
 * Usage:
 *   node scripts/generate-manifest.js          # Generate manifest.json
 *   node scripts/generate-manifest.js --verify  # Verify existing manifest
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'manifest.json');

const SKILL_FILES = [
  { path: 'SKILL.md', role: 'entry' },
  { path: 'references/principles-core.md', role: 'reference', modes: ['quick', 'standard', 'deep'] },
  { path: 'references/laws-quick.md', role: 'reference', modes: ['quick', 'standard', 'deep'] },
  { path: 'references/laws-extended.md', role: 'reference', modes: ['standard', 'deep'] },
  { path: 'references/scoring.md', role: 'reference', modes: ['quick', 'standard', 'deep'] },
  { path: 'references/accessibility.md', role: 'reference', modes: ['quick', 'standard', 'deep'] },
  { path: 'references/heuristics.md', role: 'reference', modes: ['deep'] },
  { path: 'references/examples.md', role: 'reference', modes: ['quick', 'standard', 'deep'] },
  { path: 'references/components.md', role: 'reference', modes: ['quick', 'standard', 'deep'] },
  { path: 'references/frameworks.md', role: 'reference', modes: ['standard', 'deep'] },
  { path: 'references/evolution.md', role: 'reference', modes: ['standard', 'deep'] },
];

function sha256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function generateManifest() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const manifest = {
    name: 'ux-laws-reviewer',
    version: pkg.version,
    schema: 'manifest-v1',
    generated: new Date().toISOString(),
    files: {}
  };

  let missing = 0;
  for (const file of SKILL_FILES) {
    const fullPath = path.join(ROOT, file.path);
    if (!fs.existsSync(fullPath)) {
      console.error(`  ✗ Missing file: ${file.path}`);
      missing++;
      continue;
    }
    manifest.files[file.path] = {
      sha256: sha256(fullPath),
      role: file.role,
      ...(file.modes ? { modes: file.modes } : {}),
      size: fs.statSync(fullPath).size
    };
  }

  if (missing > 0) {
    console.error(`\n${missing} file(s) missing. Manifest not generated.`);
    process.exit(1);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`✓ Generated manifest.json (v${pkg.version}, ${SKILL_FILES.length} files)`);
  return manifest;
}

function verifyManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('✗ manifest.json not found. Run without --verify to generate.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  console.log(`Verifying manifest v${manifest.version}...\n`);

  let passed = 0;
  let failed = 0;

  for (const [filePath, meta] of Object.entries(manifest.files)) {
    const fullPath = path.join(ROOT, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`  ✗ Missing: ${filePath}`);
      failed++;
      continue;
    }

    const actual = sha256(fullPath);
    if (actual !== meta.sha256) {
      console.error(`  ✗ Modified: ${filePath}`);
      console.error(`    Expected: ${meta.sha256.slice(0, 16)}...`);
      console.error(`    Actual:   ${actual.slice(0, 16)}...`);
      failed++;
    } else {
      console.log(`  ✓ ${filePath}`);
      passed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

// CLI
const args = process.argv.slice(2);
if (args.includes('--verify')) {
  verifyManifest();
} else {
  generateManifest();
}
