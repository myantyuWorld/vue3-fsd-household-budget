<script setup lang="ts">
  import type { components } from '@/shared/api/v1'
  import {
    BaseModal,
    PrimaryButton,
    SecondaryButton,
    TheForm
  } from '@/shared/ui'
  import { useCreateInformation } from '@/features/admin/information/hooks/useCreateInformation'

  defineProps<{
    isOpen: boolean
    information?: components['schemas']['Information']
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const { defineField, errors, onClickCreateInformation } =
    useCreateInformation()

  const [title, titleProps] = defineField('title')
  const [content, contentProps] = defineField('content')
  const [category, categoryProps] = defineField('category')
</script>

<template>
  <BaseModal
    :isOpen="isOpen"
    title="お知らせ追加"
    @close="emit('close')"
    class="backdrop-blur-md"
  >
    <template #modalBody>
      <div class="bg-gradient-to-br from-primary-bg to-white/50 rounded-2xl">
        <TheForm label="タイトル">
          <input
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.title
            }"
            v-model="title"
            v-bind="titleProps"
          />
          <p class="mt-2 text-sm text-red-600">
            {{ errors.title }}
          </p>
        </TheForm>
        <TheForm label="内容">
          <input
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.content
            }"
            v-model="content"
            v-bind="contentProps"
          />
          <p class="mt-2 text-sm text-red-600">
            {{ errors.content }}
          </p>
        </TheForm>
        <TheForm label="カテゴリ">
          <select
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.category
            }"
            v-model="category"
            v-bind="categoryProps"
          >
            <option value="bug_report">バグ報告</option>
            <option value="feature_request">機能要望</option>
            <option value="other">その他</option>
          </select>
          <p class="mt-2 text-sm text-red-600">
            {{ errors.category }}
          </p>
        </TheForm>
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
          @click="onClickCreateInformation"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
        >
          作成
        </PrimaryButton>
      </div>
    </template>
  </BaseModal>
</template>
