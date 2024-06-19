<script setup lang="ts">
const v = ref('这是禁用状态')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-textarea v-model="v" disabled />
  </lew-flex>
</template>
