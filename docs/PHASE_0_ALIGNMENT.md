# Phase 0 Alignment Notes

Status: complete  
Created: 2026-08-25  
Related roadmap: `docs/PORTFOLIO_ROADMAP_SPEC.md`

## Goal

Phase 0 prepares the portfolio rebuild by locking the source-of-truth decisions that should guide implementation. This phase does not rebuild the UI yet. It confirms the deployment target, truthful content boundaries, content priorities, publishable assets, and how `nyx-kit` should be reused before Phase 1 starts.

## Sources Audited

| Source | Phase 0 Use |
| --- | --- |
| `docs/DESIGN.md` | Final visual system: colors, typography, spacing, shapes, atmosphere, components |
| `docs/design_prompt.md` | Positioning, desired page structure, project list, experience content, accessibility and performance notes |
| `docs/design/` | Loose generated visual reference only |
| `package.json` | Current stack, scripts, dependency list, GitHub Pages deploy script |
| `nuxt.config.ts` | Current Nuxt modules, SSR setting, prerender setup, Studio GitHub config |
| `content.config.ts` | Current Nuxt Content collections and project schema |
| `content/pages/*.md` | Current page metadata and About copy |
| `content/projects/*.md` | Current project entries and missing project gaps |
| `README.md` | Current documented workflow, currently Netlify-oriented |
| `netlify.toml` | Existing legacy deployment configuration |
| Local Anthos source repo | Source-backed Anthos stack, product model, runtime architecture, and portfolio angle |
| Local Nyx Notes source repo | Source-backed Nyx Notes stack, storage model, interfaces, auth model, and portfolio angle |

## Confirmed Decisions

| Decision | Current Direction |
| --- | --- |
| Application stack | Keep Nuxt 4, Vue 3, TypeScript, Nuxt Content, Nuxt Studio, SCSS, Nuxt Image, Nuxt Icon, Nuxt Fonts, nyx-kit, and pnpm |
| Hosting target | Use static GitHub Pages as the primary hosting target |
| Deployment method | Use GitHub Actions for automatic GitHub Pages deployment from `main` |
| Server runtime | Do not rely on server runtime, serverless functions, or runtime secrets in production |
| Content model | Keep the site content-driven through `content/` markdown and Nuxt Content schemas where practical |
| Design source | Treat `docs/DESIGN.md` as final for visual system decisions |
| Design prompt source | Treat `docs/design_prompt.md` as the main narrative and content brief |
| Generated designs | Use generated HTML/screens as visual reference only, not implementation source |
| Tailwind | Do not introduce Tailwind just because generated designs used it |
| Nyx Kit | Prefer `nyx-kit` components, composables, utilities, and styles where they fit |
| Public stance | Opportunity-ready, but grounded and not sales-heavy |
| Contact set | Use GitHub, LinkedIn, email, and resume across the hero, nav, contact section, and footer |
| LinkedIn | Confirmed: `https://www.linkedin.com/in/arne-decant-970b9282/` |
| Email | Confirmed: `hello@arnedecant.be` |
| Instagram | Confirmed: `https://www.instagram.com/arnedecant/` |
| Resume | Confirmed as self-hosted later; asset is not ready yet |
| Location wording | Use `Belgium` publicly |
| Homepage project inclusion | Include Anthos and Nyx Notes as planned Phase 1 homepage projects with source-backed fact sets |
| Personal project depth | Treat Anthos and Nyx Notes as full case-study-ready for planning; public links, screenshots, demos, and final assets remain content dependencies |
| First professional-work feature | Use Kiswe Studio as the first sanitized professional-work feature/case study |
| Confidential work | Use sanitized diagrams, abstract visuals, and public references only |
| Professional-work visuals | Design visual slots now; publish only user-approved assets later |
| Professional-work outcomes | Avoid metrics for now; use qualitative impact, responsibilities, constraints, and architectural decisions |
| Claims | Do not invent metrics, testimonials, clients, event names, awards, or private outcomes |

## Repository Facts

### Scripts

