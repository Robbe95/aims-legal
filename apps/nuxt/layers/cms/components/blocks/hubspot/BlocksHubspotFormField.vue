<script setup lang="ts">
import type { ClientHubspotFormField } from '@repo/models'
import type { Form } from 'formango'

import BlocksHubspotFormFieldCheckbox from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldCheckbox.vue'
import BlocksHubspotFormFieldDropdown from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldDropdown.vue'
import BlocksHubspotFormFieldMultipleCheckbox from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldMultipleCheckbox.vue'
import BlocksHubspotFormFieldPhone from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldPhone.vue'
import BlocksHubspotFormFieldRadio from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldRadio.vue'
import BlocksHubspotFormFieldText from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldText.vue'
import BlocksHubspotFormFieldTextarea from '~cms/components/blocks/hubspot/fields/BlocksHubspotFormFieldTextarea.vue'

interface Props {
  isLabelDisabled?: boolean
  field: ClientHubspotFormField
  form: Form<any>
}
const props = withDefaults(defineProps<Props>(), {
  isLabelDisabled: false,
})

function isIn<T>(x: any, values: readonly T[]): x is T {
  return values.includes(x)
}

const ARRAY_FIELD_TYPES = [
  'multiCheckbox',
] satisfies ClientHubspotFormField['fieldType'][]

const NON_ARRAY_FIELD_TYPES = [
  'singlelineText',
  'email',
  'multilineText',
  'number',
  'phone',
  'radio',
  'dropdown',
] satisfies ClientHubspotFormField['fieldType'][]

const BOOLEAN_FIELD_TYPES = [
  'checkbox',
] satisfies ClientHubspotFormField['fieldType'][]

function getDefaultValue(field: ClientHubspotFormField): any {
  if (isIn(field.fieldType, ARRAY_FIELD_TYPES)) {
    return []
  }

  if (isIn(field.fieldType, NON_ARRAY_FIELD_TYPES)) {
    return null
  }

  if (isIn(field.fieldType, BOOLEAN_FIELD_TYPES)) {
    return false
  }

  return []
}

const formField = props.form.register(`${props.field.name}.value`, getDefaultValue(props.field))
</script>

<template>
  <BlocksHubspotFormFieldText
    v-if="field.fieldType === 'singlelineText' || field.fieldType === 'email'"
    :form-field="formField"
    :is-label-disabled="isLabelDisabled"
    :hubspot-field="field"
  />
  <BlocksHubspotFormFieldTextarea
    v-else-if="field.fieldType === 'multilineText'"
    :form-field="formField"
    :hubspot-field="field"
  />
  <BlocksHubspotFormFieldPhone
    v-else-if="field.fieldType === 'phone'"
    :form-field="formField"
    :hubspot-field="field"
  />
  <BlocksHubspotFormFieldRadio
    v-else-if="field.fieldType === 'radio'"
    :form-field="formField"
    :hubspot-field="field"
  />
  <BlocksHubspotFormFieldDropdown
    v-else-if="field.fieldType === 'dropdown'"
    :form-field="formField"
    :hubspot-field="field"
  />
  <BlocksHubspotFormFieldMultipleCheckbox
    v-if="field.fieldType === 'multiCheckbox'"
    :form-field="formField"
    :hubspot-field="field"
  />
  <BlocksHubspotFormFieldCheckbox
    v-else-if="field.fieldType === 'checkbox'"
    :form-field="formField"
    :hubspot-field="field"
  />
</template>
