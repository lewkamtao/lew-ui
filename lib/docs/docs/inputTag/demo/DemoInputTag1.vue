<script lang="ts" setup>
const v = ref([])
</script>
<template>
  <lew-flex direction="y" x="start" gap="10px">
    <lew-input-tag size="small" v-model="v" />
    <lew-input-tag size="medium" v-model="v" />
    <lew-input-tag size="large" v-model="v" />
  </lew-flex>
</template>
