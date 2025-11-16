import { z } from 'zod'

import { clientBaseHubspotFormFieldSchema } from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormPhoneFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('phone'),
})
export type ClientHubspotFormPhoneField = z.infer<typeof clientHubspotFormPhoneFieldSchema>
