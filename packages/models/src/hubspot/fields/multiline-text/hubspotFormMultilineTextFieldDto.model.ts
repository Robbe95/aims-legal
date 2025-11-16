import { z } from 'zod'

import { baseHubspotFormFieldDtoSchema } from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormMultilineTextFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('multi_line_text'),
})
export type HubspotFormMultilineTextFieldDto = z.infer<typeof hubspotFormMultilineTextFieldDtoSchema>
