<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { PhoneFormData } from '@/types/login'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const { phoneLoginInfo } = storeToRefs(useUserStore())
const form = ref<PhoneFormData>({ phone: '', code: '' })
const formRef = ref<FormInstance>()

const rules = ref<FormRules<PhoneFormData>>({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 获取验证码
const getCode = async () => {
  if (!form.value.phone) return ElMessage.error('请输入手机号')

  // 开始倒计时
  phoneLoginInfo.value.loading = true
  useUserStore().phoneLoginTime()
}

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

onMounted(() => {
  // 判断是否有验证码等待
  if (phoneLoginInfo.value.loading) {
    useUserStore().phoneLoginTime()
  }
})

defineExpose({ onSubmit })
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="flex items-center gap-2">
        <el-input v-model="form.code" placeholder="请输入验证码" type="password" />
        <el-tag
          :disabled="phoneLoginInfo.loading"
          class="hover:cursor-pointer select-none"
          round
          size="large"
          @click="getCode"
        >
          {{ phoneLoginInfo.loading ? `${phoneLoginInfo.remainTime}秒后重新获取` : '获取验证码' }}
        </el-tag>
      </div>
    </el-form-item>
  </el-form>
</template>
