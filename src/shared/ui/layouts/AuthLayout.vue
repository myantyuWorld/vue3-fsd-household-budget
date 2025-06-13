<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
    <slot></slot>
  </div>
</template>
