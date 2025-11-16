import { pageSeoTab } from '@payload/collections/pages/page/pageSeo.tab'
import { pageStructureTab } from '@payload/collections/pages/page/pageStructure.tab'
// import { pageStructureTab } from '@payload/collections/pages/page/pageStructure.tab'
import { getEnv } from '@payload/env'
import { getBreadcrumbsField } from '@payload/fields/breadcrumbs/breadcrumbs.field'
import { getSlugField } from '@payload/fields/slug/slug.field'
import type { CollectionConfig } from 'payload'

export const pageCollection: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: [
      'title',
      'slug',
      'blocks',
      'subsite',
      'translatedLanguages',
    ],
    listSearchableFields: [
      'title',
      'slug',
      'fullTitle',
    ],
    livePreview: {
      url: ({
        data, locale,
      }) => {
        const env = getEnv()

        return `${env.SITE_BASE_URL}/${locale}/${data.slug}`
      },
    },
    useAsTitle: 'title',
  },
  enableQueryPresets: true,
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
    getBreadcrumbsField(),
    {
      tabs: [
        pageStructureTab,
        pageSeoTab,
      ],
      type: 'tabs',
    },
    {
      name: 'translatedLanguages',
      admin: {
        components: {
          Cell: '@payload/components/cells/TranslatedCell.tsx#TranslatedLanguagesCell',
        },
      },
      type: 'ui',
    },
  ],
  slug: 'pages',
  trash: true,
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50, // Max versions saved per document
  },
}
