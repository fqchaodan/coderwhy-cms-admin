<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface FormData {
  phone: string
  code: string
}

const form = ref<FormData>({ phone: '', code: '' })
const formRef = ref<FormInstance>()

const rules = ref<FormRules<FormData>>({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const onSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

defineExpose({ onSubmit })
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="手机号" prop="username">
      <el-input v-model="form.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="验证码" prop="password">
      <div class="flex items-center gap-2">
        <el-input v-model="form.code" placeholder="请输入验证码" type="password" />
        <el-tag size="large">获取验证码</el-tag>
      </div>
    </el-form-item>
  </el-form>
</template>
