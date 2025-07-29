<script setup lang="ts">
const v = ref('This is a read-only state')
</script>

<template>
  <lew-textarea v-model="v" width="300px" placeholder="Read-only" readonly />
</template>
