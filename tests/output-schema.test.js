const test = require('node:test');
const assert = require('node:assert');
const { validateOutput } = require('../evals/eval_runner');

test('Output Schema Validation Tests', async (t) => {

  await t.test('Valid standard output passes', () => {
    const output = `
### 🎯 Context
| Attribute | Value |
|-----------|-------|
| Platform  | Desktop |

### 📊 UX Score: **72/100**
| Dimension | Score | Notes |
|-----------|-------|-------|
| Cognitive Efficiency | 15/20 | Good |

### 🔍 Key UX Findings
> **🔴 Hick's Law (Violation)** [WCAG 2.1.1]
> Too many nav items.

### 🛠️ Actionable Improvements
1. Reduce nav to 5 items.

### 💡 Quick Wins
1. Add focus styles.
`;
    const result = validateOutput(output);
    assert.ok(result.valid, `Errors: ${result.errors.join(', ')}`);
    assert.strictEqual(result.meta.score, 72);
  });

  await t.test('Score without bold markdown passes', () => {
    const output = `
### 🎯 Context
### 📊 UX Score: 65/100
### 🔍 Key UX Findings
WCAG 2.1.1
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(result.valid, `Errors: ${result.errors.join(', ')}`);
    assert.strictEqual(result.meta.score, 65);
  });

  await t.test('Missing Context section fails', () => {
    const output = `
### 📊 UX Score: 72/100
### 🔍 Key UX Findings
WCAG 2.1.1
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(!result.valid);
    assert.ok(result.errors.some(e => e.includes('Context')));
  });

  await t.test('Missing UX Score fails', () => {
    const output = `
### 🎯 Context
### 🔍 Key UX Findings
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(!result.valid);
    assert.ok(result.errors.some(e => e.includes('Score')));
  });

  await t.test('Score out of range (150) fails', () => {
    const output = `
### 🎯 Context
### 📊 UX Score: **150/100**
### 🔍 Key UX Findings
WCAG 2.1.1
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(!result.valid);
    assert.ok(result.errors.some(e => e.includes('out of range')));
  });

  await t.test('Score of 0 is valid', () => {
    const output = `
### 🎯 Context
### 📊 UX Score: **0/100**
### 🔍 Key UX Findings
WCAG 2.1.1
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(result.valid, `Errors: ${result.errors.join(', ')}`);
    assert.strictEqual(result.meta.score, 0);
  });

  await t.test('Score of 100 is valid', () => {
    const output = `
### 🎯 Context
### 📊 UX Score: **100/100**
### 🔍 Key UX Findings
WCAG 2.1.1
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(result.valid, `Errors: ${result.errors.join(', ')}`);
    assert.strictEqual(result.meta.score, 100);
  });

  await t.test('Output without WCAG tags generates warning', () => {
    const output = `
### 🎯 Context
### 📊 UX Score: **50/100**
### 🔍 Key UX Findings
Some findings without tags.
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output);
    assert.ok(result.warnings.length > 0, 'Expected a WCAG warning');
  });

  await t.test('Deep mode warns if Nielsen table missing', () => {
    const output = `
### 🎯 Context
### 📊 UX Score: **60/100**
### 🔍 Key UX Findings
WCAG 2.1.1
### 🛠️ Actionable Improvements
`;
    const result = validateOutput(output, { mode: 'deep' });
    assert.ok(result.warnings.some(w => w.includes('Nielsen')));
  });

  await t.test('Null input fails gracefully', () => {
    const result = validateOutput(null);
    assert.ok(!result.valid);
  });

  await t.test('Empty string fails gracefully', () => {
    const result = validateOutput('');
    assert.ok(!result.valid);
  });

  await t.test('Non-string input fails gracefully', () => {
    const result = validateOutput(42);
    assert.ok(!result.valid);
  });
});
