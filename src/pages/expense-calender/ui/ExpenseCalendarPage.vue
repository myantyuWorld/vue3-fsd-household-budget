<script setup lang="ts">
  import { ExpenseCalendar } from '@/features/expense-calendar'
  import { useKaimemoSummary } from '@/features/shopping'
  import MonthlyHeader from '@/features/shopping/ui/MonthlyHeader.vue'
  import ShoppingCategoryBudgetRemain from '@/entities/shopping/ui/ShoppingCategoryBudgetRemain.vue'
  import { GridCol3 } from '@/shared/ui/layouts'
  import HouseHoldTile from '@/features/shopping/ui/HouseHoldTile.vue'

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
    onClickCategoryAmount
  } = useKaimemoSummary()
</script>

<template>
  <HouseHoldTile
    :householdBooks="householdBooks"
    v-model="selectedHouseholdBook"
  />
  <div class="min-h-screen bg-primary-bg">
    <div
      class="sticky top-14 z-10 backdrop-blur-md bg-white/90 shadow-soft p-4"
    >
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
          :key="categoryAmount.category?.id || 0"
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
