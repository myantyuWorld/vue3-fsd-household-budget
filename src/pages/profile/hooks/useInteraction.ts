import { categoryLimitSchema, type CategoryLimitSchema } from "../types/schema"
import { toTypedSchema } from "@vee-validate/zod"
import { ref, computed } from "vue"
import { useForm } from "vee-validate"
import { useSessionStore } from "@/entities/session/model/session-store"

export const useInteraction = () => {
    const sessionStore = useSessionStore()
    const user = computed(() => sessionStore.user)
    const isOpenModalAddCategory = ref(false)
    const isOpenModalAddHousehold = ref(false)

    const { defineField, errors, handleSubmit, setValues } = useForm<CategoryLimitSchema>({
        validationSchema: toTypedSchema(categoryLimitSchema),
        initialValues: {
            name: '',
            limitAmount: 0,
        },
    })

    const onClickOpenAddCategoryModal = () => {
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

    const handleAddCategory = handleSubmit((values) => {
        console.log(values)
        isOpenModalAddCategory.value = false
    })

    const handleAddHousehold = handleSubmit((values) => {
        console.log(values)
        isOpenModalAddHousehold.value = false
    })
    
    return {
        user,
        isOpenModalAddCategory,
        isOpenModalAddHousehold,
        defineField,
        errors,
        setValues,
        onClickOpenAddCategoryModal,
        onClickCloseAddItemModal,
        onClickOpenAddHouseholdModal,
        onClickCloseAddHouseholdModal,
        handleAddCategory,
        handleAddHousehold,
    }

}