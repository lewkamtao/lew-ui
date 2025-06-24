<script lang="ts" setup>
const color = ref('#409EFF');
</script>

<template>
  <lew-flex direction="column" x="start" style="width: 300px">
    <lew-color-picker v-model="color" size="small" />
    <lew-color-picker v-model="color" size="medium" />
    <lew-color-picker v-model="color" size="large" />
  </lew-flex>
</template>
