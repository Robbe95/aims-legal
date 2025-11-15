import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtasField } from '@payload/fields/cta/ctas.field'
import type { Block } from 'payload'

export const contentColumnTextCtaBlock: Block = {
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
      required: true,
      type: 'textarea',
    },
    getCtasField({
      name: 'ctas',
      label: 'CTAs',
      maxItems: 2,
      minItems: 0,
    }),
  ],
  interfaceName: 'ColumnTextCtaBlock',
  labels: {
    plural: 'Column text CTA',
    singular: 'Column text Ctas',
  },
  slug: 'columnTextCta',
}
