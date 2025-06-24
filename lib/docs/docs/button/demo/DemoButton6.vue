<script setup lang="ts">
const handleRequest = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
      LewMessage.success('Submit success');
    }, 1000);
  });
};
</script>

<template>
  <lew-flex wrap x="start" y="end" gap="20">
    <lew-button :request="handleRequest" text="Submit" type="light" />
  </lew-flex>
</template>
