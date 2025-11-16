import type { CollectionConfig } from 'payload'

export const DEFAULT_COLLECTIONS_SETTINGS: Partial<CollectionConfig> = {
  access: {
    read: () => true,
  },
  enableQueryPresets: true,
  folders: true,
  trash: true,
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50, // Max versions saved per document
  },
} as const
