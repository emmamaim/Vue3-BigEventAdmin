<script setup>
import { userRigisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
const form = ref()
// 註冊
// 表單數據對象 :model=formModel
// 表單元素綁定數據 v-model="formModel.xxx"
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 數據規則綁定 :rule:"rules"
// 數據校驗規則綁定:在el-form-item裡，prop="元素名"
const rules = {
  username: [
    { required: true, message: '請輸入用戶名', trigger: 'blur' },
    {
      min: 5,
      max: 10,
      message: '用戶名必須是5-10位的字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須是6-10位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須是6-10位的非空字符',
      trigger: 'blur'
    },
    // 自定義校驗
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('兩次輸入的密碼不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 註冊 按鈕點擊 預校驗
const register = async () => {
  await form.value.validate()
  await userRigisterService(formModel.value)
  ElMessage.success('註冊成功')
  isRegister.value = false
}

// 登入 按鈕點擊 預校驗
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  router.push('/')
}

// 切換登入或註冊時候需要重置表單信息
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>註冊</h1>
          re65-0987645357565
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="請再次輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
          >
            註冊
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" underline="always" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登入</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>記住我</el-checkbox>
            <el-link type="primary" underline="never">忘記密碼？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
          >
            登入
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" underline="never" @click="isRegister = true">
            註冊 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
