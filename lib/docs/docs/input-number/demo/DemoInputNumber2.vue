<script setup lang="ts">
const n = ref(123)
</script>

<template>
  <lew-flex x="start">
    <lew-input-number v-model="n" select-by-focus />
  </lew-flex>
</template>
