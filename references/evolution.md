# Self-Evolution Protocol

<!-- ref-meta
version: 3.0.0
last-verified: 2026-05-19
schema: evolution-v1
-->

This reference defines how the UX Laws Reviewer skill improves itself over time. When you encounter patterns, laws, or accessibility concerns not covered by existing references, use the structured proposal format below.

> **When to load:** Read this file in Step 7 (Knowledge Evolution) if you identified a gap during your review.

---

## When to Propose

Propose a new entry only when ALL of these are true:

1. The pattern is **not covered** by any existing law in `laws-quick.md` or `laws-extended.md`
2. Evidence strength is **Moderate or Strong** (not just a hunch)
3. The pattern would apply to **more than one UI type**
4. You can describe concrete **detection patterns** (both violation and positive)

Do NOT propose:
- Framework-specific conventions (those belong in `frameworks.md`)
- Platform-specific guidelines (use platform overlays instead)
- Restating an existing law under a different name

---

## Proposal Format: New Law

Append this at the very end of your review output:

```
<!-- PROPOSED-LAW
name: [Law Name]
category: [Decision & Cognition | Motor & Interaction | Visual & Perception | Memory & Learning | Behavioral]
observation: [What you observed that isn't covered by existing laws]
evidence-strength: [Strong | Moderate]
suggested-detection-patterns:
  violation:
    - [❌ violation pattern 1]
    - [❌ violation pattern 2]
  positive:
    - [✅ positive pattern 1]
    - [✅ positive pattern 2]
suggested-scoring-dimension: [Cognitive Efficiency | Motor Efficiency | Visual Hierarchy | Feedback & Responsiveness | Consistency & Familiarity]
source: [Citation URL or "Empirical observation"]
-->
```

---

## Proposal Format: New WCAG Mapping

When you discover a WCAG criterion that should be mapped to an existing UX law but isn't in `accessibility.md`:

```
<!-- PROPOSED-WCAG-MAP
criterion: [e.g., 2.4.13]
criterion-name: [e.g., Focus Appearance]
mapped-law: [Existing law name from laws-quick.md or laws-extended.md]
scoring-dimension: [Which of the 5 dimensions]
suggested-deduction: [e.g., "up to -3"]
rationale: [Why this mapping makes sense]
-->
```

---

## Proposal Format: New Component Checklist

When you review a UI type not covered in `components.md`:

```
<!-- PROPOSED-CHECKLIST
ui-type: [e.g., Chat/Messaging Interface]
goal: [User's primary goal]
p1-laws:
  - [Law name]: [Why it's P1 for this type]
p2-laws:
  - [Law name]: [Why it's P2]
red-flags:
  - [Common anti-pattern for this UI type]
-->
```

---

## Proposal Lifecycle

1. **Proposed** — Agent appends a `<!-- PROPOSED-* -->` block to review output
2. **Collected** — Maintainers or scripts extract proposals from review outputs
3. **Reviewed** — A human evaluates the proposal against existing content
4. **Merged** — Accepted proposals are added to the appropriate reference file
5. **Versioned** — Reference file version and `last-verified` date are updated

Proposals that duplicate existing content or lack sufficient evidence are discarded with a brief explanation.
