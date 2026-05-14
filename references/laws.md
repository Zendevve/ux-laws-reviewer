# Laws of UX Reference

A comprehensive reference of psychological principles for evaluating user interfaces. Each law includes a definition, key takeaways, and **detection patterns** — specific UI symptoms that signal a violation or successful application.

---

## Aesthetic-Usability Effect
Users often perceive aesthetically pleasing design as design that's more usable.

* **Takeaways:**
  * An aesthetically pleasing design creates a positive response and leads users to believe the design actually works better.
  * People are more tolerant of minor usability issues when the design is visually pleasing.
  * Visually pleasing design can mask usability problems — don't let beauty hide broken flows.
* **Detection Patterns:**
  * ❌ Inconsistent visual quality across pages (polished landing page, ugly settings page).
  * ❌ Functional elements that look broken or unfinished (unstyled buttons, default browser inputs).
  * ✅ Consistent visual language across all states (loading, empty, error, success).
* **WCAG Cross-ref:** 1.4.3 (Contrast), 1.4.11 (Non-Text Contrast) — visual polish must not sacrifice perceivability.

---

## Choice Overload (Paradox of Choice)
The tendency for people to become overwhelmed when presented with a large number of options.

* **Takeaways:**
  * Too many options hurt decision-making ability and can lead to decision paralysis.
  * Enable side-by-side comparison of related items requiring a decision.
  * Optimize for the decision-making process: prioritize content, provide search and filtering.
* **Detection Patterns:**
  * ❌ Navigation with 8+ equally-weighted top-level items.
  * ❌ Dropdowns or select menus with 15+ unfiltered options.
  * ❌ Pricing pages with 5+ plans without a "recommended" highlight.
  * ✅ Progressive disclosure — showing details on demand.
  * ✅ Default selections or "recommended" badges on primary options.

---

## Chunking
Breaking individual pieces of information into groups to aid processing and memory.

* **Takeaways:**
  * Enables users to scan content and identify relevant information quickly.
  * Structure content into visually distinct groups with clear hierarchy.
  * Apply rules (borders, spacing, headers) to separate content into modules.
* **Detection Patterns:**
  * ❌ Long unbroken lists without section headers or dividers.
  * ❌ Phone numbers or IDs displayed without formatting (e.g., `12125551234` vs `(212) 555-1234`).
  * ❌ Forms with 10+ fields in a single unbroken column.
  * ✅ Card-based grouping of related data.
  * ✅ Step indicators in multi-page forms.
* **WCAG Cross-ref:** 1.3.1 (Info and Relationships) — chunk boundaries must be programmatic (headings, fieldsets), not just visual.

---

## Cognitive Bias
Systematic errors in thinking that influence perception and decision-making.

* **Takeaways:**
  * We conserve mental energy by developing rules of thumb based on past experiences.
  * Understand intrinsic biases to serve as safeguards against fallacious reasoning.
  * Common biases in UI: anchoring (first price seen), confirmation bias (search results), status quo bias (defaults).
* **Detection Patterns:**
  * ✅ Smart defaults that leverage status quo bias ethically.
  * ❌ Manipulative patterns that exploit biases (dark patterns).

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

## Doherty Threshold
Productivity soars when a computer and its users interact at a pace (<400ms) that ensures neither has to wait on the other.

* **Takeaways:**
  * Provide system feedback within 400ms of user action.
  * Use perceived performance techniques (optimistic UI, skeleton screens, progress indicators).
  * Progress bars make wait times tolerable, even if the actual duration doesn't change.
* **Detection Patterns:**
  * ❌ Button clicks with no immediate visual feedback (no loading state, no disable).
  * ❌ Form submissions that show no indicator until a full page reload.
  * ❌ Search with no debounced instant results or loading shimmer.
  * ✅ Skeleton loaders matching layout dimensions.
  * ✅ Optimistic UI updates (e.g., like button toggles immediately).
* **WCAG Cross-ref:** 4.1.3 (Status Messages) — loading/completion states must be announced to assistive technology via `aria-live` or `role="status"`.

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

