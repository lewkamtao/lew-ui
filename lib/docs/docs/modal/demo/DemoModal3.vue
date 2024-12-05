<script setup lang="ts">
const visible = ref(false)
const ok = () => {
  return new Promise<void>(() => {
    setTimeout(() => {
      visible.value = false
    }, 1000)
  })
}
</script>

<template>
  <lew-flex x="start">
    <lew-button @click="visible = true">自定义</lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    width="450px"
    :okProps="{ request: ok }"
    @cancel="visible = false"
  >
    <template #header>
      <lew-flex x="start" class="lew-modal-header">
        <lew-tag>New</lew-tag>
        这是自定义的头部
      </lew-flex>
    </template>
    <div class="lew-modal-body">
      <div>点击提交，对话框将在1秒后关闭。</div>
    </div>
    <template #footer>
      <lew-flex x="end" y="center" class="lew-modal-footer">
        <lew-flex x="start" gap="5" class="lew-modal-footer-tips">
          提交后立即生效
        </lew-flex>
        <lew-flex x="end" y="center">
          <lew-button type="text" color="gray" :request="ok">取消</lew-button>
          <lew-button :request="ok">提交</lew-button>
        </lew-flex>
      </lew-flex>
    </template>
  </lew-modal>
</template>

<style lang="scss" scoped>
.lew-modal-body {
  width: 100%;
  height: 100%;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

.lew-modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 18px;
  font-weight: bolder;
  padding: 0px 10px;
}
.lew-modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  padding: 10px;
}
.lew-modal-footer-tips {
  font-size: 14px;
  font-weight: normal;
  color: var(--lew-text-color-8);
  padding-left: 10px;
}
</style>
