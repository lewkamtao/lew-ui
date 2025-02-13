<script setup lang="ts">
const isSuperheroFan = ref(false)
</script>

<template>
  <lew-checkbox
    v-model="isSuperheroFan"
    size="small"
    label="是否阅读隐私协议"
  />
</template>
