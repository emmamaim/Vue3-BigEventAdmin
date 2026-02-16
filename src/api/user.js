import request from '@/utils/request'

// 註冊
export const userRigisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登入
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 獲取用戶基本信息
export const userGetInfoService = () => request.get('/my/userinfo')
