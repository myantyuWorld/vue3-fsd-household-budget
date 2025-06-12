<script setup lang="ts">
defineProps<{
  classes?: string
}>()
</script>

<template>
  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" :class="classes">
    <slot />
  </td>
</template>
