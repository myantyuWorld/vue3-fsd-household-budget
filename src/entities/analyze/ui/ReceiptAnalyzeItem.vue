<script setup lang="ts">
import type { ReceiptAnalyze } from '@/shared/types/receipt'
import { BaseModal, PrimaryButton } from '@/shared/ui'
import { ref } from 'vue'

defineProps<{
  receiptAnalyze: ReceiptAnalyze
}>()

const isOpenModal = ref(false)
const isOpenModalDetail = ref(false)

const handleReceiptImage = {
  openModal: () => {
    isOpenModal.value = true
  },

  closeModal: () => {
    isOpenModal.value = false
  },
}

const handleReceiptDetail = {
  openModal: () => {
    isOpenModalDetail.value = true
  },

  closeModal: () => {
    isOpenModalDetail.value = false
  },
}
</script>

<template>
  <div
    class="flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 border-1"
  >
    <div class="flex flex-row gap-2">
      <img
        :src="receiptAnalyze.receiptImageURL"
        alt="receipt image"
        class="w-16 h-16 border-1 border-gray-200 dark:border-gray-700 rounded-xl"
        @click="handleReceiptImage.openModal"
      />
      <div class="flex flex-col gap-2">
        <h1 class="text-sm text-gray-500 dark:text-gray-400">{{ receiptAnalyze.date }}</h1>
        <p class="font-medium text-gray-700 dark:text-gray-200">
          ¥{{ receiptAnalyze.totalAmount.toLocaleString() }}
        </p>
      </div>
      <div class="ml-auto">
        <PrimaryButton class="w-24" @click="handleReceiptDetail.openModal"
          >詳細を見る</PrimaryButton
        >
      </div>
    </div>
  </div>

  <BaseModal
    title="レシート"
    :isOpen="isOpenModal"
    @closeModal="handleReceiptImage.closeModal"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <img
        :src="receiptAnalyze.receiptImageURL"
        alt="receipt image"
        class="w-full h-auto border-1 border-gray-200 dark:border-gray-700 rounded-xl"
      />
    </template>

    <template #buttons>
      <PrimaryButton class="w-24" @click="handleReceiptImage.closeModal">閉じる</PrimaryButton>
    </template>
  </BaseModal>

  <BaseModal
    title="レシート詳細"
    :isOpen="isOpenModalDetail"
    @closeModal="handleReceiptDetail.closeModal"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <div class="flex flex-col gap-2">
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="item in receiptAnalyze.items"
            :key="item.name"
            class="flex items-center justify-between py-1"
          >
            <span class="text-lg text-gray-800 dark:text-gray-100">{{ item.name }}</span>
            <span class="text-lg font-medium text-gray-900 dark:text-gray-200">
              ¥{{ item.price.toLocaleString() }}
            </span>
          </div>
        </div>
        <p class="text-xl text-gray-500 text-right">
          合計：¥{{ receiptAnalyze.totalAmount.toLocaleString() }}
        </p>
      </div>
    </template>

    <template #buttons>
      <PrimaryButton class="w-24" @click="handleReceiptDetail.closeModal">閉じる</PrimaryButton>
    </template>
  </BaseModal>
</template>
