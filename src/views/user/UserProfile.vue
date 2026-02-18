<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
import { ElMessage } from 'element-plus'

// 使用pinia數據 -> 解構
const {
  user: { email, nickname, id, username },
  getUser
} = useUserStore()

// 表單資料（username 通常由後端回填）
const form = ref({
  username, // 範例：登入名稱
  nickname,
  email,
  id
})

// 驗證規則
const rules = {
  nickname: [
    { required: true, message: '暱稱不可為空', trigger: 'blur' },
    { pattern: /^\S{2,10}$/, message: '暱稱長度需為2-10位', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '信箱不可為空', trigger: 'blur' },
    { type: 'email', message: '信箱格式不正確', trigger: ['blur', 'change'] }
  ]
}
const formRef = ref()

// 點擊提交修改
const onSubmit = async () => {
  // 先校驗
  await formRef.value.validate()
  // 更新信息
  await userUpdateInfoService(form.value)
  // 更新pinia數據
  await getUser()
  // 提示用戶
  ElMessage.success('修改成功！')
}
</script>
<template>
  <page-container title="基本資料">
    <!-- 表單部分 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <!-- 第一行：登入名稱（禁用） -->
      <el-form-item label="登入名稱">
        <el-input v-model="form.username" disabled />
      </el-form-item>

      <!-- 第二行：用戶暱稱（可輸入 + 驗證） -->
      <el-form-item label="用戶暱稱" prop="nickname">
        <el-input v-model="form.nickname" placeholder="請輸入2-10位暱稱" />
      </el-form-item>

      <!-- 第三行：用戶信箱（可輸入 + 驗證） -->
      <el-form-item label="用戶信箱" prop="email">
        <el-input v-model="form.email" placeholder="請輸入信箱" />
      </el-form-item>

      <!-- 第四行：按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
/* 可選：控制表單寬度 */
.el-form {
  max-width: 420px;
}
</style>
