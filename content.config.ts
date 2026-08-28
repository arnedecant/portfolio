// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const image = z.object({
  src: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
})

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
      }),
    }),

    projects: defineCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        summary: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        role: z.string().optional(),
        timeline: z.string().optional(),
        status: z.string().optional(),
        featureWeight: z.number().int().optional(),
        confidential: z.boolean().default(false),
        era: z.string().optional(),
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
