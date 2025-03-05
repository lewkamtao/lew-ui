<script setup lang="ts">
const animalOptions = ref([
  { label: 'Lion', value: 'lion' },
  { label: 'Tiger', value: 'tiger' },
  { label: 'Elephant', value: 'elephant' },
  { label: 'Giraffe', value: 'giraffe', disabled: true }
])

const selectedAnimal = ref('tiger')
</script>

<template>
  <lew-radio-group
    v-model="selectedAnimal"
    direction="y"
    :options="animalOptions"
  />
</template>
