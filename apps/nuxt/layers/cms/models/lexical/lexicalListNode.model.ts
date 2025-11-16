import { z } from 'zod'

import { lexicalLinebreakNodeSchema } from '~cms/models/lexical/lexicalLinebreak.model'

import { lexicalTextNodeSchema } from './lexicalTextNode.model'

export const lexicalListItemSchema = z.object({
  checked: z.boolean().optional(),
  type: z.literal('listitem'),
  children: lexicalTextNodeSchema.or(lexicalLinebreakNodeSchema).array(),
})

export const lexicalListNodeSchema = z.object({
  tag: z.enum([
    'ul',
    'ol',
  ]),
  type: z.literal('list'),
  children: lexicalListItemSchema.array(),
})

export type LexicalListItem = z.infer<typeof lexicalListItemSchema>
export type LexicalListNode = z.infer<typeof lexicalListNodeSchema>
