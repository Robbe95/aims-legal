<script setup lang="ts">
import type { ClientHubspotFormRadioField } from '@repo/models'
import {
  VcRadioGroup,
  VcRadioGroupItem,
} from '@wisemen/vue-core-components'
import type { Field } from 'formango'

import { toFormField } from '~base/utils/form/toFormField.util'

interface Props {
  formField: Field<any, any>
  hubspotField: ClientHubspotFormRadioField
}

const props = defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <VcRadioGroup
      :label="hubspotField.label"
      v-bind="toFormField(props.formField)"
    >
      <VcRadioGroupItem
        v-for="option in props.hubspotField.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :hint="option.description"
      />
    </VcRadioGroup>
  </div>
</template>
