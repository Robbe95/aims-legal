import { z } from 'zod'

import { hubspotFormFieldDtoSchema } from '#hubspot/hubspotFormFieldDto.model.ts'

export const hubspotFormDtoSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  configuration: z.object({
    postSubmitAction: z.object({
      type: z.string(),
      value: z.string(),
    }),
  }),
  displayOptions: z.object({
    submitButtonText: z.string(),
  }),
  fieldGroups: z.array(
    z.object({
      fields: z.array(hubspotFormFieldDtoSchema),
    }),
  ),
  formType: z.literal('hubspot'),
  legalConsentOptions: z.object({
    communicationConsentText: z.string().nullish(),
    communicationsCheckboxes: z.array(
      z.object({
        subscriptionTypeId: z.number(),
        label: z.string(),
        required: z.boolean(),
      }),
    ).nullish(),
    consentToProcessText: z.string().nullish(),
    privacyText: z.string().nullish(),
    type: z.string(),
  }),
})

export type HubspotFormDto = z.infer<typeof hubspotFormDtoSchema>
