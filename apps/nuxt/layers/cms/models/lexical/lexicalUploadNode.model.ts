import type { Image } from '@repo/payload-types'
import { z } from 'zod'

export const lexicalUploadNodeSchema = z.object({
  id: z.string(),
  format: z.enum([
    '',
    'center',
    'end',
    'justify',
    'left',
    'right',
    'start',
  ]).optional(),
  relationTo: z.literal('images'),
  type: z.literal('upload'),
  value: z.any().transform((value) => value as Image),
})

export type LexicalUploadNode = z.infer<typeof lexicalUploadNodeSchema>
