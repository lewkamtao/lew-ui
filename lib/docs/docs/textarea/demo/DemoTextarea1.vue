<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-textarea v-model="value" placeholder="小" minHeight="50px" size="small" />
    <lew-textarea v-model="value" placeholder="中" minHeight="60px" size="medium" />
    <lew-textarea v-model="value" placeholder="大" minHeight="70px" size="large" />
  </lew-flex>
</template>
