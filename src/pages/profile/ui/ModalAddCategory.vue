<script setup lang="ts">
import { BaseModal, TheForm, PrimaryButton, SecondaryButton } from '@/shared/ui';

defineProps<{
    isOpenModal: boolean
}>()

defineEmits<{
    closeModal: []
    addCategory: []
}>()

</script>

<template>
    <BaseModal title="カテゴリ追加" :isOpen="isOpenModal" @closeModal="$emit('closeModal')"
    verticalPosition="top-20"
    >
        <template #modalBody>
            <TheForm label="カテゴリ名">
                <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />  
            </TheForm>
            <TheForm label="上限値">
                <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />  
            </TheForm>
        </template>
        <template #buttons>
            <PrimaryButton @click="$emit('addCategory')">
                追加
            </PrimaryButton>
            <SecondaryButton @click="$emit('closeModal')">
                閉じる
            </SecondaryButton>
        </template>
    </BaseModal>

</template>