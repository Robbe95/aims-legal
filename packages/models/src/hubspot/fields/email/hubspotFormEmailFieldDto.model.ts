import { z } from 'zod'

import { baseHubspotFormFieldDtoSchema } from '#hubspot/baseHubspotFormFieldDto.model.ts'

export const hubspotFormEmailFieldDtoSchema = baseHubspotFormFieldDtoSchema.extend({
  fieldType: z.literal('email'),
})
export type HubspotFormEmailFieldDto = z.infer<typeof hubspotFormEmailFieldDtoSchema>
