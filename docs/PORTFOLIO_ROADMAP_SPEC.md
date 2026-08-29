# Portfolio Roadmap Spec

Status: planning spec  
Created: 2026-08-25  
Primary sources: `docs/DESIGN.md`, `docs/design_prompt.md`, generated design references in `docs/design/`, current Nuxt source, current markdown content, `README.md`, and audited local Anthos/Nyx Notes source repositories

## Purpose

This document defines a phased roadmap for rebuilding Arne Decant's portfolio site while keeping the current technology stack. The goal is to turn the early portfolio project into a polished, content-driven site that presents Arne as a senior software engineer, frontend architect, product-minded engineer, and creative technologist.

The roadmap should guide future implementation work in order. It is intentionally more detailed than a typical feature brief so work can resume later without re-reading all reference documents.

## Fixed Constraints

- Keep the current application stack: Nuxt 4, Vue 3, TypeScript, Nuxt Content, Nuxt Studio, SCSS, Nuxt Image, Nuxt Icon, Nuxt Fonts, nyx-kit, and pnpm.
- Use static GitHub Pages as the primary hosting target. The site must be able to run from generated static output without server runtime, serverless functions, or runtime secrets.
- Use GitHub Actions as the primary deployment method for publishing generated output to GitHub Pages.
- Use `nyx-kit` components, composables, utilities, and styling primitives where they fit the needed UI. Prefer extending or wrapping `nyx-kit` for standard interface pieces instead of rebuilding equivalent primitives from scratch.
- Keep the project content-driven where practical, using markdown under `content/` and schemas in `content.config.ts`.
- Use `docs/DESIGN.md` as the final source for color palette, typography, spacing, shape, and visual principles.
- Use `docs/design_prompt.md` as the source for positioning, page structure, project content, experience content, accessibility requirements, and responsive requirements.
- Use generated static designs under `docs/design/` as loose visual references only. Do not port their Tailwind setup, invented content, or one-off static implementation directly into the Nuxt app.
- Do not invent testimonials, metrics, usage numbers, awards, employers, client names, confidential product screens, event names, or business outcomes.
- Mark uncertain project details as content that must be confirmed before launch rather than presenting them as facts.
- Preserve a mature, technical, atmospheric tone. Avoid a generic developer template, corporate SaaS landing page, resume dashboard, terminal-themed portfolio, neon cyberpunk aesthetic, or arbitrary logo wall.

## Current Project Snapshot

### Stack And Runtime

- `package.json` defines a Nuxt/Vue application with `nuxt`, `vue`, `@nuxt/content`, `nuxt-studio`, `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/image`, `zod`, `nyx-kit`, SCSS support through `sass-embedded`, and deployment helper dependencies.
- `nuxt.config.ts` enables SSR, smooth router scrolling, global SCSS through `assets/styles/main.scss`, Nuxt Content, Nuxt Studio GitHub integration, Nuxt Icon, Nuxt Image, and Nuxt Fonts.
- `package.json` already includes `generate` and `deploy:github`, so GitHub Pages deployment is already anticipated by the scripts. GitHub Actions is the chosen primary deployment method; the script can remain as a manual fallback unless removed later.
- `netlify.toml` currently runs `pnpm run build` and publishes `dist`. Treat this as existing legacy deployment context unless Netlify is intentionally kept as a secondary option.
- `README.md` currently describes the site as deployed on Netlify with Nuxt Studio editing. This should be updated once the GitHub Pages deployment path is confirmed.

### Source Structure

- `pages/index.vue` renders `AppHero`, optional homepage markdown body, and `ProjectSummaryGrid`.
- `pages/about.vue` renders markdown from `content/pages/about.md`.
- `pages/projects.vue` renders featured project summaries from the `projects` collection.
- `content.config.ts` currently defines two collections: `pages` and `projects`.
- `content/pages/home.md` only has front matter and no body content.
- `content/pages/about.md` contains the richest personal narrative currently in the repo.
- `content/pages/projects.md` is still filler text.
- `content/projects/` currently includes NyxKit, Webcam Audio Visualiser, and Video Projection Mapping.
- `components/` contains early UI pieces: `AppHero`, `AppCanvas`, `CtaButton`, `ProjectSummary`, and `ProjectSummaryGrid`.
- `assets/styles/` imports nyx-kit styles, reset, variables, and base styles.
- `ProjectSummary.vue` already imports `clamp` and `generateRandomString` from `nyx-kit/utils`, so the project is already using `nyx-kit` beyond styles.

### Current Implementation Gaps

- The existing homepage is far smaller than the target design brief.
- Navigation, footer, experience, expertise, philosophy, about preview, contact, and reusable case-study routes are not yet implemented.
- Project summaries use a uniform card grid, while the brief asks for varied editorial compositions.
- `AppCanvas.vue` is currently only a canvas shell.
- `CtaButton.vue` still has a local radius comment and uses the older aurora gradient direction instead of the final restrained Nyx system.
- Existing global CSS still contains aurora gradient tokens that do not match the final `docs/DESIGN.md` direction.
- Social configuration currently includes GitHub and Instagram; the design brief also needs LinkedIn, email, and resume actions.
- The About page says the site is not meant to sell services or hunt for a new job, while the design prompt includes availability messaging for senior opportunities. Phase 0 resolves this as opportunity-ready but grounded, with exact contact and resume details still to confirm.

## North Star

Build a portfolio that communicates seniority, technical depth, taste, and ownership. It should feel like the work of someone who once built experimental Three.js experiences and now applies that same curiosity to mature, high-stakes product engineering.

The site should make the following message obvious within the first few sections:

- Arne is a Belgium-based senior software engineer with 10+ years of experience.
- His strongest focus is frontend architecture, complex product interfaces, reusable component systems, and design-system thinking.
- He can work across frontend, backend integrations, real-time communication, live media, browser-based 3D, developer tooling, and product ownership.
- He cares about clarity, reliability, maintainability, and the user experience of complex tools.
- He has a credible creative technology background without turning the site into an art portfolio.

## Recommended Roadmap Strategy

### Recommended: Content-First Phased Rebuild

Start by locking the content model and design tokens, then rebuild the site section by section. Add richer visuals after the content structure and responsive foundations are stable.

Why this is recommended:

- It keeps the current Nuxt Content workflow central.
- It keeps `nyx-kit` in the implementation path as the default component foundation, while still allowing bespoke portfolio-specific compositions.
- It avoids over-investing in animation before the site narrative is coherent.
- It lets the homepage, project index, and case-study template share the same content data.
- It reduces the risk of copying generated HTML that looks interesting but does not fit the current app architecture.

