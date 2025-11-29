// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

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
        order: z.number().int().default(0),
        image: z
          .object({
            src: z.string().optional(),
            alt: z.string().optional(),
          })
          .optional(),
      }),
    }),
  },
})