| Script | Current Command | Phase 0 Meaning |
| --- | --- | --- |
| `dev` | `nuxt dev` | Local development server |
| `build` | `nuxt build` | Current production build command, originally aligned with Netlify docs |
| `generate` | `nuxt generate` | Required direction for GitHub Pages static output |
| `preview` | `nuxt preview` | Local production preview after build/generation |
| `deploy:github` | `gh-pages -d .output/public` | Existing GitHub Pages deployment path |
| `clean` | `rm -rf .nuxt .output node_modules` | Local cleanup helper |

### Current Nuxt Setup

| Area | Current State | Phase 0 Note |
| --- | --- | --- |
| SSR | `ssr: true` | Static generation can still be used, but browser-only code must stay guarded |
| Global CSS | `assets/styles/main.scss` | Imports `nyx-kit/style.css`, reset, variables, and base styles |
| Modules | Content, ESLint, Fonts, Icon, Image, Studio | Keep current module set unless a future issue proves one should be removed |
| Prerendering | Starts with `/`, crawls links, ignores Studio paths | Needs later verification for dynamic project routes |
| Studio | GitHub integration configured | GitHub Pages cannot host server-side OAuth/runtime secrets, so Studio should not be treated as production-hosted functionality |

### Current Deployment State

| File | Current State | Phase 0 Decision |
| --- | --- | --- |
| `package.json` | Has `generate` and `deploy:github` | `generate` remains required; `deploy:github` can stay as a manual fallback unless removed later |
| `netlify.toml` | Existing Netlify config publishes `dist` | Treat as legacy or optional secondary infrastructure |
| `README.md` | Describes Netlify deployment and Nuxt Studio runtime secrets | Needs update after GitHub Pages deployment is proven |

## GitHub Pages Requirements

- The production site must be generated statically.
- The deployment output is expected to be `.output/public` when using `pnpm generate`.
- GitHub Actions is the chosen deployment method for publishing generated output to GitHub Pages.
- Every public route must be reachable from generated output.
- Dynamic case-study routes such as `/projects/[slug]` must be prerendered.
- Client-only visuals must work after static generation.
- Browser-only APIs such as `window`, `document`, canvas, and WebGL must be guarded.
- Nuxt Studio should be treated as a local or external content editing workflow unless a separate hosted solution is chosen.
- Runtime secrets must not be required by the public GitHub Pages site.

## Public Contact Data

| Channel | Status | Value | Phase 1 Handling |
| --- | --- | --- | --- |
| GitHub | Confirmed from existing config | `https://github.com/arnedecant` | Use in hero, contact section, footer, and project discovery links |
| LinkedIn | Confirmed by user | `https://www.linkedin.com/in/arne-decant-970b9282/` | Use in hero, navigation/social area, contact section, and footer |
| Email | Confirmed by user | `hello@arnedecant.be` | Use as `mailto:hello@arnedecant.be` for direct contact CTAs |
| Resume | Confirmed direction, asset pending | Self-hosted file, path not ready yet | Design and config should support it, but do not ship a broken link before the asset exists |
| Instagram | Confirmed by user | `https://www.instagram.com/arnedecant/` | Keep as a secondary social/footer link unless user later asks to promote it into primary navigation |

## Nyx Kit Audit

### Confirmed From Current Repo

| Evidence | Meaning |
| --- | --- |
| `package.json` declares `nyx-kit` at `^1.1.24` | The portfolio already depends on Nyx Kit |
| `pnpm-lock.yaml` resolves `nyx-kit@1.1.24` | The dependency version is locked |
| `assets/styles/main.scss` imports `nyx-kit/style.css` | Nyx Kit styles are already part of the global style pipeline |
| `components/ProjectSummary.vue` imports `clamp` and `generateRandomString` from `nyx-kit/utils` | Nyx Kit utilities are already used in app code |

### Confirmed From Published Package Metadata

The published `nyx-kit@1.1.24` package exposes these entry points:

