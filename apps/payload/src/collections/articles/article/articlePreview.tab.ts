import type { Tab } from 'payload'

export const articlePreviewTab: Tab = {
  name: 'preview',
  fields: [
    {
      name: 'title',
      localized: true,
      required: true,
      type: 'text',
    },
    {
      name: 'description',
      localized: true,
      type: 'textarea',
    },
    {
      name: 'image',
      relationTo: 'images',
      required: true,
      type: 'upload',
    },
  ],
  label: 'Preview',
}
