import type { Article } from '@repo/payload-types'
import { z } from 'zod'

import { clientImageSchema } from '#image/image.model.ts'
import { clientSeoSchema } from '#seo/seo.model.ts'
import { clientSubsiteIndexSchema } from '#subsite/subsite.model.ts'

export const articleBlockSchema = z.custom<NonNullable<Article['blocks']>>((val) => {
  if (!Array.isArray(val)) {
    return false
  }
  const hasBlockNames = val.every((block) => {
    if (block.blockType == null) {
      return false
    }

    return true
  })

  if (!hasBlockNames) {
    return false
  }

  return true
}, {
  message: 'Blocks are invalid',
})

export const clientArticleDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  blocks: articleBlockSchema,
  preview: z.object({
    title: z.string(),
    description: z.string().nullable(),
    image: clientImageSchema,
  }),
  seo: clientSeoSchema,
  slug: z.string(),
  subsite: clientSubsiteIndexSchema,
})

export type ClientArticleDetail = z.infer<typeof clientArticleDetailSchema>
