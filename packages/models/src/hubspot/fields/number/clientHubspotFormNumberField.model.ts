import { z } from 'zod'

import { clientBaseHubspotFormFieldSchema } from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormNumberFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('number'),
})
export type ClientHubspotFormNumberField = z.infer<typeof clientHubspotFormNumberFieldSchema>
