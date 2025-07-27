<script setup lang="ts">
function ok() {
  LewMessage.success('Confirmed')
}
function cancel() {
  LewMessage.info('Cancelled')
}
</script>

<template>
  <lew-popok
    width="400px"
    title="Delete Confirmation"
    type="error"
    content="This action cannot be undone. Please confirm!"
    placement="bottom-start"
    ok-text="Delete"
    cancel-text="Cancel"
    :ok="ok"
    :cancel="cancel"
    trigger="hover"
  >
    <lew-button text="Hover to trigger" type="text" color="red" />
  </lew-popok>
</template>
