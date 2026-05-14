# Nielsen's 10 Usability Heuristics — Cross-Reference

A mapping of Jakob Nielsen's 10 Usability Heuristics to the UX laws and WCAG criteria used in this skill's review framework. This bridges academic UX law analysis with industry-standard heuristic evaluation methodology.

> **When to load:** This file is loaded only in **Deep** review mode. It supplements (not replaces) the law-by-law analysis with a higher-level heuristic perspective.

---

## How to Use This Reference

In Deep review mode, after completing the standard law-by-law analysis, perform a second pass using these 10 heuristics as a checklist. This catches interaction-level issues that individual laws might miss (e.g., a flow that satisfies each law individually but violates "User Control & Freedom" as a whole).

For each heuristic, report findings using the same severity format:
> **[🔴/🟠/🟡/🟢] H[N]: [Heuristic Name] ([Violation/Positive])**

---

## 1. Visibility of System Status

*The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.*

**Mapped UX Laws:** Doherty Threshold, Feedback Principle, Goal-Gradient Effect
**Mapped WCAG:** 4.1.3 Status Messages, 1.3.2 Meaningful Sequence

### Detection Patterns
* ❌ Actions that produce no visible response within 400ms.
* ❌ Background processes (uploads, syncs, saves) with no progress indication.
* ❌ Navigation that doesn't indicate the current location (no active state in nav).
* ❌ Password strength with no real-time feedback.
* ✅ Breadcrumbs, highlighted nav items, "You are here" indicators.
* ✅ Real-time validation as users type.
* ✅ Upload progress bars with percentage and estimated time.
* ✅ "Last saved 2 minutes ago" auto-save indicators.

---

## 2. Match Between System and the Real World

*The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon.*

**Mapped UX Laws:** Mental Model, Jakob's Law, Cognitive Bias
**Mapped WCAG:** 3.1.1 Language of Page, 3.1.2 Language of Parts

### Detection Patterns
* ❌ Technical jargon in user-facing copy ("null reference," "404," "payload," "deprecated").
* ❌ Abstract icons without labels (what does a diamond icon mean?).
* ❌ Date/time formats that don't match the user's locale.
* ❌ Information organized by system structure rather than user mental model (e.g., settings grouped by database table, not by task).
* ✅ Natural language labels ("Your Orders" not "Order Management Module").
* ✅ Icons paired with text labels for disambiguation.
* ✅ Information architecture matches user expectations from competitive products.

---

## 3. User Control and Freedom

*Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended process.*

**Mapped UX Laws:** Flow, Working Memory, Peak-End Rule
**Mapped WCAG:** 2.1.1 Keyboard, 2.1.2 No Keyboard Trap

### Detection Patterns
* ❌ Multi-step flows with no back button or ability to return to previous steps.
* ❌ Destructive actions with no undo option (delete without "undo" toast or trash).
* ❌ Modal dialogs without a close button or Escape key handler.
* ❌ Form wizards that lose data when navigating backward.
* ❌ Auto-playing media with no pause/stop control.
* ✅ Undo/redo support for destructive actions (Gmail-style "Undo send").
* ✅ Persistent draft saving so users can abandon and return.
* ✅ Clear "Cancel" and "Go Back" affordances at every step.

---

## 4. Consistency and Standards

*Users should not have to wonder whether different words, situations, or actions mean the same thing.*

**Mapped UX Laws:** Jakob's Law, Gestalt Similarity, Mental Model
**Mapped WCAG:** 3.2.3 Consistent Navigation, 3.2.4 Consistent Identification

### Detection Patterns
* ❌ Same action using different labels across pages ("Delete" vs "Remove" vs "Trash").
* ❌ Inconsistent button styles for the same action level (primary button is blue on one page, green on another).
* ❌ Different icon meanings across sections (gear = settings on page A, gear = preferences on page B).
* ❌ Mixed interaction patterns (some lists use click-to-expand, others use hover).
* ✅ Design tokens enforcing consistent color, spacing, and typography.
* ✅ Shared component library ensuring identical behavior across pages.
* ✅ Consistent placement of primary actions (always bottom-right of forms, always top-right of tables).

---

## 5. Error Prevention

*Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.*

**Mapped UX Laws:** Postel's Law, Cognitive Load, Parkinson's Law
**Mapped WCAG:** 3.3.4 Error Prevention (Legal, Financial, Data), 3.3.7 Redundant Entry

