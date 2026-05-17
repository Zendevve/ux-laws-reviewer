# ARCHITECTURE

## Overview

ux-laws-reviewer is an AI agent skill that provides professional-grade UX audits against 25+ psychological principles, WCAG 2.2 accessibility criteria, and Nielsen's 10 usability heuristics. It installs as a skill package into AI coding assistants (Claude Code, Gemini CLI, Cursor, Windsurf) and provides a structured review framework with quantitative 0-100 scoring.

## Architecture Pattern

The project follows a **skill package** architecture:

```
ux-laws-reviewer/
├── SKILL.md                    # Core agent instructions (entry point)
├── references/                 # Knowledge base for the AI agent
│   ├── laws.md                 # UX law definitions and detection patterns
│   ├── scoring.md              # Scoring rubric and calibration anchors
│   ├── accessibility.md        # WCAG 2.2 criteria mapping
│   ├── heuristics.md           # Nielsen's 10 heuristics
│   ├── examples.md             # Example audit outputs
│   └── components.md           # UI-type-specific checklists
│   └── frameworks.md           # Framework-specific anti-patterns
├── install.js                  # CLI installer (npx entry point)
├── package.json                # Package metadata and distribution
├── evals/                      # Evaluation test suite
│   ├── evals.json              # Evaluation queries
│   ├── eval_queries.json       # Additional eval queries
│   └── files/                  # Test fixtures
│       └── bad-login.jsx       # Sample component for testing
└── README.md                   # User-facing documentation
```

## Key Design Decisions

### 1. Markdown-Based Skill Format

The skill is distributed as Markdown files (SKILL.md + references/) rather than compiled code. This allows AI agents to read and internalize the review framework directly without execution overhead.

### 2. Reference File Separation

Knowledge is split across multiple reference files to:
- Reduce context window usage (load only what's needed per mode)
- Enable independent updates to laws, scoring, and accessibility criteria
- Support mode-specific loading (Quick mode loads fewer references)

### 3. Three-Tier Review Modes

| Mode | Context Load | Output Scope |
|------|--------------|--------------|
| Quick | Top 8 laws + scoring + accessibility basics | Score + 3 findings + 2 quick wins |
| Standard | All references | Full audit with all sections |
| Deep | All references + heuristics | Full audit + Nielsen heuristics + detailed accessibility |

### 4. CLI Installer Pattern

`install.js` serves as both the npx entry point and the installation mechanism. It detects available AI agent directories and copies skill files to the appropriate location.

## Data Flow

1. **Installation**: `npx ux-laws-reviewer` → `install.js` detects agent directories → copies files
2. **Invocation**: User asks agent to review UI → agent loads SKILL.md → agent reads references
3. **Review**: Agent analyzes UI code/design against laws → calculates score → generates structured output
4. **Iteration**: Agent offers to fix issues → applies changes → re-scores → shows before/after

## Scoring System

The UX Score (0-100) is calculated across 5 dimensions (0-20 each):
- Cognitive Efficiency
- Motor Efficiency
- Visual Hierarchy
- Feedback & Responsiveness
- Consistency & Familiarity

Scoring rules and calibration anchors are defined in `references/scoring.md`.

## Extension Points

- Add new UX laws to `references/laws.md`
- Update WCAG criteria in `references/accessibility.md`
- Modify scoring rubric in `references/scoring.md`
- Add UI-type checklists to `references/components.md`
- Add framework anti-patterns to `references/frameworks.md`
