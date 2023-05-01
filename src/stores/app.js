import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/server/api'

export const useAppStore = defineStore('app', () => {
  const dark = ref(false)
  const collapsed = ref(false)
  const menus = ref([])

  const fetchMenus = async () => {
    try {
      const response = await api.fetchMenus()
      menus.value = response.data
      return Promise.resolve(response)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    dark, collapsed, fetchMenus, menus,
  }
},
{
  persist: {
    enabled: true,
  },
})
