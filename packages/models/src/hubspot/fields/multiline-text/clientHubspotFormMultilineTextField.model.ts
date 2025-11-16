import { z } from 'zod'

import { clientBaseHubspotFormFieldSchema } from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormMultilineTextFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('multilineText'),
})
export type ClientHubspotFormMultilineTextField = z.infer<typeof clientHubspotFormMultilineTextFieldSchema>
