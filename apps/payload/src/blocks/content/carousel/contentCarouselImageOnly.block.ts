import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentCarouselImageOnlyBlock: Block = {
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
      hasMany: true,
      name: 'image',
      label: 'Image',
      relationTo: 'images',
      required: true,
      type: 'upload',
    },

  ],
  imageURL: '/blocks/preview-carousel.png',
  interfaceName: 'CarouselImageOnlyBlock',
  labels: {
    plural: 'Carousels (Image Only)',
    singular: 'Carousel (Image Only)',
  },
  slug: 'carousel-image-only',
}
