<script setup lang="ts">
import type { HubspotFormBlock } from '@repo/payload-types'

import AnimateHeight from '~~/layers/base/components/animate/AnimateHeight.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import { useHubspotFormQuery } from '~cms/api/hubspot/query/useHubspot.query'
import BlocksHubspotFormSchema from '~cms/components/blocks/hubspot/BlocksHubspotFormSchema.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  block: HubspotFormBlock
}
const props = defineProps<Props>()

const hubspotFormId = computed<string>(() => {
  if (typeof props.block.hubspotForm === 'string') {
    return props.block.hubspotForm
  }

  return props.block.hubspotForm.formId
})
const hubspotFormQuery = useHubspotFormQuery({
  formId: hubspotFormId.value,
})
</script>

<template>
  <Section>
    <div class="flex flex-col gap-12">
      <SectionHeader>
        {{ props.block.title }}
      </SectionHeader>
      <div
        class="
          grid gap-8
          lg:grid-cols-2 lg:gap-60
          xl:gap-80
        "
      >
        <AnimateHeight>
          <div v-if="!hubspotFormQuery.isPending.value">
            <BlocksHubspotFormSchema
              v-if="hubspotFormQuery.data.value"
              :hubspot-form="hubspotFormQuery.data.value"
            />
          </div>
          <div v-else>
            <div class="h-80 w-full bg-gray-500" />
          </div>
        </AnimateHeight>
        <div class="flex justify-end">
          <CmsImage
            v-if="props.block.image"
            :image="props.block.image"
            class="max-h-[478px]"
          />
        </div>
      </div>
    </div>
  </Section>
</template>
