<script lang="ts" setup>
const v = ref(['China', 'USA', 'UK'])
</script>

<template>
  <lew-input-tag v-model="v" style="width: 320px" readonly />
</template>
