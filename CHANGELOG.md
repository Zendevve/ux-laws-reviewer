# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-05-19

### Added
- **Anti-hallucination guardrails** in SKILL.md — 6 mandatory rules preventing fabricated WCAG criteria, inflated scores, and unsupported findings.
- **Output self-validation checklist** — Agent verifies score math, citation accuracy, severity ordering, and calibration anchor consistency before presenting output.
- **Review confidence score** — Each review now includes a High/Medium/Low confidence indicator based on the ratio of Observed vs Inferred vs Assumed findings.
- **Graceful degradation rules** — If a reference file is missing, the agent proceeds with reduced coverage instead of failing.
- **Self-evolution protocol** (`references/evolution.md`) — Agents can propose new laws, WCAG mappings, and component checklists via structured `<!-- PROPOSED-* -->` blocks.
- **Proposal collection script** (`scripts/collect-proposals.js`) — Scans review outputs to extract, deduplicate, and summarize agent proposals.
- **AI contribution guide** (`CONTRIBUTING-MACHINE.md`) — Structured contribution format for AI agents.
- **Manifest system** (`scripts/generate-manifest.js`) — SHA-256 checksum-based integrity verification for all skill files.
- **Installation verification** (`--verify` flag) — Verify an existing installation's file integrity without reinstalling.
- **Dry-run mode** (`--dry-run` flag) — Preview what would be installed.
- **Smart update** (`--update` flag) — Only overwrite files that have changed.
- **Canonical WCAG 2.2 criteria list** (`tests/wcag-criteria.js`) — Ground truth for validating referenced criteria are real.
- **Reference integrity test suite** (`tests/references.test.js`) — 16 tests validating WCAG accuracy, law uniqueness, scoring structure, cross-references.
- **Output schema test suite** (`tests/output-schema.test.js`) — 12 tests validating the eval runner's schema checks.
- **New eval fixtures** — `good-dashboard.html` (strengths recognition), `accessible-form.html` (WCAG compliance), `mobile-checkout.jsx` (platform-aware scoring).
- **CI/CD expansion** — Multi-platform matrix (Ubuntu/Windows/macOS × Node 18/20/22), reference integrity job, version consistency check, publish verification.

### Changed
- **SKILL.md** bumped to schema `skill-v3` with version `3.0.0`.
- **Eval runner** now validates WCAG criteria against canonical list, supports `--json` and `--mode` flags, checks severity ordering.
- **Score regex** now tolerates bold markdown formatting (`**72/100**`).
- **Installer** copies 11 files (was 10) — added `references/evolution.md`.
- **Node.js minimum** bumped from 14 to 18 (14/16 are EOL).
- **package.json** updated with new scripts (`check-refs`, `generate-manifest`, `verify-manifest`) and files.


## [2.1.0] - 2025-05-14

### Added
- **Few-shot examples** (`references/examples.md`) — Two complete annotated review examples (Quick mode button, Standard mode login form) anchoring output quality, tone, and specificity.
- **Component-specific checklists** (`references/components.md`) — Priority-ranked law checklists for 9 UI types: Authentication, Forms, Dashboards, E-commerce, Data Tables, Navigation, Marketing/Landing, Modals, and Onboarding.
- **Framework-aware patterns** (`references/frameworks.md`) — Detection patterns for React/Next.js, Vue, Svelte/SvelteKit, vanilla HTML/JS, and CSS anti-patterns mapped to UX laws and WCAG criteria.
- `CHANGELOG.md` (this file)
- `LICENSE` file (AGPL-3.0)

### Changed
- `SKILL.md` updated to reference new files with conditional loading logic
- `install.js` copies 8 files (was 5)
- `package.json` bumped to 2.1.0
- `README.md` updated with new features documentation

## [2.0.0] - 2025-05-14

### Added
- **WCAG 2.2 accessibility integration** — New `references/accessibility.md` mapping 14 success criteria to UX laws and scoring dimensions.
- **Nielsen's 10 heuristics** — New `references/heuristics.md` cross-referencing heuristics with UX laws and WCAG criteria (Deep mode only).
- **Review modes** — Auto-detecting Quick (components), Standard (pages), and Deep (full heuristic evaluation) with user override.
- **Iteration loop** — Agent offers to fix top issues and re-score with before/after comparison.
- **Scoring calibration anchors** — Real-world product examples (Stripe, Linear, Jira) mapped to score ranges.
- **Accessibility sub-criteria** in each scoring dimension with specific deduction ranges.
- **Scoring conflict rule** — No double-counting UX law + WCAG violations.
- **Accessibility snapshot table** in Standard+ mode output.
- WCAG cross-references added to 8 laws in `laws.md`.

### Changed
- Installer supports 5 agent platforms: Claude Code, Gemini CLI, Cursor, Windsurf, generic.
- Added `--all` flag to install to all detected directories.
- Added `--uninstall` flag for clean removal.
- `package.json` updated with accessibility and heuristic keywords.
- `README.md` completely rewritten with new features, supported agents table, and updated examples.

## [1.1.1] - 2025-05-11

### Changed
- Minor bug fixes in installer

## [1.1.0] - 2025-05-11

### Added
- Quantitative scoring rubric (0–100) across 5 dimensions
- Severity matrix (Critical/Major/Minor/Positive) with impact ranges
- Detection patterns (❌/✅) for all 25+ laws
- New laws: Progressive Disclosure, F/Z-Pattern, Feedback Principle
- Formulas for Hick's Law and Fitts's Law
- `references/scoring.md` — Dedicated scoring reference

### Changed
- `SKILL.md` rewritten with context-gathering step, structured output template, and platform-aware guidance
- `install.js` rewritten with `--help`, `--version`, `--force`, `--path` flags and colorful output
- `package.json` properly configured with bin mapping, keywords, repository metadata
- `README.md` rewritten with usage examples, law categories, and example output

## [1.0.0] - 2025-05-10

### Added
- Initial release
- 20+ UX laws in `references/laws.md`
- Basic `SKILL.md` review framework
- npm installer via `npx ux-laws-reviewer`
