<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm px-6 py-3 text-center transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
