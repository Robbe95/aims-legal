import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtasField } from '@payload/fields/cta/ctas.field'
import type { Block } from 'payload'

export const contentImageTextBlock: Block = {
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
      name: 'subtitle',
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

    getCtasField({
      name: 'ctas',
      label: 'CTAs',
    }),
    {
      name: 'image',
      relationTo: 'images',
      required: true,
      type: 'upload',
    },
    {
      name: 'variant',
      defaultValue: 'imageLeftSmall',
      enumName: 'imageTextVariant',
      options: [
        {
          label: 'Image left (small)',
          value: 'imageLeftSmall',
        },
        {
          label: 'Image right (small)',
          value: 'imageRightSmall',
        },

        {
          label: 'Image left (big)',
          value: 'imageLeftBig',
        },
        {
          label: 'Full image',
          value: 'fullImage',
        },
      ],
      required: true,
      type: 'select',
    },
  ],

  imageURL: '/blocks/preview-image-and-content.png',
  interfaceName: 'ImageTextBlock',
  labels: {
    plural: 'Image and content',
    singular: 'Image and content',
  },
  slug: 'image-text',
}
