import { z } from 'zod'

import { hubspotFormCheckboxFieldDtoSchema } from '#hubspot/fields/checkbox/hubspotFormCheckboxFieldDto.model.ts'
import { hubspotFormDropdownFieldDtoSchema } from '#hubspot/fields/dropdown/hubspotFormDropdownFieldDto.model.ts'
import { hubspotFormEmailFieldDtoSchema } from '#hubspot/fields/email/hubspotFormEmailFieldDto.model.ts'
import { hubspotFormMultiCheckboxFieldDtoSchema } from '#hubspot/fields/multi-checkbox/hubspotFormMultiCheckboxFieldDto.model.ts'
import { hubspotFormMultilineTextFieldDtoSchema } from '#hubspot/fields/multiline-text/hubspotFormMultilineTextFieldDto.model.ts'
import { hubspotFormNumberFieldDtoSchema } from '#hubspot/fields/number/hubspotFormNumberFieldDto.model.ts'
import { hubspotFormPhoneFieldDtoSchema } from '#hubspot/fields/phone/hubspotFormPhoneFieldDto.model.ts'
import { hubspotFormRadioFieldDtoSchema } from '#hubspot/fields/radio/hubspotFormRadioFieldDto.model.ts'
import { hubspotFormSinglelineTextFieldDtoSchema } from '#hubspot/fields/singleline-text/hubspotFormSinglelineTextFieldDto.model.ts'

export const hubspotFormFieldDtoSchema = z.discriminatedUnion('fieldType', [
  hubspotFormEmailFieldDtoSchema,
  hubspotFormDropdownFieldDtoSchema,
  hubspotFormMultiCheckboxFieldDtoSchema,
  hubspotFormMultilineTextFieldDtoSchema,
  hubspotFormNumberFieldDtoSchema,
  hubspotFormPhoneFieldDtoSchema,
  hubspotFormRadioFieldDtoSchema,
  hubspotFormSinglelineTextFieldDtoSchema,
  hubspotFormCheckboxFieldDtoSchema,
])

export type HubspotFormFieldDto = z.infer<typeof hubspotFormFieldDtoSchema>