## Flow
The mental state of full immersion in energized focus and enjoyment.

* **Takeaways:**
  * Requires balance between task difficulty and user skill level.
  * Provide necessary feedback so users know what happened after each action.
  * Optimize efficiency by removing unnecessary friction and interruptions.
* **Detection Patterns:**
  * ❌ Unnecessary confirmation dialogs that break momentum.
  * ❌ Mandatory signup walls before users can experience value.
  * ✅ Smooth transitions between steps in a multi-step process.
  * ✅ Auto-save functionality that eliminates fear of data loss.

---

## Goal-Gradient Effect
The tendency to approach a goal increases with proximity to the goal.

* **Takeaways:**
  * The closer users are to completing a task, the faster they work towards it.
  * Provide artificial progress toward a goal to motivate completion.
  * Provide clear indication of progress at all times.
* **Detection Patterns:**
  * ❌ Multi-step forms with no step indicator or progress bar.
  * ❌ Onboarding flows that don't show "3 of 5 steps completed."
  * ✅ Progress bars that start at >0% (artificial endowed progress).
  * ✅ Checklist-style onboarding with completed items checked off.

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

## Jakob's Law
Users spend most of their time on *other* sites. They prefer your site to work the same way as all the other sites they already know.

* **Takeaways:**
  * Leverage existing mental models so users focus on tasks, not learning new patterns.
  * When making changes, allow users to continue using the familiar version temporarily.
  * Innovate in content and value proposition, not in basic interaction patterns.
* **Detection Patterns:**
  * ❌ Non-standard placement of navigation (bottom on desktop, top on mobile app).
  * ❌ Shopping cart icon not in top-right corner of e-commerce sites.
  * ❌ Custom scrollbar behavior that overrides native scroll.
  * ❌ Non-standard form patterns (e.g., submit button on the left).
  * ✅ Standard patterns: logo top-left links to home, search in header, etc.
* **WCAG Cross-ref:** 3.2.3 (Consistent Navigation), 3.2.4 (Consistent Identification).

---

## Gestalt Principles of Grouping

### Law of Common Region
Elements are perceived as grouped if they share an area with a clearly defined boundary.

* **Detection Patterns:**
  * ❌ Related controls (e.g., text formatting toolbar) without a shared container.
  * ✅ Form sections wrapped in bordered cards or background-differentiated panels.

### Law of Proximity
Objects near each other tend to be grouped together perceptually.

* **Detection Patterns:**
  * ❌ Form labels equidistant between the field above and below (ambiguous association).
  * ❌ Button groups with the same spacing as unrelated elements.
  * ✅ Labels closer to their associated input than to adjacent inputs (ratio ≥ 2:1).

### Law of Prägnanz (Simplicity)
People perceive complex images in their simplest form because it requires the least cognitive effort.

* **Detection Patterns:**
  * ❌ Overly complex icons that don't read at small sizes.
  * ❌ Charts with excessive decoration (3D effects, heavy gradients).
  * ✅ Clean, minimal iconography with consistent stroke weight.

### Law of Similarity
Visually similar elements (color, shape, size) are perceived as related.

* **Detection Patterns:**
  * ❌ Destructive actions styled the same as safe actions (same color/shape).
  * ❌ Disabled elements that look identical to enabled ones.
  * ✅ Consistent button hierarchy: primary (filled), secondary (outlined), tertiary (text).

### Law of Uniform Connectedness
Elements visually connected (via lines, colors, frames) are perceived as more related.

* **Detection Patterns:**
  * ❌ Timeline or process steps without connecting lines.
  * ✅ Breadcrumbs with separator characters or chevrons.
  * ✅ Stepper components with connecting lines between steps.

---

## Mental Model
A compressed representation of how users *think* a system works, based on prior experience.

* **Takeaways:**
  * Match designs to users' mental models to improve their experience.
  * Use consistent patterns and conventions (e.g., trash can for delete, gear for settings).
  * Test with real users — your mental model as a designer may differ from theirs.
