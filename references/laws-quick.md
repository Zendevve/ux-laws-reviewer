# Laws of UX Reference

A comprehensive reference of psychological principles for evaluating user interfaces. Each law includes a definition, key takeaways, and **detection patterns** — specific UI symptoms that signal a violation or successful application.

*Source: Yablonski, Jon. "Laws of UX: Using Psychology to Design Better Products & Services" (O'Reilly Media) and LawsOfUX.com (Last verified: 2024)*
*URL: https://lawsofux.com/*

> Use this file after `principles-core.md`. Start with user-outcome principles first, then map findings to the most relevant laws here.


---


## Cognitive Load
The total mental effort required to understand and interact with an interface.

* **Types:**
  * **Intrinsic:** Effort required to absorb new information and track goals.
  * **Extraneous:** Mental processing that wastes resources without helping understanding (distracting animations, unclear icons, inconsistent layouts).
  * **Germane:** Productive effort spent building mental models.
* **Takeaways:**
  * Reduce extraneous load to prevent users from feeling overwhelmed.
  * Minimize the number of decisions, visual noise, and context switches per screen.
  * Use familiar patterns to lower intrinsic load.
* **Detection Patterns:**
  * ❌ Multiple competing calls-to-action on a single screen.
  * ❌ Dense text blocks without visual breaks.
  * ❌ Icons without labels (forces recall over recognition).
  * ❌ Modals on top of modals, or nested navigation.
  * ✅ Progressive disclosure — revealing complexity only when needed.


---


## Fitts's Law
The time to acquire a target is a function of the distance to and size of the target.

* **Formula:** `T = a + b × log₂(1 + D/W)` where D = distance, W = target width.
* **Takeaways:**
  * Touch targets should be large enough for accurate selection (minimum 44×44px for WCAG, 48×48px recommended).
  * Provide ample spacing between adjacent touch targets (minimum 8px gap).
  * Place primary actions in easily acquired zones (bottom of mobile screens, corners of desktop screens).
* **Detection Patterns:**
  * ❌ Touch targets smaller than 44px on mobile.
  * ❌ Clickable links/buttons with less than 8px gap between them.
  * ❌ Critical actions placed far from natural resting positions (e.g., top-left on mobile).
  * ❌ Text-only links without padding expansion (`padding: 8px` on anchors).
  * ✅ Primary CTAs are the largest interactive elements on screen.
  * ✅ "Infinite edge" targets (elements at screen edges on desktop).
* **WCAG Cross-ref:** 2.5.8 (Target Size — NEW in 2.2) — minimum 24×24px for all interactive targets, 44×44px recommended.


---


## Hick's Law
The time to make a decision increases with the number and complexity of choices.

* **Formula:** `T = b × log₂(n + 1)` where n = number of equally probable choices.
* **Takeaways:**
  * Minimize choices when response times are critical.
  * Break complex tasks into smaller sequential steps.
  * Highlight recommended options to reduce effective choice count.
  * Use progressive onboarding to introduce features gradually.
* **Detection Patterns:**
  * ❌ Navigation menus with 8+ uncategorized top-level items.
  * ❌ Settings pages showing all options simultaneously.
  * ❌ Action menus with 10+ options without grouping or separators.
  * ✅ Categorized navigation (3–5 primary groups, sub-items on demand).
  * ✅ "Recommended" or "Most Popular" badges reducing effective choices.


---


## Gestalt Principles of Grouping

### ### Law of Proximity
Objects near each other tend to be grouped together perceptually.

* **Detection Patterns:**
  * ❌ Form labels equidistant between the field above and below (ambiguous association).
  * ❌ Button groups with the same spacing as unrelated elements.
  * ✅ Labels closer to their associated input than to adjacent inputs (ratio ≥ 2:1).


---


## Von Restorff Effect (Isolation Effect)
When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.

* **Takeaways:**
  * Make important information or key actions visually distinctive.
  * Use restraint — if everything is emphasized, nothing stands out.
  * Don't rely exclusively on color for distinction (accessibility: ~8% of males have color vision deficiency).
* **Detection Patterns:**
  * ❌ Primary CTA styled the same as secondary buttons.
  * ❌ Important alerts using only color differentiation (no icon or border).
  * ❌ Everything "highlighted" — excessive bold, color, or size variation.
  * ✅ Single, prominent primary action per screen.
  * ✅ Multi-channel distinction (color + icon + size + weight).
* **WCAG Cross-ref:** 1.4.1 (Use of Color) — distinction must never rely on color alone. ~8% of males have color vision deficiency.


---


## Feedback Principle
Every user action should produce a visible, immediate, and relevant response from the system.

* **Takeaways:**
  * Acknowledge all user actions within 100ms (visual) and 400ms (meaningful response).
  * Distinguish between types of feedback: confirmation, progress, error, and informational.
  * Match feedback intensity to action importance (delete → stronger feedback than hover).
* **Detection Patterns:**
  * ❌ Buttons with no hover, active, or focus states.
  * ❌ Form submission with no loading or success indicator.
  * ❌ Destructive actions with no confirmation or undo option.
  * ✅ Hover states on all interactive elements.
  * ✅ Toast notifications for background operations.
  * ✅ Inline validation on form fields.
* **WCAG Cross-ref:** 2.4.7 (Focus Visible), 2.4.11 (Focus Appearance — NEW in 2.2), 4.1.3 (Status Messages).
