import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtasField } from '@payload/fields/cta/ctas.field'
import type { Block } from 'payload'

export const contentColumnMultipleTextBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'texts',
      fields: [
        {
          name: 'subtitle',
          required: true,
          type: 'text',
        },
        {
          name: 'text',
          required: true,
          type: 'textarea',
        },
      ],
      required: true,
      type: 'array',
    },
    getCtasField({
      name: 'ctas',
      label: 'CTAs',
      maxItems: 2,
      minItems: 0,
    }),
  ],
  interfaceName: 'ColumnMultipleTextBlock',
  labels: {
    plural: 'Column texts',
    singular: 'Column texts',
  },
  slug: 'columnMultipleText',
}
