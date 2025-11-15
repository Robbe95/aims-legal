import { CTA_EVENTS } from '@payload/fields/cta/cta.field'
import { getLinkField } from '@payload/fields/link/link.field'
import type {
  Field,
  GroupField,
} from 'payload'

export interface GetNavLinkFieldOptions {
  hasDropdownLinks?: boolean
  isTranslatable?: boolean
  name: string
  label: GroupField['label']
}

export function getNavLinkField({
  hasDropdownLinks = false,
  isTranslatable = false,
  name,
  label,
}: GetNavLinkFieldOptions): GroupField {
  const fields: Field[] = [
    {
      name: 'label',
      localized: isTranslatable,
      required: true,
      type: 'text',
    },
    {
      name: 'navType',
      defaultValue: 'link',
      enumName: 'nav_link_type',
      label: 'Type',
      options: [
        {
          label: 'Link',
          value: 'link',
        },
        {
          label: 'Event',
          value: 'event',
        },
        {
          label: 'Dropdown',
          value: 'dropdown',
        },
      ],
      required: true,
      type: 'select',
    },
    getLinkField({
      isTranslatable,
      disableLabel: true,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData?.navType === 'link',
        },
      },
    }),
    {
      name: 'event',
      admin: {
        condition: (_, siblingData) => siblingData?.navType === 'event',
      },
      defaultValue: 'some_form',
      enumName: 'cta_event',
      options: CTA_EVENTS,
      required: true,
      type: 'select',
    },
    {
      name: 'links',
      admin: {
        condition: (_, siblingData) => siblingData?.navType === 'dropdown',
      },
      fields: [
        {
          name: 'label',
          label: 'Label',
          localized: isTranslatable,
          required: true,
          type: 'text',
        },
        getLinkField({
          hasDropdownCategories: hasDropdownLinks,
          isTranslatable,
          name: 'link',
          disableLabel: true,
        }),
      ],
      label: 'Links',
      required: true,
      type: 'array',

    },
  ]

  return {
    name,
    fields,
    label,
    type: 'group',
  }
}
