<script setup lang="ts">
const socialMediaOptions = ref([
  { label: 'Google', value: 'google' },
  { label: 'Apple', value: 'apple' },
  { label: 'Microsoft', value: 'microsoft' },
  { label: 'Amazon', value: 'amazon' }
])

const selectedPlatforms = ref([])
</script>

<template>
  <lew-checkbox-group
    v-model="selectedPlatforms"
    :options="socialMediaOptions"
  />
</template>
