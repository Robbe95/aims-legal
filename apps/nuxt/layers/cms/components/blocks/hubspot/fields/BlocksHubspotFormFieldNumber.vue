<script setup lang="ts">
import type { ClientHubspotFormNumberField } from '@repo/models'
import { VcNumberField } from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  formField: Field<number, any>
  hubspotField: ClientHubspotFormNumberField
}

defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <VcNumberField
      :label="hubspotField.label"
      v-bind="toFormField(formField)"
    />
  </div>
</template>