### Detection Patterns
* ❌ Free-text fields where a constrained input would prevent errors (e.g., text field for dates instead of a date picker).
* ❌ Destructive actions (delete account, send email) with a single unconfirmed click.
* ❌ No client-side validation — errors only appear after server round-trip.
* ❌ Allowing invalid states (e.g., end date before start date).
* ✅ Confirmation dialogs for irreversible actions, with the destructive option not pre-focused.
* ✅ Inline, real-time validation that prevents submission of invalid data.
* ✅ Type-ahead/autocomplete to prevent typos in known-value fields.
* ✅ Disabled submit buttons until form is valid (with clear indication of what's missing).

---

## 6. Recognition Rather Than Recall

*Minimize the user's memory load by making elements, actions, and options visible.*

**Mapped UX Laws:** Miller's Law, Working Memory, Chunking
**Mapped WCAG:** 1.3.1 Info and Relationships

### Detection Patterns
* ❌ Navigation requiring users to remember page names or URLs.
* ❌ Form fields referencing information from a previous step that's no longer visible.
* ❌ Dashboards with acronyms or abbreviations without tooltips or legends.
* ❌ Empty command-line-style interfaces with no suggestions or history.
* ✅ Recently viewed items, search history, and favorites.
* ✅ Autocomplete and suggestion lists in search bars.
* ✅ Persistent context panels showing accumulated selections in multi-step flows.
* ✅ Tooltips explaining non-obvious icons and abbreviations.

---

## 7. Flexibility and Efficiency of Use

*Shortcuts — hidden from novice users — can speed up the interaction for the expert user.*

**Mapped UX Laws:** Progressive Disclosure, Pareto Principle, Paradox of the Active User
**Mapped WCAG:** 2.5.1 Pointer Gestures, 2.5.7 Dragging Movements

### Detection Patterns
* ❌ No keyboard shortcuts for frequent actions.
* ❌ Expert workflows requiring the same number of clicks as novice workflows.
* ❌ No bulk/batch operations for repetitive tasks.
* ❌ Settings that require navigating through 5+ screens to find.
* ✅ Command palette (Cmd+K / Ctrl+K) for power users.
* ✅ Keyboard shortcuts with a discoverable cheat sheet.
* ✅ Customizable dashboards and saved filters.
* ✅ Batch actions for lists/tables (select all → bulk delete/export).

---

## 8. Aesthetic and Minimalist Design

*Interfaces should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with the relevant units and diminishes their relative visibility.*

**Mapped UX Laws:** Occam's Razor, Cognitive Load, Aesthetic-Usability Effect
**Mapped WCAG:** — (aesthetic, not a compliance criterion)

### Detection Patterns
* ❌ Pages with multiple competing calls-to-action of equal visual weight.
* ❌ Decorative elements that distract from the primary content.
* ❌ Dashboards showing all possible metrics by default (no personalization or progressive reveal).
* ❌ Dense paragraph blocks that could be structured as bullet points, tables, or cards.
* ✅ Clear visual hierarchy — one dominant CTA per section.
* ✅ White space used strategically to create breathing room.
* ✅ Information density calibrated to the UI type (higher for dashboards, lower for marketing).

---

## 9. Help Users Recognize, Diagnose, and Recover from Errors

*Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.*

**Mapped UX Laws:** Peak-End Rule, Feedback Principle, Postel's Law
**Mapped WCAG:** 3.3.1 Error Identification, 3.3.3 Error Suggestion

### Detection Patterns
* ❌ Generic error messages ("Something went wrong," "Error 500").
* ❌ Error messages that blame the user ("Invalid input," "Wrong password").
* ❌ Errors that clear the form, forcing the user to start over.
* ❌ No visual indication of which specific field has an error.
* ✅ Specific, actionable messages ("Password must be at least 8 characters with one number").
* ✅ Error messages that preserve user input and highlight the exact field.
* ✅ Suggested corrections ("Did you mean user@gmail.com?").
* ✅ Error summary at the top of forms with anchor links to each invalid field.

---

## 10. Help and Documentation

*It's best if the system doesn't need additional explanation. However, it may be necessary to provide documentation to help users understand how to complete their tasks.*

**Mapped UX Laws:** Paradox of the Active User, Zeigarnik Effect
**Mapped WCAG:** 3.2.6 Consistent Help

### Detection Patterns
* ❌ No onboarding or first-use guidance for complex features.
* ❌ Help documentation that opens in a new tab, losing the user's context.
* ❌ FAQ-style help that doesn't map to the user's current task.
* ❌ No in-app search for help content.
* ✅ Contextual tooltips and inline hints tied to specific features.
* ✅ Empty states that serve as onboarding ("No projects yet. Create your first project →").
* ✅ In-app help panel or chatbot accessible without leaving the current screen.
* ✅ Progressive onboarding that introduces features as users encounter them.

---

## Heuristic Evaluation Summary Template

In Deep review mode, append this summary after the standard output:

```
### 🏛️ Nielsen Heuristic Summary

| # | Heuristic | Status | Key Finding |
|---|-----------|--------|-------------|
| 1 | Visibility of System Status | 🟢/🟡/🟠/🔴 | [brief note] |
| 2 | Match System ↔ Real World | 🟢/🟡/🟠/🔴 | [brief note] |
| 3 | User Control & Freedom | 🟢/🟡/🟠/🔴 | [brief note] |
| 4 | Consistency & Standards | 🟢/🟡/🟠/🔴 | [brief note] |
| 5 | Error Prevention | 🟢/🟡/🟠/🔴 | [brief note] |
| 6 | Recognition over Recall | 🟢/🟡/🟠/🔴 | [brief note] |
| 7 | Flexibility & Efficiency | 🟢/🟡/🟠/🔴 | [brief note] |
| 8 | Aesthetic & Minimalist Design | 🟢/🟡/🟠/🔴 | [brief note] |
| 9 | Error Recovery | 🟢/🟡/🟠/🔴 | [brief note] |
| 10 | Help & Documentation | 🟢/🟡/🟠/🔴 | [brief note] |
```
