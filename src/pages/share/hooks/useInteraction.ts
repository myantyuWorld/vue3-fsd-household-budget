import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { GET, POST } from '@/shared/api'
import type { components } from '@/shared/api/v1'
import { useSessionStore } from '@/entities/session/model/session-store'

export const useInteraction = () => {
  const sessionStore = useSessionStore()
  const route = useRoute()
  const householdBookID = ref(0)
  const inviteUserID = ref(0)
  const household = ref<components['schemas']['HouseholdBook']>()
  const inviteUser = ref<components['schemas']['FetchMe']>()

  onMounted(async () => {
    householdBookID.value = Number(route.query.houseHoldBookID)
    inviteUserID.value = Number(route.query.inviteUserID)

    const { data } = await GET('/household/{id}', {
      params: {
        path: {
          id: householdBookID.value,
        },
      },
    })
    household.value = data

    const { data: inviteUserData } = await GET('/household/user/{id}', {
      params: {
        path: {
          id: inviteUserID.value,
        },
      },
    })
    inviteUser.value = inviteUserData
  })

  const onClickAcceptInvite = async () => {
    const { error } = await POST('/household/{householdID}/share/{inviteUserID}', {
      params: { 
        path: {
          householdID: householdBookID.value,
          inviteUserID: sessionStore.user.id,
        },
      },
    })
    if (error) {
      console.error(error)
      return
    }
  }

  return {
    household,
    inviteUser,
    onClickAcceptInvite,
  }
}
