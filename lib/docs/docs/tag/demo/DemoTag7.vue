<script setup lang="ts">
const close = () => {
  LewMessage.success('你点击了关闭')
}
</script>
<template>
  <lew-flex direction="y" gap="10px">
    <lew-flex x="start" wrap>
      <lew-tag size="small" closable type="light" @close="close">
        <template #left> 🦄 </template>
        <template #right> 🎉 </template>
        primary
      </lew-tag>
      <lew-tag size="small" type="light" round>
        <template #left>🦄 </template>
        primary
      </lew-tag>
      <lew-tag type="light" color="normal" size="small" round>
        <template #right> 🎉 </template>
        primary
      </lew-tag>
    </lew-flex>
    <lew-flex x="start" wrap>
      <lew-tag closable type="light" @close="close">
        <template #left> 🦄 </template>
        <template #right> 🎉 </template>
        primary
      </lew-tag>
      <lew-tag type="light" round>
        <template #left>🦄 </template>
        primary
      </lew-tag>
      <lew-tag type="light" color="normal" round>
        <template #right> 🎉 </template>
        primary
      </lew-tag>
    </lew-flex>
    <lew-flex x="start" wrap>
      <lew-tag size="large" closable type="light" @close="close">
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
  </lew-flex>
</template>
