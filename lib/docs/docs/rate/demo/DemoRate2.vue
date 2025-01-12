<script setup lang="ts">
const value = ref(4)
</script>

<template>
  <lew-flex gap="10" direction="y">
    <lew-rate v-model="value" readonly />
  </lew-flex>
</template>
