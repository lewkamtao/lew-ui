<script setup lang="ts">
const value1 = ref(true)
const value2 = ref(false)
</script>

<template>
  <lew-flex>
    <lew-switch v-model="value1" disabled />
    <lew-switch v-model="value2" disabled />
  </lew-flex>
</template>
