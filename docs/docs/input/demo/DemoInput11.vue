<script setup lang="ts">
const v = ref('')
function ok(v: string) {
  LewMessage.success(`输入的内容为：${v}`)
}
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-input v-model="v" ok-by-enter clearable @ok="ok" />
  </lew-flex>
</template>
