# ux-laws-reviewer

> **Review any UI against 25+ psychological UX laws, WCAG 2.2 accessibility criteria, and Nielsen's 10 usability heuristics — with quantitative scoring.**

A skill for [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), Gemini CLI, Cursor, Windsurf, and compatible AI agents. Once installed, your agent can critique front-end code, HTML, CSS, React components, and design descriptions using a **principles-first** UX framework (Laws of UX + WCAG + heuristics) that stays platform-agnostic by default and applies framework/platform overlays only when relevant.

---

## What's New in v2.1.0

- **Few-shot examples** — Two complete annotated review examples (Quick mode button, Standard mode login form) anchoring output quality.
- **Component-specific checklists** — Priority-ranked law checklists for 9 UI types.
- **Framework-aware patterns** — Detection patterns for React/Next.js, Vue, Svelte/SvelteKit, vanilla HTML/JS, and CSS anti-patterns.
- **WCAG 2.2 Accessibility Integration** — Every finding is tagged with its WCAG criterion number.
- **Review Modes** — Quick (components), Standard (pages), and Deep (full heuristic evaluation) auto-detected from context.
- **Nielsen's 10 Heuristics** — Deep mode includes a cross-reference against the industry-standard heuristic evaluation framework.

---

## Installation

```bash
npx ux-laws-reviewer
```

This copies the skill files into `~/.claude/skills/ux-laws-reviewer/` (or the first detected agent directory).

**Options:**

| Flag | Description |
|------|-------------|
| `--help`, `-h` | Show help and usage info |
| `--version`, `-v` | Print version number |
| `--force`, `-f` | Overwrite existing installation |
| `--path <dir>` | Install to a custom directory |
| `--all` | Install to ALL detected agent directories |
| `--uninstall` | Remove the skill from all detected directories |

**Install everywhere at once:**

```bash
npx ux-laws-reviewer --all
```

---

## Usage

Once installed, just ask your agent to review your UI:

```
"Review this React component against UX laws."
"Score this form's usability."
"Audit my dashboard for cognitive load."
"Do a deep accessibility review of this checkout flow."
"Quick audit of this button component."
```

### Review Modes

The skill automatically selects the appropriate depth based on what you're reviewing:

| Mode | Auto-Trigger | What You Get |
|------|-------------|--------------|
| **Quick** | Single component, ≤50 LOC | Score + 3 findings + 2 quick wins |
| **Standard** | Full page or screen | Full audit with all 25+ laws + accessibility snapshot |
| **Deep** | Explicit request or "accessibility review" | Full audit + Nielsen heuristics table + detailed accessibility report |

Override anytime: *"Do a deep review of this form."*

### What You Get

Your agent responds with a structured audit:

1. **Context** — Platform, UI type, primary user goal, and review mode.
2. **UX Score (0–100)** — Quantitative breakdown across 5 dimensions:
   - Cognitive Efficiency
   - Motor Efficiency
   - Visual Hierarchy
   - Feedback & Responsiveness
   - Consistency & Familiarity
3. **Key UX Findings** — Each violation or strength tagged with the relevant law, WCAG criterion (when applicable), severity level (Critical / Major / Minor / Positive), and concrete explanation.
4. **Accessibility Snapshot** — Quick-reference table of key WCAG 2.2 checks (contrast, keyboard, focus, targets, ARIA, errors).
5. **Actionable Improvements** — Specific code diffs or structural changes, prioritized by impact.
6. **Quick Wins** — 2–3 low-effort fixes that take under 5 minutes.
7. **Iteration** — The agent offers to fix issues and re-score with a before/after comparison.

**Deep mode also includes:**
- Nielsen's 10 Usability Heuristics summary table
- Detailed WCAG 2.2 criterion-level findings

---

## UX Laws Covered

The skill evaluates against **25+ established principles** including:

| Category | Laws |
|----------|------|
| **Decision & Cognition** | Hick's Law, Miller's Law, Cognitive Load, Choice Overload, Chunking, Occam's Razor, Progressive Disclosure |
| **Motor & Interaction** | Fitts's Law, Doherty Threshold, Flow, Feedback Principle |
| **Visual & Perception** | Gestalt Principles (Proximity, Common Region, Similarity, Pregnanz, Uniform Connectedness), Von Restorff Effect, Serial Position Effect, F-Pattern/Z-Pattern |
| **Memory & Learning** | Working Memory, Zeigarnik Effect, Mental Model, Paradox of the Active User |
| **Behavioral** | Jakob's Law, Peak-End Rule, Goal-Gradient Effect, Pareto Principle, Parkinson's Law, Postel's Law, Selective Attention, Aesthetic-Usability Effect |

