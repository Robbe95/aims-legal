import { z } from 'zod'

import {
  clientBaseHubspotFormFieldOptionSchema,
  clientBaseHubspotFormFieldSchema,
} from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormRadioFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('radio'),
  options: z.array(clientBaseHubspotFormFieldOptionSchema),
})
export type ClientHubspotFormRadioField = z.infer<typeof clientHubspotFormRadioFieldSchema>
