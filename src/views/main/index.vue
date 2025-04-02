<script lang="ts" setup>
import { ref } from 'vue'
import MainMenu from '@/views/main/components/main-menu/index.vue'
import MainHeader from '@/views/main/components/main-header/index.vue'

const iconShow = ref(true)
const onIconShow = (show: boolean) => {
  iconShow.value = show
}
</script>

<template>
  <div class="w-full h-100vh">
    <el-container class="w-full h-full">
      <el-aside :class="iconShow ? '!w-200px' : '!w-50px'" class="h-full">
        <MainMenu :iconShow="iconShow" />
      </el-aside>
      <el-container>
        <el-header class="!h-50px !p-0">
          <MainHeader @icon-show="onIconShow" />
        </el-header>
        <el-main class="bg-gray-1 rounded !p-10px">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped></style>
