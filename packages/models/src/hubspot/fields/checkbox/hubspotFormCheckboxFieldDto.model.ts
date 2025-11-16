import { z } from 'zod'

import { baseHubspotFormFieldDtoSchema } from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormCheckboxFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('single_checkbox'),
})
export type HubspotFormCheckboxFieldDto = z.infer<typeof hubspotFormCheckboxFieldDtoSchema>
