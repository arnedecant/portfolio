// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const image = z.object({
  src: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        eyebrow: z.string().optional(),
        seoDescription: z.string().optional(),
      }),
    }),

    projects: defineCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        summary: z.string().optional(),
        tech: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        github: z.string().optional(),
        link: z.string().optional(),
        order: z.number().int().default(0),
        thumbnail: image.optional(),
        logo: image.optional(),
      }),
    }),
  },
})

