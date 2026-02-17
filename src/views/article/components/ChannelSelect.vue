<script setup>
import { ref } from 'vue'
import { artGetChannelService } from '@/api/article'
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <!-- 將v-model拆開 :modelValue和@update:modelValue -->
  <el-select
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :label="channel.cate_name"
      :value="channel.id"
      :key="channel.id"
    />
  </el-select>
</template>
