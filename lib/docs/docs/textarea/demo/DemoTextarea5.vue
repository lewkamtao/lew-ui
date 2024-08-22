<script setup lang="ts">
const v1 = ref('这是只读状态')
const v2 = ref('这是禁用状态')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-textarea v-model="v1" placeholder="只读" readonly copyable />
    <lew-textarea v-model="v2" disabled />
  </lew-flex>
</template>
