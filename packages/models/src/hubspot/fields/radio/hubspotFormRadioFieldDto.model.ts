import { z } from 'zod'

import {
  baseHubspotFormFieldDtoSchema,
  baseHubspotFormFieldOptionDtoSchema,
} from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormRadioFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('radio'),
  options: z.array(baseHubspotFormFieldOptionDtoSchema),
})
export type HubspotFormRadioFieldDto = z.infer<typeof hubspotFormRadioFieldDtoSchema>
