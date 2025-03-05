<script setup lang="ts">
const sportsOptions = ref([
  { label: 'Basketball', value: 'basketball' },
  { label: 'Soccer', value: 'soccer' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Baseball', value: 'baseball' },
  { label: 'Swimming', value: 'swimming' }
])

const selectedSport = ref('')
</script>

<template>
  <lew-radio-group
    v-model="selectedSport"
    block
    :round="false"
    :options="sportsOptions"
  />
</template>
