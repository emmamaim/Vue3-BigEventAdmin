<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artEditService,
  artGetDetailService,
  artPublishService
} from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'
// 抽屜顯示
const visibleDrawer = ref(false)

// 默認數據
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}

// 表單數據
const formModel = ref({ ...defaultForm })

// 組件提供方法open
const editorRef = ref()
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // id存在 -> 獲得文章詳情再編輯
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    // 後台圖片需要file格式，需轉換
    formModel.value.cover_img = await imgUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    // id不存在 -> 使用默認數據再編輯
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

// 上傳圖片
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 發佈文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  //轉換formData數據
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    // id存在 -> 編輯
    await artEditService(fd)
    ElMessage.success('編輯成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // id不存在 -> 添加請求
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

// 圖片轉file格式
// 圖片地址轉換為File對象
async function imgUrlToFile(url, fileName) {
  try {
    // 使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 將圖片數據轉為Blob對象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 創建新的File對象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('將圖片轉換為File對象時發生錯誤:', error)
    throw error
  }
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屜Drawer區域 -->
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '編輯文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 內置表單 -->
    <el-form ref="formRef" :model="formModel" label-width="100px">
      <el-form-item label="文章標題" prop="title" placeholder="請輸入標題">
        <el-input v-model="formModel.title" placeholder="請輸入標題" />
      </el-form-item>
      <el-form-item label="文章分類" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%">
        </channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 無需配置action等參數，只做本地圖片預覽
        URL.createObjectURL(...) -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- vue-quill編輯器 -->
      <!-- url:https://vueup.github.io/vue-quill/ -->
      <el-form-item label="文章內容" prop="content">
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
            ref="editorRef"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">發佈</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
