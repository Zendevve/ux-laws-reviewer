# Testing

## Test Suite Overview

ux-laws-reviewer uses a lightweight testing approach appropriate for a skill package:

1. **Installer verification** — Ensures the CLI installer works correctly
2. **Evaluation queries** — Tests the skill's output against known inputs
3. **Manual review** — Human validation of audit quality

## Running Tests

### Basic Test

```bash
npm test
```

This runs `node install.js --help` to verify:
- The installer script executes without errors
- Help output is displayed correctly
- All CLI flags are documented

### Manual Installer Testing

Test the installer with various flags:

```bash
# Test help output
node install.js --help

# Test version output
node install.js --version

# Test dry-run installation
node install.js --path ./test-destination
```

## Evaluation Suite

The `evals/` directory contains test fixtures and queries:

### Files

- `evals.json` — Primary evaluation queries
- `eval_queries.json` — Additional evaluation scenarios
- `files/bad-login.jsx` — Sample React component with intentional UX issues

### Running Evaluations

Evaluations are designed to be run by AI agents using the skill. To test:

1. Install the skill to your agent's directory
2. Feed the evaluation queries to your agent
3. Compare output against expected format and coverage

### Expected Evaluation Coverage

A complete evaluation should verify:
- All 25+ UX laws are referenced in outputs
- WCAG 2.2 criteria are correctly cited
- Scoring produces values in the 0-100 range
- Output format matches the specified templates
- Severity levels are correctly assigned
- Quick wins are actionable and specific

## Testing Review Modes

### Quick Mode Test

Provide a small component (≤50 lines) and verify:
- Output includes score + top 3 findings + 2 quick wins
- Only top 8 laws are referenced
- Output is compact

### Standard Mode Test

Provide a full page layout and verify:
- All output sections are present
- Full law coverage (25+ laws)
- Accessibility snapshot table is included

### Deep Mode Test

Request a deep review and verify:
- All standard sections are present
- Nielsen heuristics summary table is included
- Detailed accessibility report is included

## Regression Testing

When updating reference files:

1. Run existing evaluation queries
2. Compare output format and content quality
3. Verify scoring consistency with calibration anchors
4. Check that new laws/criteria are properly integrated

## CI/CD Considerations

For automated testing in CI:

```yaml
# Example GitHub Actions step
- name: Test installer
  run: npm test
```

Since the skill's core value is in AI-generated output quality, consider:
- Periodic manual review of evaluation outputs
- Tracking score distributions across test cases
- Monitoring for hallucinated WCAG criteria