### Alternative: Visual-First Rebuild

Start with the hero animation, atmospheric visuals, and generated design translation before expanding content.

Trade-offs:

- This could create motivation and a strong first impression quickly.
- It risks delaying the more important information architecture and copy decisions.
- It can produce a beautiful shell that still lacks persuasive content.

### Alternative: Minimal Iteration

Keep the current pages and only polish the hero, project cards, and styles.

Trade-offs:

- This is the fastest route to visible progress.
- It underserves the depth of the design prompt.
- It would not properly communicate professional experience, seniority, case studies, or creative technology range.

## Final Design Direction

### Visual Identity

Use the final Nyx direction from `docs/DESIGN.md`: nocturnal technical, atmospheric minimalism, technical signal flows, deep space, refined engineering precision, and restrained luminescence.

The emotional target is sophisticated mystery plus clear competence. The site should feel quiet, deliberate, and engineered, not flashy or gimmicky.

### Visual Principles

- Use near-black depth rather than flat black.
- Add subtle grain or noise to avoid sterile dark surfaces.
- Use fine 0.5px to 1px lines as structural conductors.
- Use cyan and violet accents as restrained signal elements.
- Reserve amber for critical or high-priority calls to action.
- Favor asymmetric, editorial compositions over centered template layouts.
- Use generous negative space, especially between major sections.
- Keep rounded corners restrained. The overall shape language should stay rectilinear.
- Use glow sparingly so it feels like a hardware indicator or phosphor screen, not neon decoration.

### Color Requirements

The design token implementation should map the `docs/DESIGN.md` palette into CSS custom properties and SCSS variables.

Core palette to preserve:

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Background | `background` | `#12131a` | Main page background |
| Deep surface | `surface-container-lowest` | `#0c0e14` | Deep sections, footer, low-luminance panels |
| Surface | `surface` | `#12131a` | Default dark surface |
| Raised surface | `surface-container` | `#1e1f26` | Subtle lifted panels |
| High surface | `surface-container-high` | `#282a31` | More visible containers |
| Highest surface | `surface-container-highest` | `#33343c` | Rare high-contrast containers |
| Primary signal | `primary-container` | `#38bdf8` | Active cyan lines, accents, primary UI signals |
| Primary text/accent | `primary` | `#8ed5ff` | Primary text accent, border highlights |
| Secondary atmosphere | `secondary` | `#d0bcff` | Violet accent moments |
| Warm contrast | `tertiary-container` | `#f59e0b` | Critical CTA, rare visual contrast |
| Main text | `on-surface` | `#e2e1eb` | Main copy and headings |
| Muted text | `on-surface-variant` | `#bdc8d1` | Body support text and metadata |
| Outline | `outline` | `#87929a` | Muted borders and labels |
| Outline variant | `outline-variant` | `#3e484f` | Low-emphasis borders |

Implementation notes:

- Replace or de-emphasize the current aurora gradients in `assets/styles/variables.scss`.
- Avoid large generic gradient blobs.
- Use `#ffffff05` and `#ffffff10` style translucent borders where appropriate.
- Use `box-shadow: 0 0 20px #38bdf820` only for subtle signal glow.

### Typography Requirements

Use the typography strategy from `docs/DESIGN.md`:

| Role | Font | Target Usage |
| --- | --- | --- |
| Display/editorial | Playfair Display | Hero headings, major section titles, occasional editorial statements |
| Body/system | Inter | Paragraph copy, navigation, UI text, long-form case-study content |
| Technical metadata | JetBrains Mono | Eyebrows, tags, metadata, project specs, small labels |

Target scales:

- Desktop display: 80px, 700, line-height 1.1, letter spacing -0.02em.
- Mobile display: 48px, 700, line-height 1.2.
- Medium heading: 40px, 600, line-height 1.3.
- Body: 16px, 400, line-height 1.6.
- Technical metadata: 12px, 500, line-height 1.4, letter spacing 0.05em.
- Label caps: 11px, 700, uppercase style, letter spacing 0.15em.

### Layout Requirements

- Use a 12-column desktop grid.
- Use 80px desktop page margins and 24px mobile margins as the reference values.
- Use 160px or larger section gaps on desktop where the design needs breathing room.
- Keep spacing on 4px multiples.
- Use intentional empty grid cells and asymmetry rather than filling every column.
- On mobile, switch to a clear vertical flow without tiny metadata or horizontal scrolling.
- Keep tap targets accessible and readable.

### Component Style Requirements

- Buttons should be sharp, restrained, and technical.
- Primary buttons should use transparent background, cyan border, cyan text, and a subtle glow on hover.
- Critical CTAs may use amber background with dark text, but only where the action needs strong emphasis.
- Tags should use JetBrains Mono, small caps, thin borders, and little or no fill.
- Project cards should feel like technical plates or editorial entries rather than generic rounded cards.
- Separators should act like signal lines or blueprint wiring.
- Navigation should be fixed or sticky, subtly translucent, and readable over the atmosphere.

## Nyx Kit Usage Strategy

Use `nyx-kit` as the preferred component and utility foundation for the portfolio whenever it supports the needed behavior without fighting the final visual direction in `docs/DESIGN.md`.

### Use Nyx Kit For

- Standard UI primitives that already exist in the library, such as buttons, form controls, overlays, menus, layout helpers, or reusable interaction patterns.
- Composables and utilities that reduce local code, especially small interaction helpers, math/string utilities, and reusable browser-safe logic.
- Design-system-aligned implementation details, such as token conventions, base styles, component API patterns, and reusable SCSS conventions.
- Internal consistency between this portfolio, Nyx Kit itself, Nyx Notes, and Anthos, since those projects are meant to demonstrate the same component ecosystem.
- Project visuals that can honestly show Nyx Kit components, tokens, component anatomy, docs, and reuse across applications.

### Wrap Or Extend Nyx Kit When

- A portfolio component needs site-specific copy, routing, layout, or analytics but can still delegate its base behavior to a Nyx Kit primitive.
- The visual design requires the final nocturnal technical treatment but the accessibility, keyboard behavior, or interaction state can come from Nyx Kit.
- A reusable site component, such as `CtaButton`, `SocialLinks`, or mobile navigation, can expose a portfolio-specific API while using Nyx Kit internally.

### Build Bespoke Components When

