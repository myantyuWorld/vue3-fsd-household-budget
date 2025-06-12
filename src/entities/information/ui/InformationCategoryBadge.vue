<script setup lang="ts">
defineProps<{
  category: 'bug_report' | 'feature_request' | 'other'
}>()

const categoryMap = {
  bug_report: '不具合修正',
  feature_request: '機能追加',
  other: 'その他',
}
</script>

<template>
  <span
    class="px-2 py-1 rounded-md text-xs font-medium"
    :class="
      category === 'bug_report'
        ? 'bg-red-100 text-red-800'
        : category === 'feature_request'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-gray-100 text-gray-800'
    "
  >
    {{ categoryMap[category] }}
  </span>
</template>
