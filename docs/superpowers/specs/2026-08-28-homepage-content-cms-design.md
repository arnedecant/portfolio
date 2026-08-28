# Homepage Content CMS Migration

## Goal

Move the homepage's existing editable copy and repeated content data from
`pages/index.vue` into the existing `content/pages/home.md` document so Nuxt
Studio can manage it. The current Vue presentation structure and styling stay
unchanged.

## Design

Extend the `pages` collection schema with typed optional fields for the
homepage content:

- Hero label, title, lede, metadata, and action labels
- Work section label, title, lede, and browse-link label
- Experience intro and ordered experience entries
- Expertise section title and ordered expertise groups with item lists
- About preview title, copy, and link label
- Contact title, copy, action labels, and location text

Store these values in the frontmatter of `content/pages/home.md`. Keep the
Markdown body available for any existing page content, but do not introduce a
generic section builder or move layout markup into Markdown.

Update `pages/index.vue` to query the home page collection and render the
validated values. Existing routes, components, CSS classes, links, project
queries, and `app.config.ts` social configuration remain unchanged unless
needed to replace duplicated homepage copy.

## Data Flow

`content/pages/home.md` -> Nuxt Content schema -> `pages/index.vue` -> existing
homepage components and markup.

Nuxt Studio continues to edit and commit the Markdown file. Static generation
continues to render the resulting content through the existing GitHub Pages
pipeline.

## Error Handling

Use the project's existing defensive access pattern. Optional homepage fields
should render empty content or retain safe defaults rather than causing a
runtime error. Required values needed to identify the page remain required by
the existing schema.

## Verification

- Run the project's type/build validation if available.
- Run `pnpm generate` to verify the Markdown schema, route query, and static
  rendering work together.
- Confirm no unrelated layout or configuration changes are introduced.
