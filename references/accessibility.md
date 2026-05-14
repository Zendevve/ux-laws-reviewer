# Accessibility & WCAG 2.2 Reference

Accessibility is not a separate concern from UX — it *is* UX. This reference maps key WCAG 2.2 success criteria to the existing UX laws framework, providing detection patterns for the most impactful accessibility violations in UI code.

> **When to load:** This file is loaded in **Standard** and **Deep** review modes. In Quick mode, only the critical items (marked ⚡) are checked.

---

## Perceivable

### Color Contrast (WCAG 1.4.3 / 1.4.6) ⚡
*Mapped laws: Von Restorff Effect, Visual Hierarchy*

Text must have sufficient contrast against its background.

| Level | Requirement |
|-------|------------|
| **AA** (1.4.3) | Normal text ≥ 4.5:1, Large text (≥18pt or ≥14pt bold) ≥ 3:1 |
| **AAA** (1.4.6) | Normal text ≥ 7:1, Large text ≥ 4.5:1 |

* **Detection Patterns:**
  * ❌ Light gray text on white backgrounds (common: `#999` on `#fff` = 2.85:1).
  * ❌ Placeholder text with insufficient contrast (most browsers default to ~2:1).
  * ❌ Colored text on colored backgrounds without contrast verification.
  * ❌ Text over images without overlay or text shadow.
  * ✅ Design system enforces minimum contrast tokens (e.g., `--text-primary` tested at 7:1+).

### Non-Text Contrast (WCAG 1.4.11) ⚡
*Mapped laws: Von Restorff Effect, Feedback Principle*

UI components and graphical objects must have ≥ 3:1 contrast against adjacent colors.

* **Detection Patterns:**
  * ❌ Input field borders that disappear against the background (light gray border on white).
  * ❌ Focus indicators with insufficient contrast.
  * ❌ Icon-only buttons where the icon blends with the background.
  * ❌ Chart elements (bars, lines, segments) that rely on color alone to distinguish series.
  * ✅ Input borders ≥ 3:1 against background in all states (default, hover, focus, error).

### Text Resize (WCAG 1.4.4)
*Mapped laws: Fitts's Law, Cognitive Load*

Text must be resizable up to 200% without loss of content or functionality.

* **Detection Patterns:**
  * ❌ Fixed pixel font sizes (`font-size: 14px`) instead of relative units (`rem`, `em`).
  * ❌ Containers with `overflow: hidden` that clip text when zoomed.
  * ❌ Layouts that break at 200% zoom (horizontal scroll, overlapping text).
  * ✅ All typography uses `rem` or `em` units.
  * ✅ Layouts tested at 200% browser zoom without horizontal scrolling.

### Content on Hover/Focus (WCAG 1.4.13)
*Mapped laws: Cognitive Load, Working Memory*

Hover/focus-triggered content must be dismissible, hoverable, and persistent.

* **Detection Patterns:**
  * ❌ Tooltips that disappear when the user moves to read them.
  * ❌ Dropdown menus that close when the cursor crosses a gap between trigger and menu.
  * ❌ Hover content that cannot be dismissed without moving focus (blocks underlying content).
  * ✅ Tooltips remain visible while the pointer is over the tooltip itself.
  * ✅ Escape key dismisses hover/focus-triggered content.

---

## Operable

### Keyboard Accessibility (WCAG 2.1.1 / 2.1.2) ⚡
*Mapped laws: Motor Efficiency, Flow, Jakob's Law*

All functionality must be operable via keyboard. No keyboard traps.

* **Detection Patterns:**
  * ❌ Click-only handlers (`onClick`) without corresponding keyboard handlers (`onKeyDown`).
  * ❌ Custom interactive elements (`<div>`, `<span>`) without `tabindex`, `role`, or keyboard support.
  * ❌ Drag-and-drop interfaces with no keyboard alternative.
  * ❌ Modal dialogs that don't trap focus (user tabs behind the modal).
  * ❌ Modal dialogs that trap focus permanently (no escape route).
  * ✅ All interactive elements reachable and operable via Tab + Enter/Space.
  * ✅ Focus trapping in modals with Escape to close.

### Focus Visible (WCAG 2.4.7) ⚡
*Mapped laws: Feedback Principle, Selective Attention*

All interactive elements must have a visible focus indicator.

* **Detection Patterns:**
  * ❌ Global `outline: none` or `outline: 0` without a replacement focus style.
  * ❌ Focus styles that rely only on color change (insufficient for color-blind users).
  * ❌ Custom components that suppress the default focus ring without adding their own.
  * ✅ Visible focus rings with ≥ 2px width and ≥ 3:1 contrast against adjacent colors.
  * ✅ `:focus-visible` used to show focus only for keyboard users (not mouse clicks).

### Focus Appearance (WCAG 2.4.11 — NEW in 2.2)
*Mapped laws: Feedback Principle, Von Restorff Effect*

The focus indicator must have a minimum area (≥ 2px perimeter outline or equivalent) and ≥ 3:1 contrast.

* **Detection Patterns:**
  * ❌ Dotted 1px outlines (common browser default — too subtle).
  * ❌ Focus indicators that are only visible on certain backgrounds.
  * ✅ Solid 2px+ outline with offset, in a color contrasting with both the component and background.

### Target Size (WCAG 2.5.8 — NEW in 2.2) ⚡
*Mapped laws: Fitts's Law*

Interactive targets must be at least 24×24 CSS pixels, with exceptions for inline text links and targets with sufficient spacing.