- The component is a portfolio-specific editorial composition, such as the hero, experience timeline, positioning diagram, featured work layout, or case-study section layout.
- The component renders custom WebGL, canvas, shader, SVG signal diagrams, or sanitized product visuals.
- The final design requires a one-off expressive visual that should not become part of the general Nyx Kit API.
- Using a Nyx Kit primitive would add awkward overrides, weaken the final `docs/DESIGN.md` aesthetic, or make the component harder to understand.

### Implementation Rule

Before creating a new generic UI primitive in this portfolio, check whether `nyx-kit` already provides the needed behavior. If it does, use it directly or wrap it. If it does not, build the smallest portfolio-local component needed and only consider upstreaming it to Nyx Kit later if it becomes reusable outside this site.

## Content Positioning Brief

### Primary Goal

Position Arne as a senior product engineer with deep frontend expertise who can:

- Own complex, business-critical web applications.
- Architect sophisticated frontend systems.
- Build reusable component libraries and design systems.
- Work across frontend, backend integrations, real-time communication, 3D, video, and developer tooling.
- Turn technically complicated products into clear, intuitive interfaces.

### Tone

- Confident, mature, grounded, and specific.
- Personal enough to feel like Arne, not a corporate profile.
- Technical without becoming a hacker-terminal cliche.
- Creative without sacrificing usability or credibility.
- Honest about project scope, older experiments, and confidential professional work.

### Messaging To Avoid

- Skill percentages or progress bars.
- A wall of technology logos.
- Fake code snippets as decoration.
- Generic claims like "I build beautiful websites" without evidence.
- Any invented measurable outcomes.
- Confidential internal imagery or details presented as public.

## Information Architecture

### Primary Routes

| Route | Purpose | Priority |
| --- | --- | --- |
| `/` | Main portfolio narrative and conversion path | Highest |
| `/projects` | Browse selected work and experiments | High |
| `/projects/[slug]` | Reusable case-study route for selected projects | High |
| `/about` | More personal career story and working style | Medium |

### Homepage Sections

The homepage should become the central portfolio experience. Recommended order:

1. Hero
2. Introduction and positioning
3. Featured personal projects
4. Professional experience
5. Expertise
6. Engineering philosophy
7. About preview
8. Contact
9. Footer

### Navigation

Desktop navigation:

- Arne Decant wordmark or monogram
- Work
- Experience
- Expertise
- About
- Contact
- Resume action

Mobile navigation:

- Compact wordmark or monogram.
- Menu button with accessible label.
- Full-screen or panel navigation that preserves the same anchors.
- Contact/resume actions should remain reachable without crowding the header.

### Anchor Strategy

Homepage section anchors:

- `#work`
- `#experience`
- `#expertise`
- `#about`
- `#contact`

The existing `#projects` anchor can either be replaced by `#work` or kept as an alias during implementation. Prefer `#work` in final navigation because it covers professional and personal work more naturally.

## Content Model Roadmap

### Existing Collections

The current `pages` collection is enough for simple page metadata and markdown bodies.

The current `projects` collection supports:

- `title`
- `slug`
- `summary`
- `tech`
- `featured`
- `github`
- `link`
- `order`
- `thumbnail`
- `logo`

### Needed Project Fields

Extend the project collection before building case-study pages. Recommended fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `title` | string | Project display title |
| `slug` | string | Route segment |
| `summary` | string | Card/list description |
| `description` | string | Longer case-study intro |
| `category` | string | Example: Vue component library and design system |
| `role` | string | Arne's role |
| `timeline` | string | Human-readable timeframe |
| `status` | string | Example: published package, older experiment, sanitized professional work |
| `featured` | boolean | Featured on homepage |
| `featureWeight` | number | Controls homepage visual prominence |
| `order` | number | Sort order |
| `tech` | string array | Technology tags |
| `links` | object array | Label, URL, type, external flag |
| `thumbnail` | image object | Summary visual |
| `heroVisual` | image/video/abstract object | Case-study hero visual |
| `confidential` | boolean | Signals sanitized case-study handling |
| `era` | string | Recent work, professional work, earlier experiment |
| `caseStudy` | structured object or markdown body | Detailed project narrative |

### Case Study Content Blocks

Each case study should support these sections, either through markdown headings or structured fields:

- Project hero
- Project title and one-sentence value proposition
- Role
- Timeline
- Technologies
- Project status
- Links to live project, documentation, source, or public reference
- Context
- Problem
- Constraints
- My responsibilities
- Technical approach
- Important architectural decisions
- Interface or system walkthrough
- Outcome
- What I learned
- Next project navigation

### Content Confirmation Checklist

Confirm the following before final launch copy is written:

- Public contact set is confirmed as GitHub, LinkedIn, email, and resume.
- Preferred email address for public contact is confirmed as `hello@arnedecant.be`.
- LinkedIn URL is confirmed as `https://www.linkedin.com/in/arne-decant-970b9282/`.
- Instagram URL is confirmed as `https://www.instagram.com/arnedecant/`; keep it secondary/footer-only by default unless explicitly promoted later.
- Resume is confirmed as a future self-hosted asset. The file is not ready yet, so the exact path and whether the CTA should say "View resume" or "Download resume" remain pending.
- Exact availability wording for the confirmed opportunity-ready stance.
- Location wording is confirmed as `Belgium` for public copy.
- Anthos and Nyx Notes are confirmed for Phase 1 homepage inclusion. Source-backed capabilities are captured; public repository links, demos, screenshots, and asset availability still need confirmation before launch copy is finalized.
- Kiswe Studio is confirmed as the first sanitized professional-work feature/case study.
- Professional-work metrics should be avoided for now; use qualitative impact, responsibilities, constraints, and architectural decisions instead.
- Professional-work visual slots should be designed now, but Kiswe Studio visuals should only use user-approved assets later. The layout must work without a professional-work image at launch.

## Target Content Inventory

### Hero

Source content from `docs/design_prompt.md`:

- Eyebrow: `SENIOR SOFTWARE ENGINEER · WEB ARCHITECT`
- Headline: `I give complex products a center of gravity.`
- Supporting copy: `For over a decade, I’ve shaped real-time tools, design systems and interactive experiences into products that feel coherent from the inside out.`
- Primary CTA: `Explore my work`
- Secondary CTA: `View resume`
- Compact links: GitHub, LinkedIn, email, resume
- Secondary social link: Instagram at `https://www.instagram.com/arnedecant/`
- Confirmed LinkedIn target: `https://www.linkedin.com/in/arne-decant-970b9282/`
- Confirmed email target: `mailto:hello@arnedecant.be`
- Resume target: self-hosted file to be attached later. Do not ship a broken resume link before the asset exists.
- Location/status line: `Based in Belgium · Available for senior software engineering opportunities`

