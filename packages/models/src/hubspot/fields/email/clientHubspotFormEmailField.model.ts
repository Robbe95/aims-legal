import { z } from 'zod'

import { clientBaseHubspotFormFieldSchema } from '#hubspot/baseClientHubspotFormField.model.ts'

export const clientHubspotFormEmailFieldSchema = clientBaseHubspotFormFieldSchema.extend({
  fieldType: z.literal('email'),
})
export type ClientHubspotFormEmailField = z.infer<typeof clientHubspotFormEmailFieldSchema>
