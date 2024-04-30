<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="value" size="small" clearable showCount :maxLength="30" />
    <lew-input v-model="value" clearable showCount :maxLength="30" />
    <lew-input v-model="value" size="large" clearable showCount :maxLength="30" />
  </lew-flex>
</template>
