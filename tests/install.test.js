const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const installScript = require('../install.js');

test('Installer Logic Tests', async (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-laws-reviewer-test-'));

  await t.test('detectAgentDirs returns an array', () => {
    const dirs = installScript.detectAgentDirs();
    assert(Array.isArray(dirs));
  });

  await t.test('resolveTargetDir handles customPath', () => {
    const custom = path.join(tmpDir, 'custom-install');
    const target = installScript.resolveTargetDir(custom);
    assert.strictEqual(target.length, 1);
    assert.strictEqual(target[0].dir, custom);
  });

  await t.test('copyFiles copies required files', () => {
    const destDir = path.join(tmpDir, 'install-dest');
    fs.mkdirSync(destDir);
    const result = installScript.copyFiles(destDir);
    assert.ok(result.copied > 0);
    assert.ok(fs.existsSync(path.join(destDir, 'SKILL.md')));
    assert.ok(fs.existsSync(path.join(destDir, 'references', 'principles-core.md')));
  });

  await t.test('isAlreadyInstalled detects existing installation', () => {
    const destDir = path.join(tmpDir, 'install-dest');
    assert.ok(installScript.isAlreadyInstalled(destDir));
  });

  await t.test('removeFiles cleans up properly', () => {
    const destDir = path.join(tmpDir, 'install-dest');
    const removed = installScript.removeFiles(destDir);
    assert.ok(removed > 0);
    assert.ok(!fs.existsSync(path.join(destDir, 'SKILL.md')));
  });

  await t.test('cleanup', () => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
