<script setup lang="ts">
  import { useInteraction } from '@/features/admin/information/hooks/useInteraction'
  import {
    InformationModal,
    UpdatePublishInformationModal,
    InformationTable,
    DeleteConfirmModal
  } from '@/features/admin/information'
  import { PrimaryButton } from '@/shared/ui'
  import { ref } from 'vue'

  const {
    information,
    selectedInformation,
    isOpenInformationModal,
    isOpenUpdatePublishInformationModal,
    isOpenDeleteConfirmModal,
    handleInformationModal,
    handleUpdatePublishInformationModal,
    handleDeleteConfirmModal
  } = useInteraction()

  const selectedPublishStatus = ref(false)
</script>

<template>
  <div>
    <h1>お知らせ</h1>
    <div class="mb-4">
      <h2 class="text-lg font-medium text-gray-900 mb-4">検索条件</h2>
      <div class="flex gap-4">
        <div>
          <label
            for="publishStatus"
            class="block text-sm font-medium text-gray-700"
          >
            公開状態
          </label>
          <select
            id="publishStatus"
            v-model="selectedPublishStatus"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">すべて</option>
            <option :value="true">公開</option>
            <option :value="false">非公開</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mb-4 flex justify-end">
      <PrimaryButton @click="handleInformationModal.open">
        新規追加
      </PrimaryButton>
    </div>

    <div class="overflow-x-auto">
      <InformationTable
        :information="information"
        @openUpdatePublishInformationModal="
          handleUpdatePublishInformationModal.open($event)
        "
        @openDeleteConfirmModal="handleDeleteConfirmModal.open($event)"
      />
    </div>
  </div>

  <InformationModal
    :isOpen="isOpenInformationModal"
    :information="selectedInformation"
    @close="handleInformationModal.close"
  />
  <UpdatePublishInformationModal
    :isOpen="isOpenUpdatePublishInformationModal"
    :information="selectedInformation"
    @close="handleUpdatePublishInformationModal.close"
  />
  <DeleteConfirmModal
    :isOpen="isOpenDeleteConfirmModal"
    :information="selectedInformation"
    @close="handleDeleteConfirmModal.close"
  />
</template>
