import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtaField } from '@payload/fields/cta/cta.field'
import { getLinkField } from '@payload/fields/link/link.field'
import type { Block } from 'payload'

export const contentCarouselBlock: Block = {
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
      condition: (_, __, ctx) => {
        return ctx.blockData.variant !== 'big'
      },
      label: 'CTA',

    }),

    {
      name: 'variant',
      defaultValue: 'small',
      enumName: 'carouselVariant',
      options: [
        {
          label: 'Big',
          value: 'big',
        },
        {
          label: 'Small',
          value: 'small',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'items',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          hasMany: true,
          name: 'tags',
          admin: {
            condition: (_, __, ctx) => {
              return ctx.blockData.variant !== 'big'
            },
          },
          label: 'Tags',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Image',
          relationTo: 'images',
          required: true,
          type: 'upload',
        },
        getLinkField({
          isRequired: false,
          name: 'link',
        }),
      ],
      label: 'Items',
      required: true,
      type: 'array',
    },
  ],
  imageURL: '/blocks/preview-carousel.png',
  interfaceName: 'CarouselBlock',
  labels: {
    plural: 'Carousels',
    singular: 'Carousel',
  },
  slug: 'carousel',
}
