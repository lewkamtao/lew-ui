<script setup lang="ts">
const visible = ref(false)

const open = () => {
  visible.value = true
}

defineExpose({ open })
</script>

<template>
  <div>
    <lew-button type="light" color="gray" size="small" @click="open"
      >设置</lew-button
    >
    <lew-modal
      v-model:visible="visible"
      closeOnClickOverlay
      closeByEsc
      width="550px"
      title="设置选项"
      @ok="visible = false"
      @cancel="visible = false"
    >
      <div class="modal-body">
        <div>A beautiful component library based on vue3</div>
      </div>
    </lew-modal>
  </div>
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
