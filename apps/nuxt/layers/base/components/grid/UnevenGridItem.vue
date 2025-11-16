<script setup lang="ts">
interface Props {
  index: number
}
const props = defineProps<Props>()

const normalizedIndex = computed<number>(() => {
  return props.index + 1
})

const isFirst = computed<boolean>(() => {
  return normalizedIndex.value === 1
})

const isEight = computed<boolean>(() => {
  if (isFirst.value) {
    return false
  }

  return normalizedIndex.value % 8 === 0
})
const isFourth = computed<boolean>(() => {
  if (isFirst.value) {
    return false
  }

  if (isEight.value) {
    return false
  }

  return normalizedIndex.value % 4 === 0
})

const isFourthOrEight = computed<boolean>(() => {
  return isFourth.value || isEight.value
})
</script>

<template>
  <div
    v-if="isEight"
    class="col-span-1"
  />

  <div
    :class="{
      'lg:col-span-2': isFourthOrEight,
      'col-span-1': !isFourthOrEight,
    }"
  >
    <slot />
  </div>
  <div
    v-if="isFourth"
    class="col-span-1"
  />
</template>
