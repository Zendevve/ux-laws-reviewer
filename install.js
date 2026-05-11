#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── Constants ───────────────────────────────────────────────────────
const SKILL_NAME = 'ux-laws-reviewer';
const VERSION = require('./package.json').version;
const SOURCE_DIR = __dirname;

const TARGETS = [
  { label: 'Claude Code', base: '.claude' },
  { label: 'Agents (compatible)', base: '.agents' },
];

const FILES_TO_COPY = [
  'SKILL.md',
  path.join('references', 'laws.md'),
  path.join('references', 'scoring.md'),
];

// ─── Helpers ─────────────────────────────────────────────────────────
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

function log(msg) { console.log(msg); }
function success(msg) { log(`${GREEN}${BOLD}  ✓${RESET} ${msg}`); }
function warn(msg) { log(`${YELLOW}  !${RESET} ${msg}`); }
function error(msg) { log(`${RED}  ✗${RESET} ${msg}`); }

function printBanner() {
  log('');
  log(`${DIM}───────────────────────────────────────────${RESET}`);
  log(`${BOLD}  UX Laws Reviewer${RESET}  ${DIM}v${VERSION}${RESET}`);
  log(`${DIM}  Review UI code against psychological UX laws${RESET}`);
  log(`${DIM}───────────────────────────────────────────${RESET}`);
  log('');
}

function printHelp() {
  printBanner();
  log(`${BOLD}Usage:${RESET}  npx ${SKILL_NAME} [options]`);
  log('');
  log(`${BOLD}Options:${RESET}`);
  log(`  --help, -h       Show this help message`);
  log(`  --version, -v    Show version number`);
  log(`  --force, -f      Overwrite existing installation`);
  log(`  --path <dir>     Install to a custom directory`);
  log('');
  log(`${BOLD}What it does:${RESET}`);
  log(`  Installs the ${SKILL_NAME} skill into your agent's skills`);
  log(`  directory so your AI can review UIs against UX laws.`);
  log('');
  log(`${BOLD}Supported agents:${RESET}`);
  log(`  • Claude Code   ${DIM}(~/.claude/skills/${SKILL_NAME})${RESET}`);
  log(`  • Compatible    ${DIM}(~/.agents/skills/${SKILL_NAME})${RESET}`);
  log('');
}

function printVersion() {
  log(`${SKILL_NAME} v${VERSION}`);
}

// ─── Core Logic ──────────────────────────────────────────────────────
function resolveTargetDir(customPath) {
  if (customPath) {
    return { dir: path.resolve(customPath), label: 'Custom path' };
  }

  const home = os.homedir();

  // Prefer .claude if it exists; fall back to .agents; default to .claude
  for (const target of TARGETS) {
    const baseDir = path.join(home, target.base);
    if (fs.existsSync(baseDir)) {
      return {
        dir: path.join(baseDir, 'skills', SKILL_NAME),
        label: target.label,
      };
    }
  }

  // Default: create under .claude
  return {
    dir: path.join(home, TARGETS[0].base, 'skills', SKILL_NAME),
    label: TARGETS[0].label + ' (new)',
  };
}

function isAlreadyInstalled(targetDir) {
  return fs.existsSync(path.join(targetDir, 'SKILL.md'));
}

function copyFiles(targetDir) {
  let copied = 0;
  let skipped = 0;

  for (const relPath of FILES_TO_COPY) {
    const src = path.join(SOURCE_DIR, relPath);
    const dest = path.join(targetDir, relPath);

    if (!fs.existsSync(src)) {
      warn(`Source file not found, skipping: ${relPath}`);
      skipped++;
      continue;
    }

    // Ensure parent dir exists
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    copied++;
  }

  return { copied, skipped };
}

function install(options = {}) {
  printBanner();

  const { dir: targetDir, label } = resolveTargetDir(options.customPath);

  log(`${CYAN}  Target:${RESET} ${label}`);
  log(`${DIM}  ${targetDir}${RESET}`);
  log('');

  // Check existing installation
  if (isAlreadyInstalled(targetDir) && !options.force) {
    warn(`Skill already installed at this location.`);
    log(`${DIM}  Use --force to overwrite the existing installation.${RESET}`);
    log('');
    process.exit(0);
  }

  // Perform install
  const { copied, skipped } = copyFiles(targetDir);

  if (copied === 0) {
    error('No files were copied. Installation failed.');
    process.exit(1);
  }

  log('');
  success(`Installed ${copied} file(s) to ${label}`);
  if (skipped > 0) {
    warn(`${skipped} file(s) skipped (not found in package)`);
  }

  log('');
  log(`${DIM}  Now ask your agent:${RESET}`);
  log(`${BOLD}  "Review this component against UX laws"${RESET}`);
  log(`${BOLD}  "Audit my pricing page for cognitive load"${RESET}`);
  log(`${BOLD}  "Score this form's usability"${RESET}`);
  log('');
}

// ─── CLI Argument Parsing ────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const options = { force: false, customPath: null };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;

      case '--version':
      case '-v':
        printVersion();
        process.exit(0);
        break;

      case '--force':
      case '-f':
        options.force = true;
        break;

      case '--path':
        if (!args[i + 1]) {
          error('--path requires a directory argument');
          process.exit(1);
        }
        options.customPath = args[++i];
        break;

      default:
        error(`Unknown option: ${args[i]}`);
        log(`${DIM}  Run "npx ${SKILL_NAME} --help" for usage info.${RESET}`);
        process.exit(1);
    }
  }

  try {
    install(options);
  } catch (err) {
    error(`Installation failed: ${err.message}`);
    process.exit(1);
  }
}

main();
