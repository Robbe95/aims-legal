import { articlePreviewTab } from '@payload/collections/articles/article/articlePreview.tab'
import { articleSeoTab } from '@payload/collections/articles/article/articleSeo.tab'
import { articleStructureTab } from '@payload/collections/articles/article/articleStructure.tab'
import { DEFAULT_COLLECTIONS_SETTINGS } from '@payload/collections/defaults'
import { getEnv } from '@payload/env'
import { getSlugField } from '@payload/fields/slug/slug.field'
import type { CollectionConfig } from 'payload'

export const articleCollection: CollectionConfig = {
  ...DEFAULT_COLLECTIONS_SETTINGS,
  admin: {
    defaultColumns: [
      'title',
      'slug',
      'blocks',
      'subsite',
      'status',
    ],
    listSearchableFields: [
      'title',
      'slug',
    ],
    livePreview: {
      url: ({
        data, locale,
      }) => {
        const env = getEnv()

        if (!data?.subsite || !data?.slug) {
          return `${env.SITE_BASE_URL}/${locale}`
        }

        return `${env.SITE_BASE_URL}/${locale}/articles/${data?.slug}`
      },
    },
    useAsTitle: 'title',

  },
  fields: [
    {
      name: 'title',
      admin: {
        position: 'sidebar',
      },
      localized: true,
      required: true,
      type: 'text',
    },
    ...getSlugField(),
    {
      tabs: [
        articlePreviewTab,
        articleStructureTab,
        articleSeoTab,
      ],
      type: 'tabs',
    },
  ],
  labels: {
    plural: 'Articles',
    singular: 'Article',
  },
  slug: 'articles',
}
