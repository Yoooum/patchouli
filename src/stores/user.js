import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/server/api'

export const useUserStore = defineStore('user', () => {
  const user = ref()

  const fetchUser = async () => {
    try {
      const response = await api.fetchUser()
      user.value = response.data
      return Promise.resolve(response)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = async () => {
    try {
      const response = await api.logout()
      user.value = null
      return Promise.resolve(response)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    fetchUser, user, logout,
  }
},
{
  persist: {
    enabled: true,
  },
})
