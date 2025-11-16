<script setup lang="ts">
import type {
  ClientHubspotFormEmailField,
  ClientHubspotFormSinglelineTextField,
} from '@repo/models'
import { VcTextField } from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  isLabelDisabled?: boolean
  formField: Field<any, any>
  hubspotField: ClientHubspotFormEmailField | ClientHubspotFormSinglelineTextField
}

defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <VcTextField
      :label="!isLabelDisabled ? hubspotField.label : undefined"
      :placeholder="hubspotField.label"
      v-bind="toFormField(formField)"
    />
  </div>
</template>
