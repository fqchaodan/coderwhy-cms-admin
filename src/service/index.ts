import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { useUserStore } from '@/stores/user'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = useUserStore().userInfo.token
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default hyRequest
