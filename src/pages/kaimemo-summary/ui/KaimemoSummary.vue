<script setup lang="ts">
import { BaseModal, PlusButton, PrimaryButton, SecondaryButton, TheForm } from '@/shared/ui'
import { GridCol3 } from '@/shared/ui/layouts'
import { useInteraction } from '../hooks/useInteraction'
import { ShoppingAmountItem, ShoppingCategoryBudgetRemain } from '@/entities/shopping'
import MonthlyHeader from './MonthlyHeader.vue'
import { HouseholdTile } from '@/entities/household'

const {
  isOpenModal,
  operatingCurrentDate,
  errors,
  categories,
  summarizeShoppingAmounts,
  summarizeCategoryLimitAmount,
  householdBooks,
  selectedHouseholdBook,
  defineField,
  onClickAddAmountModal,
  onClickCloseAmountModal,
  onClickMonthlyPrev,
  onClickMonthlyNext,
  onClickCreateShoppingRecord,
  onClickDeleteAmountRecord,
  isOpenDeleteModal,
  onClickCloseDeleteConfirmModal,
  onClickOpenDeleteConfirmModal,
} = useInteraction()

const [amount, amountProps] = defineField('amount')
const [tag, tagProps] = defineField('tag')
const [date, dateProps] = defineField('date')
const [memo, memoProps] = defineField('memo')
</script>

<template>
  <HouseholdTile :householdBooks="householdBooks" v-model="selectedHouseholdBook" />
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
    <div class="sticky top-14 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg p-4">
      <MonthlyHeader :operatingCurrentDate="operatingCurrentDate"
        :summarizeAmount="summarizeShoppingAmounts?.totalAmount ?? 0"
        :summarizeCategoryLimitAmount="summarizeCategoryLimitAmount" @clickMonthlyPrev="onClickMonthlyPrev"
        @clickMonthlyNext="onClickMonthlyNext" />
    </div>

    <div class="max-w-4xl mx-auto p-4 space-y-4">
      <GridCol3>
        <ShoppingCategoryBudgetRemain v-for="categoryAmount in summarizeShoppingAmounts?.categoryAmounts"
          :key="categoryAmount.category.id" :categoryAmount="categoryAmount" :limitAmount="19000" />
      </GridCol3>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="shoppingRecord in summarizeShoppingAmounts?.shoppingAmounts" :key="shoppingRecord.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <ShoppingAmountItem :shoppingRecord="shoppingRecord" @click="onClickOpenDeleteConfirmModal(shoppingRecord.id)" />
        </div>
      </div>
    </div>

    <PlusButton @click="onClickAddAmountModal"
      class="fixed bottom-8 right-8 transform hover:scale-110 transition-transform duration-300" />

    <BaseModal title="金額追加" :isOpen="isOpenModal" @closeModal="onClickCloseAmountModal" class="backdrop-blur-md"
      verticalPosition="top-0" horizontalPosition="left-0">
      <template #modalBody>
        <div class="space-y-8 p-8 bg-gradient-to-br from-indigo-50/50 via-pink-50/50 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-700/50 rounded-xl">
          <TheForm label="日付">
            <input type="date"
              class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              :class="{ 'bg-red-50/80 border-red-500': errors.date }" v-model="date" v-bind="dateProps" />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.date }}</p>
          </TheForm>

          <TheForm label="カテゴリ">
            <select
              class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              :class="{ 'bg-red-50/80 border-red-500': errors.tag }" v-model="tag" v-bind="tagProps">
              <template v-for="categoryLimit in categories" :key="categoryLimit.category.id">
                <option :value="categoryLimit.category.id">{{ categoryLimit.category.name }}</option>
              </template>
            </select>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.tag }}</p>
          </TheForm>

          <TheForm label="金額">
            <input type="number"
              class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              :class="{ 'bg-red-50/80 border-red-500': errors.amount }" v-model="amount" v-bind="amountProps" />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.amount }}</p>
          </TheForm>

          <TheForm label="メモ">
            <textarea
              class="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm min-h-[100px]"
              :class="{ 'bg-red-50/80 border-red-500': errors.memo }" v-model="memo" v-bind="memoProps" />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.memo }}</p>
          </TheForm>
        </div>
      </template>

      <template #buttons>
        <div class="flex justify-end gap-4 p-6">
          <SecondaryButton @click="onClickCloseAmountModal"
            class="px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
            閉じる
          </SecondaryButton>
          <PrimaryButton @click="onClickCreateShoppingRecord"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 hover:from-indigo-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            追加
          </PrimaryButton>
        </div>
      </template>
    </BaseModal>

    <BaseModal title="金額削除" :isOpen="isOpenDeleteModal" @closeModal="onClickCloseDeleteConfirmModal"
      class="backdrop-blur-md" verticalPosition="top-0" horizontalPosition="left-0">
      <template #modalBody>
        <div class="space-y-8 bg-gradient-to-br from-indigo-50/50 via-pink-50/50 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-700/50 rounded-xl">
          <p>本当に削除しますか？</p>
        </div>
      </template>
      
      <template #buttons>
        <div class="flex justify-end gap-4">
          <SecondaryButton @click="onClickCloseDeleteConfirmModal"
            class="px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
            閉じる
          </SecondaryButton>
          
          <PrimaryButton @click="onClickDeleteAmountRecord"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 hover:from-indigo-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            削除
          </PrimaryButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
