import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  addUserApi,
  deletleteUserApi,
  getDepartmentListApi,
  getRoleListApi,
  getUserListApi
} from '@/service/main/system'
import { ElMessage } from 'element-plus'
import type { OptionType } from '@/types'

export const useSystemStore = defineStore('system', () => {
  {
    const userList = ref<System.UserInfo[]>([])
    const paginationParam = ref<System.PaginationParam>({ enable: 1, offset: 1, size: 10, totalCount: 0 })
    const roleList = ref<OptionType[]>([])
    const departmentList = ref<OptionType[]>([])

    // 获取角色列表
    const getRoleList = async () => {
      const { data } = await getRoleListApi()
      roleList.value = data.list
    }

    // 获取部门列表
    const getDepartmentList = async () => {
      const { data } = await getDepartmentListApi()
      departmentList.value = data.list
    }

    // 获取用户列表
    const getUserList = async (searchParam = {}) => {
      const param = Object.assign({}, paginationParam.value, searchParam)
      const { data } = await getUserListApi(param)
      userList.value = data.list
      paginationParam.value.totalCount = data.totalCount
    }

    // 新增用户
    const addUser = async (data: System.UserSearchParam) => {
      await addUserApi(data)
      ElMessage.success('添加成功')
      await getUserList()
    }

    // 删除用户
    const deleteUser = async (id: number) => {
      await deletleteUserApi(id)
      ElMessage.success('删除成功')
      await getUserList()
    }

    return {
      userList,
      paginationParam,
      roleList,
      departmentList,
      getRoleList,
      getDepartmentList,
      getUserList,
      addUser,
      deleteUser
    }
  }
})
