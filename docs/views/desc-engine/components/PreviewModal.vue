<script setup lang="ts">
const visible = ref(false)
const bindOptions = ref({})
function open(options: any) {
  visible.value = true
  bindOptions.value = options
}

defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    close-on-click-overlay
    close-by-esc
    :close-button-props="{
      request: () => {
        visible = false;
      },
    }"
    hide-ok-button
    title="预览效果"
  >
    <div class="preview-modal-content lew-scrollbar">
      <lew-desc v-bind="bindOptions" />
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
