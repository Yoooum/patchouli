import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/server/api'

export const useAppStore = defineStore('app', () => {
  const current = ref({
    route: '/',
    dark: false,
    collapsed: false,
    hasLogin: false,
  })
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
    current, fetchMenus, menus,
  }
},
{
  persist: {
    enabled: true,
  },
})
