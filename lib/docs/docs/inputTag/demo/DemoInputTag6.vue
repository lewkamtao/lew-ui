<script lang="ts" setup>
const v = ref(['China', 'USA', 'UK'])
</script>
<template>
  <lew-input-tag style="width: 320px" readonly v-model="v" />
</template>
