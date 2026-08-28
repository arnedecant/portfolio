# Phase 3.5 Resume Page Design

Status: approved design
Date: 2026-08-28

## Purpose

Add an intermediate Phase 3.5 to the portfolio roadmap: a web-first resume page with reliable browser printing. The page should provide a concise, professional view of Arne's experience while fitting the existing Nyx design system and producing a useful two-page A4 printout.

## Content And Routing

Add a dedicated `/resume` route and a `content/pages/resume.md` source document. Resume facts should be structured rather than represented as one large prose body:

- Header: name, professional title, location, and contact links
- Summary: concise web-first professional profile
- Experience: period, company, role, and two to four responsibility or impact bullets per role
- Selected skills: grouped technical and professional capabilities
- Education and other relevant details from the 2020 resume, where still accurate
- Selected projects: compact links to relevant portfolio work

The 2020 resume at `https://github.com/arnedecant/portfolio-2020/blob/master/src/assets/resume_arne_decant.pdf` is historical input. Current repository content supersedes it for the updated narrative, especially the 2020-present Kiswe experience. Stale or uncertain facts must be omitted or confirmed rather than presented as current, and no facts may be invented.

## Web Layout

The page should be a focused editorial resume rather than a dashboard:

- Compact header with title, location, contact links, and a `Print resume` action
- Readable summary block with clear professional positioning
- Experience as a vertical timeline or stacked roles, prioritizing recent work
- Skills grouped by capability without an exhaustive keyword wall
- Selected projects as small linked entries into the portfolio
- Restrained closing contact area
- Existing Nyx design tokens, typography, navigation, and footer reused for consistency
- Responsive single-column layout on small screens with generous readable spacing

The page should be complete on its own but less atmospheric than the homepage so it remains scannable.

## Print Behavior

Printing is handled by CSS and the browser print dialog:

- `Print resume` invokes `window.print()`.
- `@media print` removes navigation, footer, atmospheric visuals, buttons, and other non-resume chrome.
- Print output targets A4 portrait and a concise maximum of two pages.
- Colors, borders, and essential accents remain readable in print.
- Links remain visible as useful text or URLs where appropriate.
- Experience entries avoid awkward splits with `break-inside: avoid`.
- Page breaks are controlled around major sections rather than left entirely to incidental wrapping.
- The page remains semantic and accessible in screen and print modes.
- No generated or checked-in PDF is added.

## Verification And Acceptance

Phase 3.5 is complete when:

- `/resume` renders from validated Nuxt Content data.
- The page is readable and responsive on desktop and mobile.
- The print action opens the browser print dialog.
- Print preview hides non-resume UI and produces a usable two-page A4 result.
- No unvalidated or invented content is published.
- Keyboard users can reach and activate the print action.
- The route has appropriate page metadata.
- `pnpm build` and `pnpm generate` pass.
- Manual checks cover screen layout, print preview, link visibility, page breaks, and reduced-motion/no-JavaScript behavior where applicable.

## Explicit Exclusions

This phase does not include a downloadable PDF, resume upload, CMS editing UI, or the broader About-page rewrite. Those remain separate concerns for later phases.
