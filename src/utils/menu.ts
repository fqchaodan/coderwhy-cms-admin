import type { MenuInfo } from '@/types/login'
import type { BreadCrumb } from '@/types/router'

// 记忆当前路由，刷新保持
export const mapPathToMenu = (path: string, menuInfo: MenuInfo[]) => {
  for (const menu of menuInfo) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu.id + ''
      }
    }
  }
}

// 面包屑
export const mapPathToBreadcrumbs = (path: string, menuInfo: any[]) => {
  const breadcrumbs: BreadCrumb[] = []
  for (const menu of menuInfo) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 一级菜单重定向到第一个子路由
        breadcrumbs.push({ name: menu.name, path: menu.children[0].url })
        // 二级菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
