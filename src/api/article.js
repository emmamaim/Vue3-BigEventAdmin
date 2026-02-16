import request from '@/utils/request'

// 獲取文章分類
export const artGetChannelService = () => request.get('/my/cate/list')

// 添加文章分類
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 編輯文章分類
export const artEditChannelService = (data) => request.put('/my/cate/info', data)

// 刪除文章分類
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
