<script setup lang="ts">
  import {
    BaseModal,
    PrimaryButton,
    SecondaryButton,
    TheForm,
    CameraButton,
    PencilButton,
    PlusButton
  } from '@/shared/ui'
  import { GridCol3 } from '@/shared/ui/layouts'
  import {
    ShoppingAmountItem,
    ShoppingCategoryBudgetRemain,
    WeeklySummaryCard
  } from '@/entities/shopping'
  import { ref } from 'vue'
  import {
    DeleteShoppingAmountModal,
    CreateShoppingAmountModal,
    EditShoppingAmountModal,
    MonthlyHeader,
    HouseHoldTile,
    useKaimemoSummary
  } from '@/features/shopping'

  const {
    isOpenModal,
    isOpenEditModal,
    operatingCurrentDate,
    categories,
    summarizeShoppingAmounts,
    summarizeCategoryLimitAmount,
    householdBooks,
    selectedHouseholdBook,
    selectedShoppingAmounts,
    selectedCategoryNumber,
    sortByAmount,
    isOpenDeleteModal,
    isOpenReceiptAnalyzeModal,
    editRecord,
    videoRef,
    currentWeekSummary,
    defineTagField,
    tagErrors,
    onClickAddAmountModal,
    onClickCloseAmountModal,
    onClickEditAmountRecord,
    onClickCloseEditAmountModal,
    onClickMonthlyPrev,
    onClickMonthlyNext,
    onClickDeleteAmountRecord,
    onClickCloseDeleteConfirmModal,
    onClickOpenDeleteConfirmModal,
    onClickCategoryAmount,
    onClickToggleSortByAmount,
    onClickWeeklyPrev,
    onClickWeeklyNext,
    handleReceiptAnalyzeReception,
    onClickOpenReceiptAnalyzeModal,
    onClickCloseReceiptAnalyzeModal
  } = useKaimemoSummary()

  const [analyzeTag, analyzeTagProps] = defineTagField('tag')

  const isExpanded = ref(false)

  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value
  }
</script>

<template>
  <HouseHoldTile
    :householdBooks="householdBooks"
    v-model="selectedHouseholdBook"
  />
  <div class="min-h-screen bg-primary-bg">
    <div
      class="sticky top-14 z-10 backdrop-blur-md bg-white/50 shadow-soft p-4"
    >
      <MonthlyHeader
        :operatingCurrentDate="operatingCurrentDate"
        :summarizeAmount="summarizeShoppingAmounts?.totalAmount ?? 0"
        :summarizeCategoryLimitAmount="summarizeCategoryLimitAmount"
        @clickMonthlyPrev="onClickMonthlyPrev"
        @clickMonthlyNext="onClickMonthlyNext"
      />
      <div class="mb-2 mt-4"></div>
      <WeeklySummaryCard 
        :weeklySummary="currentWeekSummary || null"
        :currentDate="operatingCurrentDate"
        @week-prev="onClickWeeklyPrev"
        @week-next="onClickWeeklyNext"
      />
    </div>

    <div class="max-w-4xl mx-auto p-4 space-y-4">
      <GridCol3>
        <ShoppingCategoryBudgetRemain
          v-for="categoryAmount in summarizeShoppingAmounts?.categoryAmounts"
          :key="categoryAmount.category?.id || 0"
          :categoryAmount="categoryAmount"
          :selectedCategoryNumber="selectedCategoryNumber"
          @clickCategoryLimit="onClickCategoryAmount"
        />
      </GridCol3>

      <div class="flex justify-end mb-4">
        <SecondaryButton
          @click="onClickToggleSortByAmount"
          class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 bg-white text-primary border-primary hover:bg-primary-light"
        >
          {{ sortByAmount ? '日付順' : '金額順' }}
        </SecondaryButton>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <template
          v-for="shoppingRecord in selectedShoppingAmounts"
          :key="shoppingRecord.id"
        >
          <ShoppingAmountItem
            :shoppingRecord="shoppingRecord"
            @click="onClickOpenDeleteConfirmModal(shoppingRecord.id || 0)"
            @edit="onClickEditAmountRecord"
          />
        </template>
      </div>
    </div>
    <PlusButton
      @click="toggleExpand"
      class="fixed bottom-20 right-4"
    />
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

    <CreateShoppingAmountModal
      :isOpen="isOpenModal"
      :householdID="selectedHouseholdBook.id || 0"
      :categories="categories"
      @close="onClickCloseAmountModal"
    />

    <EditShoppingAmountModal
      :isOpen="isOpenEditModal"
      :householdID="selectedHouseholdBook.id || 0"
      :categories="categories"
      :shoppingRecord="editRecord"
      @close="onClickCloseEditAmountModal"
    />

    <DeleteShoppingAmountModal
      :isOpen="isOpenDeleteModal"
      @close="onClickCloseDeleteConfirmModal"
      @delete="onClickDeleteAmountRecord"
    />

    <BaseModal
      title="レシート分析"
      :isOpen="isOpenReceiptAnalyzeModal"
      @closeModal="onClickCloseReceiptAnalyzeModal"
      class="backdrop-blur-md"
      verticalPosition="top-0"
      horizontalPosition="left-0"
    >
      <template #modalBody>
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full h-full"
        ></video>
        <TheForm label="カテゴリ">
          <select
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': tagErrors.tag
            }"
            v-model="analyzeTag"
            v-bind="analyzeTagProps"
          >
            <template
              v-for="categoryLimit in categories"
              :key="categoryLimit.category?.id || 0"
            >
              <option :value="categoryLimit.category?.id || 0">
                {{ categoryLimit.category?.name || '' }}
              </option>
            </template>
          </select>
        </TheForm>
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
