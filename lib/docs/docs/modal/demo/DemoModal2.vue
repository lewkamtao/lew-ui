<script setup lang="ts">
const visible = ref(false);
const ok = () => {
  return new Promise<void>((resolve: any) => {
    setTimeout(() => {
      resolve(true);
      visible.value = false;
    }, 1000);
  });
};

const close = () => {
  visible.value = false
}
</script>

<template>
  <lew-flex x="start">
    <lew-button @click="visible = true">异步关闭</lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    width="350px"
    title="模拟异步请求"
    :okButtonProps="{ request: ok }"
    :closeButtonProps="{ request: close }"
  >
    <div class="modal-body">
      <div>点击确定，对话框将在1秒后关闭。</div>
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
  width: 100%;
  height: 100%;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 18px;
  font-weight: bolder;
}
</style>
