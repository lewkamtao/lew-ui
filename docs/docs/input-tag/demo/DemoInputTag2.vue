<script lang="ts" setup>
const v = ref([])
</script>

<template>
  <lew-flex style="width: 320px" direction="y" x="start" gap="10px">
    <lew-input-tag v-model="v" size="small" />
    <lew-input-tag v-model="v" size="medium" />
    <lew-input-tag v-model="v" size="large" />
  </lew-flex>
</template>