Recommended content adjustment:

- Keep the headline from the prompt. It is stronger than the current `Arne Decant` homepage heading.
- Use opportunity-ready status wording, with exact phrasing finalized after contact, resume, and location details are confirmed.
- Keep central text highly legible above any WebGL or particle background.

### Introduction And Positioning

Suggested content:

`I'm a senior software engineer focused on frontend architecture, product ownership and complex interactive systems. My work spans livestream production, real-time communication, browser-based 3D experiences and reusable Vue component systems.`

Visual treatment:

- Represent three connected ideas: complex products, reusable systems, clear experiences.
- Avoid three generic marketing cards.
- Use lines, typography, and a subtle system diagram to connect the ideas.

### Featured Personal Projects

Projects from the design prompt:

| Project | Category | Treatment |
| --- | --- | --- |
| Nyx Kit | Vue component library and design system | Largest visual footprint; emphasize component system, tokens, docs, testing, and reusable package architecture |
| Anthos | Local-first plant monitoring and plant-care platform | Confirmed Phase 1 homepage slot; show M5Stack AtomS3 Lite nodes, TypeScript/Express ingestion server, Vue/Tauri dashboard, local telemetry, NAS Docker deployment, and Nyx Kit dashboard primitives; do not imply completed auto-watering or invent metrics |
| Nyx Notes | Self-hosted Markdown notes product | Confirmed Phase 1 homepage slot; show Rust Axum backend, filesystem-first Markdown storage, Vue/NyxEditor app, CLI, Tauri shell, REST/SSE live data flow, comments sidecars, and Nyx Kit validation |
| Audio Visualiser | Creative coding / Three.js experiment | Dramatic full-width visual moment; label clearly as older creative experiment |

Existing project content:

- `content/projects/nyxkit.md` exists and should be expanded.
- `content/projects/webcam-audio-visualiser.md` exists and maps to the Audio Visualiser brief.
- `content/projects/video-projection-mapping.md` exists but is not listed as a top homepage project in the design prompt. It can appear in `/projects` or a "More experiments" area.

Missing project content to add later:

- Anthos, confirmed for Phase 1 homepage inclusion with source-backed project facts, but still missing a portfolio content file, public link decision, and final assets.
- Nyx Notes, confirmed for Phase 1 homepage inclusion with source-backed project facts, but still missing a portfolio content file, public link decision, and final assets.
- Optional sanitized professional case-study entries.

Source-backed Anthos facts to use later:

- Anthos is a local-first home monitoring platform for M5Stack AtomS3 Lite nodes, a TypeScript server, and a Vue dashboard.
- The product direction is one home server plus optional per-plant monitoring nodes, starting with soil moisture and expanding later toward temperature, humidity, light, plant records, care history, diagnostics, and QR-first identity workflows.
- Node firmware, backend API, Vue/Tauri app, and shared TypeScript contracts live as separate workspace areas.
- Nodes push telemetry to the server; the server ingests readings, stores them, exposes API data, and serves the built dashboard from the same deployable app.
- The backend uses Node.js, TypeScript, Express, and `sql.js`; the frontend uses Vue 3, Vue Router, Pinia, SCSS, Tauri v2, and `nyx-kit`.
- Docker support targets local network and NAS hosting with persistent mounted data.
- Important content boundary: auto-watering is not in the MVP, so use plant monitoring/care language unless implementation status changes.

Source-backed Nyx Notes facts to use later:

- Nyx Notes is a self-hosted, Markdown-first notes app where plain `.md` files are the source of truth.
- The Rust workspace includes core domain traits, filesystem storage, auth, Axum server, CLI, and Tauri native shell crates.
- The Vue 3 SPA uses Vue Router, Pinia, Vite, `nyx-kit`, and `NyxEditor`; the editor supports Markdown and line-based annotations.
- Backend flow is REST plus typed SSE subscriptions for vault lists, note lists, and note documents.
- Comments are stored in `.comments.json` sidecars anchored to selected text.
- The CLI operates directly on the filesystem without the server; the Tauri app embeds the Axum server and reuses the HTTP contract.
- Auth is pluggable across local mode, self-hosted `secret_key` mode with Argon2/JWT, and future OIDC.
- Important content boundary: optional E2EE and AI are future directions, not shipped features to claim now.

Project links from the prompt:

- Nyx Kit GitHub: `https://github.com/NyxKit/nyx-kit`
- Nyx Kit docs/live: `https://nyxkit.github.io/nyx-kit`
- Nyx Kit organization: `https://github.com/nyxkit`
- Audio Visualiser GitHub: `https://github.com/arnedecant/audio-visualiser`
- More experiments: `https://github.com/arnedecant?tab=repositories`

### Professional Experience

Use an editorial vertical timeline covering 2014-2026.

RIS, 2014-2018:

- Role: Software Developer.
- Summary: Built websites, email templates, SEO, deployments, and custom applications for varied customers.
- Notable work: event-management platform.
- Narrative role: foundation in full-lifecycle web work and CSS/SCSS craft.

Nanopixel, 2018-2020:

- Roles: Software Engineer, Lead Developer, Product Owner.
- Summary: Built browser- and kiosk-based 3D configurators, interactive 3D maps, visualization tools, and Showreal.
- Showreal: real-estate showroom sales experience using a touch-table control interface and wall display, communicating through Node.js WebSockets.
- Arne's role: product owner and lead developer.
- Public reference: `https://www.showreal.immo/`
- Visual idea: two-screen diagram showing touch table, WebSocket connection, and wall display.

Kiswe, 2020-2026:

- Role: Senior Software Engineer.
- Summary: Worked on complex browser-based products for live video production, remote participation, and large-scale streaming operations.
- Products: Kiswe Studio, Athlete Moment, Command Center.
- Kiswe Studio: cloud-based livestream production tool in the browser, conceptually similar to a significantly more capable browser-based OBS.
- Athlete Moment: low-latency remote communication experience connecting athletes at a stadium with family and friends at home, with producer workflows for broadcast selection.
- Command Center: operational interface for configuring, managing, and monitoring large-scale live-video delivery and streaming experiences.
- Emphasize frontend architecture, operational workflows, real-time interfaces, reusable UI systems, reliability, collaboration, ownership, and maintainability.
- Public references: `https://support.kiswe.com/hc/en-us/categories/28381171717271-Studio`, `https://www.kiswe.com/kiswe-core`, `https://www.kiswe.com/kiswe-connect`.

### Expertise

Use capability groups, not a logo cloud.

Frontend architecture:

