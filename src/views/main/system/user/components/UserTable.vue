<script lang="ts" setup>
import { ref } from 'vue'
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import AddUser from '@/views/main/system/user/components/AddUser.vue'

const systemStore = useSystemStore()

systemStore.getUserList()
const { userList, paginationParam } = storeToRefs(systemStore)

const handleChange = (page: number, pageSize: number) => {
  paginationParam.value.offset = page
  paginationParam.value.size = pageSize
  systemStore.getUserList()
}

// 删除用户
const onClickDelete = async (id: number) => {
  await systemStore.deleteUser(id)
}

// 新增用户
const addUserDialogShow = ref(false)
const addUser = () => {
  addUserDialogShow.value = true
}

const addFinish = () => {
  addUserDialogShow.value = false
  systemStore.getUserList()
}
</script>

<template>
  <div>
    <div class="w-full flex items-center justify-between">
      <div>用户列表</div>
      <el-button plain round size="small" type="primary" @click="addUser">新增用户</el-button>
    </div>

    <el-table :data="userList" highlight-current-row>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>

      <el-table-column label="用户名" prop="name" width="120px"></el-table-column>
      <el-table-column label="真实姓名" prop="realname" width="120px"></el-table-column>
      <el-table-column label="手机号码" prop="cellphone" width="120px"></el-table-column>
      <el-table-column label="状态" prop="enable" width="80px">
        <template #default="scope">
          <el-tag :type="scope.row.enable ? 'success' : 'danger'">{{ scope.row.enable ? '启用' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createAt">
        <template #default="scope">
          <div>{{ formatUTC(scope.row.createAt) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateAt">
        <template #default="scope">
          <div>{{ formatUTC(scope.row.updateAt) }}</div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="140px">
        <template #default="scope">
          <el-button class="!m-l-0 !p-y-5px !p-x-2px" icon="edit" size="small" text type="warning">修改</el-button>
          <el-button
            class="!m-l-0 !p-y-5px !p-x-2px"
            icon="delete"
            size="small"
            text
            type="danger"
            @click="onClickDelete(scope.row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="w-full flex justify-end p-1">
      <el-pagination
        v-model:current-page="paginationParam.offset"
        v-model:page-size="paginationParam.size"
        :page-sizes="[10, 20, 50]"
        :total="paginationParam.totalCount"
        layout="total, sizes, prev, pager, next"
        @change="handleChange"
      ></el-pagination>
    </div>

    <!-- 新增用户 -->
    <el-dialog v-model="addUserDialogShow" destroy-on-close title="新增用户" top="10vh" width="80%">
      <AddUser @finish="addFinish" />
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
