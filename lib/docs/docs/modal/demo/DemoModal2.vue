<script setup lang="ts">
const visible = ref(false);
const ok = () => {
  return new Promise<void>((resolve: any) => {
    setTimeout(() => {
      resolve(true);
      visible.value = false;
    }, 3000);
  });
};

const close = () => {
  visible.value = false;
};
</script>

<template>
  <lew-flex x="start">
    <lew-button type="ghost" color="danger" @click="visible = true"
      >Delete Account</lew-button
    >
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    width="420px"
    title="Delete Account"
    :okButtonProps="{
      request: ok,
      color: 'danger',
      text: 'Delete',
    }"
    :closeButtonProps="{
      request: close,
      text: 'Cancel',
    }"
  >
    <div class="modal-body">
      <div class="warning-icon">⚠️</div>
      <div class="warning-text">
        <h3>Are you sure you want to delete your account?</h3>
        <p>
          This action cannot be undone. All your data will be permanently
          deleted.
        </p>
        <p class="note">
          This dialog will close automatically in 3 seconds after confirmation.
        </p>
      </div>
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
  align-items: center;
  padding: 24px 32px;
  box-sizing: border-box;
  text-align: center;
}

.warning-icon {
  font-size: 40px;
  margin-bottom: 20px;
  opacity: 0.9;
}

.warning-text {
  h3 {
    color: var(--lew-text-color-0);
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }

  p {
    color: var(--lew-text-color-2);
    line-height: 1.5;
    margin-bottom: 10px;
    font-size: 14px;
    letter-spacing: -0.01em;
  }

  .note {
    font-size: 12px;
    color: var(--lew-text-color-3);
    font-style: normal;
    opacity: 0.8;
  }
}
</style>
