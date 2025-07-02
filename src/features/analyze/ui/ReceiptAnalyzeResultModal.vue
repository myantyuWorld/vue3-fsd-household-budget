<script setup lang="ts">
  import { BaseModal, PrimaryButton } from '@/shared/ui'
  import type { components } from '@/shared/api/v1'
  import { computed } from 'vue'

  const props = defineProps<{
    isOpen: boolean
    shoppingRecord: components['schemas']['ShoppingRecord']
  }>()

  const emit = defineEmits<{
    (e: 'closeModal'): void
  }>()

  const receiptURL = computed(() => {
    return `${import.meta.env.VITE_S3_BUCKET_URL}/${props.shoppingRecord.receipt_analyze_results?.receiptImageURL || ''}`
  })
</script>

<template>
  <BaseModal
    title="レシート分析結果"
    :isOpen="isOpen"
    @closeModal="emit('closeModal')"
    verticalPosition="top-4"
    horizontalPosition="center"
    class="max-w-4xl mx-auto"
  >
    <template #modalBody>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- レシート画像 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">レシート画像</h3>
          <div class="max-h-[50vh] overflow-hidden rounded-lg shadow-md">
            <img
              :src="receiptURL"
              alt="レシート画像"
              class="w-full h-auto object-contain"
            />
          </div>
        </div>

        <!-- 分析結果と買い物記録情報 -->
        <div class="space-y-4">
          <!-- 買い物記録情報 -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">買い物記録情報</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">カテゴリ:</span>
                <span class="font-medium text-gray-800">{{ shoppingRecord.category?.name || '' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">記録金額:</span>
                <span class="text-xl font-bold text-green-600">¥{{ (shoppingRecord.amount || 0).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">日付:</span>
                <span class="font-medium text-gray-800">{{ shoppingRecord.date || '' }}</span>
              </div>
              <div v-if="shoppingRecord.memo" class="pt-2">
                <span class="text-gray-600 block mb-1">メモ:</span>
                <p class="text-gray-800 bg-white p-2 rounded border text-sm">{{ shoppingRecord.memo }}</p>
              </div>
            </div>
          </div>

          <!-- 分析結果 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">AI分析結果</h3>
            <div class="bg-gray-50 p-3 rounded-lg mb-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">AI分析合計金額:</span>
                <span class="text-lg font-bold text-blue-600">¥{{ (shoppingRecord.receipt_analyze_results?.totalAmount || 0).toLocaleString() }}</span>
              </div>
            </div>
            <div
              class="max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-bg space-y-2"
            >
              <div
                v-for="item in (shoppingRecord.receipt_analyze_results?.items || [])"
                :key="item.id || 0"
                class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-primary-bg rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-800 text-sm">
                    {{ item.name || '' }}
                  </p>
                </div>
                <p class="text-base font-bold text-primary flex-shrink-0">
                  ¥{{ (item.amount || 0).toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <PrimaryButton @click="emit('closeModal')">閉じる</PrimaryButton>
    </template>
  </BaseModal>
</template>
