<script setup lang="ts">
import type { ReceiptAnalyze } from '@/shared/types/receipt'
import { BaseModal, PrimaryButton, SecondaryButton } from '@/shared/ui'
import { ref } from 'vue'

defineProps<{
  receiptAnalyze: ReceiptAnalyze
}>()

const isOpenModal = ref(false)
const isOpenModalDetail = ref(false)
const isOpenModalTransfer = ref(false)

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

const handleReceiptTransfer = {
  openModal: () => {
    isOpenModalTransfer.value = true
    isOpenModalDetail.value = false
  },

  closeModal: () => {
    isOpenModalTransfer.value = false
    isOpenModalDetail.value = true
  },
}

const onClickTransfer = () => {
  // TODO: 移行処理を行う
  console.log('transfer')
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

      <div class="flex flex-col gap-2 justify-center">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="{
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300':
              receiptAnalyze.analyzeStatus === 'pending',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
              receiptAnalyze.analyzeStatus === 'finished',
          }"
        >
          {{ receiptAnalyze.analyzeStatus === 'pending' ? '解析中' : '解析完了' }}
        </span>
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="{
            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300':
              receiptAnalyze.transferStatus === 'pending',
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300':
              receiptAnalyze.transferStatus === 'finished',
          }"
        >
          {{ receiptAnalyze.transferStatus === 'pending' ? '未移行' : '移行済み' }}
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-sm text-gray-500 dark:text-gray-400">{{ receiptAnalyze.date }}</h1>
        <p class="font-medium text-gray-700 dark:text-gray-200">
          ¥{{ receiptAnalyze.totalAmount.toLocaleString() }}
        </p>
      </div>

      <div class="ml-auto">
        <PrimaryButton
          class="w-24"
          @click="handleReceiptDetail.openModal"
          :disabled="receiptAnalyze.analyzeStatus === 'pending'"
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
      <SecondaryButton class="w-24" @click="handleReceiptDetail.closeModal">閉じる</SecondaryButton>
      <PrimaryButton class="" @click="handleReceiptTransfer.openModal">移行する</PrimaryButton>
    </template>
  </BaseModal>

  <BaseModal
    title="支出に反映しますか？"
    :isOpen="isOpenModalTransfer"
    @closeModal="handleReceiptTransfer.closeModal"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <div class="flex flex-col gap-2">
        <p>移行する際のカテゴリを選択してください。</p>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2">
            <!-- TODO: 選択した家計簿が持っているカテゴリを選択できるようにする -->
            <select
              class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            >
              <option value="1">カテゴリ1</option>
              <option value="2">カテゴリ2</option>
              <option value="3">カテゴリ3</option>
            </select>
          </div>
        </div>

        <p class="text-sm font-bold text-red-500 dark:text-red-400">
          取り消しはできないので、注意してください。
        </p>
      </div>
    </template>

    <template #buttons>
      <SecondaryButton class="w-24" @click="handleReceiptTransfer.closeModal"
        >閉じる</SecondaryButton
      >
      <PrimaryButton class="" @click="onClickTransfer">支出に反映する</PrimaryButton>
    </template>
  </BaseModal>
</template>
