<script setup lang="ts">
const value = ref(3)
const tips = ['极差', '较差', '一般', '较好', '极好']
</script>

<template>
  <lew-flex gap="10" direction="y">
    <lew-rate v-model="value" :tips="tips" />
  </lew-flex>
</template>
