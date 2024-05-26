<script lang="ts" setup>
const v = ref([])
</script>
<template>
  <lew-flex style="width: 320px" direction="y" x="start" gap="10px">
    <lew-input-tag placeholder="请输入标签" v-model="v" />
  </lew-flex>
</template>
