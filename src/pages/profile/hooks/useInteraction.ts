import {
  categoryLimitSchema,
  householdBookSchema,
  type CategoryLimitSchema,
  type HouseholdBookSchema
} from '../types/schema'
import { toTypedSchema } from '@vee-validate/zod'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { useSessionStore } from '@/entities/session/model/session-store'
import { POST } from '@/shared/api/client'

export const useInteraction = () => {
  const sessionStore = useSessionStore()
  const user = computed(() => sessionStore.user)
  const isOpenModalAddCategory = ref(false)
  const isOpenModalAddHousehold = ref(false)
  let selectedHouseholdBookID = 0

  const { defineField, errors, handleSubmit, setValues } =
    useForm<CategoryLimitSchema>({
      validationSchema: toTypedSchema(categoryLimitSchema),
      initialValues: {
        name: '',
        limitAmount: 0
      }
    })

  const {
    defineField: defineFieldHousehold,
    errors: errorsHousehold,
    handleSubmit: handleSubmitHousehold,
    setValues: setValuesHousehold
  } = useForm<HouseholdBookSchema>({
    validationSchema: toTypedSchema(householdBookSchema),
    initialValues: {
      title: '',
      description: ''
    }
  })

  const onClickOpenAddCategoryModal = (householdBookID: number) => {
    selectedHouseholdBookID = householdBookID
    isOpenModalAddCategory.value = true
  }

  const onClickCloseAddItemModal = () => {
    isOpenModalAddCategory.value = false
  }

  const onClickOpenAddHouseholdModal = () => {
    isOpenModalAddHousehold.value = true
  }

  const onClickCloseAddHouseholdModal = () => {
    isOpenModalAddHousehold.value = false
  }

  const handleAddCategory = handleSubmit(async values => {
    console.log(values)
    const err = await POST('/household/{householdID}/category', {
      params: {
        path: {
          householdID: selectedHouseholdBookID
        }
      },
      body: {
        categoryName: values.name,
        categoryLimitAmount: values.limitAmount
      }
    })
    if (err) {
      console.log(err)
    }
    await sessionStore.fetchUser()
    isOpenModalAddCategory.value = false
  })

  const handleAddHousehold = handleSubmitHousehold(async values => {
    console.log(values)
    const err = await POST('/household/user/{id}', {
      params: {
        path: {
          id: user.value.id || 0
        }
      },
      body: {
        title: values.title,
        description: values.description
      }
    })
    if (err) {
      console.log(err)
    }
    await sessionStore.fetchUser()
    isOpenModalAddHousehold.value = false
  })

  const handleShareHouseHoldLink = (id: number) => {
    navigator.share({
      title: 'kaimemo!',
      text: 'リンクを共有し、買い物メモを共有しよう！',
      url:
        window.location.origin +
        '/share' +
        '?houseHoldBookID=' +
        id +
        '&inviteUserID=' +
        user.value.id
    })
  }

  return {
    user,
    isOpenModalAddCategory,
    isOpenModalAddHousehold,
    defineField,
    defineFieldHousehold,
    errors,
    errorsHousehold,
    setValues,
    setValuesHousehold,
    onClickOpenAddCategoryModal,
    onClickCloseAddItemModal,
    onClickOpenAddHouseholdModal,
    onClickCloseAddHouseholdModal,
    handleAddCategory,
    handleAddHousehold,
    handleShareHouseHoldLink
  }
}
