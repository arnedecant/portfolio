# Living Signal Maps Design

## Context

The portfolio's Phase 3 visual-depth work already includes a responsive canvas particle field in the hero and a CSS atmosphere layer. The next slice should extend that visual language into the page content without making the diagrams necessary for understanding the site or introducing another heavy rendering system.

The homepage currently has a selected-work section and an experience section, but no separate positioning section. The design must therefore strengthen those existing sections without inventing a new content concept or unsupported copy.

## Goals

- Extend the hero's calm signal language into the work and experience sections.
- Make the visual treatment reusable and section-aware rather than duplicating markup.
- Preserve readability, static rendering, responsive behavior, and reduced-motion support.
- Keep the diagrams decorative and subordinate to the written content.
- Remove the project-card animation loop that currently runs continuously without lifecycle cleanup.

## Non-Goals

- Adding new project case-study content.
- Replacing the hero particle field.
- Building WebGL or another canvas renderer for section diagrams.
- Completing the full Phase 3 project-visual composition work.
- Creating a new homepage positioning section.

## Design

### SignalDiagram Component

Create a reusable `SignalDiagram` Vue component that renders an inline SVG. It accepts a small variant prop for section-specific composition, such as `work` and `experience`, while sharing the same visual grammar:

- A thin routed signal line.
- A small set of anchor nodes.
- Muted technical labels.
- A restrained scanning pulse.

The variants should change route geometry and labels only enough to give each section a distinct rhythm. The component should not own business content or navigation behavior.

### Placement

- Add a work-oriented diagram to the selected-work section as a supporting visual around the project introduction or project collection.
- Add an experience-oriented diagram to the experience section near the timeline.
- Do not add a separate positioning section. The work diagram provides the visual treatment for the existing section's positioning copy.

The diagrams should sit beside or beneath the relevant content depending on viewport width. They must not push the primary heading or project content below an excessive amount of decorative space.

### Visual Language

- Use existing CSS custom properties for cyan, violet, amber, borders, and muted text.
- Keep line weights fine and opacity restrained.
- Use CSS transforms and opacity for the scanning pulse only.
- Avoid gradients, large decorative panels, and additional card wrappers.
- Keep the SVG intrinsic structure accessible to layout but hidden from assistive technology with `aria-hidden="true"`.

### Motion and Fallbacks

The SVG is present in the server-rendered markup and remains visible without JavaScript. Under `prefers-reduced-motion: reduce`, the scan freezes and the route remains legible as a static diagram. The animation must not alter layout or interfere with pointer input.

### Project Card Cleanup

While integrating the shared visual layer, remove the continuously scheduled `requestAnimationFrame` loop from `ProjectSummary.vue`. Preserve the existing pointer-driven decoration where practical, but ensure any scheduled work is bounded or cleaned up when the component unmounts. This is a focused lifecycle fix supporting Phase 3 performance goals, not a redesign of project cards.

## Verification

- Run `pnpm build` and confirm all prerendered routes still generate.
- Inspect the homepage at desktop and mobile widths.
- Enable reduced motion and confirm diagrams remain visible but static.
- Disable JavaScript or otherwise confirm the SVG diagrams and section content remain present.
- Confirm diagrams do not introduce horizontal overflow or capture pointer input.
- Confirm project-card animation work stops when cards leave the page.

## Completion Criteria

- A reusable signal-diagram component is used by both the work and experience sections.
- The two sections have visibly related but non-identical signal routes.
- Motion is restrained and disabled under reduced-motion preferences.
- The page remains understandable with diagrams hidden or static.
- The project-card animation loop has no unbounded lifecycle leak.
- Build and responsive checks pass.
