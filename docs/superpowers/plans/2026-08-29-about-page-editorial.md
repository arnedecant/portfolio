# About Page Editorial Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive, markdown-led `/about` page with an optional frontmatter-driven portrait slot and truthful tightened narrative.

**Architecture:** Keep prose and page metadata in `content/pages/about.md`, extend the existing `pages` collection schema for an optional portrait object, and make `pages/about.vue` the bespoke semantic layout shell. Page-local SCSS will create the Nyx editorial timeline and asymmetric sections without changing shared navigation or footer behavior.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Nuxt Content, SCSS, existing Nyx CSS tokens, SVG placeholder asset.

---

### Task 1: Extend About Content Schema And Source Data

**Files:**
- Modify: `content.config.ts:44-92`
- Modify: `content/pages/about.md:1-78`
- Create: `public/images/about-placeholder.svg`

- [ ] **Step 1: Add the optional portrait schema**

Add a reusable page portrait object beside the existing page-level schema and expose it as `portrait: image.optional()`. The existing `image` object already provides the required `src`, `alt`, and `caption` fields.

- [ ] **Step 2: Add the placeholder image**

Create a 1200x1500 SVG with a dark Nyx background, a simple abstract orbital/signal composition, and embedded accessible `<title>` and `<desc>` text. Keep it clearly abstract so it is not mistaken for Arne's portrait.

- [ ] **Step 3: Rewrite the About markdown**

Add frontmatter fields:

```yaml
eyebrow: "ABOUT / THE PERSON BEHIND THE SYSTEMS"
portrait:
  src: /images/about-placeholder.svg
  alt: "Abstract placeholder portrait made from layered orbital signal lines"
  caption: "Portrait slot, ready for a personal image."
```

Retain the existing title and description, then rewrite the body into these headings and content groups:

- Opening profile: Belgium-based senior software engineer, 10+ years, frontend specialization, design/development overlap, complex interactive tools, and product-minded UX focus.
- `A gradual move toward the front end`: explain the web starting point and transition into specialization.
- `2014–2018 / RIS`: preserve WordPress sites, varied customers, full lifecycle work, SEO, email campaigns, deployments, and CSS/SCSS origin story.
- `2018–2020 / Nanopixel`: preserve product-like interactive work, Showreal, kiosk/touch-table and wall displays, custom framework, physical cylinder navigation, and JavaScript mentorship. Use public context only to describe Nanopixel as a place where space, visualisation, and technology meet.
- `2020–now / Kiswe`: preserve Kiswe Studio and Command Center, live-stream production/fan-engagement context, real-time constraints, frontend/product bridge, shared component library ownership, and CSS/SCSS reputation. Use public context only to describe Kiswe's streaming and interactive digital experiences.
- `The way I work`: preserve the four existing principles but tighten wording and present them as short prose sections.
- `Side projects and creative experiments`: preserve both public project links, their descriptions, and the smaller WebGL/audio experiments.
- `Beyond code`: preserve music, gaming, art/tech, home automation/self-hosting interests, Yuki and Shiro, and the grounded closing explanation of why the portfolio exists.

- [ ] **Step 4: Validate content claims manually**

Check that no new metrics, customer names, awards, private details, or unsupported responsibilities were introduced, and that external links remain the existing public URLs.

- [ ] **Step 5: Commit the content foundation**

```bash
git add content.config.ts content/pages/about.md public/images/about-placeholder.svg
git commit -m "feat: prepare About page content"
```

### Task 2: Implement The Semantic About Layout

**Files:**
- Modify: `pages/about.vue:1-11`

- [ ] **Step 1: Load page data and metadata**

Keep `useAsyncData(() => queryCollection('pages').path('/pages/about').first())`, add a computed portrait guard, and call `useSeoMeta` with `about.value?.title` and `about.value?.description` fallbacks.

- [ ] **Step 2: Render the optional masthead portrait**

Render a semantic `<main class="about-page"><article>` containing an editorial header. Put the portrait inside `<figure v-if="about?.portrait?.src">`; render the image with `NuxtImg` and bind `src`, `alt`, and a conditional `figcaption`. Do not render the figure or an empty wrapper when `portrait` is absent.

- [ ] **Step 3: Render the content in page sections**

Use `ContentRenderer` for the markdown body inside a `.about-content` wrapper. Style and structure the markdown output through its heading order and wrapper selectors so content remains editable in Nuxt Studio. Add a page-local section index only if it can be generated without duplicating prose; otherwise use the existing heading structure and timeline selectors.

- [ ] **Step 4: Add semantic and visual hooks**

Use classes for masthead, portrait, content, timeline, principles, projects, and beyond-code sections. Apply classes based on heading grouping only if needed; do not move the prose into duplicated Vue data.

- [ ] **Step 5: Commit the layout shell**

```bash
git add pages/about.vue
git commit -m "feat: add About page layout"
```

### Task 3: Add About-Specific Nyx Editorial Styling

**Files:**
- Modify: `pages/about.vue` in its scoped SCSS block

- [ ] **Step 1: Build the desktop composition**

Use a wide page frame with 80px-class gutters, a 12-column grid, and generous vertical rhythm. Let the masthead place copy across the left columns and the optional portrait across the right columns. Keep prose near `var(--reading-width)`.

- [ ] **Step 2: Style the timeline**

Use a thin vertical rule and small cyan signal marker as the timeline conductor. Display each period/company/role metadata in mono text and the narrative in a readable adjacent column. Avoid colored side-stripe borders and avoid identical cards.

- [ ] **Step 3: Style principles and project links**

Use large numbered labels and separated editorial rows for the principles. Give project links an inline technical treatment with visible hover/focus states. Use cyan/violet sparingly and preserve the dark surfaces and rectilinear shape language.

- [ ] **Step 4: Add responsive and reduced-motion behavior**

At mobile widths, collapse to a single column, reduce display sizes, keep metadata readable, let the timeline rule sit beside the content, and keep the portrait within the viewport. Add reduced-motion rules for any reveal transitions. Do not animate layout properties.

- [ ] **Step 5: Commit styling**

```bash
git add pages/about.vue
git commit -m "style: refine About page presentation"
```

### Task 4: Verify Static And Accessible Behavior

**Files:**
- Verify: `pages/about.vue`
- Verify: `content.config.ts`
- Verify: `content/pages/about.md`
- Verify: `public/images/about-placeholder.svg`

- [ ] **Step 1: Run lint**

Run `pnpm exec eslint pages/about.vue content.config.ts`.

Expected: exit code 0 with no lint errors.

- [ ] **Step 2: Run the production build**

Run `pnpm build`.

Expected: Nuxt production build completes successfully.

- [ ] **Step 3: Run static generation**

Run `pnpm generate`.

Expected: static output completes and includes the `/about` route.

- [ ] **Step 4: Verify source-level conditional behavior**

Temporarily inspect the template condition and frontmatter contract to confirm `portrait` is the only condition controlling the figure. Do not remove the configured placeholder from the final change.

- [ ] **Step 5: Check repository state and commit verification changes if any**

Run `git status --short` and `git diff --check`. If verification exposed a source fix, apply it, rerun the relevant command, and commit the fix with a focused message.
