<script setup lang="ts">
const v = ref('Selecting text after gathering')
</script>

<template>
  <lew-textarea v-model="v" width="300px" select-by-focus />
</template>
