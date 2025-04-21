<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="fixed bottom-20 right-4 bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
    style="width: 56px; height: 56px"
    @click="$emit('click')"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="transform hover:rotate-90 transition-transform duration-300">
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
