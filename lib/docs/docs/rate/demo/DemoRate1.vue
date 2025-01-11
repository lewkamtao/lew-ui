<script setup lang="ts">
const value = ref(2)
</script>

<template>
  <lew-flex gap="10" direction="y">
    <lew-rate v-model="value" size="small" />
    <lew-rate v-model="value" size="medium" />
    <lew-rate v-model="value" size="large" />
  </lew-flex>
</template>
