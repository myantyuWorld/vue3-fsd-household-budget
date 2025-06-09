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
  return `${import.meta.env.VITE_S3_BUCKET_URL}/${props.shoppingRecord.receipt_analyze_results.receiptImageURL}`
})
</script>

<template>
  <BaseModal
    title="レシート分析結果"
    :isOpen="isOpen"
    @closeModal="emit('closeModal')"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <div>
        <img :src="receiptURL" alt="レシート画像" class="w-full h-auto" />
        <div
          class="max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-bg"
        >
          <div v-for="item in shoppingRecord.receipt_analyze_results.items" :key="item.id">
            <div
              class="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-2"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-primary-bg rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                </div>
                <p class="font-medium text-gray-800">{{ item.name }}</p>
              </div>
              <p class="text-lg font-bold text-primary">{{ item.amount.toLocaleString() }}円</p>
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
