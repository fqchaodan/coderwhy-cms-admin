# coderwhy-cms-admin

本项目通过 coderwhy 视频学习制作，并加入自己理解，集成更多细节配置

## 技术栈

- vue3 + TS + Vue-Router + Pinia + Axios
- Element-plus + UnoCSS
- 包管理器使用pnpm

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

区别与 coderwhy 直接使用 localCache, 我选择使用 pinia 的持久化插件 `pinia-plugin-persistedstate`

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

```typescript
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

- 最后在组建中，通过 **storeToRefs** 引用，可以保持响应性

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
