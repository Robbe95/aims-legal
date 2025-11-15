import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentArticlesIndexBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.cms,
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
  ],
  imageURL: '/blocks/preview-articles-overview.png',
  interfaceName: 'ArticlesIndexBlock',
  labels: {
    plural: 'Blogs Overview',
    singular: 'Blog Overview',
  },
  slug: 'article-index',
}
