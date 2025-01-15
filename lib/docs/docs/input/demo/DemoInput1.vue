<script setup lang="ts">
const smallInput = ref('')
const mediumInput = ref('')
const largeInput = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="smallInput" size="small" />
    <lew-input v-model="mediumInput" size="medium" clearable />
    <lew-input v-model="largeInput" size="large" show-password />
  </lew-flex>
</template>
