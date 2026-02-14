import { createRouter, createWebHistory } from 'vue-router'

// 創建路由實例
// createWebHashHistory / createWebHistory
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
