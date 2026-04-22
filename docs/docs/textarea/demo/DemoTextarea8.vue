<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-textarea v-model="value" resize="both" placeholder="both" min-height="80px" />
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
    <lew-textarea
      v-model="value"
      resize="both"
      placeholder="both + max-height + max-width"
      min-height="120px"
      max-height="200px"
      min-width="200px"
      max-width="400px"
    />
  </lew-flex>
</template>
