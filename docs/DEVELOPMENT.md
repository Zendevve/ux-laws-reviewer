# Development

## Project Structure

```
ux-laws-reviewer/
├── SKILL.md              # Main skill definition
├── references/           # Knowledge base files
├── install.js            # CLI installer
├── package.json          # Package configuration
├── evals/                # Evaluation test suite
└── docs/                 # Documentation
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Zendevve/ux-laws-reviewer.git
cd ux-laws-reviewer
```

2. No build step required — this is a Markdown + JavaScript project.

3. Test the installer locally:
```bash
node install.js --help
```

## Making Changes

### Updating UX Laws

Edit `references/laws-extended.md` or `references/laws-quick.md` to add, modify, or refine law definitions. Each law should include:
- Name and description
- Key takeaway for designers
- Detection patterns or signals

### Updating Scoring

Edit `references/scoring.md` to modify:
- Dimension scoring criteria
- Severity matrix thresholds
- Calibration anchors

### Updating Accessibility Criteria

Edit `references/accessibility.md` to:
- Add new WCAG 2.2 criteria
- Update mappings between laws and accessibility checks
- Modify scoring deductions

### Adding UI-Type Checklists

Edit `references/components.md` to add priority-ranked checklists for new UI types (e.g., onboarding flows, data tables, settings pages).

### Adding Framework Anti-Patterns

Edit `references/frameworks.md` to document framework-specific issues (React, Vue, Svelte, CSS).

## Testing

Run the basic test:

```bash
npm test
```

This runs `node install.js --help` to verify the installer works.

### Manual Testing

1. Install locally to a test directory:
```bash
node install.js --path ./test-install
```

2. Verify files were copied:
```bash
ls -la ./test-install/
```

3. Clean up:
```bash
rm -rf ./test-install
```

### Evaluation Suite

The `evals/` directory contains evaluation queries for testing the skill's output quality:

- `evals.json` — Main evaluation queries
- `eval_queries.json` — Additional queries
- `files/bad-login.jsx` — Sample component for testing

## Publishing

1. Update version in `package.json`
2. Update version in `SKILL.md` metadata
3. Update `CHANGELOG.md`
4. Package:
```bash
npm pack
```

5. Publish:
```bash
npm publish
```

## Code Style

- Markdown files use consistent heading levels and table formatting
- JavaScript follows CommonJS conventions (`package.json` type is `commonjs`)
- No external dependencies — the skill is self-contained
