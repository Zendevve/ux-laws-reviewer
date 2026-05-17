# Framework-Specific Detection Patterns

UX and accessibility anti-patterns specific to popular frontend frameworks. These supplement the framework-agnostic laws in `laws.md` with patterns that only manifest in JSX, Vue templates, Svelte markup, or framework-specific APIs.

> **When to load:** Load this file when reviewing code written in a specific framework. Skip if reviewing raw HTML/CSS or design mockups.

---

## React / Next.js

### Accessibility Traps

| Pattern | Issue | Fix |
|---------|-------|-----|
| `<div onClick={...}>` | Not keyboard-accessible, no role, no tab order | Use `<button>` or add `role="button"`, `tabIndex={0}`, `onKeyDown` |
| `<a onClick={...}>` without `href` | Not a real link — keyboard/screen reader can't follow | Use `<button>` for actions, `<a href="...">` for navigation |
| `<img src={...}>` without `alt` | Screen readers announce filename | Always include `alt=""` (decorative) or `alt="description"` |
| `onChange` on `<select>` as sole trigger | Keyboard users trigger onChange while arrowing through options | Add a submit button, or use `onBlur` for the action |
| `autoFocus` prop | Disorients screen reader users; breaks spatial mental model | Remove unless in a modal where focus trapping is expected |
| `dangerouslySetInnerHTML` | Can inject content without ARIA or semantic structure | Sanitize and ensure injected HTML has proper semantics |

### UX Performance Traps

| Pattern | UX Law Violated | Fix |
|---------|----------------|-----|
| Re-rendering entire lists on single-item change | Doherty Threshold — visible jank on updates | Use `React.memo`, `useMemo`, or virtualization (`react-window`) |
| Missing `key` prop on list items | Flow — React can't efficiently reconcile, causing flicker | Use stable, unique keys (not array indices for dynamic lists) |
| `useEffect` without cleanup for animations | Flow — memory leaks, stale animations | Return cleanup function from `useEffect` |
| `useState` for animation values | Doherty Threshold — re-renders at 60fps = lag | Use `useRef` or Framer Motion's `useMotionValue` |
| No `Suspense` boundaries | Doherty Threshold — no fallback during async loading | Wrap lazy components in `<Suspense fallback={<Skeleton />}>` |

### Next.js Specific

| Pattern | Issue | Fix |
|---------|-------|-----|
| Interactive components without `"use client"` | Hydration mismatch, broken interactivity | Add `"use client"` to components using hooks, event handlers |
| `<Image>` without `width`/`height` or `fill` | CLS (Cumulative Layout Shift) — page jumps on load | Always specify dimensions or use `fill` with `sizes` |
| Client-side navigation without loading state | Doherty Threshold — user sees nothing during route transition | Use `useTransition` or `loading.tsx` |
| Missing `metadata` export in `page.tsx` | Not a UX law but affects SEO and social sharing | Export `metadata` with title, description, openGraph |

---

## Vue.js

### Accessibility Traps

| Pattern | Issue | Fix |
|---------|-------|-----|
| `@click` on non-interactive elements (`<div>`, `<span>`) | Same as React's div-onClick — not keyboard-accessible | Use `<button>` or add `role`, `tabindex`, `@keydown.enter` |
| `v-html` directive | Can inject unsemantic content | Ensure injected HTML has proper ARIA/semantics |
| `v-show` vs `v-if` for modals | `v-show` keeps modal in DOM — screen readers find hidden content | Use `v-if` for modals and dialogs, plus `aria-hidden` on background |
| Missing `key` on `v-for` items | Same reconciliation issues as React | Always bind `:key` to a stable unique identifier |
| `<transition>` without `appear` | Content pops in without animation on initial render | Add `appear` prop for first-render transitions |

### Vue-Specific UX Patterns

