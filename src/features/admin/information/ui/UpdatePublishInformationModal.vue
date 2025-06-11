<script setup lang="ts">
import type { components } from '@/shared/api/v1'
import { BaseModal, SecondaryButton } from '@/shared/ui'
import { usePublishedInformation } from '@/features/admin/information/hooks/usePublishedinformation'

defineProps<{
  isOpen: boolean
  information?: components['schemas']['Information']
}>()

const emit = defineEmits<{
  close: []
}>()

const { onClickUpdatePublishInformation: onClickUpdatePublishInformationUseCase } =
  usePublishedInformation()

const onClickUpdatePublishInformation = async (id: number | undefined) => {
  console.log('onClickUpdatePublishInformation', id)
  if (!id) return
  await onClickUpdatePublishInformationUseCase(id)

  emit('close')
}
</script>

<template>
  <BaseModal :isOpen="isOpen" title="公開状態を更新" @close="$emit('close')">
    <template #modalBody>
      <div>
        <h1>UpdatePublishInformationModal</h1>
      </div>
      <div>開発中</div>
    </template>

    <template #buttons>
      <SecondaryButton @click="onClickUpdatePublishInformation(information?.id)">
        公開
      </SecondaryButton>
      <SecondaryButton @click="$emit('close')">閉じる</SecondaryButton>
    </template>
  </BaseModal>
</template>
