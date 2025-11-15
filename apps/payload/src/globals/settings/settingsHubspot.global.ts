import type { GlobalConfig } from 'payload'

export const settingsHubspotGlobal: GlobalConfig = {
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
  slug: 'settingsHubspot',
}
