<script setup lang="ts">
  import type { components } from '@/shared/api/v1'
  import ShoppingCategoryIcon from './ShoppingCategoryIcon.vue'
  import { ReceiptAnalyzeResultModal } from '@/features/analyze'
  import { ref } from 'vue'
  import { formatDateFromDate } from '@/shared/util/string'
  const props = defineProps<{
    shoppingRecord: components['schemas']['ShoppingRecord']
  }>()

  const isOpenReceiptAnalyzeResultModal = ref<boolean>(false)

  const handleReceiptAnalyzeResult = {
    openModal: () => {
      if (props.shoppingRecord.analyze_id === 0) {
        return
      }
      isOpenReceiptAnalyzeResultModal.value = true
    },
    closeModal: () => {
      isOpenReceiptAnalyzeResultModal.value = false
    }
  }

  defineEmits<{
    click: [id: number]
  }>()
</script>
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 border-1"
  >
    <div
      class="flex items-center justify-between"
      @click="handleReceiptAnalyzeResult.openModal"
    >
      <div class="flex items-center flex-1 min-w-0">
        <ShoppingCategoryIcon :categoryName="shoppingRecord.category.name" />
        <div class="min-w-0">
          <div class="flex gap-2 flex-nowrap items-center min-w-0">
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
              {{ formatDateFromDate(new Date(shoppingRecord.date)) }}
            </p>

            <span
              v-if="shoppingRecord.analyze_id !== 0"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap min-w-[48px] justify-center"
            >
              AI解析
            </span>
          </div>

          <p class="font-medium text-gray-700 dark:text-gray-200">
            {{ shoppingRecord.category.name }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
            {{
              shoppingRecord.memo.length > 10
                ? shoppingRecord.memo.slice(0, 10) + '...'
                : shoppingRecord.memo
            }}
          </p>
        </div>
      </div>
      <div class="text-right min-w-[80px] flex-shrink-0">
        <p class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          ¥{{ shoppingRecord.amount.toLocaleString() }}
        </p>
      </div>
      <div class="ml-1 flex-shrink-0">
        <button
          @click="$emit('click', shoppingRecord.id)"
          class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 duration-300 bg-red-100 hover:bg-red-200 shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <ReceiptAnalyzeResultModal
    :isOpen="isOpenReceiptAnalyzeResultModal"
    :shoppingRecord="shoppingRecord"
    @closeModal="handleReceiptAnalyzeResult.closeModal"
  />
</template>
