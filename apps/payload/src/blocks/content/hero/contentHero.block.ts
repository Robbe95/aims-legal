import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtasField } from '@payload/fields/cta/ctas.field'
import { getImageField } from '@payload/fields/media/image.field'
import type { Block } from 'payload'

export const contentHeroBlock: Block = {
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
    {
      name: 'variant',
      defaultValue: 'fullScreen',
      enumName: 'heroVariant',
      options: [
        {
          label: 'Full screen',
          value: 'fullScreen',
        },
        {
          label: 'Partial screen',
          value: 'partialScreen',
        },
      ],
      required: true,
      type: 'select',
    },
    getCtasField({
      name: 'ctas',
      label: 'CTAs',
      maxItems: 6,
      minItems: 0,
    }),
    getImageField({
      name: 'backgroundImage',
      label: 'Background image',
    }),
    {
      name: 'backgroundVideo',
      label: 'Youtube URL',
      type: 'text',
    },
  ],
  imageURL: '/blocks/preview-hero.png',
  interfaceName: 'HeroBlock',
  labels: {
    plural: 'Heros',
    singular: 'Hero',
  },
  slug: 'hero',
}
