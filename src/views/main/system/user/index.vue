<script lang="ts" setup>
import Search from '@/views/main/system/user/components/Search.vue'
import UserTable from '@/views/main/system/user/components/UserTable.vue'
</script>

<template>
  <div class="full flex flex-col bg-white rounded p-2 shadow overflow-auto">
    <Search></Search>
    <el-divider />
    <UserTable class="flex-1"></UserTable>
  </div>
</template>

<style lang="less" scoped></style>
