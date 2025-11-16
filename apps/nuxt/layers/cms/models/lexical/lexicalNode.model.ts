import { z } from 'zod'

import { lexicalHorizontalRuleNodeSchema } from '~cms/models/lexical/lexicalHorizontalRuleNode.model'

import { lexicalHeadingNodeSchema } from './lexicalHeadingNode.model'
import { lexicalLinkNodeSchema } from './lexicalLinkNode.model'
import { lexicalListNodeSchema } from './lexicalListNode.model'
import { lexicalParagraphNodeSchema } from './lexicalParagraphNode.model'
import { lexicalQuoteNodeSchema } from './lexicalQuoteNode.model'
import { lexicalUploadNodeSchema } from './lexicalUploadNode.model'

export const lexicalNodeSchema = z.union([
  lexicalParagraphNodeSchema,
  lexicalLinkNodeSchema,
  lexicalListNodeSchema,
  lexicalUploadNodeSchema,
  lexicalHeadingNodeSchema,
  lexicalQuoteNodeSchema,
  lexicalHorizontalRuleNodeSchema,
])

export type LexicalNode = z.infer<typeof lexicalNodeSchema>
