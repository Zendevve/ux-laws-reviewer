# UX Scoring Rubric

A quantitative framework for scoring UI designs on a 0–100 scale across five dimensions. Each dimension is scored 0–20, summed for the total UX Score. Accessibility is integrated as weighted sub-criteria within each dimension.

---

## Principles-First Scoring Policy

Score user outcomes first, implementation details second.

1. **Outcome over convention:** Penalize based on user friction, not on framework/platform preference alone.
2. **Evidence-weighted confidence:**
   - `[Observed]` findings can use full deduction.
   - `[Inferred]` findings should usually use partial deduction.
   - `[Assumption]` findings should be conservative and clearly labeled.
3. **No style-only penalties:** Do not deduct solely because a design differs from a platform norm when usability outcomes are still strong.
4. **Accessibility remains non-negotiable:** WCAG violations tied to real user impact still take full priority.

---

## Severity Matrix

Use these severity levels when reporting findings:

| Level | Icon | Label | Description | Impact on Score |
|-------|------|-------|-------------|-----------------|
| 4 | 🔴 | **Critical** | Directly blocks users from completing their primary goal. Users will abandon the flow. | -8 to -15 points |
| 3 | 🟠 | **Major** | Creates significant friction, confusion, or frequent errors. Users can complete the task but with frustration. | -4 to -8 points |
| 2 | 🟡 | **Minor** | Suboptimal but functional. Users can work around it without significant frustration. | -1 to -4 points |
| 1 | 🟢 | **Positive** | The design effectively leverages this principle. Acknowledge as a strength. | +0 (baseline) |

---

## Scoring Dimensions

### 1. Cognitive Efficiency (0–20)
*How easily can users process information and make decisions?*

| Score | Description |
|-------|-------------|
| 17–20 | Minimal cognitive load. Clear hierarchy, smart defaults, progressive disclosure. Users complete tasks without thinking about the interface. |
| 13–16 | Low cognitive load. Minor areas of unnecessary complexity (e.g., one uncategorized menu, a dense settings page). |
| 9–12 | Moderate cognitive load. Multiple areas of choice overload or unclear grouping. Users must "figure out" parts of the interface. |
| 5–8 | High cognitive load. Dense layouts, competing CTAs, no progressive disclosure. Users frequently pause to orient themselves. |
| 0–4 | Overwhelming. Users cannot determine what to do next without external guidance. |

**Primary laws:** Hick's Law, Miller's Law, Cognitive Load, Choice Overload, Chunking, Occam's Razor, Progressive Disclosure.

**Accessibility sub-criteria** (integrated into scoring):
- Text resize to 200% without content loss (WCAG 1.4.4) — violations deduct up to -3
- Redundant entry prevention (WCAG 3.3.7) — violations deduct up to -2
- Clear labels and instructions (WCAG 3.3.2) — violations deduct up to -3

---

### 2. Motor Efficiency (0–20)
*How easily can users physically interact with the interface?*

| Score | Description |
|-------|-------------|
| 17–20 | All interactive elements meet or exceed size/spacing thresholds. Primary actions are optimally placed for the platform. |
| 13–16 | Most targets are well-sized. Minor issues (e.g., one dense link cluster, slightly undersized secondary buttons). |
| 9–12 | Several touch/click targets below recommended sizes. Some actions require excessive scrolling or precision. |
| 5–8 | Widespread small targets, cramped spacing. Users frequently mis-tap or struggle to interact. |
| 0–4 | Interface is physically difficult to use. Critical actions are tiny, hidden, or unreachable. |

**Primary laws:** Fitts's Law, Flow.

**Accessibility sub-criteria** (integrated into scoring):
- Keyboard accessibility for all interactive elements (WCAG 2.1.1) — violations deduct up to -5
- Target size ≥ 24×24px (WCAG 2.5.8) — violations deduct up to -3
- Dragging alternatives provided (WCAG 2.5.7) — violations deduct up to -2
- No keyboard traps (WCAG 2.1.2) — violations deduct up to -5

**Platform thresholds:**

| Target | Mobile | Desktop |
|--------|--------|---------|
| Min touch/click target | 48×48px (ideal), 44×44px (WCAG min) | 24×24px (min), 32×32px (recommended) |
| Min gap between targets | 8px | 4px |
| Primary CTA placement | Bottom 1/3 of screen (thumb zone) | Near content focus, above fold |

---

### 3. Visual Hierarchy (0–20)
*How clearly does the layout communicate structure, importance, and relationships?*

| Score | Description |
|-------|-------------|
| 17–20 | Unambiguous visual hierarchy. Users can instantly identify the primary action, understand groupings, and scan content efficiently. |
| 13–16 | Strong hierarchy with minor ambiguities (e.g., one section where label-field association is unclear). |
| 9–12 | Moderate hierarchy issues. Some elements compete for attention, grouping is inconsistent. |
| 5–8 | Weak hierarchy. Users cannot quickly determine what's most important or how elements relate. |
| 0–4 | No discernible hierarchy. The page reads as a flat wall of content. |

**Primary laws:** Gestalt Principles (Proximity, Common Region, Similarity, Prägnanz, Uniform Connectedness), Von Restorff Effect, Serial Position Effect, F-Pattern/Z-Pattern.

