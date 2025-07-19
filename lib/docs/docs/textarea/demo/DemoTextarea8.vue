<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-textarea
      v-model="value"
      resize="both"
      placeholder="both"
      min-height="80px"
    />
    <lew-textarea
      v-model="value"
      resize="vertical"
      placeholder="vertical"
      min-height="100px"
    />
    <lew-textarea
      v-model="value"
      resize="horizontal"
      placeholder="horizontal"
      min-height="120px"
    />
  </lew-flex>
</template>
