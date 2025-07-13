<script setup lang="ts">
const n = ref(undefined)
</script>
<template>
  <lew-flex direction="y" x="start">
    <lew-input-number v-model="n" size="small"></lew-input-number>
    <lew-input-number v-model="n" size="medium"></lew-input-number>
    <lew-input-number v-model="n" size="large"></lew-input-number>
  </lew-flex>
</template>
