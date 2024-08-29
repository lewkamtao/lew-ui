<script setup lang="ts">
const v = ref('这是一段文本')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v" size="small" clearable />
    <lew-input v-model="v" clearable />
    <lew-input v-model="v" size="large" clearable />
  </lew-flex>
</template>
