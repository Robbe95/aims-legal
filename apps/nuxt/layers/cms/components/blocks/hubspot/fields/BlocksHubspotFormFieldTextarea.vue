<script setup lang="ts">
import type { ClientHubspotFormMultilineTextField } from '@repo/models'
import { VcTextarea } from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  formField: Field<any, any>
  hubspotField: ClientHubspotFormMultilineTextField
}

defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <VcTextarea
      :label="hubspotField.label"
      :placeholder="hubspotField.label"
      v-bind="toFormField(formField)"
    />
  </div>
</template>
