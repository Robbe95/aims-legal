import { z } from 'zod'

import { baseHubspotFormFieldDtoSchema } from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormNumberFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('number'),
})
export type HubspotFormNumberFieldDto = z.infer<typeof hubspotFormNumberFieldDtoSchema>
