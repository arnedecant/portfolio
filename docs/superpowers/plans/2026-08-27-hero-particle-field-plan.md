# Hero Particle Field Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a continuously drifting, cursor-reactive particle grid behind the homepage hero without affecting content readability, accessibility, or static generation.

**Architecture:** Build one self-contained `HeroParticleField.vue` 2D canvas component. It owns particle state, spatial-grid connection lookup, pointer interpolation, resize/visibility observers, and reduced-motion behavior; `pages/index.vue` only positions it behind the hero content.

**Tech Stack:** Vue 3 `<script setup lang="ts">`, Nuxt 4, Canvas 2D API, `ResizeObserver`, `IntersectionObserver`, SCSS design tokens.

---

### Task 1: Create the particle renderer component

**Files:**
- Create: `components/HeroParticleField.vue`

- [ ] **Step 1: Define the component contract and canvas markup**

Create a canvas-only decorative component with no external dependency:

```vue
<script setup lang="ts">
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const field = useTemplateRef<HTMLDivElement>('field')

const prefersReducedMotion = ref(false)
const isVisible = ref(true)
const pointer = reactive({ x: 0, y: 0, targetX: 0, targetY: 0, active: false })

onMounted(() => {
  // Initialize observers and the renderer here.
})
</script>

<template>
  <div ref="field" class="particle-field" aria-hidden="true">
    <canvas ref="canvas" />
  </div>
</template>
```

The component must not render text, interactive elements, or fallback content of its own. The existing hero atmosphere remains visible underneath it if the canvas cannot initialize.

- [ ] **Step 2: Add typed particle state and deterministic initialization**

Use a small internal type and a seeded random helper so resize/reinitialization does not allocate unpredictable structures:

```ts
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  tone: 'primary' | 'secondary' | 'amber'
}

const particles: Particle[] = []
const cellSize = 96
const maxDpr = 2
const desktopDensity = 0.000055
const mobileDensity = 0.000028
const maxParticles = 150
```

Generate fewer particles for small canvases and cap the total count. Use token-derived colors at draw time rather than hard-coding the palette in the component.

- [ ] **Step 3: Implement resize and canvas scaling**

Add `resizeCanvas()` to read the containing element’s `clientWidth` and `clientHeight`, set the canvas backing dimensions using `Math.min(window.devicePixelRatio, maxDpr)`, and scale the 2D context. Rebuild particles only when the effective canvas dimensions change materially.

The function must return early if either template ref or the 2D context is unavailable. Use a `ResizeObserver` on `field`, disconnect it on unmount, and avoid reading layout inside the animation loop.

- [ ] **Step 4: Implement spatial-grid connection lookup**

Add `rebuildGrid()` and `drawConnections()` using a `Map<string, Particle[]>`. Insert each particle into its cell, then inspect only the current and eight neighboring cells. For each pair within the connection radius, draw one line and compute alpha from distance.

Apply cursor emphasis by multiplying alpha when the pair midpoint is inside a cursor radius. Do not change particle velocity based on the pointer.

- [ ] **Step 5: Implement motion, drawing, and lifecycle cleanup**

Add a `renderFrame(time: number)` loop that:

- Interpolates pointer position toward its target.
- Advances particles only when reduced motion is disabled.
- Wraps particles at the containing field edges.
- Clears and redraws dots and nearby connections.
- Schedules itself only while the component is visible.

Use `IntersectionObserver` to pause offscreen rendering and resume it when visible. Remove pointer listeners, disconnect both observers, cancel the animation frame, and release the canvas context reference in `onBeforeUnmount`.

- [ ] **Step 6: Add pointer, reduced-motion, and responsive styling**

Listen for `pointermove` and `pointerleave` on `window`, but only activate the cursor when the pointer is inside the field bounds. Convert coordinates to field-local positions and set `pointer.active` only for a fine pointer (`event.pointerType !== 'touch'`). This keeps the canvas fully pointer-transparent so hero links remain clickable. Use `matchMedia('(prefers-reduced-motion: reduce)')`, update on media-query changes, and draw a static sparse field when enabled.

Add scoped styles:

```scss
.particle-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

Window-level pointer tracking keeps the canvas pointer-events-free and avoids introducing an event layer that could cover hero links.

### Task 2: Integrate the field into the homepage hero

**Files:**
- Modify: `pages/index.vue:47-65`

- [ ] **Step 1: Render the field before hero content**

Place the component as the first child of `.home-hero`:

```vue
<HeroParticleField />
<div class="home-hero__inner">
```

Keep `.home-hero__inner` positioned above the canvas with `position: relative` and a positive stacking order. Keep the hero’s existing content, CTAs, metadata, and social links unchanged.

- [ ] **Step 2: Add hero layering styles**

Update the hero styles so the canvas fills only the hero and cannot block links:

```scss
.home-hero {
  position: relative;
  isolation: isolate;
}

.home-hero__inner {
  position: relative;
  z-index: 1;
}
```

Do not add a second global background or move the existing `AtmosphereLayer` out of the layout.

- [ ] **Step 3: Attach pointer tracking without blocking navigation**

Use the window-level pointer listeners described in Task 1 and calculate the hero-local position from the field element’s bounding rectangle. Ensure CTA links still receive pointer events and keyboard focus. Verify cursor tracking works over empty hero space and over links without preventing clicks.

### Task 3: Verify behavior and static output

**Files:**
- Verify: `components/HeroParticleField.vue`
- Verify: `pages/index.vue`
- Verify: `.output/public/index.html`

- [ ] **Step 1: Run formatting and whitespace checks**

Run:

```bash
git diff --check
```

Expected: no output and exit code 0.

- [ ] **Step 2: Run Nuxt production build**

Run:

```bash
pnpm build
```

Expected: Nuxt client/server build succeeds and the existing warnings do not become errors.

- [ ] **Step 3: Run static generation**

Run:

```bash
pnpm generate
```

Expected: `.output/public/index.html` is generated with the hero content and canvas component styles present.

- [ ] **Step 4: Perform browser smoke checks**

Run the local preview with:

```bash
pnpm dev
```

Check at desktop and mobile widths:

- Particles drift continuously on a normal-motion desktop browser.
- Nearby lines become more visible around the cursor.
- Cursor movement does not prevent CTA clicks.
- Touch/mobile density is lower and there is no touch interaction requirement.
- Reduced motion leaves a static sparse field.
- Text remains readable over the field.
- Navigating by keyboard still reaches every hero link.

- [ ] **Step 5: Commit the implementation**

After the checks pass, commit only the implementation files:

```bash
git add components/HeroParticleField.vue pages/index.vue
git commit -m "add interactive hero particle field"
```
