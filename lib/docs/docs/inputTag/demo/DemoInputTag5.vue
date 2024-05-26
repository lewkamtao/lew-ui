<script lang="ts" setup>
const v = ref([])
</script>
<template>
  <lew-flex style="width: 320px" direction="y" x="start" gap="10px">
    <lew-input-tag clearable v-model="v" />
    <lew-input-tag disabled v-model="v" />
    <lew-input-tag readonly v-model="v" />
  </lew-flex>
</template>
