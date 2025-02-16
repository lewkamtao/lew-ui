<script setup lang="ts">
const carBrandOptions = ref([
  { label: 'Ferrari', value: 'ferrari' },
  { label: 'Lamborghini', value: 'lamborghini' },
  { label: 'Porsche', value: 'porsche' },
  { label: 'McLaren', value: 'mclaren' },
  { label: 'Bugatti', value: 'bugatti' }
])

const selectedBrand = ref('porsche')
</script>

<template>
  <lew-radio-group
    v-model="selectedBrand"
    block
    readonly
    :options="carBrandOptions"
  />
</template>
