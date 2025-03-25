<script lang="ts" setup>
import { useUserStore } from '@/stores/user.js'
</script>

<template>
  <div>
    <el-button type="warning" @click="useUserStore().logout()">退出登录</el-button>
  </div>
</template>

<style lang="less" scoped></style>
