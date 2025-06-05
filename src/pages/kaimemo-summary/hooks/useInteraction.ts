import type { components } from '@/shared/api/v1'
import { computed, onMounted, ref, watch } from 'vue'
import { useAmountSummaryStore } from '@/features/kaimemo'
import { useSessionStore } from '@/entities/session/model/session-store'
import { useModal } from '@/shared/util/useModal'
import { changeDate, fetchShoppingRecords } from './functions'

export const useInteraction = () => {
  // TODO : provide, injectで共通的に処理したい
  const loading = ref<boolean>(true)
  const deleteId = ref<number>(0)
  const operatingCurrentDate = ref<Date>(new Date())
  const summarizeShoppingAmounts = ref<components['schemas']['SummarizeShoppingAmount']>()
  const store = useAmountSummaryStore()
  const sessionStore = useSessionStore()
  const selectedHouseholdBook = ref<components['schemas']['HouseholdBook']>(
    sessionStore.user.householdBooks[0],
  )
  const selectedCategoryNumber = ref<number>(0)
  const amountModal = useModal()
  const deleteConfirmModal = useModal()
  const receiptAnalyzeModal = useModal()

  const householdBooks = computed(() => {
    return sessionStore.user.householdBooks
  })

  const categories = computed(() => {
    return selectedHouseholdBook.value.categoryLimit
  })

  const summarizeCategoryLimitAmount = computed(() => {
    if (!categories.value) {
      return 0
    }
    return categories.value.reduce((acc, category) => acc + category.limitAmount, 0)
  })

  const selectedShoppingAmounts = computed(() => {
    if (selectedCategoryNumber.value === 0) {
      return summarizeShoppingAmounts.value?.shoppingAmounts
    }

    return summarizeShoppingAmounts.value?.shoppingAmounts.filter(
      (shoppingAmount) => shoppingAmount.category.id === selectedCategoryNumber.value,
    )
  })

  onMounted(async () => {
    updateSummarizeShoppingAmounts()
  })

  watch([selectedHouseholdBook, operatingCurrentDate], () => {
    updateSummarizeShoppingAmounts()
  })

  const updateSummarizeShoppingAmounts = async () => {
    const data = await fetchShoppingRecords(operatingCurrentDate.value, selectedHouseholdBook.value)

    if (data) {
      store.mutationShoppingRecords(data)
      summarizeShoppingAmounts.value = data
    }
  }

  const onClickMonthlyPrev = () => {
    operatingCurrentDate.value = changeDate(operatingCurrentDate.value, -1, 'month')
  }

  const onClickMonthlyNext = () => {
    operatingCurrentDate.value = changeDate(operatingCurrentDate.value, 1, 'month')
  }

  const onClickCategoryAmount = (categoryID: number) => {
    if (selectedCategoryNumber.value === categoryID) {
      selectedCategoryNumber.value = 0
    } else {
      selectedCategoryNumber.value = categoryID
    }
  }

  return {
    loading,
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
  }
}
