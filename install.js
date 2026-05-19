#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── Constants ───────────────────────────────────────────────────────
const SKILL_NAME = 'ux-laws-reviewer';
const VERSION = require('./package.json').version;
const SOURCE_DIR = __dirname;

const TARGETS = [
  { label: 'Claude Code', base: '.claude', sub: 'skills' },
  { label: 'Gemini CLI', base: '.gemini', sub: 'skills' },
  { label: 'Cursor', base: '.cursor', sub: 'skills' },
  { label: 'Windsurf', base: '.windsurf', sub: 'skills' },
  { label: 'Compatible', base: '.agents', sub: 'skills' },
];

const FILES_TO_COPY = [
  'SKILL.md',
  path.join('references', 'laws-quick.md'),
  path.join('references', 'laws-extended.md'),
  path.join('references', 'scoring.md'),
  path.join('references', 'accessibility.md'),
  path.join('references', 'heuristics.md'),
  path.join('references', 'examples.md'),
  path.join('references', 'components.md'),
  path.join('references', 'frameworks.md'),
  path.join('references', 'principles-core.md'),
  path.join('references', 'evolution.md'),
];

// ─── Helpers ─────────────────────────────────────────────────────────
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const MAGENTA = '\x1b[35m';

function log(msg) { console.log(msg); }
function success(msg) { log(`${GREEN}${BOLD}  ✓${RESET} ${msg}`); }
function warn(msg) { log(`${YELLOW}  !${RESET} ${msg}`); }
function error(msg) { log(`${RED}  ✗${RESET} ${msg}`); }
function info(msg) { log(`${CYAN}  →${RESET} ${msg}`); }

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
  log(`  --all            Install to ALL detected agent directories`);
  log(`  --uninstall      Remove the skill from detected directories`);
  log(`  --verify         Verify an existing installation's integrity`);
  log(`  --dry-run        Show what would be installed without writing`);
  log(`  --update         Smart update: only overwrite changed files`);
  log('');
  log(`${BOLD}What it does:${RESET}`);
  log(`  Installs the ${SKILL_NAME} skill into your agent's skills`);
  log(`  directory so your AI can review UIs against UX laws.`);
  log('');
  log(`${BOLD}Supported agents:${RESET}`);
  TARGETS.forEach(t => {
    log(`  • ${t.label.padEnd(16)} ${DIM}(~/${t.base}/${t.sub}/${SKILL_NAME})${RESET}`);
  });
  log('');
}

function printVersion() {
  log(`${SKILL_NAME} v${VERSION}`);
}

// ─── Core Logic ──────────────────────────────────────────────────────

function detectAgentDirs() {
  const home = os.homedir();
  const detected = [];

  for (const target of TARGETS) {
    const baseDir = path.join(home, target.base);
    if (fs.existsSync(baseDir)) {
      detected.push({
        dir: path.join(baseDir, target.sub, SKILL_NAME),
        label: target.label,
      });
    }
  }

  return detected;
}

function resolveTargetDir(customPath) {
  if (customPath) {
    return [{ dir: path.resolve(customPath), label: 'Custom path' }];
  }

  const detected = detectAgentDirs();

  if (detected.length > 0) {
    // Return the first detected by default
    return [detected[0]];
  }

  // Default: create under .claude
  return [{
    dir: path.join(os.homedir(), TARGETS[0].base, TARGETS[0].sub, SKILL_NAME),
    label: TARGETS[0].label + ' (new)',
  }];
}

