<script setup lang="ts">
const n = ref(123)
</script>
<template>
  <lew-flex x="start">
    <lew-input-number v-model="n" selectByFocus></lew-input-number>
  </lew-flex>
</template>
