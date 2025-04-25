<script setup lang="ts">
defineProps<{
    categoryName: string
}>()
</script>

<template>
    <div
        class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
        <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {{ categoryName.charAt(0) }}
        </span>
    </div>
</template>