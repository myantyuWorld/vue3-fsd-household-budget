<script setup lang="ts">
  defineProps<{
    categoryName: string
  }>()
</script>

<template>
  <div
    class="w-12 h-12 rounded-full bg-primary-bg flex items-center justify-center"
  >
    <span class="text-lg font-bold text-primary">
      {{ categoryName.charAt(0) }}
    </span>
  </div>
</template>
