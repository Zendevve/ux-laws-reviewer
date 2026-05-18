# Component-Specific Checklists

Priority-ranked law and accessibility checks for common UI types. When reviewing, use the checklist matching the identified UI Type to focus on the highest-impact laws first.

> **When to load:** Always load this file. After establishing context (Step 3), look up the matching UI type below to prioritize your analysis.

---

## How to Use

1. Identify the UI Type in Step 3 (Context).
2. Find the matching checklist below.
3. Evaluate **Priority 1** laws first — highest impact for this UI type.
4. Then evaluate **Priority 2** laws.
5. **Priority 3** laws are checked only in Standard and Deep modes.
6. Laws not listed are evaluated only if clearly applicable.

If the UI spans multiple types (e.g., a dashboard with an embedded form), merge the Priority 1 lists from both.

Before using any checklist below, confirm the universal baseline:

1. Primary task is obvious within one screen.
2. Key actions are perceivable and operable with mouse, touch, and keyboard.
3. Errors and recovery paths are explicit.
4. Critical meaning is never color-only.
5. The flow remains usable at larger text sizes.

---

## Authentication (Login / Signup / Password Reset)

**Goal:** Get in quickly and securely.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Cognitive Load, Hick's Law, Feedback Principle | Minimize fields. Instant error feedback. |
| **P1** | WCAG 3.3.1 (Errors), 3.3.2 (Labels), 3.3.7 (Redundant Entry) | Error handling is critical. |
| **P1** | Parkinson's Law, Postel's Law | Autofill, flexible inputs, no unnecessary fields. |
| **P2** | Jakob's Law, Mental Model | Social login placement, "forgot password" location. |
| **P2** | Von Restorff, WCAG 1.4.3, 2.1.1 | CTA must pop. Must be keyboard-accessible. |
| **P3** | Peak-End Rule, Aesthetic-Usability | Success state matters. Polish = trust. |

**Flag:** Placeholder-only labels, no password toggle, errors clearing the form, missing `autocomplete`.

---

## Forms (Settings, Profiles, Data Entry)

**Goal:** Complete input accurately with minimum effort.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Cognitive Load, Chunking, Common Region | Group fields logically. |
| **P1** | Proximity, WCAG 3.3.1–3.3.3 | Labels must be associated. Errors specific. |
| **P1** | Feedback Principle, Doherty Threshold | Inline validation, save confirmation. |
| **P2** | Parkinson's, Postel's, Goal-Gradient | Defaults, autofill, progress bars for multi-step. |
| **P2** | Working Memory, WCAG 2.5.8, 1.4.11 | Summary panels. Adequate target sizes. |
| **P3** | Hick's Law, Tesler's Law | Searchable dropdowns. Don't re-ask known info. |

**Flag:** 10+ fields unbroken, labels equidistant, no inline validation, 13px checkboxes, 15+ dropdown options.

---

## Dashboards (Analytics, Admin, Monitoring)

**Goal:** Quickly scan status, identify anomalies, act.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Miller's Law, Chunking | 3–5 metric groups. Not everything at once. |
| **P1** | Gestalt (Proximity, Common Region, Similarity) | Unambiguous visual grouping. |
| **P1** | Von Restorff, F-Pattern | Anomalies pop. Key metrics on F-pattern hotspots. |
| **P2** | Hick's, Progressive Disclosure, Doherty | Categorized nav. Skeleton loaders. |
| **P2** | Pareto, WCAG 1.4.1, 1.4.11 | Top 20% features get prime space. Charts need shape+color. |
| **P3** | Serial Position, Selective Attention | Critical nav at edges. Alerts ≠ banners. |

**Flag:** All metrics equal weight, 8+ nav items, no loading/empty states, color-only chart series.

---

## E-Commerce (Product, Cart, Checkout)

**Goal:** Find, evaluate, and purchase with confidence.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Fitts's Law | "Add to Cart" / "Checkout" must be large and prominent. |
| **P1** | Peak-End Rule | Checkout confirmation = "end." Payment errors = "peak." |
| **P1** | Jakob's Law, WCAG 2.5.8, 2.1.1 | Cart top-right. Everything keyboard-operable. |
| **P2** | Choice Overload, Goal-Gradient | Smart defaults for variants. Checkout progress bar. |
| **P2** | Cognitive Load, Working Memory, WCAG 3.3.4 | Cart summary visible. Payment confirmation step. |
| **P3** | Zeigarnik, Aesthetic-Usability | Abandoned cart nudges. Polish = trust. |

