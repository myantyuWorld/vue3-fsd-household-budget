import { DELETE, GET, POST } from '@/shared/api'
import type { components } from '@/shared/api/v1'
import { computed, onMounted, ref, watch } from 'vue'
import { schema, type KaimemoSummarySchema } from '../types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useAmountSummaryStore } from '@/features/kaimemo'
import { useSessionStore } from '@/entities/session/model/session-store'

export const useInteraction = () => {
  // TODO : provide, injectで共通的に処理したい
  const loading = ref<boolean>(true)
  const isOpenModal = ref<boolean>(false)
  const isOpenDeleteModal = ref<boolean>(false)
  const deleteId = ref<number>(0)
  const operatingCurrentDate = ref<Date>(new Date())
  const summarizeShoppingAmounts = ref<components['schemas']['SummarizeShoppingAmount']>()
  const store = useAmountSummaryStore()
  const sessionStore = useSessionStore()
  const selectedHouseholdBook = ref<components['schemas']['HouseholdBook']>(
    sessionStore.user.householdBooks[0],
  )

  const { defineField, errors, handleSubmit, resetForm } = useForm<KaimemoSummarySchema>({
    validationSchema: toTypedSchema(schema),
  })

  const householdBooks = computed(() => {
    return sessionStore.user.householdBooks
  })

  const categories = computed(() => {
    // TODO : ユーザーが選択したhouseholdBookのcategoryLimitを取得
    return selectedHouseholdBook.value.categoryLimit
  })

  onMounted(async () => {
    fetchShoppingRecords()
  })

  watch(selectedHouseholdBook, () => {
    fetchShoppingRecords()
  })

  const fetchShoppingRecords = async () => {
    const { data, error } = await GET('/household/{householdID}/shopping/record', {
      params: {
        // TODO : ユーザーが選択したhouseholdBookのidを取得
        path: { householdID: selectedHouseholdBook.value.id },
        query: {
          date: operatingCurrentDate.value.toISOString().split('T')[0],
        },
      },
    })
    if (error) {
      console.error(error)
      return []
    }

    if (data) {
      store.mutationShoppingRecords(data)
      summarizeShoppingAmounts.value = data
    }
  }

  watch(operatingCurrentDate, () => {
    fetchShoppingRecords()
  })

  const onClickAddAmountModal = () => {
    isOpenModal.value = true
    resetForm()
  }

  const onClickCloseAmountModal = () => {
    isOpenModal.value = false
  }

  const onClickMonthlyPrev = () => {
    operatingCurrentDate.value = new Date(
      operatingCurrentDate.value.setMonth(operatingCurrentDate.value.getMonth() - 1, 1),
    )
  }

  const onClickMonthlyNext = () => {
    const nextMonth = new Date(operatingCurrentDate.value)
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1)

    if (nextMonth <= new Date()) {
      operatingCurrentDate.value = nextMonth
    }
  }

  const onClickWeeklyPrev = () => {
    const weekStart = new Date(operatingCurrentDate.value)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setDate(weekStart.getDate() - 7)

    operatingCurrentDate.value = weekStart
  }

  const onClickWeeklyNext = () => {
    const weekStart = new Date(operatingCurrentDate.value)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setDate(weekStart.getDate() + 7)

    if (weekStart <= new Date()) {
      operatingCurrentDate.value = weekStart
    }
  }

  const summarizeCategoryLimitAmount = computed(() => {
    if (!categories.value) {
      return 0
    }
    return categories.value.reduce((acc, category) => acc + category.limitAmount, 0)
  })

  const onClickCreateShoppingRecord = handleSubmit(async (values) => {
    console.log(values)

    const { error } = await POST('/household/{householdID}/shopping/record', {
      body: {
        householdID: householdBooks.value[0].id,
        categoryID: values.tag,
        amount: values.amount,
        date: values.date,
        memo: values.memo ?? '',
      },
      params: {
        path: {
          // TODO : ユーザーが選択したhouseholdBookのidを取得
          householdID: selectedHouseholdBook.value.id,
        },
      },
    })

    if (error) {
      console.error(error)
      return
    }

    fetchShoppingRecords()
    isOpenModal.value = false
  })

  const onClickDeleteAmountRecord = async () => {
    const { error } = await DELETE('/household/{householdID}/shopping/record/{shoppingID}', {
      params: {
        path: { householdID: selectedHouseholdBook.value.id, shoppingID: deleteId.value },
      },
    })

    if (error) {
      console.error(error)
      return
    }

    await fetchShoppingRecords()
    isOpenDeleteModal.value = false
  }
  const onClickOpenDeleteConfirmModal = (id: number) => {
    deleteId.value = id
    isOpenDeleteModal.value = true
  }

  const onClickCloseDeleteConfirmModal = () => {
    isOpenDeleteModal.value = false
  }

  const onClickReceiptAnalyzeReception = async () => {
    console.log('receipt analyze reception')

    const { data, error } = await POST('/openai/analyze/{householdID}/receipt/reception', {
      body: {
        // TODO : 撮影した画像データをbase64に変換
        imageData: 'base64',
      },
      params: {
        path: { householdID: selectedHouseholdBook.value.id },
      },
    })

    if (error) {
      console.error(error)
      return
    }

    console.log(data)
  }

  return {
    isOpenModal,
    isOpenDeleteModal,
    loading,
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
    onClickWeeklyPrev,
    onClickWeeklyNext,
    onClickDeleteAmountRecord,
    onClickCreateShoppingRecord,
    onClickCloseDeleteConfirmModal,
    onClickOpenDeleteConfirmModal,
    onClickReceiptAnalyzeReception,
  }
}
