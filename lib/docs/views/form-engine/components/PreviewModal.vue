<script setup lang="ts">
const visible = ref(false)
const bindOptions = ref({})
const formRef = ref()
function open(options: any) {
  visible.value = true
  bindOptions.value = options
}
function ok() {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      LewMessage.success('校验成功')
    }
    else {
      LewMessage.error('校验失败')
    }
  })
}
defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    close-on-click-overlay
    close-by-esc
    max-height="calc(100vh - 240px - 50px - 72px)"
    :close-button-props="{
      request: () => {
        visible = false
      },
    }"
    :ok-button-props="{
      text: '校验表单',
      request: ok,
    }"
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
}
</style>
