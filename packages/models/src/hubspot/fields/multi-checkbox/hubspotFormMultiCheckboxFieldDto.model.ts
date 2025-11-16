import { z } from 'zod'

import {
  baseHubspotFormFieldDtoSchema,
  baseHubspotFormFieldOptionDtoSchema,
} from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormMultiCheckboxFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('multiple_checkboxes'),
  options: z.array(baseHubspotFormFieldOptionDtoSchema),
})
export type HubspotFormMultiCheckboxFieldDto = z.infer<typeof hubspotFormMultiCheckboxFieldDtoSchema>
