import { getNavLinksField } from '@payload/fields/nav/navLinks.field'
import type { CollectionConfig } from 'payload'

export const settingsFooterCollection: CollectionConfig = {
  access: {
    read: () => true,
    readVersions: () => true,
  },
  fields: [
    getNavLinksField({
      isTranslatable: true,
      name: 'links',
      label: 'Footer links',
    }),

  ],
  labels: {
    plural: 'Footers',
    singular: 'Footer',
  },
  slug: 'settingsFooter',
}
