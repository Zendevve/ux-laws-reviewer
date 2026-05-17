# Review Examples

Annotated example reviews demonstrating the expected output quality, tone, and depth for each review mode. Use these as calibration references — your output should match this level of specificity and structure.

> **When to load:** Always load this file. These examples anchor your output format and quality baseline.

---

## Example 1: Quick Mode — Button Component

**Input:** A React button component (~30 LOC)

```jsx
function ActionButton({ label, onClick, variant = "primary" }) {
  return (
    <div
      className={`btn btn-${variant}`}
      onClick={onClick}
      style={{
        padding: "6px 12px",
        fontSize: "13px",
        borderRadius: "4px",
        cursor: "pointer",
        display: "inline-block",
        backgroundColor: variant === "primary" ? "#4A90D9" : "#e0e0e0",
        color: variant === "primary" ? "#fff" : "#333",
      }}
    >
      {label}
    </div>
  );
}
```

**Expected Output:**

### 🎯 ActionButton — Quick UX Audit

**UX Score: 48/100** | Platform: Responsive | Mode: Quick

**Top Findings:**
> **🔴 Keyboard Accessibility (Violation)** [WCAG 2.1.1]
> `<div>` used as a button without `role="button"`, `tabindex="0"`, or `onKeyDown` handler. This element is completely invisible to keyboard users and screen readers. Use a native `<button>` element instead.

> **🟠 Fitts's Law (Violation)** [WCAG 2.5.8]
> Padding of `6px 12px` produces a click target of approximately 25×13px at default font size — well below both the 44px WCAG recommendation and the 24px WCAG 2.2 minimum. Users on touch devices will mis-tap frequently.

> **🟡 Feedback Principle (Violation)** [WCAG 2.4.7]
> No hover, active, focus, or disabled states defined. The `cursor: pointer` is the only interaction cue. Users receive zero visual feedback when interacting with this button.

**Quick Wins:**
1. Replace `<div>` with `<button>` — instantly fixes keyboard access, screen reader support, and native focus management. (1 minute, fixes 🔴 Critical)
2. Increase padding to `12px 24px` minimum — doubles the touch target to meet WCAG 2.5.8. (30 seconds, fixes 🟠 Major)

---

## Example 2: Standard Mode — Login Form

**Input:** A login form page with email/password fields, "Remember me" checkbox, submit button, and social login options.

```html
<div class="login-container" style="max-width: 400px; margin: 80px auto; padding: 32px;">
  <h2 style="text-align: center; margin-bottom: 24px; color: #333;">Welcome Back</h2>

  <div class="social-buttons" style="display: flex; gap: 8px; margin-bottom: 24px;">
    <button style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer;">
      <img src="/google.svg" alt="" style="width: 20px; height: 20px;">
      Google
    </button>
    <button style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer;">
      <img src="/github.svg" alt="" style="width: 20px; height: 20px;">
      GitHub
    </button>
    <button style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer;">
      <img src="/apple.svg" alt="" style="width: 20px; height: 20px;">
      Apple
    </button>
  </div>

  <div style="text-align: center; color: #999; margin-bottom: 24px; font-size: 14px;">or continue with email</div>

  <input type="email" placeholder="Email address"
    style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 12px; font-size: 14px;">

  <input type="password" placeholder="Password"
    style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 12px; font-size: 14px;">

  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <label style="font-size: 13px; color: #666;">
      <input type="checkbox" style="margin-right: 6px;"> Remember me
    </label>
    <a href="/forgot" style="font-size: 13px; color: #4A90D9; text-decoration: none;">Forgot password?</a>
  </div>

  <button style="width: 100%; padding: 14px; background: #4A90D9; color: #fff; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;">
    Sign In
  </button>

  <p style="text-align: center; margin-top: 24px; font-size: 13px; color: #999;">
    Don't have an account? <a href="/signup" style="color: #4A90D9; text-decoration: none;">Sign up</a>
  </p>
</div>
```

**Expected Output:**

### 🎯 Context

| Attribute        | Value                               |
|------------------|-------------------------------------|
| **Platform**     | Desktop (Responsive)                |
| **UI Type**      | Authentication Form                 |
| **Primary Goal** | Sign in to an existing account      |
| **Review Mode**  | Standard                            |

### 📊 UX Score: **68/100**

| Dimension                   | Score | Notes                                        |
|-----------------------------|-------|----------------------------------------------|
| Cognitive Efficiency        | 15/20 | Clean layout, clear primary path             |
| Motor Efficiency            | 13/20 | Good CTA sizing, checkbox target too small   |
| Visual Hierarchy            | 14/20 | Strong flow, divider contrast weak           |
| Feedback & Responsiveness   | 10/20 | No validation, no loading, no error states   |
| Consistency & Familiarity   | 16/20 | Standard login pattern, good social placement|

