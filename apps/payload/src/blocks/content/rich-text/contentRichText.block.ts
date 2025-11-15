import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentRichTextBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'richtext',
      required: true,
      type: 'richText',
    },
  ],
  imageURL: '/blocks/preview-text.png',
  interfaceName: 'RichTextBlock',
  labels: {
    plural: 'Rich texts',
    singular: 'Rich text',
  },
  slug: 'rich-text',
}
