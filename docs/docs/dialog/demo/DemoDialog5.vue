<script setup lang="ts">
function open() {
  LewDialog.info({
    title: "Confirm Action",
    content:
      "This action will permanently delete your data. Are you sure you want to continue?",
    okText: "Confirm",
    cancelText: "Cancel",
    hideIcon: true,
    closeByEsc: true,
    ok: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          LewMessage.success({
            content: "Action completed successfully",
          });
        }, 1000);
      });
    },
  });
}
</script>

<template>
  <lew-button text="Confirm Action" round type="light" @click="open()" />
</template>
