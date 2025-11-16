import { z } from 'zod'

export const lexicalHorizontalRuleNodeSchema = z.object({
  type: z.literal('horizontalrule'),
})

export type LexicalHorizontalRuleNode = z.infer<typeof lexicalHorizontalRuleNodeSchema>
