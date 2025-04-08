import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserListApi } from '@/service/main/system'

export const useSystemStore = defineStore('system', () => {
  {
    const userList = ref<System.UserInfo[]>([])
    const paginationParam = ref<System.PaginationParam>({ offset: 1, size: 10, totalCount: 0 })

    // 获取用户列表
    const getUserList = async () => {
      const { data } = await getUserListApi(paginationParam.value)
      userList.value = data.list
      paginationParam.value.totalCount = data.totalCount
    }

    return {
      userList,
      paginationParam,
      getUserList
    }
  }
})
