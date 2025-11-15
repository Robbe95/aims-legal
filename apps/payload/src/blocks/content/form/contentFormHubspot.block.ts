import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import type { Block } from 'payload'

export const contentHubspotFormBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.form,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      required: true,
      type: 'text',
    },
    {
      name: 'hubspotForm',
      relationTo: 'form-hubspot',
      required: true,
      type: 'relationship',
    },
    {
      name: 'image',
      relationTo: 'images',
      type: 'upload',
    },
  ],
  imageURL: '/blocks/preview-form.png',
  interfaceName: 'HubspotFormBlock',
  labels: {
    plural: 'Hubspot forms',
    singular: 'Hubspot form',
  },
  slug: 'hubspot-form',
}
