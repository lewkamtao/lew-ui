<script setup lang="ts">
const close = () => {
  LewMessage.success('你点击了关闭')
}
</script>
<template>
  <lew-flex x="start" wrap>
    <lew-tag closable @close="close"> closable </lew-tag>
    <lew-tag closable disabled> disabled </lew-tag>
  </lew-flex>
</template>
