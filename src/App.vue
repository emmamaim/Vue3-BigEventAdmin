<script setup>
import zhTw from 'element-plus/es/locale/lang/zh-tw'
</script>

<template>
  <!-- 國際化處理 -->
  <el-config-provider :locale="zhTw">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
