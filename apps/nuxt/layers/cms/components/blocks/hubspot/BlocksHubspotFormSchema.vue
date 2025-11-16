<script setup lang="ts">
import type {
  ClientHubspotForm,
  HubspotFormSubmit,
} from '@repo/models'
import {
  VcButton,
  VcIcon,
  VcIconButton,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'

import { NuxtErrorBoundary } from '#components'
import AnimateHeight from '~base/components/animate/AnimateHeight.vue'
import { useHubspotFormSubmitMutation } from '~cms/api/hubspot/mutation/useHubspotForm.mutation'
import BlocksHubspotFormField from '~cms/components/blocks/hubspot/BlocksHubspotFormField.vue'
import { makeHubspotFormZodSchema } from '~cms/utils/makeHubspotForm.util'

const props = withDefaults(defineProps<{
  isSingleLine?: boolean
  hubspotForm: ClientHubspotForm
}>(), {
  isSingleLine: false,
})

const isSubmitted = ref<boolean>(false)

const {
  t,
} = useI18n()
const hubspotZodSchema = makeHubspotFormZodSchema(props.hubspotForm)

const hubspotFormMutation = useHubspotFormSubmitMutation()
const form = useForm({
  schema: hubspotZodSchema,
  onSubmit: async (data) => {
    /*
    * Data is matched to hubspot form like this
    * {
    *   "$FIELD_NAME": {
    *     objectTypeId: "$OBJECT_TYPE_ID",
    *     value: "$VALUE"
    * }[]
    */
    const typedData = data as HubspotFormSubmit

    await hubspotFormMutation.mutateAsync({
      formId: props.hubspotForm.id,
      data: typedData,
    })

    isSubmitted.value = true
  },
})
</script>

<template>
  <NuxtErrorBoundary>
    <AnimateHeight>
      <div
        v-if="!isSubmitted"
        :class="{
          'flex-col gap-4': !isSingleLine,
          'w-[300px] flex-row justify-end': isSingleLine,
        }"
        class="flex"
      >
        <div
          :class="{
            'gap-4 lg:grid-cols-2': !isSingleLine,
            'w-full': isSingleLine,
          }"
          class="grid"
        >
          <BlocksHubspotFormField
            v-for="(field, index) in hubspotForm.fields"
            :key="index"
            :index="index"
            :field="field"
            :form="form"
            :is-label-disabled="isSingleLine"
          />
        </div>

        <div
          v-if="hubspotForm.legalConsentOptions.privacyText"
          id="privacy-text"
          class="my-4 text-xs"
        >
          <div v-html="hubspotForm.legalConsentOptions.privacyText" />
        </div>
        <div
          v-if="!isSingleLine"
          class="flex"
        >
          <VcButton
            :is-loading="form.isSubmitting.value"
            @click="form.submit"
          >
            {{ hubspotForm.submitButtonText || t('base.shared.submit') }}
          </VcButton>
        </div>
        <div
          v-else
          class="flex"
        >
          <VcIconButton
            :is-loading="form.isSubmitting.value"
            :label="hubspotForm.submitButtonText || t('base.shared.submit')"
            :class-config="{
              icon: 'size-4 text-primary',
            }"
            icon="arrowRight"
            @click="form.submit"
          />
        </div>
      </div>
      <div
        v-else-if="!isSingleLine"
        class="flex flex-col items-center justify-center gap-4"
      >
        <div
          class="
            my-12 flex max-w-[500px] flex-col items-center gap-8 text-center
          "
        >
          <div>
            <VcIcon
              icon="annotationCheck"
              class="size-6"
            />
          </div>

          <p>
            {{ t('cms.form.success_title') }}
          </p>
          <p>
            {{ t('cms.form.success_text') }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="
          flex max-w-[300px] flex-row items-center justify-center gap-2 text-sm
        "
      >
        <VcIcon
          icon="check"
          class="size-4"
        />
        {{ t('cms.newsletter.success_text') }}
      </div>
    </AnimateHeight>
    <template #error="{ error }">
      {{ error }}
    </template>
  </NuxtErrorBoundary>
</template>

<style>
#privacy-text a {
  text-decoration: underline;
}
</style>
