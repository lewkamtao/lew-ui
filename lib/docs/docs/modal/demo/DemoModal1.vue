<script setup lang="ts">
const visible = ref(false);

const handleOk = () => {
  visible.value = false;
};

const handleClose = () => {
  visible.value = false;
};
</script>

<template>
  <lew-flex x="start">
    <lew-button type="light" @click="visible = true">View Profile</lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    width="500px"
    title="User Profile"
    :closeButtonProps="{
      request: handleClose,
    }"
    :okButtonProps="{
      request: handleOk,
    }"
  >
    <div class="modal-body">
      <div class="profile-container">
        <div class="profile-info">
          <h2>John Doe</h2>
          <p class="role">Senior Developer</p>
          <div class="details">
            <p>Email: john.doe@example.com</p>
            <p>Location: San Francisco, CA</p>
            <p>Department: Engineering</p>
          </div>
        </div>
      </div>
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-info {
  h2 {
    font-size: 24px;
    margin-bottom: 8px;
    color: var(--lew-text-color-0);
  }

  .role {
    font-size: 16px;
    color: var(--lew-color-primary);
    margin-bottom: 16px;
  }

  .details {
    p {
      margin: 8px 0;
      color: var(--lew-text-color-2);
    }
  }
}
</style>
