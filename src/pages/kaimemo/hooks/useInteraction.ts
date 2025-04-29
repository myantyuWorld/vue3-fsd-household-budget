import { useForm } from 'vee-validate'
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { type KaimemoSchema, schema } from '../types'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session-store'
import type { components } from '@/shared/api/v1'
export const WebSocketMethodMap = {
  CreateKaimemo: '1',
  RemoveKaimemo: '2',
}

export const useInteraction = () => {
  const sessionStore = useSessionStore()
  const selectedHouseholdBook = ref<components['schemas']['HouseholdBook']>(
    sessionStore.user.householdBooks[0],
  )
  const items = ref<components['schemas']['ShoppingMemo'][]>()
  const isOpenModal = ref(false)
  const selectedFilters = ref<number>()
  const tempUserID =
    (useRouter().currentRoute.value.query.share as string) ?? localStorage.getItem('tempUserID')
  let ws: WebSocket

  // TODO : provide, injectで共通的に処理したい
  const loading = ref<boolean>(true)

  const selectedCategoryLimit = computed(() => {
    return selectedHouseholdBook.value.categoryLimit
  })

  watch(selectedHouseholdBook, () => {
    ws = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL_KAIMEMO}?tempUserID=${selectedHouseholdBook.value.id}`,
    )

    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data))
      items.value = JSON.parse(event.data)

      loading.value = false
    }
  })

  const { defineField, errors, handleSubmit, setValues } = useForm<KaimemoSchema>({
    validationSchema: toTypedSchema(schema),
  })

  onMounted(async () => {
    localStorage.setItem('tempUserID', tempUserID)
    ws = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL_KAIMEMO}?tempUserID=${selectedHouseholdBook.value.id}`,
    )

    ws.onmessage = (event) => {
      // TODO : カテゴリ名も取得する
      items.value = JSON.parse(event.data)

      loading.value = false
    }
  })

  onUnmounted(() => {
    ws.close()
  })

  const onClickOpenAddItemModal = () => {
    isOpenModal.value = true
  }

  const onClickCloseAddItemModal = () => {
    isOpenModal.value = false
  }

  const onClickAddItem = handleSubmit(async (values) => {
    ws.send(
      JSON.stringify({
        methodType: WebSocketMethodMap.CreateKaimemo,
        householdBookID: selectedHouseholdBook.value.id,
        ...values,
      }),
    )

    setValues({
      name: '',
    })
  })

  const onClickArchiveItem = async (id: number) => {
    items.value = items.value?.filter((item) => item.id !== id)

    ws.send(
      JSON.stringify({
        methodType: WebSocketMethodMap.RemoveKaimemo,
        // tempUserID: tempUserID,
        id: id,
      }),
    )
  }

  const onClickShare = () => {
    const shareURL = !tempUserID
      ? window.location.href + `?share=${tempUserID}`
      : window.location.href

    navigator.share({
      title: 'kaimemo!',
      text: 'リンクを共有し、買い物メモを共有しよう！',
      url: shareURL,
    })
  }

  const filteredItems = computed(() => {
    if (!selectedFilters.value) {
      return items.value
    }
    return items.value?.filter((item) => selectedFilters.value === item.categoryID)
  })

  const householdBooks = computed(() => {
    return sessionStore.user.householdBooks
  })

  const categories = computed(() => {
    // TODO : ユーザーが選択したhouseholdBookのcategoryLimitを取得
    return householdBooks.value[0].categoryLimit
  })

  return {
    items,
    householdBooks,
    categories,
    isOpenModal,
    selectedHouseholdBook,
    selectedCategoryLimit,
    errors,
    selectedFilters,
    filteredItems,
    loading,
    defineField,
    onClickOpenAddItemModal,
    onClickCloseAddItemModal,
    onClickAddItem,
    onClickArchiveItem,
    onClickShare,
  }
}
