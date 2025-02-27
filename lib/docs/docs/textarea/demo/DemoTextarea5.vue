<script setup lang="ts">
const v = ref('This is a read-only state')
</script>

<template>
  <lew-textarea width="300px" v-model="v" placeholder="Read-only" readonly />
</template>
