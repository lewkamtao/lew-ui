<script setup lang="ts">
const v = ref('This is a disabled state');
</script>

<template>
  <lew-textarea width="300px" v-model="v" placeholder="Disabled" disabled />
</template>
