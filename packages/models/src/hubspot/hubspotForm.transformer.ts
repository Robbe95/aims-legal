import type {
  ClientBaseHubspotFormField,
  ClientBaseHubspotFormFieldOption,
} from '#hubspot/baseClientHubspotFormField.model.ts'
import type {
  BaseHubspotFormFieldDto,
  BaseHubspotFormFieldOptionDto,
} from '#hubspot/baseHubspotFormFieldDto.model.ts'
import type { ClientHubspotForm } from '#hubspot/clientHubspotForm.model.ts'
import type { ClientHubspotFormField } from '#hubspot/clientHubspotFormField.model.ts'
import type { ClientHubspotFormCheckboxField } from '#hubspot/fields/checkbox/clientHubspotFormCheckboxField.model.ts'
import type { HubspotFormCheckboxFieldDto } from '#hubspot/fields/checkbox/hubspotFormCheckboxFieldDto.model.ts'
import type { ClientHubspotFormDropdownField } from '#hubspot/fields/dropdown/clientHubspotFormDropdownField.model.ts'
import type { HubspotFormDropdownFieldDto } from '#hubspot/fields/dropdown/hubspotFormDropdownFieldDto.model.ts'
import type { ClientHubspotFormEmailField } from '#hubspot/fields/email/clientHubspotFormEmailField.model.ts'
import type { HubspotFormEmailFieldDto } from '#hubspot/fields/email/hubspotFormEmailFieldDto.model.ts'
import type { ClientHubspotFormMultiCheckboxField } from '#hubspot/fields/multi-checkbox/clientHubspotFormMultiCheckboxField.model.ts'
import type { HubspotFormMultiCheckboxFieldDto } from '#hubspot/fields/multi-checkbox/hubspotFormMultiCheckboxFieldDto.model.ts'
import type { ClientHubspotFormMultilineTextField } from '#hubspot/fields/multiline-text/clientHubspotFormMultilineTextField.model.ts'
import type { HubspotFormMultilineTextFieldDto } from '#hubspot/fields/multiline-text/hubspotFormMultilineTextFieldDto.model.ts'
import type { ClientHubspotFormNumberField } from '#hubspot/fields/number/clientHubspotFormNumberField.model.ts'
import type { HubspotFormNumberFieldDto } from '#hubspot/fields/number/hubspotFormNumberFieldDto.model.ts'
import type { ClientHubspotFormPhoneField } from '#hubspot/fields/phone/clientHubspotFormPhoneField.model.ts'
import type { HubspotFormPhoneFieldDto } from '#hubspot/fields/phone/hubspotFormPhoneFieldDto.model.ts'
import type { ClientHubspotFormRadioField } from '#hubspot/fields/radio/clientHubspotFormRadioField.model.ts'
import type { HubspotFormRadioFieldDto } from '#hubspot/fields/radio/hubspotFormRadioFieldDto.model.ts'
import type { ClientHubspotFormSinglelineTextField } from '#hubspot/fields/singleline-text/clientHubspotFormSinglelineTextField.model.ts'
import type { HubspotFormSinglelineTextFieldDto } from '#hubspot/fields/singleline-text/hubspotFormSinglelineTextFieldDto.model.ts'
import type { HubspotFormDto } from '#hubspot/hubspotFormDto.model.ts'
import type { HubspotFormFieldDto } from '#hubspot/hubspotFormFieldDto.model.ts'

