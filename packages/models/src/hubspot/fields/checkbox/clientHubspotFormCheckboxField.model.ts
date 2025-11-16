import { z } from 'zod'

import { clientBaseHubspotFormFieldSchema } from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormCheckboxFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('checkbox'),
})
export type ClientHubspotFormCheckboxField = z.infer<typeof clientHubspotFormCheckboxFieldSchema>
