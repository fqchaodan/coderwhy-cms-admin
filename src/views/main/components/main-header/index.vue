<script lang="ts" setup>
import { computed, ref } from 'vue'
import HeaderInfo from '@/views/main/components/main-header/HeaderInfo.vue'
import { mapPathToBreadcrumbs } from '@/utils/menu'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const emits = defineEmits(['iconShow'])

const iconShow = ref(true)
const handleMenuIcon = () => {
  iconShow.value = !iconShow.value
  emits('iconShow', iconShow.value)
}

// 面包屑实时更新
const route = useRoute()
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, useUserStore().menuInfo)
})
</script>

<template>
  <div class="full flex items-center justify-between p-1 select-none hover:cursor-pointer">
    <div class="flex items-center gap-2">
      <el-icon class="menu" size="20px" @click="handleMenuIcon">
        <component :is="iconShow ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbs" :key="item.path">
          <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
        </template>
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
