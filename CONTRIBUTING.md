# Contributing

Thank you for your interest in improving ux-laws-reviewer! This project aims to provide the most comprehensive UX review framework for AI agents.

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/Zendevve/ux-laws-reviewer.git
cd ux-laws-reviewer
```

### 2. Choose Your Contribution Area

#### Add or Refine UX Laws

- Edit `references/laws.md`
- Include: law name, description, key takeaway, and detection patterns
- Cite credible sources (academic papers, established UX literature)

#### Update Accessibility Criteria

- Edit `references/accessibility.md`
- Only cite WCAG criteria that exist in the official 2.2 spec
- Map each criterion to relevant UX laws and scoring dimensions

#### Improve Scoring Rubric

- Edit `references/scoring.md`
- Adjust dimension criteria, severity matrix, or calibration anchors
- Ensure scores remain consistent with real-world product anchors

#### Add UI-Type Checklists

- Edit `references/components.md`
- Add priority-ranked checklists for new UI types
- Base checklists on established UX patterns

#### Document Framework Anti-Patterns

- Edit `references/frameworks.md`
- Add framework-specific issues (React, Vue, Svelte, CSS)
- Include concrete examples and fixes

#### Improve the Installer

- Edit `install.js`
- Add support for new agent directories
- Improve detection logic or error handling

### 3. Test Your Changes

```bash
# Verify installer works
node install.js --help

# Test installation to a temporary directory
node install.js --path ./test-install
```

### 4. Submit a Pull Request

1. Create a feature branch
2. Make your changes
3. Test the installer
4. Submit a PR with a clear description of what you changed and why

## Contribution Guidelines

### Quality Standards

- **Be specific**: Vague laws like "make it intuitive" are not helpful. Provide concrete detection patterns.
- **Cite sources**: Reference academic papers, established UX literature, or WCAG spec sections.
- **Test outputs**: If you add a law, verify it produces meaningful findings in reviews.
- **No hallucinated WCAG criteria**: Only cite criteria that exist in the official WCAG 2.2 specification.

### Code Style

- Markdown files use consistent heading levels and table formatting
- JavaScript follows CommonJS conventions
- No external dependencies — keep the skill self-contained

### Commit Messages

Use descriptive commit messages:

```
Add Von Restorff effect detection patterns
Update WCAG 2.5.8 target size mapping
Fix scoring calibration for mobile dashboards
```

## Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/Zendevve/ux-laws-reviewer/issues) with:

- A clear description of the problem or idea
- Steps to reproduce (for bugs)
- Your agent environment (Claude Code, Gemini CLI, etc.)

## License

By contributing, you agree that your contributions will be licensed under the ISC license.
