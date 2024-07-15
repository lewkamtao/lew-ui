<script setup lang="ts">
const visible = ref(false)
const bindOptions = ref({})
const open = (options: any) => {
  visible.value = true
  bindOptions.value = options
}
defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    hideOkButton
    :cancelProps="{
      text: '关闭'
    }"
    @cancel="visible = false"
    title="预览表单"
  >
    <div class="form-modal lew-scrollbar">
      <lew-form v-bind="bindOptions" />
    </div>
  </lew-modal>
</template>
<style lang="scss" scoped>
.footer {
  padding: 5px 15px;
}
.form-modal {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}
</style>
