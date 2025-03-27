<script lang="ts" setup>
import { ref } from 'vue'
import { Avatar, Phone } from '@element-plus/icons-vue'
import AccountLoginForm from '@/views/login/components/AccountLoginForm.vue'
import PhoneLoginForm from '@/views/login/components/PhoneLoginForm.vue'
import { useUserStore } from '@/stores/user'

const curTab = ref(0)

const passwordChecked = ref(useUserStore().isRembered)

const forget = () => {
  console.log('忘记密码')
}

// submit
const accountLoginFormRef = ref<InstanceType<typeof AccountLoginForm>>()
const phoneLoginFormRef = ref<InstanceType<typeof PhoneLoginForm>>()

const submit = () => {
  curTab.value === 0 ? accountLoginFormRef.value?.onSubmit(passwordChecked.value) : phoneLoginFormRef.value?.onSubmit()
}
</script>

<template>
  <div class="w-330px h-auto flex flex-col gap-5 rounded drop-shadow-xl p-10 box-content acrylic-effect">
    <h1>番茄后台管理系统</h1>

    <el-tabs v-model="curTab" class="!bg-[rgba(255,255,255,0.4)] rounded" stretch type="border-card">
      <el-tab-pane :name="0">
        <template #label>
          <div class="full center gap-1 !bg-[rgba(255,255,255,0.4)">
            <el-icon size="16">
              <avatar />
            </el-icon>
            <span>账号登录</span>
          </div>
        </template>
        <AccountLoginForm ref="accountLoginFormRef"></AccountLoginForm>
      </el-tab-pane>
      <el-tab-pane :name="1">
        <template #label>
          <span class="center gap-1">
            <el-icon size="16"><phone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <PhoneLoginForm ref="phoneLoginFormRef"></PhoneLoginForm>
      </el-tab-pane>
    </el-tabs>

    <div class="w-full flex items-center justify-between">
      <el-checkbox v-model="passwordChecked" label="记住密码" />
      <div class="text-sm text-[--el-color-primary] cursor-pointer" @click="forget">忘记密码</div>
    </div>

    <el-button icon="pointer" size="large" type="primary" @click="submit">立即登录</el-button>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  background-color: rgba(255, 255, 255, 0.4);
}

.acrylic-effect {
  backdrop-filter: blur(2px); /* 应用背景模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* Safari 浏览器兼容写法 */
  background: rgba(255, 255, 255, 0.2); /* 设置半透明背景 */
  border: 1px solid rgba(255, 255, 255, 0.8); /* 边框颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果增强立体感 */
}
</style>
