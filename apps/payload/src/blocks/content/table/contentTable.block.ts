import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getTableField } from '@payload/fields/table/table.field'
import type { Block } from 'payload'

export const contentTableBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    getTableField(),
  ],

  imageURL: '/blocks/preview-usps.png',
  interfaceName: 'TableBlock',
  labels: {
    plural: 'Tables',
    singular: 'Table',
  },
  slug: 'table',
}
