import type { CollectionConfig } from 'payload'

export const formHubspotCollection: CollectionConfig = {
  admin: {
    useAsTitle: 'title',
  },
  enableQueryPresets: true,
  fields: [
    {
      name: 'title',
      localized: true,
      required: true,
      type: 'text',
    },
    {
      name: 'formId',
      localized: true,
      required: true,
      type: 'text',
    },
  ],
  slug: 'form-hubspot',
  trash: true,
}
