<script setup lang="ts">
const v1 = ref('左对齐')
const v2 = ref('居中对齐')
const v3 = ref('右对齐')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v1" align="left" />
    <lew-input v-model="v2" align="center" />
    <lew-input v-model="v3" align="right" />
  </lew-flex>
</template>
