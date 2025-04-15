<script lang="ts" setup>
import { ref } from 'vue'
import { ElForm } from 'element-plus'
import { useSystemStore } from '@/stores/system'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const systemStore = useSystemStore()
const search = ref<System.UserSearchParam>({
  cellphone: undefined,
  name: '',
  realname: '',
  enable: '',
  createAt: null
})
const searchForm = ref<InstanceType<typeof ElForm>>()

const reset = async () => {
  searchForm.value?.resetFields()
  await systemStore.getUserList()
}

const onSearch = async () => {
  await systemStore.getUserList(search.value)
}
</script>

<template>
  <div class="p-2">
    <el-form ref="searchForm" :inline="true" :model="search">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="search.name" class="!w-150px" clearable placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="search.realname" class="!w-150px" clearable placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="cellphone">
        <el-input v-model="search.cellphone" class="!w-150px" clearable placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-select v-model="search.enable" class="!w-150px" placeholder="请选择状态">
          <el-option :value="1" label="启用"></el-option>
          <el-option :value="0" label="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createAt">
        <el-config-provider :locale="zhCn">
          <el-date-picker
            v-model="search.createAt"
            end-placeholder="截止日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="daterange"
          ></el-date-picker>
        </el-config-provider>
      </el-form-item>
    </el-form>
    <div class="w-full text-align-right">
      <el-button icon="refresh" plain round type="warning" @click="reset">重置</el-button>
      <el-button icon="search" round type="primary" @click="onSearch">查询</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
