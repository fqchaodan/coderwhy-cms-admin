<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { AccountFormData, LoginResponseData } from '@/types/login'
import { accountLoginApi } from '@/service/login'
import { useUserStore } from '@/stores/user'
import type { ResType } from '@/types'

const userStore = useUserStore()

const form = ref<AccountFormData>({
  account: userStore.userInfo.account || '',
  password: userStore.userInfo.password || ''
})
const formRef = ref<FormInstance>()

if (import.meta.env.VITE_URL === 'dev') {
  // form.value = { account: '', password: '' }
}

const rules = ref<FormRules<AccountFormData>>({
  account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const onSubmit = async (passwordChecked: boolean) => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      accountLoginApi(form.value)
        .then((res: ResType<LoginResponseData>) => {
          userStore.login(res.data)

          // 判断是否记住密码
          userStore.isRembered = passwordChecked
          if (passwordChecked) {
            useUserStore().setUserInfo({ account: form.value.account, password: form.value.password })
          } else {
            useUserStore().setUserInfo({ account: '', password: '' })
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage.error(err.data || '账号或密码错误')
        })
    } else {
      console.log('error submit!', fields)
      ElMessage.error('请完成必填项后提交~~')
    }
  })
}

defineExpose({ onSubmit })
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="帐号" prop="account">
      <el-input v-model="form.account" clearable placeholder="请输入帐号" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" show-password type="password" />
    </el-form-item>
  </el-form>
</template>
