<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artDelService, artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
// loading载入效果
const loading = ref(false)
// 文章列表
const articleList = ref([])
// 總數
const total = ref(0)
// 請求參數對象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 獲取文章
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 分頁控制
// 更新每頁顯示條數
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 更新當前頁
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 搜索
const onSearch = () => {
  // 重置頁面
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const onReset = () => {
  // 重置頁面
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 添加
const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 編輯
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 刪除
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('您確認刪除該文章信息嗎？', '溫馨提示', {
    type: 'warning',
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '刪除成功' })
  getArticleList()
}

//添加或編輯成功
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表單區域 -->
    <el-form inline>
      <el-form-item label="文章分類：">
        <channel-select
          v-model="params.cate_id"
          style="width: 100px"
        ></channel-select>
      </el-form-item>
      <el-form-item label="發佈狀態：">
        <el-select v-model="params.state" style="width: 100px">
          <!-- 因後端資料皆為簡體字，此處value要對應後端資料 -->
          <el-option label="已發佈" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格區域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column prop="title" label="文章標題">
        <template #default="{ row }">
          <el-link type="primary" underline="never">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分類"></el-table-column>
      <el-table-column prop="pub_date" label="發表時間">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="狀態"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分頁區域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屜區域 需監聽success-->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
