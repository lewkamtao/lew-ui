<script setup lang="ts">
const v = ref('This is a textarea');
</script>

<template>
  <lew-textarea width="300px" v-model="v" clearable />
</template>