* **Detection Patterns:**
  * ❌ Icons that mean different things in different parts of the app.
  * ❌ Terminology that differs from industry standard (e.g., "Vault" instead of "Archive").

---

## Miller's Law
The average person can keep 7 ± 2 items in working memory.

* **Takeaways:**
  * Organize content into smaller chunks (4–7 items per group).
  * Don't rigidly treat "7" as a magic number — the principle is about chunking, not a hard limit.
  * Use chunking to make large data sets scannable.
* **Detection Patterns:**
  * ❌ Navigation tabs with 9+ items.
  * ❌ Uncategorized lists exceeding 7 items.
  * ✅ Dashboard metrics grouped into 3–5 logical sections.

---

## Occam's Razor
Among competing hypotheses, the one with the fewest assumptions should be selected.

* **Takeaways:**
  * The best method for reducing complexity is to avoid it in the first place.
  * Remove elements that don't contribute to the primary function.
  * When two designs achieve the same goal, prefer the simpler one.
* **Detection Patterns:**
  * ❌ Decorative elements that add visual noise without serving function.
  * ❌ Redundant actions (two ways to do the same thing, both visible simultaneously).
  * ✅ Clean interfaces where every element earns its screen space.

---

## Paradox of the Active User
Users never read manuals — they start using software immediately.

* **Takeaways:**
  * Make guidance accessible throughout the product, not just at onboarding.
  * Design guidance to fit within the context of use (tooltips, inline hints, empty states).
  * Users will skip tutorials — make the interface self-explanatory.
* **Detection Patterns:**
  * ❌ Feature-heavy interfaces with no inline help or tooltips.
  * ❌ Long tutorial overlays that users dismiss immediately.
  * ✅ Contextual tooltips that appear on first interaction with a feature.
  * ✅ Well-designed empty states that teach through example.

---

## Pareto Principle (80/20 Rule)
Roughly 80% of effects come from 20% of causes.

