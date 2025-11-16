import { z } from 'zod'

import { baseHubspotFormFieldDtoSchema } from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormSinglelineTextFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('single_line_text'),
})
export type HubspotFormSinglelineTextFieldDto = z.infer<typeof hubspotFormSinglelineTextFieldDtoSchema>
