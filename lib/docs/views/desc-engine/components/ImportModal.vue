<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
const visible = ref(false)
const fieldOptions = ref('')
const open = () => {
  fieldOptions.value = ''
  visible.value = true
}
const emit = defineEmits(['import'])
// Start of Selection
const ok = () => {
  try {
    const parsedData = JSON.parse(fieldOptions.value)
    if (typeof parsedData === 'object' && parsedData !== null) {
      emit('import', cloneDeep(parsedData))
      visible.value = false
    } else {
      LewMessage.warning(
        '输入的内容不符合对象格式，请输入一个有效的 JSON 对象字符串！'
      )
    }
  } catch (error) {
    LewMessage.warning(
      '输入的内容不符合对象格式，请输入一个有效的 JSON 对象字符串！'
    )
  }
}
defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    width="500"
    :cancelProps="{
      text: '取消'
    }"
    :okProps="{
      text: '导入'
    }"
    @ok="ok"
    @cancel="visible = false"
    title="预览表单"
  >
    <div class="import-modal-content lew-scrollbar">
      <lew-textarea
        height="400"
        placeholder="请输入一个 JSON Object字符串"
        v-model="fieldOptions"
      />
    </div>
  </lew-modal>
</template>
<style lang="scss" scoped>
.import-modal-content {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}
</style>
