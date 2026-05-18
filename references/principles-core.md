# Principles Core (Platform-Agnostic)

This reference is the primary audit lens for every review. It is intentionally framework- and platform-agnostic.

Use this file first, then map findings to UX laws, WCAG criteria, and optional platform overlays.

---

## Audit Order (Always Follow)

1. **User goal clarity** — Is the primary task obvious?
2. **Path to completion** — Can people finish the task without confusion?
3. **Interaction effort** — Are controls easy to reach, operate, and recover from?
4. **Feedback and state** — Is system status visible for loading, success, empty, and error?
5. **Inclusion and resilience** — Does the UI work across ability, device context, and input mode?

Do not begin with framework or style preference checks.

---

## Universal Principle Stack

### 1) Goal First
People should understand the primary action within a few seconds.

**Failure signals:** multiple competing CTAs, vague headlines, hidden next step.

### 2) Decision Simplicity
Reduce unnecessary choices and cognitive branching.

**Failure signals:** dense option lists, no grouping, too many equal-weight actions.

### 3) Recognition Over Recall
Make choices and context visible so users do not need to remember state.

**Failure signals:** hidden filters, no breadcrumb/context, form progress not visible.

### 4) Motor Ease
Interactions should tolerate imperfect movement and varied input methods.

**Failure signals:** tiny targets, tight spacing, hover-only affordances, drag-only actions.

### 5) Feedback and System Status
Every meaningful action should return immediate, interpretable feedback.

**Failure signals:** silent submits, absent loading state, ambiguous success/error results.

### 6) Error Prevention and Recovery
Prevent obvious mistakes and make recovery straightforward.

**Failure signals:** destructive defaults, poor validation timing, no undo/confirm path.

### 7) Consistency and Predictability
Patterns should behave consistently within the interface.

**Failure signals:** same control style with different behavior, inconsistent placement of actions.

### 8) Progressive Disclosure
Expose complexity in layers instead of all at once.

**Failure signals:** advanced settings dumped into first view, no staged onboarding.

### 9) Multi-Channel Communication
Do not encode critical meaning with one channel only (for example, color only).

**Failure signals:** status depends on color only, icon-only errors without text.

### 10) Adaptability
UI should remain usable as context changes (size, zoom, keyboard, assistive tech, locale).

**Failure signals:** clipped text at larger type, broken focus order, non-responsive layout.

### 11) Trust and Safety
Sensitive actions and data handling should feel explicit and safe.

**Failure signals:** unclear permission prompts, accidental destructive actions, hidden consequences.

### 12) Flow Continuity
Avoid interruptions that reset attention or force unnecessary rework.

**Failure signals:** modal churn, context loss after save, long blocking waits without progress.

---

## Evidence Discipline

Classify each finding using one of these tags:

- **[Observed]** Directly visible in provided code, screenshot, or description.
- **[Inferred]** Strongly implied by provided material but not explicit.
- **[Assumption]** Plausible but unverified due to missing context.

Rules:

1. Use `[Observed]` for full-severity deductions.
2. Use `[Inferred]` for moderate confidence; avoid maximum severity unless risk is clearly high.
3. Use `[Assumption]` only when needed and lower severity by one level.
4. Never present assumptions as facts.

---

## Platform/Framework Overlay Policy

Platform and framework guidance is optional and secondary.

Apply overlays only when:

1. The user explicitly targets a platform/framework, or
2. The provided code clearly indicates one (for example, JSX, Vue directives, SwiftUI, UIKit).

Even then:

- Treat overlays as **implementation nuance**.
- Prioritize principle-level user impact over convention matching.
- Do not mark a critical issue based on convention mismatch alone.

---

## Minimal Output Guarantees

Every review should include:

1. A clear statement of the user's likely primary goal.
2. The top 3-5 highest-impact findings mapped to principles.
3. WCAG tags where applicable.
4. Specific fixes tied to user outcome improvements.
5. Confidence-aware language when context is incomplete.
