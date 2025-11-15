import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtaField } from '@payload/fields/cta/cta.field'
import { getLinkField } from '@payload/fields/link/link.field'
import { getImageField } from '@payload/fields/media/image.field'
import type { Block } from 'payload'

export const contentCardListBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    getCtaField({
      name: 'cta',
      label: 'CTA',

    }),
    {
      name: 'cards',
      fields: [
        {
          name: 'title',
          label: 'Title',
          required: true,
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          hasMany: true,
          name: 'tags',
          label: 'Tags',
          type: 'text',
        },
        getImageField({
          name: 'image',
          label: 'Image',
        }),
        getLinkField({
          isRequired: false,
          name: 'link',
          disableLabel: true,
        }),

      ],
      label: 'Cards',
      required: true,
      type: 'array',
    },
  ],

  imageURL: '/blocks/preview-usps.png',
  interfaceName: 'CardListBlock',
  labels: {
    plural: 'Card lists',
    singular: 'Card list',
  },
  slug: 'card-list',
}
