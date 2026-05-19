#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────
// Each entry can be a string (exact includes) or array of alternatives
const REQUIRED_SECTIONS = [
  'Context',
  'UX Score',
  ['Key Findings', 'Key UX Findings'],
  'Actionable Improvements'
];

const QUICK_MODE_SECTIONS = ['Quick UX Audit', 'Top Findings', 'Quick Wins'];
const DEEP_MODE_SECTIONS = ['Nielsen Heuristic Summary'];

const WCAG_REGEX = /WCAG\s(\d\.\d+\.\d+)/g;
// Tolerant of bold markdown (**), spaces, and various formatting
const SCORE_REGEX = /Score:?\s*\*{0,2}(\d{1,3})\/100\*{0,2}/i;

// ─── Validation Functions ────────────────────────────────────────────

function validateOutput(markdownText, options = {}) {
  const results = {
    valid: true,
    errors: [],
    warnings: [],
    meta: {}
  };

  if (!markdownText || typeof markdownText !== 'string') {
    results.valid = false;
    results.errors.push('Output is not a valid string');
    return results;
  }

  // 1. Required Sections
  for (const section of REQUIRED_SECTIONS) {
    if (Array.isArray(section)) {
      // Any alternative must match
      if (!section.some(alt => markdownText.includes(alt))) {
        results.valid = false;
        results.errors.push(`Missing required section: "${section[0]}" (or variant)`);
      }
    } else if (!markdownText.includes(section)) {
      results.valid = false;
      results.errors.push(`Missing required section: "${section}"`);
    }
  }

  // 2. Score Range Check
  const scoreMatch = markdownText.match(SCORE_REGEX);
  if (scoreMatch) {
    const score = parseInt(scoreMatch[1], 10);
    results.meta.score = score;
    if (score < 0 || score > 100) {
      results.valid = false;
      results.errors.push(`Score out of range: ${score} (must be 0-100)`);
    }
  } else {
    results.valid = false;
    results.errors.push('Could not find UX Score matching "Score: X/100" format');
  }

  // 3. WCAG Criteria Validator
  const wcagMatches = [];
  let match;
  const wcagRegex = /WCAG\s(\d\.\d+\.\d+)/g;
  while ((match = wcagRegex.exec(markdownText)) !== null) {
    wcagMatches.push(match[1]);
  }
  results.meta.wcagCount = wcagMatches.length;

  if (wcagMatches.length === 0) {
    results.warnings.push('No WCAG criteria tags found (e.g. "WCAG 1.4.3")');
  }

  // 4. Validate cited WCAG criteria against known-good list (if available)
  try {
    const { isValidWCAG } = require(path.join(__dirname, '..', 'tests', 'wcag-criteria'));
    const invalidCriteria = wcagMatches.filter(c => !isValidWCAG(c));
    if (invalidCriteria.length > 0) {
      results.warnings.push(`Potentially hallucinated WCAG criteria: ${[...new Set(invalidCriteria)].join(', ')}`);
    }
  } catch (_) {
    // wcag-criteria module not available — skip this check
  }

  // 5. Severity ordering check
  const severityOrder = ['🔴', '🟠', '🟡', '🟢'];
  let lastSeverityIdx = -1;
  let orderViolation = false;
  for (const line of markdownText.split('\n')) {
    for (let i = 0; i < severityOrder.length; i++) {
      if (line.includes(severityOrder[i]) && line.includes('Violation') || line.includes('Positive')) {
        if (i < lastSeverityIdx) orderViolation = true;
        lastSeverityIdx = i;
        break;
      }
    }
  }
  if (orderViolation) {
    results.warnings.push('Findings not ordered by severity (Critical → Major → Minor → Positive)');
  }

  // 6. Mode-specific checks
  if (options.mode === 'quick') {
    if (markdownText.includes('Nielsen Heuristic Summary')) {
      results.warnings.push('Quick mode output should not include Nielsen Heuristic Summary');
    }
  }
  if (options.mode === 'deep') {
    for (const section of DEEP_MODE_SECTIONS) {
      if (!markdownText.includes(section)) {
        results.warnings.push(`Deep mode output missing expected section: "${section}"`);
      }
    }
  }

  return results;
}

// ─── Self/Integrity Check (CI) ───────────────────────────────────────
function runIntegrityCheck() {
  console.log('Running eval and integrity checks...');
  const evalsPath = path.join(__dirname, 'evals.json');
  
  if (!fs.existsSync(evalsPath)) {
    console.error('✗ evals.json not found!');
    process.exit(1);
  }

  try {
    const evals = JSON.parse(fs.readFileSync(evalsPath, 'utf8'));
    if (!evals.skill_name || !evals.evals || !Array.isArray(evals.evals)) {
      console.error('✗ Invalid evals.json schema');
      process.exit(1);
    }
    console.log(`✓ Loaded ${evals.evals.length} evaluation definitions.`);
  } catch (e) {
    console.error('✗ Failed to parse evals.json:', e.message);
    process.exit(1);
  }

  // Verify references exist
  const skillFile = path.join(__dirname, '..', 'SKILL.md');
  if (fs.existsSync(skillFile)) {
    const content = fs.readFileSync(skillFile, 'utf8');
    const matches = content.match(/references\/[\w-]+\.md/g) || [];
    for (const ref of matches) {
      const refPath = path.join(__dirname, '..', ref);
      if (!fs.existsSync(refPath)) {
         console.error(`✗ Referenced file missing: ${ref}`);
         process.exit(1);
      }
    }
    console.log(`✓ Reference integrity check passed.`);
  }

  console.log('✓ All integrity checks passed.');
}

// ─── CLI Entry Point ─────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  let jsonOutput = false;
  let mode = null;
  const positional = [];

  for (const arg of args) {
    if (arg === '--check') { runIntegrityCheck(); process.exit(0); }
    else if (arg === '--json') jsonOutput = true;
    else if (arg.startsWith('--mode=')) mode = arg.split('=')[1];
    else positional.push(arg);
  }

  const fileToEval = positional[0];
  if (!fileToEval) {
    console.log('Usage: node eval_runner.js <path-to-llm-output.md> [--json] [--mode=quick|standard|deep] | --check');
    process.exit(0);
  }

  if (!fs.existsSync(fileToEval)) {
    console.error(`File not found: ${fileToEval}`);
    process.exit(1);
  }

  const content = fs.readFileSync(fileToEval, 'utf8');
  const result = validateOutput(content, { mode });

  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.valid ? 0 : 1);
  }

  console.log(`Evaluating: ${fileToEval}\n`);
  
  if (result.valid && result.warnings.length === 0) {
    console.log('✅ PASS: Output meets all criteria.');
  } else {
    if (!result.valid) console.log('❌ FAIL: Output failed validation.');
    else console.log('⚠️ PASS (with warnings): Output valid but has warnings.');
    
    if (result.errors.length > 0) {
      console.log('\nErrors:');
      result.errors.forEach(e => console.log(`  - ${e}`));
    }
    if (result.warnings.length > 0) {
      console.log('\nWarnings:');
      result.warnings.forEach(w => console.log(`  - ${w}`));
    }
    if (!result.valid) process.exit(1);
  }
}

module.exports = { validateOutput };