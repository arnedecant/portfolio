# About Page Editorial Narrative Design

## Status

Approved design

## Goal

Turn `/about` from a bare Nuxt Content render into a personal, credible, editorial page that explains Arne's career path, working principles, creative interests, and life beyond code. The page should feel like a considered companion to the homepage, not a resume duplicate or a generic developer profile.

## Content And Truthfulness

- Keep the current About markdown as the factual source and tighten its prose for clarity, rhythm, and stronger transitions.
- Preserve the confirmed facts: Belgium, 10+ years of experience, frontend specialization, CSS/SCSS strength, the RIS/Nanopixel/Kiswe timeline, Showreal, live-stream production work, design/development overlap, product-mindedness, side projects, music, gaming, art/tech, home automation/self-hosting interests, and Yuki and Shiro.
- Use public company research only for broad context: Nanopixel's work across immersive spaces, CGI, and real-time technology, and Kiswe's work across cloud production, livestream distribution, and interactive fan experiences.
- Do not add unsupported responsibilities, outcomes, customer names, metrics, awards, confidential product details, or claims about current company projects beyond the supplied source.
- Do not add a dedicated About CTA. The shared site navigation and footer remain the page's available navigation/contact paths.

## Content Model

Extend the `pages` collection schema with an optional `portrait` object containing:

- `src`: image path or URL
- `alt`: meaningful alternative text
- `caption`: optional visible caption

Add a placeholder SVG at `public/images/about-placeholder.svg` and reference it from the About frontmatter initially. The page must render the portrait block only when `portrait` exists in frontmatter. Removing that object must remove the entire visual slot without leaving an empty frame.

## Page Composition

`pages/about.vue` will own the page-specific composition while Nuxt Content continues to own the editable prose. The rendered structure is:

1. Editorial masthead with a technical eyebrow, `About Me` title, introductory profile, and optional portrait.
2. Career journey presented as a vertical timeline with period, company, role, and prose for RIS, Nanopixel, and Kiswe.
3. Working principles presented as an asymmetric numbered list with short supporting paragraphs, not a repeated card grid.
4. Side projects and creative experiments with direct links and concise descriptions.
5. Beyond-code interests and a quiet closing statement.

Desktop uses a 12-column asymmetric grid with generous section gaps. The reading measure stays near 72ch, while timeline metadata and portrait occupy supporting columns. Mobile becomes one readable column with the same content order and no horizontal overflow.

## Visual Direction

- Use the established Nyx nocturnal technical system: Playfair Display for editorial headings, Inter for body copy, JetBrains Mono for metadata, near-black surfaces, cyan signal accents, violet atmosphere, and fine structural rules.
- Make the About page visually distinct through long-form rhythm, timeline conductors, and editorial alignment rather than new global primitives or decorative gradients.
- Keep the portrait frame rectilinear and restrained. The placeholder should communicate that imagery is optional without pretending to be a real portrait.
- Use subtle reveal/hover treatment only where it improves orientation, and preserve full readability with reduced motion.
- Maintain visible keyboard focus and sufficient contrast for all links.

## SEO And Accessibility

- Set page title and description from the About content metadata using `useSeoMeta`.
- Keep a single `h1` and ordered heading hierarchy.
- Use semantic `main`, `article`, `section`, `figure`, `figcaption`, and lists where appropriate.
- Give a configured portrait meaningful `alt` text; mark purely decorative placeholder treatment appropriately only if its frontmatter alt is intentionally empty.
- Ensure links expose their destination through text and external links use safe target/rel behavior where applicable.

## Verification

- Run ESLint against the changed Vue, TypeScript, and markdown/schema files.
- Run `pnpm build` and `pnpm generate` to verify SSR and static output.
- Confirm `/about` renders with the placeholder portrait, and that removing the portrait frontmatter conditionally removes the portrait block.
- Check desktop and mobile layout, heading order, keyboard focus, link destinations, reduced-motion behavior, and absence of horizontal scrolling.

## Scope

This change is limited to the About page, its content schema/frontmatter, the placeholder asset, and page-local styling. It does not redesign the shared navigation/footer, alter homepage content, or add a resume/contact CTA.