* **Detection Patterns:**
  * ❌ Icon buttons smaller than 24×24px without sufficient surrounding spacing.
  * ❌ Checkbox/radio inputs at browser default size (~13×13px) without enlarged click area.
  * ❌ Close buttons (×) rendered as small text without padding expansion.
  * ✅ All touch/click targets ≥ 24×24px (≥ 44×44px recommended for mobile).
  * ✅ Small targets compensated with ≥ 24px spacing from adjacent targets.

### Dragging Movements (WCAG 2.5.7 — NEW in 2.2)
*Mapped laws: Motor Efficiency, Postel's Law*

Any functionality that uses dragging must have a non-dragging alternative.

* **Detection Patterns:**
  * ❌ Sortable lists that only support drag-and-drop (no up/down buttons).
  * ❌ Sliders without a text input or stepper alternative.
  * ❌ Map interfaces where panning requires drag (no arrow key support).
  * ✅ Drag-to-reorder lists also offer move-up/move-down buttons.
  * ✅ Range sliders paired with a numeric input field.

### Consistent Help (WCAG 3.2.6 — NEW in 2.2)
*Mapped laws: Jakob's Law, Mental Model*

Help mechanisms must appear in the same relative location across pages.

* **Detection Patterns:**
  * ❌ Help/support links that move between header, footer, and sidebar across pages.
  * ❌ Contact information available on some pages but not others.
  * ✅ Persistent help button/link in a consistent position across all pages.

---

## Understandable

### Error Identification (WCAG 3.3.1) ⚡
*Mapped laws: Feedback Principle, Peak-End Rule*

Errors must be identified and described in text.

* **Detection Patterns:**
  * ❌ Form validation that only uses red borders (no text message).
  * ❌ Error messages that say "Invalid input" without explaining what's wrong.
  * ❌ Errors announced only visually (not programmatically — screen readers miss them).
  * ✅ Inline error messages below the field, associated via `aria-describedby`.
  * ✅ Errors described in human language: "Email must include @" not "Pattern mismatch."

### Labels or Instructions (WCAG 3.3.2) ⚡
*Mapped laws: Cognitive Load, Law of Proximity*

Input fields must have labels or instructions.

* **Detection Patterns:**
  * ❌ Placeholder-only inputs (placeholder disappears on focus — user forgets the label).
  * ❌ Labels not programmatically associated (`<label>` without `for`, or no `aria-label`).
  * ❌ Required fields without a visible indicator (asterisk or "required" text).
  * ✅ Visible `<label>` above each input, associated via `for`/`id` pairing.
  * ✅ Required fields marked with both visual indicator and `aria-required="true"`.

### Redundant Entry (WCAG 3.3.7 — NEW in 2.2)
*Mapped laws: Parkinson's Law, Cognitive Load, Working Memory*

Don't ask users to re-enter information they've already provided in the same process.

* **Detection Patterns:**
  * ❌ Shipping → Billing address requiring full re-entry (no "same as shipping" checkbox).
  * ❌ Multi-step forms that don't carry forward previously entered data.
  * ❌ Confirmation pages asking users to re-type their email.
  * ✅ Auto-population from previous steps.
  * ✅ "Same as above" toggles for repeated information blocks.

---

## Robust

### Name, Role, Value (WCAG 4.1.2) ⚡
*Mapped laws: Mental Model, Feedback Principle*

Custom components must expose their name, role, and state programmatically.

* **Detection Patterns:**
  * ❌ Custom dropdowns built with `<div>` lacking `role="listbox"` / `role="option"`.
  * ❌ Toggle switches without `role="switch"` and `aria-checked`.
  * ❌ Tabs built without `role="tablist"` / `role="tab"` / `role="tabpanel"`.
  * ❌ Accordions without `aria-expanded` state.
  * ✅ Custom components use appropriate ARIA roles and states.
  * ✅ State changes (expanded, selected, checked) reflected in ARIA attributes.

### Status Messages (WCAG 4.1.3)
*Mapped laws: Doherty Threshold, Feedback Principle*

Status messages must be programmatically determinable without receiving focus.

* **Detection Patterns:**
  * ❌ Toast/snackbar notifications without `role="status"` or `aria-live="polite"`.
  * ❌ Form success messages that aren't announced to screen readers.
  * ❌ Loading indicators without `aria-busy="true"` on the loading region.
  * ✅ Status updates use `aria-live` regions.
  * ✅ Error count summaries use `role="alert"` for immediate announcement.

---

## Quick Reference: WCAG ↔ UX Law Mapping

| WCAG Criterion | UX Law | Scoring Dimension |
|---|---|---|
| 1.4.3 Color Contrast | Von Restorff Effect | Visual Hierarchy |
| 1.4.11 Non-Text Contrast | Feedback Principle | Feedback & Responsiveness |
| 1.4.4 Text Resize | Cognitive Load | Cognitive Efficiency |
| 2.1.1 Keyboard | Flow | Motor Efficiency |
| 2.4.7 Focus Visible | Feedback Principle | Feedback & Responsiveness |
| 2.5.8 Target Size | Fitts's Law | Motor Efficiency |
| 2.5.7 Dragging | Postel's Law | Motor Efficiency |
| 3.3.1 Error ID | Peak-End Rule | Feedback & Responsiveness |
| 3.3.2 Labels | Law of Proximity | Visual Hierarchy |
| 3.3.7 Redundant Entry | Parkinson's Law | Cognitive Efficiency |
| 4.1.2 Name/Role/Value | Mental Model | Consistency & Familiarity |
| 4.1.3 Status Messages | Doherty Threshold | Feedback & Responsiveness |
