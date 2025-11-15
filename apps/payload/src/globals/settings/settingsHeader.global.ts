import { getNavLinksField } from '@payload/fields/nav/navLinks.field'
import type { GlobalConfig } from 'payload'

export const settingsHeaderGlobal: GlobalConfig = {
  access: {
    read: () => true,
    readVersions: () => true,
  },
  fields: [
    getNavLinksField({
      isTranslatable: true,
      name: 'links',
      label: 'Header links',
    }),

  ],
  label: 'Header',
  slug: 'settingsHeader',
}
