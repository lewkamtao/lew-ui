<script setup lang="ts">
const visible = ref(false);
const bindOptions = ref({});
const formRef = ref();
const open = (options: any) => {
  visible.value = true;
  bindOptions.value = options;
};
const ok = () => {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      LewMessage.success('校验成功');
    } else {
      LewMessage.error('校验失败');
    }
  });
};
defineExpose({ open });
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    maxHeight="calc(100vh - 240px - 50px - 72px)"
    :closeButtonProps="{
      request: () => {
        visible = false;
      },
    }"
    :okButtonProps="{
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