**Accessibility sub-criteria** (integrated into scoring):
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI components (WCAG 1.4.3, 1.4.11) — violations deduct up to -4
- Information conveyed by more than color alone (WCAG 1.4.1) — violations deduct up to -3
- Heading hierarchy (single H1, logical nesting) — violations deduct up to -2

---

### 4. Feedback & Responsiveness (0–20)
*How well does the system communicate its state and respond to user actions?*

| Score | Description |
|-------|-------------|
| 17–20 | All interactions provide immediate, appropriate feedback. Loading, empty, error, and success states are all well-designed. System feels alive and responsive. |
| 13–16 | Most interactions have feedback. Minor gaps (e.g., missing hover states on secondary elements, no empty state for one section). |
| 9–12 | Noticeable feedback gaps. Some actions have no visible response, or feedback is delayed/ambiguous. |
| 5–8 | Major feedback issues. Users frequently wonder "did that work?" or encounter silent failures. |
| 0–4 | System feels dead. No loading indicators, no error messages, no confirmation of actions. |

**Primary laws:** Doherty Threshold, Flow, Goal-Gradient Effect, Feedback Principle, Peak-End Rule.

**Accessibility sub-criteria** (integrated into scoring):
- Visible focus indicators on all interactive elements (WCAG 2.4.7) — violations deduct up to -4
- Focus appearance ≥ 2px, ≥ 3:1 contrast (WCAG 2.4.11) — violations deduct up to -2
- Status messages programmatically exposed (WCAG 4.1.3) — violations deduct up to -2
- Error messages in text, not just color (WCAG 3.3.1) — violations deduct up to -3

---

### 5. Consistency & Familiarity (0–20)
*How well does the interface match user mental models and maintain internal consistency?*

| Score | Description |
|-------|-------------|
| 17–20 | Follows platform conventions perfectly. Internal patterns are 100% consistent. Users feel immediately at home. |
| 13–16 | Mostly conventional. Minor deviations from platform norms or 1–2 internal inconsistencies. |
| 9–12 | Some unconventional patterns that require learning. Inconsistent styling or behavior across sections. |
| 5–8 | Significant departures from conventions. Users must frequently learn new interaction patterns. |
| 0–4 | Fundamentally breaks user expectations. Nothing works the way users expect. |

**Primary laws:** Jakob's Law, Mental Model, Postel's Law, Paradox of the Active User.

**Accessibility sub-criteria** (integrated into scoring):
- Custom components expose correct ARIA roles and states (WCAG 4.1.2) — violations deduct up to -4
- Consistent help mechanism placement (WCAG 3.2.6) — violations deduct up to -1
- Consistent navigation across pages (WCAG 3.2.3) — violations deduct up to -2

---

## Score Interpretation

| Range | Grade | Interpretation |
|-------|-------|----------------|
| 90–100 | **A+** | Exceptional UX. Publishable as a case study. |
| 80–89 | **A** | Strong UX with minor polish opportunities. |
| 70–79 | **B** | Good UX. Several actionable improvements available. |
| 60–69 | **C** | Adequate. Functional but noticeably rough in places. |
| 50–59 | **D** | Below average. Users will encounter significant friction. |
| 0–49 | **F** | Poor UX. Fundamental rethinking required. |

---

## Applying the Score

1. Start each dimension at **15/20** (the "reasonable default").
2. For each **violation** found, subtract points per the severity matrix.
3. For each **accessibility violation** found, subtract per the sub-criteria deductions listed under each dimension.
4. For exceptional applications of UX laws, keep at 15 or bump to 16–17.
5. Reserve 18–20 for genuinely outstanding implementation in that dimension.
6. Sum all five dimensions for the total score.
7. Round to the nearest whole number.

> **Scoring conflict rule:** If a single issue violates both a UX law and an accessibility criterion, apply only the **larger** deduction (do not double-count). For example, a 12px touch target violates both Fitts's Law (-4) and WCAG 2.5.8 Target Size (-3) — apply -4, not -7.

---

## Calibration Anchors

These real-world benchmarks help calibrate your scoring. Use them as reference points, not rigid assignments.

| Score Range | Grade | Desktop Examples | Mobile Examples |
|---|---|---|---|
| 90–100 | A+ | Stripe Dashboard, Linear, Vercel | Apple Health, Revolut, Arc Browser |
| 80–89 | A | GitHub, Notion, Figma | Spotify, Duolingo, Airbnb |
| 70–79 | B | Slack, GitLab, Asana | Instagram, Google Maps |
| 60–69 | C | Jira, Salesforce Classic, Confluence | Facebook Marketplace, Yelp |
| 50–59 | D | Legacy CRMs, Jenkins, phpMyAdmin | Early-stage startup MVPs |
| 0–49 | F | Government portals, unrestyled WordPress admin | Desktop-only sites on mobile, PDF forms |

### How to Use Anchors

When scoring, mentally ask: *"Is this UI better or worse than [anchor example] in this dimension?"*

- If you score a SaaS dashboard higher than Linear's, justify why.
- If you score a checkout flow lower than Stripe's, justify the gap.
- These anchors exist to prevent score inflation (everything getting 75+) and score deflation (everything getting 50-).
