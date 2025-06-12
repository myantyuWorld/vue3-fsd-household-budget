<script setup lang="ts">
import type { components } from '@/shared/api/v1'
import { BaseModal, SecondaryButton } from '@/shared/ui'

defineProps<{
  isOpen: boolean
  information?: components['schemas']['Information']
}>()
</script>

<template>
  <BaseModal :isOpen="isOpen" title="本当に削除しますか？" @close="$emit('close')">
    <template #modal-body>
      <div>
        <h1>DeleteConfirmModal</h1>
      </div>
    </template>

    <template #buttons>
      <SecondaryButton @click="$emit('close')">閉じる</SecondaryButton>
    </template>
  </BaseModal>
</template>
