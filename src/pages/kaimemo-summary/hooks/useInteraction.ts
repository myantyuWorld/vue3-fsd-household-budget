import { DELETE, GET, POST } from '@/shared/api'
import type { components } from '@/shared/api/v1'
import { computed, onMounted, ref } from 'vue'
import { schema, type KaimemoSummarySchema } from '../types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useAmountSummaryStore } from '@/features/kaimemo'

export const useInteraction = () => {
  // TODO : provide, injectで共通的に処理したい
  const loading = ref<boolean>(true)
  const isOpenModal = ref<boolean>(false)
  const operatingCurrentDate = ref<Date>(new Date())
  const summaries = ref<components['schemas']['KaimemoSummary']>()
  const tempUserID = localStorage.getItem('tempUserID') ?? ''
  const store = useAmountSummaryStore()

  const { defineField, errors, handleSubmit, resetForm } = useForm<KaimemoSummarySchema>({
    validationSchema: toTypedSchema(schema),
  })

  const currentMonthlySummary = computed(() => {
    return summaries.value?.monthlySummaries.find(
      (summary) => summary.month === operatingCurrentDate.value.toISOString().slice(0, 7),
    )
  })

  const currentWeeklySummary = computed(() => {
    const weekStart = new Date(operatingCurrentDate.value)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    return summaries.value?.weeklySummaries.find(
      (summary) =>
        summary.weekStart ===
        new Date(weekStart.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10),
    )
  })

  onMounted(async () => {
    await fetchKaimemoSummary()

    store.increment()
  })

  const fetchKaimemoSummary = async () => {
    const { data, error } = await GET('/kaimemo/summary', {
      params: {
        query: {
          tempUserID: tempUserID,
        },
      },
    })
    if (error) {
      console.error(error)
      return []
    }

    store.mutation(data)
    summaries.value = data
  }

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

  const onClickAddAmountRecord = handleSubmit(async (values) => {
    const { error } = await POST('/kaimemo/summary', {
      body: {
        tempUserID: tempUserID,
        ...values,
      },
    })
    if (error) {
      console.error(error)
      return
    }

    isOpenModal.value = false

    fetchKaimemoSummary()
  })

  const onClickDeleteAmountRecord = async (id: string) => {
    const { error } = await DELETE('/kaimemo/summary/{id}', {
      body: {
        tempUserID: tempUserID,
      },
      params: {
        path: {
          id,
        },
      },
    })
    if (error) {
      console.error(error)
      return
    }

    fetchKaimemoSummary()
  }

  return {
    isOpenModal,
    loading,
    currentMonthlySummary,
    currentWeeklySummary,
    operatingCurrentDate,
    errors,
    defineField,
    fetchKaimemoSummary,
    onClickAddAmountModal,
    onClickCloseAmountModal,
    onClickMonthlyPrev,
    onClickMonthlyNext,
    onClickWeeklyPrev,
    onClickWeeklyNext,
    onClickAddAmountRecord,
    onClickDeleteAmountRecord,
  }
}
