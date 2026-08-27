# Living Signal Maps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the hero's signal language into lightweight, reusable animated SVG diagrams for the homepage work and experience sections while removing the project-card animation loop leak.

**Architecture:** Add one presentational `SignalDiagram.vue` component with a constrained `variant` prop. It owns only SVG geometry, labels, token-based styling, and reduced-motion behavior. The homepage composes two variants around existing content, while `ProjectSummary.vue` keeps its current pointer decoration but no longer schedules an unbounded render loop.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup lang="ts">`, TypeScript, inline SVG, scoped SCSS, CSS custom properties, pnpm.

---

### Task 1: Build the reusable signal diagram

**Files:**
- Create: `components/SignalDiagram.vue`

- [ ] **Step 1: Define the component API**

Create a `variant` prop constrained to `'work' | 'experience'`. Default it to `'work'`. Keep the component decorative with `aria-hidden="true"`; do not expose business content, links, or interactive handlers.

- [ ] **Step 2: Add the static SVG geometry**

Render an SVG with `viewBox="0 0 640 180"`, `preserveAspectRatio="none"`, and a `role="presentation"`. Use two variant-specific path geometries and labels, but keep the same elements in both variants:

```vue
<svg viewBox="0 0 640 180" preserveAspectRatio="none" role="presentation">
  <path class="signal-diagram__guide" d="M0 136H92L136 54H254L300 136H424L474 88H640" />
  <path class="signal-diagram__route" :d="routePath" pathLength="1" />
  <circle v-for="node in nodes" :key="node.label" class="signal-diagram__node" :cx="node.x" :cy="node.y" r="4" />
  <text v-for="node in nodes" :key="`${node.label}-label`" class="signal-diagram__label" :x="node.x" :y="node.y + 24">{{ node.label }}</text>
  <circle class="signal-diagram__pulse" r="3" cy="0">
    <animateMotion :dur="prefersReducedMotion ? '0s' : '8s'" repeatCount="indefinite" :path="routePath" />
  </circle>
</svg>
```

Use a computed route and node list so the template remains shared. Keep labels truthful and generic to the section: the work variant may use `SYSTEMS`, `PRODUCT`, `INTERFACE`; the experience variant may use `RIS`, `NANOPIXEL`, `KISWE`.

- [ ] **Step 3: Add token-based responsive styling**

Style the wrapper as a full-width, non-interactive supporting visual with a bounded height, `overflow: hidden`, and `pointer-events: none`. Style the guide, route, nodes, pulse, and labels using existing `--c-border-subtle`, `--c-primary-signal`, `--c-secondary`, `--nyx-c-amber-light`, `--font-technical`, and `--text-technical` tokens. Use opacity rather than heavy fills.

Use a mobile media query to reduce the wrapper height and label size without hiding the diagram. Animate only SVG stroke/transform/opacity properties. Under `prefers-reduced-motion: reduce`, remove the pulse animation and keep the static route/nodes visible.

- [ ] **Step 4: Run the build after the component exists**

Run:

```bash
pnpm build
```

Expected: Nuxt build completes successfully and prerenders the existing routes. No new runtime dependency is introduced.

- [ ] **Step 5: Commit the component**

```bash
git add components/SignalDiagram.vue
git commit -m "add reusable living signal diagram"
```

### Task 2: Integrate the diagrams into the homepage

**Files:**
- Modify: `pages/index.vue:67-91`
- Modify: `pages/index.vue:126-360`

- [ ] **Step 1: Add the work diagram to the selected-work section**

Place `<SignalDiagram variant="work" />` after the work section lede and before `ProjectSummaryGrid`. Keep the existing heading, copy, project data, and browse link unchanged. The diagram must be a decorative addition and must not replace the project collection.

- [ ] **Step 2: Add the experience diagram to the experience section**

Place `<SignalDiagram variant="experience" />` after the experience intro and before the ordered experience list. Preserve the existing semantic `<ol>` and company summaries.

- [ ] **Step 3: Add layout spacing without creating decorative cards**

Add focused page-level spacing for the diagram placements, for example:

```scss
.work-section :deep(.signal-diagram),
.experience-intro + :deep(.signal-diagram) {
  margin: calc(var(--space-8) * -1) 0 var(--space-10);
}
```

Prefer explicit wrapper classes if Vue selector behavior makes adjacent selectors unclear. Keep the diagrams full-width within the existing section content width. At mobile widths, reduce vertical margins so the diagram does not dominate the content.

- [ ] **Step 4: Verify the visual integration**

Run:

```bash
pnpm build
```

Then inspect `/` at desktop and mobile widths. Confirm the work and experience diagrams are related but geometrically distinct, text remains the dominant content, and no horizontal scrollbar appears.

- [ ] **Step 5: Commit the homepage integration**

```bash
git add pages/index.vue
git commit -m "extend signal language across homepage sections"
```

### Task 3: Remove the project-card animation loop leak

**Files:**
- Modify: `components/ProjectSummary.vue:10-38`

- [ ] **Step 1: Remove the continuously scheduled render function**

Delete the `render()` function and the `watch($deco, render, { immediate: true })` call. The existing `onMouseMove` handler should continue updating `pointer` and regenerating the decorative string only in response to pointer movement.

- [ ] **Step 2: Preserve the existing hover behavior**

Keep the `figure` CSS variables and `@mousemove="onMouseMove"` binding. The existing scoped CSS can continue to reveal `.deco` on hover. Do not add a replacement animation loop; the project card does not need continuous JavaScript work when idle.

- [ ] **Step 3: Verify lifecycle and reduced-motion behavior**

Run:

```bash
pnpm build
```

Inspect `/` with reduced motion enabled. Confirm project cards still render, pointer decoration responds on fine pointers, and no console errors occur when navigating away from the homepage.

- [ ] **Step 4: Commit the lifecycle fix**

```bash
git add components/ProjectSummary.vue
git commit -m "stop project card animation loop"
```

### Task 4: Complete focused verification

**Files:**
- No source changes expected.

- [ ] **Step 1: Run production generation**

Run:

```bash
pnpm generate
```

Expected: `.output/public` is generated and includes `/`, `/about`, and `/projects`.

- [ ] **Step 2: Verify static and reduced-motion paths**

Inspect the generated site or production preview with JavaScript disabled and confirm the SVG diagrams and all surrounding section content remain in the HTML. Enable `prefers-reduced-motion: reduce` and confirm the signal pulse is static while the route and nodes remain visible.

- [ ] **Step 3: Run the existing lint command with its known limitation recorded**

Run:

```bash
pnpm exec eslint .
```

The current repository configuration reports parser errors for Vue SFC TypeScript blocks and an existing unused variable in `pages/projects.vue`; do not broaden this focused Phase 3 change into a lint-configuration migration. Record the result in the final implementation summary if it remains unchanged.

- [ ] **Step 4: Review the final diff and status**

Run:

```bash
git status --short
git diff HEAD~3..HEAD --stat
```

Expected: only the signal component, homepage integration, project-card cleanup, and their commits are present; generated output remains ignored.
