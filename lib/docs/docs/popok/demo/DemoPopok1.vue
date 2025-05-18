<script setup lang="ts">
// Confirm
const ok = () => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(true);
      LewMessage.success("Task completed successfully");
    }, 1000);
  });
};
// Cancel
const cancel = () => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(true);
      LewMessage.warning("Operation cancelled");
    }, 1000);
  });
};
</script>

<template>
  <lew-popok
    width="400px"
    title="Delete Project"
    content="This action cannot be undone. Are you sure you want to delete this project?"
    placement="bottom-start"
    okText="Delete"
    :ok="ok"
    :cancel="cancel"
  >
    <lew-button text="Delete Project" type="ghost" color="red" />
  </lew-popok>
</template>
