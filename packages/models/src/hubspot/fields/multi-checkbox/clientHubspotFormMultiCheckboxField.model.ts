import { z } from 'zod'

import {
  clientBaseHubspotFormFieldOptionSchema,
  clientBaseHubspotFormFieldSchema,
} from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormMultiCheckboxFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('multiCheckbox'),
  options: z.array(clientBaseHubspotFormFieldOptionSchema),
})
export type ClientHubspotFormMultiCheckboxField = z.infer<typeof clientHubspotFormMultiCheckboxFieldSchema>
