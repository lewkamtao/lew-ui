<script setup lang="ts">
const v = ref('This is a disabled state')
</script>

<template>
  <lew-textarea v-model="v" width="300px" placeholder="Disabled" disabled />
</template>
