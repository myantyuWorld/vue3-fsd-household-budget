<script setup lang="ts">
import { useInteraction } from '../hooks/useInteraction'
import { BaseModal, TheForm, PrimaryButton, SecondaryButton, PlusButton } from '@/shared/ui'
import KaimemoItem from './KaimemoItem.vue'
import TagFilter from './TagFilter.vue'
import { useSessionStore } from '@/entities/session/model/session-store'

const sessionStore = useSessionStore()

const {
  isOpenModal,
  errors,
  selectedFilters,
  filteredItems,
  loading,
  defineField,
  onClickOpenAddItemModal,
  onClickCloseAddItemModal,
  onClickAddItem,
  onClickArchiveItem,
} = useInteraction()

const [name, nameProps] = defineField('name')
const [tag, tagProps] = defineField('tag')

const user = sessionStore.user
console.log(user)
</script>

<template>
  <div>
    <TagFilter v-model="selectedFilters" />

    <div class="">
      <template v-if="loading"> データ取得中、、、 </template>
      <template v-else-if="filteredItems?.length === 0"> データがありません。 </template>
      <div v-else>
        <template v-for="item in filteredItems" :key="item.id">
          <KaimemoItem
            :id="item.id"
            :tag="item.tag"
            :name="item.name"
            :done="item.done"
            @handleDoneItem="onClickArchiveItem"
          ></KaimemoItem>
        </template>
      </div>
    </div>

    <PlusButton @click="onClickOpenAddItemModal" />

    <!-- 買い物追加モーダル -->
    <BaseModal title="アイテム追加" :isOpen="isOpenModal" @closeModal="onClickCloseAddItemModal">
      <template #modalBody>
        <TheForm label="品名">
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            :class="{ 'bg-red-50 border-red-500': errors.name }"
            v-model="name"
            v-bind="nameProps"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.name }}</p>
        </TheForm>
        <TheForm label="カテゴリ">
          <select
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            :class="{ 'bg-red-50 border-red-500': errors.tag }"
            v-model="tag"
            v-bind="tagProps"
          >
            <option value="食費">食費</option>
            <option value="日用品">日用品</option>
          </select>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.tag }}</p>
        </TheForm>
      </template>

      <template #buttons>
        <SecondaryButton @click="onClickCloseAddItemModal"> 閉じる </SecondaryButton>
        <PrimaryButton @click="onClickAddItem"> 追加 </PrimaryButton>
      </template>
    </BaseModal>
    <!--  -->
  </div>
</template>
