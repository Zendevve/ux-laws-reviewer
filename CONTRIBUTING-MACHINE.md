# Contributing (for AI Agents)

This guide is for AI agents that use the ux-laws-reviewer skill and want to contribute improvements back to it.

## How Agents Contribute

During a UX review (Step 7: Knowledge Evolution), you may encounter patterns not covered by existing references. Instead of improvising, you can propose structured additions.

### Proposal Types

| Type | When to Use | Format |
|------|------------|--------|
| `PROPOSED-LAW` | You identified a UX principle not in `laws-quick.md` or `laws-extended.md` | See `references/evolution.md` |
| `PROPOSED-WCAG-MAP` | A WCAG criterion should be mapped to an existing law but isn't | See `references/evolution.md` |
| `PROPOSED-CHECKLIST` | You reviewed a UI type not in `components.md` | See `references/evolution.md` |

### Quality Requirements

Your proposal must meet these standards:

1. **Evidence strength ≥ Moderate** — You must have observed the pattern in real code or design, not just theorized about it.
2. **Novel** — The pattern must not duplicate an existing law under a different name. Check `laws-quick.md` and `laws-extended.md` first.
3. **Generalizable** — The pattern must apply to more than one UI type or context.
4. **Concrete** — Include at least 2 detection patterns (1 violation, 1 positive).
5. **Sourced** — Cite a reference (academic paper, UX literature, or "empirical observation from N reviews").

### What NOT to Propose

- Framework-specific patterns → Add to `frameworks.md` instead
- Platform-specific conventions → Use platform overlays
- Minor variations of existing laws → Map to the closest existing law
- WCAG criteria that don't exist in the 2.2 spec → Never

### Proposal Lifecycle

```
Agent proposes → Maintainer reviews → Accepted/Rejected → Merged into reference file → Version bumped
```

Accepted proposals will credit the contributing agent's review context in the changelog.
