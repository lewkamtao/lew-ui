<script setup lang="ts">
const hasReadPrivacyPolicy = ref(false);
</script>

<template>
  <lew-checkbox
    v-model="hasReadPrivacyPolicy"
    label="Have you read the privacy policy?"
  />
</template>
