# coderwhy-cms-admin

本项目通过 coderwhy 视频学习制作，并加入自己理解，集成更多细节配置

## 技术栈

- vue3 + TS + Vue-Router + Pinia + Axios
- Element-plus + UnoCSS
- 包管理器使用pnpm
- RBAC 权限控制

## 登录模块

### ElMessage & ElNotification 样式丢失问题

```typescript
// 在 main.ts 中引用 element-plus 的样式
import 'element-plus/dist/index.css'
```

### 源码请求结果封装的问题

```typescript
// 修改源码：统一处理 response

this.instance.interceptors.response.use(
  (res) => {
    return {
      data: res.data.data,
      status: res.data.code
    }
  },
  (err) => {
    ElMessage.error(err.response.data.message)
    return {
      data: err.response.data,
      status: err.response.status
    }
  }
)
```

```typescript
// 修改源码：统一处理 response，将 status 情况分类并 reject 出去 
if (res.status !== 200 && res.status !== 0) {
  return reject(res)
}
```

### 子组件 defineExpose 的类型问题

**<InstanceType<typeof AccountLoginForm>>**，其中 AccountLoginForm 是组件的实例，不能直接作为类型使用，通过 InstanceType 获取到组件实例的类型

```typescript
const accountLoginFormRef = ref<InstanceType<typeof AccountLoginForm>>()
const phoneLoginFormRef = ref<InstanceType<typeof PhoneLoginForm>>()
```

### pinia持久化

区别与 coderwhy 直接使用 localCache, 我选择使用 pinia 的持久化插件 [*pinia-plugin-persistedstate*](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)

```bash
pnpm i pinia-plugin-persistedstate
```

随后在 main.ts 中引用

```typescript
// pinia presist
import piniaPluginPersist from 'pinia-plugin-persistedstate'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersist))
```

在 store 中开启

```
export const useUserStore = defineStore(
  'user',
  () => {
  },
  {
    persist: true
  }
)
```

### 手机号登录

区别与 coderwhy，我选择在 store 中存储验证码的倒计时，这样即使页面刷新也不会失效

- 首先在 store 中定义变量，用于存储验证码的倒计时的状态和信息

```typescript
const phoneLoginInfo = ref({
  loading: false,
  remainTime: 30
})

```

- 其次在 store 中将倒计时逻辑完善并在倒计时结束后重置倒计时状态

```typescript
const phoneLoginTime = () => {
  // 非倒计时状态退出
  if (!phoneLoginInfo.value.loading) return

  let timer = setInterval(() => {
    phoneLoginInfo.value.remainTime--

    // 重置倒计时
    if (phoneLoginInfo.value.remainTime <= 0) {
      phoneLoginInfo.value.loading = false
      phoneLoginInfo.value.remainTime = 30
      clearInterval(timer)
    }
  }, 1000)
}
```

- 最后在组件中，通过 **storeToRefs** 引用，可以保持响应性

```

<script lang="ts" setup>
  // .....省略代码
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'

  const { phoneLoginInfo } = storeToRefs(useUserStore())

  // .....省略代码

  // 获取验证码
  const getCode = async () => {
    if (!form.value.phone) return ElMessage.error('请输入手机号')
    
    // 开始倒计时
    phoneLoginInfo.value.loading = true
    useUserStore().phoneLoginTime()
  }


  onMounted(() => {
    // 判断是否有验证码等待
    if (phoneLoginInfo.value.loading) {
      useUserStore().phoneLoginTime()
    }
  })
  < /script>

  < template >
    // .....省略代码
    <el-form-item label="验证码" prop="code">
      <div class="flex items-center gap-2">
        <el-input v-model="form.code" placeholder="请输入验证码" type="password" />
        <el-tag
          :disabled="phoneLoginInfo.loading"
          class="hover:cursor-pointer select-none"
          round
          size="large"
          @click="getCode"
        >
          {{ phoneLoginInfo.loading ? `${phoneLoginInfo.remainTime}秒后重新获取` : '获取验证码' }}
        </el-tag>
      </div>
    </el-form-item>
 </template>

```

## 首页布局

### 权限 & 菜单栏

#### 获取信息

在登录成功后，获取用户权限信息及菜单栏信息
其中权限采取 `RBAC`,管理员账号为 `coderwhy`，普通用户为 `coderdemo`

