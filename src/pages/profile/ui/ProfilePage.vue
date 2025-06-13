<script setup lang="ts">
  import {
    TheForm,
    TheCard,
    PrimaryButton,
    SecondaryButton,
    BaseModal
  } from '@/shared/ui'
  import { useInteraction } from '../hooks/useInteraction'
  import HouseHoldHeaderTile from './HouseHoldHeaderTile.vue'
  import HouseHoldCategories from './HouseHoldCategories.vue'

  const {
    user,
    defineField,
    errors,
    isOpenModalAddCategory,
    isOpenModalAddHousehold,
    defineFieldHousehold,
    errorsHousehold,
    onClickOpenAddHouseholdModal,
    onClickCloseAddHouseholdModal,
    onClickOpenAddCategoryModal,
    onClickCloseAddItemModal,
    handleAddCategory,
    handleAddHousehold,
    handleShareHouseHoldLink
  } = useInteraction()

  const [name, nameProps] = defineField('name')
  const [limitAmount, limitAmountProps] = defineField('limitAmount')
  const [title, titleProps] = defineFieldHousehold('title')
  const [description, descriptionProps] = defineFieldHousehold('description')
</script>

<template>
  <div class="p-2 min-h-screen">
    <!-- プロフィールセクション -->
    <TheCard
      class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 transform hover:scale-[1.02] transition-all duration-300"
    >
      <div class="flex items-center space-x-6">
        <div class="relative">
          <img
            :src="user.pictureURL"
            class="w-12 h-12 rounded-full ring-4 ring-white dark:ring-gray-600 shadow-xl transform hover:rotate-6 transition-transform duration-300"
          />
          <div
            class="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"
          ></div>
        </div>
        <div>
          <h1
            class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            {{ user.name }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            プロフィール
          </p>
        </div>
      </div>
    </TheCard>

    <!-- 家計簿セクション -->
    <TheCard
      class="bg-white dark:bg-gray-800 shadow-2xl rounded-xl backdrop-blur-sm"
    >
      <ul class="space-y-2">
        <li
          v-for="householdBook in user.householdBooks"
          :key="householdBook.id"
          class="space-y-2"
        >
          <HouseHoldHeaderTile
            :householdBook="householdBook"
            @share="handleShareHouseHoldLink(householdBook.id)"
            @add="onClickOpenAddHouseholdModal"
            v-model:title="householdBook.title"
          />
          <HouseHoldCategories
            :householdBook="householdBook"
            @click="onClickOpenAddCategoryModal(householdBook.id)"
          />
        </li>
      </ul>
    </TheCard>

    <!-- カテゴリ追加モーダル -->
    <BaseModal
      title="カテゴリ追加"
      :isOpen="isOpenModalAddCategory"
      @closeModal="onClickCloseAddItemModal"
      verticalPosition="top-20"
      horizontalPosition="left-0"
    >
      <template #modalBody>
        <div
          class="space-y-8 p-8 bg-gradient-to-br from-indigo-50/50 via-pink-50/50 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-700/50 rounded-xl"
        >
          <TheForm label="カテゴリ名">
            <input
              type="text"
              class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-base"
              :class="{
                'bg-red-50/80 border-red-500': errors.name
              }"
              v-model="name"
              v-bind="nameProps"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {{ errors.name }}
            </p>
          </TheForm>
          <TheForm label="上限値">
            <input
              type="number"
              class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-base"
              :class="{
                'bg-red-50/80 border-red-500': errors.limitAmount
              }"
              v-model="limitAmount"
              v-bind="limitAmountProps"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {{ errors.limitAmount }}
            </p>
          </TheForm>
        </div>
      </template>
      <template #buttons>
        <div class="flex justify-end gap-4 p-6">
          <SecondaryButton
            @click="onClickCloseAddItemModal"
            class="px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            閉じる
          </SecondaryButton>
          <PrimaryButton @click="handleAddCategory">追加</PrimaryButton>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      title="家計簿追加"
      :isOpen="isOpenModalAddHousehold"
      @closeModal="onClickCloseAddHouseholdModal"
      verticalPosition="top-20"
    >
      <template #modalBody>
        <TheForm label="家計簿名">
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            v-model="title"
            v-bind="titleProps"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ errorsHousehold.title }}
          </p>
        </TheForm>
        <TheForm label="説明">
          <textarea
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            v-model="description"
            v-bind="descriptionProps"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ errorsHousehold.description }}
          </p>
        </TheForm>
      </template>
      <template #buttons>
        <PrimaryButton @click="handleAddHousehold">追加</PrimaryButton>
        <SecondaryButton @click="onClickCloseAddHouseholdModal">
          閉じる
        </SecondaryButton>
      </template>
    </BaseModal>
  </div>
</template>
