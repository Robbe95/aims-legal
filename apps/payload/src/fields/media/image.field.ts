import type { UploadField } from 'payload'

export interface GetImageFieldOptions {
  isRequired?: boolean
  name: string
  label: string
}

export function getImageField({
  isRequired,
  name,
  label,
}: GetImageFieldOptions): UploadField {
  return {
    name,
    label,
    relationTo: 'images',
    required: isRequired ?? true,
    type: 'upload',
  }
}
