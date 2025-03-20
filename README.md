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
