<script setup lang="ts">
import type { components } from '@/shared/api/v1';


defineProps<{
    shoppingRecord: components['schemas']['ShoppingRecord']
}>()

defineEmits<{
    click: [id: number]
}>()

</script>
<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div
                class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {{ shoppingRecord.category.name.charAt(0) }}
                </span>
            </div>

            <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ shoppingRecord.date }}</p>
                <p class="font-medium text-gray-700 dark:text-gray-200">{{ shoppingRecord.category.name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ shoppingRecord.memo.length > 10 ?
                    shoppingRecord.memo.slice(0, 10) + '...' : shoppingRecord.memo }}</p>
            </div>

        </div>
        <div class="text-right">
            <p class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                ¥{{ shoppingRecord.amount.toLocaleString() }}
            </p>

        </div>
        <div>
            <button @click="$emit('click', shoppingRecord.id)"
                class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>
        </div>
    </div>
</template>