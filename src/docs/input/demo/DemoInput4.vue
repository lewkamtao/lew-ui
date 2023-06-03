<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="value" placeholder="可清空的" clearable />
    <lew-input v-model="value" placeholder="禁用" disabled />
    <lew-input v-model="value" placeholder="只读" readonly />
    <lew-input v-model="value" placeholder="自动" auto-width />
  </lew-flex>
</template>
