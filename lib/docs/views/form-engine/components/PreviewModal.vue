<script setup lang="ts">
const visible = ref(false)
const bindOptions = ref({})
const formRef = ref()
const open = (options: any) => {
  visible.value = true
  bindOptions.value = options
}
const ok = () => {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      LewMessage.success('校验成功')
    } else {
      LewMessage.error('校验失败')
    }
  })
}
defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    :cancelProps="{
      text: '关闭'
    }"
    :okProps="{
      text: '校验表单'
    }"
    @ok="ok"
    @cancel="visible = false"
    title="预览表单"
  >
    <div class="preview-modal-content lew-scrollbar">
      <lew-form ref="formRef" v-bind="bindOptions" />
    </div>
  </lew-modal>
</template>
<style lang="scss" scoped>
.preview-modal-content {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}
</style>
