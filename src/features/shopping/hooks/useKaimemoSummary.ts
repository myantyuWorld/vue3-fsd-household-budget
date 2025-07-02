import { DELETE, GET, POST } from '@/shared/api'
import type { components } from '@/shared/api/v1'
import { computed, onMounted, ref, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useAmountSummaryStore } from '@/features/kaimemo'
import { useSessionStore } from '@/entities/session/model/session-store'
import { analyzeSchema, type AnalyzeSchema } from '@/features/analyze'

export const useKaimemoSummary = () => {
  // TODO : provide, injectで共通的に処理したい
  const loading = ref<boolean>(true)
  const isOpenModal = ref<boolean>(false)
  const isOpenEditModal = ref<boolean>(false)
  const isOpenDeleteModal = ref<boolean>(false)
  const isOpenReceiptAnalyzeModal = ref<boolean>(false)
  const deleteId = ref<number>(0)
  const editRecord = ref<components['schemas']['ShoppingRecord'] | null>(null)
  const operatingCurrentDate = ref<Date>(new Date())
  const summarizeShoppingAmounts =
    ref<components['schemas']['SummarizeShoppingAmount']>()
  const store = useAmountSummaryStore()
  const sessionStore = useSessionStore()
  const selectedHouseholdBook = ref<components['schemas']['HouseholdBook']>(
    sessionStore.user.householdBooks?.[0] || {} as components['schemas']['HouseholdBook']
  )
  const selectedCategoryNumber = ref<number>(0)
  const videoRef = ref<HTMLVideoElement | null>(null)
  const stream = ref<MediaStream | null>(null)
  const sortByAmount = ref<boolean>(false)

  const {
    defineField: defineTagField,
    errors: tagErrors,
    handleSubmit: handleTagSubmit
  } = useForm<AnalyzeSchema>({
    validationSchema: toTypedSchema(analyzeSchema)
  })

  const householdBooks = computed(() => {
    return sessionStore.user.householdBooks || []
  })

  const categories = computed(() => {
    // TODO : ユーザーが選択したhouseholdBookのcategoryLimitを取得
    return selectedHouseholdBook.value.categoryLimit || []
  })

  onMounted(async () => {
    fetchShoppingRecords()
  })

  watch(selectedHouseholdBook, () => {
    fetchShoppingRecords()
  })

  const fetchShoppingRecords = async () => {
    const { data, error } = await GET(
      '/household/{householdID}/shopping/record',
      {
        params: {
          // TODO : ユーザーが選択したhouseholdBookのidを取得
          path: {
            householdID: selectedHouseholdBook.value.id || 0
          },
          query: {
            date: operatingCurrentDate.value.toISOString().split('T')[0]
          }
        }
      }
    )
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
  }

  const onClickCloseAmountModal = () => {
    isOpenModal.value = false

    fetchShoppingRecords()
  }

  const onClickEditAmountRecord = (record: components['schemas']['ShoppingRecord']) => {
    editRecord.value = record
    isOpenEditModal.value = true
  }

  const onClickCloseEditAmountModal = () => {
    isOpenEditModal.value = false
    editRecord.value = null

    fetchShoppingRecords()
  }

  const onClickMonthlyPrev = () => {
    operatingCurrentDate.value = new Date(
      operatingCurrentDate.value.setMonth(
        operatingCurrentDate.value.getMonth() - 1,
        1
      )
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
    return categories.value.reduce(
      (acc, category) => acc + (category.limitAmount || 0),
      0
    )
  })

  const selectedShoppingAmounts = computed(() => {
    let filteredAmounts = summarizeShoppingAmounts.value?.shoppingAmounts

    if (selectedCategoryNumber.value !== 0) {
      filteredAmounts = filteredAmounts?.filter(
        shoppingAmount =>
          shoppingAmount.category?.id === selectedCategoryNumber.value
      )
    }

    if (!filteredAmounts) {
      return []
    }

    if (sortByAmount.value) {
      return [...filteredAmounts].sort((a, b) => (b.amount || 0) - (a.amount || 0))
    }

    return filteredAmounts
  })

  const onClickDeleteAmountRecord = async () => {
    const { error } = await DELETE(
      '/household/{householdID}/shopping/record/{shoppingID}',
      {
        params: {
          path: {
            householdID: selectedHouseholdBook.value.id || 0,
            shoppingID: deleteId.value
          }
        }
      }
    )

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

  const onClickCategoryAmount = (categoryID: number) => {
    console.log(categoryID)

    if (selectedCategoryNumber.value === categoryID) {
      selectedCategoryNumber.value = 0
    } else {
      selectedCategoryNumber.value = categoryID
    }
  }

  const onClickOpenReceiptAnalyzeModal = async () => {
    isOpenReceiptAnalyzeModal.value = true
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        device => device.kind === 'videoinput'
      )
      const backCamera =
        videoDevices.find(device =>
          device.label.toLowerCase().includes('back')
        ) || videoDevices[0]

      stream.value = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: backCamera?.deviceId,
          facingMode: 'environment'
        }
      })
      videoRef.value!.srcObject = stream.value
      await videoRef.value!.play()
    } catch (error) {
      console.error('カメラの起動に失敗しました:', error)
    }
  }

  const onClickCloseReceiptAnalyzeModal = () => {
    isOpenReceiptAnalyzeModal.value = false
    stream.value?.getTracks().forEach(track => track.stop())
  }

  const onClickToggleSortByAmount = () => {
    sortByAmount.value = !sortByAmount.value
  }

  const handleReceiptAnalyzeReception = handleTagSubmit(async values => {
    console.log('receipt analyze reception', values)

    const canvas = document.createElement('canvas')
    canvas.width = videoRef.value!.videoWidth
    canvas.height = videoRef.value!.videoHeight
    const context = canvas.getContext('2d')
    context?.drawImage(videoRef.value!, 0, 0, canvas.width, canvas.height)

    const base64 = canvas.toDataURL('image/jpeg')
    console.log('撮影した画像のbase64:', base64)

    stream.value?.getTracks().forEach(track => track.stop())

    const { data, error } = await POST(
      '/openai/analyze/{householdID}/receipt/reception',
      {
        body: {
          imageData: base64,
          categoryID: values.tag
        },
        params: {
          path: {
            householdID: selectedHouseholdBook.value.id || 0
          }
        }
      }
    )

    if (error) {
      console.error(error)
      return
    }

    if (data) {
      console.log(data)
    }

    onClickCloseReceiptAnalyzeModal()
  })

  return {
    isOpenModal,
    isOpenEditModal,
    isOpenDeleteModal,
    isOpenReceiptAnalyzeModal,
    editRecord,
    videoRef,
    loading,
    operatingCurrentDate,
    categories,
    summarizeShoppingAmounts,
    summarizeCategoryLimitAmount,
    householdBooks,
    selectedHouseholdBook,
    selectedShoppingAmounts,
    selectedCategoryNumber,
    sortByAmount,
    defineTagField,
    tagErrors,
    onClickAddAmountModal,
    onClickCloseAmountModal,
    onClickEditAmountRecord,
    onClickCloseEditAmountModal,
    onClickMonthlyPrev,
    onClickMonthlyNext,
    onClickWeeklyPrev,
    onClickWeeklyNext,
    onClickDeleteAmountRecord,
    onClickCloseDeleteConfirmModal,
    onClickOpenDeleteConfirmModal,
    onClickCategoryAmount,
    onClickToggleSortByAmount,
    handleReceiptAnalyzeReception,
    onClickOpenReceiptAnalyzeModal,
    onClickCloseReceiptAnalyzeModal
  }
}
