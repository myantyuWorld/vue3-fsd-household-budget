<script setup lang="ts">
  withDefaults(
    defineProps<{
      bottom?: number
      right?: number
      isFixed?: boolean
    }>(),
    {
      bottom: 20,
      right: 4,
      isFixed: true
    }
  )

  defineEmits<{
    click: []
  }>()
</script>

<template>
  <button
    class="bg-gradient-to-br from-primary to-primary-dark text-white p-4 rounded-full shadow-soft hover:from-primary-dark hover:to-primary transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
    :class="[`bottom-${bottom} right-${right}`, isFixed ? 'fixed' : '']"
    style="width: 56px; height: 56px"
    @click="$emit('click')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      class="transform hover:scale-110 transition-transform duration-300"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M24 8h-4l-2-2h-4l-2 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 14H8V10h16v12z"
      />
      <circle
        cx="16"
        cy="16"
        r="4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
    </svg>
  </button>
</template>
