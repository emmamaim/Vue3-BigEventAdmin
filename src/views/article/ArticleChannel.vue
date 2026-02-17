<script setup>
import { artDelChannelService, artGetChannelService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const dialog = ref()

// 獲取分類
const channelList = ref([])
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
// 編輯
const onEditChannel = (row) => {
  dialog.value.open(row)
}
// 刪除
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('您確認要刪除該分類碼？', '溫馨提示', {
    type: 'warning',
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('刪除成功')
  getChannelList()
}
// 添加
const onAddChannel = () => {
  dialog.value.open({})
}
// 監聽子組件的sucess
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分類">
    <template #extra>
      <el-button @click="onAddChannel">添加分類</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序號" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分類名稱"></el-table-column>
      <el-table-column prop="cate_alias" label="分類別名"></el-table-column>
      <!-- 自定義 -->
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            circle
            type="primary"
            :icon="Edit"
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            circle
            type="danger"
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="沒有數據"></el-empty>
      </template>
    </el-table>
    <channel-edit ref="dialog" @sucess="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
