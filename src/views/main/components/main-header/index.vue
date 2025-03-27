<script lang="ts" setup>
import { ref } from 'vue'
import HeaderInfo from '@/views/main/components/main-header/HeaderInfo.vue'

const emits = defineEmits(['iconShow'])

const iconShow = ref(true)
const handleMenuIcon = () => {
  iconShow.value = !iconShow.value
  emits('iconShow', iconShow.value)
}
</script>

<template>
  <div class="full flex items-center justify-between p-1 select-none hover:cursor-pointer">
    <div class="flex items-center gap-2">
      <el-icon class="menu" size="20px" @click="handleMenuIcon">
        <component :is="iconShow ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <HeaderInfo />
  </div>
</template>

<style lang="less" scoped>
// 给图标切换添加动画
.menu {
  transition: all 0.3s;

  &:hover {
    transform: rotate(360deg);
    color: #409eff;
  }
}
</style>
