<script setup lang="ts">
const n = ref(6732)
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-input-number v-model="n" disabled />
    <lew-input-number v-model="n" readonly />
  </lew-flex>
</template>
