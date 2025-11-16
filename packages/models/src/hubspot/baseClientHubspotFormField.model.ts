import { z } from 'zod'

export const clientBaseHubspotFormFieldSchema = z.object({
  objectTypeId: z.string(),
  isHidden: z.boolean(),
  isRequired: z.boolean(),
  name: z.string(),
  fieldType: z.string(),
  label: z.string(),
})

export const clientBaseHubspotFormFieldOptionSchema = z.object({
  description: z.string(),
  displayOrder: z.number(),
  label: z.string(),
  value: z.string(),
})
export type ClientBaseHubspotFormField = z.infer<typeof clientBaseHubspotFormFieldSchema>

export type ClientBaseHubspotFormFieldOption = z.infer<typeof clientBaseHubspotFormFieldOptionSchema>
