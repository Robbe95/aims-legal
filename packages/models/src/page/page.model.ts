import { z } from 'zod'

export const pageSchema = z.object({
  name: z.string(),
  icon: z.string(),
  url: z.string().nullable(),
})

export type Page = z.infer<typeof pageSchema>