| Export | Phase 0 Meaning |
| --- | --- |
| `nyx-kit` | Main library entry |
| `nyx-kit/components` | Component entry point to inspect before building generic local UI primitives |
| `nyx-kit/utils` | Utility entry point already used by `ProjectSummary.vue` |
| `nyx-kit/classes` | Class helpers to inspect before building equivalent local helpers |
| `nyx-kit/directives` | Directive entry point to inspect for interaction behavior |
| `nyx-kit/compositions` | Composable entry point to inspect for reusable Vue behavior |
| `nyx-kit/types` | Shared type entry point |
| `nyx-kit/style.css` | Current global stylesheet import |
| `nyx-kit/styles/*` | Additional style entry points if needed |

### Current Limitation

`node_modules/nyx-kit` is not present in the workspace right now, so Phase 0 can confirm package exports but not the exact component names or APIs from installed type files. Phase 1 should inspect the installed package or Nyx Kit docs before building buttons, menus, overlays, form controls, or other generic primitives locally.

### Usage Rule For Phase 1

Before creating a new generic UI primitive in the portfolio, check `nyx-kit/components`, `nyx-kit/compositions`, `nyx-kit/directives`, and `nyx-kit/utils`. Use the library directly when it fits, wrap it when the portfolio needs site-specific routing/copy/styling, and build bespoke components only for editorial layouts, custom visuals, content integration, or one-off portfolio compositions.

## Current Content Inventory

### Pages

| File | Current State | Phase 0 Decision |
| --- | --- | --- |
| `content/pages/home.md` | Front matter only | Needs homepage copy/content expansion or section content moved into components/data |
| `content/pages/about.md` | Strong long-form personal narrative | Use as primary source for About and homepage About preview |
| `content/pages/projects.md` | Filler text | Needs rewrite before project index launch |

### Existing Projects

| File | Current State | Recommended Role |
| --- | --- | --- |
| `content/projects/nyxkit.md` | Existing featured project with basic metadata | Flagship personal project and first detailed case study |
| `content/projects/webcam-audio-visualiser.md` | Existing featured creative experiment | Dramatic older experiment, likely homepage visual moment and/or case study |
| `content/projects/video-projection-mapping.md` | Existing featured creative experiment | Keep in project index or experiments section; not the top homepage feature unless desired |

### Missing Or Unconfirmed Projects

| Project | Current Phase 0 Status | Recommended Next Step |
| --- | --- | --- |
| Anthos | Confirmed as full case-study-ready local-first plant monitoring and plant-care platform, no content file found | Create detailed content and case-study structure from the source-backed facts below; confirm public repo/demo/screenshots/assets before launch copy |
| Nyx Notes | Confirmed as full case-study-ready self-hosted Markdown notes product, no content file found | Create detailed content and case-study structure from the source-backed facts below; confirm public repo/demo/screenshots/assets before launch copy |
| Showreal | Mentioned in prompt and About copy, no project file found | Add as sanitized professional case study or experience feature |
| Kiswe Studio | Confirmed as first sanitized professional-work feature/case study, no project file found | Add sanitized content using public product references, abstract diagrams, and non-confidential workflow descriptions |
| Command Center / Athlete Moment | Mentioned in prompt and About copy, no project file found | Keep as experience context or later sanitized project candidates |

## Source-Backed Personal Project Facts

### Anthos

Anthos should be presented as a local-first home monitoring and plant-care platform, not as a finished irrigation automation product. Source documents describe one home server plus optional per-plant monitoring nodes, with soil moisture as the first capability and auto-watering explicitly outside the MVP.

Confirmed stack and architecture:

- M5Stack AtomS3 Lite node firmware, built with PlatformIO and the Arduino framework.
- TypeScript backend using Node.js, Express, and `sql.js` SQLite storage.
- Vue 3 dashboard with Vue Router, Pinia, SCSS, Tauri v2 shell, and `nyx-kit` as the component library.
- Shared TypeScript contracts under `shared/`, used across node/server/app boundaries.
- Single-container Docker deployment for local network or NAS hosting.
- Nodes push telemetry to the server instead of being polled by the server.
- The server ingests telemetry, stores readings, exposes API data, and serves the built dashboard from the same deployment.

Source-backed product concepts to use in copy:

