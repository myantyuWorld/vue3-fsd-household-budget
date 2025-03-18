<script setup lang="ts">
import { BaseModal, PlusButton, PrimaryButton, SecondaryButton, TheForm } from '@/shared/ui'
import MonthlySummaryTile from './MonthlySummaryTile.vue'
import { useInteraction } from '../hooks/useInteraction'
import { formatYearMonth } from '@/shared/util/string'
import WeeklySummaryTile from './WeeklySummaryTile.vue'

const {
  isOpenModal,
  operatingCurrentDate,
  currentMonthlySummary,
  currentWeeklySummary,
  errors,
  defineField,
  onClickAddAmountModal,
  onClickCloseAmountModal,
  onClickMonthlyPrev,
  onClickMonthlyNext,
  onClickWeeklyPrev,
  onClickWeeklyNext,
  onClickAddAmountRecord,
  onClickDeleteAmountRecord,
} = useInteraction()

const [amount, amountProps] = defineField('amount')
const [tag, tagProps] = defineField('tag')
const [date, dateProps] = defineField('date')
</script>

<template>
  <div>
    <div class="justify-center sticky top-0">
      <div class="bg-gray-100 shadow-lg p-4 flex items-center justify-between">
        <span class="text-3xl" @click="onClickMonthlyPrev">＜</span>
        <div class="flex items-center gap-2">
          <router-link :to="`/summary/calender/2025-02`">
            <h1 class="text-2xl font-bold">{{ formatYearMonth(operatingCurrentDate) }}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5zM5 8h14V6H5zm0 0V6z"
              />
            </svg>
          </router-link>
        </div>
        <span class="text-3xl" @click="onClickMonthlyNext">＞</span>
      </div>
    </div>

    <MonthlySummaryTile
      tag="食費"
      :current-expense="currentMonthlySummary?.tagSummary.食費 ?? 0"
      :available-amount="40000"
    />
    <MonthlySummaryTile
      tag="日用品"
      :current-expense="currentMonthlySummary?.tagSummary.日用品 ?? 0"
      :available-amount="10000"
    />

    <WeeklySummaryTile
      :date="operatingCurrentDate"
      :weekly-summary="
        currentWeeklySummary || { weekStart: '', weekEnd: '', totalAmount: 0, items: [] }
      "
      @onClickPrev="onClickWeeklyPrev"
      @onClickNext="onClickWeeklyNext"
      @onClickDeleteAmountRecord="onClickDeleteAmountRecord"
    />

    <PlusButton @click="onClickAddAmountModal" />

    <BaseModal title="金額追加" :isOpen="isOpenModal" @closeModal="onClickCloseAmountModal">
      <template #modalBody>
        <TheForm label="日付">
          <input
            type="date"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            :class="{ 'bg-red-50 border-red-500': errors.date }"
            v-model="date"
            v-bind="dateProps"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.date }}</p></TheForm
        >
        <TheForm label="tag">
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
        <TheForm label="金額">
          <input
            type="number"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            :class="{ 'bg-red-50 border-red-500': errors.amount }"
            v-model="amount"
            v-bind="amountProps"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.amount }}</p>
        </TheForm>
      </template>

      <template #buttons>
        <SecondaryButton @click="onClickCloseAmountModal">閉じる</SecondaryButton>
        <PrimaryButton @click="onClickAddAmountRecord">追加</PrimaryButton>
      </template>
    </BaseModal>
  </div>
</template>
