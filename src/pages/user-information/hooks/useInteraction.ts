import type { components } from '@/shared/api/v1'
import { onMounted, ref } from 'vue'
import { useNotificationStore } from '@/entities/notification/model/notification-store'
import { POST } from '@/shared/api'

export const useInteraction = () => {
  const isRead = ref(false)
  const isReadAll = ref(false)
  const notificationStore = useNotificationStore()
  const informations = ref<components['schemas']['UserInformation'][]>()

  onMounted(async () => {
    informations.value = notificationStore.notifications

    const { error: readError } = await POST('/user/informations', {
      body: {
        informationIDs:
          informations.value
            ?.filter(information => !information.isRead)
            .map(information => information.id || 0) ?? []
      }
    })

    await notificationStore.fetchNotifications()

    if (readError) console.log(readError)
  })

  return {
    isRead,
    isReadAll,
    informations
  }
}
