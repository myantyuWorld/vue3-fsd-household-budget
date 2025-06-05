<script setup lang="ts">
import { CameraButton, PencilButton, PlusButton } from '@/shared/ui'
import { GridCol3 } from '@/shared/ui/layouts'
import { useInteraction } from '../hooks/useInteraction'
import {
  DeleteShoppingItemModal,
  DirectInputModal,
  MonthlyHeader,
  ShoppingCategoryBudgetRemain,
  ShoppingAmountItem,
} from '@/entities/kaimemo-summary'
import { ReceiptAnalyzeModal } from '@/entities/analyze'
import { HouseholdTile } from '@/entities/household'
import { ref } from 'vue'

const {
  operatingCurrentDate,
  categories,
  summarizeShoppingAmounts,
  summarizeCategoryLimitAmount,
  householdBooks,
  selectedHouseholdBook,
  selectedShoppingAmounts,
  selectedCategoryNumber,
  deleteId,
  amountModal,
  deleteConfirmModal,
  receiptAnalyzeModal,
  updateSummarizeShoppingAmounts,
  onClickMonthlyPrev,
  onClickMonthlyNext,
  onClickCategoryAmount,
} = useInteraction()

const openDeleteConfirmModal = (id: number) => {
  deleteId.value = id
  deleteConfirmModal.openModal()
}

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
            @click="openDeleteConfirmModal(shoppingRecord.id)"
          />
        </div>
      </div>
    </div>

    <PlusButton @click="toggleExpand" class="fixed bottom-20 right-4" />

    <div v-show="isExpanded">
      <PencilButton
        @click="amountModal.openModal"
        :isFixed="false"
        id="pencil-button"
        class="fixed bottom-40 right-4"
      />
      <CameraButton
        @click="receiptAnalyzeModal.openModal"
        :isFixed="false"
        id="camera-button"
        class="fixed bottom-20 right-24"
      />
    </div>

    <DirectInputModal
      :householdID="selectedHouseholdBook.id"
      :categories="categories"
      :isOpenModal="amountModal.isOpen.value"
      @closeModal="amountModal.closeModal"
      @fetchShoppingRecords="updateSummarizeShoppingAmounts"
    />

    <DeleteShoppingItemModal
      :householdID="selectedHouseholdBook.id"
      :shoppingRecordID="deleteId"
      :isOpenDeleteModal="deleteConfirmModal.isOpen.value"
      @closeModal="deleteConfirmModal.closeModal"
      @fetchShoppingRecords="updateSummarizeShoppingAmounts"
    />

    <ReceiptAnalyzeModal
      :householdID="selectedHouseholdBook.id"
      :isOpenReceiptAnalyzeModal="receiptAnalyzeModal.isOpen.value"
      :categories="categories"
      @closeModal="receiptAnalyzeModal.closeModal"
    />
  </div>
</template>
