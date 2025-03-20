import { defineStore } from 'pinia'
import { ref } from 'vue'
import { localCache } from '@/utils/cache'
import type { LoginResponseData } from '@/types/login'

const LOGIN_TOKEN = 'login/token'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<LoginResponseData>({ id: 0, name: '', token: localCache.getCache(LOGIN_TOKEN) })

  const setUserInfo = (info: LoginResponseData) => {
    userInfo.value = info
    // 存储 token
    localCache.setCache(LOGIN_TOKEN, info.token)
  }

  const clearUserInfo = () => {
    userInfo.value = { id: 0, name: '', token: '' }
    // 删除 token
    localCache.removeCache(LOGIN_TOKEN)
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo
  }
})
