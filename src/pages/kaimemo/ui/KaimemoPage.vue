<script setup lang="ts">
  import { useInteraction } from '../hooks/useInteraction'
  import { useRouter } from 'vue-router'
  import {
    BaseModal,
    TheForm,
    PrimaryButton,
    SecondaryButton,
    PlusButton
  } from '@/shared/ui'
  import { ShoppingMemoItem } from '@/entities/shopping'
  import TagFilter from './TagFilter.vue'
  import { HouseHoldTile } from '@/features/shopping'

  const router = useRouter()
  const {
    isOpenModal,
    errors,
    selectedFilters,
    filteredItems,
    householdBooks,
    defineField,
    onClickOpenAddItemModal,
    onClickCloseAddItemModal,
    onClickAddItem,
    onClickArchiveItem,
    selectedHouseholdBook,
    selectedCategoryLimit
  } = useInteraction(router)

  const [name, nameProps] = defineField('name')
  const [tag, tagProps] = defineField('tag')
</script>

<template>
  <HouseHoldTile
    :householdBooks="householdBooks"
    v-model="selectedHouseholdBook"
  />

  <div>
    <TagFilter
      v-model="selectedFilters"
      :categoryLimit="selectedCategoryLimit"
    />

    <hr class="my-4" />

    <div class="">
      <div
        v-for="item in filteredItems"
        :key="item.id"
      >
        <ShoppingMemoItem
          :shoppingMemo="item"
          @click="onClickArchiveItem"
        />
      </div>
    </div>
    <PlusButton
      @click="onClickOpenAddItemModal"
      class="fixed bottom-20 right-4"
    />

    <!-- 買い物追加モーダル -->
    <BaseModal
      title="アイテム追加"
      :isOpen="isOpenModal"
      @closeModal="onClickCloseAddItemModal"
    >
      <template #modalBody>
        <TheForm label="品名">
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-base"
            :class="{
              'bg-red-50 border-red-500': errors.name
            }"
            v-model="name"
            v-bind="nameProps"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ errors.name }}
          </p>
        </TheForm>
        <TheForm label="カテゴリ">
          <select
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-base"
            :class="{
              'bg-red-50 border-red-500': errors.tag
            }"
            v-model="tag"
            v-bind="tagProps"
          >
            <template
              v-for="categoryLimit in selectedCategoryLimit"
              :key="categoryLimit.category?.id || 0"
            >
              <option :value="categoryLimit.category?.id || 0">
                {{ categoryLimit.category?.name || '' }}
              </option>
            </template>
          </select>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ errors.tag }}
          </p>
        </TheForm>
      </template>

      <template #buttons>
        <SecondaryButton @click="onClickCloseAddItemModal">
          閉じる
        </SecondaryButton>
        <PrimaryButton @click="onClickAddItem">追加</PrimaryButton>
      </template>
    </BaseModal>
    <!--  -->
  </div>
</template>
