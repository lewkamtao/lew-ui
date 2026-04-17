<script setup lang="ts">
const v = ref('这是只读状态')
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-input v-model="v" placeholder="只读" readonly copyable />
  </lew-flex>
</template>
