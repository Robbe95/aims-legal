import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentArticlesCarouselBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.cms,
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      hasMany: true,
      name: 'articles',
      relationTo: 'articles',
      required: true,
      type: 'relationship',
    },
  ],
  imageURL: '/blocks/preview-articles-carousel.png',
  interfaceName: 'ArticlesCarouselBlock',
  labels: {
    plural: 'Blog Carousels',
    singular: 'Blog Carousel',
  },
  slug: 'articles-carousel',
}
