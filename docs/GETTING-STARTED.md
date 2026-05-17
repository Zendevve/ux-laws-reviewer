# Getting Started

## Prerequisites

- Node.js 14.0.0 or higher
- An AI coding assistant (Claude Code, Gemini CLI, Cursor, Windsurf, or compatible agent)

## Installation

Install the skill with a single command:

```bash
npx ux-laws-reviewer
```

This will:
1. Download the package
2. Detect your installed AI agent directories
3. Copy the skill files to the appropriate location

### Installation Options

| Flag | Description |
|------|-------------|
| `--help`, `-h` | Show help and usage |
| `--version`, `-v` | Print version number |
| `--force`, `-f` | Overwrite existing installation |
| `--path <dir>` | Install to a custom directory |
| `--all` | Install to ALL detected agent directories |
| `--uninstall` | Remove the skill from all directories |

### Install Everywhere

To install to all detected AI agent directories at once:

```bash
npx ux-laws-reviewer --all
```

### Custom Path

Install to a specific location:

```bash
npx ux-laws-reviewer --path /your/custom/path
```

## First Use

Once installed, ask your AI agent to review any UI:

```
"Review this React component against UX laws."
"Score this form's usability."
"Audit my dashboard for cognitive load."
"Do a deep accessibility review of this checkout flow."
```

## Understanding the Output

The skill responds with a structured audit including:

1. **Context** — Platform, UI type, user goal, and review mode
2. **UX Score (0-100)** — Quantitative score across 5 dimensions
3. **Key Findings** — Violations and strengths tagged with relevant laws
4. **Accessibility Snapshot** — WCAG 2.2 check status table
5. **Actionable Improvements** — Prioritized recommendations with code examples
6. **Quick Wins** — Low-effort, high-impact fixes

## Review Modes

The skill auto-detects the appropriate mode:

- **Quick** — For single components (≤50 LOC). Returns score + top 3 findings + 2 quick wins.
- **Standard** — For full pages or screens. Full audit with all sections.
- **Deep** — For comprehensive audits or accessibility reviews. Includes Nielsen heuristics and detailed WCAG report.

Override auto-detection by explicitly requesting a mode: *"Do a deep review of this form."*

## Next Steps

- Read the [full documentation](../README.md) for all covered laws and accessibility criteria
- See [CONTRIBUTING.md](../CONTRIBUTING.md) to contribute new laws or improvements
- Run evaluations: `node evals/eval_queries.json`
