<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from './stores'

const route = useRoute()
const router = useRouter()

const goList = () => {
  router.push('/list')
  console.log(route)
}

const userStore = useUserStore()
</script>

<template>
  <router-view></router-view>

  <hr />
  <div>我是app</div>
  <el-button @click="$router.push('/home')">跳首頁</el-button>
  <el-button @click="goList">跳列表頁</el-button>
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('Bearer asdbiasl')">登入</el-button>
</template>

<style scoped></style>
