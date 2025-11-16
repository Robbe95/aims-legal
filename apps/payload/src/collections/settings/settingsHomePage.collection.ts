import { getLinkField } from '@payload/fields/link/link.field'
import type { CollectionConfig } from 'payload'

export const settingsHomePageCollection: CollectionConfig = {
  access: {
    read: () => true,
    readVersions: () => true,
  },
  fields: [
    getLinkField({
      isRequired: true,
      isTranslatable: true,
      name: 'homePage',
      canBeExternal: false,
    }),
  ],
  labels: {
    plural: 'Home Pages',
    singular: 'Home Page',
  },
  slug: 'settingsHomePage',
}
