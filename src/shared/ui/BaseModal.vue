<script setup lang="ts">
const props = withDefaults(defineProps<{
  isOpen: boolean
  title: string
  verticalPosition?: 'top-0' | 'bottom-0' | 'top-10' | 'bottom-50' | 'top-20' | 'bottom-10'
  horizontalPosition?: 'left-0' | 'right-0'
}>(), {
  verticalPosition: 'bottom-0',
  horizontalPosition: 'right-0',
})

defineEmits<{
  closeModal: []
}>()
</script>

<template>
  <Transition name="modal">
    <div
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center md:inset-0 max-h-full backdrop-blur-sm"
      :class="[
        props.verticalPosition,
        props.horizontalPosition,
      ]"
      v-show="props.isOpen"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl border-2 border-indigo-200/50 dark:border-indigo-800/50 transform transition-all duration-300 hover:scale-[1.01]">
          <div
            class="flex items-center justify-between p-6 border-b border-indigo-200/50 dark:border-indigo-800/50 rounded-t-2xl"
          >
            <h3 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-pink-400 dark:to-purple-400">{{ props.title }}</h3>
            <button
              type="button"
              class="text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-all duration-300 transform hover:rotate-90"
              data-modal-hide="default-modal"
              @click="$emit('closeModal')"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <slot name="modalBody"></slot>
          </div>

          <div
            class="flex items-center p-6 border-t border-indigo-200/50 dark:border-indigo-800/50 rounded-b-2xl"
          >
            <slot name="buttons"> </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
