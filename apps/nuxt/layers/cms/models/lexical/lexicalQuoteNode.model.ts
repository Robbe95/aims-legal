import { z } from 'zod'

import { lexicalTextNodeSchema } from './lexicalTextNode.model'

export const lexicalQuoteNodeSchema = z.object({
  format: z.enum([
    '',
    'center',
    'end',
    'justify',
    'left',
    'right',
    'start',
  ]).optional(),
  type: z.literal('quote'),
  children: lexicalTextNodeSchema.array(),
})

export type LexicalQuoteNode = z.infer<typeof lexicalQuoteNodeSchema>
