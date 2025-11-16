import { getNavLinksField } from '@payload/fields/nav/navLinks.field'
import type { CollectionConfig } from 'payload'

export const settingsHeaderCollection: CollectionConfig = {
  access: {
    read: () => true,
    readVersions: () => true,
  },
  fields: [
    getNavLinksField({
      hasDropdownLinks: true,
      isTranslatable: true,
      name: 'links',
      label: 'Header links',
    }),

  ],
  labels: {
    plural: 'Headers',
    singular: 'Header',
  },
  slug: 'settingsHeader',
}
