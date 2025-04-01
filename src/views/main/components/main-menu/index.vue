<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/menu'
import { computed } from 'vue'

const props = defineProps({
  iconShow: {
    type: Boolean,
    default: true
  }
})

const userStore = useUserStore()

// 跟随面包屑的更新而更新
const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path, userStore.menuInfo)
})
</script>

<template>
  <el-scrollbar height="100vh">
    <div class="w-full h-full flex flex-col items-center">
      <!--  Logo  -->
      <div class="w-full h-30px flex items-center justify-around p-1">
        <img alt="logo" class="h-full" src="@/assets/image/logo.svg" />
        <div v-show="props.iconShow" class="font-bold text-[--el-color-primary-text]">Tomato Admin</div>
      </div>

      <!-- Menu -->
      <el-menu
        :collapse="!iconShow"
        :default-active="defaultActive"
        active-text-color="#409EFF"
        class="w-full select-none !border-none"
        collapse-transition
        popper-effect="light"
        router
      >
        <template v-for="item in userStore.menuInfo" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.substring(7)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id">
              <el-menu-item :index="child.id + ''" :route="child.url">{{ child.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<style lang="less" scoped></style>
