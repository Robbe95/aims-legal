/* eslint-disable unicorn/no-keyword-prefix */
import { z } from 'zod'

import { lexicalTextNodeSchema } from './lexicalTextNode.model'

export const lexicalCustomLink = z.object({
  linkType: z.literal('custom'),
  newTab: z.boolean(),
  url: z.string(),
})

export const lexicalInternalLink = z.object({
  doc: z.object({
    relationTo: z.enum([
      'cases',
      'pages',
    ]),
    value: z.object({
      id: z.number(),
      title: z.string(),
      slug: z.string(),
    }),
  }),
  linkType: z.literal('internal'),
  newTab: z.boolean(),
})

export const lexicalLinkNodeSchema = z.object({
  id: z.string(),
  fields: z.union([
    lexicalCustomLink,
    lexicalInternalLink,
  ]),
  type: z.literal('link'),
  children: lexicalTextNodeSchema.array(),
})

export type LexicalLinkNode = z.infer<typeof lexicalLinkNodeSchema>
