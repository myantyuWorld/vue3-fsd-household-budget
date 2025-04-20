<script setup lang="ts">
import { useInteraction } from '../hooks/useInteraction'
import { BaseModal, TheForm, PrimaryButton, SecondaryButton, PlusButton } from '@/shared/ui'
import KaimemoItem from './KaimemoItem.vue'
import TagFilter from './TagFilter.vue'

const {
  isOpenModal,
  errors,
  selectedFilters,
  filteredItems,
  loading,
  householdBooks,
  defineField,
  onClickOpenAddItemModal,
  onClickCloseAddItemModal,
  onClickAddItem,
  onClickArchiveItem,
  selectedHouseholdBook,
} = useInteraction()

const [name, nameProps] = defineField('name')
const [tag, tagProps] = defineField('tag')

</script>

<template>
  <div class="m-4"> 
    <TheForm label="家計簿">
      <select v-model="selectedHouseholdBook" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="householdBook in householdBooks" :key="householdBook.id" :value="householdBook">{{ householdBook.title }}</option>
      </select>
    </TheForm>
  </div>
    <div class="m-4">
    <select v-model="selectedHouseholdBook.categoryLimit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-for="categoryLimit in selectedHouseholdBook.categoryLimit" :key="categoryLimit.category.id" :value="categoryLimit.category.id">{{ categoryLimit.category.name }}</option>
    </select>
  </div>
  <div>
    <TagFilter v-model="selectedFilters" />

    <div class="">
      <template v-if="loading"> データ取得中、、、 </template>
      <template v-else-if="filteredItems?.length === 0"> データがありません。 </template>
      <div v-else>
        <template v-for="item in filteredItems" :key="item.id">
          <KaimemoItem
            :item="item"
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
            <template v-for="categoryLimit in selectedHouseholdBook.categoryLimit" :key="categoryLimit.category.id">
              <option :value="categoryLimit.category.id">{{ categoryLimit.category.name }}</option>
            </template>
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