**Flag:** Small "Add to Cart," no checkout summary, payment errors on submit only, forced account creation.

---

## Data Tables (Lists, Grids)

**Goal:** Find, compare, and act on specific data rows.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Chunking, Miller's Law | 5–7 default columns. More on demand. |
| **P1** | Fitts's Law, F-Pattern | Row actions ≥ 32px. Key column on far left. |
| **P1** | WCAG 1.4.3, 1.3.1 | Programmatic headers (`<th>`). Row striping contrast. |
| **P2** | Hick's, Doherty, Von Restorff | Categorized filters. Skeleton rows. Selected ≠ color only. |
| **P2** | WCAG 2.1.1 | Full keyboard navigation (arrows, Enter). |
| **P3** | Serial Position, Postel's | Key columns at edges. Forgiving search. |

**Flag:** 10+ columns, hover-only actions, no empty state, subtle sort indicators, no frozen columns.

---

## Navigation (Headers, Sidebars, Tab Bars)

**Goal:** Orient and move efficiently.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Hick's Law | Max 5–7 top-level items. |
| **P1** | Jakob's Law, Serial Position | Logo=home. Search in header. Key items at edges. |
| **P1** | WCAG 2.4.7, 2.1.1 | Keyboard-operable. Visible focus. |
| **P2** | Miller's, Selective Attention | Sub-menus ≤ 9 items. Unambiguous active indicator. |
| **P2** | Fitts's, WCAG 3.2.3 | Mobile nav ≥ 48px. Consistent across pages. |
| **P3** | Uniform Connectedness, Progressive Disclosure | Breadcrumb separators. Secondary nav on demand. |

**Flag:** 8+ ungrouped items, weight-only active indicator, desktop hamburger, gap-closing dropdowns.

---

## Marketing & Landing Pages

**Goal:** Understand value, take one action.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Von Restorff | One dominant CTA per viewport. |
| **P1** | Z-Pattern, Hick's Law | Follow Z-flow. Minimize nav distractions. |
| **P1** | WCAG 1.4.3 | Hero text over images needs contrast overlay. |
| **P2** | Aesthetic-Usability, Cognitive Load | Beauty = trust. Every element earns its space. |
| **P2** | Peak-End Rule, Fitts's Law | Footer CTA matters. Mobile CTA full-width ≥ 48px. |
| **P3** | Cognitive Bias (Social Proof), Goal-Gradient | Testimonials near CTAs. Scroll progress. |

**Flag:** Multiple competing CTAs, below-fold CTA without scroll affordance, text over images without overlay.

---

## Modals & Dialogs

**Goal:** Complete a focused sub-task and return.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Flow, Cognitive Load | Must be justified. One task. No nesting. |
| **P1** | WCAG 2.1.1, 2.1.2 | Focus trap + Escape to close. No keyboard traps. |
| **P1** | Fitts's Law | Close button ≥ 24px, top-right. |
| **P2** | Working Memory, Feedback Principle | Show item context. Don't pre-focus destructive actions. |
| **P2** | WCAG 4.1.2 | `role="dialog"`, `aria-modal`, `aria-labelledby`. |
| **P3** | Jakob's Law | Primary right, cancel left (Western convention). |

**Flag:** No backdrop, no close/Escape, pre-focused destructive button, overflow without scroll, nested modals.

---

## Onboarding & Empty States

**Goal:** Understand how to start, feel motivated.

| Priority | Laws & Criteria | Why |
|----------|----------------|-----|
| **P1** | Paradox of the Active User | Users skip tutorials. Be self-explanatory. |
| **P1** | Zeigarnik, Goal-Gradient | Show progress. Start above 0%. |
| **P1** | Peak-End Rule | First impression + first success = peak moments. |
| **P2** | Cognitive Load, Working Memory | Introduce features progressively. |
| **P2** | WCAG 3.3.2, 2.5.8 | Onboarding inputs must be accessible. |
| **P3** | Aesthetic-Usability | Empty states are branding moments. |

**Flag:** "No data" without guidance, 5+ steps before value, blocking tutorials, no "Skip," progress at 0%.
