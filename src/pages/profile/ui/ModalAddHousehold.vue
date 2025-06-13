<script setup lang="ts">
  import {
    BaseModal,
    TheForm,
    PrimaryButton,
    SecondaryButton
  } from '@/shared/ui'
  defineProps<{
    isOpenModal: boolean
  }>()

  defineEmits<{
    closeModal: []
    addHousehold: []
  }>()
</script>

<template>
  <BaseModal
    title="家計簿追加"
    :isOpen="isOpenModal"
    @closeModal="$emit('closeModal')"
    verticalPosition="top-20"
  >
    <template #modalBody>
      <TheForm label="家計簿名">
        <input
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </TheForm>
      <TheForm label="説明">
        <textarea
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </TheForm>
      <TheForm label="カテゴリ">
        <p>
          家計簿作成時に、デフォルトで日用品・食費が追加されます。追加したい場合は、家計簿作成後、カテゴリ追加から追加してください。
        </p>
      </TheForm>
    </template>
    <template #buttons>
      <PrimaryButton @click="$emit('addHousehold')">追加</PrimaryButton>
      <SecondaryButton @click="$emit('closeModal')">閉じる</SecondaryButton>
    </template>
  </BaseModal>
</template>
