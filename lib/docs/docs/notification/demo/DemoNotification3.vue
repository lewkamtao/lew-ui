<script lang="ts" setup>
const openWithDelay = () => {
  LewNotification.info({
    title: "HSBC Account Update",
    content:
      "Your HSBC account has been successfully updated. Please check your email for more details.",
    width: 500,
  });
};
</script>

<template>
  <lew-button
    text="Account Update"
    type="fill"
    color="blue"
    @click="openWithDelay"
  />
</template>
