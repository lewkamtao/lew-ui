<script lang="ts" setup>
const v = ref(['apple', 'banana', 'orange'])
</script>
<template>
  <lew-flex style="width: 320px" direction="y" x="start" gap="10px">
    <lew-input-tag v-model="v" />
  </lew-flex>
</template>
