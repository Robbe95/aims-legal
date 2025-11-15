import { getNavLinksField } from '@payload/fields/nav/navLinks.field'
import type { GlobalConfig } from 'payload'

export const settingsFooterGlobal: GlobalConfig = {
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
  label: 'Footer',
  slug: 'settingsFooter',
}
