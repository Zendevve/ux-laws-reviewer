# ux-laws-reviewer

A Claude Code skill that provides a rigorous framework for evaluating UI code and designs against established psychological principles and UX laws.

## What is this?
This is an installable skill for [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) (or compatible agents). Once installed, your AI agent will be able to critique front-end code, HTML, CSS, React components, and design mockups using the **Laws of UX** (like Hick's Law, Fitts's Law, Cognitive Load, Gestalt Principles, etc.).

## Installation

You can install this skill directly into your Claude environment using `npx`:

```bash
npx ux-laws-reviewer
```

This will automatically copy the necessary `SKILL.md` and reference files into your `~/.claude/skills/ux-laws-reviewer` directory.

## Usage

Once installed, just ask Claude to review your UI!

Examples of prompts that will trigger this skill:
- *"Review this React component against UX laws."*
- *"Critique my pricing page design."*
- *"How is the UX of this form?"*
- *"Audit this layout for cognitive load."*

Claude will respond with a structured breakdown:
1. **Summary:** Overall assessment.
2. **Key UX Findings:** Identification of UX Law applications and violations (e.g., `❌ Hick's Law (Violation)`).
3. **Actionable Improvements:** Concrete code suggestions to fix the issues.

## Included UX Laws Reference
The skill includes a comprehensive reference document covering:
- Aesthetic-Usability Effect
- Choice Overload
- Chunking
- Cognitive Bias & Cognitive Load
- Doherty Threshold
- Fitts's Law
- Flow & Goal-Gradient Effect
- Hick's Law & Jakob's Law
- Gestalt Principles (Proximity, Common Region, etc.)
- Miller's Law, Occam's Razor, Pareto Principle
- Peak-End Rule, Postel's Law
- Von Restorff Effect, Zeigarnik Effect, and more.

## License
ISC
