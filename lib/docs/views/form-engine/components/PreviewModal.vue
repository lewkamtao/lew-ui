<script setup lang="ts">
const width = ref(1200)
const visible = ref(false)
const bindOptions = ref({})
const open = (options: any) => {
  visible.value = true
  width.value = options.columns * 320 + 40 + 20 * (options.columns - 1)
  bindOptions.value = options
}
defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    :width="width"
    title="预览表单"
    @ok="visible = false"
    @cancel="visible = false"
  >
    <div class="form-modal">
      <lew-form v-bind="bindOptions" />
    </div>
  </lew-modal>
</template>
<style lang="scss" scoped>
.form-modal {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}
</style>
