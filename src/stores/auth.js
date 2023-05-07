import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/server/api'
import { useLocalStorage } from '@/utils'

export const useAuthStore = defineStore('auth', () => {
  const menu = ref()
  const user = ref()
  const token = {
    accessToken: useLocalStorage.get('accessToken') || '',
    refreshToken: useLocalStorage.get('refreshToken') || '',
  }
  // 通过用户id获取动态路由数据
  const fetchMenu = async (id) => {
    await api.auth.fetchRoute(id)
      .then((response) => {
        console.log(response)
        if (response)
          menu.value = response
        return Promise.resolve(response)
      }).catch(error => Promise.reject(error))
  }

  const fetchToken = async ({ phone, email, password, refreshToken }) => {
    try {
      const response = await api.auth.fetchToken({ phone, email, password, refreshToken })

      if (response) {
        const { accessToken, refreshToken } = response
        useLocalStorage.set('accessToken', accessToken)
        useLocalStorage.set('refreshToken', refreshToken)
      }

      // 获取用户
      await fetchUser()
      // 获取路由
      await fetchMenu(user.value.id)
      return Promise.resolve(response)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  const fetchUser = async () => {
    try {
      const response = await api.auth.fetchUser()
      console.log(response)
      user.value = response
      return Promise.resolve(response)
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  const resetAuth = () => {
    menu.value = []
    user.value = {}
    useLocalStorage.remove('accessToken')
    useLocalStorage.remove('refreshToken')
  }

  return {
    user,
    menu,
    token,
    fetchToken,
    fetchMenu,
    fetchUser,
    resetAuth,
  }
},
{
  persist: {
    enabled: true,
  },
})
