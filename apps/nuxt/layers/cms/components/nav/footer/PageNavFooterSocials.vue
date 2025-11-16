<script setup lang="ts">
import type { ClientSettingsSocials } from '@repo/models'
import { VcIcon } from '@wisemen/vue-core-components'

interface Props {
  socials: ClientSettingsSocials
}

defineProps<Props>()
</script>

<template>
  <div
    class="
      flex flex-wrap gap-8
      lg:justify-end
    "
  >
    <a
      v-if="socials.facebook"
      :href="socials.facebook"
      class="
        text-sm
        hover:underline
        focus-visible:underline
      "
      target="_blank"
      aria-label="facebook"
    >
      <VcIcon
        class="h-5 w-5"
        icon="facebook"
        label="facebook"
      />
    </a>
    <a
      v-if="socials.instagram"
      :href="socials.instagram"
      class="
        text-sm
        hover:underline
        focus-visible:underline
      "
      target="_blank"
      aria-label="instagram"
    >
      <VcIcon
        class="h-5 w-5"
        icon="instagram"
        label="instagram"
      />
    </a>
    <a
      v-if="socials.linkedin"
      :href="socials.linkedin"
      class="
        text-sm
        hover:underline
        focus-visible:underline
      "
      target="_blank"
      aria-label="linkedin"
    >
      <VcIcon
        class="h-5 w-5"
        icon="linkedIn"
        label="linkedin"
      />
    </a>
    <a
      v-if="socials.youtube"
      :href="socials.youtube"
      class="
        text-sm
        hover:underline
        focus-visible:underline
      "
      target="_blank"
      aria-label="youtube"
    >
      <VcIcon
        class="h-5 w-5"
        icon="youtube"
        label="youtube"
      />
    </a>
    <a
      v-if="socials.pinterest"
      :href="socials.pinterest"
      class="
        text-sm
        hover:underline
        focus-visible:underline
      "
      target="_blank"
      aria-label="pintrest"
    >
      <VcIcon
        class="h-5 w-5"
        icon="pintrest"
        label="pintrest"
      />
    </a>
    <a
      v-if="socials.tiktok"
      :href="socials.tiktok"
      class="
        text-sm
        hover:underline
        focus-visible:underline
      "
      target="_blank"
      aria-label="tiktok"
    >
      <VcIcon
        class="h-5 w-5"
        icon="tiktok"
        label="tiktok"
      />
    </a>
  </div>
</template>
