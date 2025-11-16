import type { CollectionConfig } from 'payload'

export const settingsSocialsCollection: CollectionConfig = {
  access: {
    read: () => true,
    readVersions: () => true,
  },
  fields: [
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'text',
    },
    {
      name: 'youtube',
      label: 'YouTube',
      type: 'text',
    },
    {
      name: 'pinterest',
      label: 'Pinterest',
      type: 'text',
    },
    {
      name: 'tiktok',
      label: 'TikTok',
      type: 'text',
    },
  ],
  labels: {
    plural: 'Socials',
    singular: 'Socials',
  },
  slug: 'settingsSocials',
}
