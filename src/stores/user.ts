import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { LoginResponseData, MenuInfo, UserRoleInfo } from '@/types/login'
import router from '@/router'
import { getUserInfoApi, getUserMenusApi } from '@/service/login'
import type { ResType } from '@/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<LoginResponseData>({
      id: 0,
      name: '',
      token: undefined,
      account: '',
      password: ''
    })
    const isRembered = ref(false)
    const phoneLoginInfo = ref({
      loading: false,
      remainTime: 30
    })
    const userRoleInfo = ref(<UserRoleInfo>{
      cellphone: 0,
      createAt: '',
      enable: 0,
      id: 0,
      name: '',
      realname: '',
      updateAt: ''
    })

    const menuInfo = ref<MenuInfo[]>([])

    // 登录
    const login = async (info: LoginResponseData) => {
      userInfo.value = { ...info, account: '', password: '' }

      // 获取登录用户的详细信息（role）
      const res: ResType<UserRoleInfo> = await getUserInfoApi(userInfo.value.id)
      userRoleInfo.value = res.data

      // 获取用户菜单权限
      const roleRes: ResType<MenuInfo[]> = await getUserMenusApi(userRoleInfo.value.id)
      menuInfo.value = roleRes.data

      // 跳转
      ElNotification({
        title: '登录成功',
        message: '欢迎使用番茄后台管理系统',
        type: 'success'
      })

      await router.replace('/')
    }

    // 存储用户信息
    const setUserInfo = async ({ account, password }: { account: string; password: string }) => {
      userInfo.value.account = account
      userInfo.value.password = password
    }

    // 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...userInfo.value, id: 0, name: '', token: '' }
      userRoleInfo.value = {
        cellphone: 0,
        createAt: '',
        enable: 0,
        id: 0,
        name: '',
        realname: '',
        updateAt: ''
      }
      menuInfo.value = []
    }

    // 退出登录
    const logout = async () => {
      clearUserInfo()
      ElNotification({
        title: '退出成功',
        message: '欢迎下次再来',
        type: 'success'
      })
      await router.replace('/login')
    }

    // 验证码登录计时
    const phoneLoginTime = () => {
      if (!phoneLoginInfo.value.loading) return

      let timer = setInterval(() => {
        phoneLoginInfo.value.remainTime--

        if (phoneLoginInfo.value.remainTime <= 0) {
          phoneLoginInfo.value.loading = false
          phoneLoginInfo.value.remainTime = 30
          clearInterval(timer)
        }
      }, 1000)
    }

    return {
      userInfo,
      isRembered,
      phoneLoginInfo,
      userRoleInfo,
      menuInfo,
      login,
      setUserInfo,
      clearUserInfo,
      logout,
      phoneLoginTime
    }
  },
  {
    persist: true
  }
)
