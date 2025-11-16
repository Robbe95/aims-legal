import { z } from 'zod'

export const hubspotFormSubmitFieldSchema = z.object({
  objectTypeId: z.string(),
  value: z.string().or(z.array(z.any())).or(z.number()).or(z.boolean()).nullish(),
})

export const hubspotFormSubmitSchema = z.record(
  z.string(),
  hubspotFormSubmitFieldSchema,
)
export type HubspotFormSubmitField = z.infer<typeof hubspotFormSubmitFieldSchema>
export type HubspotFormSubmit = z.infer<typeof hubspotFormSubmitSchema>
