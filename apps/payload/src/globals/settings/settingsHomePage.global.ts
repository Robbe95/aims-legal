import { getLinkField } from '@payload/fields/link/link.field'
import type { GlobalConfig } from 'payload'

export const settingsHomePageGlobal: GlobalConfig = {
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
  label: 'Home Page',
  slug: 'settingsHomePage',
}
