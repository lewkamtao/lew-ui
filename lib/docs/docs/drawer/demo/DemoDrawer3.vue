<script setup lang="ts">
const visible = ref(false);
const ok = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      visible.value = false;
      resolve();
    }, 1000);
  });
};

const close = () => {
  visible.value = false;
};
</script>

<template>
  <lew-flex x="start">
    <lew-button @click="visible = true">Custom</lew-button>
  </lew-flex>
  <lew-drawer
    v-model:visible="visible"
    width="750px"
    :okButtonProps="{ request: ok }"
    :closeButtonProps="{ request: close }"
  >
    <template #header>
      <lew-flex x="start" class="lew-drawer-header">
        <lew-tag>New</lew-tag>
        Custom Header
      </lew-flex>
    </template>
    <div class="lew-drawer-body lew-scrollbar">
      <div>This is the main content</div>
    </div>
    <template #footer>
      <lew-flex x="end" y="center" class="lew-drawer-footer">
        <lew-flex x="start" gap="5" class="lew-drawer-footer-tips">
          Takes effect immediately after submission
        </lew-flex>
        <lew-flex x="end" y="center">
          <lew-button type="text" color="gray" :request="ok">Cancel</lew-button>
          <lew-button :request="ok">Submit</lew-button>
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
  color: var(--lew-text-color-5);
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
