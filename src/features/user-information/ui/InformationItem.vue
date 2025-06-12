<script setup lang="ts">
import type { components } from '@/shared/api/v1'
import { ref } from 'vue'
import InformationCategoryBadge from '@/entities/information/ui/InformationCategoryBadge.vue'

defineProps<{
  information: components['schemas']['UserInformation']
}>()

const isExpanded = ref(false)
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex items-center gap-3">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <InformationCategoryBadge :category="information.category" />
            <div class="text-lg font-semibold text-gray-800">{{ information.title }}</div>
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                information.isRead ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600',
              ]"
              class="ml-auto"
            >
              {{ information.isRead ? '既読' : '未読' }}
            </span>
          </div>
          <div class="text-sm text-gray-600 break-words" :class="{ 'line-clamp-2': !isExpanded }">
            {{ information.content }}
          </div>
          <a
            v-if="information.content.length > 20"
            class="text-green-500 hover:text-green-700 text-sm mt-1 cursor-pointer block text-right"
            @click="isExpanded = !isExpanded"
          >
            {{ isExpanded ? '閉じる' : 'もっと読む' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
