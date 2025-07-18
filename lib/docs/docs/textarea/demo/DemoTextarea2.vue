<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-textarea
    v-model="value"
    width="300px"
    placeholder="Limit the number of characters"
    show-count
    :max-length="300"
    clearable
  />
</template>
