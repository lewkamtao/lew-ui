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
  { label: "Levi's", value: 9 },
  { label: 'Gucci', value: 10 },
];
const options = ref(clothingBrandOptions);
const value = ref([]);
</script>

<template>
  <lew-select-multiple
    width="320px"
    v-model="value"
    valueLayout="tag"
    :options="options"
    placeholder="Please select a brand"
    clearable
  />
</template>
