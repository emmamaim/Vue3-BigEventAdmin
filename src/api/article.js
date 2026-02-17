import request from '@/utils/request'

// 分類-Channel
// 獲取文章分類
export const artGetChannelService = () => request.get('/my/cate/list')

// 添加文章分類
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 編輯文章分類
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// 刪除文章分類
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章管理-Manage
// 獲取文章
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })

// 發佈文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 編輯文章 -> 1.獲取文章詳情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })
// 編輯文章 -> 2.編輯文章詳情
export const artEditService = (data) => request.put('/my/article/info', data)

// 刪除文章
export const artDelService = (id) =>
  request.delete('/my/article/info', { params: { id } })