- The platform separates `plant`, `node`, and `sensor` as distinct concepts.
- The product direction starts with reliable moisture telemetry, trend history, calibration, online/offline state, plant detail, and QR-first identity workflows.
- Sensor absence and node health are treated as normal runtime conditions to surface, not fatal errors.
- The portfolio angle is the full product loop: physical device, local telemetry pipeline, durable home-hosted deployment, dashboard UX, and reusable Nyx Kit UI primitives.

Remaining Anthos dependencies:

- Confirm which repository link, if any, should be public from the portfolio.
- Capture or design approved screenshots/diagrams for node, server, dashboard, and telemetry flow.
- Avoid metrics and avoid implying auto-watering is complete unless the implementation later proves that claim.

### Nyx Notes

Nyx Notes should be presented as a self-hosted, Markdown-first notes app. Source documents describe plain `.md` files as the source of truth, with the filesystem designed to remain useful without a database or cloud service.

Confirmed stack and architecture:

- Rust workspace with `notes-core`, `notes-storage-fs`, `notes-auth`, `notes-server-axum`, `notes-cli`, and a Tauri native app shell.
- Axum HTTP API server with permission checks in the API layer and pluggable storage/auth traits below it.
- Filesystem storage with Markdown note files, metadata JSON files, and `.comments.json` sidecars for line-based discussion threads.
- Vue 3 SPA using Vue Router, Pinia, Vite, `nyx-kit`, and `NyxEditor` for Markdown editing and annotations.
- REST APIs plus typed server-sent-event live subscriptions for vault lists, note lists, and note documents.
- CLI workflows operate directly on the filesystem with no server required.
- Tauri desktop app embeds the Axum server and reuses the same HTTP contract and Vue frontend.
- Auth modes are pluggable: local, self-hosted `secret_key` users with Argon2/JWT, and future OIDC.

Source-backed product concepts to use in copy:

- The product emphasizes local ownership, portability, plain files, and self-hosting.
- Server namespaces, personal homes, shared server vaults, stable note IDs, and slug-based filesystem paths are core domain concepts.
- Global search and favorites can span configured local/remote profiles when reachable.
- The portfolio angle is a serious validation app for Nyx Kit: editor composition, domain stores, live data flow, filesystem-first backend design, CLI/native surfaces, and privacy-first product constraints.

Remaining Nyx Notes dependencies:

- Confirm which repository link, if any, should be public from the portfolio.
- Capture or design approved screenshots/diagrams for editor, comments, filesystem model, server profiles, and live subscriptions.
- Avoid claiming end-to-end encryption or AI features as shipped; source docs frame them as future optional work.

## Recommended Homepage Project Set

| Priority | Project | Reason |
| --- | --- | --- |
| 1 | Nyx Kit | Best proof of frontend architecture, design-system thinking, reusable components, documentation, and package ownership |
| 2 | Anthos | Full case-study-ready personal project showing hardware/software product thinking, local telemetry, NAS deployment, and Nyx Kit applied to a practical dashboard |
| 3 | Nyx Notes | Full case-study-ready personal project showing filesystem-first product design, Rust/Vue architecture, editor UX, live data flow, and Nyx Kit validation |
| 4 | Audio Visualiser | Strong creative technology proof and visual contrast, framed as an older experiment |
| 5 | Kiswe Studio | Strong professional credibility around browser-based live production, but must be sanitized and fact-checked |

## Professional Experience Direction

| Period | Company | Recommended Treatment |
| --- | --- | --- |
| 2014-2018 | RIS | Foundation in broad web development, websites, email templates, SEO, deployments, and custom applications |
| 2018-2020 | Nanopixel | Transition into interactive product work, 3D configurators, Showreal, multi-screen WebSocket experiences, and product ownership |
| 2020-2026 | Kiswe | Senior engineering work on complex live-video production, real-time workflows, reusable UI systems, frontend architecture, and high-stakes operational tools |

## Content Stance Decision

This content tension is resolved for Phase 1 copy work:

| Source | Message |
| --- | --- |
| `docs/design_prompt.md` | Opportunity-ready positioning, resume CTA, available for senior software engineering opportunities |
| `content/pages/about.md` | Personal portfolio tone, explicitly says the site is not for selling services or hunting for a new job |

