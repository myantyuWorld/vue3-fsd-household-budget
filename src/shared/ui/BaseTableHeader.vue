<script setup lang="ts">
  defineProps<{
    classes?: string
  }>()
</script>

<template>
  <th
    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    :class="classes"
  >
    <slot />
  </th>
</template>
