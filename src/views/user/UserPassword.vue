<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdatePassService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

// 導入pinia數據 / 路由
const userStore = useUserStore()
const router = useRouter()

// 表單數據 / 規則
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const formRef = ref()

// 自訂驗證規則
const pwdPattern = /^\S{6,15}$/
// 自訂驗證1：原密碼 與 新密碼不可相同
const validateNewPwdNotSame = (rule, value, callback) => {
  if (!value) return callback(new Error('新密碼不可為空'))
  if (pwdForm.value.old_pwd && value === pwdForm.value.old_pwd) {
    return callback(new Error('新密碼不可與原密碼相同'))
  }
  callback()
}
// 自訂驗證2：新密碼 與 確認密碼必須一致
const validateRePwdSame = (rule, value, callback) => {
  if (!value) return callback(new Error('確認密碼不可為空'))
  if (value !== pwdForm.value.new_pwd) {
    return callback(new Error('兩次輸入的新密碼不一致'))
  }
  callback()
}
// 校驗規則
const rules = {
  old_pwd: [
    { required: true, message: '原密碼不可為空', trigger: 'blur' },
    {
      pattern: pwdPattern,
      message: '原密碼需為 6-15 位非空字元',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '新密碼不可為空', trigger: 'blur' },
    {
      pattern: pwdPattern,
      message: '新密碼需為 6-15 位非空字元',
      trigger: 'blur'
    },
    { validator: validateNewPwdNotSame, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '確認密碼不可為空', trigger: 'blur' },
    {
      pattern: pwdPattern,
      message: '確認密碼需為 6-15 位非空字元',
      trigger: 'blur'
    },
    { validator: validateRePwdSame, trigger: ['blur', 'change'] }
  ]
}

// 提交
const onSubmit = async () => {
  // 先校驗
  await formRef.value.validate()
  // 發請求修改密碼
  await userUpdatePassService(pwdForm.value)
  // 提示用戶
  ElMessage.success('修改密碼成功！')
  // 重新登入->清除token->路由跳轉
  userStore.setToken('')
  userStore.setUser({})
  router.push('/login')
}
// 重置
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密碼">
    <el-form
      ref="formRef"
      :model="pwdForm"
      :rules="rules"
      label-width="100px"
      status-icon
    >
      <!-- 第一行：原密碼 -->
      <el-form-item label="原密碼" prop="old_pwd">
        <el-input
          v-model.trim="pwdForm.old_pwd"
          type="password"
          show-password
          placeholder="請輸入原密碼"
        />
      </el-form-item>

      <!-- 第二行：新密碼 -->
      <el-form-item label="新密碼" prop="new_pwd">
        <el-input
          v-model.trim="pwdForm.new_pwd"
          type="password"
          show-password
          placeholder="請輸入新密碼"
        />
      </el-form-item>

      <!-- 第三行：確認密碼 -->
      <el-form-item label="確認密碼" prop="re_pwd">
        <el-input
          v-model.trim="pwdForm.re_pwd"
          type="password"
          show-password
          placeholder="請再次輸入新密碼"
        />
      </el-form-item>

      <!-- 第四行：按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密碼</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
.el-form {
  max-width: 420px;
}
</style>
