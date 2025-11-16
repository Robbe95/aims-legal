import { z } from 'zod'

import { clientHubspotFormCheckboxFieldSchema } from '#hubspot/fields/checkbox/clientHubspotFormCheckboxField.model.ts'
import { clientHubspotFormDropdownFieldSchema } from '#hubspot/fields/dropdown/clientHubspotFormDropdownField.model.ts'
import { clientHubspotFormEmailFieldSchema } from '#hubspot/fields/email/clientHubspotFormEmailField.model.ts'
import { clientHubspotFormMultiCheckboxFieldSchema } from '#hubspot/fields/multi-checkbox/clientHubspotFormMultiCheckboxField.model.ts'
import { clientHubspotFormMultilineTextFieldSchema } from '#hubspot/fields/multiline-text/clientHubspotFormMultilineTextField.model.ts'
import { clientHubspotFormNumberFieldSchema } from '#hubspot/fields/number/clientHubspotFormNumberField.model.ts'
import { clientHubspotFormPhoneFieldSchema } from '#hubspot/fields/phone/clientHubspotFormPhoneField.model.ts'
import { clientHubspotFormRadioFieldSchema } from '#hubspot/fields/radio/clientHubspotFormRadioField.model.ts'
import { clientHubspotFormSinglelineTextFieldSchema } from '#hubspot/fields/singleline-text/clientHubspotFormSinglelineTextField.model.ts'

export const clientHubspotFormFieldSchema = z.discriminatedUnion('fieldType', [
  clientHubspotFormEmailFieldSchema,
  clientHubspotFormDropdownFieldSchema,
  clientHubspotFormMultiCheckboxFieldSchema,
  clientHubspotFormMultilineTextFieldSchema,
  clientHubspotFormNumberFieldSchema,
  clientHubspotFormPhoneFieldSchema,
  clientHubspotFormRadioFieldSchema,
  clientHubspotFormSinglelineTextFieldSchema,
  clientHubspotFormCheckboxFieldSchema,
])

export type ClientHubspotFormField = z.infer<typeof clientHubspotFormFieldSchema>