- Vue 3
- TypeScript
- Nuxt
- Complex state and application workflows
- Component API design
- Performance and maintainability

Design systems and developer experience:

- Reusable component libraries
- Storybook
- Theming and design tokens
- Accessibility
- Documentation
- Package architecture

Quality and delivery:

- Vitest
- Playwright
- Static analysis
- Code review
- CI/CD
- Vite
- Testing strategy

Interactive and real-time systems:

- Three.js
- WebGL and GLSL
- Web Audio
- WebSockets
- Live video and production workflows
- Multi-screen experiences

Broader engineering:

- Node.js
- Backend integration
- Docker
- Product ownership
- Cross-functional collaboration
- Technical leadership

Visual emphasis:

- Frontend architecture and product ownership should read as the deepest strengths.
- Do not assign numeric skill levels.

### Engineering Philosophy

Use three short principles:

| Principle | Supporting Meaning |
| --- | --- |
| Own the whole problem | Understand the product, constraints, and consequences, not only the assigned code |
| Design for other developers | Build APIs, components, and systems that are predictable, documented, and maintainable |
| Make complexity feel simple | Hide operational complexity without hiding important information |

Visual treatment:

- Use large typography and restrained motion.
- Avoid another generic card row.

### About

Suggested tone:

- Grounded and personal.
- Belgium-based.
- Comfortable in the overlap of engineering, interaction design, product thinking, and creative experiments.
- Include music, gaming, art/tech overlaps, home automation, self-hosted systems, and dogs Yuki and Shiro if the more personal tone remains desired.

Source content from current `content/pages/about.md`:

- 10+ years of experience.
- Highly specialized in frontend with an eye for design and detail.
- Loves complex interactive tools that need to be reliable, clear, and pleasant to use.
- Bridges design and development.
- Product-minded and UX-focused.
- Strong CSS/SCSS expertise.
- Motivated by products that evolve and decisions that matter over time.

Recommended homepage treatment:

- Keep the homepage About section short.
- Link to `/about` for the longer personal story.
- Make portrait support optional so the layout works without photography.

### Contact

Source content from `docs/design_prompt.md`:

- Headline: `Have a complex product that needs clarity?`
- Supporting text: `I'm interested in senior engineering roles where I can combine frontend architecture, technical ownership and thoughtful product development.`
- Actions: Email me, Connect on LinkedIn, View GitHub, Download resume.
- Location: use confirmed public wording based on `Belgium`, not town-level location.

Recommended content adjustment:

- Use opportunity-ready but grounded language. The contact section should make senior engineering opportunities easy to initiate without sounding exaggerated, desperate, or sales-heavy.

## Component Architecture Roadmap

Prefer `nyx-kit` for standard UI behavior and keep this repository focused on portfolio-specific composition, content integration, and expressive visuals. Components listed below can be thin wrappers around Nyx Kit primitives when the library already provides the underlying behavior.

### Foundation Components

Build or refactor these first:

| Component | Responsibility |
| --- | --- |
| `SiteNav` | Responsive sticky navigation, section anchors, resume/contact actions |
| `SiteFooter` | Footer identity, social/contact links, copyright, tech note |
| `SectionFrame` | Shared section spacing, grid behavior, optional eyebrow/title layout |
| `TechnicalLabel` | Mono/caps metadata labels used across sections |
| `CtaButton` | Final Nyx button variants replacing old aurora style; wrap or extend Nyx Kit button primitives if available |
| `SocialLinks` | GitHub, LinkedIn, email, optional Instagram with accessible labels |
| `ResponsiveVisual` | Wrapper for images, diagrams, videos, and abstract visuals with alt text |

### Homepage Components

| Component | Responsibility |
| --- | --- |
| `HomeHero` | Hero copy, CTAs, social links, location/status line, visual background slot |
| `SignalHeroCanvas` | Optional WebGL/Three.js-style particle or signal background with reduced-motion and mobile fallback |
| `PositioningSection` | Editorial intro plus connected idea motif |
| `FeaturedWorkSection` | Varied project showcase driven by featured project content |
| `ExperienceTimeline` | RIS, Nanopixel, Kiswe timeline with diagrams/metadata |
| `ExpertiseSection` | Capability groups with hierarchy and no percentage ratings |
| `PhilosophySection` | Three engineering principles in an editorial layout |
| `AboutPreview` | Short personal summary and link to `/about` |
| `ContactSection` | Final CTA, contact methods, availability/location wording |

### Project Components

| Component | Responsibility |
| --- | --- |
| `ProjectList` | `/projects` overview with selected work and experiments |
| `ProjectFeature` | Homepage feature block with custom layout based on `featureWeight` or project slug |
| `ProjectMetaPanel` | Role, timeline, status, technologies, links |
| `ProjectCaseStudyHero` | Immersive project header with sanitized/abstract visual support |
| `CaseStudySection` | Reusable long-form section layout for context, problem, approach, outcome |
| `NextProjectNav` | Previous/next or curated next project link |

### Visual System Components

| Component | Responsibility |
| --- | --- |
| `TokenPlate` | Visual treatment for design tokens/component anatomy in Nyx Kit sections |
| `MediaSignalVisual` | Abstract visual for livestream, audio, or real-time media flows |
| `ExperimentVisual` | Expressive visual wrapper for older creative experiments |

## Phase 0 - Alignment, Audit, And Source Of Truth

### Objective

Prepare the project for a phased rebuild by resolving factual content questions, deciding which projects get priority, and documenting what can be published.

### Tasks

- Review `docs/DESIGN.md` and convert final design decisions into an implementation-facing token list.
- Review `docs/design_prompt.md` and extract approved copy, project details, professional experience details, and explicit anti-requirements.
- Review generated designs under `docs/design/` for useful layout ideas without adopting Tailwind or invented content.
- Audit existing `content/` entries and decide which are homepage features, project-index entries, and case-study candidates.
- Audit available `nyx-kit` components, composables, utilities, and styles so future implementation reuses the library where practical.
- Capture the GitHub Pages decision as the primary deployment direction and list the static-output constraints it creates.
- Capture GitHub Actions as the deployment method for publishing static output to GitHub Pages.
- Record the confirmed opportunity-ready public stance and finalize exact hero/contact wording after links and resume details are known.
- Confirm exact public contact destinations for the required GitHub, LinkedIn, email, and resume set. LinkedIn, email, and Instagram are confirmed; Instagram should stay secondary/footer-only by default, and the resume path is pending until the self-hosted file is attached.
- Confirm publishable assets: portrait, resume PDF, project screenshots, abstract diagrams, logos, and external links.
- Decide whether `/projects/[slug]` should be the case-study route or whether a `/work/[slug]` alias should be added later.

