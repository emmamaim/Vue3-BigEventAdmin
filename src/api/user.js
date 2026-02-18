import request from '@/utils/request'

// 註冊
export const userRigisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登入
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 獲取信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 更新頭像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更新密碼
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