Chosen direction:

Use opportunity-ready but grounded messaging. The site should support senior software engineering opportunities with clear resume and contact paths, while staying mature, personal, and specific rather than sales-heavy.

## Publishability Rules

- Personal and public project content can be specific when facts are known.
- Professional work should focus on public product descriptions, Arne's role, technical responsibilities, architectural patterns, and user-approved visuals only.
- Kiswe content must avoid private screens, private event names, customer names, private usage numbers, and internal operational details.
- Professional-work metrics should be avoided for now. Use qualitative impact, responsibilities, constraints, and architectural decisions instead.
- Kiswe Studio visual layouts must work even if no professional-work image is available at launch.
- Generated design screenshots and generated HTML should not be treated as factual project evidence.

## Open Decisions Before Phase 1

| Decision | Recommended Default | Why It Matters |
| --- | --- | --- |
| Public stance | Confirmed: opportunity-ready but grounded | Controls hero, contact, resume, and About language |
| Email link | Confirmed: `hello@arnedecant.be` | Required for contact CTA |
| LinkedIn URL | Confirmed: `https://www.linkedin.com/in/arne-decant-970b9282/` | Required for navigation/social/contact sections |
| Resume | Confirmed self-hosted later; exact file path pending | Determines where resume CTA points once attached |
| Instagram placement | Keep secondary/footer-only by default | Design prompt prioritizes GitHub, LinkedIn, email, and resume for opportunity-oriented paths |
| Location wording | Confirmed: use `Belgium` publicly | Controls public privacy/detail level |
| GitHub Pages method | Confirmed: GitHub Actions | Controls deployment implementation |
| Netlify config | Keep as legacy until GitHub Pages is proven | Avoids premature deletion |
| Anthos | Confirmed full case-study-ready for planning; source-backed facts captured, links/assets pending | Prevents invented hardware or metrics while still planning the intended project depth |
| Nyx Notes | Confirmed full case-study-ready for planning; source-backed facts captured, links/assets pending | Prevents overrepresenting features while still planning the intended project depth |
| Professional case study | Confirmed: start with Kiswe Studio | Controls Phase 4 content workload |
| Professional-work metrics | Confirmed: avoid metrics for now | Keeps Kiswe Studio content safe and avoids unsupported impact claims |
| Professional-work visuals | Confirmed: user-approved assets later | Prevents accidentally publishing private or unapproved product imagery |
| Portrait | Optional | Layout should work with or without it |

## Phase 0 Acceptance Status

| Acceptance Criterion | Status |
| --- | --- |
| Final copy stance is clear enough to implement | Confirmed: opportunity-ready but grounded |
| Contact/link set is clear enough to design | Confirmed: GitHub, LinkedIn, email, resume |
| Exact public contact data is available | LinkedIn and email confirmed; resume path pending |
| Location wording is clear enough to implement | Confirmed: use `Belgium` publicly |
| Homepage project set is selected | Confirmed: include Nyx Kit, Anthos, Nyx Notes, Audio Visualiser, and sanitized Kiswe Studio |
| Every homepage project has enough truthful data | Anthos and Nyx Notes source-backed facts are captured; Kiswe Studio facts and project assets still need final review before launch copy |
| Confidential work has a sanitized strategy | Confirmed: first sanitized professional-work feature is Kiswe Studio |
| Professional-work visual strategy is clear | Confirmed: design visual slots now, publish only user-approved assets later |
| Professional-work outcome strategy is clear | Confirmed: avoid metrics and use qualitative impact |
| Unknown facts are captured instead of guessed | Captured in this document |
| Nyx Kit implementation note exists | Captured in this document |
| Deployment direction is clear | Static GitHub Pages is primary target |
| Deployment method is clear | Confirmed: GitHub Actions |

## Phase 0 Closeout

Phase 0 alignment decisions are complete enough to start Phase 1. Remaining inputs, such as the self-hosted resume path, public Anthos/Nyx Notes links and assets, and user-approved Kiswe Studio facts/visuals, are tracked as content dependencies for later implementation and final launch copy rather than blockers for Phase 1 foundations.