### Acceptance Criteria

- The final copy stance is confirmed as opportunity-ready but grounded, without contradictory availability messaging.
- The set of homepage projects is selected.
- Every homepage project has enough truthful data for a summary block.
- Confidential work has a clear sanitized presentation strategy.
- Unknown facts are captured in a content checklist rather than guessed.
- There is a short implementation note identifying which foundation UI pieces should use `nyx-kit` directly, which should wrap it, and which should remain bespoke.
- Deployment direction is clear: static GitHub Pages first, with Netlify treated as legacy or optional secondary infrastructure.
- Deployment method is clear: GitHub Actions publishes the generated static site.

### Dependencies

- Access to public social/contact links.
- Decision about resume file and availability wording.
- Decision about publishable professional project details.

## Phase 1 - Technical And Design Foundations

### Objective

Establish the reusable site foundation before rebuilding visible sections.

### Tasks

- Map the `docs/DESIGN.md` palette into CSS custom properties in `assets/styles/variables.scss`.
- Replace the old aurora gradient emphasis with the final Nyx "void and pulse" direction.
- Add typography variables for Playfair Display, Inter, and JetBrains Mono.
- Ensure Nuxt Fonts is configured or used so the target fonts load predictably.
- Align local CSS variables with `nyx-kit` token conventions where possible instead of creating a separate parallel design-token system.
- Define global spacing, layout, section, grid, border, focus, and selection styles.
- Add or refine base body styles for dark atmosphere, grain/noise overlay, readable text, and no horizontal overflow.
- Refactor `CtaButton.vue` to use final button variants and design tokens.
- Use `nyx-kit` components for standard primitives where available, especially buttons, form-like controls, overlays, menus, and reusable interaction states.
- Introduce a site shell with navigation and footer, either through Nuxt layouts or top-level page composition.
- Add `SiteNav`, `SiteFooter`, `SectionFrame`, `TechnicalLabel`, and `SocialLinks`.
- Extend `app.config.ts` for GitHub, LinkedIn, email, Instagram, and resume metadata.
- Extend `content.config.ts` to support richer project metadata and future case-study content.
- Add any needed asset directories for project media, abstract diagrams, resume, and visual references.

### Acceptance Criteria

- The app still builds with the current Nuxt stack.
- The old visual direction no longer controls primary styling.
- Tokens are centralized enough that future sections do not hardcode the core palette repeatedly.
- Standard UI primitives use `nyx-kit` directly or through thin portfolio wrappers where doing so fits the design and behavior.
- Navigation and footer can be reused across pages.
- Project content schema supports the homepage and case-study roadmap.
- Existing content remains renderable after schema changes.

### Verification

- Run `pnpm install` if dependencies are not installed.
- Run `pnpm build` after foundation changes.
- Run `pnpm exec eslint .` if linting is not exposed as a package script.

## Phase 2 - Homepage Content Skeleton

### Objective

Build the full homepage structure with accurate content before investing in advanced animation.

### Tasks

- Replace the current minimal homepage with the target section order.
- Implement `HomeHero` using the target headline, supporting copy, CTA structure, and accessible links.
- Implement `PositioningSection` with the three connected ideas: complex products, reusable systems, clear experiences.
- Implement `FeaturedWorkSection` using content-driven project data and a non-uniform layout.
- Implement `ExperienceTimeline` with RIS, Nanopixel, and Kiswe content.
- Implement `ExpertiseSection` with capability groups and clear visual hierarchy.
- Implement `PhilosophySection` using the three principles from the prompt.
- Implement `AboutPreview` using condensed, grounded copy from the existing About page.
- Implement `ContactSection` with confirmed contact and availability wording.
- Keep visuals mostly CSS/SVG/static in this phase to validate structure and readability.
- Ensure the homepage is fully responsive without advanced WebGL.

### Acceptance Criteria

- The homepage tells the full intended story from hero through contact.
- All sections work on mobile and desktop.
- No section depends on generated fake content.
- The page remains readable without animation.
- Navigation anchors work.
- CTAs point to real routes, anchors, files, or external URLs.

### Verification

- Run `pnpm build`.
- Manually inspect desktop and mobile widths in local dev.
- Check keyboard navigation for header links and CTAs.

## Phase 3 - Homepage Visual Depth And Interaction

### Objective

Add the atmospheric, interactive qualities that make the portfolio distinctive, while preserving performance and accessibility.

### Tasks

- Implement the hero background as a calm particle field, signal landscape, or shader-style atmosphere.
- Ensure the hero has a non-WebGL fallback.
- Respect `prefers-reduced-motion` by reducing or disabling particle movement and other animations.
- Use a lighter mobile hero visual than desktop.
- Add subtle cursor response only where it improves atmosphere and does not interfere with reading.
- Keep the hero particle field calm, readable, and visually subordinate to the hero copy.
- Give the hero a lighter mobile visual treatment than desktop while preserving the same content hierarchy.
- Keep the hero particle field's cursor response restrained and non-interactive.
- Defer section diagrams and project-specific visual compositions until there is a concrete content need for them.

### Acceptance Criteria

- Visuals enhance the site without blocking text comprehension.
- Mobile performance remains smooth.
- Reduced-motion users receive a calmer experience.
- The site does not resemble a generic WebGL demo or terminal portfolio.
- The project section communicates hierarchy through layout, not only order.

### Verification

- Run `pnpm build`.
- Test with reduced motion enabled.
- Test with WebGL unavailable or script disabled enough to confirm fallback content still works.
- Inspect mobile performance on a throttled or lower-power browser profile if possible.

## Phase 3.5 - Web Resume And Print Layout

### Objective

Add a web-first resume page that presents current experience clearly online and produces a useful two-page A4 document through the browser print dialog.

### Tasks

- Add a dedicated `/resume` route backed by structured fields in `content/pages/resume.md`.
- Use the 2020 resume as historical input and current repository content as the source for updated experience.
- Render a concise profile, work history, grouped skills, education, selected projects, and contact links.
- Add a keyboard-accessible print action that invokes `window.print()`.
- Add responsive screen styling using the existing Nyx design tokens and typography.
- Add print CSS targeting A4 portrait, hiding navigation, footer, action controls, and decorative chrome.
- Preserve readable links in print output and avoid splitting experience entries across pages where possible.
- Do not include a phone number or generate a downloadable PDF.

### Acceptance Criteria

