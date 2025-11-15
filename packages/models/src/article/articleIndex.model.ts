import { z } from 'zod'

import { clientImageSchema } from '#image/image.model.ts'

export const clientArticleIndexSchema = z.object({
  id: z.string(),
  preview: z.object({
    title: z.string(),
    description: z.string().nullable(),
    image: clientImageSchema,
  }),
  slug: z.string(),
})

export type ClientArticleIndex = z.infer<typeof clientArticleIndexSchema>
