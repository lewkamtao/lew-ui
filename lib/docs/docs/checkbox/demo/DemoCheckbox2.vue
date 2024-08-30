<script setup lang="ts">
const seasonOptions = ref([
  { label: '春天', value: 'spring' },
  { label: '夏天', value: 'summer' },
  { label: '秋天', value: 'autumn' },
  { label: '冬天', value: 'winter' }
])

const selectedSeasons = ref([])
</script>

<template>
  <lew-checkbox-group v-model="selectedSeasons" direction="y" :options="seasonOptions" />
</template>
