<script setup lang="ts">
const v = ref('这是宽度自适应的输入框')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v" autoWidth />
  </lew-flex>
</template>
