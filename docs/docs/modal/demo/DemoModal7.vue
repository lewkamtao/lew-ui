<script setup lang="ts">
const visible = ref(false)

function open() {
  visible.value = true
}

async function handleClose() {
  visible.value = false
}

async function handleSave() {
  await new Promise(r => setTimeout(r, 400))
  LewMessage.success({ content: 'Saved' })
  visible.value = false
}

async function handleDiscard() {
  visible.value = false
}
</script>

<template>
  <lew-flex x="start">
    <lew-button type="light" @click="open">
      Open modal (footerButtons)
    </lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    width="480px"
    title="Unsaved changes"
    :footer-buttons="[
      {
        props: {
          text: 'Discard',
          type: 'light',
          color: 'gray',
          request: handleDiscard,
        },
      },
      {
        props: {
          text: 'Cancel',
          type: 'text',
          color: 'gray',
          request: handleClose,
        },
      },
      {
        props: {
          text: 'Save',
          type: 'fill',
          color: 'primary',
          request: handleSave,
        },
      },
    ]"
  >
    <div class="modal-body">
      You have unsaved edits. Choose an action — footer layout and count are fully configurable.
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
  padding: 20px;
  font-size: 14px;
  color: var(--lew-text-color-2);
}
</style>
