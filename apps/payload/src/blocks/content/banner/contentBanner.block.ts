import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getCtasField } from '@payload/fields/cta/ctas.field'
import type { Block } from 'payload'

export const contentBannerBlock: Block = {
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
      type: 'text',
    },
    getCtasField({
      name: 'ctas',
      label: 'CTAs',
      maxItems: 2,
      minItems: 0,
    }),
  ],
  imageURL: '/blocks/preview-banner.png',
  interfaceName: 'BannerBlock',
  labels: {
    plural: 'Banners',
    singular: 'Banner',
  },
  slug: 'banner',
}
