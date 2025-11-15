import { getLinkField } from '@payload/fields/link/link.field'
import type {
  ArrayField,
  Field,
} from 'payload'

export function getBreadcrumbsField(): ArrayField {
  const fields: Field[] = [
    {
      name: 'label',
      localized: true,
      required: true,
      type: 'text',
    },

    getLinkField({
      isRequired: false,
      disableLabel: true,
    }),
  ]

  return {
    name: 'breadcrumbs',
    fields,
    interfaceName: 'BreadcrumbsField',
    type: 'array',
  }
}
