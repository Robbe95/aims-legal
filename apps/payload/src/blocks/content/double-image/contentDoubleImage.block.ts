import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentDoubleImageBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'firstImage',
      relationTo: 'images',
      required: true,
      type: 'upload',
    },
    {
      name: 'secondImage',
      relationTo: 'images',
      required: true,
      type: 'upload',
    },
  ],
  imageURL: '/blocks/preview-side-by-side-image.png',
  interfaceName: 'DoubleImageBlock',
  labels: {
    plural: 'Side-by-side Images',
    singular: 'Side-by-side Images',
  },
  slug: 'double-image',
}
