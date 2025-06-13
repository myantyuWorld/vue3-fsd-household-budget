import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { GET } from '@/shared/api'
import type { components } from '@/shared/api/v1'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<components['schemas']['UserInformation'][]>([])
  const isLoading = ref(false)

  const unreadCount = computed(() => {
    return notifications.value.filter((notification) => !notification.isRead).length
  })

  const fetchNotifications = async () => {
    isLoading.value = true
    try {
      // TODO: APIからお知らせを取得する処理を実装
      const { data, error } = await GET('/user/informations', {})
      if (error) console.error(error)
      console.log(data)
      // 仮のデータ
      notifications.value = data ?? []
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      isLoading.value = false
    }
  }

  // const markAsRead = async (notificationId: string) => {
  //   try {
  //     // TODO: APIで既読状態を更新する処理を実装
  //     const notification = notifications.value.find((n) => n.id === notificationId)
  //     if (notification) {
  //       notification.isRead = true
  //     }
  //   } catch (error) {
  //     console.error('Failed to mark notification as read:', error)
  //   }
  // }

  return {
    notifications,
    isLoading,
    unreadCount,
    fetchNotifications,
    // markAsRead,
  }
})
