const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { validateWCAGCriteria } = require('./wcag-criteria');

const ROOT = path.join(__dirname, '..');
const REFS = path.join(ROOT, 'references');

function readRef(filename) {
  return fs.readFileSync(path.join(REFS, filename), 'utf8');
}

function readSkill() {
  return fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf8');
}

function extractLawNames(text) {
  const headings = [];
  for (const line of text.split('\n')) {
    const match = line.match(/^##\s+(?:###\s+)?(.+)/);
    if (match) {
      const name = match[1].trim();
      if (!name.match(/^(How to Use|Detection Patterns|Takeaways|Formula|Key Principles|Audit Order|Universal Principle|Evidence Discipline|Platform|Minimal Output|Quick Reference|Perceivable|Operable|Understandable|Robust|Severity Matrix|Scoring Dimensions|Score Interpretation|Applying the Score|Calibration Anchors|Principles-First)/i)) {
        headings.push(name);
      }
    }
  }
  return headings;
}

test('Reference Integrity Tests', async (t) => {

  await t.test('All reference files referenced in SKILL.md exist', () => {
    const skill = readSkill();
    const refs = [...new Set(skill.match(/references\/[\w-]+\.md/g) || [])];
    assert.ok(refs.length >= 7, `Expected ≥7 ref files, found ${refs.length}`);
    for (const ref of refs) {
      assert.ok(fs.existsSync(path.join(ROOT, ref)), `Missing: ${ref}`);
    }
  });

  await t.test('All WCAG criteria in accessibility.md are valid', () => {
    const { invalid } = validateWCAGCriteria(readRef('accessibility.md'));
    assert.deepStrictEqual(invalid, [], `Hallucinated WCAG: ${invalid.join(', ')}`);
  });

  await t.test('All WCAG criteria in scoring.md are valid', () => {
    const { invalid } = validateWCAGCriteria(readRef('scoring.md'));
    assert.deepStrictEqual(invalid, [], `Hallucinated WCAG: ${invalid.join(', ')}`);
  });

  await t.test('All WCAG criteria in laws-quick.md are valid', () => {
    const { invalid } = validateWCAGCriteria(readRef('laws-quick.md'));
    assert.deepStrictEqual(invalid, [], `Hallucinated WCAG: ${invalid.join(', ')}`);
  });

  await t.test('All WCAG criteria in laws-extended.md are valid', () => {
    const { invalid } = validateWCAGCriteria(readRef('laws-extended.md'));
    assert.deepStrictEqual(invalid, [], `Hallucinated WCAG: ${invalid.join(', ')}`);
  });

  await t.test('All WCAG criteria in heuristics.md are valid', () => {
    const { invalid } = validateWCAGCriteria(readRef('heuristics.md'));
    assert.deepStrictEqual(invalid, [], `Hallucinated WCAG: ${invalid.join(', ')}`);
  });

  await t.test('All WCAG criteria in components.md are valid', () => {
    const { invalid } = validateWCAGCriteria(readRef('components.md'));
    assert.deepStrictEqual(invalid, [], `Hallucinated WCAG: ${invalid.join(', ')}`);
  });

  await t.test('No duplicate law entries across quick and extended', () => {
    const quick = extractLawNames(readRef('laws-quick.md'));
    const extended = extractLawNames(readRef('laws-extended.md'));
    const dupes = quick.filter(l => extended.includes(l)).filter(d => !d.match(/^Gestalt/i));
    assert.deepStrictEqual(dupes, [], `Duplicates: ${dupes.join(', ')}`);
  });

  await t.test('Combined law count is 25+', () => {
    const total = extractLawNames(readRef('laws-quick.md')).length + extractLawNames(readRef('laws-extended.md')).length;
    assert.ok(total >= 25, `Expected 25+ laws, found ${total}`);
  });

  await t.test('Scoring rubric has 5 dimensions scored 0-20', () => {
    const scoring = readRef('scoring.md');
    assert.strictEqual((scoring.match(/### \d+\. /g) || []).length, 5, 'Need 5 dimensions');
    assert.strictEqual((scoring.match(/\(0–20\)/g) || []).length, 5, 'Need 5 (0-20) ranges');
  });

  await t.test('Score interpretation covers full 0-100 range', () => {
    const s = readRef('scoring.md');
    for (const range of ['90–100', '80–89', '70–79', '60–69', '50–59', '0–49']) {
      assert.ok(s.includes(range), `Missing range: ${range}`);
    }
  });

  await t.test('Component checklists have ≥7 UI types with priorities', () => {
    const c = readRef('components.md');
    assert.ok((c.match(/^## [A-Z]/gm) || []).length >= 7, 'Need ≥7 UI types');
    assert.ok((c.match(/\*\*P1\*\*/g) || []).length >= 7, 'Need ≥7 P1 entries');
  });

  await t.test('Examples file has ≥2 annotated examples', () => {
    const e = readRef('examples.md');
    assert.ok((e.match(/## Example \d+/g) || []).length >= 2, 'Need ≥2 examples');
    assert.ok(e.includes('Quick'), 'Need Quick mode example');
    assert.ok(e.includes('Standard'), 'Need Standard mode example');
  });

  await t.test('Heuristics file has all 10 Nielsen heuristics', () => {
    const h = readRef('heuristics.md');
    for (let i = 1; i <= 10; i++) {
      assert.ok(h.includes(`## ${i}.`), `Missing heuristic #${i}`);
    }
  });

  await t.test('Principles core has audit order and evidence discipline', () => {
    const p = readRef('principles-core.md');
    assert.ok(p.includes('Audit Order'), 'Missing audit order');
    assert.ok(p.includes('Evidence Discipline'), 'Missing evidence discipline');
    for (const tag of ['[Observed]', '[Inferred]', '[Assumption]']) {
      assert.ok(p.includes(tag), `Missing evidence tag: ${tag}`);
    }
  });

  await t.test('Severity levels consistent across scoring.md and SKILL.md', () => {
    const scoring = readRef('scoring.md');
    const skill = readSkill();
    for (const level of ['Critical', 'Major', 'Minor', 'Positive']) {
      assert.ok(scoring.includes(level), `scoring.md missing: ${level}`);
      assert.ok(skill.includes(level), `SKILL.md missing: ${level}`);
    }
  });
});