### 🔍 Key UX Findings

> **🟠 Feedback Principle (Violation)** [WCAG 3.3.1]
> No inline validation on email or password fields. No loading state on the submit button. No error state for invalid credentials. Users will submit the form and receive no feedback until a full page response — violating the 400ms Doherty Threshold. Error messages should appear inline below each field with `aria-describedby` association.

> **🟠 Cognitive Load (Violation)** [WCAG 3.3.2]
> Both inputs use placeholder-only labels ("Email address", "Password"). Placeholders disappear on focus, forcing users to rely on memory for which field they're filling. This violates both cognitive load principles and WCAG 3.3.2 (Labels or Instructions). Add persistent `<label>` elements above each input.

> **🟡 Fitts's Law (Violation)** [WCAG 2.5.8]
> The native checkbox input is approximately 13×13px — below the WCAG 2.2 minimum of 24×24px. The "Forgot password?" link has no padding expansion, making it a ~13px-tall target. Both are difficult to tap on mobile.

> **🟡 Von Restorff Effect (Violation)** [WCAG 1.4.3]
> The "or continue with email" divider text is `#999` on white — a contrast ratio of approximately 2.85:1, failing WCAG AA (4.5:1 required). The `#999` "Don't have an account?" text has the same issue.

> **🟢 Jakob's Law (Positive)**
> Social login buttons above the form, "Forgot password?" to the right of "Remember me", and "Sign up" at the bottom follows the dominant auth page pattern (Google, GitHub, Notion all use this layout). Users will feel immediately oriented.

> **🟢 Hick's Law (Positive)**
> Three social login options is within the optimal choice range. The visual separation between social and email login (divider) reduces cognitive switching cost.

### ♿ Accessibility Snapshot

| Check                    | Status | Detail                                             |
|--------------------------|--------|----------------------------------------------------|
| Color contrast (4.5:1)   | ❌     | `#999` text on `#fff` = 2.85:1 (two instances)    |
| Keyboard navigable       | ✅     | Native `<button>` and `<input>` elements used      |
| Focus indicators visible | ⚠️     | Browser defaults only — no custom focus styles      |
| Touch targets ≥ 24px     | ⚠️     | Checkbox 13×13px, "Forgot" link has no padding     |
| ARIA roles correct       | ⚠️     | `<img alt="">` on social icons — empty alt is OK if text label exists, but icons lack `aria-hidden="true"` |
| Error messages in text   | ❌     | No error handling implemented                       |

### 🛠️ Actionable Improvements

1. **Add persistent labels above inputs**
   - **Why:** Cognitive Load + WCAG 3.3.2. Placeholder-only inputs cause a 20% increase in form errors (Baymard Institute).
   - **How:**
   ```html
   <label for="email" style="display: block; margin-bottom: 6px; font-size: 14px; color: #333; font-weight: 500;">Email address</label>
   <input id="email" type="email" placeholder="you@example.com" ...>
   ```

2. **Add inline validation and loading state**
   - **Why:** Feedback Principle + Doherty Threshold. Users need feedback within 400ms.
   - **How:** Add `onblur` validation for email format, password length. Disable button and show spinner on submit. Show inline error with `aria-describedby` on invalid fields.

3. **Fix color contrast**
   - **Why:** Von Restorff + WCAG 1.4.3. Two text elements fail AA contrast.
   - **How:** Change `#999` to `#666` (5.74:1) or `#595959` (7.0:1 for AAA).

### 💡 Quick Wins

1. Replace `color: #999` with `color: #666` on divider text and footer — fixes both contrast violations in 10 seconds.
2. Add `aria-hidden="true"` to the social login `<img>` icons since the button text already provides the label.
3. Add `autocomplete="email"` and `autocomplete="current-password"` to the inputs — enables browser autofill and password managers.

---

## Key Principles Demonstrated in These Examples

These examples demonstrate the quality bar for all reviews:

1. **Specificity over generality:** "Padding of `6px 12px` produces a click target of approximately 25×13px" — not "the button is too small."
2. **Quantified thresholds:** "2.85:1 contrast ratio, failing WCAG AA (4.5:1 required)" — not "the contrast is low."
3. **Cite the law AND the WCAG criterion:** Every finding references both the psychological principle and the accessibility standard when applicable.
4. **Code-level fixes:** Actionable improvements include actual code, not just descriptions.
5. **Severity-ordered findings:** Critical → Major → Minor → Positive. Always end with positives.
6. **Calibrated scores:** The button component (48/100) scores lower than the login form (68/100) because a fundamentally inaccessible component is worse than a form with polish issues.
7. **Acknowledge strengths:** Even a flawed UI does something right. Call it out.
