<script setup lang="ts">
const close = () => {
  LewMessage.success('你点击了关闭')
}
</script>
<template>
  <lew-flex x="start" wrap>
    <lew-tag closable type="light" @close="close">
      <template #left> 🦄 </template>
      <template #right> 🎉 </template>
      primary
    </lew-tag>
    <lew-tag size="large" type="light" round>
      <template #left>🦄 </template>
      primary
    </lew-tag>
    <lew-tag type="light" color="normal" size="large" round>
      <template #right> 🎉 </template>
      primary
    </lew-tag>
  </lew-flex>
</template>
