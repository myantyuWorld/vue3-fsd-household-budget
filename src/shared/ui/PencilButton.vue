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
    isFixed: true,
  },
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
      class="transform hover:rotate-90 transition-transform duration-300"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M24 8l-4-4-16 16v4h4l16-16z"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20 4l8 8"
      />
    </svg>
  </button>
</template>
