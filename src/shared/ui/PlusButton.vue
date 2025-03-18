<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center"
    style="width: 56px; height: 56px"
    @click="$emit('click')"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 25V7m-9 9h18"
      />
    </svg>
  </button>
</template>
