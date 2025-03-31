<script lang="ts" setup>
import LoginPanel from '@/views/login/components/LoginPanel.vue'

import { useUserStore } from '@/stores/user'

// 进入登录页时，清空用户信息
useUserStore().clearUserInfo()
</script>

<template>
  <div class="login w-full h-100vh center bg-[url('@/assets/image/login-bg.gif')]">
    <LoginPanel></LoginPanel>
  </div>
</template>

<style lang="less" scoped></style>