## Accessibility Standards

Integrated WCAG 2.2 criteria including new 2.2-specific items:

| Category | Key Criteria |
|----------|-------------|
| **Perceivable** | Color Contrast (1.4.3), Non-Text Contrast (1.4.11), Text Resize (1.4.4) |
| **Operable** | Keyboard (2.1.1), Focus Visible (2.4.7), Focus Appearance (2.4.11), Target Size (2.5.8), Dragging Movements (2.5.7) |
| **Understandable** | Error Identification (3.3.1), Labels (3.3.2), Redundant Entry (3.3.7), Consistent Help (3.2.6) |
| **Robust** | Name/Role/Value (4.1.2), Status Messages (4.1.3) |

## Nielsen's 10 Heuristics (Deep Mode)

In deep review mode, the audit includes a cross-reference against Nielsen's 10 Usability Heuristics, mapped to the UX laws and WCAG criteria for comprehensive coverage.

---

## File Structure

```
ux-laws-reviewer/
├── SKILL.md                    # Agent instructions & review framework
├── references/
│   ├── laws-quick.md           # Core UX laws optimized for fast component reviews
│   ├── laws-extended.md        # The rest of the 25+ UX laws for full page reviews
│   ├── scoring.md              # 0-100 scoring rubric, severity matrix, & calibration anchors
│   ├── accessibility.md        # WCAG 2.2 criteria mapped to UX laws
│   ├── heuristics.md           # Nielsen's 10 heuristics cross-reference (Deep mode)
│   ├── components.md           # Component-specific UX checklists
│   ├── examples.md             # Few-shot output examples
│   ├── frameworks.md           # Framework-aware patterns
│   └── principles-core.md      # Core UI/UX design principles
├── install.js                  # CLI installer (npx entry point)
├── package.json
└── README.md
```

---

## Supported Agents

| Agent | Install Path | Status |
|-------|-------------|--------|
| Claude Code | `~/.claude/skills/ux-laws-reviewer/` | Auto-detected |
| Gemini CLI | `~/.gemini/skills/ux-laws-reviewer/` | Auto-detected |
| Cursor | `~/.cursor/skills/ux-laws-reviewer/` | Auto-detected |
| Windsurf | `~/.windsurf/skills/ux-laws-reviewer/` | Auto-detected |
| Generic | `~/.agents/skills/ux-laws-reviewer/` | Fallback |
| Custom | Any path via `--path` | Manual |

---

## Example Output

```
### 🎯 Context
| Attribute        | Value                          |
|------------------|--------------------------------|
| Platform         | Desktop (Responsive)           |
| UI Type          | SaaS Dashboard                 |
| Primary Goal     | View and manage team analytics |
| Review Mode      | Standard                       |

### 📊 UX Score: 62/100
| Dimension                 | Score | Notes                                    |
|---------------------------|-------|------------------------------------------|
| Cognitive Efficiency      | 10/20 | Navigation overload, no progressive...   |
| Motor Efficiency          | 15/20 | Good CTA sizing, minor link spacing...   |
| Visual Hierarchy          | 13/20 | Strong header hierarchy, weak card...    |
| Feedback & Responsiveness | 12/20 | Missing loading states on data tables... |
| Consistency & Familiarity | 12/20 | Non-standard sidebar collapse pattern... |

### 🔍 Key UX Findings
🔴 Hick's Law (Violation) — Sidebar navigation has 16 uncategorized links...
🟠 Doherty Threshold (Violation) [WCAG 4.1.3] — Data table loads with no skeleton/shimmer...
🟢 Fitts's Law (Positive) [WCAG 2.5.8 ✓] — Primary "Create Report" CTA is 48px, thumb-zone...

### ♿ Accessibility Snapshot
| Check                   | Status | Detail                              |
|-------------------------|--------|-------------------------------------|
| Color contrast (4.5:1)  | ⚠️     | Sidebar text at 3.8:1               |
| Keyboard navigable      | ❌     | Custom dropdown not keyboard-operable|
| Focus indicators visible| ✅     | 2px blue outline on all interactives|
| Touch targets ≥ 24px    | ✅     | All buttons meet minimum            |
| ARIA roles correct      | ⚠️     | Tab component missing role="tablist"|
| Error messages in text   | ✅     | Inline errors with aria-describedby |
```

---

## Contributing

1. Fork the repository
2. Add or refine laws in `references/laws.md`
3. Add accessibility criteria in `references/accessibility.md`
4. Update scoring criteria in `references/scoring.md` if adding new dimensions
5. Add heuristic mappings in `references/heuristics.md`
6. Test the installer: `node install.js --help`
7. Submit a pull request

---

## License

AGPL-3.0
