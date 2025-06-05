<script setup lang="ts">
import { BaseModal, PrimaryButton, SecondaryButton } from '@/shared/ui'
import { DELETE } from '@/shared/api'

const props = defineProps<{
  householdID: number
  shoppingRecordID: number
  isOpenDeleteModal: boolean
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
  (e: 'fetchShoppingRecords'): void
}>()

const onClickCloseDeleteConfirmModal = () => {
  emit('closeModal')
}

const onClickDeleteAmountRecord = async () => {
  const { error } = await DELETE('/household/{householdID}/shopping/record/{shoppingID}', {
    params: {
      path: { householdID: props.householdID, shoppingID: props.shoppingRecordID },
    },
  })

  if (error) {
    console.error(error)
    return
  }

  emit('fetchShoppingRecords')
  emit('closeModal')
}
</script>

<template>
  <BaseModal
    title="金額削除"
    :isOpen="isOpenDeleteModal"
    @closeModal="onClickCloseDeleteConfirmModal"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <div class="space-y-8 bg-gradient-to-br from-primary-bg to-white/50 rounded-2xl">
        <p class="text-gray-800">本当に削除しますか？</p>
      </div>
    </template>

    <template #buttons>
      <div class="flex justify-end gap-4">
        <SecondaryButton
          @click="onClickCloseDeleteConfirmModal"
          class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
        >
          閉じる
        </SecondaryButton>

        <PrimaryButton
          @click="onClickDeleteAmountRecord"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
        >
          削除
        </PrimaryButton>
      </div>
    </template>
  </BaseModal>
</template>
