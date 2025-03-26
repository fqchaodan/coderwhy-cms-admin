<script lang="ts" setup>
import MainMenu from '@/views/home/components/main-menu/index.vue'
import MainHeader from '@/views/home/components/main-header/index.vue'
</script>

<template>
  <div class="w-full h-100vh">
    <el-container class="w-full h-full">
      <el-aside class="!w-200px h-full">
        <MainMenu />
      </el-aside>
      <el-container>
        <el-header class="!h-30px bg-amber">
          <MainHeader />
        </el-header>
        <el-main class="bg-slate">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped></style>
