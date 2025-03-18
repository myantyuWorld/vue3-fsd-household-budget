<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
}>()

defineEmits<{
  closeModal: []
}>()
</script>

<template>
  <Transition>
    <div
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed bottom-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
      v-show="isOpen"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-gray-100 rounded-lg shadow-xl dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              @click="$emit('closeModal')"
            >
              <svg
                class="w-3 h-3"
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

          <div class="p-4 md:p-5 space-y-4">
            <slot name="modalBody"></slot>
          </div>

          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <slot name="buttons"> </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
