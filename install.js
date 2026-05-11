#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const skillName = 'ux-laws-reviewer';
const claudeSkillsDir = path.join(os.homedir(), '.claude', 'skills', skillName);
const agentsSkillsDir = path.join(os.homedir(), '.agents', 'skills', skillName);

// Determine which directory exists, prefer .claude
let targetDir = claudeSkillsDir;
if (!fs.existsSync(path.join(os.homedir(), '.claude')) && fs.existsSync(path.join(os.homedir(), '.agents'))) {
    targetDir = agentsSkillsDir;
}

console.log(`Installing ${skillName} skill...`);

// Ensure target directory exists
fs.mkdirSync(path.join(targetDir, 'references'), { recursive: true });

// Copy files
const sourceDir = __dirname;
fs.copyFileSync(path.join(sourceDir, 'SKILL.md'), path.join(targetDir, 'SKILL.md'));
fs.copyFileSync(path.join(sourceDir, 'references', 'laws.md'), path.join(targetDir, 'references', 'laws.md'));

console.log(`\n✅ Skill successfully installed to: ${targetDir}`);
console.log(`\nYou can now use this skill in Claude by asking it to "review my UI against UX laws" or "critique this design".`);
