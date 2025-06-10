<script setup lang="ts">
import { ExpenseCalendar } from '@/features/expense-calendar'
import { HouseholdTile } from '@/entities/household'
// TODO: features/kaimemo-summaryという状態にしたい
import { useInteraction } from '@/pages/kaimemo-summary/hooks/useInteraction'
// TODO: expense、というfeaturesの"monthlyHeader"としたい
import MonthlyHeader from '@/pages/kaimemo-summary/ui/MonthlyHeader.vue'
// TODO: expense、というfeaturesの"shoppingCategoryBudgetRemain"としたい
import ShoppingCategoryBudgetRemain from '@/entities/shopping/ui/ShoppingCategoryBudgetRemain.vue'
import { GridCol3 } from '@/shared/ui/layouts'

const {
  operatingCurrentDate,
  summarizeShoppingAmounts,
  summarizeCategoryLimitAmount,
  householdBooks,
  selectedHouseholdBook,
  selectedShoppingAmounts,
  selectedCategoryNumber,
  onClickMonthlyPrev,
  onClickMonthlyNext,
  onClickCategoryAmount,
} = useInteraction()
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
    </div>

    <ExpenseCalendar :shoppingAmounts="selectedShoppingAmounts ?? []" />
  </div>
</template>