- `/resume` renders from validated Nuxt Content data.
- The page is readable and responsive on desktop and mobile.
- The print action opens the browser print dialog.
- Print preview hides non-resume UI and produces a usable two-page A4 result.
- Resume content contains no unvalidated or invented claims and no phone number.
- Keyboard users can reach and activate the print action.
- The route has appropriate page metadata.

### Verification

- Run `pnpm build`.
- Run `pnpm generate`.
- Manually inspect the screen layout and print preview on desktop and mobile.
- Check link visibility, page breaks, keyboard activation, and output without relying on a checked-in PDF.

## Phase 4 - Project Index And Case Studies

### Objective

Turn projects from simple summaries into credible case studies and selected-work entries.

### Tasks

- Redesign `/projects` as a curated work index rather than a duplicate card grid.
- Add a dynamic `/projects/[slug]` route for case studies.
- Expand `content/projects/nyxkit.md` with category, role, status, links, technologies, and detailed narrative.
- Add Anthos content using the confirmed local-first plant monitoring, telemetry, node/server/dashboard, and NAS deployment facts.
- Add Nyx Notes content using the confirmed Markdown-first storage, Rust/Vue/Tauri/CLI, REST/SSE, comments, and Nyx Kit validation facts.
- Expand Audio Visualiser as an older creative coding experiment with clear era/status labeling.
- Decide where Video Projection Mapping belongs: project index, experiments section, or a smaller case study.
- Create a case study for Nyx Kit focused on component systems, theming, docs, testing, package architecture, and real app validation.
- Create a case study for Showreal focused on multi-screen interaction, touch-table control, wall display, and Node.js WebSocket communication.
- Create a sanitized Kiswe Studio case study focused on frontend architecture, live-production workflows, operational complexity, reliability, and reusable UI systems.
- Design professional-work visual slots now, but publish Kiswe Studio visuals only after user approval. The case-study layout must work without professional imagery if no asset is ready.
- Avoid professional-work metrics for now. Case-study outcomes should be qualitative unless explicitly approved later.
- Add next-project navigation.

### Acceptance Criteria

- `/projects` gives a clear overview of selected work and experiments.
- At least one detailed case study is complete before public launch.
- Confidential work is presented without leaking private information.
- Professional-work visuals are omitted or limited to user-approved assets.
- Older experiments are framed honestly as creative experiments, not current flagship products.
- Professional case-study outcomes avoid metrics and stay qualitative unless explicitly approved later.
- Project data is content-driven and validated by the Nuxt Content schema.

### Verification

- Run `pnpm build`.
- Check all project links and external references.
- Manually inspect case-study pages on desktop and mobile.
- Confirm every image or abstract visual has meaningful alt text or is correctly decorative.

## Phase 5 - Secondary Pages And Personal Narrative

### Objective

Bring `/about` and supporting pages up to the same quality as the homepage.

### Tasks

- Rewrite `/about` into a polished long-form narrative using the current markdown as the source.
- Preserve the personal details that make the page feel grounded: Belgium, frontend specialization, design/development overlap, product-mindedness, CSS/SCSS expertise, multimedia interest, music, gaming, art/tech, home automation, self-hosting, and Yuki/Shiro if still desired.
- Structure the About page around career journey, how Arne works, side projects, and beyond-code interests.
- Make `/about` visually distinct from the homepage while using the same design system.
- Add SEO metadata for the About page.
- Update `/projects` metadata and intro copy.
- Add route-level page titles and descriptions for primary routes.
- Add resume file handling if a public resume is included.

### Acceptance Criteria

- `/about` feels personal and credible without repeating the entire homepage.
- Secondary pages use the same navigation and footer.
- SEO metadata exists for primary pages.
- Resume and contact links are final or intentionally omitted.

### Verification

- Run `pnpm build`.
- Check page metadata in rendered output.
- Check mobile readability for long-form markdown content.

## Phase 6 - Accessibility, Performance, And Quality Pass

### Objective

Make the site reliable, accessible, fast enough, and maintainable before launch.

### Tasks

- Verify color contrast for all final text, labels, borders, and focus states.
- Ensure visible keyboard focus states for navigation, CTAs, project cards, menus, and links.
- Ensure semantic heading order on every page.
- Ensure animated visuals respect `prefers-reduced-motion`.
- Ensure the site works without WebGL.
- Lazy-load project media and non-critical visuals.
- Avoid animation that blocks reading or navigation.
- Check image sizing and Nuxt Image usage.
- Check hydration issues from browser-only APIs such as `window`, `document`, canvas, and WebGL.
- Make canvas/animation components client-only where needed.
- Confirm mobile menu behavior with keyboard and touch.
- Confirm no horizontal scrolling on small screens.
- Confirm `nyx-kit` components are used without overriding their accessibility, keyboard behavior, or predictable API contracts.
- Review content for invented claims, unsupported metrics, and confidential details.
- Add or update tests only where the stack already supports them or where later implementation introduces test tooling intentionally.

### Acceptance Criteria

- The site builds cleanly.
- The site is navigable by keyboard.
- Reduced-motion and no-WebGL paths are usable.
- Mobile pages are readable and stable.
- Content is truthful and publishable.
- The final result still feels distinct after accessibility and performance constraints are applied.

### Verification

- Run `pnpm build`.
- Run `pnpm generate` because static output is required for GitHub Pages deployment.
- Run `pnpm preview` for production preview.
- Run `pnpm exec eslint .` if linting remains scriptless.
- Use browser accessibility checks for contrast, labels, heading order, and focus.

## Phase 7 - GitHub Pages Deployment And Content Workflow

### Objective

Prepare the portfolio for static GitHub Pages deployment and future content edits.

### Tasks

- Verify `pnpm generate` produces a complete static site in `.output/public`.
- Add or verify a GitHub Actions workflow that installs dependencies with pnpm, runs `pnpm generate`, and publishes `.output/public` to GitHub Pages.
- Keep `pnpm run deploy:github` only as a manual fallback unless there is a reason to remove it.
- Ensure all public routes are prerendered, including `/`, `/about`, `/projects`, and every `/projects/[slug]` case-study route.
- Confirm Nuxt Studio expectations. GitHub Pages cannot provide server-side OAuth or runtime secrets, so Studio should be disabled, externalized, or treated as a local/content-authoring workflow rather than a hosted production feature.
- Check robots and sitemap strategy.
- Add redirects if `/work` or older project URLs need aliases.
- Validate external links: GitHub, LinkedIn, email, resume, Nyx Kit docs, Showreal, Kiswe references, and project demos.
- Decide whether `netlify.toml` should be removed, kept as historical context, or retained for secondary preview deployments.
- Document the future content editing workflow in the README after implementation.

