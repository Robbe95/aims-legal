import { z } from 'zod'

import { clientBaseHubspotFormFieldSchema } from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormSinglelineTextFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('singlelineText'),
})
export type ClientHubspotFormSinglelineTextField = z.infer<typeof clientHubspotFormSinglelineTextFieldSchema>
