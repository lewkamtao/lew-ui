<script setup lang="ts">
// Confirm
function ok() {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(true)
      LewMessage.success('Task completed successfully')
    }, 1000)
  })
}
// Cancel
function cancel() {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(true)
      LewMessage.warning('Operation cancelled')
    }, 1000)
  })
}
</script>

<template>
  <lew-popok
    width="400px"
    title="Delete Project"
    content="This action cannot be undone. Are you sure you want to delete this project?"
    placement="bottom-start"
    cancel-text="Cancel"
    ok-text="Delete"
    :ok="ok"
    :cancel="cancel"
  >
    <lew-button text="Delete Project" type="ghost" color="red" />
  </lew-popok>
</template>
