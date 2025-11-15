import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentTextBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'text',
      required: false,
      type: 'textarea',
    },
    {
      name: 'richtext',
      required: false,
      type: 'richText',
    },

  ],
  imageURL: '/blocks/preview-text.png',
  interfaceName: 'TextBlock',
  labels: {
    plural: 'Texts',
    singular: 'Text',
  },
  slug: 'text',
}
