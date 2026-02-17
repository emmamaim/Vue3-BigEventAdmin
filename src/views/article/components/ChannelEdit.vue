<script setup>
import { artAddChannelService, artEditChannelService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// 彈窗
const dialogVisible = ref(false)
// 子傳父 emit
const emit = defineEmits(['success'])
// 綁定數據
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

// 綁定規則
const rules = {
  cate_name: [
    {
      required: true,
      message: '請輸入分類名稱',
      trigger: 'blur'
    },
    {
      pattern: /^\S{1,10}$/,
      message: '分類名必須是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    {
      required: true,
      message: '請輸入分類別名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分類別名必須是1-15位字母或數字',
      trigger: 'blur'
    }
  ]
}

// 表單綁定校驗
const formRef = ref()
// 增加文章分類
const onSubmit = async () => {
  // 先校驗
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('編輯成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  // 關閉彈窗 -> 觸發emit
  dialogVisible.value = false
  emit('sucess')
}

// 組件提供方法open
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '編輯分類' : '添加分類'"
    width="30%"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      label-width="100px"
      ref="formRef"
    >
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="請輸入分類名稱" />
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="請輸入分類別名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">確認</el-button>
      </div>
    </template>
  </el-dialog>
</template>
