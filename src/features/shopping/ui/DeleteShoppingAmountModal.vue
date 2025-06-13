<script setup lang="ts">
  import { BaseModal, PrimaryButton, SecondaryButton } from '@/shared/ui'

  const props = defineProps<{
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'delete'): void
  }>()
</script>

<template>
  <BaseModal
    title="金額削除"
    :isOpen="props.isOpen"
    @closeModal="emit('close')"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <div
        class="space-y-8 bg-gradient-to-br from-primary-bg to-white/50 rounded-2xl"
      >
        <p class="text-gray-800">本当に削除しますか？</p>
      </div>
    </template>

    <template #buttons>
      <div class="flex justify-end gap-4">
        <SecondaryButton
          @click="emit('close')"
          class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
        >
          閉じる
        </SecondaryButton>

        <PrimaryButton
          @click="emit('delete')"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
        >
          削除
        </PrimaryButton>
      </div>
    </template>
  </BaseModal>
</template>
