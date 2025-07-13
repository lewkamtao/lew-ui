<script setup lang="ts">
const username = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input
      v-model="username"
      autoWidth
      min-width="100"
      placeholder="请输入"
    />
  </lew-flex>
</template>
