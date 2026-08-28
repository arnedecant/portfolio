# Resume Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a web-first `/resume` page backed by structured Nuxt Content with a browser print action and CSS-controlled two-page A4 output.

**Architecture:** Store resume facts in the existing `pages` content collection, extend its schema with resume-specific structured fields, and render them through a dedicated page rather than the generic Markdown renderer. Keep screen layout and print layout in a focused resume stylesheet, and point the existing app-config resume navigation at `/resume`.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Nuxt Content, Zod, SCSS, existing Nyx design tokens.

---

### Task 1: Extend The Resume Content Schema

**Files:**
- Modify: `content.config.ts:11-23, 26-65`

- [ ] **Step 1: Add reusable resume schemas beside the existing page schemas**

Add `resumeLink`, `resumeExperience`, `resumeSkillGroup`, and `resumeProject` Zod objects. Use required strings only for facts needed to render an entry and default arrays for optional sections.

- [ ] **Step 2: Add optional resume fields to the `pages` collection schema**

Add optional `resumeSummary`, `resumeExperience`, `resumeSkills`, `resumeEducation`, and `resumeProjects` fields to the existing page collection. Keep the existing homepage/about fields unchanged.

- [ ] **Step 3: Run Nuxt type preparation**

Run: `pnpm exec nuxt prepare`

Expected: command exits with code 0 and generated Nuxt types remain valid.

- [ ] **Step 4: Commit the schema change**

```bash
git add content.config.ts
git commit -m "add resume content schema"
```

### Task 2: Add Resume Content

**Files:**
- Create: `content/pages/resume.md`

- [ ] **Step 1: Add validated resume front matter**

Create front matter for the page title, description, header details, summary, experience, grouped skills, education, and selected projects. Use the current About page for the 2014-present career narrative and the historical 2020 PDF only for older details that remain accurate. Include no unconfirmed dates, titles, metrics, or claims.

- [ ] **Step 2: Keep the Markdown body intentionally empty**

The dedicated Vue page will render the structured fields. The document body should not duplicate the same content.

- [ ] **Step 3: Commit the content**

```bash
git add content/pages/resume.md
git commit -m "add resume content"
```

### Task 3: Build The Resume Route

**Files:**
- Create: `pages/resume.vue`
- Modify: `app.config.ts:37`

- [ ] **Step 1: Query the resume content by path**

Use `useAsyncData` and `queryCollection('pages').path('/pages/resume').first()`, matching `pages/about.vue`.

- [ ] **Step 2: Set route metadata**

Use `useSeoMeta` with the resume document title and description, with sensible fallbacks.

- [ ] **Step 3: Render semantic resume sections**

Render a `main` landmark containing a screen-only page intro, print action button, summary, experience list, skills groups, education, selected projects, and a contact close. Use headings in order and real links for contact/project destinations.

- [ ] **Step 4: Implement the print action**

Add a button with `type="button"` and `@click="window.print()"` through a small `printResume` function guarded by `import.meta.client`. Give it an accessible label and keep it outside the printable resume content.

- [ ] **Step 5: Point navigation resume config to the route**

Change `app.config.ts` from `resume: null` to `{ label: 'Resume', to: '/resume' }`. Do not use a new tab for this internal route.

- [ ] **Step 6: Commit the route and navigation**

```bash
git add pages/resume.vue app.config.ts
git commit -m "add resume page route"
```

### Task 4: Add Screen And Print Styling

**Files:**
- Create: `assets/styles/resume.scss`
- Modify: `assets/styles/main.scss`

- [ ] **Step 1: Add screen layout styles**

Use existing design tokens for color, typography, spacing, borders, and content width. Make the page editorial and scannable, with a stacked experience layout that becomes a single column on small screens.

- [ ] **Step 2: Add print styles**

Inside `@media print`, set A4 portrait page sizing and margins, hide `.site-nav`, `.site-footer`, the print action, and non-resume chrome, reset decorative backgrounds, preserve essential text contrast, expose useful link URLs, and apply `break-inside: avoid` to experience/project entries.

- [ ] **Step 3: Import the stylesheet from the existing style entry point**

Add `@use './resume';` to `assets/styles/main.scss` using the same ordering conventions as the other global styles.

- [ ] **Step 4: Commit the styling**

```bash
git add assets/styles/resume.scss assets/styles/main.scss
git commit -m "style resume screen and print layouts"
```

### Task 5: Verify The Complete Phase

**Files:**
- Modify: `docs/PORTFOLIO_ROADMAP_SPEC.md` to insert the approved Phase 3.5 between Phase 3 and Phase 4, preserving the existing names and numbering of Phases 4 through 8.

- [ ] **Step 1: Validate the generated site**

Run: `pnpm build`

Expected: Nuxt build completes successfully and includes the `/resume` route.

- [ ] **Step 2: Validate static generation**

Run: `pnpm generate`

Expected: static output completes successfully and contains the resume route.

- [ ] **Step 3: Perform browser checks**

Run the app with `pnpm dev`, inspect `/resume` at desktop and mobile widths, activate the print button with keyboard focus, and inspect print preview for A4 portrait, hidden navigation/footer/action, readable links, and no awkward experience-entry splits.

- [ ] **Step 4: Update the roadmap status**

Document Phase 3.5 between Visual Depth and Project Index And Case Studies. Include its objective, `/resume` route, structured content, browser print behavior, two-page A4 target, and acceptance criteria. Do not mark it complete until the build, generation, and manual checks pass.

- [ ] **Step 5: Review the final diff and commit the roadmap update**

```bash
git status --short
git diff --check
git add docs/PORTFOLIO_ROADMAP_SPEC.md
git commit -m "add resume phase to roadmap"
```
