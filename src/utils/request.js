import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'https://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 自定義配置 (請求/響應攔截器)
// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 攜帶token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 回應攔截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    // 處理業務錯誤，給提示
    ElMessage.error(res.data.message || '服務異常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 處理401錯誤
    // 錯誤的特殊情況 => 401 權限不足/token過期 =>攔截到登入
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 錯誤的默認情況 => 給提示
    ElMessage.error(err.response.data.message || '服務異常')
    return Promise.reject(err)
  }
)

// 導出
export default instance
export { baseURL }
