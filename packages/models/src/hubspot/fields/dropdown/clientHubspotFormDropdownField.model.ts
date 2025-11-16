import { z } from 'zod'

import {
  clientBaseHubspotFormFieldOptionSchema,
  clientBaseHubspotFormFieldSchema,
} from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormDropdownFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('dropdown'),
  options: z.array(clientBaseHubspotFormFieldOptionSchema),
})
export type ClientHubspotFormDropdownField = z.infer<typeof clientHubspotFormDropdownFieldSchema>
