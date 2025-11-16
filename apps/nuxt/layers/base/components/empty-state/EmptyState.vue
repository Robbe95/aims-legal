<script setup lang="ts">

</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center rounded-md"
  >
    <div class="z-20 flex flex-col items-center justify-center text-center">
      <div
        class="mb-6 max-w-max rounded-md p-3"
      />
      <div class="flex flex-col gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>
