import hyRequest from '@/service'
import type { AccountFormData } from '@/types/login'

export const accountLoginApi = async ({ account, password }: AccountFormData) => {
  return await hyRequest.post({
    url: '/login',
    data: {
      name: account,
      password
    }
  })
}
