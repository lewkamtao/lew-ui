<script setup lang="ts">
const visible = ref(false)
</script>

<template>
  <lew-flex x="start">
    <lew-button @click="visible = true">按下Esc关闭</lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    width="350px"
    title="About Lew-UI"
    :closeButtonProps="{
      request: () => {
        visible = false
      }
    }"
    :okButtonProps="{
      request: () => {
        visible = false
      }
    }"
  >
    <div class="modal-body">
      <div>A beautiful component library based on vue3</div>
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
