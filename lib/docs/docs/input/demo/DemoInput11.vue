<script setup lang="ts">
const v = ref('');
const ok = (v: string) => {
  LewMessage.success(`输入的内容为：${v}`);
};
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v" ok-by-enter @ok="ok" clearable />
  </lew-flex>
</template>