### Acceptance Criteria

- GitHub Pages deployment settings are verified and documented.
- Static preview works before publishing.
- Content updates remain possible through markdown and/or Nuxt Studio.
- Public URLs and CTAs are final.
- Build output paths are aligned with GitHub Pages publishing.

### Verification

- Run `pnpm generate` locally.
- Run `pnpm preview` against the generated output if supported by the Nuxt setup.
- Validate the GitHub Actions GitHub Pages deployment before launch.

## Phase 8 - Post-Launch Enhancements

### Objective

Add polish and depth after the essential site is live.

### Candidate Enhancements

- Add a deeper creative experiments archive.
- Add more complete Nyx Kit component anatomy visuals.
- Add a writing/notes section if Arne wants to publish technical reflections.
- Add small interaction details to project diagrams.
- Add analytics only if useful and privacy-conscious.
- Add Open Graph images for key routes and case studies.
- Add a public changelog or now page if it fits the personal portfolio direction.
- Add more case studies as content becomes available.

### Acceptance Criteria

- Enhancements do not block initial launch.
- Enhancements preserve performance and accessibility.
- Each enhancement has a clear purpose beyond decoration.

## Suggested Implementation Order

1. Confirm content truth and public links.
2. Audit available `nyx-kit` primitives and decide what to use directly or wrap.
3. Implement final design tokens and global styles, aligned with `nyx-kit` conventions where practical.
4. Build nav, footer, section frame, labels, CTA, socials, and atmosphere layer, using `nyx-kit` for standard primitives where it fits.
5. Extend project content schema.
6. Rebuild homepage as a complete content skeleton.
7. Make homepage responsive and accessible without advanced animation.
8. Add visual depth, diagrams, and hero animation with fallbacks.
9. Build project index.
10. Build dynamic case-study route.
11. Write and wire Nyx Kit case study.
12. Add or expand supporting project content.
13. Rewrite About page.
14. Run accessibility, performance, SEO, and content truth pass.
15. Verify GitHub Pages deployment.
16. Launch.

## Content Priority Order

1. Hero and primary positioning.
2. Featured work summaries.
3. Experience timeline.
4. Expertise groups.
5. Contact and availability wording.
6. Nyx Kit case study.
7. About page rewrite.
8. Additional personal projects.
9. Sanitized professional case study.
10. Older experiments archive.

## Visual Priority Order

1. Final tokens and typography.
2. Strong layout grid and section rhythm.
3. Navigation and CTA states.
4. Project composition hierarchy.
5. Experience timeline and diagrams.
6. Grain/noise and subtle atmosphere.
7. Hero particle/signal background.
8. Case-study visual system.
9. Advanced micro-interactions.

## Technical Risks

### WebGL And SSR

Canvas and WebGL code can fail during SSR if browser APIs are accessed too early. Keep browser-only logic inside client-only components, mounted hooks, or guarded checks.

### Performance

The design prompt asks for thousands of particles and rich visuals. Treat this as a desktop enhancement, not a baseline requirement. Mobile should use a simpler shader, static canvas, CSS atmosphere, or image-based fallback.

### Content Truth

The design prompt includes strong opportunity-facing language, while current About content is more personal and not job-hunt oriented. Phase 0 resolves the stance as opportunity-ready but grounded; exact public wording still depends on contact, resume, and location details.

### Generated Design Drift

The generated HTML references Tailwind, fake mobile project names, and invented case-study metrics. Use its composition ideas only. Do not import its claims or technical stack.

### Deployment Output

GitHub Pages should publish generated static output, expected from `.output/public` when using `pnpm generate`. Verify the exact output path before launch rather than assuming the existing Netlify-oriented `dist` setting is correct.

### Schema Migration

Expanding the project schema can break existing markdown if defaults are not chosen carefully. Keep existing content valid during transition.

## Non-Goals

- Do not migrate to a new framework.
- Do not introduce Tailwind just because the generated design references it.
- Do not rebuild generic UI primitives locally when `nyx-kit` already provides a suitable component, composable, utility, or style primitive.
- Do not turn the site into a generic terminal or cyberpunk portfolio.
- Do not automatically showcase every GitHub repository.
- Do not publish private Kiswe screens or confidential workflows.
- Do not invent outcomes, client names, awards, testimonials, or metrics.
- Do not make animation more important than readability.
- Do not block launch on optional post-launch enhancements.

## Launch Definition

The portfolio is launch-ready when:

- The homepage communicates the full senior/frontend/product/creative-technologist positioning.
- The design system matches `docs/DESIGN.md` closely enough to feel final.
- The homepage, `/about`, `/projects`, and at least one case-study page work on desktop and mobile.
- The site remains usable with reduced motion and without WebGL.
- All CTAs and social links point to confirmed destinations.
- Content has been checked for truthfulness and confidentiality.
- `pnpm build` succeeds.
- GitHub Pages deployment settings are verified.

## Reference Summary

### Most Important Design Decisions

- Nocturnal technical aesthetic.
- Atmospheric minimalism.
- Deep void backgrounds with subtle grain.
- Cyan as active signal, violet as atmospheric support, amber as rare contrast.
- Playfair Display for editorial display moments.
- Inter for body/UI text.
- JetBrains Mono for technical metadata.
- 12-column desktop grid.
- Generous section spacing.
- Fine lines, translucent borders, restrained glows.

### Most Important Content Decisions

- Primary headline: `I give complex products a center of gravity.`
- Lead identity: senior software engineer and web architect.
- Core strengths: frontend architecture, product ownership, reusable systems, real-time media, interactive 3D, complex UX.
- Featured projects should be curated, not exhaustive.
- Nyx Kit is the flagship personal project.
- Audio Visualiser is the expressive older experiment.
- Kiswe Studio is the first professional-work feature/case-study target.
- Professional-work metrics should be avoided for now.
- Professional work should emphasize responsibility, architecture, reliability, and complexity without confidential details.
- Expertise should be capability-based, not logo-based or percentage-based.

### Most Important Implementation Decisions

- Keep Nuxt Content as the content backbone.
- Translate design tokens into SCSS/CSS variables.
- Use `nyx-kit` as the default source for reusable UI primitives, composables, utilities, and design-system conventions where it fits.
- Build portfolio-local components for editorial layouts, route/content integration, and custom visual systems that are not generic UI primitives.
- Build content and layout first, then advanced visuals.
- Use generated design files as visual reference only.
- Add WebGL/animation as progressive enhancement.
- Validate deployment output before launch.
