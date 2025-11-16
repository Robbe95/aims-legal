import { z } from 'zod'

export const lexicalLinebreakNodeSchema = z.object({
  type: z.literal('linebreak'),
})

export type LexicalLinebreakNode = z.infer<typeof lexicalLinebreakNodeSchema>
