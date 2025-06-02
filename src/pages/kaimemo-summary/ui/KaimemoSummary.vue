<script setup lang="ts">
import {
  BaseModal,
  PrimaryButton,
  SecondaryButton,
  TheForm,
  CameraButton,
  PencilButton,
  PlusButton,
} from '@/shared/ui'
import { GridCol3 } from '@/shared/ui/layouts'
import { useInteraction } from '../hooks/useInteraction'
import { ShoppingAmountItem, ShoppingCategoryBudgetRemain } from '@/entities/shopping'
import MonthlyHeader from './MonthlyHeader.vue'
import { HouseholdTile } from '@/entities/household'
import { ref } from 'vue'

const {
  isOpenModal,
  operatingCurrentDate,
  errors,
  categories,
  summarizeShoppingAmounts,
  summarizeCategoryLimitAmount,
  householdBooks,
  selectedHouseholdBook,
  selectedShoppingAmounts,
  selectedCategoryNumber,
  isOpenDeleteModal,
  isOpenReceiptAnalyzeModal,
  videoRef,
  defineField,
  onClickAddAmountModal,
  onClickCloseAmountModal,
  onClickMonthlyPrev,
  onClickMonthlyNext,
  onClickCreateShoppingRecord,
  onClickDeleteAmountRecord,
  onClickCloseDeleteConfirmModal,
  onClickOpenDeleteConfirmModal,
  onClickCategoryAmount,
  handleReceiptAnalyzeReception,
  onClickOpenReceiptAnalyzeModal,
  onClickCloseReceiptAnalyzeModal,
} = useInteraction()

const [amount, amountProps] = defineField('amount')
const [tag, tagProps] = defineField('tag')
const [date, dateProps] = defineField('date')
const [memo, memoProps] = defineField('memo')

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <HouseholdTile :householdBooks="householdBooks" v-model="selectedHouseholdBook" />
  <div class="min-h-screen bg-primary-bg">
    <div class="sticky top-14 z-10 backdrop-blur-md bg-white/90 shadow-soft p-4">
      <MonthlyHeader
        :operatingCurrentDate="operatingCurrentDate"
        :summarizeAmount="summarizeShoppingAmounts?.totalAmount ?? 0"
        :summarizeCategoryLimitAmount="summarizeCategoryLimitAmount"
        @clickMonthlyPrev="onClickMonthlyPrev"
        @clickMonthlyNext="onClickMonthlyNext"
      />
    </div>

    <div class="max-w-4xl mx-auto p-4 space-y-4">
      <GridCol3>
        <ShoppingCategoryBudgetRemain
          v-for="categoryAmount in summarizeShoppingAmounts?.categoryAmounts"
          :key="categoryAmount.category.id"
          :categoryAmount="categoryAmount"
          :limitAmount="categoryAmount.limitAmount"
          :selectedCategoryNumber="selectedCategoryNumber"
          @clickCategoryLimit="onClickCategoryAmount"
        />
      </GridCol3>

      <div class="grid grid-cols-1 gap-3">
        <div
          v-for="shoppingRecord in selectedShoppingAmounts"
          :key="shoppingRecord.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 border-1"
        >
          <ShoppingAmountItem
            :shoppingRecord="shoppingRecord"
            @click="onClickOpenDeleteConfirmModal(shoppingRecord.id)"
          />
        </div>
      </div>
    </div>
    <PlusButton @click="toggleExpand" class="fixed bottom-20 right-4" />
    <div v-show="isExpanded">
      <PencilButton
        @click="onClickAddAmountModal"
        :isFixed="false"
        id="pencil-button"
        class="fixed bottom-40 right-4"
      />
      <CameraButton
        @click="onClickOpenReceiptAnalyzeModal"
        :isFixed="false"
        id="camera-button"
        class="fixed bottom-20 right-24"
      />
    </div>

    <BaseModal
      title="金額追加"
      :isOpen="isOpenModal"
      @closeModal="onClickCloseAmountModal"
      class="backdrop-blur-md"
      verticalPosition="top-0"
      horizontalPosition="left-0"
    >
      <template #modalBody>
        <div class="bg-gradient-to-br from-primary-bg to-white/50 rounded-2xl">
          <TheForm label="日付">
            <input
              type="date"
              class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
              :class="{ 'border-red-500 bg-red-50/80': errors.date }"
              v-model="date"
              v-bind="dateProps"
            />
            <p class="mt-2 text-sm text-red-600">{{ errors.date }}</p>
          </TheForm>

          <TheForm label="カテゴリ">
            <select
              class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
              :class="{ 'border-red-500 bg-red-50/80': errors.tag }"
              v-model="tag"
              v-bind="tagProps"
            >
              <template v-for="categoryLimit in categories" :key="categoryLimit.category.id">
                <option :value="categoryLimit.category.id">
                  {{ categoryLimit.category.name }}
                </option>
              </template>
            </select>
            <p class="mt-2 text-sm text-red-600">{{ errors.tag }}</p>
          </TheForm>

          <TheForm label="金額">
            <input
              type="number"
              class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
              :class="{ 'border-red-500 bg-red-50/80': errors.amount }"
              v-model="amount"
              v-bind="amountProps"
            />
            <p class="mt-2 text-sm text-red-600">{{ errors.amount }}</p>
          </TheForm>

          <TheForm label="メモ">
            <textarea
              class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 min-h-[100px] text-base"
              :class="{ 'border-red-500 bg-red-50/80': errors.memo }"
              v-model="memo"
              v-bind="memoProps"
            />
            <p class="mt-2 text-sm text-red-600">{{ errors.memo }}</p>
          </TheForm>
        </div>
      </template>

      <template #buttons>
        <div class="flex justify-end gap-4">
          <SecondaryButton
            @click="onClickCloseAmountModal"
            class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
          >
            閉じる
          </SecondaryButton>
          <PrimaryButton
            @click="onClickCreateShoppingRecord"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
          >
            追加
          </PrimaryButton>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      title="金額削除"
      :isOpen="isOpenDeleteModal"
      @closeModal="onClickCloseDeleteConfirmModal"
      class="backdrop-blur-md"
      verticalPosition="top-0"
      horizontalPosition="left-0"
    >
      <template #modalBody>
        <div class="space-y-8 bg-gradient-to-br from-primary-bg to-white/50 rounded-2xl">
          <p class="text-gray-800">本当に削除しますか？</p>
        </div>
      </template>

      <template #buttons>
        <div class="flex justify-end gap-4">
          <SecondaryButton
            @click="onClickCloseDeleteConfirmModal"
            class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
          >
            閉じる
          </SecondaryButton>

          <PrimaryButton
            @click="onClickDeleteAmountRecord"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
          >
            削除
          </PrimaryButton>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      title="レシート分析"
      :isOpen="isOpenReceiptAnalyzeModal"
      @closeModal="onClickCloseReceiptAnalyzeModal"
      class="backdrop-blur-md"
      verticalPosition="top-0"
      horizontalPosition="left-0"
    >
      <template #modalBody>
        <video ref="videoRef" autoplay playsinline class="w-full h-full"></video>
      </template>
      <template #buttons>
        <div class="flex justify-end gap-4">
          <SecondaryButton
            @click="onClickCloseReceiptAnalyzeModal"
            class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
          >
            閉じる
          </SecondaryButton>

          <PrimaryButton
            @click="handleReceiptAnalyzeReception"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
          >
            分析
          </PrimaryButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
