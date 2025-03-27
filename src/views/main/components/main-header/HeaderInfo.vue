<script lang="ts" setup>
import { ChatDotRound, CircleCloseFilled, InfoFilled, Message, QuestionFilled, Search } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
</script>

<template>
  <div class="flex items-center gap-4 pr-4">
    <el-icon size="20px">
      <Message></Message>
    </el-icon>
    <el-icon size="20px">
      <ChatDotRound></ChatDotRound>
    </el-icon>
    <el-icon size="20px">
      <Search></Search>
    </el-icon>

    <!-- 右键菜单 -->
    <el-dropdown placement="bottom" trigger="hover">
      <div class="flex items-center gap-2">
        <el-avatar :size="40">
          <img alt="" src="https://picsum.photos/100/100" />
        </el-avatar>
        <div>{{ useUserStore().userRoleInfo.name || useUserStore().userRoleInfo.role?.name }}</div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="useUserStore().logout()">
            <el-icon>
              <CircleCloseFilled />
            </el-icon>
            <div>退出系统</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon>
              <InfoFilled />
            </el-icon>
            <div>个人信息</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon>
              <QuestionFilled />
            </el-icon>
            <div>修改密码</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped></style>