```typescript
// 获取登录用户的详细信息（role）
const res: ResType<UserRoleInfo> = await getUserInfoApi(userInfo.value.id)
userRoleInfo.value = res.data

// 获取用户菜单权限
const roleRes: ResType<MenuInfo[]> = await getUserMenusApi(userRoleInfo.value.id)
menuInfo.value = roleRes.data
```

#### 菜单栏图标循环渲染

通过 `component` 渲染图标

```vue

<el-icon>
  <component :is="item.icon.substring(7)"></component>
</el-icon>
```

#### 动态路由

核心：先引入所有组件，再动态添加路由

```typescript
// 注册所有的组件
const modules = import.meta.glob('@/views/main/**/**/index.vue')

// 动态添加路由
export const dynamicAddRoute = () => {
  const userStore = useUserStore()

  userStore.menuInfo.map((item: MenuInfo) => {
    item.children.map((child: MenuChildInfo) => {
      if (child.url) {
        const route: Route = {
          path: child.url,
          name: child.url.split('/')[child.url.split('/').length - 1],

          component: modules[`/src/views${child.url}/index.vue`] as () => Component
        }
        router.addRoute('main', route)
      }
    })

    useRouterStore().setRoutes(router.getRoutes())
  })
}
```

问题：

- 添加路由时需要注意，` component: modules[/src/views${child.url}/index.vue] as () => Component`不能使用`@`，需要使用`/src`
- `addRouter()`时，`name`需要填`main`才能添加进`main`的子路由
- 添加完路由后，刷新页面，路由会丢失，需要重新添加路由。在`main.ts`中引用并且放在`app.use(router)`前，即将路由注册完再使用

```typescript
// 路由重加载
const routeRefresh = () => {
  if (userInfo.value.token) {
    dynamicAddRoute()
  }
}
```

#### 优化`pinia`

将`pinia`注册封装为函数，然后导出，在`main.ts`中引用导出函数即可

```typescript
import { createPinia } from 'pinia'
import type { App } from 'vue'

// pinia presist
import piniaPluginPersist from 'pinia-plugin-persistedstate'

import { useUserStore } from '@/stores/user'

const registerStore = (app: App<Element>) => {
  app.use(createPinia().use(piniaPluginPersist))

  useUserStore().routeRefresh()
}

export default registerStore
```

### 头部

左侧新增图标，用过父子组件通信实现菜单栏收缩

### 菜单栏默认值及面包屑

注意点：要使用 `computed` 进行同步

```ts
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


// 页面中使用
// 跟随面包屑的更新而更新
const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path, userStore.menuInfo)
})

// 面包屑实时更新
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, useUserStore().menuInfo)
})
```

## 用户管理

### 国际化

- 第一种方式是全局引入
- 第二种方式是使用 `el-config-provider` 包裹

```ts
// 方法一
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, { locale: zhCn })

// 方法二
import zhCn from 'element-plus/es/locale/lang/zh-cn'

<el-config-provider :locale="zhCn">
   <el-date-picker
		v-model="search.createAt"
		end-placeholder="截止日期"
		range-separator="-"
		start-placeholder="开始日期"
		type="daterange"
		></el-date-picker>
</el-config-provider>
```

### 请求管理

将用户管理的所有请求都放在 `system.ts` 中，这样可以在不同组件中调用函数，避免频繁使用 `defineExpose ` 或事件总线， 减少代码量

### 分页 & 搜索

需要注意 `offset` 的计算问题，其余皆为常规搜索表单及发送请求

```ts
// 获取用户列表
export const getUserListApi: ({ offset, size }: System.PaginationParam) => Promise<any> = ({
  offset = 1,
  size = 10,
  enable = '',
  cellphone = '',
  name = '',
  realname = '',
  createAt = null
}: System.PaginationParam) => {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: (offset - 1) * size,
      size,
      enable,
      cellphone,
      name,
      realname,
      createAt
    }
  })
}

```



### 新增

使用 `el-dialog` 包裹新增用户组件，并接收新增完成后的 `finish` 

新增用户组件则为常规新增表单

```vue
// UserTable.vue

<!-- 新增用户 -->
<el-dialog v-model="addUserDialogShow" destroy-on-close title="新增用户" top="10vh" width="80%">
  <AddUser @finish="addFinish" />
</el-dialog>
```

