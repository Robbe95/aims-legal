<script setup lang="ts">
import type { ClientHubspotFormMultiCheckboxField } from '@repo/models'
import {
  VcCheckbox,
  VcCheckboxGroup,
} from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  formField: Field<any, any>
  hubspotField: ClientHubspotFormMultiCheckboxField
}

const props = defineProps<Props>()

const options = computed<{
  hint: string
  label: string
  value: string
}[]>(() => {
  return props.hubspotField.options?.map((option) => {
    return {
      hint: option.description,
      label: option.label,
      value: option.value,
    }
  }) ?? []
})
</script>

<template>
  <div class="w-full">
    <VcCheckboxGroup
      :label="hubspotField.label"
      v-bind="toFormField(formField)"
    >
      <VcCheckbox
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </VcCheckboxGroup>
  </div>
</template>
