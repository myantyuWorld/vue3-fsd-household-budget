<script setup lang="ts">
import type { components } from "@/shared/api/v1";
import { PrimaryButton } from "@/shared/ui";
import ShareIcon from "@/shared/ui/icons/ShareIcon.vue";

defineProps<{
    householdBook: components['schemas']['HouseholdBook']
}>()

const emit = defineEmits<{
    update: []
    share: [id:number]
}>()

const title = defineModel<string>('title')


</script>

<template>
    <div
        class="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-2 rounded-xl shadow-sm transform hover:scale-[1.01] transition-all duration-300 overflow-hidden">
        <input type="text" v-model="title"
            class="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 px-4 py-3 rounded-xl flex-1 min-w-0" />
        <div class="flex items-center space-x-4 shrink-0">
            <PrimaryButton @click="emit('update')"
                class="bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-300">
                更新
            </PrimaryButton>
            <PrimaryButton @click="emit('share', householdBook.id)"
                class="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-transform duration-300">
                <ShareIcon class="w-6 h-6" />
            </PrimaryButton>
        </div>
    </div>
</template>
