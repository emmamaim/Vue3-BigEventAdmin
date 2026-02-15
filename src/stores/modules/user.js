import { ref } from 'vue'
import { defineStore } from 'pinia'

// 用戶模塊 token setToken/removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    return { token, setToken, removeToken }
  },
  {
    persist: true
  }
)
