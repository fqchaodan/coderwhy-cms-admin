<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElForm, ElMessage, type FormRules } from 'element-plus'
import { useSystemStore } from '@/stores/system'

const emits = defineEmits(['finish'])

const systemStore = useSystemStore()
const addForm = ref<InstanceType<typeof ElForm>>()
const form = ref<System.AddUserInfo>({
  name: '',
  realname: '',
  password: '',
  cellphone: undefined,
  roleId: undefined,
  departmentId: undefined
})

const rules = ref<FormRules<System.AddUserInfo>>({
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  realname: [
    {
      required: true,
      message: '请输入真实姓名',
      trigger: 'blur'
    }
  ],
  cellphone: [
    {
      required: true,
      message: '请输入电话号码',
      trigger: 'blur'
    }
  ],
  roleId: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }
  ],
  departmentId: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'blur'
    }
  ]
})

const reset = async () => {
  addForm.value?.resetFields()
}

const onAdd = async () => {
  if (!addForm.value) return
  await addForm.value.validate(async (valid, fields) => {
    if (valid) {
      await systemStore.addUser(form.value)
      emits('finish')
    } else {
      ElMessage.error('新增用户失败')
    }
  })
}

onMounted(() => {
  systemStore.getRoleList()
  systemStore.getDepartmentList()
})
</script>

<template>
  <div class="w-full p-x-10">
    <el-form ref="addForm" :model="form" :rules="rules" class="w-60%" label-suffix=":" label-width="auto">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" class="!w-150px" clearable placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" class="!w-150px" clearable placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="form.realname" class="!w-150px" clearable placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="cellphone">
        <el-input v-model="form.cellphone" class="!w-150px" clearable placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="选择部门" prop="roleId">
        <el-select v-model="form.roleId">
          <el-option
            v-for="item in systemStore.roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" prop="departmentId">
        <el-select v-model="form.departmentId">
          <el-option
            v-for="item in systemStore.departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="w-full text-align-right">
      <el-button icon="refresh" plain round type="warning" @click="reset">重置</el-button>
      <el-button icon="plus" round type="primary" @click="onAdd">新增</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
