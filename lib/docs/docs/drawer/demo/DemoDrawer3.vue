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
  <lew-drawer
    v-model:visible="visible"
    closeOnClickOverlay
    width="750px"
    :okProps="{ request: ok }"
    @cancel="visible = false"
  >
    <template #header>
      <lew-flex x="start" class="lew-drawer-header">
        <lew-tag>New</lew-tag>
        这是自定义的头部
      </lew-flex>
    </template>
    <div class="lew-drawer-body lew-scrollbar">
      <div>这是中间的内容</div>
    </div>
    <template #footer>
      <lew-flex x="end" y="center" class="lew-drawer-footer">
        <lew-flex x="start" gap="5" class="lew-drawer-footer-tips"> 提交后立即生效 </lew-flex>
        <lew-flex x="end" y="center">
          <lew-button type="text" color="gray" :request="ok">取消</lew-button>
          <lew-button :request="ok">提交</lew-button>
        </lew-flex>
      </lew-flex>
    </template>
  </lew-drawer>
</template>

<style lang="scss" scoped>
.lew-drawer-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

.lew-drawer-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 18px;
  font-weight: bolder;
  padding: 0px 10px;
}
.lew-drawer-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  padding: 10px;
}
.lew-drawer-footer-tips {
  font-size: 14px;
  font-weight: normal;
  color: var(--lew-text-color-8);
  padding-left: 10px;
}

.lew-icon-box {
  margin-top: 40px;
  width: 140px;
  border-radius: var(--lew-border-radius-small);
  transition: all 0.15s;
  cursor: pointer;

  .lew-icon-name {
    white-space: nowrap;
    color: #999;
  }
}

.lew-icon-box:hover {
  transform: translateY(-3px);
}
</style>
