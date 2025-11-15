import { z } from 'zod'

import { clientImageSchema } from '#image/image.model.ts'

export const clientSeoSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: clientImageSchema.nullable(),
}).nullable()

export type ClientSeo = z.infer<typeof clientSeoSchema>