| Pattern | UX Law Violated | Fix |
|---------|----------------|-----|
| Watchers triggering UI updates without debounce | Doherty Threshold — excessive reactivity causes jank | Use `watchDebounced` from VueUse or manual debounce |
| Global event bus for UI state | Cognitive Load — unpredictable state changes | Use Pinia store or provide/inject for predictable state |
| `<keep-alive>` caching stale form data | Working Memory — user sees outdated data | Add `key` or invalidate cache on route change |

---

## Svelte / SvelteKit

### Accessibility Traps

| Pattern | Issue | Fix |
|---------|-------|-----|
| `on:click` on `<div>` / `<span>` | Not keyboard-accessible | Use `<button>` or add `role`, `tabindex`, `on:keydown` |
| `{@html ...}` | Same as React/Vue raw HTML injection | Sanitize and ensure semantic structure |
| `bind:this` for focus management without lifecycle awareness | Focus set before element is rendered | Use `tick()` before focusing: `await tick(); el.focus()` |
| Missing `aria-live` on reactive `{#if}` blocks | Screen readers don't announce content that appears reactively | Wrap dynamic content in `aria-live="polite"` region |

### Svelte-Specific UX Patterns

| Pattern | UX Law Violated | Fix |
|---------|----------------|-----|
| `$:` reactive statement causing cascading updates | Doherty Threshold — waterfall re-renders | Batch related state changes; use derived stores |
| `{#each}` without `(key)` | Same list reconciliation issues | Always use `{#each items as item (item.id)}` |
| SvelteKit `load()` without streaming | Doherty Threshold — page blocked until all data resolves | Use streaming with `{#await}` blocks |

---

## HTML / Vanilla JS (Framework-Agnostic)

### Common Anti-Patterns

| Pattern | Issue | Fix |
|---------|-------|-----|
| `<div class="button">` | Not a button — zero accessibility | Use `<button>` |
| `<a href="#">` or `<a href="javascript:void(0)">` | Not a real link — confusing for screen readers | Use `<button>` for actions, `<a href="/path">` for navigation |
| `tabindex="5"` (positive tabindex) | Breaks natural tab order — confuses keyboard users | Use `tabindex="0"` (natural order) or `tabindex="-1"` (programmatic only) |
| `outline: none` without replacement | Removes all focus indicators | Use `:focus-visible` for keyboard-only focus styles |
| `<table>` for layout | Screen readers announce it as a data table | Use CSS Grid/Flexbox for layout, `<table>` only for data |
| Inline `style="display:none"` for toggling | Content still present in accessibility tree in some browsers | Use `hidden` attribute or `aria-hidden="true"` + `display:none` |
| `window.scrollTo` without reduced-motion check | Violates `prefers-reduced-motion` user preference | Wrap in `matchMedia('(prefers-reduced-motion: reduce)')` check |

---

## CSS Anti-Patterns Affecting UX

These CSS patterns affect UX law compliance regardless of framework:

| Pattern | UX Law / WCAG | Fix |
|---------|--------------|-----|
| `font-size: 14px` (fixed px) | WCAG 1.4.4 (Text Resize) | Use `rem` or `em` units |
| `overflow: hidden` on text containers | Cognitive Load — clips content at zoom | Use `overflow: auto` or `overflow: visible` with layout adjustment |
| `user-select: none` on content | Flow — prevents copying text users need | Only apply to interactive controls, never body text |
| `pointer-events: none` on visible content | Motor Efficiency — looks interactive but isn't | Make it either interactive or visually inert |
| `:hover` styles without `:focus-visible` equivalent | WCAG 2.4.7 — keyboard users get no feedback | Mirror all `:hover` styles with `:focus-visible` |
| `transition: all` | Doherty Threshold — animates properties you didn't intend, can cause jank | Specify exact properties: `transition: transform 0.2s, opacity 0.2s` |
| `z-index: 9999` | Cognitive Load — z-index wars, unpredictable layering | Use a z-index scale (e.g., 1/10/20/30/40/50) with semantic names |
