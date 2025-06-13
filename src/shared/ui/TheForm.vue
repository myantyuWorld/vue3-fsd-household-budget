<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    label: string
    size?:
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | '2xl'
      | '3xl'
      | '4xl'
      | '5xl'
      | '6xl'
      | '7xl'
      | '8xl'
      | '9xl'
  }>()

  const classes = computed(() => ({
    [`text-${props.size || 'sm'}`]: true
  }))
</script>
<template>
  <label
    class="block font-medium text-gray-700 dark:text-gray-300"
    :class="classes"
  >
    {{ label }}
    <slot />
  </label>
</template>
