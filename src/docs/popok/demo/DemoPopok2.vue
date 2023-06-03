<script setup lang="ts">
// 确认
function ok() {
  LewMessage.success('确定')
}
// 取消
function cancel() {
  LewMessage.info('取消')
}
</script>

<template>
  <lew-popok
    title="删除确认"
    trigger="hover"
    content="删除之后无法恢复，请确认！"
    :ok="ok"
    :cancel="cancel"
  >
    <lew-button text="hover 触发" />
  </lew-popok>
</template>