export const HubspotFormTransformer = {
  toBaseClientHubspotFormField(hubspotFormFieldDto: BaseHubspotFormFieldDto): ClientBaseHubspotFormField {
    const convertedField: ClientBaseHubspotFormField = {
      objectTypeId: hubspotFormFieldDto.objectTypeId,
      isHidden: hubspotFormFieldDto.hidden,
      isRequired: hubspotFormFieldDto.required,
      name: hubspotFormFieldDto.name,
      fieldType: hubspotFormFieldDto.fieldType,
      label: hubspotFormFieldDto.label,
    }

    return convertedField
  },

  toBaseClientHubspotFormFieldOption(
    hubspotFormFieldOptionDto: BaseHubspotFormFieldOptionDto,
  ): ClientBaseHubspotFormFieldOption {
    const convertedFieldOption: ClientBaseHubspotFormFieldOption = {
      description: hubspotFormFieldOptionDto.description,
      displayOrder: hubspotFormFieldOptionDto.displayOrder,
      label: hubspotFormFieldOptionDto.label,
      value: hubspotFormFieldOptionDto.value,
    }

    return convertedFieldOption
  },

  toClientHubspotForm(hubspotFormDto: HubspotFormDto): ClientHubspotForm {
    const convertedForm: ClientHubspotForm = {
      id: hubspotFormDto.id,
      name: hubspotFormDto.name,
      fields: hubspotFormDto.fieldGroups
        .flatMap((fieldGroup) => fieldGroup.fields
          .map((field) => HubspotFormTransformer.toClientHubspotFormField(field))),
      formType: hubspotFormDto.formType,
      legalConsentOptions: {
        communicationConsentCheckboxes: hubspotFormDto.legalConsentOptions.communicationsCheckboxes ?? null,
        communicationConsentText: hubspotFormDto.legalConsentOptions.communicationConsentText ?? null,
        consentToProcessText: hubspotFormDto.legalConsentOptions.consentToProcessText ?? null,
        privacyText: hubspotFormDto.legalConsentOptions.privacyText ?? null,
      },
      postSubmitText: hubspotFormDto.configuration.postSubmitAction.value,
      submitButtonText: hubspotFormDto.displayOptions.submitButtonText,
    }

    return convertedForm
  },

  toClientHubspotFormCheckboxField(
    hubspotFormCheckboxFieldDto: HubspotFormCheckboxFieldDto,
  ): ClientHubspotFormCheckboxField {
    const convertedField: ClientHubspotFormField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormCheckboxFieldDto),
      fieldType: 'checkbox',
    }

    return convertedField
  },
  toClientHubspotFormDropdownField(
    hubspotFormDropdownFieldDto: HubspotFormDropdownFieldDto,
  ): ClientHubspotFormDropdownField {
    const convertedField: ClientHubspotFormDropdownField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormDropdownFieldDto),
      fieldType: 'dropdown',
      options: hubspotFormDropdownFieldDto.options
        .map((option) => HubspotFormTransformer.toBaseClientHubspotFormFieldOption(option)),
    }

    return convertedField
  },

  toClientHubspotFormEmailField(hubspotFormEmailFieldDto: HubspotFormEmailFieldDto): ClientHubspotFormEmailField {
    const convertedField: ClientHubspotFormField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormEmailFieldDto),
      fieldType: 'email',
    }

    return convertedField
  },

  toClientHubspotFormField(hubspotFormFieldDto: HubspotFormFieldDto): ClientHubspotFormField {
    switch (hubspotFormFieldDto.fieldType) {
      case 'email':
        return HubspotFormTransformer.toClientHubspotFormEmailField(hubspotFormFieldDto)
      case 'dropdown':
        return HubspotFormTransformer.toClientHubspotFormDropdownField(hubspotFormFieldDto)
      case 'multi_line_text':
        return HubspotFormTransformer.toClientHubspotFormMultilineTextField(
          hubspotFormFieldDto,
        )
      case 'multiple_checkboxes':
        return HubspotFormTransformer.toClientHubspotFormMultiCheckboxField(
          hubspotFormFieldDto,
        )
      case 'number':
        return HubspotFormTransformer.toClientHubspotFormNumberField(hubspotFormFieldDto)
      case 'phone':
        return HubspotFormTransformer.toClientHubspotFormPhoneField(hubspotFormFieldDto)
      case 'radio':
        return HubspotFormTransformer.toClientHubspotFormRadioField(hubspotFormFieldDto)
      case 'single_line_text':
        return HubspotFormTransformer.toClientHubspotFormSinglelineTextField(
          hubspotFormFieldDto,
        )
      case 'single_checkbox':
        return HubspotFormTransformer.toClientHubspotFormCheckboxField(hubspotFormFieldDto)
    }
  },

  toClientHubspotFormMultiCheckboxField(
    hubspotFormMultiCheckboxFieldDto: HubspotFormMultiCheckboxFieldDto,
  ): ClientHubspotFormMultiCheckboxField {
    const convertedField: ClientHubspotFormMultiCheckboxField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormMultiCheckboxFieldDto),
      fieldType: 'multiCheckbox',
      options: hubspotFormMultiCheckboxFieldDto.options
        .map((option) => HubspotFormTransformer.toBaseClientHubspotFormFieldOption(option)),
    }

    return convertedField
  },

  toClientHubspotFormMultilineTextField(
    hubspotFormMultilineTextFieldDto: HubspotFormMultilineTextFieldDto,
  ): ClientHubspotFormMultilineTextField {
    const convertedField: ClientHubspotFormField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormMultilineTextFieldDto),
      fieldType: 'multilineText',
    }

    return convertedField
  },

  toClientHubspotFormNumberField(hubspotFormNumberFieldDto: HubspotFormNumberFieldDto): ClientHubspotFormNumberField {
    const convertedField: ClientHubspotFormField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormNumberFieldDto),
      fieldType: 'number',
    }

    return convertedField
  },

  toClientHubspotFormPhoneField(hubspotFormPhoneFieldDto: HubspotFormPhoneFieldDto): ClientHubspotFormPhoneField {
    const convertedField: ClientHubspotFormField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormPhoneFieldDto),
      fieldType: 'phone',
    }

    return convertedField
  },

  toClientHubspotFormRadioField(
    hubspotFormRadioFieldDto: HubspotFormRadioFieldDto,
  ): ClientHubspotFormRadioField {
    const convertedField: ClientHubspotFormRadioField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormRadioFieldDto),
      fieldType: 'radio',
      options: hubspotFormRadioFieldDto.options
        .map((option) => HubspotFormTransformer.toBaseClientHubspotFormFieldOption(option)),
    }

    return convertedField
  },

  toClientHubspotFormSinglelineTextField(
    hubspotFormSinglelineTextFieldDto: HubspotFormSinglelineTextFieldDto,
  ): ClientHubspotFormSinglelineTextField {
    const convertedField: ClientHubspotFormField = {
      ...HubspotFormTransformer.toBaseClientHubspotFormField(hubspotFormSinglelineTextFieldDto),
      fieldType: 'singlelineText',
    }

    return convertedField
  },

}
