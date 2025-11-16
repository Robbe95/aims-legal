<script setup lang="ts">
import { getVideoEmbedUrl } from '~cms/utils/video-embed/videoEmbed.util'

interface Props {
  video: string
}
const props = defineProps<Props>()

const videoEmbedUrl = computed<string>(() => {
  return getVideoEmbedUrl(props.video)
})
</script>

<template>
  <iframe
    id="myIframe"
    :src="videoEmbedUrl"
    title="Video Player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  />
</template>
