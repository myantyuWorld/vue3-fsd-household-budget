import { POST } from '@/shared/api'

export const usePublishedInformation = () => {
  const onClickUpdatePublishInformation = async (id: number | undefined) => {
    if (!id) return
    console.log('onClickUpdatePublishInformation', id)

    const { data, error } = await POST(`/admin/informations/{id}/publish`, {
      params: {
        path: { id },
      },
    })
    if (error) console.log(error)
    console.log(data)
    if (data) {
      console.log('公開状態を更新しました')
    }
  }

  return {
    onClickUpdatePublishInformation,
  }
}
