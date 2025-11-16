import { z } from 'zod'

import { baseHubspotFormFieldDtoSchema } from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormPhoneFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('phone'),
})
export type HubspotFormPhoneFieldDto = z.infer<typeof hubspotFormPhoneFieldDtoSchema>
