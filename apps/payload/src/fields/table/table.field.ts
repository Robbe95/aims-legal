import { getImageField } from '@payload/fields/media/image.field'
import type { Field } from 'payload'

export function getTableField(): Field {
  return {
    name: 'table',
    fields: [
      {
        name: 'headers',
        fields: [
          {
            name: 'label',
            label: 'Header Label',
            required: true,
            type: 'text',
          },
          {
            name: 'key',
            admin: {
              description: 'Unique identifier for this column (e.g., name, email, phone)',
            },
            label: 'Header Key',
            required: true,
            type: 'text',
          },
        ],
        label: 'Table Headers',
        minRows: 1,
        required: true,
        type: 'array',
      },
      {
        name: 'rows',
        fields: [
          {
            name: 'cells',
            fields: [
              {
                name: 'value',
                label: 'Cell Value',
                type: 'text',
              },
              {
                name: 'key',
                admin: {
                  description: 'Must match a header key from above',
                },
                label: 'Column Key',
                required: true,
                type: 'text',
              },

            ],
            label: 'Row Data',
            type: 'array',
          },
          getImageField({
            isRequired: false,
            name: 'rowImage',
            label: 'Row Image',
          }),
        ],
        label: 'Table Rows',
        type: 'array',
      },
    ],
    label: 'Table',
    type: 'group',
  }
}
