import { z } from 'zod'

import { clientHubspotFormFieldSchema } from '#hubspot/clientHubspotFormField.model.ts'

export const clientHubspotFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  fields: z.array(clientHubspotFormFieldSchema),
  formType: z.literal('hubspot'),
  legalConsentOptions: z.object({
    communicationConsentCheckboxes: z.array(
      z.object({
        subscriptionTypeId: z.number(),
        label: z.string(),
        required: z.boolean(),
      }),
    ).nullable(),
    communicationConsentText: z.string().nullable(),
    consentToProcessText: z.string().nullable(),
    privacyText: z.string().nullable(),
  }),
  postSubmitText: z.string().nullable(),
  submitButtonText: z.string(),
})

export type ClientHubspotForm = z.infer<typeof clientHubspotFormSchema>
