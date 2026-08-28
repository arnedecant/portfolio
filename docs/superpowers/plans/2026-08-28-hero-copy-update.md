# Hero Copy Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage hero positioning copy with the approved senior engineer and web architect messaging.

**Architecture:** Keep the copy in the existing `pages/index.vue` hero markup and update the two documentation references that describe the hero. No component, layout, styling, content schema, or interaction changes are required.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Markdown, SCSS.

---

### Task 1: Update Hero Copy

**Files:**
- Modify: `pages/index.vue:52-54`
- Modify: `docs/design_prompt.md:73`
- Modify: `docs/PORTFOLIO_ROADMAP_SPEC.md:399`

- [ ] **Step 1: Replace the rendered hero strings**

In `pages/index.vue`, replace the existing eyebrow, heading, and lede with:

```vue
<TechnicalLabel>SENIOR SOFTWARE ENGINEER · WEB ARCHITECT</TechnicalLabel>
<h1 id="hero-title">I give complex products a center of gravity.</h1>
<p class="home-hero__lede">For over a decade, I’ve shaped real-time tools, design systems and interactive experiences into products that feel coherent from the inside out.</p>
```

- [ ] **Step 2: Synchronize the design prompt**

In `docs/design_prompt.md`, replace the hero eyebrow reference with:

```text
SENIOR SOFTWARE ENGINEER · WEB ARCHITECT
```

Also replace any documented headline or lede that describes the previous hero wording with the approved headline and lede exactly:

```text
I give complex products a center of gravity.

For over a decade, I’ve shaped real-time tools, design systems and interactive experiences into products that feel coherent from the inside out.
```

- [ ] **Step 3: Synchronize the roadmap specification**

In `docs/PORTFOLIO_ROADMAP_SPEC.md`, replace the documented eyebrow, headline, and lede references for the hero with the same three approved strings. Do not alter unrelated roadmap requirements.

- [ ] **Step 4: Verify no previous hero copy remains in the targeted references**

Run:

```bash
rg -n "CREATIVE TECHNOLOGIST|I build complex interfaces|Senior software engineer with 10\+ years" pages/index.vue docs/design_prompt.md docs/PORTFOLIO_ROADMAP_SPEC.md
```

Expected: no matches.

- [ ] **Step 5: Verify the approved copy appears in all required locations**

Run:

```bash
rg -n "SENIOR SOFTWARE ENGINEER · WEB ARCHITECT|I give complex products a center of gravity\.|For over a decade, I’ve shaped real-time tools" pages/index.vue docs/design_prompt.md docs/PORTFOLIO_ROADMAP_SPEC.md
```

Expected: the approved copy is present in the homepage and its documentation references.

- [ ] **Step 6: Run the production build**

Run:

```bash
pnpm build
```

Expected: Nuxt completes the client and server builds successfully. Existing warnings about Nuxt Studio OAuth variables, browser data, and large chunks may remain.

- [ ] **Step 7: Check the diff and commit**

Run:

```bash
git diff --check
git diff -- pages/index.vue docs/design_prompt.md docs/PORTFOLIO_ROADMAP_SPEC.md
git add pages/index.vue docs/design_prompt.md docs/PORTFOLIO_ROADMAP_SPEC.md
git commit -m "refine homepage hero copy"
```

Expected: whitespace validation passes, only the approved copy changes, and the commit is created.

## Coverage Check

- The approved eyebrow, headline, and lede are covered by Steps 1-3.
- Layout and behavior preservation is covered by the focused file scope and production build in Step 6.
- Copy consistency is covered by Steps 4-5.
- No dedicated test suite exists in this repository, so build and static copy checks are the appropriate verification.
