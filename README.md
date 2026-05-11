# ux-laws-reviewer

> **Review any UI against 25+ psychological UX laws — with quantitative scoring.**

A skill for [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) and compatible AI agents. Once installed, your agent can critique front-end code, HTML, CSS, React components, and design descriptions using the **Laws of UX** — Hick's Law, Fitts's Law, Cognitive Load, Gestalt Principles, and more — producing a structured audit with a **0–100 UX Score**.

---

## Installation

```bash
npx ux-laws-reviewer
```

This copies the skill files into `~/.claude/skills/ux-laws-reviewer/` (or `~/.agents/skills/` for compatible agents).

**Options:**

| Flag | Description |
|------|-------------|
| `--help`, `-h` | Show help and usage info |
| `--version`, `-v` | Print version number |
| `--force`, `-f` | Overwrite existing installation |
| `--path <dir>` | Install to a custom directory |

---

## Usage

Once installed, just ask your agent to review your UI:

```
"Review this React component against UX laws."
"Score this form's usability."
"Audit my dashboard for cognitive load."
"Critique my pricing page design."
"How is the UX of this checkout flow?"
```

### What You Get

Your agent responds with a structured audit:

1. **Context** — Platform, UI type, and primary user goal (inferred or stated).
2. **UX Score (0–100)** — Quantitative breakdown across 5 dimensions:
   - Cognitive Efficiency
   - Motor Efficiency
   - Visual Hierarchy
   - Feedback & Responsiveness
   - Consistency & Familiarity
3. **Key UX Findings** — Each violation or strength tagged with the relevant law, a severity level (🔴 Critical / 🟠 Major / 🟡 Minor / 🟢 Positive), and concrete explanation.
4. **Actionable Improvements** — Specific code diffs or structural changes, prioritized by impact.
5. **Quick Wins** — 2–3 low-effort fixes that take under 5 minutes.

---

## UX Laws Covered

The skill evaluates against **25+ established principles** including:

| Category | Laws |
|----------|------|
| **Decision & Cognition** | Hick's Law, Miller's Law, Cognitive Load, Choice Overload, Chunking, Occam's Razor, Progressive Disclosure |
| **Motor & Interaction** | Fitts's Law, Doherty Threshold, Flow, Feedback Principle |
| **Visual & Perception** | Gestalt Principles (Proximity, Common Region, Similarity, Prägnanz, Uniform Connectedness), Von Restorff Effect, Serial Position Effect, F-Pattern/Z-Pattern |
| **Memory & Learning** | Working Memory, Zeigarnik Effect, Mental Model, Paradox of the Active User |
| **Behavioral** | Jakob's Law, Peak-End Rule, Goal-Gradient Effect, Pareto Principle, Parkinson's Law, Postel's Law, Selective Attention, Aesthetic-Usability Effect |

Full definitions and detection patterns are in [`references/laws.md`](references/laws.md).

The quantitative scoring rubric is in [`references/scoring.md`](references/scoring.md).

---

## File Structure

```
ux-laws-reviewer/
├── SKILL.md              # Agent instructions & review framework
├── references/
│   ├── laws.md           # 25+ UX law definitions with detection patterns
│   └── scoring.md        # 0-100 scoring rubric & severity matrix
├── install.js            # CLI installer (npx entry point)
├── package.json
└── README.md
```

---

## Example Output

```
### 🎯 Context
| Attribute        | Value                          |
|------------------|--------------------------------|
| Platform         | Desktop (Responsive)           |
| UI Type          | SaaS Dashboard                 |
| Primary Goal     | View and manage team analytics |

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
🟠 Doherty Threshold (Violation) — Data table loads with no skeleton/shimmer...
🟢 Fitts's Law (Positive) — Primary "Create Report" CTA is 48px, thumb-zone...
```

---

## Contributing

1. Fork the repository
2. Add or refine laws in `references/laws.md`
3. Update scoring criteria in `references/scoring.md` if adding new dimensions
4. Test the installer: `node install.js --help`
5. Submit a pull request

---

## License

ISC
