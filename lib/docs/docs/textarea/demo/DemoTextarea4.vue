<script setup lang="ts">
const v = ref('这是一段文本')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-textarea v-model="v" clearable />
  </lew-flex>
</template>
