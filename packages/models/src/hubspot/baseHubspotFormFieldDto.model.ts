import { z } from 'zod'

export const baseHubspotFormFieldDtoSchema = z.object({
  objectTypeId: z.string(),
  name: z.string(),
  fieldType: z.string(),
  hidden: z.boolean(),
  label: z.string(),
  required: z.boolean(),
})

export const baseHubspotFormFieldOptionDtoSchema = z.object({
  description: z.string(),
  displayOrder: z.number(),
  label: z.string(),
  value: z.string(),
})
export type BaseHubspotFormFieldDto = z.infer<typeof baseHubspotFormFieldDtoSchema>
export type BaseHubspotFormFieldOptionDto = z.infer<typeof baseHubspotFormFieldOptionDtoSchema>
