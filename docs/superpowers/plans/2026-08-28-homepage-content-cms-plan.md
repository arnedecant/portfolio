# Homepage Content CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the existing homepage copy and experience/expertise data into the Nuxt Content Markdown document without changing the homepage's visual structure.

**Architecture:** Keep `pages/index.vue` responsible for layout and rendering. Add a typed homepage content shape to the existing `pages` collection schema, store the current values in `content/pages/home.md` frontmatter, and query that document at render time.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Nuxt Content 3, Zod, Markdown, pnpm.

---

### Task 1: Extend the page content schema

**Files:**
- Modify: `content.config.ts:13-22`

- [ ] **Step 1: Define nested Zod schemas for homepage content**

Add schemas before `defineContentConfig` for experience entries and expertise groups, then add optional homepage fields to the `pages` collection. Use defaults for arrays so an absent field remains renderable:

```ts
const experience = z.object({
  period: z.string(),
  company: z.string(),
  role: z.string(),
  summary: z.string(),
})

const expertise = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(z.string()),
})
```

Add these fields to the pages schema:

```ts
heroLabel: z.string().optional(),
heroTitle: z.string().optional(),
heroLede: z.string().optional(),
heroLocation: z.string().optional(),
heroAvailability: z.string().optional(),
heroPrimaryAction: z.string().optional(),
heroSecondaryAction: z.string().optional(),
workLabel: z.string().optional(),
workTitle: z.string().optional(),
workLede: z.string().optional(),
workBrowseLabel: z.string().optional(),
workProjectsTitle: z.string().optional(),
experienceLabel: z.string().optional(),
experienceTitle: z.string().optional(),
experienceIntro: z.string().optional(),
experience: z.array(experience).default([]),
practiceLabel: z.string().optional(),
practiceTitle: z.string().optional(),
expertise: z.array(expertise).default([]),
aboutLabel: z.string().optional(),
aboutTitle: z.string().optional(),
aboutCopy: z.string().optional(),
aboutLinkLabel: z.string().optional(),
contactLabel: z.string().optional(),
contactTitle: z.string().optional(),
contactCopy: z.string().optional(),
contactEmailLabel: z.string().optional(),
contactLinkedInLabel: z.string().optional(),
contactGitHubLabel: z.string().optional(),
contactLocation: z.string().optional(),
```

- [ ] **Step 2: Run Nuxt preparation to catch schema/type errors**

Run: `pnpm exec nuxt prepare`

Expected: Nuxt generates successfully without content schema errors.

### Task 2: Move homepage content into Markdown

**Files:**
- Modify: `content/pages/home.md`

- [ ] **Step 1: Add the current homepage values as frontmatter**

Keep the existing `title`, `slug`, `eyebrow`, and `seoDescription` values. Add frontmatter values matching the current homepage exactly, including the ordered `experience` and `expertise` arrays. Use YAML strings for copy and YAML arrays for repeated items.

- [ ] **Step 2: Verify the Markdown remains valid**

Run: `pnpm exec nuxt prepare`

Expected: Nuxt Content accepts all frontmatter values and regenerates types.

### Task 3: Render the Markdown-backed homepage data

**Files:**
- Modify: `pages/index.vue:1-124`

- [ ] **Step 1: Query the home page collection**

Replace the local `experience` and `expertise` constants with:

```ts
const { data: home } = await useAsyncData(() =>
  queryCollection('pages').path('/pages/home').first(),
)
```

- [ ] **Step 2: Replace hardcoded template copy with `home` values**

Use optional chaining and empty-array fallbacks for all CMS fields. Preserve the existing HTML elements, class names, links, components, section IDs, and loop keys. Render `home.value?.experience ?? []` and `home.value?.expertise ?? []` for the repeated sections.

- [ ] **Step 3: Run lint/type/build verification**

Run: `pnpm exec nuxt prepare`

Expected: Nuxt type generation succeeds.

Run: `pnpm generate`

Expected: Static generation completes successfully and produces the homepage using the Markdown-backed values.

- [ ] **Step 4: Inspect the final diff for scope**

Run: `git diff --stat && git diff -- content.config.ts content/pages/home.md pages/index.vue`

Expected: Only the content schema, home Markdown, homepage query/rendering, and the approved plan/spec documentation are changed; no layout or styling changes are present.

- [ ] **Step 5: Commit the implementation**

```bash
git add content.config.ts content/pages/home.md pages/index.vue docs/superpowers/plans/2026-08-28-homepage-content-cms-plan.md
git commit -m "move homepage content into markdown"
```
