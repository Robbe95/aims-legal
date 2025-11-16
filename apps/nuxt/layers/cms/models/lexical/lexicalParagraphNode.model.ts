import { z } from 'zod'

import { lexicalLinebreakNodeSchema } from './lexicalLinebreak.model'
import { lexicalLinkNodeSchema } from './lexicalLinkNode.model'
import { lexicalTextNodeSchema } from './lexicalTextNode.model'

export const lexicalParagraphNodeSchema = z.object({
  format: z.enum([
    '',
    'center',
    'end',
    'justify',
    'left',
    'right',
    'start',
  ]).optional(),
  type: z.literal('paragraph'),
  children: z.union([
    lexicalLinkNodeSchema,
    lexicalTextNodeSchema,
    lexicalLinebreakNodeSchema,
  ]).array(),

})

export type LexicalParagraphNode = z.infer<typeof lexicalParagraphNodeSchema>