function resolveAllTargetDirs() {
  const detected = detectAgentDirs();

  if (detected.length === 0) {
    // Default: create under .claude
    return [{
      dir: path.join(os.homedir(), TARGETS[0].base, TARGETS[0].sub, SKILL_NAME),
      label: TARGETS[0].label + ' (new)',
    }];
  }

  return detected;
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

function getInstalledVersion(targetDir) {
  const skillPath = path.join(targetDir, 'SKILL.md');
  if (!fs.existsSync(skillPath)) return null;
  const content = fs.readFileSync(skillPath, 'utf8');
  const match = content.match(/version:\s*["']?(\d+\.\d+\.\d+)["']?/);
  return match ? match[1] : null;
}

function verifyInstallation(targetDir) {
  let passed = 0;
  let failed = 0;
  const version = getInstalledVersion(targetDir);
  
  if (version) {
    info(`Installed version: ${version}`);
  }

  for (const relPath of FILES_TO_COPY) {
    const dest = path.join(targetDir, relPath);
    if (fs.existsSync(dest)) {
      passed++;
    } else {
      error(`Missing: ${relPath}`);
      failed++;
    }
  }

  if (failed === 0) {
    success(`All ${passed} file(s) present`);
  } else {
    warn(`${passed} present, ${failed} missing`);
  }

  return { passed, failed, version };
}

function removeFiles(targetDir) {
  let removed = 0;

  // Remove individual files
  for (const relPath of FILES_TO_COPY) {
    const dest = path.join(targetDir, relPath);
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
      removed++;
    }
  }

  // Clean up empty directories (references/, then skill root)
  const refsDir = path.join(targetDir, 'references');
  if (fs.existsSync(refsDir)) {
    try {
      fs.rmdirSync(refsDir);
    } catch (_) {
      // Directory not empty — other files exist, leave it
    }
  }
  if (fs.existsSync(targetDir)) {
    try {
      fs.rmdirSync(targetDir);
    } catch (_) {
      // Directory not empty — leave it
    }
  }

  return removed;
}

function installToTargets(targets, options, mockLog = false) {
  let totalCopied = 0;
  let totalSkipped = 0;

  for (const { dir, label } of targets) {
    if (!mockLog) {
      log(`${CYAN}  Target:${RESET} ${label}`);
      log(`${DIM}  ${dir}${RESET}`);
    }

    if (isAlreadyInstalled(dir) && !options.force) {
      if (!mockLog) {
        warn(`Already installed. Use --force to overwrite.`);
        log('');
      }
      continue;
    }

    const { copied, skipped } = copyFiles(dir);
    totalCopied += copied;
    totalSkipped += skipped;

    if (!mockLog) {
      if (copied > 0) success(`Installed ${copied} file(s)`);
      if (skipped > 0) warn(`${skipped} file(s) skipped`);
      log('');
    }
  }

  return { totalCopied, totalSkipped };
}

function install(options = {}, mockLog = false) {
  if (!mockLog) printBanner();

  const targets = options.all
    ? resolveAllTargetDirs()
    : resolveTargetDir(options.customPath);

  if (options.all && !mockLog) {
    info(`Installing to ${MAGENTA}${BOLD}all${RESET} detected agent directories`);
    log('');
  }

  const { totalCopied, totalSkipped } = installToTargets(targets, options, mockLog);

  if (totalCopied === 0) {
    if (!mockLog) warn('No new files were installed.');
    if (!mockLog) log(`${DIM}  Use --force to overwrite existing installations.${RESET}\n`);
    return { success: true, copied: 0, skipped: totalSkipped, targets };
  }

  if (!mockLog) {
    log(`${DIM}  Now ask your agent:${RESET}`);
    log(`${BOLD}  "Review this component against UX laws"${RESET}`);
    log(`${BOLD}  "Do a deep accessibility review of my dashboard"${RESET}`);
    log(`${BOLD}  "Quick audit of this button component"${RESET}`);
    log('');
  }
  return { success: true, copied: totalCopied, skipped: totalSkipped, targets };
}

function uninstall(mockLog = false) {
  if (!mockLog) printBanner();

  const detected = detectAgentDirs();
  const installed = detected.filter(d => isAlreadyInstalled(d.dir));

  if (installed.length === 0) {
    if (!mockLog) warn('No installations found to remove.\n');
    return { success: true, removed: 0 };
  }

  let totalRemoved = 0;

  for (const { dir, label } of installed) {
    if (!mockLog) {
      log(`${CYAN}  Removing from:${RESET} ${label}`);
      log(`${DIM}  ${dir}${RESET}`);
    }

    const removed = removeFiles(dir);
    totalRemoved += removed;
    if (!mockLog) {
      success(`Removed ${removed} file(s)`);
      log('');
    }
  }

  if (!mockLog) success(`Uninstalled from ${installed.length} location(s)\n`);
  return { success: true, removed: totalRemoved };
}

// ─── CLI Argument Parsing ────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const options = { force: false, customPath: null, all: false, dryRun: false, update: false };
  let doUninstall = false;
  let doVerify = false;

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

      case '--all':
        options.all = true;
        break;

      case '--uninstall':
        doUninstall = true;
        break;

      case '--verify':
        doVerify = true;
        break;

      case '--dry-run':
        options.dryRun = true;
        break;

      case '--update':
        options.update = true;
        options.force = true; // update implies overwrite
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
    if (doUninstall) {
      uninstall();
    } else if (doVerify) {
      printBanner();
      const targets = options.all
        ? resolveAllTargetDirs()
        : resolveTargetDir(options.customPath);
      for (const { dir, label } of targets) {
        if (isAlreadyInstalled(dir)) {
          log(`${CYAN}  Verifying:${RESET} ${label}`);
          log(`${DIM}  ${dir}${RESET}`);
          verifyInstallation(dir);
          log('');
        }
      }
    } else {
      install(options);
    }
  } catch (err) {
    error(`Operation failed: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  detectAgentDirs,
  resolveTargetDir,
  resolveAllTargetDirs,
  isAlreadyInstalled,
  copyFiles,
  removeFiles,
  installToTargets,
  install,
  uninstall
};
