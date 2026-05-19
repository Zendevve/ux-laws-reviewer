# ARCHITECTURE

## Overview

ux-laws-reviewer is an AI agent skill that provides professional-grade UX audits against 25+ psychological principles, WCAG 2.2 accessibility criteria, and Nielsen's 10 usability heuristics. It installs as a skill package into AI coding assistants (Claude Code, Gemini CLI, Cursor, Windsurf) and provides a structured review framework with quantitative 0-100 scoring.

## Architecture Pattern

The project follows a **skill package** architecture:

```
ux-laws-reviewer/
├── SKILL.md                    # Core agent instructions (entry point, schema: skill-v3)
├── references/                 # Knowledge base for the AI agent
│   ├── principles-core.md      # Platform-agnostic audit principles (loaded first)
│   ├── laws-quick.md           # Top 8 UX laws for Quick mode
│   ├── laws-extended.md        # Remaining 17+ UX laws for Standard/Deep
│   ├── scoring.md              # 0-100 scoring rubric and calibration anchors
│   ├── accessibility.md        # WCAG 2.2 criteria mapped to laws
│   ├── heuristics.md           # Nielsen's 10 heuristics (Deep mode)
│   ├── examples.md             # Annotated example audit outputs
│   ├── components.md           # UI-type-specific checklists
│   ├── frameworks.md           # Framework-specific anti-patterns
│   └── evolution.md            # Self-evolution proposal protocol
├── install.js                  # CLI installer (npx entry point)
├── package.json                # Package metadata and distribution
├── scripts/
│   ├── generate-manifest.js    # SHA-256 manifest generator/verifier
│   └── collect-proposals.js    # Self-evolution proposal collector
├── tests/
│   ├── install.test.js         # Installer logic tests
│   ├── references.test.js      # Reference integrity validation
│   ├── output-schema.test.js   # Output format validation
│   └── wcag-criteria.js        # Canonical WCAG 2.2 criteria list
├── evals/                      # Evaluation test suite
│   ├── evals.json              # Evaluation definitions
│   ├── eval_queries.json       # Trigger/non-trigger queries
│   ├── eval_runner.js          # Output validator with WCAG checking
│   └── files/                  # Test fixtures (good + bad UIs)
├── CONTRIBUTING-MACHINE.md     # AI agent contribution guide
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

- Add new UX laws to `references/laws-extended.md` (or `laws-quick.md` for top 8)
- Update WCAG criteria in `references/accessibility.md`
- Modify scoring rubric in `references/scoring.md`
- Add UI-type checklists to `references/components.md`
- Add framework anti-patterns to `references/frameworks.md`
- Contribute via the self-evolution protocol in `references/evolution.md`

## Self-Evolution Flow

1. Agent performs a UX review (Steps 1-6)
2. Agent encounters an uncovered pattern
3. Agent appends a `<!-- PROPOSED-* -->` block (Step 7)
4. Maintainer runs `node scripts/collect-proposals.js <dir>` to extract proposals
5. Proposals are reviewed and merged into the appropriate reference file
6. Reference file `last-verified` date and version are updated
7. `node scripts/generate-manifest.js` regenerates checksums
8. Users update via `npx ux-laws-reviewer --update`
