<script setup lang="ts">
const clothingBrandOptions = [
  { label: 'Nike', value: 1 },
  { label: 'Adidas', value: 2 },
  { label: 'Puma', value: 3 },
  { label: 'Under Armour', value: 4 },
  { label: 'Reebok', value: 5 },
  { label: 'H&M', value: 6 },
  { label: 'Zara', value: 7 },
  { label: 'Uniqlo', value: 8 },
  { label: 'Levi\'s', value: 9 },
  { label: 'Gucci', value: 10 },
]
const options = ref(clothingBrandOptions)
const value = ref([])
</script>

<template>
  <lew-select-multiple
    v-model="value"
    width="320px"
    value-layout="tag"
    :options="options"
    placeholder="Please select a brand"
    clearable
  />
</template>
