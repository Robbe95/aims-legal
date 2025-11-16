<script setup lang="ts">
import type { ClientHubspotFormCheckboxField } from '@repo/models'
import { VcCheckbox } from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  formField: Field<any, any>
  hubspotField: ClientHubspotFormCheckboxField
}

defineProps<Props>()
</script>

<template>
  <div
    class="
      mt-8 flex w-full text-white
      lg:col-span-2
    "
  >
    <VcCheckbox
      :label="hubspotField.label"
      class="text-white"
      v-bind="toFormField(formField)"
    />
  </div>
</template>
