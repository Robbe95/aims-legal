import type { CollectionConfig } from 'payload'

export const settingsHubspotCollection: CollectionConfig = {
  fields: [
    {
      name: 'portalId',
      label: 'Portal ID',
      type: 'text',
    },
    {
      name: 'accessToken',
      label: 'Access Token',
      type: 'text',
    },
  ],
  labels: {
    plural: 'Hubspot',
    singular: 'Hubspot',
  },
  slug: 'settingsHubspot',
}
