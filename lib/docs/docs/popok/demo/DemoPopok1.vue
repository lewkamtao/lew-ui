<script setup lang="ts">
const popokRef = ref()
// 确认
const ok = () => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      popokRef.value.hide()
      resolve(true)
      LewMessage.success('确定')
    }, 1000)
  })
}
// 取消
const cancel = () => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      popokRef.value.hide()
      resolve(true)
      LewMessage.warning('取消')
    }, 1000)
  })
}
</script>

<template>
  <lew-popok
    ref="popokRef"
    title="删除确认"
    content="删除之后无法恢复，请确认！"
    :okProps="{
      request: ok
    }"
    :cancelProps="{
      request: cancel
    }"
  >
    <lew-button text="click 触发" />
  </lew-popok>
</template>
