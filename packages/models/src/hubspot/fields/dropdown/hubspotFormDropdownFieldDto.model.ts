import { z } from 'zod'

import {
  baseHubspotFormFieldDtoSchema,
  baseHubspotFormFieldOptionDtoSchema,
} from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormDropdownFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('dropdown'),
  options: z.array(baseHubspotFormFieldOptionDtoSchema),
})
export type HubspotFormDropdownFieldDto = z.infer<typeof hubspotFormDropdownFieldDtoSchema>
