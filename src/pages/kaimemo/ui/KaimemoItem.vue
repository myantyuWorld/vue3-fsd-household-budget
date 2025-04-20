<script setup lang="ts">
import type { components } from '@/shared/api/v1';
import { computed } from 'vue'

const props = defineProps<{
  item: components["schemas"]["ShoppingMemo"]
}>()

defineEmits<{
  handleDoneItem : [id:number]
}>()

const doneClasses = computed(() => ({
  'line-through text-gray-400': props.item.isCompleted,
}))

const nameClasses = computed(() => ({
  'text-gray-400': props.item.isCompleted,
}))
</script>

<template>
  <div class="flex flex-col p-2 bg-white shadow-md hover:shodow-lg rounded-2xl m-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <svg
          v-if="item.categoryID === 1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
          class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
        >
          <path
            fill="currentColor"
            d="M298.2 156.6c-52.7-25.7-114.5-10.5-150.2 32.8l55.2 55.2c6.3 6.3 6.3 16.4 0 22.6c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7L130.4 217L2.3 479.7c-2.9 6-3.1 13.3 0 19.7c5.4 11.1 18.9 15.7 30 10.3l133.6-65.2l-49.2-49.2c-6.3-6.2-6.3-16.4 0-22.6s16.4-6.2 22.6 0l57 57l102-49.8c24-11.7 44.5-31.3 57.1-57.1c30.1-61.7 4.5-136.1-57.2-166.2m92.1-34.9C409.8 81 399.7 32.9 360 0c-50.3 41.7-52.5 107.5-7.9 151.9l8 8c44.4 44.6 110.3 42.4 151.9-7.9c-32.9-39.7-81-49.8-121.7-30.3"
          />
        </svg>
        <svg
          v-if="item.categoryID === 2"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="32"
          viewBox="0 0 448 512"
          class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
        >
          <path
            fill="currentColor"
            d="M448 358.4V25.6c0-16-9.6-25.6-25.6-25.6H96C41.6 0 0 41.6 0 96v320c0 54.4 41.6 96 96 96h326.4c12.8 0 25.6-9.6 25.6-25.6v-16q0-9.6-9.6-19.2c-3.2-16-3.2-60.8 0-73.6q9.6-4.8 9.6-19.2M144 144c0-8.84 7.16-16 16-16h48V80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v48h48c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-48v112c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V192h-48c-8.84 0-16-7.16-16-16zm236.8 304H96c-19.2 0-32-12.8-32-32s16-32 32-32h284.8z"
          />
        </svg>

        <div class="flex flex-col ml-3" :class="doneClasses">
          <div class="font-medium leading-none" :class="nameClasses">{{ item.title }}</div>
        </div>
      </div>

      <button
        class="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
        @click="$emit('handleDoneItem', item.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
