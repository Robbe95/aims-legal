import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentUspsBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'variant',
      defaultValue: 'gray',
      enumName: 'uspsVariant',
      options: [
        {
          label: 'Gray',
          value: 'gray',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'usps',
      fields: [
        {
          name: 'title',
          label: 'Title',
          required: true,
          type: 'text',
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          required: true,
          type: 'textarea',
        },
      ],
      label: 'USPs',
      required: true,
      type: 'array',
    },
  ],
  imageURL: '/blocks/preview-usps.png',
  interfaceName: 'UspsBlock',
  labels: {
    plural: 'USPs',
    singular: 'USPs',
  },
  slug: 'usps',
}
