<script setup lang="ts">
import { formatYearMonth } from '@/shared/util/string'
import { GridCol2 } from '@/shared/ui/layouts'

defineProps<{
    operatingCurrentDate: Date
    summarizeAmount: number
    summarizeCategoryLimitAmount: number
}>()

defineEmits<{
    clickMonthlyPrev: []
    clickMonthlyNext: []
}>()
</script>

<template>
    <div class="max-w-4xl mx-auto flex items-center justify-between">
        <button @click="$emit('clickMonthlyPrev')"
            class="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 via-pink-100 to-purple-100 dark:from-indigo-900 dark:via-pink-900 dark:to-purple-900 text-indigo-600 dark:text-indigo-400 hover:from-indigo-200 hover:via-pink-200 hover:to-purple-200 dark:hover:from-indigo-800 dark:hover:via-pink-800 dark:hover:to-purple-800 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="group-hover:translate-x-1 transition-transform duration-300">
                <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"/>
            </svg>
        </button>

        <div class="flex items-center gap-4">
            <router-link :to="`/summary/calender/2025-02`"
                class="group flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <h1
                    class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 dark:from-indigo-400 dark:via-pink-400 dark:to-purple-400">
                    {{ formatYearMonth(operatingCurrentDate) }}
                </h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                    class="text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300">
                    <path fill="currentColor"
                        d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5zM5 8h14V6H5zm0 0V6z" />
                </svg>
            </router-link>
        </div>

        <button @click="$emit('clickMonthlyNext')"
            class="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-600 dark:text-indigo-400 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800 dark:hover:to-purple-800 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="group-hover:translate-x-1 transition-transform duration-300">
                <path fill="currentColor" d="M10.59 16.59L12 18l6-6l-6-6l-1.41 1.41L13.17 12z"/>
            </svg>
        </button>
    </div>

    <GridCol2>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">今月の支出</p>
                <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">¥{{ summarizeAmount.toLocaleString() }}</p>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">今月の予算</p>
                <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">¥{{ summarizeCategoryLimitAmount.toLocaleString() }}</p>
            </div>
        </div>
    </GridCol2>
</template>