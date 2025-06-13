import { useForm } from 'vee-validate'
import { createInformationSchema } from '@/features/admin/information'
import { toTypedSchema } from '@vee-validate/zod'
import { POST } from '@/shared/api'
import type { CreateInformationSchema } from '../types/schema'
import { useRouter } from 'vue-router'

export const useCreateInformation = () => {
  const router = useRouter()
  const { defineField, errors, handleSubmit } =
    useForm<CreateInformationSchema>({
      validationSchema: toTypedSchema(createInformationSchema)
    })

  const onClickCreateInformation = handleSubmit(async values => {
    console.log(values)

    const { data, error } = await POST('/admin/informations', {
      body: values
    })
    if (error) console.log(error)
    console.log(data)

    router.push('/admin/informations')
  })

  return {
    errors,
    defineField,
    onClickCreateInformation
  }
}
