<script setup lang="ts">
const v = ref('This is a textarea')
</script>

<template>
  <lew-textarea v-model="v" width="300px" clearable />
</template>
