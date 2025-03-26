import hyRequest from '@/service'
import type { AccountFormData } from '@/types/login'
import { useUserStore } from '@/stores/user'

// 账号登录
export const accountLoginApi = async ({ account, password }: AccountFormData) => {
  return await hyRequest.post({
    url: '/login',
    data: {
      name: account,
      password
    }
  })
}

// 获取用户信息
export const getUserInfoApi = async (id: number) => {
  return await hyRequest.get({
    url: `/users/${id}`
  })
}

// 获取用户菜单权限
export const getUserMenusApi = async (id: number) => {
  return await hyRequest.get({
    url: `/role/${id}/menu`
  })
}
