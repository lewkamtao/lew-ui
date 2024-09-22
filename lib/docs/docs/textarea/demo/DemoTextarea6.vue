<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-textarea
      resize="both"
      v-model="value"
      placeholder="both"
      minHeight="80px"
    />
    <lew-textarea
      resize="vertical"
      v-model="value"
      placeholder="vertical"
      minHeight="100px"
    />
    <lew-textarea
      resize="horizontal"
      v-model="value"
      placeholder="horizontal"
      minHeight="120px"
    />
  </lew-flex>
</template>
