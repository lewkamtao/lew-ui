<script setup lang="ts">
function close() {
  LewMessage.success('你点击了关闭')
}
</script>

<template>
  <lew-tag closable @close="close">
    Closable
  </lew-tag>
</template>
