<script lang="ts" setup>
const v = ref(['apple', 'banana', 'orange'])
</script>

<template>
  <lew-input-tag v-model="v" style="width: 320px" />
</template>
