import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { MenuChildInfo, MenuInfo } from '@/types/login'
import type { Component } from 'vue'
import type { Route } from '@/types/router'

// 注册所有的组件
const modules = import.meta.glob('@/views/main/**/**/index.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/other/404.vue')
    }
  ]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = useUserStore().userInfo.token
    if (token) {
      if (to.path === '/main') {
        next(firstPath?.path as string)
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
})

// 动态添加路由
export let firstPath: Route | null = null
export const dynamicAddRoute = () => {
  const userStore = useUserStore()

  userStore.menuInfo.length &&
    userStore.menuInfo.map((item: MenuInfo) => {
      item.children.map((child: MenuChildInfo) => {
        if (child.url) {
          const route: Route = {
            path: child.url,
            name: child.url.split('/')[child.url.split('/').length - 1],

            component: modules[`/src/views${child.url}/index.vue`] as () => Component
          }
          router.addRoute('main', route)

          if (!firstPath) firstPath = route
        }
      })
    })
}

export default router
