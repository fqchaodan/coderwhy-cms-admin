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
  <div class="w-330px flex flex-col gap-5 drop-shadow-xl">
    <h1>番茄后台管理系统</h1>

    <el-tabs v-model="curTab" class="rounded" stretch type="border-card">
      <el-tab-pane :name="0">
        <template #label>
          <span class="center gap-1">
            <el-icon size="16"><avatar /></el-icon>
            <span>账号登录</span>
          </span>
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

<style lang="less" scoped></style>
