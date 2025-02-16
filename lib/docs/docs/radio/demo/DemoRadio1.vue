<script setup lang="ts">
const iceCreamFlavors = ref([
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Matcha', value: 'matcha' },
  { label: 'Mango', value: 'mango' }
])

const selectedFlavor = ref('')
</script>

<template>
  <lew-radio-group v-model="selectedFlavor" :options="iceCreamFlavors" />
</template>