* **Takeaways:**
  * Focus effort on the areas that bring the largest benefit to the most users.
  * Identify the 20% of features that serve 80% of user needs — prioritize those in the UI.
  * De-emphasize (don't remove) rarely-used features.
* **Detection Patterns:**
  * ❌ All features given equal visual weight regardless of usage frequency.
  * ❌ Rarely-used actions occupying prime screen real estate.
  * ✅ Primary actions prominent, secondary actions in overflow menus.

---

## Parkinson's Law
Any task will inflate until all available time is spent.

* **Takeaways:**
  * Limit the time it takes to complete a task through design constraints.
  * Use autofill, smart defaults, and pre-population to reduce input effort.
* **Detection Patterns:**
  * ❌ Forms requesting information the system already has.
  * ❌ No autocomplete on address, email, or known-value fields.
  * ✅ Pre-filled forms based on user profile or previous entries.

---

## Peak-End Rule
People judge an experience based on how they felt at its most intense point and at its end, not the average.

* **Takeaways:**
  * Pay close attention to the most intense points and final moments of a user journey.
  * Design to delight at these moments. People recall negative experiences more vividly.
  * The last interaction (checkout confirmation, sign-up success, offboarding) disproportionately shapes perception.
* **Detection Patterns:**
  * ❌ Abrupt endings (form submits, page goes blank, no confirmation).
  * ❌ Error-heavy peak moments (payment page with poor validation).
  * ✅ Delightful success states (confetti, thank-you messages, clear next steps).
  * ✅ Graceful error recovery at critical moments.

---

## Postel's Law (Robustness Principle)
Be liberal in what you accept, and conservative in what you send.

* **Takeaways:**
  * Be empathetic, flexible, and tolerant of variable user inputs.
  * Accept multiple input formats, translate internally to meet requirements.
  * Provide clear feedback when inputs need adjustment.
* **Detection Patterns:**
  * ❌ Phone fields rejecting valid formats (spaces, dashes, country codes).
  * ❌ Date inputs requiring a specific format without a picker.
  * ❌ Search that fails on typos instead of showing "did you mean…?"
  * ✅ Flexible input parsing (accepts "1/2/25", "01-02-2025", "Jan 2 2025").
* **WCAG Cross-ref:** 3.3.7 (Redundant Entry — NEW in 2.2), 3.3.1 (Error Identification).

---

## Progressive Disclosure
Sequencing information and actions across several screens to reduce cognitive load.

* **Takeaways:**
  * Show only the information and controls relevant to the current task.
  * Reveal complexity progressively as users need it.
  * Advanced features should be accessible but not prominent.
* **Detection Patterns:**
  * ❌ Settings pages showing every option at once without categorization.
  * ❌ Advanced filters visible by default on a simple search.
  * ✅ "Show advanced options" expandable sections.
  * ✅ Contextual toolbars that appear only when relevant content is selected.

---

## Selective Attention
Focusing attention on a subset of stimuli related to our goals, filtering out the rest.

* **Takeaways:**
  * Guide users' attention and prevent distraction from their goal.
  * **Banner Blindness:** Users ignore content that resembles advertisements.
  * **Change Blindness:** Significant interface changes go unnoticed without strong visual cues.
* **Detection Patterns:**
  * ❌ Important system messages styled like promotional banners.
  * ❌ Subtle status changes without animation or color transition.
  * ✅ Attention-drawing animations for critical state changes (new notification dot).

---

## Serial Position Effect
Users best remember the first and last items in a series.

* **Takeaways:**
  * Place the least important items in the middle of lists.
  * Position key actions on the far left and far right within navigation.
  * In mobile bottom navigation, place primary actions at the edges.
* **Detection Patterns:**
  * ❌ Primary navigation action buried in the middle of a tab bar.
  * ✅ Most important tabs at the start and end of navigation bars.

---

## Tesler's Law (Conservation of Complexity)
For any system, there is an irreducible amount of complexity that cannot be removed.

* **Takeaways:**
  * The burden of inherent complexity should be assumed by the system, not the user.
  * Invest in engineering effort to simplify the user-facing experience.
* **Detection Patterns:**
  * ❌ Requiring users to understand system internals (database IDs, API error codes).
  * ❌ Manual configuration that could be automated or defaulted.
  * ✅ Smart defaults that handle common cases automatically.

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

## Working Memory
A cognitive system that temporarily holds and manipulates information needed to complete tasks.

* **Capacity:** Limited to 4–7 chunks, fading after 20–30 seconds.
* **Takeaways:**
  * Support recognition over recall (show options, don't force users to remember them).
  * Place the burden of memory on the system, not the user.
  * Visually differentiate visited links, completed steps, and previous selections.
* **Detection Patterns:**
  * ❌ Multi-step forms where users can't see/review previous step data.
  * ❌ Error messages that reference field names not visible on screen.
  * ✅ Persistent summary panels showing accumulated selections.
  * ✅ Visited link styling, recently viewed items.

---

## Zeigarnik Effect
People remember uncompleted or interrupted tasks better than completed tasks.

* **Takeaways:**
  * Invite content discovery by providing clear signifiers of additional content.
  * Provide artificial progress toward a goal to motivate completion.
  * Incomplete progress indicators drive return engagement.
* **Detection Patterns:**
  * ❌ Completed onboarding flows that provide no "what's next" guidance.
  * ✅ Profile completeness bars ("Your profile is 60% complete").
  * ✅ "Continue where you left off" sections.

---

## F-Pattern & Z-Pattern (Reading Patterns)
Users scan content in predictable patterns: F-pattern for text-heavy pages, Z-pattern for minimal pages.

* **Takeaways:**
  * Place critical content along the F-pattern's hotspots (top horizontal bar, left vertical bar).
  * For landing pages with minimal text, follow the Z-pattern: top-left → top-right → bottom-left → bottom-right.
  * Don't place important actions or information in the "dead zones" (lower-right for F-pattern pages).
* **Detection Patterns:**
  * ❌ Primary CTA placed in the lower-right of a text-heavy page.
  * ❌ Important information buried in the middle of dense paragraphs.
  * ✅ Key actions and headings aligned to the left edge on content pages.
  * ✅ CTAs at the terminal points of the Z-pattern on landing pages.

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