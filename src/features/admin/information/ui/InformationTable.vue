<script setup lang="ts">
  import type { components } from '@/shared/api/v1'
  import { BaseTableCell, BaseTableHeader } from '@/shared/ui'
  import { InformationCategoryBadge } from '@/entities/information'
  import { ref } from 'vue'

  defineProps<{
    information?: components['schemas']['Information'][]
  }>()

  defineEmits<{
    openUpdatePublishInformationModal: [id: number]
    openDeleteConfirmModal: [id: number]
  }>()

  const isExpanded = ref(false)
</script>

<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <BaseTableHeader>ID</BaseTableHeader>
        <BaseTableHeader>カテゴリ</BaseTableHeader>
        <BaseTableHeader>タイトル</BaseTableHeader>
        <BaseTableHeader>内容</BaseTableHeader>
        <BaseTableHeader>公開状態</BaseTableHeader>
        <BaseTableHeader>操作</BaseTableHeader>
      </tr>
    </thead>

    <tbody class="bg-white divide-y divide-gray-200">
      <tr
        v-for="item in information"
        :key="item.id"
      >
        <BaseTableCell>{{ item.id }}</BaseTableCell>
        <BaseTableCell>
          <InformationCategoryBadge :category="item.category || 'other'" />
        </BaseTableCell>
        <BaseTableCell>{{ item.title }}</BaseTableCell>
        <BaseTableCell class="!whitespace-normal">
          <div class="relative">
            <div
              :class="['break-words w-96', isExpanded ? '' : 'line-clamp-3']"
            >
              {{ item.content || '' }}
            </div>
            <button
              v-if="(item.content || '').length > 300"
              class="text-indigo-600 hover:text-indigo-900 text-sm mt-1"
              @click="isExpanded = !isExpanded"
            >
              {{ isExpanded ? '閉じる' : 'もっと読む' }}
            </button>
          </div>
        </BaseTableCell>
        <BaseTableCell>
          {{ item.isPublished ? '公開' : '非公開' }}
        </BaseTableCell>
        <BaseTableCell>
          <button class="text-indigo-600 hover:text-indigo-900 mr-2">
            編集
          </button>
          <button
            class="text-red-600 hover:text-red-900 mr-2"
            @click="$emit('openDeleteConfirmModal', item.id || 0)"
          >
            削除
          </button>
          <button
            class="text-red-600 hover:text-red-900 mr-2"
            @click="$emit('openUpdatePublishInformationModal', item.id || 0)"
          >
            公開
          </button>
        </BaseTableCell>
      </tr>
    </tbody>
  </table>
</template>
