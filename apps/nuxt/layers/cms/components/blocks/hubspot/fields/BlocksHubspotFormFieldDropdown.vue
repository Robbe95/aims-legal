<script setup lang="ts">
import type {
  ClientBaseHubspotFormFieldOption,
  ClientHubspotFormDropdownField,
} from '@repo/models'
import {
  VcSelect,
  VcSelectItem,
} from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  formField: Field<any, any>
  hubspotField: ClientHubspotFormDropdownField
}

const props = defineProps<Props>()

const {
  t,
} = useI18n()
const model = computed<any>({
  get() {
    return props.hubspotField.options?.find((hubspotFieldOption) =>
      hubspotFieldOption.value === props.formField.modelValue.value) ?? null
  },
  set(value) {
    props.formField.setValue(value)
  },
})

function displayFunction(hubspotFieldOption: ClientBaseHubspotFormFieldOption): string {
  return hubspotFieldOption.label
}
</script>

<template>
  <div class="w-full">
    <VcSelect
      v-model="model"
      :placeholder="t('base.shared.select')"
      :label="hubspotField.label"
      :error-message="toFormField(formField).errorMessage"
      :display-fn="displayFunction"
      @blur="formField.onBlur"
      @change="formField.onChange"
    >
      <VcSelectItem
        v-for="(option, index) in props.hubspotField.options"
        :key="index"
        :value="option.value"
      >
        {{ displayFunction(option) }}
      </VcSelectItem>
    </VcSelect>
  </div>
</template>
